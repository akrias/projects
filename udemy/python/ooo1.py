#!/usr/python

from __future__ import division
from math import sqrt

class Line(object):
	def __init__(self, coor1, coor2):
		self.coor1 = coor1
		self.coor2 = coor2
		
	def distance(self):
		cx = self.coor1[0] - self.coor2[0]
		cy = self.coor1[1] - self.coor2[1]
		print sqrt(cx**2 + cy**2)
		
	def slope(self):
		cx = self.coor2[0] - self.coor1[0]
		cy = self.coor2[1] - self.coor1[1]
		#print cx,cy
		print float(cy / cx)

c1 = (3,2)
c2 = (8,10)

l = Line(c1, c2)

l.distance()
l.slope()