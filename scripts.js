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


 

crearTablas();

async function crearTablas(){
   const response = await fetch("events.json");
   const datos = await response.json();

   // console.log(datos);
   var today = new Date();
   var tomorrow = new Date();
   tomorrow.setDate(tomorrow.getDate()+1);

   var arrayToday = [];       //lista de diccionarios
   var arrayTomorrow = [];
   var arraySoon = [];

   // convertir los datos del JSON en variables para poder usarlas
   for (let i = 0; i < datos.length; i++) {
      const fecha = new Date(convertToDate(datos[i].dateStart1));
      var periocidad = datos[i].periocity1;
      var difference = today.getTime() - fecha.getTime();
      var days = Math.floor(difference / (1000 * 3600 * 24));            //me lo deja en milisegundos asi que debo transformarlo a dias
      var daysTillNextDate = Math.ceil(days/periocidad);
      var nextDate = addDays(fecha, daysTillNextDate*periocidad);

      // document.write(" se repetirá el " + getDayName(nextDate) + "</br>");
      dict = {      
             evento:   datos[i].eventsName,
             fechaInicio: datos[i].dateStart1,
             periocidad: datos[i].periocity1,
             proximoDia: getDayName(addDays(fecha, daysTillNextDate*periocidad)),
             duracion: datos[i].duration,
             descripcion: datos[i].description,
             consistente: datos[i].consistent,
             categoria: datos[i].category
         };

      // clasificacion de las secciones
      if (nextDate.toDateString() == today.toDateString()) {
         arrayToday.push(dict);
      } else if (nextDate.toDateString() == tomorrow.toDateString()) {
         arrayTomorrow.push(dict);
      } else {
         arraySoon.push(dict);
      }

   }

   // tests
   // console.log("eventos de hoy" + "</br>");
   // console.log(arrayToday);
   // console.log("eventos de mañana" + "</br>");
   // console.log(arrayTomorrow);
   // console.log("eventos proximos" + "</br>");
   // console.log(arraySoon);

   // si la prox. fecha es la de hoy entonces va en hoy
   // otra forma es ordenar el diccionario
   // poner en 3 arrays diferentes eventos de Hoy, Mañana, y Proximos (eventos de ayer ya veré como lo hago)

   document.getElementById("table_today").innerHTML = imprimirTabla(arrayToday);
   document.getElementById("table_tomorrow").innerHTML = imprimirTabla(arrayTomorrow);
   document.getElementById("table_soon").innerHTML = imprimirTabla(arraySoon);
}






// mostrar tablas en pantalla
nombresTabla = "<tr><th>"+"Events name"+"</th><th>"+"Next date"+"</th><th>"+"It repeats every: (days)"
+"</th><th>"+"Duration of the event"+"</th><th>"+"Quick description"+"</th><th>"+"fecha de inicio"+"</th><th>"+"consistent"+"</th>";

function imprimirTabla(eventosSeccion){  
   // eventosSeccion == lista de diccionarios
   tabla = "<table>";
   tabla += nombresTabla;
   for(var i = 0; i<eventosSeccion.length; i++){
      dicActual = eventosSeccion[i];
      tabla += "<tr><td>" + dicActual.evento + "</td><td>"+ dicActual.proximoDia + "</td><td>"+ dicActual.periocidad
      + "</td><td>"+ dicActual.duracion + "</td><td>"+ dicActual.descripcion + "</td><td>"+ dicActual.fechaInicio+"</td><td>"+dicActual.consistente+"</tr>";
   }

   tabla += "</table>"
   return tabla
};