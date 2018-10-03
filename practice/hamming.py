#!/bin/python

def hammingDistance(x, y):
    """
    :type x: int
    :type y: int
    :rtype: int
    """
    while(x > 0 and x <= 2**31 + 1 and y > 0 and y <= 2**31):
        
        bin_x = '{0:04b}'.format(x)
        bin_y = '{0:04b}'.format(y)
        #print bin_x
        #print bin_y
        offset = abs(len(bin_x) - len(bin_y))
        print offset
        
        list_x = list(bin_x)
        list_y = list(bin_y)
        #print list_x
        #print list_y
        
        if(len(list_x) < len(list_y)):
            for i in range(0, offset):
                list_x.insert(0, '0')
            print list_x
            print list_y
        
        if(len(list_y) < len(list_x)):
            for i in range(0, offset):
                list_y.insert(0, '0')
            print list_x
            print list_y
        
        i = 0
        count = 0
        for i in range(0, len(list_x)):
            #print list_x[i]
            #print list_y[i]
            if(list_x[i] != list_y[i]):
                #print list_x[i]
                count += 1
        return x ^ y

        
print hammingDistance(11, 12)
