var Timer;
var steps = 0;


function createGrid() {
  var teams = document.getElementById("teams");
  var modes = document.getElementById("mode");
  var checkSelectedT = teams.options[teams.selectedIndex].value;
  var checkSelectedM = modes.options[modes.selectedIndex].value;
  if (checkSelectedT == "0") {
    $('.errorTeams').css('opacity', '1');
    document.getElementById("errorT").innerHTML = "Выберите количество команд";
  } else if (checkSelectedM == "0") {
    $('.errorMode').css('opacity', '1');
    document.getElementById("errorM").innerHTML = "Выберите режим турнира";
  } else {
    $('.menu').css('transform', 'translateY(-800px)');
    Timer = setTimeout("loading()", 1000);
  }
}

function loading() {
  $('.menu').css('display', 'none');
  $('.loading').css('display', 'block');
  loader();
}

function loader() {
  console.log(steps);
  steps++;
  if (steps == 1) {
    document.getElementById("load").innerHTML = ".";
  } else if (steps == 2) {
    document.getElementById("load").innerHTML = "..";
  } else if (steps == 3) {
    document.getElementById("load").innerHTML = "...";
    steps = 0;
  }
  Timer = setTimeout("loader()", 1000);
}

function getTeams(selectObject) {
  var value = selectObject.value;
  $('.errorTeams').css('opacity', '0');
  console.log(value);
}

function getMode(selectObject) {
  var value = selectObject.value;
  $('.errorMode').css('opacity', '0');
  console.log(value);
}