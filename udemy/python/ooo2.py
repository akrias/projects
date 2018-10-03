#!/usr/python

class Cylinder(object):
	def __init__(self, height=1, radius=1):
		self.height = height
		self.radius = radius
		
	def volume(self):
		print 3.14 * (self.radius ** 2) * self.height
		
	def surface_area(self):
		print (2 * 3.14 * self.radius * self.height) + (2 * 3.14 * self.radius ** 2)
		
c = Cylinder(2,3)
c.volume()
c.surface_area()