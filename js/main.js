var Timer,
  steps = 0, // Переменная для загрузочного экрана
  stepsTimer = 0, // Переменная для загрузочного экрана
  valueT, // Кол-во команд
  valueM, // Режим турнира
  count = 1, // Переменная для рассчета этапа турнира
  divGrid = '<div class="gridSquads" id="grid-$preId$id"></div>', // Блоки с командами
  divInfo = '<div class="infoStage$lor">$num</div>'; // Этапы турнира

// Получение необходимых значений и запуск загрузочного экрана
function createGrid() {
  var teams = id("teams"),
    modes = id("mode"),
    checkSelT = teams.options[teams.selectedIndex].value,
    checkSelM = modes.options[modes.selectedIndex].value;
  if (checkSelT == "0") {
    $('.errorTeams').css('opacity', '1');
    id("errorT").innerHTML = "Выберите количество команд";
  }
  if (checkSelM == "0") {
    $('.errorMode').css('opacity', '1');
    id("errorM").innerHTML = "Выберите режим турнира";
  }
  if (checkSelM != '0' && checkSelT != '0') {
    $('.menu').css('transform', 'translateY(-800px)');
    Timer = setTimeout("loading()", 1000);
  }
}

// Построение сетки
function displayGrid() {

  // Обычный способ

  /* for (var i = 0; i < valueT; i++) {
        if (i + 1 <= valueT / 2) {
          $('.left1').append(divGrid
            .replace('$id', '1' + (i + 1))
            .replace('gridSquads', 'gridSquads gridLeft1'));
          id('grid-1' + (i + 1)).innerHTML = "Team #" + (i + 1);
        } else {
          $('.right1').append(divGrid
            .replace('$id', '1' + (i + 1))
            .replace('gridSquads', 'gridSquads gridRight1'));
          id('grid-1' + (i + 1)).innerHTML = "Team #" + (i + 1);
        }
      }
      infoList();
      for (var i = 0; i < valueT / 2; i++) {
        if (i + 1 <= valueT / 4) {
          $('.left2').append(divGrid
            .replace('$id', '2' + (i + 1))
            .replace('gridSquads', 'gridSquads gridLeft2'));
        } else {
          $('.right2').append(divGrid
            .replace('$id', '2' + (i + 1))
            .replace('gridSquads', 'gridSquads gridRight2'));
        }
      }
      infoList();
      if (valueT >= 8) {
        for (var i = 0; i < valueT / 4; i++) {
          if (i + 1 <= valueT / 8) {
            $('.left3').append(divGrid
              .replace('$id', '3' + (i + 1))
              .replace('gridSquads', 'gridSquads gridLeft3'));
          } else {
            $('.right3').append(divGrid
              .replace('$id', '3' + (i + 1))
              .replace('gridSquads', 'gridSquads gridRight3'));
          }
        }
        infoList();
        if (valueT >= 16) {
          for (var i = 0; i < valueT / 8; i++) {
            if (i + 1 <= valueT / 16) {
              $('.left4').append(divGrid
                .replace('$id', '4' + (i + 1))
                .replace('gridSquads', 'gridSquads gridLeft4'));
            } else {
              $('.right4').append(divGrid
                .replace('$id', '4' + (i + 1))
                .replace('gridSquads', 'gridSquads gridRight4'));
            }
          }
          infoList();
          if (valueT >= 32) {
            for (var i = 0; i < valueT / 16; i++) {
              if (i + 1 <= valueT / 32) {
                $('.left5').append(divGrid
                  .replace('$id', '5' + (i + 1))
                  .replace('gridSquads', 'gridSquads gridLeft5'));
              } else {
                $('.right5').append(divGrid
                  .replace('$id', '5' + (i + 1))
                  .replace('gridSquads', 'gridSquads gridRight5'));
              }
            }
            infoList();
          }
          if (valueT >= 64) {
            for (var i = 0; i < valueT / 32; i++) {
              if (i + 1 <= valueT / 64) {
                $('.left6').append(divGrid
                  .replace('$id', '6' + (i + 1))
                  .replace('gridSquads', 'gridSquads gridLeft6'));
              } else {
                $('.right6').append(divGrid
                  .replace('$id', '6' + (i + 1))
                  .replace('gridSquads', 'gridSquads gridRight6'));
              }
            }
            infoList();
          }
        }
      } */

  id('displayMode').innerHTML = valueM; // Вывод режима турнира

  // Улучшенный способ построения сетки

  var k = 1,
    l = 1,
    countD = 0;

  for (var i = 4; i <= valueT * 2; i *= 2) {
    k *= 2;
    countD++;
    for (var j = 1; j <= valueT / l; j++) {
      if (valueT != 64) {
        if (j <= valueT / k) {
          $('.left' + countD).append(divGrid
            .replace('$preId', countD)
            .replace('$id', j)
            .replace('gridSquads', 'gridSquads gridLeft' + countD)
          );
          if (countD == 1) {
            id('grid-1' + j).innerHTML = "Team #" + j;
          }
        } else {
          $('.right' + countD).append(divGrid
            .replace('$preId', countD)
            .replace('$id', j)
            .replace('gridSquads', 'gridSquads gridRight' + countD)
          );
          if (countD == 1) {
            id('grid-1' + j).innerHTML = "Team #" + j;
          }
        }
      } else {
        $('.left' + countD).append(divGrid
          .replace('$preId', countD)
          .replace('$id', j)
          .replace('gridSquads', 'gridSquads gridLeft' + countD)
        );
        if (countD == 1) {
          id('grid-1' + j).innerHTML = "Team #" + j;
        }
      }
    }
    l *= 2;
    infoList();
  }

  styleGrids(); // Стилизация выбранной сетки
  $('.grid').css('display', 'block'); // Вывод самой сетки
}

// Стили для каждой из сеток
function styleGrids() {
  if (valueT == 4) {
    $('body').css('background-image', 'url("img/bg-4.png")');
    $('.infoStageL:first-child').css('margin-left', '395px');
    $('.infoStageR:nth-child(2)').css('margin-right', '395px');
    $('.leftSize').css('margin-left', '410px');
    $('.rightSize').css('margin-right', '410px');
  } else if (valueT == 8) {
    $('body').css('background-image', 'url("img/bg-8.png")');
    $('.infoStageL:first-child').css('margin-left', '185px');
    $('.infoStageR:nth-child(2)').css('margin-right', '185px');
    $('.leftSize').css('margin-left', '200px');
    $('.rightSize').css('margin-right', '200px');
  } else if (valueT == 16) {
    $('body').css('background-image', 'url("img/bg-16.png")');
    $('.infoStageL:first-child').css('margin-left', '5px');
    $('.infoStageR:nth-child(2)').css('margin-right', '5px');
    $('.leftSize').css('margin-left', '20px');
    $('.rightSize').css('margin-right', '22px');
  } else if (valueT == 32) {
    $('body').css('background-image', 'url("img/bg-32.png")');
    $('.infoStageR:nth-child(2)').css('margin-right', '10px');
    $('.leftSize').css('margin-left', '20px');
    $('.rightSize').css('margin-right', '22px');
    $('.gridLeft5').css({
      'position': 'absolute',
      'top': '708px',
      'left': '760px'
    });
  } else {
    $('.rightSize').css('display', 'none');
    $('body').css('background-image', 'url("img/bg-64.png")');
    $('.gridLeft5').css({
      'margin': '450px 0px 920px 768px'
    });
    $('.gridLeft6').css({
      'margin': '1130px 0px 1877px 1000px'
    });
  }
  marginBottom();
}

// Информация о этапе турнира
function infoList() {
  if (valueT != 64) { // Для зеркальной сетки
    if (valueT / count == 2) {
      $('.infoList').append(divInfo
        .replace('$lor', 'C')
        .replace('$num', 'Финал')
      );
    } else {
      $('.infoList').append(divInfo
        .replace('$lor', 'L')
        .replace('$num', '1/' + valueT / count)
      );

      $('.infoList').append(divInfo
        .replace('$lor', 'R')
        .replace('$num', '1/' + valueT / count)
      );
      if (count == 1) {
        count++;
      } else {
        count *= 2;
      }
    }
  } else { // Для обычной сетки, с 64 командами
    $('.infoStageL:first-child').css('margin-left', '10px');
    if (valueT / count == 2) {
      $('.infoList').append(divInfo
        .replace('$lor', 'L')
        .replace('$num', 'Финал')
      );
    } else {
      $('.infoList').append(divInfo
        .replace('$lor', 'L')
        .replace('$num', '1/' + valueT / count)
      );
      if (count == 1) {
        count++;
      } else {
        count *= 2;
      }
    }
  }
}

// Показ загрузочного экрана
function loading() {
  $('.menu').css('display', 'none');
  $('.loading').css('display', 'block');
  loader();
}

// Сам загрузочный экран
function loader() {
  steps++;
  stepsTimer++;
  if (steps == 1) {
    id("load").innerHTML = ".";
  } else if (steps == 2) {
    id("load").innerHTML = "..";
  } else if (steps == 3) {
    id("load").innerHTML = "...";
    steps = 0;
  }
  Timer = setTimeout("loader()", 1000);
  if (stepsTimer == 1) {
    stopTimer();
    $('.loading').css('display', 'none');
    displayGrid();
  }
}

// Отмена отступов каждого последнего элемента всех этапов
function marginBottom() {
  $('.gridLeft1:last-child').css({
    'margin-bottom': '0px'
  });
  $('.gridLeft2:last-child').css({
    'margin-bottom': '0px'
  });
  $('.gridLeft3:last-child').css({
    'margin-bottom': '0px'
  });
  $('.gridLeft4:last-child').css({
    'margin-bottom': '0px'
  });
  $('.gridRight1:last-child').css({
    'margin-bottom': '0px'
  });
  $('.gridRight2:last-child').css({
    'margin-bottom': '0px'
  });
  $('.gridRight3:last-child').css({
    'margin-bottom': '0px'
  });
  $('.gridRight4:last-child').css({
    'margin-bottom': '0px'
  });
  $('.gridLeft5:last-child').css({
    'margin-bottom': '0px'
  });
  $('.gridLeft6:last-child').css({
    'margin-bottom': '0px'
  });
}

// Получение значения кол-ва команд
function getTeams(selectObject) {
  valueT = selectObject.value;
  $('.errorTeams').css('opacity', '0');
}

// Получение значения режима турнира
function getMode(selectObject) {
  valueM = selectObject.value;
  $('.errorMode').css('opacity', '0');
}

// Остановка таймера для загрузочного экрана
function stopTimer() {
  clearTimeout(Timer);
}

// Вспомогательная функция
function id(id) {
  return document.getElementById(id);
}
