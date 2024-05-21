import requests
import json

# Define the URL of the API endpoint
url = 'http://cmsc508.com:8002/~24SP_manoja2/users'

# Make a GET request to the API endpoint
response = requests.get(url)

# Check if the request was successful (status code 200)
if response.status_code == 200:
    # Parse the JSON response
    data = response.json()
    # Print user information
    for user in data:
        print("Email:", user['email_address'])
        print("University:", user['university'])
        print("First Name:", user['first_name'])
        print("Last Name:", user['last_name'])
        print()
else:
    print("Error:", response.status_code)
