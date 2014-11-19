var check = function(){
	temp = $("input[name='number']");
	reg=/^[0-9]*$/;
	if(temp.val()=="" || !reg.test(temp.val())){
		temp.parent().next(".error-tips").html("你输入的学号不正确");
		temp.addClass("error").focus();
		return false;
	}
	$(".error").removeClass("error").parent().next(".error-tips").html("");
	return true;
}