from fastapi import FastAPI, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Query
import mysql.connector as mysql
from mysql.connector import Error
import json
from hashing import Hasher
from scrapping import Scrapper
from jose import JWTError, jwt
import asyncio

SECRET_KEY = "questify-secret-key"
ALGORITHM = "HS256"

app = FastAPI()

origins = [
    "http://cmsc508.com:3000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


db = mysql.connect(
    host="cmsc508.com",
    user="24SP_manoja2",
    password="V00978659",
    database="24SP_manoja2_pr"
)
            
mycursor = db.cursor()

def create_access_token(data: dict):
    to_encode = data.copy()
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)



def auth_user(auth_json):
    email = auth_json['email']
    password =  auth_json['password']
    mycursor.execute("SELECT pword FROM users WHERE email_address = %s", (email,))
    user = mycursor.fetchone()
    if user:
        hashed_password = user[0]
        if Hasher.verify_password(password, hashed_password):
            return True
        else:
            return False
    else:
        return False    

async def get_json(request: Request):
    try:
        request_body = await request.json()
    except json.JSONDecodeError:
        raise HTTPException(status_code=400, detail="Invalid JSON payload")

    return request_body

def user_exist(email_address):
    mycursor.execute("SELECT * FROM users WHERE email_address = %s", (email_address,))
    favorite_questions = mycursor.fetchone()
    if favorite_questions:
        return True 
    else:
        return False
    

@app.post('/~24SP_manoja2/users')
async def create_user_endpoint(request: Request):
    request_json = await get_json(request)
    email = request_json['email']
    password =  request_json['password']
    hashed_password = Hasher.get_password_hash(password)
    university = request_json['university']
    first_name = request_json['first_name']
    last_name =  request_json['last_name']
    phone_number = request_json['phone_number']
    user_type = request_json['type']
    if user_exist(email):
        raise HTTPException(status_code=400, detail="User already exists")
    user_insert_query = "INSERT INTO users (email_address, university, first_name, last_name, pword, phone_number, type) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    user_data = (email, university, first_name, last_name, hashed_password, phone_number, user_type)
    mycursor.execute(user_insert_query, user_data)
    if(user_type == 'student'):
        class_year = request_json['class_year']
        major = request_json['major']
        student_insert_query = "INSERT INTO student (email_address, class_year, major) VALUES (%s, %s, %s)"
        student_data = (email, class_year, major)
        mycursor.execute(student_insert_query, student_data)
    if(user_type == 'employee'):
        company_name = request_json['company_name']
        position_name = request_json['position_name']
        company_id = await company_exist(company_name)
        if company_id == -1:
            await create_company(company_name)
            company_id = await company_exist(company_name)
        if not await position_exist(position_name, company_id):
            await create_position(position_name, company_id)
        employee_insert_query = "INSERT INTO employee (email_address, company_id, position_name) VALUES (%s, %s, %s)"
        employee_data = (email, company_id, position_name)
        mycursor.execute(employee_insert_query, employee_data)
    db.commit()
    return {"message": "User created successfully"}

async def company_exist(company_name):
    mycursor.execute("SELECT company_id FROM company WHERE name = %s", (company_name,))
    company = mycursor.fetchone()
    if company is not None:
        return int(company[0])  # Return the first column of the result
    else:
        return -1
    
async def create_company(company_name, about=None):
    try:
        args = (company_name, about)
        print(args)
        mycursor.callproc('InsertCompany', args)
        db.commit()
    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    # task = asyncio.create_task(create_company_attributes(company_name))
    return 

async def create_company_attributes(company_name):
    company_data = Scrapper.get_company_data(company_name)
    company_id = await company_exist(company_name)
    positions_list = company_data[company_name]['positions']
    if len(positions_list) > 0:
        process_list = company_data[company_name]['processes']
        question_list = company_data[company_name]['questions']
        for i in range(len(positions_list)):
            await create_position(positions_list[i], company_id)
            if process_list[i] != '':
                await create_process(company_id, positions_list[i], process_list[i])
            if question_list[i] != '':
                await create_question(company_id, positions_list[i], question_list[i])

@app.get('/~24SP_manoja2/user_info')
async def user_information(request: Request):
    token = get_token(request)
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_email = get_token_email(token)

    try:
        mycursor.execute("SELECT * FROM users WHERE email_address = %s", (user_email,))
        user = mycursor.fetchone()
        if user:
            user_data = {
                "email": user[0],
                "university": user[1],
                "first_name": user[2],
                "last_name": user[3],
                "phone_number": user[5],
                "type": user[6]

            }

            if user_data['type'] == 'student':
                mycursor.execute("SELECT class_year, major FROM student WHERE email_address = %s", (user_email,))
                student_details = mycursor.fetchone()
                if student_details:
                    user_data.update({
                        "class_year": student_details[0],
                        "major": student_details[1]
                    })
            elif user_data['type'] == 'employee':
                mycursor.execute("select name, position_name from employee join company on company.company_id = employee.company_id where email_address = %s", (user_email,))
                employee_details = mycursor.fetchone()
                if employee_details:
                    user_data.update({
                        "company_name": employee_details[0],
                        "position_name": employee_details[1]
                    })
            return user_data
        else:
            raise HTTPException(status_code=404, detail="User not found")
    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post('/~24SP_manoja2/company')
async def create_company_endpoint(request: Request):
    request_json = await get_json(request)
    token = get_token(request)
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    company_name = request_json['company_name']
    about = request_json.get('about', None)
    if await company_exist(company_name) != -1:
        raise HTTPException(status_code=400, detail="Company Already Exists")
    await create_company(company_name, about)
    return {"Status" : 200, "message" : "company created"}

async def position_exist(position_name, company_id):
    mycursor.execute("SELECT * FROM positions WHERE name = %s AND company_id = %s", (position_name, company_id))
    position = mycursor.fetchone()
    if position:
        return True
    else:
        return False

async def create_position(position_name, company_id):
    mycursor.execute("INSERT INTO positions (name, company_id) VALUES (%s, %s)", (position_name, company_id))
    db.commit()

@app.post('/~24SP_manoja2/position')
async def create_position_endpoint(request: Request):
    request_json = await get_json(request)
    token = get_token(request)
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    company_id = request_json['company_id']
    position_name = request_json['position_name']
    await create_position(position_name, company_id)
    return {"Status" : 200, "message" : "position created"}

@app.post('/~24SP_manoja2/users/login')
async def user_login_endpoint(request: Request):
    request_json = await get_json(request)
    if auth_user(request_json) == False:
        raise HTTPException(status_code=401, detail="Unauthorized")
    else:
        email = request_json['email']
        role = 'user'
        if is_admin(request_json):
            role = 'admin'
        access_token = create_access_token(data={"sub": email, "role": role})
        is_valid = verify_token(access_token)
        token_role = get_token_role(access_token)
        return {"access_token": access_token, "token_type": "bearer", "token_role": token_role, "is_valid" : is_valid}
    
def is_admin(auth_json):
    email = auth_json['email']
    mycursor.execute("SELECT type FROM users WHERE email_address = %s", (email,))
    user = mycursor.fetchone()
    user_type = user[0]
    if user_type == 'admin':
        return True
    else:
        return False   

@app.put('/~24SP_manoja2/users/update')
async def update_user_endpoint(request: Request):
    request_json = await get_json(request)
    token = get_token(request)
    if not verify_token(token) or (request_json['email'] != get_token_email(token) and get_token_role(token) != 'admin'):
        raise HTTPException(status_code=401, detail="Unauthorized")
    if get_token_role(token) != 'admin':
        email = get_token_email(token)
    else:
        email = request_json['email']
    status = {}
    user_type = request_json.get('type')
    if user_type:
        if user_type == 'employee':
            status.update(await update_employee_endpoint(request))
        elif user_type == 'student':
            status.update(await update_student_endpoint(request))
        elif user_type == 'admin':
            # Do something for admin
            pass
        else:
            # Handle other types or raise an error if only 'employee' and 'student' are valid
            raise HTTPException(status_code=400, detail="Invalid user type")
    
    ignore_fields = {'email', 'type', 'class_year', 'major', 'company_name', 'position_name'}
    
    # Construct update_fields and update_values excluding the ignored fields
    update_fields = ", ".join([f"{key} = %s" for key, value in request_json.items() if value and key not in ignore_fields])
    update_values = [value for key, value in request_json.items() if value and key not in ignore_fields]
    if not update_fields and not status:
        return {"status": "No update needed"}
    sql_update_query = f"UPDATE users SET {update_fields} WHERE email_address = %s"
    update_values.append(email)
    try:
        print(sql_update_query)
        print(update_values)
        mycursor.execute(sql_update_query, update_values)
        db.commit()
        return {"status": "200", "message": "updated successfully"}
    except Error as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))


def verify_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            return False
        return True
    except JWTError:
        return False


def get_token_role(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        role: str = payload.get("role")
        if role is None:
            return "error"
        return role
    except JWTError:
        return False

def get_token_email(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            return "error"
        return email
    except JWTError:
        return False

@app.put('/~24SP_manoja2/student/update')
async def update_student_endpoint(request: Request):
    request_json = await get_json(request)
    token = get_token(request)
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    if get_token_role(token) != 'admin':
        email = get_token_email(token)
    else:
        email = request_json['email']
    fields_to_update = {}
    if request_json.get('major'):
        fields_to_update['major'] = request_json['major']
    if request_json['class_year']:
        fields_to_update['class_year'] = request_json['class_year']
    if not fields_to_update:
        return {"status": "No update needed"}
    
    update_clause = ", ".join([f"{key} = %s" for key in fields_to_update.keys()])
    update_values = list(fields_to_update.values())
    update_values.append(email)
    
    sql_update_query = f"UPDATE student SET {update_clause} WHERE email_address = %s"

    try:
        mycursor.execute(sql_update_query, update_values)
        db.commit()
        return {"status": "200", "message": "updated successfully"}
    except Error as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.put('/~24SP_manoja2/employee/update')
async def update_employee_endpoint(request: Request):
    request_json = await get_json(request)
    token = get_token(request)
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    if get_token_role(token) != 'admin':
        email = get_token_email(token)
    else:
        email = request_json['email']
    fields_to_update = {}
    if request_json.get('company_name'):
        fields_to_update['company_name'] = request_json['company_name']
        company_id = await company_exist(fields_to_update['company_name'])
        if company_id == -1:
            await create_company(fields_to_update['company_name'])
            company_id = await company_exist(fields_to_update['company_name'])
        del fields_to_update['company_name']
        fields_to_update['company_id'] = company_id
    else:
        company_id = get_company_id_from_email(email)[0]
    if request_json['position_name']:
        fields_to_update['position_name'] = request_json['position_name']
        print(fields_to_update['position_name'])
        print(company_id)
        if not await position_exist(fields_to_update['position_name'], company_id):
            await create_position(fields_to_update['position_name'], company_id)
    if not fields_to_update:
        return {"status": "No update needed"}
    update_clause = ", ".join([f"{key} = %s" for key in fields_to_update.keys()])
    update_values = list(fields_to_update.values())
    update_values.append(email)
    print(update_clause)
    print(update_values)
    
    sql_update_query = f"UPDATE employee SET {update_clause} WHERE email_address = %s"

    print(sql_update_query)

    try:
        mycursor.execute(sql_update_query, update_values)
        db.commit()
        return {"status": "200", "message": "updated successfully"}
    except Error as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

def get_token(request: Request):
    authorization_header = request.headers.get("Authorization")
    # print(authorization_header)
    if not authorization_header:
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")
    token = authorization_header.split("Bearer ")[-1]
    return token

def get_company_id_from_email(email):
    mycursor.execute("SELECT company_id FROM employee WHERE email_address = %s", (email,))
    company_id = mycursor.fetchone()
    return company_id

@app.post('/~24SP_manoja2/process')
async def create_proccess_endpoint(request: Request):
    request_json = await get_json(request)
    token = get_token(request)
    if not verify_token(token) or get_token_role(token) != 'admin':
        raise HTTPException(status_code=401, detail="Unauthorized")
    company_id = request_json['company_id']
    position_name = request_json['position_name']
    process_text = request_json['process_text']
    await create_process(company_id, position_name, process_text)
    return {"Status" : 200, "message" : "process created"} 

async def create_process(company_id, position_name, process_text):
    mycursor.execute("INSERT INTO process (position_name, company_id, process_text) VALUES (%s, %s, %s)", (position_name, company_id, process_text))
    db.commit()

@app.post('/~24SP_manoja2/question')
async def create_question_endpoint(request: Request):
    request_json = await get_json(request)
    token = get_token(request)
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    company_id = request_json['company_id']
    position_name = request_json['position_name']
    question_text = request_json['question_text']
    tag = request_json.get('tag', None)
    await create_question(company_id, position_name, question_text, tag)
    return {"Status" : 200, "message" : "question created"} 

async def create_question(company_id, position_name, question_text, tag=None):
    if tag is not None:
        mycursor.execute("INSERT INTO question (position_name, company_id, question_text, tag) VALUES (%s, %s, %s, %s)", (position_name, company_id, question_text, tag))
    else:
        mycursor.execute("INSERT INTO question (position_name, company_id, question_text) VALUES (%s, %s, %s)", (position_name, company_id, question_text))
    db.commit()

@app.put('/~24SP_manoja2/question/update')
async def update_question_endpoint(request: Request):
    request_json = await get_json(request)
    token = get_token(request)
    if not verify_token(token) or get_token_role(token) != 'admin':
        raise HTTPException(status_code=401, detail="Unauthorized")
    question_id = request_json.get('question_id', None)
    if question_id is None:
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")
    fields_to_update = {}
    if request_json.get('question_text'):
        fields_to_update['question_text'] = request_json['question_text']
    if request_json.get('position_name'):
        fields_to_update['position_name'] = request_json['position_name']
    if request_json.get('tag'):
        fields_to_update['tag'] = request_json['tag']
    if request_json.get('company_id'):
        fields_to_update['company_id'] = request_json['company_id']
    update_clause = ", ".join([f"{key} = %s" for key in fields_to_update.keys()])
    update_values = list(fields_to_update.values())
    update_values.append(question_id)

    sql_update_query = f"UPDATE question SET {update_clause} WHERE question_id = %s"

    try:
        mycursor.execute(sql_update_query, update_values)
        db.commit()
        return {"status": "200", "message": "updated successfully"}
    except Error as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.put('/~24SP_manoja2/process/update')
async def update_process_endpoint(request: Request):
    request_json = await get_json(request)
    token = get_token(request)
    print(not verify_token(token))
    print(get_token_role(token) != 'admin')
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    print(request_json)
    process_id = request_json.get('id', None)
    if process_id is None:
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")
    fields_to_update = {}
    if request_json.get('process_text'):
        fields_to_update['process_text'] = request_json['process_text']
    if request_json.get('position_name'):
        fields_to_update['position_name'] = request_json['position_name']
    if request_json.get('company_id'):
        fields_to_update['company_id'] = request_json['company_id']
    update_clause = ", ".join([f"{key} = %s" for key in fields_to_update.keys()])
    update_values = list(fields_to_update.values())
    update_values.append(process_id)
    print(update_clause)
    print(update_values)
    sql_update_query = f"UPDATE process SET {update_clause} WHERE id = %s"
    print(sql_update_query)
    try:
        mycursor.execute(sql_update_query, update_values)
        db.commit()
        return {"status": "200", "message": "updated successfully"}
    except Error as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    
@app.put('/~24SP_manoja2/positions/update')
async def update_positions_endpoint(request: Request):
    request_json = await get_json(request)
    print(request_json)
    token = get_token(request)
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    position_name = request_json.get('name')
    company_id = request_json['company_id']
    if position_name is None or company_id is None:
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")
    fields_to_update = {}
    if request_json.get('description'):
        fields_to_update['description'] = request_json['description']
    if request_json.get('salary'):
        fields_to_update['salary'] = request_json['salary']
    print(fields_to_update)
    update_clause = ", ".join([f"{key} = %s" for key in fields_to_update.keys()])
    update_values = list(fields_to_update.values())
    update_values.append(position_name)
    update_values.append(company_id)
    print(update_clause)
    print(update_values)
    sql_update_query = f"UPDATE positions SET {update_clause} WHERE name = %s AND company_id = %s"
    print(sql_update_query)
    try:
        mycursor.execute(sql_update_query, update_values)
        db.commit()
        return {"status": "200", "message": "position updated successfully"}
    except Error as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    
@app.put('/~24SP_manoja2/company/update')
async def update_company_endpoint(request: Request):
    request_json = await get_json(request)
    token = get_token(request)
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    company_id = request_json['company_id']
    if company_id is None:
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")
    fields_to_update = {}
    if request_json.get('about'):
        fields_to_update['about'] = request_json['about']
    if request_json.get('name'):
        fields_to_update['name'] = request_json['name']
    update_clause = ", ".join([f"{key} = %s" for key in fields_to_update.keys()])
    update_values = list(fields_to_update.values())
    update_values.append(company_id)
    print(update_clause)
    print(update_values)
    sql_update_query = f"UPDATE company SET {update_clause} WHERE company_id = %s"
    print(sql_update_query)
    try:
        mycursor.execute(sql_update_query, update_values)
        db.commit()
        return {"status": "200", "message": "company updated successfully"}
    except Error as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@app.post('/~24SP_manoja2/users_questions')
async def create_user_question_endpoint(request: Request):
    request_json = await get_json(request)
    email = request_json['email']
    token = get_token(request)
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    question_id = request_json['question_id']
    create_user_question(email, question_id)
    return {"Status" : 200, "message" : "users_question created"} 

def create_user_question(email, question_id):
    mycursor.execute("INSERT INTO users_questions (user_email, question_id) VALUES (%s, %s)", (email, question_id))
    db.commit()

@app.post('/~24SP_manoja2/users_companies')
async def create_user_companies_endpoint(request: Request):
    request_json = await get_json(request)
    email = request_json['email']
    token = get_token(request)
    if not verify_token(token) or (get_token_email(token) != email and get_token_role(token) != 'admin'):
        raise HTTPException(status_code=401, detail="Unauthorized")
    company_id = request_json['company_id']
    create_user_companies(email, company_id)
    return {"Status" : 200, "message" : "users_companies created"} 

def create_user_companies(email, company_id):
    mycursor.execute("INSERT INTO users_companies (user_email, company_id) VALUES (%s, %s)", (email, company_id))
    db.commit()

@app.get('/~24SP_manoja2/company/names')
async def get_company_names_endpoint(request: Request):
    token = get_token(request)
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    return get_company_names()

def get_company_names():
    mycursor.execute("SELECT name, company_id FROM company")
    companies = mycursor.fetchall()
    if companies is not None:
        company_names = []
        company_ids = []
        for x in companies:
            company_names.append(x[0])
            company_ids.append(x[1])
        data = {"company_names" : company_names, "company_ids": company_ids}
        return data
    else:
        return -1

@app.get('/~24SP_manoja2/question/{company_name}')
async def get_company_questions_endpoint(request: Request, company_name: str, position_name: str = Query(None)):
    token = get_token(request)
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    company_id = await company_exist(company_name)

    if position_name:
        sql_query = "SELECT question_text FROM question WHERE company_id = %s AND position_name = %s"
        values = (company_id, position_name)
    else:
        sql_query = "SELECT question_text, position_name FROM question WHERE company_id = %s"
        values = (company_id,)
    print(company_id)
    mycursor.execute(sql_query, values)
    rows = mycursor.fetchall()
    questions_list = []
    positions_list = []

    if position_name:
        # Only questions are needed if position_name is specified
        questions_list = [row[0] for row in rows]
    else:
        # Both questions and positions are needed if no specific position_name is provided
        for question_text, position_name in rows:
            questions_list.append(question_text)
            positions_list.append(position_name)
    # Populate the lists with data from the fetched rows
    if position_name:
        result = {
            company_name: {
                position_name: {
                    "questions" : questions_list
                }
            }
        }
    else:
        result = {
            company_name: {
                "questions": questions_list,
                "positions": positions_list
            }
        }

    return result

@app.get('/~24SP_manoja2/position/{company_name}')
async def get_company_positons_endpoint(company_name: str, request: Request): 
    token = get_token(request)
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    company_id = await company_exist(company_name)
    if company_id == -1:
        raise HTTPException(status_code=404, detail="company not found")
    return get_company_positions(company_id)

def get_company_positons(company_id):
    try:
        mycursor.execute("SELECT name FROM positions WHERE company_id = %s", (company_id, ))
        positons = mycursor.fetchall()
        if positons is not None:
            return [x[0] for x in positons] 
        else:
            return -1
    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get('/~24SP_manoja2/process/{company_name}')
async def get_company_process_endpoint(request: Request, company_name: str, position_name: str = Query(None)):
    token = get_token(request)
    if not verify_token(token):
        raise HTTPException(status_code=401, detail="Unauthorized")
    
    company_id = await company_exist(company_name)
    if company_id == -1:
        raise HTTPException(status_code=404, detail="Company not found")

    if position_name:
        sql_query = "SELECT process_text FROM process WHERE company_id = %s AND position_name = %s"
        values = (company_id, position_name)
    else:
        sql_query = "SELECT process_text, position_name FROM process WHERE company_id = %s"
        values = (company_id,)

    mycursor.execute(sql_query, values)
    rows = mycursor.fetchall()
    process_list = []
    positions_list = []

    if position_name:
        process_list = [row[0] for row in rows]
        result = {
            company_name: {
                position_name: {
                    "processes": process_list
                }
            }
        }
    else:
        for process_text, pos_name in rows:
            process_list.append(process_text)
            positions_list.append(pos_name)
        result = {
            company_name: {
                "processes": process_list,
                "positions": positions_list
            }
        }

    return result

@app.get('/~24SP_manoja2/user/all')
async def get_all_user_info_endpoint(request: Request):
    token = get_token(request)
    if get_token_role(token) != 'admin':
        raise HTTPException(status_code=401, detail="Unauthorized")
    try:
        mycursor.execute("SELECT email_address, university, first_name, last_name, phone_number, type FROM users")
        users = mycursor.fetchall()
        if users:
            user_list = [
                {
                    "email": user[0],
                    "university": user[1],
                    "first_name": user[2],
                    "last_name": user[3],
                    "phone_number": user[4],
                    "type": user[5]
                } for user in users
            ]
            return {"users": user_list}
        else:
            raise HTTPException(status_code=404, detail="No users found")
    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get('/~24SP_manoja2/employee/all')
async def get_all_employee_info_endpoint(request: Request):
    token = get_token(request)
    if get_token_role(token) != 'admin':
        raise HTTPException(status_code=401, detail="Unauthorized")
    try:
        mycursor.execute("SELECT email_address, position_name, company_id FROM employee")
        employees = mycursor.fetchall()
        if employees:
            employee_list = [
                {
                    "email": employee[0],
                    "position_name": employee[1],
                    "company_id": employee[2]
                } for employee in employees
            ]
            return {"employees": employee_list}
        else:
            raise HTTPException(status_code=404, detail="No users found")
    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@app.get('/~24SP_manoja2/student/all')
async def get_all_student_info_endpoint(request: Request):
    token = get_token(request)
    if get_token_role(token) != 'admin':
        raise HTTPException(status_code=401, detail="Unauthorized")
    try:
        mycursor.execute("SELECT email_address, class_year, major FROM student")
        students = mycursor.fetchall()
        if students:
            student_list = [
                {
                    "email": student[0],
                    "class_year": student[1],
                    "major": student[2]
                } for student in students
            ]
            return {"students": student_list}
        else:
            raise HTTPException(status_code=404, detail="No users found")
    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get('/~24SP_manoja2/all/company')   
async def get_all_company_info_endpoint(request: Request):
    token = get_token(request)
    if get_token_role(token) != 'admin':
        raise HTTPException(status_code=401, detail="Unauthorized")
    try:
        mycursor.execute("SELECT company_id, name, about FROM company")
        companies = mycursor.fetchall()
        if companies:
            company_list = [
                {
                    "company_id": company[0],
                    "name": company[1],
                    "about": company[2]
                } for company in companies
            ]
            return {"companies": company_list}
        else:
            raise HTTPException(status_code=404, detail="No users found")
    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get('/~24SP_manoja2/all/position')   
async def get_all_position_info(request: Request):
    token = get_token(request)
    if get_token_role(token) != 'admin':
        raise HTTPException(status_code=401, detail="Unauthorized")
    try:
        mycursor.execute("SELECT company_id, name, description, salary FROM positions")
        positions = mycursor.fetchall()
        if positions:
            position_list = [
                {
                    "company_id": position[0],
                    "name": position[1],
                    "description": position[2],
                    "salary": position[3]
                } for position in positions
            ]
            return {"positions": position_list}
        else:
            raise HTTPException(status_code=404, detail="No users found")
    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get('/~24SP_manoja2/all/process')   
async def get_all_process_info(request: Request):
    token = get_token(request)
    if get_token_role(token) != 'admin':
        raise HTTPException(status_code=401, detail="Unauthorized")
    try:
        mycursor.execute("SELECT id, company_id, position_name, process_text FROM process")
        processes = mycursor.fetchall()
        if processes:
            process_list = [
                {
                    "id": process[0],
                    "company_id": process[1],
                    "position_name": process[2],
                    "process_text": process[3]
                } for process in processes
            ]
            return {"processes": process_list}
        else:
            raise HTTPException(status_code=404, detail="No users found")
    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get('/~24SP_manoja2/all/question')   
async def get_all_question_info(request: Request):
    token = get_token(request)
    if get_token_role(token) != 'admin':
        raise HTTPException(status_code=401, detail="Unauthorized")
    try:
        mycursor.execute("SELECT question_id, company_id, position_name, question_text, tag FROM question")
        questions = mycursor.fetchall()
        if questions:
            question_list = [
                {
                    "id": question[0],
                    "company_id": question[1],
                    "position_name": question[2],
                    "process_text": question[3],
                    "user_email": question[4]
                } for question in questions
            ]
            return {"questions": question_list}
        else:
            raise HTTPException(status_code=404, detail="No users found")
    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get('/~24SP_manoja2/all/user_questions')   
async def get_all_user_question_info(request: Request):
    token = get_token(request)
    if get_token_role(token) != 'admin':
        raise HTTPException(status_code=401, detail="Unauthorized")
    try:
        mycursor.execute("SELECT question_id, user_email FROM users_questions")
        questions = mycursor.fetchall()
        if questions:
            question_list = [
                {
                    "question_id": question[0],
                    "user_email": question[1]
                } for question in questions
            ]
            return {"user_questions": question_list}
        else:
            raise HTTPException(status_code=404, detail="No users found")
    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))
        
@app.get('/~24SP_manoja2/all/user_companies')   
async def get_all_user_company_info(request: Request):
    token = get_token(request)
    if get_token_role(token) != 'admin':
        raise HTTPException(status_code=401, detail="Unauthorized")
    try:
        mycursor.execute("SELECT company_id, user_email FROM users_companies")
        companies = mycursor.fetchall()
        if companies:
            company_list = [
                {
                    "company_id": company[0],
                    "user_email": company[1]
                } for company in companies
            ]
            return {"user_companies": company_list}
        else:
            raise HTTPException(status_code=404, detail="No users found")
    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))

def get_user_type(email_address):
    mycursor.execute("SELECT type FROM users WHERE email_address = %s" , (email_address, ))
    type = mycursor.fetchone()
    return str(type[0])
    
@app.delete('/~24SP_manoja2/users/{email_address}')
async def delete_user_endpoint(email_address: str, request: Request):
    token = get_token(request)
    if not verify_token(token) or (get_token_email(token) != email_address and get_token_role(token) != 'admin'):
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_info = await user_information(request)
    if not user_info:
        raise HTTPException(status_code=404, detail="User not found")
    user_type = get_user_type(email_address)
    if user_type == 'student':
        delete_student(email_address)
    elif user_type == 'employee':
        delete_employee(email_address)
    favorite_companies = has_favorite_companies(email_address)
    if favorite_companies != -1:
        for company_id in favorite_companies:
            delete_user_companies(email_address, company_id)
    favorite_questions = has_favorite_question(email_address)
    if favorite_questions != -1:
        for question_id in favorite_questions:
            delete_users_questions(email_address, question_id)
    try:
        mycursor.execute("DELETE FROM users WHERE email_address=%s", (email_address,))
        db.commit()
        return {"status": "200", "message": "updated successfully"}
    except Error as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

def has_favorite_companies(email_address):
    mycursor.execute("SELECT company_id FROM users_companies WHERE user_email = %s", (email_address,))
    favorite_companies = mycursor.fetchall()
    if favorite_companies is not None:
        return [x[0] for x in favorite_companies]
    else:
        return -1
    
def has_favorite_question(email_address):
    mycursor.execute("SELECT question_id FROM users_questions WHERE user_email = %s", (email_address,))
    favorite_questions = mycursor.fetchall()
    if favorite_questions is not None:
        return [x[0] for x in favorite_questions] 
    else:
        return -1

@app.delete('/~24SP_manoja2/users_companies/{email_address}')
async def delete_user_companies_endpoint(email_address: str, request: Request):
    token = get_token(request)
    if not verify_token(token) or (get_token_email(token) != email_address or get_token_role(token) != 'admin'):
        raise HTTPException(status_code=401, detail="Unauthorized")
    request_json = await get_json(request)
    company_id = request_json['company_id']
    favorite_companies = has_favorite_companies(email_address)
    if favorite_companies and company_id in favorite_companies:
        delete_user_companies(email_address, company_id)
    else:
        raise HTTPException(status_code=404, detail="Entry not found")
    
def delete_user_companies(email_address, company_id):
    mycursor.execute("DELETE FROM users_companies WHERE user_email=%s AND company_id=%s", (email_address,company_id))
    db.commit()

@app.delete('/~24SP_manoja2/users_questions/{email_address}')
async def delete_users_questions_endpoint(email_address: str, request: Request):
    token = get_token(request)
    if not verify_token(token) or (get_token_email(token) != email_address or get_token_role(token) != 'admin'):
        raise HTTPException(status_code=401, detail="Unauthorized")
    request_json = await get_json(request)
    question_id = request_json['question_id']
    favorite_questions = has_favorite_question(email_address)
    if favorite_questions and question_id in favorite_questions:
        delete_users_questions(email_address, question_id)
    else:
        raise HTTPException(status_code=404, detail="Entry not found")
    
def delete_users_questions(email_address, question_id):
    mycursor.execute("DELETE FROM users_questions WHERE user_email=%s AND question_id=%s", (email_address,question_id))
    db.commit()

def company_id_exist(company_id):
    mycursor.execute("SELECT name FROM company WHERE company_id = %s", (company_id,))
    company = mycursor.fetchone()
    print(company[0])
    if company is not None:
        return company[0]  # Return the first column of the result
    else:
        return -1
    
def is_favorite_company(company_id):
    mycursor.execute("SELECT user_email FROM users_companies WHERE company_id = %s", (company_id,))
    users = mycursor.fetchall()
    if users is not None:
        return [x[0] for x in users]
    else:
        return -1
    
def is_favorite_question(question_id):
    mycursor.execute("SELECT user_email FROM users_questions WHERE question_id = %s", (question_id,))
    users = mycursor.fetchall()
    if users is not None:
        return [x[0] for x in users] 
    else:
        return -1

def get_company_positions(company_id):
    mycursor.execute("SELECT name FROM positions WHERE company_id = %s", (company_id,))
    position_names = mycursor.fetchall()
    if position_names is not None:
        return [x[0] for x in position_names] 
    else:
        return -1

@app.delete('/~24SP_manoja2/company/{company_id}')
async def delete_company_endpoint(company_id: str, request: Request):
    token = get_token(request)
    if get_token_role(token) != 'admin':
        raise HTTPException(status_code=401, detail="Unauthorized")
    if not company_id_exist(company_id):
        raise HTTPException(status_code=404, detail="Company Not Found")
    users = is_favorite_company(company_id)
    if users != -1:
        for email_address in users:
            delete_user_companies(email_address, company_id)
    positions = get_company_positions(company_id)
    if positions != -1:
        for position_name in positions:
            delete_position(position_name, company_id)
    return delete_company(company_id)
    
def delete_company(company_id):
    try:
        mycursor.execute("DELETE FROM company WHERE company_id=%s", (company_id,))
        db.commit()
        return {"status": "200", "message": "deleted successfully"} 
    except Error as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

def users_in_positon(position_name, company_id):
    mycursor.execute("SELECT email_address FROM employee WHERE position_name = %s AND company_id = %s", (position_name, company_id))
    users = mycursor.fetchall()
    if users is not None:
        return [x[0] for x in users] 
    else:
        return -1
    
def position_has_questions(position_name, company_id):
    query = "SELECT GetQuestionIDs2(%s, %s)"
    mycursor.execute(query, (position_name, company_id))
    result = mycursor.fetchone()
    result = result[0]
    if len(result) > 0:
        question_ids = list(map(int, result[0].split(',')))
        return question_ids
    else:
        return -1
    
@app.get('/~24SP_manoja2/testfunc')
async def test_endpoint(request: Request):
    request_json = await get_json(request)
    company_id = request_json['company_id']
    position_name = request_json['position_name']
    return {"process" : position_has_processes(position_name, company_id)}

def position_has_processes(position_name, company_id):
    query = "SELECT GetProcessIDs(%s, %s)"
    mycursor.execute(query, (position_name, company_id))
    result = mycursor.fetchone()
    if result and result[0]:
        process_ids = list(map(int, result[0].split(',')))
        return process_ids
    else:
        return -1
    
@app.delete('/~24SP_manoja2/position')
async def delete_position_endpoint(request: Request):
    token = get_token(request)
    if get_token_role(token) != 'admin':
        raise HTTPException(status_code=401, detail="Unauthorized")
    request_json = await get_json(request)
    print(request_json)
    company_id = request_json['company_id']
    position_name = request_json['position_name']
    if not await position_exist(position_name, company_id):
        raise HTTPException(status_code=404, detail="Positon Not Found")
    return delete_position(position_name, company_id)

def delete_position(position_name, company_id):
    users = users_in_positon(position_name, company_id)
    print(position_name)
    print(company_id)
    if users != -1:
        for user in users:
            mycursor.execute("UPDATE employee SET company_id = NULL, position_name = NULL WHERE email_address = %s", (user,))
    print("User set null")
    questions = position_has_questions(position_name, company_id)
    if questions != -1:
        for question_id in questions:
            favorite_question = is_favorite_question(question_id)
            if favorite_question != -1:
                for user in favorite_question:
                    delete_users_questions(user, question_id)
            print("user_questions deleted")
            delete_question(question_id)
        print("questions deleted")
    processes = position_has_processes(position_name, company_id)
    if processes != -1:
        for process_id in processes:
            delete_process(process_id)
        print("process deleted")
    try:
        mycursor.execute("DELETE FROM positions WHERE name = %s AND company_id = %s", (position_name, company_id))
        db.commit()
        return {"status": "200", "message": "deleted successfully"}
    except Error as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    
            
def delete_question(question_id):
    try:
        mycursor.execute("DELETE FROM question WHERE question_id=%s", (question_id,))
        db.commit()
        return {"status": "200", "message": "deleted successfully"} 
    except Error as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

def delete_process(process_id):
    try:
        mycursor.execute("DELETE FROM process WHERE id=%s", (process_id,))
        db.commit()
        return {"status": "200", "message": "deleted successfully"} 
    except Error as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    
@app.delete('/~24SP_manoja2/question/{question_id}')
async def delete_question_endpoint(question_id: int, request: Request):
    token = get_token(request)
    if get_token_role(token) != 'admin':
        raise HTTPException(status_code=401, detail="Unauthorized")
    users = is_favorite_question(question_id)
    if users != -1:
        for user_email in users:
            delete_users_questions(user_email, question_id)
    return delete_question(question_id)

@app.delete('/~24SP_manoja2/process/{process_id}')
async def delete_process_endpoint(process_id: int, request: Request):
    token = get_token(request)
    if get_token_role(token) != 'admin':
        raise HTTPException(status_code=401, detail="Unauthorized")
    return delete_process(process_id)

def delete_student(email_address):
    try:
        print(email_address)
        mycursor.execute("DELETE FROM student WHERE email_address = %s", (email_address,))
        return {"status": "200", "message": "deleted successfully"}  
    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete('/~24SP_manoja2/student/{email_address}')
async def delete_student_endpoint(email_address: str, request: Request):
    token = get_token(request)
    if get_token_role(token) != 'admin':
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_info = await user_information(request)
    if not user_info:
        raise HTTPException(status_code=404, detail="User not found")
    return await delete_user_endpoint(email_address, request)

def delete_employee(email_address):
    try:
        mycursor.execute("DELETE FROM employee WHERE email_address = %s", (email_address,))
        return {"status": "200", "message": "deleted successfully"}
    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete('/~24SP_manoja2/employee/{email_address}')
async def delete_employee_endpoint(email_address: str, request: Request):
    token = get_token(request)
    if get_token_role(token) != 'admin':
        raise HTTPException(status_code=401, detail="Unauthorized")
    user_info = await user_information(request)
    if not user_info:
        raise HTTPException(status_code=404, detail="User not found")
    return await delete_user_endpoint(email_address, request)