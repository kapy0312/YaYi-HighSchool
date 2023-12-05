
$('#cf-submit').on('click', function () {

    var DataArray = new Array(100);

    DataArray[0] = 1;
    DataArray[1] = $('#cf-name').val();
    DataArray[2] = $('#cf-email').val();
    DataArray[3] = $('#cf-subject').val();
    DataArray[4] = $('#cf-message').val();

    // Email_Contact = "寄信者：" + RequestArray[1] + "\n寄信者Email：" + Email_Address + "\n內容：\n" + Email_Contact;
    // Email_Name = "RequestArray[3]";
    // Email_Address = "kapy0312@gmail.com"

    $.ajax({
        url: 'https://script.google.com/macros/s/AKfycbyHTYBLQo2KuWO8Hjo5emJnN4m3FtxVMrla1lX6OYlaQK1lVFFPT3Kmp7cIDn9gGFTb/exec',
        type: 'POST',
        dataType: 'text',
        data: JSON.stringify({ DataArray: DataArray }),
        contentType: 'text/plain; charset=utf-8',
        success: function (response) {
            alert(response); // 显示成功或错误消息
        },
        error: function () {
            alert('Request Failed'); // 处理错误情况
        }
    });

});