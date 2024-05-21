import mysql.connector as mysql
import socket

hostname = socket.gethostname()
IP_address = socket.gethostbyname(hostname)


db=mysql.connect(
    host="cmsc508.com",
    user="24SP_manoja2",
    password="V00978659",
    database="24SP_manoja2_pr")

mycursor = db.cursor()

mycursor.execute("SELECT * FROM users")

myresult = mycursor.fetchall()

for x in myresult:
  print(x)

print("connected to: ",db.get_server_info())