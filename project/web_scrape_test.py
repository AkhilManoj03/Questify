from bs4 import BeautifulSoup
import requests
import os
import httpx
from selenium import webdriver 
from selenium.webdriver.chrome.service import Service as ChromeService 
from webdriver_manager.chrome import ChromeDriverManager 

email = 'questify543@gmail.com'
password = 'TestPass123!'

login_url = "https://www.glassdoor.com/profile/login_input.htm"
login_data = {
    "username": email,
    "password": password,
}

session = requests.session()

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
}

url = 'https://www.glassdoor.com/Interview/Capital-One-Interview-Questions-E3736.htm'

options = webdriver.ChromeOptions() #newly added 
options.headless = True #newly added 
with webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options) as driver: #modified 
	driver.get(url)
	html_content = driver.page_source
        
soup = BeautifulSoup(html_content, 'html.parser')
interview_headlines = soup.find_all(attrs={"data-test": "interview-detail-headline"})
headlines_list = [headline.text.strip() for headline in interview_headlines]
if not interview_headlines:
    interview_headlines = soup.find_all(attrs=lambda x: x and x.startswith('data-test') and 'Interview' in x and 'Title' in x)
# truncated_text = soup.find_all('p', class_='truncated-text__truncated-text-module__truncate interview-details__interview-details-module__textStyle', style='--limit:4')
# truncated_text_list = [text.text.strip() for text in truncated_text]
# interview_questions =  soup.find_all('p', class_='truncated-text__truncated-text-module__truncate interview-details__interview-details-module__textStyle', style='--limit:1')
# question_list = [question.text.strip() for question in interview_questions]
# <p class="truncated-text__truncated-text-module__truncate interview-details__interview-details-module__textStyle"
#                                style="--limit:1">


print("Position Names: ")
print(headlines_list)
# print("Interview Process: ")
# print(truncated_text_list)
# print("Interview Questions: ")
# print(question_list)
with open("response5.html", "w", encoding="utf-8") as file:
    file.write(html_content)

