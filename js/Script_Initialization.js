document.addEventListener('DOMContentLoaded', function () {
    $.ajax({
        url: 'https://script.google.com/macros/s/AKfycbyHTYBLQo2KuWO8Hjo5emJnN4m3FtxVMrla1lX6OYlaQK1lVFFPT3Kmp7cIDn9gGFTb/exec',
        dataType: 'json',
        success: function (data) {
            handleData(data);
            // displayData(data); // 处理 Google Sheets 数据
        },
        error: function () {
            alert('Failed to retrieve data.'); // 处理错误情况
        }
    });
});

function handleData(data) {
    // 使用 DOM 操作创建元素并插入到页面
    var contentContainer = $('#content-container');
    var About_Row_index;

    $.each(data, function (R_index, row) {
        $.each(row, function (C_index, cellData) {
            if (cellData == '關於我們') {
                About_Row_index = R_index;
            }
        });
    });

    // var HtmlCode = '<h2>' + cellData[About_Row_index][1] + '</h2>';
    // document.write(HtmlCode);
    // 例如，假设数据是一个数组，每个元素都是一个字符串
    var newParagraph = $('<h2>');
    newParagraph.append(data[About_Row_index][1]);
    // alert(newParagraph);
    contentContainer.append(newParagraph);
}