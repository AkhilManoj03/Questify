import requests
import json

url = 'http://cmsc508.com:8002/~24SP_manoja2/users/login'
r = requests.post(url, data=open('request.json', 'rb'))
if r.status_code == 200:
    data = r.json()
    print(data)