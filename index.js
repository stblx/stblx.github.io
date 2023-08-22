var age,subject,type,year;

document.getElementById("text1").innerText = '当前已选择：';

//解析表单
let url = window.location.search;
if(url != ""){
    url = url.substring(1);
    var datas = url.split('&');
    
    age = datas[0].split('=')[1];
    subject = datas[1].split('=')[1];
    type = datas[2].split('=')[1];
    year = datas[3].split('=')[1];
}

//判断年级 科目
var chineseage,chinesesubject,chinesetype,chineseyear = year;
if(chineseyear == "All"){
    chineseyear = "";
}

switch (age){
    case "primary":
        chineseage = "小学";
        break;
    case "primary1":
        chineseage = "一年级";
        break;
    case "primary2":
        chineseage = "二年级";
        break;
    case "primary3":
        chineseage = "三年级";
        break;
    case "primary4":
        chineseage = "四年级";
        break;
    case "primary5":
        chineseage = "五年级";
        break;
    case "primary6":
        chineseage = "六年级";
        break;
    case "junior":
        chineseage = "初中";
        break;
    case "junior1":
        chineseage = "初一";
        break;
    case "junior2":
        chineseage = "初二";
        break;
    case "junior3":
        chineseage = "初三";
        break;
    case "senior":
        chineseage = "高中";
        break;
    case "senior1":
        chineseage = "高一";
        break;
    case "senior2":
        chineseage = "高二";
        break;
    case "senior3":
        chineseage = "高三";
        break;
}
switch (subject){
    case "chinese":
        chinesesubject = "语文";
        break;
    case "math":
        chinesesubject = "数学";
        break;
    case "englsh":
        chinesesubject = "英语";
        break;
    case "history":
        chinesesubject = "历史";
        break;
    case "geography":
        chinesesubject = "地理";
        break;
    case "polity":
        chinesesubject = "政治";
        break;
    case "biology":
        chinesesubject = "生物";
        break;
    case "physics":
        chinesesubject = "物理";
        break;
    case "chemistry":
        chinesesubject = "化学";
        break;
}
switch (type){
    case "zhenti":
        chinesetype = "真题";
        break;
    case "shangqizhong":
        chinesetype = "(上)期中";
        break;
    case "shangqimo":
        chinesetype = "(上)期末";
        break;
    case "xiaqizhong":
        chinesetype = "(下)期中";
        break;
    case "xiaqimo":
        chinesetype = "(下)期末";
        break;
    case "yimo":
        chinesetype = "一模";
        break;
    case "ermo":
        chinesetype = "二模";
        break;
    case "sanmo":
        chinesetype = "三模";
        break;
    case "yuekao":
        chinesetype = "月考";
        break;
    case "hegekaoshi":
        chinesetype = "合格考试";
        break;
    case "fenbankaoshi":
        chinesetype = "分班考试";
        break;
    case "zhentihuibian":
        chinesetype = "真题汇编";
        break;
    case "shangqizhonghuibian":
        chinesetype = "(上)期中汇编";
        break;
    case "shangqimohuibian":
        chinesetype = "(上)期末汇编";
        break;
    case "xiaqizhonghuibian":
        chinesetype = "(下)期中汇编";
        break;
    case "xiaqimohuibian":
        chinesetype = "(下)期末汇编";
        break;
    case "yimohuibian":
        chinesetype = "一模汇编";
        break;
    case "ermohuibian":
        chinesetype = "二模汇编";
        break;
    case "hegekaohuibian":
        chinesetype = "合格考汇编";
        break;
}


//网址
var site = "http://www.jingshibang.com/api/productspc?page=0&limit=100&selectOrder=&store_subject=" + chinesesubject + "&store_grade=" + chineseage + "&store_type=" + chinesetype + "&store_year=" + chineseyear;

// 返回搜索结果
function ajaxAPI(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        callback(xhr.responseText);
    };
    xhr.send();
}

// 异步获取搜索结果并处理
function processSearchText(searchtext) {
    ajaxAPI(searchtext, function(responseText) {
        let JSONsearchtext = JSON.parse(responseText);
        analyize(JSONsearchtext)
    });
}

// 调用异步处理函数
processSearchText(site);

var a;

//处理函数
function analyize(JSONsearchtext){
    a = JSONsearchtext.data;
    for(var i = 0;i < a.length;i++){

        var tr = document.createElement("tr");
        //checkbox
        var td = document.createElement("td");
        td.innerHTML = '<input type="checkbox" name="downloadfiles" id="df' + i + '">'
        tr.appendChild(td);

        //下载PDF
        var td = document.createElement("td");
        //td.innerHTML = '<a href="' + "http://www.jingshibang.com/" + a[i].pdf_answer + '" target="_blank" download="' + a[i].store_name + "_" + a[i].id + '">' + "PDF" + '</a>';
        td.innerHTML = '<button class="pdfdownload" id="pdfdownload' + i + '">';
        tr.appendChild(td);

        //下载Word
        var td = document.createElement("td");
        //td.innerHTML = '<a href="' + "http://www.jingshibang.com/" + a[i].word_answer + '" target="_blank" class="download">' + "Word" + '</a>';
        td.innerHTML = '<button class="worddownload" id="worddownload' + i + '">';
        tr.appendChild(td);

        //ID
        td = document.createElement("td");
        td.innerText = a[i].id;
        tr.appendChild(td);

        //名称
        td = document.createElement("td");
        td.innerText = a[i].store_name;
        tr.appendChild(td);

        //科目
        td = document.createElement("td");
        td.innerText = a[i].store_subject;
        tr.appendChild(td);

        //类型
        td = document.createElement("td");
        td.innerText = a[i].store_type;
        tr.appendChild(td);

        //知识点
        try{
            td = document.createElement("td");
            td.innerText = a[i].pointinfo[0].pointname;
            tr.appendChild(td);
        }
        catch{
            td = document.createElement("td");
            td.innerText = "";
            tr.appendChild(td);
        }

        //加入表格
        document.getElementsByClassName('tbody')[0].appendChild(tr);
    }
}

//添加按钮属性
for(var i = 0;i<document.getElementsByClassName("pdfdownload").length;i++){
    document.getElementsByClassName("pdfdownload")[i].onclick = function(){downloadfilespw("http://www.jingshibang.com/" + a[i].pdf_answer,a[i].store_name + "_" + a[i].id);}; 
    document.getElementsByClassName("worddownload")[i].onclick = function(){downloadfilespw("http://www.jingshibang.com/" + a[i].word_answer,a[i].store_name + "_" + a[i].id);}; 
}

//下载文件
function downloadfilespw(url,filename){
    downloadFileAPI(url)
    .then((response) => {
        downloadFileWithBuffer(response.data, filename,'png')
    })
    .catch(() => {})
}
import request from '@/utils/http'
export function downloadFileAPI(url) {
  return request({
    url: url,
    method: 'get',
    responseType: 'blob'
  })
}
export function downloadFileWithBuffer(data, name,type) {
    const blob = new Blob([data])
    var downloadElement = document.createElement('a')// 创建a标签
    var href = window.URL.createObjectURL(blob) // 创建下载的链接
    downloadElement.href = href
    downloadElement.download = name+'.'+type // 下载后文件名
    document.body.appendChild(downloadElement)
    downloadElement.click() // 点击下载
    document.body.removeChild(downloadElement) // 下载完成移除元素
    window.URL.revokeObjectURL(href) // 释放掉blob对象
  }
//=================

document.getElementById("text1").innerText += (chineseage + " " + chinesesubject + " " + chinesetype + " " + chineseyear + " ");
if(year == "All"){
    document.getElementById("text1").innerText += " 不限时间";
}


document.getElementById('multidownload').onclick = function(){multidownload();}; 

function multidownload(){
    for(var i = 0;i < a.length;i++){
        if(document.getElementById("df" + i).checked){
            if(document.getElementById("filetypeword").checked == true){
                downloadByUrl("http://www.jingshibang.com/" + a[i].word_answer,a[i].store_name + "_" + a[i].id);
                /*
                const a1 = document.createElement('a');
                a1.style.display = 'none';
                a1.download = a[i].store_name + "_" + a[i].id;
                a1.href = "http://www.jingshibang.com/" + a[i].word_answer;
                document.body.appendChild(a1);
                a1.click(); 
                document.body.removeChild(a1);
                */
            }
            if(document.getElementById("filetypepdf").checked == true){
                downloadByUrl("http://www.jingshibang.com/" + a[i].pdf_answer,a[i].store_name + "_" + a[i].id);
                /*
                const a1 = document.createElement('a');
                a1.style.display = 'none';
                a1.download = a[i].store_name + "_" + a[i].id;
                a1.href = "http://www.jingshibang.com/" + a[i].pdf_answer;
                document.body.appendChild(a1);
                a1.click(); 
                document.body.removeChild(a1);
                */
            }
        }
    }
}