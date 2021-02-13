import requests, re as regex, sys
response = requests.get("https://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=json&QueryKeywords=ipad")
htmlContent = regex.sub(r'\\n','<br>',str(response.text))
print(sys.argv)
print(htmlContent)