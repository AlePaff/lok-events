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



// devuelve un objeto Date que tiene la hora actual en UTC. (para que dependa de una ciudad elegida ver el link)
// https://www.techrepublic.com/article/convert-the-local-time-to-another-time-zone-with-this-javascript/
function getUTC() {
    // create Date object for current location
    d = new Date();
   
    // convert to msec, add local time zone offset, get UTC time in msec
    utc = d.getTime() + (d.getTimezoneOffset() * 60 * 1000);
   
    // create new Date object based on utc
    nd = new Date(utc);
   return nd;
}




crearTablas();
async function crearTablas(){
   const response = await fetch("events.json");
   const datos = await response.json();

   // console.log(datos);
   // var today = new Date();
   // var tomorrow = new Date();
   var today = getUTC();
   var tomorrow = getUTC();
   tomorrow.setDate(tomorrow.getDate()+1);

   var arrayToday = [];       //lista de diccionarios
   var arrayTomorrow = [];
   var arraySoon = [];
   var arraySpecial = [];


   // convertir los datos del JSON en variables para poder usarlas
   for (let i = 0; i < datos.length; i++) {
      const fecha = new Date(convertToDate(datos[i].dateStart1));
      var periocidad = datos[i].periocity1;
      var difference = today.getTime() - fecha.getTime();
      var days = Math.floor(difference / (1000 * 3600 * 24));            //me lo deja en milisegundos asi que debo transformarlo a dias
      var daysTillNextDate = Math.ceil(days/periocidad);
      var nextDate = addDays(fecha, daysTillNextDate*periocidad);

      var nextDateEnd = structuredClone(nextDate);       //hacer una copia profunda (una desconectada de la original)
      nextDateEnd.setDate(nextDateEnd.getDate() + datos[i].duration);

      // document.write(" se repetirá el " + getDayName(nextDate) + "</br>");
      dict = {      
             evento:   datos[i].eventsName,
             fechaInicio: datos[i].dateStart1,
             fechaFinal: (datos[i].dateEnd1),
             periocidad: datos[i].periocity1,
             proximoDia: getDayName(addDays(fecha, daysTillNextDate*periocidad)),
             duracion: datos[i].duration,
             descripcion: datos[i].description,
             consistente: datos[i].consistent,
             categoria: datos[i].category
         };

console.log(today.getTimezoneOffset());


      // clasificacion de las secciones
      if (datos[i].category == "Special") {
         arraySpecial.push(dict);
      } else if (nextDate.toDateString() == today.toDateString()) {
      // if ((nextDate <= today) && (today <= nextDateEnd)) {        //si hoy cae en el intervalo entre inicio y final del evento
         arrayToday.push(dict);
      } else if (nextDate.toDateString() == tomorrow.toDateString()) {
         arrayTomorrow.push(dict);
      } else {
         arraySoon.push(dict);
      }

   }





// ordenar lista de diccionarios por fecha en orden ascendiente
arraySoon.sort(function (a, b) {
   var dateA = new Date(a.proximoDia), dateB = new Date(b.proximoDia)
   return dateA - dateB
});

   document.getElementById("table_today").innerHTML = imprimirTabla(arrayToday);
   document.getElementById("table_tomorrow").innerHTML = imprimirTabla(arrayTomorrow);
   document.getElementById("table_soon").innerHTML = imprimirTabla(arraySoon);
   document.getElementById("table_special").innerHTML = imprimirTabla(arraySpecial);

}





// mostrar tablas en pantalla
nombresTabla = "<tr><th>"+"Events name"+"</th><th>"+"Next date"+"</th><th>"+"It repeats every: (days)"
+"</th><th>"+"Duration of the event"+"</th><th>"+"Quick description"+"</th><th>"+"First registered date"+"</th><th>"+"Consistent?"+"</th>";


function imprimirTabla(eventosSeccion){  
   // eventosSeccion == lista de diccionarios
   tabla = "<table>";
   tabla += nombresTabla;
   for(var i = 0; i<eventosSeccion.length; i++){

      dicActual = eventosSeccion[i];

      //no poner nada es lo mismo que poner == true
      if(dicActual.consistente){
         checkmark = '<td align="center" style="text-align:center; font-size:150%; font-weight:bold; color:green;">&#10004;</tr>';
      } else {
         checkmark = '<td align="center" style="text-align:center; font-size:150%; font-weight:bold; color:red;">&#x2717;</tr>';
      }

      tabla += "<tr><td>" + dicActual.evento + "</td><td>"+ dicActual.proximoDia + "</td><td>"+ dicActual.periocidad
      + "</td><td>"+ dicActual.duracion + "</td><td>"+ dicActual.descripcion + "</td><td>"+ dicActual.fechaInicio + checkmark;
   }

   tabla += "</table>"
   return tabla
};


