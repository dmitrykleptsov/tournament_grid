var Timer;
var steps = 0;

function createGrid() {
  $('.menu').css('transform', 'translateY(-800px)');
  Timer = setTimeout("loading()", 1000);
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
  console.log(value);
}

function getMode(selectObject) {
  var value = selectObject.value;
  console.log(value);
}