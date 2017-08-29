const fs = require('fs');
const {promisify} = require('util');
const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const appendFileAsync = promisify(fs.appendFile);

let old = Date.now()

const getInputs = async (filepath) =>{
  try {
    let data = await readFileAsync(filepath, 'utf8');
    let [line1,line2] = data.split('\n');

    if(line1.match(/[\d.]*[\d]/g).length !== 2) throw new Error(`Please refer to line 1 of ${__dirname + filepath.slice(1)}`);
    else if(+line1.split(' ')[0] + 1 !== line2.split(' ').length ) throw new Error(`Please refer to line 2 of ${__dirname + filepath.slice(1)}`);
    else return [line1, line2];

  } catch (error) {

    console.log(`there was an error reading ${filepath} please check your input file and try again!

      make sure it is in the format of:\n
      Line 1: Two integers, N and K.
      Line 2: N positive integers of average home sale price, each less than 1,000,000.

${error}
`);
  }
}

const findRanges = ([input1, input2]) =>{
    let [n, sizeOfWindows] = input1.split(' ');
    sizeOfWindows = +sizeOfWindows;
    let averageHomeSalePrice = input2.split(' ');
    let numberOfWindows = n - sizeOfWindows + 1;
    let output = '';
    for(let i = 0; i + sizeOfWindows <= n; i++) {
      output += `${subrange(averageHomeSalePrice.slice(i , i + sizeOfWindows))} \n`
    }
    return output
}

class SubsetCount {
  constructor(){
    this.array = array
    this.count = 0
  }
  getAdditional(array) {
    if(array.length < 2) return this.count
    while(array.length > 2) {
      this.count++
      array.shift()
    }
  }

  getCount(array=this.array) {
    if(array.length < 2) return this.count
    let i = 1;
    let current = array[0];
    let currentSequence = [current]
    let bool = true
    while(bool) {
      if(this.operator(current, array[i])) {
        if(currentSequence.length > 2) this.count++ 
        this.count++
        currentSequence.push(array[i])
        current = array[i]
        i++      
      } else {
        if(currentSequence.length > 2) {
          this.count++ 
          i--          
          this.getCount(array.slice(i))

        } else {
          this.getCount(array.slice(1))
        }
        this.getAdditional(currentSequence.slice(1))
        bool = !bool
      }
    }
    return this.count
  }
}
class IncreasingSubsets extends SubsetCount {
  constructor(){
    super()
  }
  operator(x,y) {
    return +x < +y
  }
}

class DecreasingSubsets extends SubsetCount {
  constructor(){
    super()
  }
  operator(x,y) {
    return +x > +y
  }
}

const subrange = (subArray) =>{
  let increasingCount = new IncreasingSubsets(array=subArray, count=0)
  let decreasingCount = new DecreasingSubsets(array=subArray, count=0)
  return increasingCount.getCount() - decreasingCount.getCount()
}

const writeToFile = async (location, data) =>{
  try {
    await writeFileAsync(location, data)
  } catch( e ) {
    console.log(`there was an error writing file to filepath: ${location}`, e)
  }
}

async function main() {
  try {
    let inputs = await getInputs('./input.txt');
    if(!inputs) return
    writeToFile('./output.txt', findRanges(inputs));

    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log('Seconds to process:', (Date.now() - old) / 1000 );
    console.log('MB used:', used);
  } catch (error) {
    console.log('there was an internal error: \n', error);
  }
}

main();
