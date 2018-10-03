#!/bin/python
import numpy as np

def flipAndInvertImage(A):
    """
    :type A: List[List[int]]
    :rtype: List[List[int]]
    """
    #print len(A)
    #print len(A[0])
    output = []
    for mat in A:
        mat = mat[::-1]
        #print mat
        
        # numpy solution
        '''a = np.array(mat)
        a = 1 - a
        output.append(list(a))
        '''
        i = 0
        for char in mat:
            if(char == 1):
                char = 0
                mat[i] = char
                i += 1       
                
            else:
                char = 1
                mat[i] = char
                i += 1
                
        output.append(mat)
    return output
    
A = [[1, 1, 0], 
     [1, 0, 1], 
     [0, 0, 0]]
A = [[1,1,0,0],[1,0,0,1],[0,1,1,1],[1,0,1,0]]
print flipAndInvertImage(A)