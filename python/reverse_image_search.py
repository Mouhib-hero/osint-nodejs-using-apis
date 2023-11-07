# reverse_image_search.py
import requests
import json
import sys

with open('json_files/API_keys.json', 'r') as json_file:
    api_keys = json.load(json_file)

def run_reverse_image_search(rapid_api_key, user_url):
    url = 'https://reverse-image-search1.p.rapidapi.com/reverse-image-search'
    params = {'url': user_url}
    headers = {
        'X-RapidAPI-Key': rapid_api_key,
        'X-RapidAPI-Host': 'reverse-image-search1.p.rapidapi.com',
    }

    response = requests.get(url, headers=headers, params=params)
    
    if response.status_code == 200:
        data = response.json()
        with open('json_files/results/reverse_img_result.json', 'w', encoding='utf-8') as json_file:
            json.dump(data, json_file, ensure_ascii=False, indent=4)
    else:
        print('Reverse image search failed')

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: python reverse_image_search.py <URL_TO_SEARCH>')
        sys.exit(1)
    
    userUrl = sys.argv[1]  # Retrieve the URL from the command-line argument
    # Access the 'rapidAPIKey' from the JSON data
    rapidAPIKey = api_keys['rapidAPIKey']
    run_reverse_image_search(rapidAPIKey, userUrl)
