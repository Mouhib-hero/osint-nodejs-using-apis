import requests
import json
import sys

with open('json_files/API_keys.json', 'r') as json_file:
    api_keys = json.load(json_file)

def run_whois_api(rapid_api_key, whoisKey,user_domain_name):
    url = 'https://whoisapi-whois-v2-v1.p.rapidapi.com/whoisserver/WhoisService'
    params = {
        'domainName': user_domain_name,
        'apiKey': whoisKey,
        'outputFormat': 'XML',
        'da': '0',
        'ipwhois': '0',
        'thinWhois': '0',
        '_parse': '0',
        'preferfresh': '0',
        'checkproxydata': '0',
        'ip': '0',
    }
    headers = {
        'X-RapidAPI-Key': rapid_api_key,  # Replace with your actual RapidAPI key
        'X-RapidAPI-Host': 'whoisapi-whois-v2-v1.p.rapidapi.com',
    }

    response = requests.get(url, headers=headers, params=params)
    print("Response Status Code:", response.status_code)
    print("Response Content:", response.text)

    if response.status_code == 200:
        result = response.text
        with open('json_files/results/whois_result.xml', 'w', encoding='utf-8') as xml_file:
            xml_file.write(result)
    else:
        print('WHOIS API request failed')

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: python whois_api.py <userDomainName>')
        sys.exit(1)

    user_domain_name = sys.argv[1]
    # Access the 'apiKey' from the JSON data
    rapidAPIKey = api_keys['rapidAPIKey']
    whoisKey = api_keys['whoisKey']
    run_whois_api(rapidAPIKey, whoisKey, user_domain_name)
