// name,website,login,average gpa,average SAT,average ACT,acceptance rate

const colleges = "selected.csv";
var collegeArray = [];

function doStuff(data) {
  console.log(data);
  
  for(let i = 0; i < data.length; i++){
    for(let j = 0; j < data.length - i - 1; j++){
      if(data[j + 1]["name"] < data[j]["name"]){
        [data[j + 1],data[j]] = [data[j],data[j + 1]]
      }
    }
  }
  collegeArray = data;

  console.log(collegeArray)
  let htmlString=""
  for (const element of collegeArray) {
      console.log(element.name)
      htmlString += "<p>"+element.name;
      htmlString += "<ul>";
      htmlString += "<li> Website: " + element.website + "</li>";
      htmlString += "<li> Login: " + element.login + "</li>";
      htmlString += "<li> Average GPA: " + element["average gpa"] + "</li>";
      htmlString += "<li> Average SAT: " + element["average sat"] + "</li>";
      htmlString += "<li> Average ACT: " + element["average act"] + "</li>";
      htmlString += "<li> Acceptance Rate: " + element["acceptance rate"] + "</li>";
      htmlString += "</ul>";
  }  
  document.getElementsByClassName("college")[0].innerHTML = htmlString;
}

function parseData(url, callBack) {
  Papa.parse(url,
    {
      download: true,
      dynamicTyping: true,
      header:true, 
      skipEmptyLines: true,
      complete: function(results) {console.log("Finished:", callBack(results.data))}
  });
}
parseData(colleges, doStuff);

// document.addEventListener("DOMContentLoaded", function()
// {
  
// });
