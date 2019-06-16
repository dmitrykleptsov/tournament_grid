var Timer, // Переменная для создания таймера
  loseGrid = 0, // Переменная, хранящая информацию о создании сетки лузеров (1 - создавать, 0 - не создавать)
  steps = 0, // Переменная для загрузочного экрана
  stepsTimer = 0, // Переменная для загрузочного экрана
  valueT, // Кол-во команд
  valueM, // Режим турнира
  countLose = 2, // Переменная для рассчета этапа турнира для сетки лузеров
  count = 1, // Переменная для рассчета этапа турнира
  divGrid = '<div class="gridSquads" id="grid-$preId$id"><div id="point-$pointId" class="point"></div></div>', // Переменная для хранения информации о команде
  divBlockTeam = '<div class="block block$blockId blockTeam$side" id="block$block"></div>', // Переменная для создания блоков
  divInfo = '<div class="infoStage$lor">$num</div>'; // Этапы турнира

// Получение необходимых значений и запуск загрузочного экрана
function createGrid() {
  getCheckBoxes();
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
  // Переменные для построения сетки
  var countD = 0,
           k = 1,
           l = 1,
        step = 1;

  id('displayMode').innerHTML = valueM; // Вывод режима турнира
  createBlocksTeams(); // Создание блоков для каждых 2-х команд

  // Построение сетки через блоки
  for (var i = 4; i <= valueT * 2; i *= 2) {
    k *= 2;
    countD++;
    for (var j = 1; j <= valueT / l; j++) {
      $('.block' + step).append(divGrid
        .replace('$preId', countD)
        .replace('$id', j)
        .replace('$pointId', j)
        .replace('gridSquads', 'gridSquads gridLeft' + countD)
      );
      if (j % 2 == 0) {
        step++;
      }
      if (countD == 1) {
        id('grid-1' + j).appendChild(document.createTextNode('Team #' + j));
        id('point-' + j).innerHTML = '0';
      }
    }
    l *= 2;
    infoList();
  }

/*  if (loseGrid) {
    $('.infoListLose').css('display', 'inline-block');
    $('.leftSizeLose').css('display', 'block');
    var k1 = 1,
        l1 = 2,
    countL = 0,
     style = 1;
    for (var i = 4; i <= valueT * 8; i *= 2) {
      k1 *= 2;
      countL++;
      if (countL % 2 == 1 && countL >= 2) {
        l1 *= 2;
        style++;
      }
      for (var j = 1; j <= valueT / l1; j++) {
        $('.leftLose' + countL).append(divGrid
          .replace('$preId', countL)
          .replace('$id', j)
          .replace('$pointId', j)
          .replace('gridSquads', 'gridSquads gridLeft' + style)
        );
      }
    }
    $('.leftLose1').css('margin-right', '30px');
  } */

  styleGrids(); // Стилизация сетки в соответствии с выбором кол-ва команд
  $('.grid').css('display', 'block'); // Вывод самой сетки
}

// Информация об основном этапе турнира
function infoList() {
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

// Построение блоков
function createBlocksTeams() {
  var l1 = 2,
  countL = 0;

  for (var i = 4; i <= valueT * 2; i *= 2) {
    countL++;
    for (var j = 1; j <= valueT / l1; j++) {
      $('.left' + countL).append(divBlockTeam
        .replace('$side', countL)
        .replace('$blockId', j)
        .replace('$block', j)
      );
    }
    l1 *= 2;
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
  if (stepsTimer == 3) {
    stopTimer();
    $('.loading').css('display', 'none');
    displayGrid();
  }
}

// Отмена отступов каждого последнего элемента всех этапов
function marginBottom() {
  $('.blockTeam1:last-child').css({
    'margin-bottom': '0px'
  });
  $('.blockTeam2:last-child').css({
    'margin-bottom': '0px'
  });
  $('.blockTeam3:last-child').css({
    'margin-bottom': '0px'
  });
  $('.blockTeam4:last-child').css({
    'margin-bottom': '0px'
  });
  $('.blockTeam5:last-child').css({
    'margin-bottom': '0px'
  });
  $('.blockTeam6:last-child').css({
    'margin-bottom': '0px'
  });
}

// Получение значения кол-ва команд
function getTeams(selectObject) {
  valueT = selectObject.value;
  $('.errorTeams').css('opacity', '0');
  if (valueT == 64 || valueT == 32) { // Запрещает выбирать сетку лузеров и выставлять режим турнира Double Elimination
    $('.selectLoseGrid').css('display', 'none');
    $('.modeGrid').attr('disabled', 'disabled');
  } else if (valueT == 4) { // Запрещает выбирать сетку лузеров
    $('.selectLoseGrid').css('display', 'none');
    $('.modeGrid').removeAttr('disabled');
  } else {
    $('.selectLoseGrid').css('display', 'block');
    $('.modeGrid').removeAttr('disabled');
  }
}

// Стили для каждой из сеток
function styleGrids() {
  if (valueT == 4) {
    $('body').css('background-image', 'url("img/bg-4.png")');
  } else if (valueT == 8) {
    $('body').css('background-image', 'url("img/bg-8.png")');
  } else if (valueT == 16) {
    $('body').css('background-image', 'url("img/bg-16.png")');
  } else if (valueT == 32) {
    $('body').css('background-image', 'url("img/bg-32.png")');
  } else {
    $('body').css('background-image', 'url("img/bg-64.png")');
  }
  marginBottom();
}

// Получение значения о создании сетки лузеров
function getCheckBoxes() {
  var checkboxes = document.getElementsByClassName('loseGrid');
  for (var index = 0; index < checkboxes.length; index++) {
    if (checkboxes[index].checked) {
      loseGrid = checkboxes[index].value;
    }
  }
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
