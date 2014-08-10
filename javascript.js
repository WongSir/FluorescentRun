var canvas;
var context;
var glowStart = true;
var lighter = false;
var type = "individual";
var picX;
var picY;
var selecting = false;

$(document).ready(function(){
	selectIndi();
});

window.onload = function(){
	canvas = $("#glow");
	context = canvas.get(0).getContext("2d");
	pic = $($(".pic").get(0));
	canvas.css("left",pic.offset().left-20).css("top",pic.offset().top-20);
	picX = pic.offset().left;
	picY = pic.offset().top;
	drawGlow(0);
	//$("html").bind("click",coverClick);

	$(".pic").mousedown(function(){
		if(selecting == true){
			selecting = false;
			sPic = $(this);
			hPic = sPic.siblings("img");
			hPic.hide();
			divider = $(".vertical-devider");
			sPic.insertBefore(divider);
			hPic.insertAfter(divider);
			sPic.removeClass("hiddenPic").addClass("selectPic");
			hPic.removeClass("selectPic").addClass("hiddenPic")
			type = sPic.attr("value"); 
			glowStart = true;
			lighter = false;
			canvas.show();
			drawGlow(0);
			//$("html").bind("click",coverClick);
			if(type=="individual")
				selectIndi();
			else
				selectTeam();
		}
		else{
			selecting = true;
			canvas.attr("width",canvas.width()).attr("height",canvas.height());
			glowStart = false;
			anotherPic = $(".pic:hidden");
			anotherPic.show();
			canvas.hide();
		}
	})


	$(".college").change(function(){
		if($(this).val()=="研究生")
			$(this).next(".grade").attr("disabled",true).css("background-color","#ccc");
		else
			$(this).next(".grade").attr("disabled",false).css("background-color","#fff");
	});

	setSelect();

	$(".groupNum").bind("change",numChange);


}

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
}




/*
var coverClick = function(e){
	pic = $($(".pic").get(0));
	x = pic.offset().left;
	y = pic.offset().top;
	w = parseInt(pic.css("width"));
	h = parseInt(pic.css("height"));
	if(e.pageX>=x && e.pageX<=x+w && e.pageY>=y && e.pageY<=y+h){
		//alert("sadas");
		canvas.attr("width",canvas.width()).attr("height",canvas.height());
		glowStart = false;
		anotherPic = $(".pic:hidden");
		anotherPic.show();
		canvas.hide();
		$("html").unbind();
	}
}
*/

var drawGlow = function(radius){
	if(!glowStart) return;
	canvas.attr("width",canvas.width()).attr("height",canvas.height());
	context.shadowColor = "rgb(77,255,186)";
	context.shadowBlur = radius;
	context.shadowOffsetX = 0;
	context.shadowOffsetY = 0;
	context.strokeStyle = "rgb(77,255,186)";
	context.fillStyle = "rgb(77,255,186)";
	context.lineWidth = 2;
	pic = $($(".pic").get(0));
	x = 20+parseInt(pic.css("width"))/2;
	y = 20+parseInt(pic.css("height"))/2;
	context.beginPath();
	context.arc(x,y,parseInt(pic.css("width"))/2-3,0,Math.PI*2,false);
	context.closePath();
	context.font = "23px helvetica";
	context.fillText(type,x+105,y+9);
	context.stroke();
	if(radius>=20) lighter = true;
	if(radius<=0) lighter = false;
	if(lighter) radius-=3;
	else radius+=3;
	window.setTimeout(function(){drawGlow(radius);},500);
}

var selectIndi = function(){
	groupNum = $(".groupNum").hide();
	groupNum.prev("span").hide();
	groupNum.next(".horizontal-divider").hide();
	$("#leader").hide();
	$("#teammate1").hide().prev(".horizontal-divider").hide();
	$("#teammate2").hide().prev(".horizontal-divider").hide();
	$("#teammate3").hide().prev(".horizontal-divider").hide();
}

var selectTeam = function(){
	groupNum = $(".groupNum");
	groupNum.show();
	groupNum.prev("span").show();
	groupNum.next(".horizontal-divider").show();
	$("#leader").show();
	numChange();
}


var numChange = function(){
	$("#teammate1").hide().prev(".horizontal-divider").hide();
	$("#teammate2").hide().prev(".horizontal-divider").hide();
	$("#teammate3").hide().prev(".horizontal-divider").hide();
	groupNum = $(".groupNum");
	num = parseInt(groupNum.val());
	if(num>=2){
		$("#teammate1").show().prev(".horizontal-divider").show();
		if(num>=3){
			$("#teammate2").show().prev(".horizontal-divider").show();
			if(num==4)
				$("#teammate3").show().prev(".horizontal-divider").show();
		}
	}
}


var check = function(){
	$(".error").removeClass("error");
	if(!checkName()) return false;
	if(!checkNumber()) return false;
	if(!checkPhoneNumber()) return false;
	if(!checkEmail()) return false;
	linkToDB();
	return false;
}

var checkName = function(){
	inputName = $(".name:not(:hidden)");
	for(i = 0;i<inputName.length;i++){
		temp = inputName.eq(i);
		if(temp.val()==""){
			alert("请输入姓名！");
			temp.addClass("error");
			temp.focus();
			return false;
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
			alert("你输入的学号不正确！");
			temp.addClass("error");
			temp.focus();
			return false;
		}
	}
	return true;
}

var checkPhoneNumber = function(){
	reg=/^[0-9]*$/;
	inputPhoneNum = $(".phoneLong:not(:hidden)");
	for(i=0;i<inputPhoneNum.length;i++){
		tempLong = inputPhoneNum.eq(i);
		tempShort = tempLong.next(".phoneShort");
		if(tempLong.val()=="" && tempShort.val()==""){
			alert("长号和短号至少填写一个，如有短号建议填写。");
			tempLong.addClass("error").focus();
			tempShort.addClass("error");
			return false;
		}
		else{
			if(!reg.test(tempLong.val())){
				alert("长号填写错误");
				tempLong.addClass("error").focus();
				return false;
			}
			if(!reg.test(tempShort.val())){
				alert("短号填写错误");
				tempShort.addClass("error").focus();
				return false;
			}
		}
	}
	return true;
}


var checkEmail = function(){
	reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	inputEmail = $(".e-mail:not(:hidden)");
	//alert(inputEmail.length);
	for(i=0;i<inputEmail.length;i++){
		temp = inputEmail.eq(i);
		if(temp.val()=="" || !reg.test(temp.val())){
			alert("邮箱填写错误！");
			temp.addClass("error").focus();
			return false;
		}
	}
	return true;
}



var linkToDB = function(){
	message = "link.php?type=" + type;
	if(type=="individual"){
		inputName = $(".name:not(:hidden)");
		message = message + "&name=" + inputName.eq(0).val();
		message = message + "&ename=" + inputName.eq(1).val();
		inputSex = $(".sex:not(:hidden):checked");
		message = message + "&sex=" +inputSex.val();
		inputNumber = $(".number:not(:hidden)");
		message = message + "&number=" +inputNumber.eq(0).val();
		inputCollege = $(".college:not(:hidden)");
		message = message + "&college=" +inputCollege.eq(0).val();
		inputGrade = $(".grade:not(:hidden)");
		message = message + "&grade=" + inputGrade.eq(0).val();
		inputPhoneLong = $(".phoneLong:not(:hidden)");
		message = message + "&phoneLong=" + inputPhoneLong.eq(0).val();
		message = message + "&ephoneLong=" + inputPhoneLong.eq(1).val();
		inputPhoneShort = $(".phoneShort:not(:hidden)");
		message = message + "&phoneShort=" +inputPhoneShort.eq(0).val();
		message = message + "&ephoneShort=" + inputPhoneShort.eq(1).val();
		inputAddress = $(".address:not(:hidden)");
		message = message + "&address=" + inputAddress.eq(0).val();
		inputEmail = $(".e-mail:not(:hidden)");
		message = message + "&email=" + inputEmail.eq(0).val();
	}

	else{
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
			message = message + "&grade" + index + "=" + inputGrade.eq(i).val();
			inputPhoneLong = $(".phoneLong:not(:hidden)");
			message = message + "&phoneLong" + index + "=" + inputPhoneLong.eq(i).val();
			inputPhoneShort = $(".phoneShort:not(:hidden)");
			message = message + "&phoneShort" + index + "=" +inputPhoneShort.eq(i).val();
			inputAddress = $(".address:not(:hidden)");
			message = message + "&address" + index + "=" + inputAddress.eq(i).val();
			inputEmail = $(".e-mail:not(:hidden)");
			message = message + "&email" + index + "=" + inputEmail.eq(i).val();
		}
		message = message + "&ename=" + inputName.eq(i).val();
		message = message + "&ephoneLong=" + inputPhoneLong.eq(i).val();
		message = message + "&ephoneShort=" + inputPhoneShort.eq(i).val();
	}



	if(!confirm("确定信息填写正确，提交报名？"))
		return;

	//alert(message);

	var xmlhttp;
	if(window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	}
	else{
		xmlhttp = new ActiveXobject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			$(".frame").html("<p style=\"color:#fff;font-size:50px;font-family:helvetica;margin:10% 25%\"></br>Congratulations!</p><p style=\"color:#fff;font-size:20px;margin-left:40%\">" +xmlhttp.responseText + "</p>");
		}
	}
	xmlhttp.open("GET",message,true);
	xmlhttp.send();
}