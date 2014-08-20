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
			if(xmlhttp.readyState==4 && xmlhttp.status==200){
				if(xmlhttp.responseText=="true"){
					alert("你已经提交过申请表，请勿重复申请！");
					return false;
				}
				else{
					xmlhttp.onreadystatechange = function(){
						if(xmlhttp.readyState==4 && xmlhttp.status==200){
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