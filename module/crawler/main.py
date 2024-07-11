import requests


url = 'https://www.naver.com'

print(url + '에서 크롤링을 시작합니다.')

response = requests.get(url)

print(response.text)

print('크롤링이 완료되었습니다.')