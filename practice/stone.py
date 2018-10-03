#!/bin/python

def numJewelsInStones(J, S):
    """
    :type J: str
    :type S: str
    :rtype: int
    """
    
    count = 0
    for stone in S:
        #print stone
        for jewel in J:
            #print jewel
            if(stone == jewel):
                count += 1
    return count
	
	
# main
J = "aAb"
S = "aAAbbbbb"
total = numJewelsInStones(J, S)
print total