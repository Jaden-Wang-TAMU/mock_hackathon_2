// name,website,login,average gpa,average SAT,average ACT,acceptance rate

const fastcsv = require('fast-csv');
const fs = require('fs');

const colleges = "colleges.csv";
var collegeArray = [];
var displayedList = [];

function doStuff(data, notneeded) {
  console.log(data);
  
  for(let i = 0; i < data.length; i++){
    for(let j = 0; j < data.length - i - 1; j++){
      if(data[j + 1]["name"] < data[j]["name"]){
        [data[j + 1],data[j]] = [data[j],data[j + 1]]
      }
    }
  }
  collegeArray = data;
  updateSeach();
}
function addStuff(data, num){
  var toAdd = displayedList[num];
  if(data.includes(toAdd) == false)
  {
    data.push(toAdd);
    const ws = fs.createWriteStream("selected.csv");
    fastcsv.write(data, { headers: true }).pipe(ws);
  }
}

function parseData(url, callBack, num) {
  Papa.parse(url,
    {
      download: true,
      dynamicTyping: true,
      header:true, 
      skipEmptyLines: true,
      complete: function(results) {console.log("Finished:", callBack(results.data, num))}
  });
}
parseData(colleges, doStuff, 0);

function updateSeach()
{
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByClassName('list-group-item list-group-item-action');
  displayedList = [];
  for(let c of collegeArray)
  {
    if(input.value != '')
    {
      var names = c.name.toUpperCase();
      if(names.includes(filter))
      {
        console.log(c);
        displayedList.push(c);
      }
    }
    else
    {
      displayedList.push(c);
    }
    if(displayedList.length > 7)
    {
      break;
    }
  }
  for(var x = 0; x < 7; x++)
  {
    li[x].innerHTML = '';
    if(displayedList.length > x)
    {
      li[x].innerHTML = displayedList[x]["name"];
    } 
  }
}

window.addEventListener("keyup", function(event) {
  console.log('keylog');
  updateSeach();
});

document.addEventListener("DOMContentLoaded", function()
{
  document.getElementById('one-button').addEventListener('click', () => {
    if(displayedList[0].innerHTML != '')
    {
      parseData('selected.csv', addStuff, 0)
    }
        
  });
  document.getElementById('two-button').addEventListener('click', () => {
    if(displayedList[1].innerHTML != '')
    {
      parseData('selected.csv', addStuff, 1)
    }
  });
  document.getElementById('three-button').addEventListener('click', () => {
    if(displayedList[2].innerHTML != '')
    {
      parseData('selected.csv', addStuff, 2)
    }
  });
  document.getElementById('four-button').addEventListener('click', () => {
    if(displayedList[3].innerHTML != '')
    {
      parseData('selected.csv', addStuff, 3)
    }
  });
  document.getElementById('five-button').addEventListener('click', () => {
    if(displayedList[4].innerHTML != '')
    {
      parseData('selected.csv', addStuff, 4)
    }
  });
  document.getElementById('six-button').addEventListener('click', () => {
    if(displayedList[5].innerHTML != '')
    {
      parseData('selected.csv', addStuff, 5)
    }
  });
  document.getElementById('seven-button').addEventListener('click', () => {
    if(displayedList[6].innerHTML != '')
    {
      parseData('selected.csv', addStuff, 6)
    }
  });
});