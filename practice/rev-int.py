#!/bin/python

def reverse(x):
    """
    :type x: int
    :rtype: int
    """
    neg = False
    to_str = str(x)
    #print to_str
    if(to_str[0] == '-'):
        to_str = to_str[1:]
        neg = True
    rev = to_str[::-1]
    rev = int(rev)
    if((rev > 2**31 - 1) or (rev < -2**31)):
        return 0
    elif(neg):
        return rev * -1
    else:
        return rev

    
print reverse(1534236469)

