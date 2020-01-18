#imports necessary packages
import csv
from pprint import pprint
from datetime import datetime

# reads in the all domains data set
with open('all-domains-30-days.csv', 'r') as f:
	reader = csv.DictReader(f)
	rows = list(reader)
	site_visits = [dict(row) for row in rows]

# writes column headers we want
with open('all_domains_output.csv', 'w') as f:
	writer = csv.writer(f)
	writer.writerow(['name', 'value'])
# creates a counter so that we can obtain only the top ten results	
	i=0
# loops through the file writing only the columns we want for only the top ten results:
	for site in site_visits:
		i+=1
		if i > 10:
			break
		name = site["domain"]
		visits = site["visits"]
		writer.writerow([name, visits])
