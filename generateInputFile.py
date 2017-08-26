import random
import logging
import traceback

def main(filename, n, k):
  """
  creates a random input file for testing purposes
  Args: 0 - filepath
  Args: 1 - number of days
  Args: 2 - size of windows
  """ 
  try :
    with open(filename,"w+") as f:
      for i in range(n):
        if i == 0 : f.write("{length} {k}\n".format(length=n, k=k))    
        f.write("{randint} ".format(randint=random.randrange(100000,1000000)))
  except Exception as e:
    logging.error(traceback.format_exc())


if __name__== "__main__":
  main('./input.txt', random.randrange(199999,200000), random.randrange(100,200))


