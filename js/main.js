var Timer;
var steps = 0;
var stepsTimer = 0;
var valueT;
var valueM;
var divGrid = '<div class="gridSquads" id="grid-$id"></div>';

function createGrid() {
  var teams = id("teams");
  var modes = id("mode");
  var checkSelectedT = teams.options[teams.selectedIndex].value;
  var checkSelectedM = modes.options[modes.selectedIndex].value;
  if (checkSelectedT == "0") {
    $('.errorTeams').css('opacity', '1');
    id("errorT").innerHTML = "Выберите количество команд";
  } else if (checkSelectedM == "0") {
    $('.errorMode').css('opacity', '1');
    id("errorM").innerHTML = "Выберите режим турнира";
  } else {
    $('.menu').css('transform', 'translateY(-800px)');
    Timer = setTimeout("loading()", 1000);
  }
}

function displayGrid() {

  id('displayMode').innerHTML = valueM;

  //  id('infoFirstStageL').innerHTML = "1/" + valueT;
  //  id('infoFirstStageR').innerHTML = "1/" + valueT;
  //  id('infoSecondStageL').innerHTML = "1/" + valueT / 2;
  //  id('infoSecondStageR').innerHTML = "1/" + valueT / 2;

  for (var i = 0; i < valueT; i++) {
    if (i + 1 <= valueT / 2) {
      $('.leftOne').append(divGrid
        .replace('$id', +i + 1)
        .replace('gridSquads', 'gridSquads gridLeftOne'));
      id('grid-' + (i + 1)).innerHTML = "Team #" + (i + 1);
      if ((i + 1) % 2 == 1) {
        $('.linear').css({
          'display': 'block',
          'width': '65px',
          'height': '65px',
          'border': '1px solid lightgray',
          'position': 'absolute'
        });
      }
    } else {
      $('.rightOne').append(divGrid
        .replace('$id', +i + 1)
        .replace('gridSquads', 'gridSquads gridRightOne'));
      id('grid-' + (i + 1)).innerHTML = "Team #" + (i + 1);
    }
  }

  for (var i = 0; i < valueT / 2; i++) {
    if (i + 1 <= valueT / 4) {
      $('.leftTwo').append(divGrid
        .replace('$id', 'o' + (i + 1))
        .replace('gridSquads', 'gridSquads gridLeftTwo'));
    } else {
      $('.rightTwo').append(divGrid
        .replace('$id', 'o' + (i + 1))
        .replace('gridSquads', 'gridSquads gridRightTwo'));
    }
  }
  $('.final').css('top', '178px');
  $('.leftSize').css('margin-left', '410px');
  $('.rightSize').css('margin-right', '410px');

  if (valueT >= 8) {
    for (var i = 0; i < valueT / 4; i++) {
      if (i + 1 <= valueT / 8) {
        $('.leftThree').append(divGrid
          .replace('$id', 'tw' + (i + 1))
          .replace('gridSquads', 'gridSquads gridLeftThree'));
      } else {
        $('.rightThree').append(divGrid
          .replace('$id', 'tw' + (i + 1))
          .replace('gridSquads', 'gridSquads gridRightThree'));
      }
    }
    $('.final').css('top', '238px');
    $('.leftSize').css('margin-left', '200px');
    $('.rightSize').css('margin-right', '200px');


    if (valueT >= 16) {
      for (var i = 0; i < valueT / 8; i++) {
        if (i + 1 <= valueT / 16) {
          $('.leftFour').append(divGrid
            .replace('$id', 'th' + (i + 1))
            .replace('gridSquads', 'gridSquads gridLeftFour'));
        } else {
          $('.rightFour').append(divGrid
            .replace('$id', 'th' + (i + 1))
            .replace('gridSquads', 'gridSquads gridRightFour'));
        }
      }
      $('.final').css('top', '358px');
      $('.leftSize').css('margin-left', '20px');
      $('.rightSize').css('margin-right', '20px');

      if (valueT >= 32) {
        for (var i = 0; i < valueT / 16; i++) {
          if (i + 1 <= valueT / 32) {
            $('.leftFive').append(divGrid
              .replace('$id', 'f' + (i + 1))
              .replace('gridSquads', 'gridSquads gridLeftFive'));
          } else {
            $('.rightFive').append(divGrid
              .replace('$id', 'f' + (i + 1))
              .replace('gridSquads', 'gridSquads gridRightFive'));
          }
        }
        $('.final').css('top', '598px');
      }
      if (valueT >= 64) {
        for (var i = 0; i < valueT / 32; i++) {
          if (i + 1 <= valueT / 64) {
            $('.leftSix').append(divGrid
              .replace('$id', 's' + (i + 1))
              .replace('gridSquads', 'gridSquads gridLeftSix'));
            $('#grid-f1').css('top', '540px');
            $('#grid-f3').css('top', '1500px');
            $('#grid-f4').css('top', '1620px');
          } else {
            $('.rightSix').append(divGrid
              .replace('$id', 's' + (i + 1))
              .replace('gridSquads', 'gridSquads gridRightSix'));
          }
        }
        $('.final').css('top', '1074px');
        $('.final').css('left', '802px');
      }
    }
  }

  $('.grid').css('display', 'block');
}

function loading() {
  $('.menu').css('display', 'none');
  $('.loading').css('display', 'block');
  loader();
}

function loader() {
  steps++;
  stepsTimer++;
  console.log(stepsTimer);
  if (steps == 1) {
    id("load").innerHTML = ".";
  } else if (steps == 2) {
    id("load").innerHTML = "..";
  } else if (steps == 3) {
    id("load").innerHTML = "...";
    steps = 0;
  }
  Timer = setTimeout("loader()", 1000);
  if (stepsTimer == 3) {
    stopTimer();
    $('.loading').css('display', 'none');
    displayGrid();
  }
}

function getTeams(selectObject) {
  valueT = selectObject.value;
  $('.errorTeams').css('opacity', '0');
}

function getMode(selectObject) {
  valueM = selectObject.value;
  $('.errorMode').css('opacity', '0');
}

function stopTimer() {
  clearTimeout(Timer);
}

function id(id) {
  return document.getElementById(id);
}
