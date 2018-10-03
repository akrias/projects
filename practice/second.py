#!/bin/python

l = [0, 2, 10, 7, -1, 8]

def second_largest(numbers):
    first, second = None, None
    for n in numbers:
        if n > first:
            second = first
            first = n
        
        elif first > n > second:
            second = n
    return second

print second_largest(l)
