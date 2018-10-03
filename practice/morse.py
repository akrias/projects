#!/bin/python
import string

def uniqueMorseRepresentations(words):
    """
    :type words: List[str]
    :rtype: int
    """
    alphabet = list(string.ascii_lowercase)
    #print alphabet
    morse_list = [".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."]
    
    dupes = []
    dic = dict(zip(alphabet, morse_list)) 
    #print dic
    for word in words:
        morse = ''
        for char in word:
            morse += dic[char]
        dupes.append(morse)
    
    
    count = len(set(dupes))
    '''
    print dupes
    seen = set() 
    count = 1
    for i in dupes:
        if i in seen:
            count += 1
        seen.add(i)
   ''' 
    return count

        
#words = ["a"]     
#words = ["gin", "zen", "gig", "msg"]
words = ["gin", "zen", "gig", "msg"]
print uniqueMorseRepresentations(words)