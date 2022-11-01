const convertDateFormat = timeStamp => {

   var date, month, year, hours, minutes
   timeStamp = new Date(timeStamp)
   date = timeStamp.getDate()
   month = timeStamp.getMonth()
   year = timeStamp.getFullYear()
   hours = timeStamp.getHours()
   minutes = timeStamp.getMinutes()

   var dateNow = new Date()

   var finalTimeStamp = () => {
         return month + '/' + date + '/' + year
   }

   return finalTimeStamp()
}

export default convertDateFormat