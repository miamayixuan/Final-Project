
# This file converts the csv input to a list of dictionaries. The code created using this file is then used to create a word cloud in tab2.js

import os
import csv
import json 
               
with open('datasets/words.csv', 'r') as csvfile: 

	dictReader = csv.DictReader(csvfile)
	
	rows = list(dictReader)
	rows = [dict(row) for row in rows]
	rows = [{"text": row['text'], "size": int(row['size'])} for row in rows]

#	print(rows)
#	// for row in rows:
#
#		// print(row)
print(json.dumps(rows))		
 
 
