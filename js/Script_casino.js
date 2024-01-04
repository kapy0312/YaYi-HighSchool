window.onload = function () {

    console.log('整個網頁已經完全載入！');
    // 添加你的初始化程式碼
    var rframe = document.getElementById('rIframe');
    if(window.innerWidth > 520){
        rframe.style.height = '600px';
      }
      else{
        rframe.style.height = '1000px';
      }
    // var rframeWindow = rframe.contentWindow.height;
    // var rframeWindow = rframe.contentWindow;
    // 使用 iframeWindow 來獲取 iframe 中的 window.innerHeight
    // if (rframeWindow) {
    //     var rframeInnerHeight = rframeWindow.height;
    //     alert("rframeWindow.innerHeight=" + rframeInnerHeight + "px");
    //     rframe.style.height = rframeInnerHeight + 'px';
    // }
};