// jshint esversion:6
$(document).ready(function() {

  $('#calendar').fullCalendar({
    defaultView: 'month',
    selectable: true,
    minTime: "08:00:00",
    maxTime: "20:00:00",
    slotDuration: '00:10:00',
    slotLabelInterval: 10,
    allDaySlot: false,
    slotLabelFormat: 'H:mm',
    eventOverlap: false,
    header: {
      left: 'prev,next',
      center: 'title',
      right: 'agendaDay,agendaWeek,month'
    },
    businessHours: [{
      dow: [1, 3],
      start: '10:00',
      end: '14:00',
    },
    {
      dow: [1, 3],
      start: '15:00',
      end: '19:00',
    },
    {
      dow: [2, 4],
      start: '08:00',
      end: '13:00',
    },
    {
      dow: [2, 4],
      start: '14:00',
      end: '18:00',
    },
    {
      dow: [5],
      start: '09:00',
      end: '13:00',
    },
    {
      dow: [5],
      start: '14:00',
      end: '18:00',
    }
  ],
    eventColor: 'red',
    events: '../json/events.json',
    selectConstraint: "businessHours",
    dayClick: function(date) {
      $('#calendar').fullCalendar('changeView', 'agendaDay', date);
    },
    select: function(date, start, end, jsEvent) {
      var view = $('#calendar').fullCalendar('getView');
      if(view.type == 'agendaDay') {
        if (start.isAfter(moment())) {
          var y = parseInt(start.format('YYYY'));
          var m = start.format('M') - 1;
          var d = parseInt(start.format('D'));
          var endtime = moment(getTime(start));
          var endhour = parseInt(endtime.format('H'));
          var endminute = parseInt(endtime.format('m'));
          var proceduros = [];
          var idSelector = function() {
            proceduros.push($('label[for="' + this.id + '"]').text()); // laikas
            return this.id;
          };
          var fruitsGranted = $(":checkbox:checked").map(idSelector).get(); // id
          var title = "";
          for(var i = 0; i< proceduros.length; i++)
          {
            title += proceduros[i] + '; ';
          }
          var proc = document.getElementById('proceduros').value = title;
          var eventob = addCalendarEvent(start, new moment.utc([y, m, d, endhour, endminute, 0, 0]), title);
          if(isBusiness(eventob, date) == true) {
            if(isAnOverlapEvent(eventob) == false) {
              if(iki16(date) == true) {
                if (title) {
                    $("#calendar").fullCalendar('renderEvent', {
                        title: title,
                        start: start,
                        end: endtime,
                        stick: true,
                        color: 'red'
                    }, true);
                  alert('Vizitas rezervuotas: ' + start.format("h(:mm)"));
                  storedata(start, endtime);
                  }
                }
                else {
                  alert('Vizitą galima rezervuoti likus ne mažiau kaip 16 valandų iki pasirinkto laiko');
                }
              } else {
               alert('Kertasi laikai su kitu klientu');
             }
           } else {
             alert('Kertasi laikai su nedarbo valandomis');
           }
          }
         else {
          alert('Negalima rezervuotis laiko praeityje');
        }
      }
    }
  });
});

function addCalendarEvent(start, end, title) {
  var eventObject = {
    start: start,
    end: end,
    title: title
  };
  return eventObject;
}

function isAnOverlapEvent(eventToCheck) {
    var events = $("#calendar").fullCalendar('clientEvents');
    const startMoment = eventToCheck.start;
    const endMoment = eventToCheck.end;
    try {
        if (moment.isMoment(startMoment) && moment.isMoment(endMoment)) {
            for (let i = 0; i < events.length; i++) {
                const eventA = events[i];
                if (moment.isMoment(eventA.start) && moment.isMoment(eventA.end)) {
                    // start-time in between any of the events
                    if (moment(startMoment).isAfter(eventA.start) && moment(startMoment).isBefore(eventA.end)) {
                        console.log("start-time in between any of the events");
                        return true;
                    }
                    //end-time in between any of the events
                    if (moment(endMoment).isAfter(eventA.start) && moment(endMoment).isBefore(eventA.end)) {
                        console.log("end-time in between any of the events");
                        return true;
                    }
                    //any of the events in between/on the start-time and end-time
                    if (moment(startMoment).isSameOrBefore(eventA.start) && moment(endMoment).isSameOrAfter(eventA.end)) {
                        console.log("any of the events in between/on the start-time and end-time");
                        return true;
                    }
                } else {
                    const error = 'Error, Any event on array of events is not valid. start or end are not Moment objects';
                    console.error(error);
                    throw new Error(error);
                }
            }
            return false;
        } else {
            const error = 'Error, start or end are not Moment objects';
            console.error(error);
            throw new Error(error);
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

 function getTime(start) {
     var response1 = [];
     var idSelector = function() {
       response1.push($('label[id="' + this.id + '"]').text()); // laikas
       return this.id;
     };
     var fruitsGranted = $(":checkbox:checked").map(idSelector).get(); // id
     var response = $(':checkbox:checked').next('label').text(); // procedura
     var visasuma = document.getElementById("visasuma").innerHTML;// kaina
     var duration = 0;
     for(var i = 0; i < response1.length; i++) {
          duration += parseInt(response1[i].trim(':')) * 60 + parseInt((response1[i].split(':')[1]));
      }
      start.subtract(10, 'minutes');
      var endtime = moment(start);
      endtime.add(duration, 'minutes');
      return endtime;
}

function storedata(start, end) {
  document.getElementById("laikasnuo").value = start.format();
  document.getElementById("laikasiki").value = end.format();
}

function isBusiness(eventToCheck, date) {

  var format = 'HH:mm:ss';
  var day = moment(date).day();
  console.log(day);

  var start = moment(eventToCheck.start).format(format);
  var end = moment(eventToCheck.end).format(format);
  console.log(start, end);

  const startMoment = moment(start, format);
  const endMoment = moment(end, format);
  console.log(startMoment, endMoment);

  if(day == 1 || day == 3) {

    var beforeTime2 = moment('10:00:00', format),
      afterTime2 = moment('14:00:00', format);  // [1, 3] 10:00 - 14:00

    var beforeTime3 = moment('15:00:00', format),
      afterTime3 = moment('19:00:00', format);  // [1, 3] 15:00 - 19:00

      if(startMoment.isBetween(beforeTime2, afterTime2)) {
        if(endMoment.isBetween(beforeTime2, afterTime2)) {
          console.log('is between');
          return true;
        }
      }

      if(startMoment.isBetween(beforeTime3, afterTime3)) {
        if(endMoment.isBetween(beforeTime3, afterTime3)) {
          console.log('is between');
          return true;
        }
      }

      else {
        console.log('not between');
        return false;
      }

  }

  if(day == 2 || day == 4) {

    var beforeTime = moment('08:00:00', format),
      afterTime = moment('13:00:00', format);  // [2, 4] 08:00 - 13:00

    var beforeTime1 = moment('14:00:00', format),
      afterTime1 = moment('18:00:00', format);  // [2, 4] 14:00 - 18:00

      if(startMoment.isBetween(beforeTime, afterTime)) {
        if(endMoment.isBetween(beforeTime, afterTime)) {
          console.log('is between');
          return true;
        }
      }

      if(startMoment.isBetween(beforeTime1, afterTime1)) {
        if(endMoment.isBetween(beforeTime1, afterTime1)) {
          console.log('is between');
          return true;
        }
      }

      else {
        console.log('not between');
        return false;
      }

  }

  if(day == 5) {

    var beforeTime4 = moment('09:00:00', format),
      afterTime4 = moment('13:00:00', format);  // [5] 08:00 - 13:00

    var beforeTime5 = moment('14:00:00', format),
      afterTime5 = moment('18:00:00', format);  // [5] 14:00 - 18:00

      if(startMoment.isBetween(beforeTime4, afterTime4)) {
        if(endMoment.isBetween(beforeTime4, afterTime4)) {
          console.log('is between');
          return true;
        }
      }

      if(startMoment.isBetween(beforeTime5, afterTime5)) {
        if(endMoment.isBetween(beforeTime5, afterTime5)) {
          console.log('is between');
          return true;
        }
      }

      else {
        console.log('not between');
        return false;
      }

  }
}

function iki16(date) {
  var start = new moment();
  var duration = moment.duration(date.diff(start));
  var hours = duration.asHours();
  if (hours < 16) {
    return false;
  }
  else {
    return true;
  }
}
