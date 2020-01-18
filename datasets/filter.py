#imports necessary packages

import csv
from pprint import pprint
from datetime import datetime

# reads in the overall WB data set
with open('wb_digital_gov_database_dec2019-1.csv', 'r') as f:
	reader = csv.DictReader(f)
	rows = list(reader)
	project_spends = [dict(row) for row in rows]

# aggregate the entries
data = {}

# loops through the input file and deals with some of the inconsistencies in the data entry (thanks, Sultan!!)
for project in project_spends:
	date = project["Approval"]
	spend = project["Tot Disb ($m)"].replace(',','')

	# parses the date to only make the year itself appear

	date_format = "%d-%b-%y"
	try:
		parsed_date = datetime.strptime(date, date_format)
		year = parsed_date.strftime("%Y")
		#loops over parsed date to group all spends from the same year into one year key
		if year in data.keys():
			if spend!='':
				data[year].append(spend)
		else:
			if spend!='':
				data[year] = [spend]			
		
	except:
		pass

#adds together individual projects within a year to a total for the year
totals = {}
for year in data.keys():
		temp_sum = 0
		for spend in data[year]:
			temp_sum += float(spend)
		totals[year] = temp_sum

# writes new csv file, and creates two column headings for the ones we want (year and spend)
with open('output.csv', 'w') as f:
	writer = csv.writer(f)
	writer.writerow(['year', 'spend'])
	for yr in totals.keys():
		writer.writerow([yr, totals[yr]])

#I then sorted the years using an excel filter before using the data set in my annual_wb_spend.js
