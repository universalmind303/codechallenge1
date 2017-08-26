import resource 
import time
import json
import logging
import traceback
import re


def get_inputs(filepath):
  try:
    with open(filepath, 'r') as f:
      data = f.read()
      [line1, line2] = data.split('\n')
      if(len(re.findall(r'[\d.]*[\d]', line1)) != 2): 
        raise RuntimeError("there was an error reading {filepath} please check line1 of your input file and try again".format(filepath=filepath)) 
      return [line1, line2]
  except Exception as e:
    logging.error(traceback.format_exc())

def findRanges(inputs):
  i = 0
  [line1,line2] = inputs
  [n, sizeOfWindows] = line1.split(' ')
  n = int(n)
  sizeOfWindows = int(sizeOfWindows)
  averageHomeSalePrice = line2.split(' ')
  numberOfWindows = n - sizeOfWindows + 1 
  count = '' 
  while i + sizeOfWindows <= n :
    count += "{output} \n".format(output=subrange(averageHomeSalePrice[i:i + sizeOfWindows]))
    i+= 1
  return count

def subrange(subset):
  i = 0
  count = 0
  sorted_subset = sorted(subset)
  stringified_subset = json.dumps(subset)
  
  if stringified_subset == json.dumps(sorted_subset): count+= 1
  elif stringified_subset == json.dumps(sorted_subset.reverse()): count-= 1
  while i < (len(subset) - 1): 
    if subset[i] < subset[i+1]: count+= 1
    elif subset[i] > subset[i+1]: count-= 1
    i+= 1
  return count



def writeToFile(filepath, data):
  try:
    with open(filepath, 'w+') as f:
      f.write(data)
  except Exception as e:
    logging.error(traceback.format_exc())


def mainfunc():
  start = time.time()
  inputs = get_inputs('./input.txt')
  if not inputs: return
  writeToFile('./output.txt', findRanges(inputs))
  findRanges(inputs)
  print('Seconds to run: {}'.format((time.time() - start) ))
  print("MB USED {}".format(resource.getrusage(resource.RUSAGE_SELF).ru_maxrss / 1024))

if __name__ == '__main__':
  mainfunc()

