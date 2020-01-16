import csv
from pprint import pprint
from datetime import datetime

# read in data from World Bank data set
with open('summary_whole.csv', 'r') as f:
	reader = csv.DictReader(f)
	rows = list(reader)
	spend = [dict(row) for row in rows]

# create annual_spend.csv with two columns: Year and Total Spend
with open('annual_spend.csv', 'w') as f:
	writer = csv.writer(f)
	writer.writerow(['Year', 'Total Spend ($m)']) 
# loop through the rows in whole_database.csv and write the Concept Note column to year and Tot WB ($m) to total spend
	for spend_year in spend:
		year = spend_year['Year']
		total_spend = spend_year['Tot Disb ($m)']
		date_format = "%d-%b-%Y"
		parsed_date = datetime.strptime(year, date_format)
		new_date = parsed_date.strftime("%-d-%b-%y")
		writer.writerow([year, total_spend])

