from lxml import html
import requests
from bs4 import BeautifulSoup
import re

# *****New Website*****


page = requests.get('https://www.amsmeteors.org/meteor-showers/meteor-shower-calendar/')
tree = html.fromstring(page.content)
soup = BeautifulSoup(page.content, 'html.parser')

info = soup.find_all("div", {"class": "media-body"})
names = []
times = []
descriptions = []

namesInfo = soup.find_all("h3", {"class": "media-heading"})
timesInfo = soup.find_all("span", {"class": "shower_acti"})

for inpu in namesInfo:
    names.append(str(inpu))

for inpu in timesInfo:
    times.append(str(inpu))

i = 0
for inpu in info:
    i = 0
    for inpu1 in inpu.select('p'):
        if (i == 0):
            descriptions.append(str(inpu1))
        i = i + 1

meteorShower = [None] * len(names)
j = 0
while j < len(names):
    meteorShower[j] = (
                (re.sub(r'\s{2,}', '', names[j])) + ", " + (re.sub(r'\s{2,}', '', times[j])) + ", " + descriptions[j])
    j = j + 1
for x in meteorShower:
    print(x)

# *****New Website*****


page1 = requests.get('https://www.almanac.com/astronomy/eclipse-dates')

tree1 = html.fromstring(page1.content)
soup1 = BeautifulSoup(page1.content, 'html.parser')
info1 = soup1.find_all("div", {"id": "breadcrumb"})
print(info1)
eclipses = []

for inpu in info1:
    eclipses.append(str((re.sub(r'\s{2,}', '', inpu))))
print(eclipses)
for x in eclipses:
    print(x)

page1 = requests.get('https://courses.lumenlearning.com/astronomy/chapter/future-total-eclipses/')
tree1 = html.fromstring(page1.content)
soup1 = BeautifulSoup(page1.content, 'html.parser')

names1 = []
times1 = []
locations1 = []

namesInfo1 = soup1.find_all("td", {"style": "width: 67px;"}, {"data-valign": "top"})
timesInfo1 = soup1.find_all("td", {"style": "width: 251px;"}, {"data-valign": "top"})
locationInfo1 = soup1.find_all("td", {"style": "width: 564px;"}, {"data-valign": "top"})

for inpu in namesInfo1:
    names1.append(str(inpu))

for inpu in timesInfo1:
    times1.append(str(inpu))

for inpu in locationInfo1:
    locations1.append(str(inpu))

# print('<div class="meteor-card">')
eclipses = [None] * len(namesInfo1)
j = 0
while j < len(namesInfo1):
    eclipses[j] = ('<h3 class="media-heading">Solar Eclipse</h3><span class="shower_acti">' + (re.sub(r'\s{2,}', '', names1[j])) + '</span><p>This eclipse is classified as ' + (re.sub(r'\s{2,}', '', times1[j])) + " and will be visible in the following places: " + (
        re.sub(r'\s{2,}', '', locations1[j])) + "</p>")
    j = j + 1
for x in eclipses:
    print(x)

# print("</div>")
# *****New Website*****


"""
page2 = requests.get('https://courses.lumenlearning.com/astronomy/chapter/future-total-eclipses/')
tree2 = html.fromstring(page2.content)
soup2 = BeautifulSoup(page2.content, 'html.parser')

times2 = []
location2 = []

timesInfo2 = soup2.find_all("td", {"style": "width: 251px;"},{"data-valign":"top"})
locationInfo2 = soup2.find_all("td", {"style": "width: 564px;"},{"data-valign":"top"})

for inpu in timesInfo2:
    times2.append(str(inpu))

for inpu in locationInfo2:
    location2.append(str(inpu))

eclipses = [None]*len(timesInfo2)
j = 0
while j < len(timesInfo2):
    eclipses[j] = ((re.sub(r'\s{2,}', '', timesInfo2[j]))+", "+(re.sub(r'\s{2,}', '', times2[j]))+", "+(re.sub(r'\s{2,}', '', locationInfo2[j])))
    j = j + 1
for x in eclipses:
    print(x)

    """