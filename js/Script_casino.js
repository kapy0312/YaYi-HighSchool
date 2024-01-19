var textarea = document.getElementById('sTextarea');
var rList = ['我是選項1', '我是選項2', '我是選項3', '我是選項4'];
var numList = 4; // 選項數量

window.onload = function () {

  console.log('整個網頁已經完全載入！');
  // 添加你的初始化程式碼
  var rframe = document.getElementById('rIframe');
  if (window.innerWidth > 520) {
    rframe.style.height = '600px';
  }
  else {
    rframe.style.height = '1000px';
  }


  textarea.value += '我是選項1\n我是選項4\n我是選項3\n我是選項4';

  //兔兔人抽牌占卜
  $('.back1').css('background-image', `url('images/Divination/back-00.png')`);
};

//角子老虎機 拉霸
//------------------------------------------------------------------------
//------------------------------------------------------------------------
document.getElementById('slot1').innerText = rList[getRandomNumber()];

function getRandomNumber() {
  return Math.floor(Math.random() * numList) + 0;
}

function startSlotMachine() {
  // 模擬轉動動畫
  let counter = 0;
  const intervalId = setInterval(() => {
    document.getElementById('slot1').innerText = rList[getRandomNumber()];

    document.getElementById('slot1').classList.add('moveDown');
    counter++;
    if (counter === 20) { // 轉動20次後停止
      clearInterval(intervalId);


      document.getElementById('slot1').innerText = rList[getRandomNumber()];

      document.getElementById('slot1').classList.remove('moveDown');


      // if (result1 === result2 && result2 === result3) {
      //     alert('恭喜！你中獎了！');
      // } else {
      //     alert('很抱歉，再試一次吧！');
      // }
    }
  }, 100); // 設定每次變化的時間間隔
}

textarea.addEventListener('input', function () {
  rList = textarea.value.split('\n');
  numList = rList.length;
  if (numList > 0) {
    document.getElementById('slot1').innerText = rList[0];
  }
});

//兔兔人抽牌占卜
//------------------------------------------------------------------------
//------------------------------------------------------------------------
// Initialize array with values 0 to 7
var cardArray = Array.from({ length: 8 }, (_, index) => index);
shuffleArray(cardArray);// Shuffle the array


function flipCard(cardNumber) {
  // var box = $(`.box:nth-child(${cardNumber + 1})`);
  var box = $('#box' + cardNumber);
  $('.front' + cardNumber).css('background-image', `url('images/Divination/front-` + (cardArray[cardNumber - 1] + 1).toString().padStart(2, '0') + `.png')`);

  // $('.display-card').hide();
  // 淡出元素
  $('.display-card').fadeOut('slow');
  box.addClass("flipped");

  // 偵聽動畫結束事件，以便在動畫完成後移除 flipped 類別
  box.on('animationend', function () {
    // box.removeClass("flipped");

    // $('.display-card').show(); // 顯示元素
    // 淡入元素
    $('.display-card').fadeIn('slow');
    $('.display-card').css('background-image', `url('images/Divination/front-` + (cardArray[cardNumber - 1] + 1).toString().padStart(2, '0') + `.png')`);
  });
}

// Fisher-Yates Shuffle Algorithm
function CardReset() {
  $('#box1').removeClass("flipped");
  $('#box2').removeClass("flipped");
  $('#box3').removeClass("flipped");
  $('#box4').removeClass("flipped");
  $('#box5').removeClass("flipped");
  $('#box6').removeClass("flipped");
  $('#box7').removeClass("flipped");
  $('#box8').removeClass("flipped");
  $('.display-card').fadeOut('slow');
  shuffleArray(cardArray);// Shuffle the array
}

// Fisher-Yates Shuffle Algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}