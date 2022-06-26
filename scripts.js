const holidays = [
  '2019-01-01', '2019-04-19', '2019-04-22', '2019-05-06', '2019-05-27', '2019-08-26', '2019-12-24', '2019-12-25', '2019-12-26', '2019-12-31',
  '2020-01-01', '2020-04-10', '2020-04-13', '2020-05-04', '2020-05-25', '2020-08-31', '2020-12-24', '2020-12-25', '2020-12-28', '2020-12-31',
  '2021-01-01', '2021-04-02', '2021-04-05', '2021-05-03', '2021-05-31', '2021-08-30', '2021-12-24', '2021-12-27', '2021-12-28', '2021-12-31',
  '2022-01-03', '2022-04-15', '2022-04-18', '2022-05-02', '2022-05-30', '2022-08-29', '2022-12-26', '2022-12-27',
  '2023-01-02', '2023-04-07', '2023-04-10', '2023-05-01', '2023-05-29', '2023-08-28', '2023-12-25', '2023-12-26'];

function nextWorkingDay(date){              
   date.setDate(date.getDate()+1);
   if(date.getDay() % 6 == 0 || holidays.includes(date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate())){
      return nextWorkingDay (date);
   }else return date;
}

console.clear();
console.log("Today    : " + nextWorkingDay(new Date()));
console.log("Weekend  : " + nextWorkingDay(new Date(2019, 10, 15))); // -> 18/11/2019
console.log("Xmas Eve : " + nextWorkingDay(new Date(2019, 11, 23))); // -> 27/12/2019
console.log("New Year : " + nextWorkingDay(new Date(2019, 11, 30))); // -> 02/01/2020



// =============== funciones de conversión

function convertToDate(dateString) {
      //  Convert a "dd/MM/yyyy" string into a Date object
      let d = dateString.split("/");
      let dat = new Date(d[2] + '/' + d[1] + '/' + d[0]);
      return dat;     

      // inspired from      
      // const [day, month, year] = eventos[1].split('/');
      // const date = new Date(year, +month, +day);
  }



function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}



function getDayName(dateStr)
{
    var date = new Date(dateStr);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString("en-us", options);        
}



// =============== test1
// var event1 = 'The growth of the kingdom;27/04/2022; 14; 2; Investigation, construction and combat points';
// var event2 = 'The great kingdom;24/05/2022; 14; 2; 5 stages: 1. train (up to 100k points), 2. fight (kill monsters up to 100k points) 3.gather (up to 100k event point) 4 power (up to 100k power points) 5. Kill event (up to 100k kill/injure points)';
// // var eventos1 = event1.split(';');
// var eventos1 = event2.split(';');     //borrar esta linea y dejar la anterior


// const nameEvent1 = eventos1[0]
// const dateEvent1 = new Date(convertToDate(eventos1[1]));

// var periocidad = 14

// document.write("El evento " + nameEvent1 + " que tuvo lugar el " +getDayName(dateEvent1)+ " se repetirá el " + getDayName(addDays(dateEvent1, periocidad)) + "</br></br>");


// // =============== test2


// var today = new Date();
// document.write("Hoy es " + getDayName(today)+"</br>");
// document.write("El evento que tuvo lugar el " + getDayName(dateEvent1) +"</br>");



// var difference = today.getTime() - dateEvent1.getTime();             //me lo deja en milisegundos asi que debo transformarlo a dias
// var days = Math.ceil(difference / (1000 * 3600 * 24));

// document.write("la resta es de " + days + " dias"+"</br>");
// var daysTillNextDate = Math.ceil(days/periocidad);
// // alert(daysTillNextDate);
// document.write(" se repetirá el " + getDayName(addDays(dateEvent1, daysTillNextDate*periocidad)) + "</br></br></br></br>");






// ========== con datos



// const datosJSON = '[{"name" : "Ashwin", "age" : "20"},{"name" : "Abhinandan", "age" : "20"}]';

const datosJSON = '[{"EventsName": "The great kingdom", "dateStart": "26/6/2022", "dateEnd": "25/6/2022", "periocity": "14"},{"EventsName": "The great construction", "dateStart": "27/6/2022", "dateEnd": "29/6/2022", "periocity": "14"},{"EventsName": "Faster growth; faster development", "dateStart": "21/6/2022", "dateEnd": "24/6/2022", "periocity": "14"}]';
const datos = JSON.parse(datosJSON);


var today = new Date();
var arrayToday = [];
var arrayTomorrow = [];
var arraySoon = [];




for (let i = 0; i < datos.length; i++) {
   const fecha = new Date(convertToDate(datos[i].dateStart));
   var periocidad = 14;
   var difference = today.getTime() - fecha.getTime();
   var days = Math.ceil(difference / (1000 * 3600 * 24));            //me lo deja en milisegundos asi que debo transformarlo a dias
   var daysTillNextDate = Math.ceil(days/periocidad);
   var nextDate = addDays(fecha, daysTillNextDate*periocidad);

   document.write(" se repetirá el " + getDayName(nextDate) + "</br>");


   dict = {      
          evento:   datos[i].EventsName,
          fechaInicio: datos[i].dateStart,
          periocidad: datos[i].periocity,
          proximoDia: getDayName(addDays(fecha, daysTillNextDate*periocidad)),
          descripcion: "desc" + i
      };


   if (daysTillNextDate == 0) {
      arrayToday.push(dict);
   } else if (daysTillNextDate == 1) {
      arrayTomorrow.push(dict);
   } else {
      arraySoon.push(dict);
   }   
}

console.log("eventos de hoy" + "</br>");
console.log(arrayToday);
console.log("eventos de mañana" + "</br>");
console.log(arrayTomorrow);
console.log("eventos proximos" + "</br>");
console.log(arraySoon);

// poner en 3 arrays diferentes eventos de Hoy, Mañana, y Proximos (eventos de ayer ya veré como lo hago)








// codigo: https://www.youtube.com/watch?v=jt0pKb_5aX0

// data source
const url = "https://raw.githubusercontent.com/AlePaff/lok-events/main/event.csv";

// getData function
async function getData() {

    // Part 1: Get CSV

    // fetch data
    const response = await fetch(url);
    // process data
    const rawData = await response.text();
    // publish data
    document.getElementById("csv").innerHTML = rawData;

    // developer info
    // console.log("rawData type: " + typeof rawData);      //rawData is a string variable



    // Part 2: CSV to JSON (JavaScript Object Notation)
    // credit: Stack Overflow User "Paath" on 2016-05-07

    // initialize variables
    let arrayOne = rawData.split("\r\n");
    let header = arrayOne[0].split(",");
    let noOfRow = arrayOne.length;
    let noOfCol = header.length;
    let jsonData = [];
    let i = 0;
    let j = 0;

    // for loop (rows)
    for (i = 1; i < noOfRow - 1; i++) {
        let obj = {};
        let myNewLine = arrayOne[i].split(",");
        // nested for loop (columns)
        for (j = 0; j < noOfCol; j++) {
            obj[header[j]] = myNewLine[j];
        };
        // generate JSON
        jsonData.push(obj);
    };
    // publish data in the html file
    document.getElementById("json").innerHTML = jsonData;
    // developer info
    console.log("jsonData type: " + typeof jsonData);       //jsonData is an object variable
    console.log(jsonData); 



    // Part 3: JSON to HTML Table
    // credit: Stack Overflow User "ray hatfield" on 2015-05-26

    // initialize variables
    let children = jsonData;
    let table = document.createElement("table");

    // function to generate table header row
    function addHeaders(table, keys) {
        let row = table.insertRow();
        for (i = 0; i < keys.length; i++) {
            let cell = row.insertCell();
            cell.appendChild(document.createTextNode(keys[i]));
        }
    }

    // generate table
    for (i = 0; i < children.length; i++) {
        let child = children[i];
        // generate header row
        if (i === 0) {
            addHeaders(table, Object.keys(child));
        }
        // generate data rows
        let row = table.insertRow();
        Object.keys(child).forEach(function (k) {
            let cell = row.insertCell();
            cell.appendChild(document.createTextNode(child[k]));
        })
    }

    // publish table
    document.getElementById("container").appendChild(table);

    // developer info
    console.log("HTML table type: " + typeof table);     //table is an object variable


}

// call function

// getData();