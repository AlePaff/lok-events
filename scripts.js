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
var event1 = 'The growth of the kingdom;27/04/2022; 14; 2; Investigation, construction and combat points';
var event2 = 'The great kingdom;24/05/2022; 14; 2; 5 stages: 1. train (up to 100k points), 2. fight (kill monsters up to 100k points) 3.gather (up to 100k event point) 4 power (up to 100k power points) 5. Kill event (up to 100k kill/injure points)';
// var eventos1 = event1.split(';');
var eventos1 = event2.split(';');     //borrar esta linea y dejar la anterior


const nameEvent1 = eventos1[0]
const dateEvent1 = new Date(convertToDate(eventos1[1]));

var periocidad = 14

document.write("El evento " + nameEvent1 + " que tuvo lugar el " +getDayName(dateEvent1)+ " se repetirá el " + getDayName(addDays(dateEvent1, periocidad)) + "</br></br>");


// =============== test2
var today = new Date();
document.write("Hoy es " + getDayName(today)+"</br>");
document.write("El evento que tuvo lugar el " + getDayName(dateEvent1) +"</br>");



var difference = today.getTime() - dateEvent1.getTime();             //me lo deja en milisegundos asi que debo transformarlo a dias
var days = Math.ceil(difference / (1000 * 3600 * 24));

document.write("la resta es de " + days + " dias"+"</br>");
var daysTillNextDate = Math.ceil(days/periocidad);
alert(daysTillNextDate);
document.write(" se repetirá el " + getDayName(addDays(dateEvent1, daysTillNextDate*periocidad)) + "</br>");


