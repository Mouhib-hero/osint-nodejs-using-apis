# netlas_api.py
import requests
import json

with open('json_files/API_keys.json', 'r') as json_file:
    api_keys = json.load(json_file)


def run_netlas_api(rapid_api_key):
    url = 'https://netlas-all-in-one-host.p.rapidapi.com/host/143.110.236.121/?source_type=include&fields%5B0%5D=*'
    headers = {
        'X-RapidAPI-Key': rapid_api_key,
        'X-RapidAPI-Host': 'netlas-all-in-one-host.p.rapidapi.com',
    }

    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        data = response.json()
        with open('json_files/results/netlas_result.json', 'w', encoding='utf-8') as json_file:
            json.dump(data, json_file, ensure_ascii=False, indent=4)
    else:
        print('Failed to fetch data from Netlas API')

if __name__ == '__main__':
    # Access the 'rapidAPIKey' from the JSON data
    rapidAPIKey = api_keys['rapidAPIKey']
    run_netlas_api(rapidAPIKey)
