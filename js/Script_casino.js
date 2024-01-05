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
};

//角子老虎機 拉霸
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
  if(numList>0){
    document.getElementById('slot1').innerText = rList[0];
  }
});