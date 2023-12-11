//送出報名資料
//----------------------------------------------
$('#cf-signupsubmit').on('click', function () {

    event.preventDefault();

    var DataArray = new Array(100);
    DataArray[1] = $('#cf-name').val();
    DataArray[2] = $('#cf-gender').val();
    DataArray[3] = $('#cf-school').val();
    DataArray[4] = $('#cf-grade').val();
    DataArray[5] = $('#cf-year').val();
    DataArray[6] = $('#cf-month').val();
    DataArray[7] = $('#cf-day').val();
    DataArray[8] = $('#cf-tel').val().toString();
    DataArray[9] = $('#cf-conper').val();
    DataArray[10] = $('#cf-conpertel').val().toString();

    var isempty = false;
    for (var i = 1; i <= 10; i++) {
        if ((DataArray[i] === "") || (DataArray[i] == null)) {
            isempty = true;
        }
    }

    // 判斷欄位是否為空
    if (isempty) {
        alert("請填寫所有必填欄位！");
        // alert(DataArray[0]);
    } else {
        // 如果欄位都填寫了，可以進行提交表單的操作
        if ($('#cf-signupsubmit').text() == "送出資料") {
            DataArray[0] = 2;

            $.ajax({
                url: google_apps_script_url,
                type: 'POST',
                dataType: 'text',
                data: JSON.stringify({ DataArray: DataArray }),
                contentType: 'text/plain; charset=utf-8',
                success: function (response) {
                    alert(response); // 显示成功或错误消息

                    $("#cf-name").val("");
                    $("#cf-gender").val($("#cf-gender option:first").val());
                    $("#cf-school").val("");
                    $("#cf-grade").val("");
                    $("#cf-year").val($("#cf-year option:first").val());
                    $("#cf-month").val($("#cf-month option:first").val());
                    $("#cf-day").val($("#cf-day option:first").val());
                    $("#cf-tel").val("");
                    $("#cf-conper").val("");
                    $("#cf-conpertel").val("");
                },
                error: function () {
                    alert('Request Failed'); // 处理错误情况
                }
            });

        } else if ($('#cf-signupsubmit').text() == "修改資料") {
            DataArray[0] = 4;
            // DataArray[11] = $('#btn-username').text();
            DataArray[11] = userName;
            DataArray[12] = userBirthday;

            $.ajax({
                url: google_apps_script_url,
                type: 'POST',
                dataType: 'text',
                data: JSON.stringify({ DataArray: DataArray }),
                contentType: 'text/plain; charset=utf-8',
                success: function (response) {
                    alert(response); // 显示成功或错误消息

                    $("#cf-name").val("");
                    $("#cf-gender").val($("#cf-gender option:first").val());
                    $("#cf-school").val("");
                    $("#cf-grade").val("");
                    $("#cf-year").val($("#cf-year option:first").val());
                    $("#cf-month").val($("#cf-month option:first").val());
                    $("#cf-day").val($("#cf-day option:first").val());
                    $("#cf-tel").val("");
                    $("#cf-conper").val("");
                    $("#cf-conpertel").val("");

                    $('#btn-username').hide();
                    $('#btn-username').text("");
                    userName = "";
                    userBirthday = "";
                    $('#cf-signupsubmit').text("送出資料");
                },
                error: function () {
                    alert('Request Failed'); // 处理错误情况
                }
            });
        }
    }
});

//顯示登入頁面
//----------------------------------------------
function openLoginBox() {
    // event.preventDefault();
    document.getElementById('overlay').style.display = 'flex';

    $('#btn-username').hide();
    $('#username2').text("");
    userName = "";
    userBirthday = "";
    $('#cf-signupsubmit').text("送出資料");
}

//關閉登入頁面
//----------------------------------------------
function closeLoginBox() {
    event.preventDefault();
    document.getElementById('overlay').style.display = 'none';

    $("#cf-loginname").val("");
    $("#cf-loginyear").val($("#cf-loginyear option:first").val());
    $("#cf-loginmonth").val($("#cf-loginmonth option:first").val());
    $("#cf-loginday").val($("#cf-loginday option:first").val());
}

//資料查訊登入頁
//----------------------------------------------
function submitForm() {
    event.preventDefault();

    var DataArray = new Array(100);
    DataArray[0] = 3;
    DataArray[1] = $('#cf-loginname').val();
    DataArray[2] = $('#cf-loginyear').val();
    DataArray[3] = $('#cf-loginmonth').val();
    DataArray[4] = $('#cf-loginday').val();

    $.ajax({
        url: google_apps_script_url,
        type: 'POST',
        dataType: 'text',
        data: JSON.stringify({ DataArray: DataArray }),
        contentType: 'text/plain; charset=utf-8',
        success: function (data) {
            LoginResponseResults(data); // 显示成功或错误消息
        },
        error: function () {
            alert('Request Failed'); // 处理错误情况
        }
    });

    // 在这里可以添加验证逻辑

    // if (username === 'user' && password === '000000') {
    //     alert('Login successful!');
    //     openVeiwDataTable()
    //     closeLoginBox();
    // } else {
    //     alert('Login failed. Please check your username and password.');
    // }
}

//報名資料庫讀回後寫入表格
//----------------------------------------------
function LoginResponseResults(data) {
    //無找到對應資料
    //----------------------------------------
    if (data[1] == "0") {
        alert('資料庫沒有符合的報名資訊🥺🥺');
    }
    //找到對應報名資料並填入欄位
    //----------------------------------------
    else if (data[1] == "1") {
        alert('您的資料已載入網頁😆😆\n如要修改請更新欄位資料後按「修改」上傳');
        closeLoginBox();

        var dataArray = data.split(',');
        $('#cf-name').val(dataArray[0].replace(/^"1/, ''));
        $("#cf-gender option[value='" + dataArray[1] + "']").prop("selected", true);
        $('#cf-school').val(dataArray[2]);
        $('#cf-grade').val(dataArray[3]);
        $("#cf-year option[value='" + dataArray[4].split('/')[0] + "']").prop("selected", true);
        $("#cf-month option[value='" + dataArray[4].split('/')[1] + "']").prop("selected", true);
        $("#cf-day option[value='" + dataArray[4].split('/')[2] + "']").prop("selected", true);
        $('#cf-tel').val(dataArray[5]);
        $('#cf-conper').val(dataArray[6]);
        $('#cf-conpertel').val(dataArray[7].replace(/"/g, ''));

        $('#btn-username').show();
        $('#btn-username').text($('#cf-name').val());
        userName = $('#cf-name').val();
        userBirthday = dataArray[4];
        $('#cf-signupsubmit').text("修改資料");
    }
    //管理者權限
    //----------------------------------------
    else if (data[1] == "[") {
        alert('兔兔管理員你好🐰🐰');
        closeLoginBox();

        document.getElementById('VeiwDataTable').style.display = 'flex';

        displayData(JSON.parse(data)); // 字串轉成二微陣列，处理 Google Sheets 数据
    }
}

//登入後動作-權限管理者-將報名資料庫讀回來並顯示
//----------------------------------------------
function openVeiwDataTable() {

    document.getElementById('VeiwDataTable').style.display = 'flex';

    var DataArray = new Array(100);
    DataArray[0] = 4;

    $.ajax({
        url: google_apps_script_url,
        type: 'POST',
        dataType: 'text',
        data: JSON.stringify({ DataArray: DataArray }),
        contentType: 'text/plain; charset=utf-8',
        success: function (data) {
            // alert("response 成功"); // 处理错误情况
            // 将字符串解析为 JavaScript 对象
            var twoDArray_data = JSON.parse(data);
            displayData(twoDArray_data); // 处理 Google Sheets 数据
        },
        error: function () {
            alert('Request Failed'); // 处理错误情况
        }
    });
}

//報名資料庫讀回後寫入表格
//----------------------------------------------
function displayData(data) {
    var tableBody = $('#data-table tbody');
    tableBody.empty();
    $.each(data, function (index, row) {
        var newRow = $('<tr>');
        $.each(row, function (index, cellData) {
            var cell = $('<td>').text(cellData);
            newRow.append(cell);
        });
        tableBody.append(newRow);
    });
}

//關閉報名資料顯示頁
//----------------------------------------------
function closeVeiwDataTable() {
    event.preventDefault();
    document.getElementById('VeiwDataTable').style.display = 'none';
    closeLoginBox();
}