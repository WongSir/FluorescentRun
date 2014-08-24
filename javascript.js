var canvas;
var context;
var glowStart = true;
var lighter = false;
var type = "个人";
var selecting = false;
var scrollTop = 0;
var tX = -100;
var tY = -100;
var onReady = false;
var htmlTop;
var mobile = false;


$(document).ready(function(){
	selectIndi();
	//platCheck();
	//alert(mobile);
});

window.onload = function(){
	canvas = $("#glow");
	context = canvas.get(0).getContext("2d");
	canvasPos();
	drawGlow(0);

	$(".pic").mousedown(function(){
		if(selecting == true){
			selecting = false;
			sPic = $(this);
			hPic = sPic.siblings("img");
			hPic.hide();
			divider = $(".vertical-divider");
			sPic.insertBefore(divider);
			hPic.insertAfter(divider);
			sPic.removeClass("hiddenPic").addClass("selectPic");
			hPic.removeClass("selectPic").addClass("hiddenPic")
			type = sPic.attr("value"); 
			glowStart = true;
			lighter = false;
			canvasPos();
			canvas.show();
			drawGlow(0);
			if(type=="个人")
				selectIndi();
			else
				selectTeam();
		}
		else{
			selecting = true;
			canvas.attr("width",canvas.width()).attr("height",canvas.height());
			glowStart = false;
			anotherPic = $(".pic:hidden");
			anotherPic.css("display","inline-block");
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

	setTreaty();

	sPic = $(".pic:not(:hidden)");
	spX = sPic.offset().left;
	spY = sPic.offset().top;
	divider = $(".vertical-divider");
	dX = divider.offset().left;
	cX = canvas.offset().left;
	cY = canvas.offset().top;
	tX = (2*dX-cX-spX)*0.83;
	tY = (spY-cY)*2.5;

	if(parseInt($("html").css("width"))<=500){
		mobile = true;
	}

	//alert($("html").css("width"));
	showTreaty();
}

/*
var platCheck = function(){
        sUserAgent = navigator.userAgent.toLowerCase();
        bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        bIsMidp = sUserAgent.match(/midp/i) == "midp";
        bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        bIsAndroid = sUserAgent.match(/android/i) == "android";
        bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            mobile = true;
        }
}
*/

var canvasPos = function(){
	pic = $(".pic:not(:hidden)");
	//alert(pic.offset().top);
	canvas.css("left",pic.offset().left-20);
	canvas.css("top",pic.offset().top-20);
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
	select = $(".groupNum");
	option = select.children("option");
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
	context.fillText(type,tX,tY);
	context.stroke();
	if(radius>=15) lighter = true;
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
	$("#emergency").show().prev(".horizontal-divider").show();
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
	$("#emergency").hide().prev(".horizontal-divider").hide();
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
	if(!checkNumber()) return false;
	if(!checkRe()) return false;
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


var checkRe = function(){
	inputNumber = $(".number:not(:hidden)");
	numberOfMem = new Array();
	for(i=0;i<inputNumber.length;i++)
		numberOfMem.push(inputNumber.eq(i).val());
	if(window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	}
	else{
		xmlhttp = new ActiveXobject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function(){
		//alert(xmlhttp.readyState);
		if(xmlhttp.readyState==1){
			$(".progress").html("<h3 style=\"color:#fff;text-align:center;margin-top:30%;color:rgb(100,255,186);margin-left:0px;font-weight:100\"></h3><div style=\"width:80%;margin-left:10%;height:1px;background-color:#333\"><div style=\"width:1px;height:1px;background-color:rgb(100,255,186)\"></div></div>");
			//alert("qqqq");
			showProgesss();
		}
		changeProgress(xmlhttp.readyState);
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			if(xmlhttp.responseText!=""){
				alert("学号 "+xmlhttp.responseText+" 已经报名，请勿重复报名！");
				hideProgress();
				for(i=0;i<numberOfMem.length;i++)
					if(numberOfMem[i]==xmlhttp.responseText)
						break;
					//alert(i);
				inputNumber.eq(i).addClass("error").focus();
				return false;
			}
			else{
				if(!checkName()){
					hideProgress();
					return false;
				}
				if(!checkPhoneNumber()){
					hideProgress();
					return false;
				}
				if(!checkEmail()){
					hideProgress();
					return false;
				}
				if(!checkTreaty()){
					hideProgress();
					return false;
				}
				linkToDB();
				return true;
			}
		}
	}
	xmlhttp.open("GET","checkRe.php?numberOfMem="+numberOfMem,true);
	xmlhttp.send();
	//return true;
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


var checkTreaty = function(){
	if($("#agreeTreaty").prop("checked")) return true;
	else{
		alert("你必须先同意活动相关条约方可报名！");
		return false;
	}
}



var linkToDB = function(){
	message = "link.php?type=" + type;
	if(type=="个人"){
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
		if(inputGrade.eq(0).prev(".college").val()=="研究生")
			message = message + "&grade=" + "";
		else
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
			inputEmail = $(".e-mail:not(:hidden)");
			message = message + "&email" + index + "=" + inputEmail.eq(i).val();
		}
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
		changeProgress(4+xmlhttp.readyState);
		if(xmlhttp.readyState==4 && xmlhttp.status==200){
			hideProgress();
			$(".frame").html("<div class=\"fetch\"><h1><p>Congratulations!<p></h1><h3><p>你的报名已提交</p></h3></div>");
			canvas.hide();
		}
	}
	xmlhttp.open("GET",message,true);
	xmlhttp.send();
}


var setTreaty = function(){
	$("#showTreaty").click(function(){
		showTreaty();
	})

	$(".treaty a").click(function(){
		$(".treaty").hide();
		$("html").css("overflow-y","auto");
		scrollTo(0,htmlTop);
	})

	$(".treaty .btn-success").click(function(){
		$("#agreeTreaty").prop("checked",true);
		$(".treaty").hide();
		$("html").css("overflow-y","auto");
		scrollTo(0,htmlTop);
	})

	$(".treaty .btn-danger").click(function(){
		$("#agreeTreaty").prop("checked",false);
		$(".treaty").hide();
		$("html").css("overflow-y","auto");
		scrollTo(0,htmlTop);
	})



}


var showTreaty = function(){
	//$(".treaty").css("height",window.innerHeight);
	htmlTop = $(document).scrollTop();
	if(!mobile){
		$(".treaty").css("top",htmlTop);
	}
	else{
		$(".treaty").css("height",$("html").css("height"));
		$(".treaty").css("top",0);
		scrollTo(0,0);
	}
	$("html").css("overflow-y","hidden");
	$(".treaty").show();
}

var showProgesss = function(){
	//$(".treaty").css("height",window.innerHeight);
	htmlTop = $(document).scrollTop();
	if(!mobile){
		$(".progress").css("top",htmlTop);
	}
	else{
		$(".progress").css("height",$("html").css("height"));
		$(".progress").css("top",0);
		scrollTo(0,0);
	}
	$("html").css("overflow-y","hidden");
	$(".progress").show();
}


var hideProgress = function(){
		$(".progress").hide();
		$("html").css("overflow-y","auto");
		scrollTo(0,htmlTop);
}

var changeProgress = function(i){
	digit = 100*(i/8);
	$(".progress div div").css("width",digit+"%");
	$(".progress h3").html(digit+"%");
}