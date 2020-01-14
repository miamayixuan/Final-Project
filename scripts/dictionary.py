import os
import csv
                 
               
with open(words.csv, 'r') as csvfile: 

	dictReader = csv.DictReader(csvfile)
	for row in dictReader:

		print(row)
		
 
 
