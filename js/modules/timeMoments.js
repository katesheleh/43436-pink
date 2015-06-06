var startDay = document.getElementById('start-date');
var finishDay = document.getElementById('back-date');
var interval = document.getElementById('duration-day');


if(startDay) {
  startDay.addEventListener('change', onDateChange);
finishDay.addEventListener('change', onDateChange);

function onDateChange() {
  var dateB = startDay.value;
  var dateC = finishDay.value;
  var diff = 0;
    if (dateB.length && dateC.length) {
      dateB = moment(dateB);
      dateC = moment(dateC);
      diff = dateC.diff(dateB, 'days');
        if( diff <= 0) {
          diff = "";
        }
        interval.value = diff;
      }
    }
}
