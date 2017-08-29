
def readFile(filepath):
  with open(filepath, 'r') as f:
	data = f.read()
  return data


def compare(file1, file2):
  one = file1.split('\n')
  two = file2.split('\n')
  for x in range(len(one)):
    if int(one[x]) == int(two[x]):
      print('line {}, one{} two{}'.format(x, one[x], two[x]))
      return 
  return file1 == file2


print(compare(readFile('./output.txt'), readFile('./expected_output.txt')))