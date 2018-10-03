#!/bin/python

import json
from pprint import pprint
import csv

with open('MOCK_DATA.json') as f:
	list_data = json.load(f)

parsed_data = []

#print type(data)
for i in range(0, len(list_data)):
	json_data = list_data[i]
	#pprint(json_data)
	first_name = json_data.get('first_name')
	email = json_data.get('email')
	ip = json_data.get('ip_address')
	line = first_name + ',' + email + ',' + ip
	parsed_data.append(line)

#pprint(parsed_data)
csv_file = open('csvfile.csv', 'w')

schema = "FIRST NAME,EMAIL,IP ADDRESS"
csv_file.write("%s\n" % schema)
for i in parsed_data:
	csv_file.write("%s\n" % i)
	