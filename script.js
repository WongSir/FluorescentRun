var canvas;
var context;
var lighter = false;
var type="体验组";
var exist = false;
//var handeler;

$(document).ready(function(){
	$("#jsError").hide();

	$("form").get(0).onsubmit = function(){
		alert("刷啊刷~报名系统读取中~请等页面完全加载后再提交吧~");
		return false;
	}
	setSelect();


	$(".picOption>span").click(function(){
		$(this).siblings().removeClass("active").end().addClass("active");
		type = $(this).find("img").attr("value");
		//clearTimeout(handeler);
		//drawGlow(0);
	})

	$(".college").change(function(){
		//alert("asd");
		if($(this).val()=="研究生" || $(this).val()=="校友"){
			option = $('<option>&nbsp;</option>').val(" ").attr("selected","selected");
			$(this).nextAll(".grade").append(option);
			$(this).nextAll(".grade").attr("disabled",true).css("background-color","#ccc");
			
		}
		else{
			$(this).nextAll(".grade").children("option[value=' ']").remove()
			$(this).nextAll(".grade").children("option[value='大一']").attr("selected","selected");
			$(this).nextAll(".grade").attr("disabled",false).css("background-color","#fff");
		}
	});

	$(".groupNum").bind("change",numChange);

	setTreaty();

	$(".progress").css("width",parseInt($(".treaty").css("width")));

	setCheck();



})

$(window).load(function(){
	//canvas = $("canvas");
	//context = canvas.get(0).getContext("2d");
	//drawGlow(0);
	showTreaty();
	checkTime();	
	$("form").get(0).onsubmit = function(){
		check();
		return false;
	}
})


var setSelect = function(){
	option = $(".grade option");
	select = $(".grade")
	opWidth = parseInt(select.css("width"));
	opFontWidth = parseInt(select.css("font-size"));
	spaceNum = Math.floor((opWidth-2*opFontWidth)/opFontWidth*1.6);
	space = "";
	for(i = 0;i<spaceNum;i++)
		space += "&nbsp;";
	option.each(function(){
		$(this).html(space+$(this).html());
	});
	select = $(".groupNum");
	option = select.children("option");
	opWidth = parseInt(select.css("width"));
	opFontWidth = parseInt(select.css("font-size"));
	spaceNum = Math.floor((opWidth-opFontWidth)/opFontWidth*1.5);
	space = "";
	for(i = 0;i<spaceNum;i++)
		space += "&nbsp;";
	option.each(function(){
		$(this).html(space+$(this).html());
	});
	select = $(".college");
	option = select.children("option");
	opWidth = parseInt(select.css("width"));
	opFontWidth = parseInt(select.css("font-size"));
	spaceNum = Math.floor((opWidth-9*opFontWidth)/opFontWidth*1.6);
	space = "";
	for(i = 0;i<spaceNum;i++)
		space += "&nbsp;";
	option.each(function(){
		$(this).html(space+$(this).html());
	});
}


/*
var drawGlow = function(radius){
	context.clearRect(0,0,300,85);
	context.shadowColor = "rgb(77,255,186)";
	context.shadowBlur = radius;
	context.shadowOffsetX = 0;
	context.shadowOffsetY = 0;
	context.strokeStyle = "rgb(77,255,186)";
	context.fillStyle = "rgb(77,255,186)";
	context.lineWidth = 2;
	context.beginPath();
	if(type == "体验组")
		glowX = 75;
	else
		glowX = 251;
	context.arc(glowX,25,23,0,Math.PI*2,false);
	context.closePath();
	context.stroke();
	
	if(radius>=15) lighter = true;
	if(radius<=0) lighter = false;
	if(lighter) radius-=3;
	else radius+=3;
	handeler = window.setTimeout(function(){drawGlow(radius);},500);
}
*/

var numChange = function(){
	$("#teammate2").hide();
	$("#teammate3").hide();
	groupNum = $(".groupNum");
	num = parseInt(groupNum.val());
	if(num>=3){
		$("#teammate2").show();
		if(num==4)
			$("#teammate3").show();
	}
}

var showTreaty = function(){
	$("body").css("overflow","hidden");
	$(".treaty").show();
}

var hideTreaty = function(){
	$("body").css("overflow","scroll");
	$(".treaty").hide();
}

var setTreaty = function(){
	$("#showTreaty").bind("click",showTreaty);

	$(".treaty a").click(function(){
		hideTreaty();
		return false;
	})

	$(".treaty .btn-success").click(function(){
		$("#agreeTreaty").prop("checked",true);
		hideTreaty();
	})

	$(".treaty .btn-danger").click(function(){
		$("#agreeTreaty").prop("checked",false);
		hideTreaty();
	})
}


var check = function(){
	$(".error").removeClass("error").parent().prev(".error-tips").html("");
	if(!checkAllNames()){return false;}
	if(!checkAllNumbers()){return false;}
	if((result = checkLocalNumber())!=true){result.focus();return false;}
	if(!checkAllPhoneNumbers()){return false;}
	if(!checkAllEmails()){return false;}
	if(!checkTreaty()) return false;
	if(!checkRe()){return false;}	
	linkToDB();
	return false;
}


var checkTime = function(){
	var date1 = new Date();
	var date2 = new Date(2014,10,14,9,0,0);
	time = date2.getTime()-date1.getTime();
	if(time<=0){
		alert("报名已截止，感谢你的关注！");
		return false;
	}
	return true;
}


var checkAllNames = function(){
	$(".name").removeClass("error").parent().prev(".error-tips").html("");
	inputName = $(".name:not(:hidden)");
	for(i = 0;i<inputName.length;i++){
		temp = inputName.eq(i);
		if(!checkName(temp)){
			temp.focus();
			return false;
		}
	}
	return true;
}

var checkAllNumbers = function(){
	$(".number").removeClass("error").parent().prev(".error-tips").html("");
	inputNumber = $(".number:not(:hidden)");
	for(i = 0;i<inputNumber.length;i++){
		temp = inputNumber.eq(i);
		if(!checkNumber(temp)){
			temp.focus();
			return false;
		}
	}
	return true;
}

var checkAllPhoneNumbers = function(){
	$(".phoneLong").removeClass("error").parent().prev(".error-tips").html("");
	$(".phoneShort").removeClass("error").parent().prev(".error-tips").html("");
	inputPhoneNum = $(".phoneLong:not(:hidden)");
	for(i=0;i<inputPhoneNum.length;i++){
		tempLong = inputPhoneNum.eq(i);
		tempShort = tempLong.nextAll(".phoneShort");
		r = checkPhoneNumber(tempLong,tempShort);
		//alert(r.result);
		if(r !=true){
			if(r.which<=0)
				tempLong.focus();
			else
				tempShort.focus();
			return false;
		}
	}
	return true;
}

var checkAllEmails = function(){
	$(".email").removeClass("error").parent().prev(".error-tips").html("");
	inputEmail = $(".email:not(:hidden)");
	for(i=0;i<inputEmail.length;i++){
		temp = inputEmail.eq(i);
		if(!checkEmail(temp)){
			temp.focus();
			return false;
		}
	}
	return true;
}


var checkName = function(temp){
	if(temp.val().replace(/[ ]/g,"")==""){
	//if(temp.val()==""){
		temp.parent().prev(".error-tips").html("请填写姓名");
		temp.addClass("error");
		return false;
	}
	return true;
}

var checkNumber = function(temp){
	reg=/^[0-9]*$/;
	if(temp.val()=="" || !reg.test(temp.val())){
		temp.parent().prev(".error-tips").html("你输入的学号不正确");
		temp.addClass("error");
		return false;
	}
	return true;
}

var checkLocalNumber = function(){
	inputNumber = $(".number:not(:hidden)");
	for(i = 0;i<inputNumber.length;i++)
		for(j = i+1;j<inputNumber.length;j++)
			if((inputNumber.eq(i).val()==inputNumber.eq(j).val()) && (inputNumber.eq(i).val()!="")){
				inputNumber.eq(j).addClass("error").focus().parent().prev(".error-tips").html("你输入的学号已重复");
				return false;
			}
	return true;
}


var checkRe = function(){
	showProgress();
	inputNumber = $(".number:not(:hidden)");
	numberOfMem = new Array();
	for(i=0;i<inputNumber.length;i++)
		numberOfMem.push(inputNumber.eq(i).val());
	for(i=0;i<numberOfMem.length;i++){
		checkReSub(numberOfMem[i],inputNumber.eq(i));
		if(exist){
			inputNumber.eq(i).focus();
			alert("学号 "+numberOfMem[i]+" 已经报名，请勿重复报名！");
			hideProgress();
			return false;
		}
		changeProgress(i/numberOfMem.length);
	}
	return true;
}


var checkReSub = function(str,obj){
	if(str==""){
		exist = false;
		return;
	}

	xmlhttp = CreateXMLHttp();
	if(!xmlhttp){
		alert("您的浏览器太古老啦~请更新后再重新报名吧~");
		return;
	}

	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			if(xmlhttp.responseText!=""){
				obj.addClass("error").parent().prev(".error-tips").html("重复报名");	
				exist = true;
			}
			else
				exist = false;
		}
	}
	xmlhttp.open("GET","checkRe.php?number="+str,false);
	xmlhttp.setRequestHeader("If-Modified-Since","0");
	xmlhttp.send();
}



var checkPhoneNumber = function(tempLong,tempShort){
	reg=/^[0-9]*$/;
	if(tempLong.val()=="" && tempShort.val()==""){
		tempLong.parent().prev(".error-tips").html("长号和短号至少填写一个，如有短号建议填写");
		tempLong.addClass("error");
		tempShort.addClass("error");
		return {result:false,which:-1};
	}
	else{
		if(!reg.test(tempLong.val())){
			tempLong.parent().prev(".error-tips").html("长号填写错误");
			tempLong.addClass("error");
			return {result:false,which:0};
		}
		if(!reg.test(tempShort.val())){
			tempShort.parent().prev(".error-tips").html("短号填写错误");
			tempShort.addClass("error");
			return {result:false,which:1};
		}
	}
	return true;
}


var checkEmail = function(temp){
	reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	if(temp.val()=="" || !reg.test(temp.val())){
		temp.parent().prev(".error-tips").html("邮箱填写错误");
		temp.addClass("error");
		return false;
	}
	return true;
}


var checkTreaty = function(){
	if($("#agreeTreaty").prop("checked")) return true;
	else{
		alert("你必须先同意活动相关条约方可报名！");
		return false;
	}
}



var linkToDB = function(){
	//alert("asdas");
	message = "link.php?type=" + encodeURI(type);
		memberNum = $(".groupNum").val();
		message = message + "&groupNum=" + memberNum;
		for(i=0;i<memberNum;i++){
			index = "";
			if(i!=0)
				index = "" + i;
			inputName = $(".name:not(:hidden)");
			message = message + "&name" + index + "=" + encodeURI(inputName.eq(i).val());
			inputSex = $(".sex:not(:hidden):checked");
			message = message + "&sex" + index + "=" + encodeURI(inputSex.eq(i).val());
			inputNumber = $(".number:not(:hidden)");
			message = message + "&number" + index + "=" + inputNumber.eq(i).val();
			inputCollege = $(".college:not(:hidden)");
			message = message + "&college" + index + "=" + encodeURI(inputCollege.eq(i).val());
			inputGrade = $(".grade:not(:hidden)");
			message = message + "&grade" + index + "=" + encodeURI(inputGrade.eq(i).val());
			inputPhoneLong = $(".phoneLong:not(:hidden)");
			message = message + "&phoneLong" + index + "=" + inputPhoneLong.eq(i).val();
			inputPhoneShort = $(".phoneShort:not(:hidden)");
			message = message + "&phoneShort" + index + "=" + inputPhoneShort.eq(i).val();
			inputAddress = $(".address:not(:hidden)");
			message = message + "&address" + index + "=" + encodeURI(inputAddress.eq(i).val());
			inputEmail = $(".email:not(:hidden)");
			message = message + "&email" + index + "=" + inputEmail.eq(i).val();
		}


	if(!confirm("确定信息填写正确，提交报名？")){
		hideProgress();
		return;
	}

	var xmlhttp;

	xmlhttp = CreateXMLHttp();
	if(!xmlhttp){
		alert("您的浏览器太古老啦~请更新后再重新报名吧~");
		return;
	}
	
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			changeProgress(1);
			hideProgress();
			//$(".frame").html("<div class=\"fetch\">"+xmlhttp.responseText+"</div>");	

			if(xmlhttp.responseText=="success")
				$(".frame").html("<div class=\"fetch\"><h1><p>Congratulations!<p></h1><h3><p>你的报名已提交</p></h3></div>");
			else if(xmlhttp.responseText=="error")
				$(".frame").html("<div class=\"fetch\"><h1><p>ERROR!<p></h1><h3><p>服务器检测到你填写的信息有误哦~<br>请确认信息正确重新填写吧~</p></h3></div>");
			else{
				reg=/^[0-9]*$/;
				if(reg.test(xmlhttp.responseText))
					$(".frame").html("<div class=\"fetch\"><h1><p>ERROR!<p></h1><h3><p>服务器检测到你填写的信息有误哦~<br>学号&nbsp;"+xmlhttp.responseText+"&nbsp;重复报名！<br>请确认信息正确重新填写吧~</p></h3></div>");
				else if(xmlhttp.responseText = "报名已截止，感谢你的关注！")
					$(".frame").html("<div class=\"fetch\"><h1><p>ERROR!<p></h1><h3><p>"+xmlhttp.responseText+"</p></h3></div>");
				else
					$(".frame").html("<div class=\"fetch\"><h1><p>ERROR!<p></h1><h3><p>服务器检测到你填写的信息有误哦~<br>"+xmlhttp.responseText+"<br>请确认信息正确重新填写吧~</p></h3></div>");
			}


			//$(".frame").html(xmlhttp.responseText);
		}
	}
	xmlhttp.open("GET",message,true);
	xmlhttp.setRequestHeader("If-Modified-Since","0");
	xmlhttp.send();
}

var showProgress = function(){
	$("body").css("overflow","hidden");
	$(".progress").show();
}

var hideProgress = function(){
	$("body").css("overflow","scroll");
	$(".progress").hide();
}

var changeProgress = function(i){
	$(".progress h3").html(parseInt(i*100)+"%");
	$(".progress .progress-inner").css("width",parseInt($(".progress .progress-outer").css("width"))*i);
}

var setCheck = function(){
	$(".name").blur(function(){
		$(this).removeClass("error").parent().prev(".error-tips").html("");
		checkName($(this));
	})

	$(".number").blur(function(){
		$(this).removeClass("error").parent().prev(".error-tips").html("");
		if(!checkNumber($(this)))	return;
		if(!checkLocalNumber()) return;
		checkReSub($(this).val(),$(this));
	})

	$(".phoneLong").blur(function(){
		$(this).removeClass("error").parent().prev(".error-tips").html("");
		phoneLong = $(this);
		phoneShort = phoneLong.nextAll(".phoneShort");
		checkPhoneNumber(phoneLong,phoneShort);
	})

	$(".phoneShort").blur(function(){
		$(this).removeClass("error").parent().prev(".error-tips").html("");
		phoneShort = $(this);
		phoneLong = phoneShort.prevAll(".phoneLong");
		checkPhoneNumber(phoneLong,phoneShort);
	})

	$(".email").blur(function(){
		$(this).removeClass("error").parent().prev(".error-tips").html("");
		checkEmail($(this));
	})


}


var  CreateXMLHttp = function(){
	  try{
	   xmlhttp=new XMLHttpRequest();//尝试创建 XMLHttpRequest 对象，除 IE 外的浏览器都支持这个方法。
	}catch(e){
	  try{
	  xmlhttp=ActiveXobject("Msxml12.XMLHTTP");//使用较新版本的 IE 创建 IE 兼容的对象（Msxml2.XMLHTTP）。
	}catch(e){
	  try{
	  xmlhttp=ActiveXobject("Microsoft.XMLHTTP");//使用较老版本的 IE 创建 IE 兼容的对象（Microsoft.XMLHTTP）。
	}catch(failed){
	    xmlhttp=false;//如果失败了还保持false
	}
	}
	}
	return xmlhttp;
}