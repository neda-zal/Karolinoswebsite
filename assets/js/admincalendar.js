// jshint esversion:6
$(document).ready(function() {

  $('#calendar1').fullCalendar({
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
    }],
    eventColor: 'red',
    events: '../json/realevents.json',
    selectConstraint: "businessHours",
    dayClick: function(date) {
      $('#calendar1').fullCalendar('changeView', 'agendaDay', date);
    },
    select: function(date, start, end, jsEvent) {
      var view = $('#calendar1').fullCalendar('getView');
      if(view.type == 'agendaDay') {
        if (start.isAfter(moment())) {
          start.subtract(10, 'minutes');
          var y = parseInt(start.format('YYYY'));
          var m = start.format('M') - 1;
          var d = parseInt(start.format('D'));

          var eventTitle = prompt("Įrašykite pavadinimą: ");
          var endTime = prompt('Įrašykite pabaigos laiką (HH:MM):');

          var endhour = parseInt((endTime.trim(":")));
          var endminute = parseInt((endTime.split(':')[1]));
          var endtime = new moment.utc([y, m, d, endhour, endminute, 0, 0]);

          var eventob = addCalendarEvent(start, endtime, eventTitle);

          if(isAnOverlapEvent(eventob) == false) {
            if (eventTitle) {
                $("#calendar1").fullCalendar('renderEvent', {
                    title: eventTitle,
                    start: start,
                    end: endtime,
                    stick: true,
                    color: 'red'
                }, true);
              alert('Laikas rezervuotas: ' + start.format("h:mm") + " - " + endtime.format("h:mm"));
              storedata(start, endtime, eventTitle);
              }
            } else {
             alert('Kertasi laikai su kitu klientu');
           }
          }
         else {
          alert('Negalima rezervuotis laiko praeityje');
        }
      }
    },
    eventClick: function(event) {
        console.log(event.start._i);
        console.log(event.end._i);
        if (confirm('Ar tikrai norite ištrinti šį vizitą?')) {
          storedata1(event.start._i, event.end._i);
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
    var events = $("#calendar1").fullCalendar('clientEvents');
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

function storedata(start, end, pavadinimas) {
  document.getElementById("laikasnuo").value = start.format();
  document.getElementById("laikasiki").value = end.format();
  document.getElementById("pavadinimas").value = pavadinimas;
}

function storedata1(start, end) {
  document.getElementById("laikasnuo1").value = start;
  document.getElementById("laikasiki1").value = end;
}

/*
$.getJSON( "../json/realevents.json", function(data) {
      if(data) {
          var events = [];
          $.each(data, function(index, value){
              events.push({
                title : value.title + value.description,
                id: value.description,
                start : new moment(value.start).format(),
                end : new moment(value.end).format(),
                });
            });
          $("#calendar1").fullCalendar( 'addEventSource', events);
          }
    });*/
