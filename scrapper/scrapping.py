from bs4 import BeautifulSoup
from selenium import webdriver 
from selenium.webdriver.chrome.service import Service as ChromeService 
from webdriver_manager.chrome import ChromeDriverManager 
from selenium.webdriver.chrome.options import Options
import re
import json


def init_driver():
    chrome_options = Options()
    chrome_options.add_argument("--headless=new")
    chrome_options.add_argument(
    "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36")
    driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=chrome_options)
    return driver

def find_companies_id(query: str):
    url=f"https://www.glassdoor.com/searchsuggest/typeahead?numSuggestions=8&source=GD_V2&version=NEW&rf=full&fallback=token&input={query}"
    driver = init_driver()
    driver.get(url)     
    html_content = driver.page_source
    start_index = html_content.find("[{")
    end_index = html_content.find("}]") + 2
    json_data = html_content[start_index:end_index]

    # Parse JSON data
    data = json.loads(json_data)
    employer_id = None
    
    if data:
        employer_id = data[0].get("employerId")

    with open("response5.html", "w", encoding="utf-8") as file:
        file.write(html_content)
    return employer_id

def get_company_data(company_name, num_pages):
    company_name_url = company_name.replace(" ", "-")
    company_id = "E" + find_companies_id(company_name_url)
    print(company_id)
    page_number = ''
    for i in range(num_pages):
        if i != 0:
            page_number = '_P' + str(i)
        url = f'https://www.glassdoor.com/Interview/{company_name_url}-Interview-Questions-{company_id}{page_number}.htm'
        driver = init_driver()
        driver.get(url)     
        html_content = driver.page_source
        filename = "page_source4.html"
        with open(filename, 'w', encoding='utf-8') as file:
            file.write(html_content)
        soup = BeautifulSoup(html_content, 'html.parser')
        return scrape_company_data(soup, company_name)

def scrape_company_data(soup, company_name):
    position_list = []
    process_list = []
    question_list = []

    # Find all interview containers
    interview_containers = soup.find_all("div", class_="InterviewContainer__InterviewDetailsStyles__interviewContainer")
    if not interview_containers:
        regex = re.compile(r"Interview\d{7,8}Container")
        interview_containers = soup.find_all("div", attrs={"data-test": regex})
    for container in interview_containers:
        # Extract position
        position = container.find("h2", {"data-test": "interview-detail-headline"})
        if position:
            position_list.append(position.text.strip())
        else:
            r = re.compile(r"Interview\d{7,8}Title")
            position = container.find("h2", attrs={"data-test": r})
            if position:
                position_list.append(position.text.strip())
            else:
                position_list.append("")
        
        # Extract interview process
        process = container.find("p", class_="truncated-text__truncated-text-module__truncate interview-details__interview-details-module__textStyle", style="--limit:4")
        if process:
            process_list.append(process.text.strip())
        else:
            r = re.compile(r'^Interview\d{8}Process$')
            process = container.find(attrs={"data-test": r})
            if process:
                process_list.append(process.text.strip())
            else:
                process_list.append("")
        
        # Extract interview question
        question = container.find("p", class_="truncated-text__truncated-text-module__truncate interview-details__interview-details-module__textStyle", style="--limit:1")
        if question:
            question_list.append(question.text.strip())
        else:
            r = re.compile(r'^Interview\d{8}Questions$')
            question = container.find(attrs={"data-test": r})
            if question:
                question_list.append(question.text.strip())
            else:
                question_list.append("")

    data = {
        company_name: {
            "positions": position_list,
            "processes": process_list,
            "questions": question_list
        }
    }
    return data


class Scrapper():

    @staticmethod
    def get_company_data(company_name):
        company_data = get_company_data(company_name, 1)
        with open("response.json", "w") as outfile: 
            json.dump(company_data, outfile)
        return company_data



        
    
