var college;
var name;
var number;


window.onload = function(){
	setSelect();
	$("button").click(function(){
		if(!checkName()) return false;
		if(!checkNumber()) return false;
		if(!checkSelect()) return false;
		college = $("#college").val();
		if(!confirm("确定信息填写正确，提交申请表？")) return;
		else{
		var xmlhttp;
		if(window.XMLHttpRequest){
			xmlhttp = new XMLHttpRequest();
		}
		else{
			xmlhttp = new ActiveXobject("Microsoft.XMLHTTP");
		}
		xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState==1){
		$(".progress").html("<h3 style=\"color:#fff;text-align:center;margin-top:30%;color:rgb(100,255,186);margin-left:0px;font-weight:100\"></h3><div style=\"width:80%;margin-left:10%;height:1px;background-color:#333\"><div style=\"width:1px;height:1px;background-color:rgb(100,255,186)\"></div></div>");
			showProgesss();
		}
		changeProgress(xmlhttp.readyState);
			if(xmlhttp.readyState==4 && xmlhttp.status==200){
				if(xmlhttp.responseText=="true"){
					alert("你已经提交过申请表，请勿重复申请！");
					hideProgress();
					return false;
				}
				else{
					xmlhttp.onreadystatechange = function(){
						changeProgress(4+xmlhttp.readyState);
						if(xmlhttp.readyState==4 && xmlhttp.status==200){
							hideProgress();
							$(".frame").html("<div class=\"fetch\"><h1><p>Congratulations!<p></h1><h3><br><p>你的报名已提交</p></h3></div>");
						}
					}
					position = new Array();
					temp = $("input[type=checkbox]:checked");
					for(i = 0;i<temp.length;i++)
						position.push(temp.eq(i).val());
					xmlhttp.open("GET","add2SQL.php?college=" + college + "&name=" + name + "&number=" + number + "&position=" + position,true);
					xmlhttp.send();
				}
			}
		}
		xmlhttp.open("GET","checkSQL.php?number=" + number,true);
		xmlhttp.send();
		}

	})
}


var checkName =  function(){
	tname = $("#name");
	if(tname.val()==""){
		alert("请填写你的姓名！");
		tname.focus();
		return false;
	}
	name = tname.val();
	return true;
}

var checkNumber = function(){
	reg=/^[0-9]*$/;
	tnumber = $("#number");
	if(tnumber.val()=="" || !reg.test(tnumber.val())){
		alert("你输入的学号不正确！");
		tnumber.focus();
		return false;
	}
	number = tnumber.val();
	return true;
}

var checkSelect = function(){
	temp = $("input[type=checkbox]:checked");
	if(temp.length==0){
		alert("你必须至少选择一个职位！");
		return false;
	}
	if(temp.length>3){
		alert("你最多可以选择3个职位！");
		return false;
	}
	return true;
}


var setSelect = function(){
	option = $("#college option");
	select = $("#college");
	opWidth = parseInt(option.css("font-size"))*9.5;
	seWidth = parseInt(select.css("width"));
	//alert((seWidth-opWidth)/2);
	select.css("padding-left",(seWidth-opWidth)/2);
}

var showProgesss = function(){
	//$(".treaty").css("height",window.innerHeight);
	htmlTop = $(document).scrollTop();
	//if(!mobile){
		$(".progress").css("top",htmlTop);
	//}
	//else{
	//	$(".progress").css("height",$("html").css("height"));
	//	$(".progress").css("top",0);
	//	scrollTo(0,0);
	//}
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