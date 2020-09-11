// jshint esversion:6
function openPage(pageURL)
{
  window.location.href = pageURL;
}

$(function() {
  $('input[type=checkbox]').change(function() {
            var favorite = [];
            $.each($("input[type=checkbox]:checked"), function(){
                favorite.push(this.value);
            });
            favorite = favorite.map(Number);
            var sum = favorite.reduce(function(a, b) {
                return a + b;
            }, 0);
            var visasuma = document.getElementById("visasuma");
            var visasumaa = document.getElementById("visasumaa");
            visasuma.innerHTML = sum + '€';
            visasumaa.value = sum;
        });
    });

function onlyOne(checkbox) {
    var checkboxes = document.getElementsByName('check');
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false;
    });
}

function onlyOne1(checkbox) {
    var checkboxes = document.getElementsByName('check1');
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false;
    });
}

function validate() {

    var a = document.getElementById('vardas');
    var b = document.getElementById('pavarde');
    var c = document.getElementById('email');
    var d = document.getElementById('numeris');
    var message = document.getElementById('invalid-feedback');
    var message1 = document.getElementById('invalid-feedback1');
    var message2 = document.getElementById('invalid-feedback2');
    var message3 = document.getElementById('invalid-feedback3');

    var badColor = "#ff6666";

    if (!a.value || b.value.length == 0 || !c.value || !c.value.includes('@') || !d.value) {
      if(a)
      {
        message.style.color = badColor;

        if (!a.value) {
          message.innerHTML = "Įrašykite savo vardą";
        }

        else {
          message.innerHTML = "";
        }
      }

      if(b)
      {
        message1.style.color = badColor;

        if (b.value.length == 0) {
            message1.innerHTML = "Įrašykite savo pavardę";
        }

        else {
          message1.innerHTML = "";
        }
      }

      if(c)
      {
        message2.style.color = badColor;

        if (!c.value) {
          message2.innerHTML = "Įrašykite savo el. paštą";
        }

        else if (!c.value.includes('@')) {
            message2.innerHTML = "Neteisingas el.pašto formatas";
            return false;
        }

        else {
          message2.innerHTML = "";
        }
      }

      if(d)
      {
        message3.style.color = badColor;

        if (!d.value) {
          message3.innerHTML = "Įrašykite savo tel. numerį";
        }

        else {
          message3.innerHTML = "";
        }
      }

      return false;
    }

    else {
      return true;
    }
}

function validate1() {

    var a = document.getElementById('pris');
    var b = document.getElementById('slapt');
    var message = document.getElementById('invalid-feedback5');
    var message1 = document.getElementById('invalid-feedback7');

    var badColor = "#ff6666";

    if (!a.value || !b.value || a.value != 'karolinanailartist' || b.value != 'karolinospuslapis') {
      if(a)
      {
        message.style.color = badColor;

        if (!a.value) {
          message.innerHTML = "Įrašykite savo vardą";
        }

        else if (a.value != 'karolinanailartist') {
          message.innerHTML = "Neteisingas prisijungimo vardas";
        }

        else {
          message.innerHTML = "";
        }
      }

      if(b)
      {
        message1.style.color = badColor;

        if (b.value.length == 0) {
            message1.innerHTML = "Įrašykite savo pavardę";
        }

        else if (b.value != 'karolinospuslapis') {
          message.innerHTML = "Neteisingas slaptažodis";
        }

        else {
          message1.innerHTML = "";
        }
      }

      return false;
    }

    else {
      return true;
    }
}
