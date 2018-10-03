#!/usr/python

st = 'Print only the words that start with s in this sentence'

for words in st.split():
  #print words[0:1]
  if words[0:1] == "s":
    print words

