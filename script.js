var canvas;
var context;
var glowStart = true;
var lighter = false;
var type="挑战组";
var selected = true;
var exist = false;


$(document).ready(function(){
	setSelect();

	$(".picOption>span").click(function(){
		if(selected){
			canvas.css("visibility","hidden");
			glowStart = false;
			$(".picOption>span:hidden").show();
			selected = false;
		}
		else{
			$(this).detach().insertBefore(".picOption>span:first-child");
			$(".picOption>span:last-child").hide();
			type = $(this).children("img").attr("value");
			glowStart = true;
			drawGlow(0);
			canvas.css("visibility","visible");
			selected = true;
		}
	})

	$(".college").change(function(){
		//alert("asd");
		if($(this).val()=="研究生"){
			$(this).nextAll(".grade").attr("disabled",true).css("background-color","#ccc");
		}
	});

	$(".groupNum").bind("change",numChange);

	setTreaty();

	$(".progress").css("width",parseInt($(".treaty").css("width")));

	setCheck();



})

$(window).load(function(){
	canvas = $("canvas");
	context = canvas.get(0).getContext("2d");
	drawGlow(0);
	showTreaty();
	checkTime();
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



var drawGlow = function(radius){
	if(!glowStart) return;
	context.clearRect(0,0,300,85);
	context.shadowColor = "rgb(77,255,186)";
	context.shadowBlur = radius;
	context.shadowOffsetX = 0;
	context.shadowOffsetY = 0;
	context.strokeStyle = "rgb(77,255,186)";
	context.fillStyle = "rgb(77,255,186)";
	context.lineWidth = 2;
	context.beginPath();
	context.arc(72,25,23,0,Math.PI*2,false);
	context.closePath();
	context.font = "23px helvetica";
	context.fillText(type,190,34);
	context.stroke();
	if(radius>=15) lighter = true;
	if(radius<=0) lighter = false;
	if(lighter) radius-=3;
	else radius+=3;
	window.setTimeout(function(){drawGlow(radius);},500);
}

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
	if((result = checkName())!=true){result.focus();return false;}
	if((result = checkNumber())!=true){result.focus();return false;}
	if((result = checkLocalNumber())!=true){result.focus();return false;}
	if((result = checkPhoneNumber())!=true){result.focus();return false;}
	if((result = checkEmail())!=true){result.focus();return false;}
	if(!checkTreaty()) return false;
	if(!checkRe()){return false;}	
	linkToDB();
	return false;
}


var checkTime = function(){
	var date1 = new Date();
	var date2 = new Date(2014,10,14,19,0,0);
	time = date2.getTime()-date1.getTime();
	if(time<=0){
		alert("报名已截止，感谢你的关注！");
		return false;
	}
	return true;
}


var checkName = function(){
	inputName = $(".name:not(:hidden)");
	for(i = 0;i<inputName.length;i++){
		temp = inputName.eq(i);
		if(temp.val()==""){
			temp.parent().prev(".error-tips").html("请填写姓名");
			temp.addClass("error");
			return temp;
		}
	}
	return true;
}

var checkNumber = function(){
	reg=/^[0-9]*$/;
	inputNumber = $(".number:not(:hidden)");
	for(i = 0;i<inputNumber.length;i++){
		temp = inputNumber.eq(i);
		if(temp.val()=="" || !reg.test(temp.val())){
			temp.parent().prev(".error-tips").html("你输入的学号不正确");
			temp.addClass("error");
			return temp;
		}
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
	if(window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	}
	else{
		xmlhttp = new ActiveXobject("Microsoft.XMLHTTP");
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
	xmlhttp.send();
}



var checkPhoneNumber = function(){
	reg=/^[0-9]*$/;
	inputPhoneNum = $(".phoneLong:not(:hidden)");
	for(i=0;i<inputPhoneNum.length;i++){
		tempLong = inputPhoneNum.eq(i);
		tempShort = tempLong.nextAll(".phoneShort");
		if(tempLong.val()=="" && tempShort.val()==""){
			tempLong.parent().prev(".error-tips").html("长号和短号至少填写一个，如有短号建议填写");
			tempLong.addClass("error");
			tempShort.addClass("error");
			return tempLong;
		}
		else{
			if(!reg.test(tempLong.val())){
				tempLong.parent().prev(".error-tips").html("长号填写错误");
				tempLong.addClass("error");
				return tempLong;
			}
			if(!reg.test(tempShort.val())){
				tempShort.parent().prev(".error-tips").html("短号填写错误");
				tempShort.addClass("error");
				return tempShort;
			}
		}
	}
	return true;
}


var checkEmail = function(){
	reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	inputEmail = $(".email:not(:hidden)");
	//alert(inputEmail.length);
	for(i=0;i<inputEmail.length;i++){
		temp = inputEmail.eq(i);
		if(temp.val()=="" || !reg.test(temp.val())){
			temp.parent().prev(".error-tips").html("邮箱填写错误");
			temp.addClass("error");
			return temp;
		}
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
	message = "link.php?type=" + type;
		memberNum = $(".groupNum").val();
		message = message + "&groupNum=" + memberNum;
		for(i=0;i<memberNum;i++){
			index = "";
			if(i!=0)
				index = "" + i;
			inputName = $(".name:not(:hidden)");
			message = message + "&name" + index + "=" + inputName.eq(i).val();
			inputSex = $(".sex:not(:hidden):checked");
			message = message + "&sex" + index + "=" + inputSex.eq(i).val();
			inputNumber = $(".number:not(:hidden)");
			message = message + "&number" + index + "=" + inputNumber.eq(i).val();
			inputCollege = $(".college:not(:hidden)");
			message = message + "&college" + index + "=" + inputCollege.eq(i).val();
			inputGrade = $(".grade:not(:hidden)");
			if(inputGrade.eq(i).prev(".college").val()=="研究生")
				message = message + "&grade" + index + "=" + "";
			else
				message = message + "&grade" + index + "=" + inputGrade.eq(i).val();
			inputPhoneLong = $(".phoneLong:not(:hidden)");
			message = message + "&phoneLong" + index + "=" + inputPhoneLong.eq(i).val();
			inputPhoneShort = $(".phoneShort:not(:hidden)");
			message = message + "&phoneShort" + index + "=" +inputPhoneShort.eq(i).val();
			inputAddress = $(".address:not(:hidden)");
			message = message + "&address" + index + "=" + inputAddress.eq(i).val();
			inputEmail = $(".email:not(:hidden)");
			message = message + "&email" + index + "=" + inputEmail.eq(i).val();
		}



	if(!confirm("确定信息填写正确，提交报名？")){
		hideProgress();
		return;
	}

	var xmlhttp;
	if(window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	}
	else{
		xmlhttp = new ActiveXobject("Microsoft.XMLHTTP");
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
		}
	}
	xmlhttp.open("GET",message,true);
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
		checkName();
	})

	$(".number").blur(function(){
		$(this).removeClass("error").parent().prev(".error-tips").html("");
		if(!checkNumber())	return;
		if(!checkLocalNumber()) return;
		checkReSub($(this).val(),$(this));
	})

	$(".phoneLong").blur(function(){
		$(this).removeClass("error").parent().prev(".error-tips").html("");
		checkPhoneNumber();
	})

	$(".phoneShort").blur(function(){
		$(this).removeClass("error").parent().prev(".error-tips").html("");
		checkPhoneNumber();
	})

	$(".email").blur(function(){
		$(this).removeClass("error").parent().prev(".error-tips").html("");
		checkEmail();
	})


}