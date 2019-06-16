var Timer, // Переменная для создания таймера
  loseGrid = 0, // Переменная, хранящая информацию о создании сетки лузеров (1 - создавать, 0 - не создавать)
  steps = 0, // Переменная для загрузочного экрана
  stepsTimer = 0, // Переменная для загрузочного экрана
  valueT, // Кол-во команд
  valueM, // Режим турнира
  count = 1, // Переменная для рассчета этапа турнира в infoList();
  divGrid = '</div><div class="gridSquads" id="grid-$id"><div id="point-$pointId" class="point"></div></div>', // Переменная для хранения информации о команде
  divBlockTeam = '<div class="block block$block blockTeam$side"><div class="edit" id="edit-$editID" href="#modal" onclick="editMatch(this.id)"></div>', // Переменная для создания блоков
  divInfo = '<div class="infoStage$lor">$num</div>', // Этапы турнира
  divResultPoints = '<button class="resultPoint" value="$valuePoints" onclick="styleResultPoints(this.value)">$pointsResult</button>', // Вывод выбора счета матча
  selectResultPoints = 0, // Вспомогательная глобальная переменная, хранящая значение выбранного результирующего счета матча
  idResultPoints = 0, // Вспомогательная глобальная переменная, хранящая идентификатор кнопки редактирования счета матча
  idResultPointsP, // Вспомогательная глобальная переменная, хранящая идентификатор кнопки редактирования счета матча
  teamOne = '', // Хранит информацию о первой команде, выбранного матча
  teamTwo = '', // Хранит информацию о второй команде, выбранного матча
  audio = new Audio('http://file.mobilmusic.ru/02/3a/2e/153099.mp3');

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
  var stageBlock = 0,
    identificator = 'aa',
    positionDifference = 2;
  stageDivider = 1,
    step = 1,
    firstStage = 1,
    stepStage = 1;

  id('displayMode').innerHTML = valueM; // Вывод режима турнира
  createBlocksTeams(); // Создание блоков для каждых 2-х команд

  // Построение сетки через блоки
  for (var i = 4; i <= valueT * 2; i *= 2) {
    stageBlock++;
    for (var j = 1; j <= valueT / stageDivider; j++) {
      if (stageBlock == 1) {
        $('.block' + stageBlock + '' + step).append(divGrid
          .replace('$id', step + '' + firstStage)
          .replace('$pointId', step + '' + firstStage)
          .replace('gridSquads', 'gridSquads gridLeft' + stageBlock)
        );
        id('grid-' + step + '' + firstStage).appendChild(document.createTextNode('Team #' + j));
        id('point-' + step + '' + firstStage).innerHTML = '0';
        if (j <= valueT / 2) {
          $('#edit-' + j + '1').css('display', 'block');
        }
      } else if (stageBlock == 2) {
        $('.block' + stageBlock + '' + step).append(divGrid
          .replace('$id', j + '1' + 'a')
          .replace('$pointId', j + '1' + 'a')
          .replace('gridSquads', 'gridSquads gridLeft' + stageBlock)
        );
        id('point-' + j + '1' + 'a').innerHTML = '0';
      } else if (stageBlock > 2) {
        $('.block' + stageBlock + '' + step).append(divGrid
          .replace('$id', stepStage + '1' + identificator)
          .replace('$pointId', stepStage + '1' + identificator)
          .replace('gridSquads', 'gridSquads gridLeft' + stageBlock)
        );
        id('point-' + stepStage + '1' + identificator).innerHTML = '0';
        stepStage += positionDifference;
      }
      if (j % 2 == 0) {
        step++;
        firstStage = 0;
      }
      firstStage++;
    }
    if (stageBlock >= 3) {
      positionDifference *= 2;
      identificator += 'a';
    }
    stepStage = 1;
    step = 1;
    stageDivider *= 2;
    infoList();
  }

  marginBottom();
  displaySelectPoints();
  teamWinnerID(stageBlock);
  $('.grid').css('display', 'block'); // Вывод самой сетки
}

// Построение блоков
function createBlocksTeams() {
  var stageDivider = 2,
    identificator = '',
    stageBlock = 0,
    positionDifference = 1,
    positionInStage = 0,
    step = 1;

  for (var i = 4; i <= valueT * 2; i *= 2) {
    stageBlock++;
    for (var j = 1; j <= valueT / stageDivider; j++) {
      positionInStage++;
      $('.left' + stageBlock).append(divBlockTeam
        .replace('$editID', step + '1' + identificator)
        .replace('$side', stageBlock)
        .replace('$block', stageBlock + '' + positionInStage)
      );
      step += positionDifference;
    }
    step = 1;
    positionInStage = 0;
    stageDivider *= 2;
    identificator += 'a';
    if (positionDifference == 1) {
      positionDifference = 2;
    } else {
      positionDifference *= 2;
    }
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

// Задаем идентификатор блоку с победителем
function teamWinnerID(stageBlock) {
  if (stageBlock == 2) {
    $('#winner').attr('id', 'grid-11aa');
  } else if (stageBlock == 3) {
    $('#winner').attr('id', 'grid-11aaa');
  } else if (stageBlock == 4) {
    $('#winner').attr('id', 'grid-11aaaa');
  } else if (stageBlock == 5) {
    $('#winner').attr('id', 'grid-11aaaaa');
  } else if (stageBlock == 6) {
    $('#winner').attr('id', 'grid-11aaaaaa');
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
      if (i == 0) {
        resultZ = 0;
        resultO = 2;
      } else if (i == 1) {
        resultZ = 1;
        resultO = 2;
      } else if (i == 2) {
        resultZ = 2;
        resultO = 0;
      } else {
        resultZ = 2;
        resultO = 1;
      }
    }
    if (iterr == 2) {
      if (i == 0) {
        resultZ = 0;
        resultO = 1;
      } else {
        resultZ = 1;
        resultO = 0;
      }
    }
    $('.blockPoints').append(divResultPoints
      .replace('$pointsResult', resultZ + ':' + resultO)
      .replace('$valuePoints', resultZ + '' + resultO)
    );
  }
  if (iterr == 4) {
    $('.blockPoints').css('margin-top', '25px');
    $('.resultPoint:nth-child(3), .resultPoint:nth-child(4)').css('margin-top', '5px');
  }
}

// Стилизация выбора счета
function styleResultPoints(value) {
  selectResultPoints = value;
  if (value == 10) {
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
  } else if (value == 01) {
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
  } else if (value == 02) {
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
  } else if (value == 12) {
    $('.resultPoint').css({
      'background-color': 'white',
      'color': '#595959',
      'border': '1px solid lightgray'
    });
    $('.resultPoint:nth-child(2)').css({
      'background-color': '#5995ED',
      'color': 'white',
      'border': 'none'
    });
  } else if (value == 20) {
    $('.resultPoint').css({
      'background-color': 'white',
      'color': '#595959',
      'border': '1px solid lightgray'
    });
    $('.resultPoint:nth-child(3)').css({
      'background-color': '#5995ED',
      'color': 'white',
      'border': 'none'
    });
  } else if (value == 21) {
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
  }
}

// Редактирование результатов матча
function editMatch(editId) {
  if (editId.substring(5, 8) > 100) {
    idResultPoints = editId.substring(5, 8); // Кусок идентификатора с цифрами (двузначные)
    idResultPointsP = editId.substring(8, 13); // Кусок идентификатора с буквами
  } else {
    idResultPoints = editId.substring(5, 7); // Кусок идентификатора с цифрами (трёхзначные)
    idResultPointsP = editId.substring(7, 12); // Кусок идентификатора с буквами
  }
  teamOne = $('#grid-' + idResultPoints + '' + idResultPointsP).text().substring(1, 9); // Хранит название первой команды из выбранного блока
  if (idResultPointsP == '') {
    teamTwo = $('#grid-' + (+idResultPoints + 1)).text().substring(1, 9); // Хранит название второй команды из выбранного блока первого этапа
  } else if (idResultPointsP == 'a') {
    teamTwo = $('#grid-' + (+idResultPoints + 10) + '' + idResultPointsP).text().substring(1, 9); // Хранит название второй команды из выбранного блока второго этапа
  } else if (idResultPointsP == 'aa') {
    teamTwo = $('#grid-' + (+idResultPoints + 20) + '' + idResultPointsP).text().substring(1, 9); // Хранит название второй команды из выбранного блока третьего этапа
  } else if (idResultPointsP == 'aaa') {
    teamTwo = $('#grid-' + (+idResultPoints + 40) + '' + idResultPointsP).text().substring(1, 9); // Хранит название второй команды из выбранного блока четвертого этапа
  } else if (idResultPointsP == 'aaaa') {
    teamTwo = $('#grid-' + (+idResultPoints + 80) + '' + idResultPointsP).text().substring(1, 9); // Хранит название второй команды из выбранного блока пятого этапа
  }
  var textResultOne = id('firstResult').childNodes[0]; // Хранят в себе текст, чтобы не задеть дочерние элементы
  var textResultTwo = id('secondResult').childNodes[0];

  if (teamOne == '' || teamTwo == '') {
    alert('Ошибка! Вы не можете подвести итоги этого матча, он еще не начался');
    return -1;
  }

  modalWindow();

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

// Сложно описать, что делает эта функция... Если на пальцах, то она заполняет счет второй команды выбранного блока
function hardDescription(num) {
  if (idResultPointsP == '') {
    id('point-' + (+idResultPoints + 1)).innerHTML = num;
  } else if (idResultPointsP == 'a') {
    id('point-' + (+idResultPoints + 10) + '' + idResultPointsP).innerHTML = num;
  } else if (idResultPointsP == 'aa') {
    id('point-' + (+idResultPoints + 20) + '' + idResultPointsP).innerHTML = num;
  } else if (idResultPointsP == 'aaa') {
    id('point-' + (+idResultPoints + 40) + '' + idResultPointsP).innerHTML = num;
  } else if (idResultPointsP == 'aaaa') {
    id('point-' + (+idResultPoints + 80) + '' + idResultPointsP).innerHTML = num;
  }
}

// Продвижение сетки
function saveResult() {
  var truePoints = Math.floor(selectResultPoints / 10);
  if (selectResultPoints == 10 || truePoints == 2) {
    id('grid-' + idResultPoints + 'a' + idResultPointsP).appendChild(document.createTextNode(teamOne));
    id('point-' + idResultPoints + '' + idResultPointsP).innerHTML = '1';
    hardDescription(0);
    if (selectResultPoints == 21) {
      id('point-' + idResultPoints + '' + idResultPointsP).innerHTML = '2';
      hardDescription(1);
    } else if (selectResultPoints == 20) {
      id('point-' + idResultPoints + '' + idResultPointsP).innerHTML = '2';
      hardDescription(0);
    }
  } else if (selectResultPoints == 0) {
    alert('Ошибка! Выберите счет!');
    return -1;
  } else {
    id('grid-' + idResultPoints + 'a' + idResultPointsP).appendChild(document.createTextNode(teamTwo));
    hardDescription(1);
    if (selectResultPoints == 12) {
      id('point-' + idResultPoints + '' + idResultPointsP).innerHTML = '1';
      hardDescription(2);
    } else if (selectResultPoints == '02') {
      id('point-' + idResultPoints + '' + idResultPointsP).innerHTML = '0';
      hardDescription(2);
    }
  }
  selectResultPoints = 0;
  $('#edit-' + idResultPoints + '' + idResultPointsP).css('display', 'none');
  $('.resultPoint').css({
    'background-color': 'white',
    'color': '#595959',
    'border': '1px solid lightgray'
  });
  if ($('.teamWinner').text() != '') {
    audio.play();
  }
}

// Вывод модального окна
function modalWindow() {
  $('#overlay').fadeIn(400, function() {
    $('#modal').css('display', 'block');
  });

  $('.modal_close, #overlay, .saveResult').click(function() {
    $('.modal_div').css('display', 'none');
    $('#overlay').fadeOut(400);
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
  if (stepsTimer == 4) {
    stopTimer();
    $('.loading').css('display', 'none');
    displayGrid();
  }
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
  nonMode();
}

// Накладываются некоторые запреты
function nonMode() {
  // Запрещает выставлять режим турнира Double Elimination
  if (valueT == 64 || valueT == 32) {
    $('.modeGrid').attr('disabled', 'disabled');
  } else {
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
