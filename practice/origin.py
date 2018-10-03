#!/bin/python

def judgeCircle(moves):
    """
    :type moves: str
    :rtype: bool
    """
    x = 0
    y = 0
    
    for char in moves:
        if(char == "U"):
            #print "up"
            y += 1
            #print x, y
        elif(char == "D"):
            #print "down"
            y -= 1
            #print x, y
        elif(char == "L"):
            #print "left"
            x -= 1
            #print x, y
        elif(char == "R"):
            #print "right"
            x += 1
            #print x, y
    if(x == 0 and y == 0):
        return True
    else:
        return False

    
moves = "UDRRRRLUDa"
print judgeCircle(moves)