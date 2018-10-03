#/usr/bin/python

import re
import subprocess
import datetime
import pprint
import json
import collections
import csv

class Cell(object):
  """A single cell (AP) entry from using the iwlist wlan0 scan command.

  Attributes:
    essid: string of the name of the network
    address: string of the unique MAC Address of the cell
    quality: int/float? representation of the signal strength of the cell
    channel: int indicating which channel the network is set
    frequency: float indicating which band the network is on
    encryption: string describing the type of network encryption
  """
  """
  def __init__(self, essid, address, quality, channel, frequency, encryption):
    self.essid = essid
    self.address = address
    self.quality = quality
    self.channel = channel
    self.frequency = frequency
    self.encryption = encryption
  """

  # get essid from a line of data
  # return string as essid from iwlist output
  def get_essid(self, line):
    essid=""
    expr = re.compile(r"^ESSID\:\"(?P<essid>.*)\"$")
    match = expr.search(line)
    if match is not None:
      essid = match.group(1)
      return essid
      #print "ESSID: " + essid

  # get MAC address from a line of data
  # return string as MAC address from iwlist output
  def get_mac(self, line):
    mac = ""
    expr = re.compile(r"^Cell\s+(?P<cell>.*)\s+\-\s+Address\:\s+(?P<mac>.*)$")
    match = expr.search(line)
    if match is not None:
      mac = match.group(2)
      return mac
      #print "MAC Address: " + mac

  # get frequency band from a line of data
  # return float as frequency band from iwlist output
  def get_frequency(self, line):
    frequency = ""
    expr = re.compile(r"^Frequency\:(?P<frequency>[\d.]+)")
    match = expr.search(line)
    if match is not None:
      frequency = match.group(1)
      return frequency
      #print "Frequency: " + frequency + "GHz"

  # get channel number from a line of data
  # return int as channel number from iwlist output
  def get_channel(self, line):
    channel = ""
    expr = re.compile(r"^Channel\:(?P<channel>\d+)$")
    match = expr.search(line)
    if match is not None:
      channel = match.group(1)
      return channel
      #print "Channel: " + channel

  # get quality strength from a line of data
  # return int / float as quality strength from iwlist output
  def get_quality(self, line):
    quality = ""
    expr = re.compile(r"^Quality=(?P<signal_level>\d+)/(?P<signal_total>\d+)\s+Signal level=(?P<db>.*)$")
    match = expr.search(line)
    if match is not None:
      quality1 = match.group(1)
      quality2 = match.group(2)
      db = match.group(3)
      # convert signal values to % value
      quality = format(100 * (float(quality1) / float(quality2)), '.2f')
      return quality
      #print "Signal Strength: " + quality1 + "/" + quality2
      #print "db: " + db 

  # get encryption type from a line of data
  # return string as an encryption type from iwlist output
  def get_encryption(self, line):
    encryption = ""
    expr = re.compile(r"^Encryption key\:(?P<encryption>.*)$")
    match = expr.search(line)
    if match is not None:
      encryption = match.group(1)
      if encryption == "off":
        encryption = "Open"
        return encryption
      else:
        encryption = "Closed"
        return encryption
  
  # get iwlist output via subprocess with default interface as wlan0
  # return string as iwlist output properties
  def call_iwlist(self, interface="wlan0"):
    p = subprocess.Popen(['iwlist', interface, 'scanning'], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    return p.stdout.read()
  
  # get the current timestamp of the scanned AP
  # return string as as formatted datetime module
  def get_timestamp(self, line):
    ts = '{:%Y-%m-%d %H:%M:%S}'.format(datetime.datetime.now())
    expr = re.compile(r"^Cell\s+(?P<cell>.*)\s+\-.*")
    match = expr.search(line)
    if match is not None:
      return ts

  # pass in iwlist output content into argument
  # iterates through each line and parses data by matching regex patterns
  # returns list of data per cell entry
  # At the same time, outputs all content in csv format to test file
  def parse(self, iwlist_content):
    # create csv file for output
    f = open("test.csv", "w")
    f.write("mac,timestamp,channel,frequency,quality,encryption,essid\n")
    dic = {}
    # tmp variable for mac addr matching
    tmp_mac = ""
    # separates each line by newline delimiter
    lines = iwlist_content.split('\n')
     
    for line in lines:
      # strip all trailing empty spaces
      line = line.strip()

      if self.get_mac(line) is not None:
        timestamp = self.get_timestamp(line) 
        mac = self.get_mac(line)
        dic[mac]={'mac':mac,'timestamp':timestamp}
        tmp_mac = mac
        f.write(mac + "," + timestamp + ",")
      elif self.get_channel(line) is not None:
        channel = self.get_channel(line)
        dic[tmp_mac].update({'channel':channel})
        f.write(channel + ",")
      elif self.get_frequency(line) is not None:
        frequency = self.get_frequency(line)
        dic[tmp_mac].update({'frequency':frequency})
        f.write(frequency + ",")
      elif self.get_essid(line) is not None:
        essid = self.get_essid(line)
        dic[tmp_mac].update({'essid':essid})
        f.write(essid + "\n")
      elif self.get_quality(line) is not None:
        quality = self.get_quality(line)
        dic[tmp_mac].update({'quality':quality})
        f.write(quality + ",")
      elif self.get_encryption(line) is not None:
        encryption = self.get_encryption(line)
        dic[tmp_mac].update({'encryption':encryption})
        f.write(encryption + ",")
    
    f.close()
    return dic

  # pretty prints the dictionary as a readable format to console
  def output(self, dic):
    pprint.pprint(dic)

  # converts dictionary into json format
  def to_json(self, dic):
    with open('scan_data.json', 'wb') as fp:
      json.dump(dic, fp)

# ********** main **********

asdf = Cell()
content = asdf.call_iwlist()
dic = asdf.parse(content)
asdf.to_json(dic)
asdf.output(dic)
