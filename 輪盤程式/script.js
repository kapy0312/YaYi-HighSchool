var wheel = document.getElementById('Roulette1');
var wheelRect = wheel.getBoundingClientRect();
var cBanner = document.getElementById('cBanner1');
var cBannerRect = cBanner.getBoundingClientRect();
var textarea = document.getElementById('myTextarea');

let spinning = false;

var prizesTEXT = ["我是獎品1", "我是獎品2", "我是獎品3", "我是獎品4", "我是獎品5", "我是獎品6", "我是獎品7", "我是獎品8", "我是獎品9", "我是獎品10", "我是獎品11", "我是獎品12", "我是獎品13", "我是獎品14", "我是獎品15", "我是獎品16", "我是獎品17", "我是獎品18", "我是獎品19", "我是獎品20"];
var numPrizes = 9; // 調整獎品數量

var angle;
var colorARRAY = ['#373CA4', '#E8C1F9', '#83D8CC', '#8F7ECE', '#FFFFFF'];

window.onload = function () {

  console.log('整個網頁已經完全載入！');
  // 添加你的初始化程式碼
  textarea.value += '我是選項1\n我是選項4\n我是選項3\n我是選項4';
  cBanner.style.display = 'none';
  prizesTEXT = textarea.value.split('\n');
  numPrizes = prizesTEXT.length;

  Updata();
  cBanner.style.display = 'block';
  if(window.innerWidth > 520){
    cBanner.style.height = '600px';
  }
  else{
    cBanner.style.height = '1400px';
  }
  // cBanner.style.height = '100px';

  $("#tSH_btn").hide();
  $("#CompleteTEXT2").hide();

  // alert("當前裝置寬度=" + window.innerWidth + "，當前裝置長度=" + window.innerHeight);

};

function startSpin() {
  if (!spinning) {
    spinning = true;
    const randomDegree = Math.floor(Math.random() * 360); // 隨機選擇初始角度
    //cBanner.style.display = 'none';
    $("#CompleteTEXT2").hide();
    cBanner.style.opacity = '0';
    wheel.style.transform = 'rotate(0deg)';

    setTimeout(() => {
      wheel.style.transition = 'transform 3s ease-out';
      wheel.style.transform = `rotate(${randomDegree + 3600}deg)`; // 旋轉 10 圈
    }, 100);

    setTimeout(() => {
      wheel.style.transition = 'none';
      const actualDegree = 360 - (randomDegree % 360);
      var selectedPrize = Math.floor(actualDegree / angle);

      //cBanner.style.display = 'block';
      cBanner.style.opacity = '1';

      $('#CompleteTEXT2').text("抽獎結果：\n" + prizesTEXT[selectedPrize]);

      // alert(`恭喜你中獎！你抽中了第 ${selectedPrize + 1} 個獎品`);
      // wheel.style.transform = 'rotate(0deg)';
      $("#tSH_btn").show();
      $("#CompleteTEXT2").show();
      $("#myTextarea").hide();

      var newTop = $('#tSH_btn').offset().top + ($('#Roulette1').height() / 2);
      var newLeft = (($('#it2').offset().left + $('#it2').width() / 2) - ($('#CompleteTEXT2').width() / 2));
      // 設定訊息新位置
      $('#CompleteTEXT2').css({ top: newTop + 'px', left: newLeft + 'px' });

      spinning = false;
    }, 3000);
  }
}

// 按下編輯清單按鈕
$("#tSH_btn").click(function () {
  $("#tSH_btn").hide();
  $("#CompleteTEXT2").hide();
  $("#myTextarea").show();
  cBanner.style.opacity = '0';
});

//只要textarea內文字有變化
// 添加 input 事件監聽器
textarea.addEventListener('input', function () {
  prizesTEXT = textarea.value.split('\n');
  numPrizes = prizesTEXT.length;

  Updata();
});

function Updata() {

  cBanner.style.opacity = '0';
  // 清空 wheel 元素的內容
  wheel.innerHTML = '';
  // 設定輪盤的 background 屬性
  wheel.style.background = generateConicGradient(numPrizes);

  angle = 360 / numPrizes;
  //添加文字
  for (let i = 0; i < numPrizes; i++) {
    //文字內容
    const sliceText = prizesTEXT[i];

    //新增文字物件
    const textElement = document.createElement('div');
    textElement.classList.add('slice-text');
    textElement.innerText = sliceText;
    textElement.style.color = ((i % 2) != 0) ? colorARRAY[1] : colorARRAY[0]; // 修改文字顏色
    //if (i == (numPrizes-1))  textElement.style.color = colorARRAY[4]
    const rotateAngle = 90 + (i * angle) + (angle / 2); // 文字位置在切片的中间
    const translateValue = `calc(50% - ${wheel.offsetWidth / 2.2}px)`; // 调整文字位置在切片内部
    textElement.style.transform = `rotate(${rotateAngle}deg) translate(-50%, -50%) translate(${translateValue}, 0)`;

    wheel.appendChild(textElement);
  }

  // 更新中心圖片的位置
  const centerImage = document.getElementById('Pointer1');

  centerImage.style.left = (wheelRect.left + (wheelRect.width / 2)) + 'px';
  centerImage.style.top = (wheelRect.top + (wheelRect.height / 2)) + 'px';
}

// 生成 conic-gradient 字串的函式
function generateConicGradient(numPrizes) {

  angle = 360 / numPrizes;

  var cssCODE = 'conic-gradient(from 0deg,';
  var colorCODE
  for (let i = 0; i < numPrizes; i++) {

    colorCODE = ((i % 2) != 0) ? colorARRAY[0] : colorARRAY[1];

    if (((numPrizes % 2) != 0) && (i == (numPrizes - 1))) {//數量=奇數 AND 最後一個的時候
      colorCODE = colorARRAY[3];
    }

    if (i != (numPrizes - 1)) cssCODE += colorCODE + ' ' + (i * angle) + 'deg ' + ((i + 1) * angle) + 'deg,';
    if (i == (numPrizes - 1)) cssCODE += colorCODE + ' ' + (i * angle) + 'deg ' + (((i + 1) * angle) - 10) + 'deg,';
  }
  cssCODE = cssCODE.slice(0, -1) + ')';

  return cssCODE;
}

// 生成隨機顏色的函式，你可以保留原本的 getRandomColor
function getRandomColor() {
  // const letters = '0123456789ABCDEF';
  const letters = 'ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 6)];
  }
  return color;
}