var canvas;
var context;
var glowStart = true;
var lighter = false;
var type = "individual";
var picX;
var picY;

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
	$("html").bind("click",coverClick);

	$(".pic").mousedown(function(){
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
		$("html").bind("click",coverClick);
		if(type=="individual")
			selectIndi();
		else
			selectTeam();
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
		//alert(temp.val());
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
	message = "link.php";
	if(type=="individual"){
	}
}