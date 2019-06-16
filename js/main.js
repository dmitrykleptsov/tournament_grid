var Timer, // Переменная для создания таймера
  loseGrid = 0, // Переменная, хранящая информацию о создании сетки лузеров (1 - создавать, 0 - не создавать)
  steps = 0, // Переменная для загрузочного экрана
  stepsTimer = 0, // Переменная для загрузочного экрана
  valueT, // Кол-во команд
  valueM, // Режим турнира
  countLose = 2, // Переменная для рассчета этапа турнира для сетки лузеров
  count = 1, // Переменная для рассчета этапа турнира
  divGrid = '</div><div class="gridSquads" id="grid-$id"><div id="point-$pointId" class="point"></div></div>', // Переменная для хранения информации о команде
  divBlockTeam = '<div class="block block$block blockTeam$side" id="block$blockId"><div class="edit" id="edit-$editID" href="#modal" onclick="editMatch(this.id)"></div>', // Переменная для создания блоков
  divInfo = '<div class="infoStage$lor">$num</div>', // Этапы турнира
  divResultPoints = '<button class="resultPoint" value="$valuePoints" onclick="styleResultPoints(this.value)">$pointsResult</button>', // Вывод выбора счета матча
  selectResultPoints = 0, // Вспомогательная глобальная переменная, хранящая значение выбранного результирующего счета матча
  idResultPoints = 0, // Вспомогательная глобальная переменная, хранящая идентификатор кнопки редактирования счета матча
  teamOne = '',
  teamTwo = '';

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
    step = 1,
    countL = -1,
    varInt = 96,
    varChar,
    h = 1,
    lo = 1;

  id('displayMode').innerHTML = valueM; // Вывод режима турнира
  createBlocksTeams(); // Создание блоков для каждых 2-х команд

  // Построение сетки через блоки
  for (var i = 4; i <= valueT * 2; i *= 2) {
    k *= 2;
    countD++;
    varChar = String.fromCharCode(+(varInt) + 1);
    for (var j = 1; j <= valueT / l; j++) {
      countL += 2;
      if (countD == 1) {
        $('.block' + countD + 'o' + step).append(divGrid
          .replace('$id', step + '' + h)
          .replace('$pointId', step + '' + h + 'p')
          .replace('gridSquads', 'gridSquads gridLeft' + countD)
        );
        id('grid-' + step + '' + h).appendChild(document.createTextNode('Team #' + j));
        id('point-' + step + '' + h + 'p').innerHTML = '0';
        if (j <= valueT / 2) {
          $('#edit-' + j + '1').css('display', 'block');
        }
      } else if (countD == 2) {
        $('.block' + countD + 'o' + step).append(divGrid
          .replace('$id', j + '1' + 'a')
          .replace('$pointId', step + '' + h + 'pa')
          .replace('gridSquads', 'gridSquads gridLeft' + countD)
        );
      } else if (countD == 3) {
        $('.block' + countD + 'o' + step).append(divGrid
          .replace('$id', lo + '1' + 'b')
          .replace('$pointId', lo + '' + h + 'p')
          .replace('gridSquads', 'gridSquads gridLeft' + countD)
        );
        lo += 2;
      } else if (countD == 4) {
        $('.block' + countD + 'o' + step).append(divGrid
          .replace('$id', lo + '1' + 'c')
          .replace('$pointId', lo + '' + h + 'p')
          .replace('gridSquads', 'gridSquads gridLeft' + countD)
        );
        lo += 4;
      } else if (countD == 5) {
        $('.block' + countD + 'o' + step).append(divGrid
          .replace('$id', lo + '1' + 'd')
          .replace('$pointId', lo + '' + h + 'p')
          .replace('gridSquads', 'gridSquads gridLeft' + countD)
        );
        lo += 6;
      }
      if (j % 2 == 0) {
        step++;
        h = 0;
      }
      h++;
    }
    lo = 1;
    varInt++;
    countL = -1;
    step = 1;
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
  displaySelectPoints();
  $('.grid').css('display', 'block'); // Вывод самой сетки
}

// Построение блоков
function createBlocksTeams() {
  var l1 = 2,
    countL = 0,
    countE = 0,
    countK = -1,
    step = 1;

  for (var i = 4; i <= valueT * 2; i *= 2) {
    countL++;
    for (var j = 1; j <= valueT / l1; j++) {
      countE++;
      countK += 2;
      if (countL == 1) {
        $('.left' + countL).append(divBlockTeam
          .replace('$editID', step + '1')
          .replace('$side', countL)
          .replace('$blockId', countL + 'o' + countE)
          .replace('$block', countL + 'o' + countE)
        );
        step++;
      } else if (countL == 2) {
        $('.left' + countL).append(divBlockTeam
          .replace('$editID', step + '1' + 'aa')
          .replace('$side', countL)
          .replace('$blockId', countL + 'o' + countE)
          .replace('$block', countL + 'o' + countE)
        );
        step += 2;
      } else if (countL == 3) {
        $('.left' + countL).append(divBlockTeam
          .replace('$editID', step + '1' + 'bb')
          .replace('$side', countL)
          .replace('$blockId', countL + 'o' + countE)
          .replace('$block', countL + 'o' + countE)
        );
        step += 4;
      } else if (countL == 4) {
        $('.left' + countL).append(divBlockTeam
          .replace('$editID', step + '1' + 'cc')
          .replace('$side', countL)
          .replace('$blockId', countL + 'o' + countE)
          .replace('$block', countL + 'o' + countE)
        );
        step += 6;
      } else if (countL == 5) {
        $('.left' + countL).append(divBlockTeam
          .replace('$editID', step + '1' + 'dd')
          .replace('$side', countL)
          .replace('$blockId', countL + 'o' + countE)
          .replace('$block', countL + 'o' + countE)
        );
        step += 8;
      }
    }
    step = 1;
    countK = -1;
    countE = 0;
    l1 *= 2;
  }
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

// Вывод вариантов результата матча
function displaySelectPoints() {
  var iterr = 0;
  var resultZ = 0;
  var resultO = 1;

  if (valueM === 'Single Elimination') {
    iterr = 2;
    $('.blockPoints').css('margin-top', '40px');
  } else {
    iterr = 4;
  }

  for (var i = 0; i < iterr; i++) {
    if (iterr == 4) {
      resultO = 2;
    }
    $('.blockPoints').append(divResultPoints
      .replace('$pointsResult', resultZ + ':' + resultO)
      .replace('$valuePoints', resultZ + '' + resultO)
    );
    if (iterr == 2) {
      resultZ++;
      resultO--;
    }
  }
}

// Стилизация выбора счета
function styleResultPoints(value) {
  if (value.substring(1) == 0) {
    $('.resultPoint').css({
      'background-color': 'white',
      'color': '#595959',
      'border': '1px solid lightgray'
    });
    $('.resultPoint:last-child').css({
      'background-color': '#5995ED',
      'color': 'white',
      'border': 'none'
    });
  } else {
    $('.resultPoint').css({
      'background-color': 'white',
      'color': '#595959',
      'border': '1px solid lightgray'
    });
    $('.resultPoint:first-child').css({
      'background-color': '#5995ED',
      'color': 'white',
      'border': 'none'
    });
  }

  selectResultPoints = value;
}

// Продвижение сетки
function saveResult() {
  var truePoints = Math.floor(selectResultPoints / 10);
  if (truePoints) {
    id('grid-' + idResultPoints + 'a').appendChild(document.createTextNode(teamOne));
    id('point-' + idResultPoints + 'p').innerHTML = '1';
    $('#edit-' + idResultPoints).css('display', 'none');
    $('.resultPoint').css({
      'background-color': 'white',
      'color': '#595959',
      'border': '1px solid lightgray'
    });
  } else {
    id('grid-' + idResultPoints + 'a').appendChild(document.createTextNode(teamTwo));
    id('point-' + (+idResultPoints + 1) + 'p').innerHTML = '1';
    $('#edit-' + idResultPoints).css('display', 'none');
    $('.resultPoint').css({
      'background-color': 'white',
      'color': '#595959',
      'border': '1px solid lightgray'
    });
  }
}

// Редактирование результатов матча
function editMatch(editId) {
  modalWindow();
  idResultPoints = editId.substring(5, 8); // Кусок идентификатора
  teamOne = $('#grid-' + idResultPoints).text().substring(1, 9); // Хранит название первой команды из блока
  teamTwo = $('#grid-' + (+idResultPoints + 1)).text().substring(1, 9); // Хранит название второй команды из блока
  var textResultOne = id('firstResult').childNodes[0]; // Хранят в себе текст, чтобы не задеть дочерние элементы
  var textResultTwo = id('secondResult').childNodes[0];

  textResultOne.nodeValue = teamOne; // Выводят названия команд в модальном окне
  textResultTwo.nodeValue = teamTwo;

  id('firstPointResult').innerHTML = 0; // Вывод очков первой команды
  id('secondPointResult').innerHTML = 0; // Вывод очков второй команды

  id('displayModeModal').innerHTML = valueM; // Вывод режима турнира
  if (valueM === 'Single Elimination') {
    id('textModeModal').innerHTML = 'одной';
  } else {
    id('textModeModal').innerHTML = 'двух';
  }
}

// Вывод модального окна
function modalWindow() {
  $('#overlay').fadeIn(400, function() {
    $('#modal').css('display', 'block').animate({
      opacity: 1,
      top: '50%'
    }, 100);
  });

  $('.modal_close, #overlay, .saveResult').click(function() {
    $('.modal_div').animate({
        opacity: 0,
        top: '45%'
      }, 100,
      function() {
        $(this).css('display', 'none');
        $('#overlay').fadeOut(400);
      }
    );
  });
}

// Показ загрузочного экрана
function loading() {
  $('.menu').fadeOut(600);
  $('.loading').fadeIn(600);
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

// Отмена отступов каждого последнего элемента всех этапов
function marginBottom() {
  $('.blockTeam1:last-child, .blockTeam2:last-child, .blockTeam3:last-child, .blockTeam4:last-child, .blockTeam5:last-child, .blockTeam6:last-child').css({
    'margin-bottom': '0px'
  });
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

// Получение значения кол-ва команд
function getTeams(selectObject) {
  valueT = selectObject.value;
  $('.errorTeams').css('opacity', '0');
  nonLoseGrid();
}

// Накладываются некоторые запреты
function nonLoseGrid() {
  // Запрещает выбирать сетку лузеров и выставлять режим турнира Double Elimination
  if (valueT == 64 || valueT == 32) {
    $('.selectLoseGrid').fadeOut(600);
    $('.modeGrid').attr('disabled', 'disabled');
  } else if (valueT == 4) { // Запрещает выбирать сетку лузеров
    $('.selectLoseGrid').fadeOut(600);
    $('.modeGrid').removeAttr('disabled');
  } else {
    $('.selectLoseGrid').fadeIn(600);
    $('.modeGrid').removeAttr('disabled');
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
