# Testing APIs
import requests

# Define your mock identifier
# mock_identifier = "your_mock_identifier_here"

# Define the URL and headers
url = f"https://run.mocky.io/v3/f315d293-17bf-457d-9130-ca8587b2e008"
headers = {
    "test-msg": "hello"
}

# Make the GET request
response = requests.get(url, headers=headers)

# Check the response status code
if response.status_code == 200:
    # If the response status code is 200 (OK), you can access the content
    print("Response content:")
    print(response.text)
else:
    # If the response status code is not 200, there was an issue with the request
    print(f"Request failed with status code: {response.status_code}")
    print("Response content:")
    print(response.text)

##########___________############
