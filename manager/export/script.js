/*最终结果
var cehuaLeader = "";
var cehuaSLeader = "";
var cehuaSecretary = "";
var financeMem = "";
var ideaMem = "";
var meitiLeader = "";
var meitiSLeader = "";
var meitiMem = "";
var xcLeader = "";
var netLeader = "";
var vpLeader = "";
var netMem = "";
var vpMem = "";
var wailianLeader = "";
var wailianSLeader = "";
var wailianMem = "";
var shijianLeader = "";
var zdLeader = "";
var zdSLeader = "";
var qxLeader = "";
var qtLeader = "";
var ylLeader = "";
var zdMem = "";
var qxMem = "";
var qtMem = "";
var ylMem = "";
var jdMem = "";
*/
//备选名单
var candidates;

var result;

//淘汰备选队列
var other;

//给组人数:不包括jdMem
//var num = new Array(1,1,1,8,4,1,1,6,1,1,1,8,4,1,1,13,1,1,1,1,1,1,50,10,6,20);
var num = new Array(1,1,1,8,4,1,1,6,1,1,1,8,4,1,1,13,1,1,1,1,1,1,50,10,6,20);//37


var html;

$(document).ready(function(){
	$("hr").eq(0).hide().nextAll().hide();
})



var generate = function(){
	if(!confirm("确定随机产生组委会吗?"))
		return;
	candidates = new Array();
    result = new Array();
	other = new Array();
	for(i=0;i<27;i++)
		result.push(new Array());
	for(i=0;i<27;i++)
		candidates.push(split2Array(member[i],","));
	for(i=0;i<26;i++){
		if(candidates[i].length<=num[i]){//no leftover
			for(j=0;j<candidates[i].length;j++)
				result[i].push(candidates[i][j]);
			candidates[i] = new Array();
		}
		else{
			for(j=0;j<num[i];j++){
				index = parseInt(Math.random()*candidates[i].length);
				result[i].push(candidates[i][index]);
				candidates[i].splice(index,1);
			}
		}
		for(j=0;j<result[i].length;j++){
			for(k=0;k<27;k++){//delete result from candidates
				for(h=0;h<candidates[k].length;h++)
					if(result[i][j]==candidates[k][h])
						break;
				if(h<candidates[k].length)
					candidates[k].splice(h,1);
			}
		}
	}
	for(i=0;i<27;i++){
		for(j=0;j<candidates[i].length;j++){//add leftover to the other Array
			for(k=0;k<other.length;k++)
				if(candidates[i][j]==other[k])
					break;
			if(k>=other.length)
				other.push(candidates[i][j]);
		}
	}
	for(i=0;i<26;i++){
		if(result[i].length<num[i]){
			temp = num[i]-result[i].length;
			for(j=0;j<temp;j++){
				index = parseInt(Math.random()*other.length);
				result[i].push(other[index]);
				other.splice(index,1);
			}
		}
	}
	if(other.length>0)
		for(i=0;i<other.length;i++)
			result[26].push(other[i]);
	showTable();
}



var split2Array = function(str,seperater){
	if(str.length==0)//str=""
		return new Array();
	temp = str.split(seperater);
	if(str.length!=0&&temp[0]=="")//str="abc"
		return new Array(str);
	else//str="abc,def"
		return temp;
}


var showTable = function(){
html ="<table border=1><tr><td colspan=10><b>荧光夜跑-组委会</b></td></tr><tbody><tr><td rowspan=5>策划组</td><td colspan=2>组长</td><td colspan=7>"+trimArray(result[0])+"</td></tr><tr><td colspan=2>副组长</td><td colspan=7>"+trimArray(result[1])+"</td></tr><tr><td colspan=2>秘书长</td><td colspan=7>"+trimArray(result[2])+"</td></tr><tr><td colspan=2>财务处队员</td><td colspan=7>"+trimArray(result[3])+"</td></tr><tr><td colspan=2>智囊团队员</td><td colspan=7>"+trimArray(result[4])+"</td></tr><tr><td rowspan=3>媒体摄影组</td><td colspan=2>组长</td><td colspan=7>"+trimArray(result[5])+"</td></tr><tr><td colspan=2>副组长</td><td colspan=7>"+trimArray(result[6])+"</td></tr><tr><td colspan=2>组员</td><td colspan=7>"+trimArray(result[7])+"</td></tr><tr><td rowspan=5>宣传组</td><td colspan=2>组长</td><td colspan=7>"+trimArray(result[8])+"</td></tr><tr><td colspan=2>网络宣传队队长</td><td colspan=7>"+trimArray(result[9])+"</td></tr><tr><td colspan=2>海报视频制作队队长</td><td colspan=7>"+trimArray(result[10])+"</td></tr><tr><td colspan=2>网络宣传队队员</td><td colspan=7>"+trimArray(result[11])+"</td></tr><tr><td colspan=2>海报视频制作队队员</td><td colspan=7>"+trimArray(result[12])+"</td></tr><tr><td rowspan=3>外联组</td><td colspan=2>组长</td><td colspan=7>"+trimArray(result[13])+"</td></tr><tr><td colspan=2>副组长</td><td colspan=7>"+trimArray(result[14])+"</td></tr><tr><td colspan=2>组员</td><td colspan=7>"+trimArray(result[15])+"</td></tr><tr><td rowspan=11>实践组</td><td colspan=2>组长</td><td colspan=7>"+trimArray(result[16])+"</td></tr><tr><td colspan=2>站点服务队队长</td><td colspan=7>"+trimArray(result[17])+"</td></tr><tr><td colspan=2>站点服务队副队长</td><td colspan=7>"+trimArray(result[18])+"</td></tr><tr><td colspan=2>骑行巡逻队队长(机动队队长)</td><td colspan=7>"+trimArray(result[19])+"</td></tr><tr><td colspan=2>前台紧急服务中心队长</td><td colspan=7>"+trimArray(result[20])+"</td></tr><tr><td colspan=2>医疗救护队队长</td><td colspan=7>"+trimArray(result[21])+"</td></tr><tr><td colspan=2>站点服务队队员</td><td colspan=7>"+trimArray(result[22])+"</td></tr><tr><td colspan=2>骑行巡逻队队员</td><td colspan=7>"+trimArray(result[23])+"</td></tr><tr><td colspan=2>前台紧急服务中心队员</td><td colspan=7>"+trimArray(result[24])+"</td></tr><tr><td colspan=2>医疗救护队队员</td><td colspan=7>"+trimArray(result[25])+"</td></tr><tr><td colspan=2>机动队队员</td><td colspan=7>"+trimArray(result[26])+"</tr></tbody></table>";
	$("#showResult").html(html).show().nextAll("center").show();
	$("hr").show();
}




var trimArray = function(arr){
	str="";
	for(i=0;i<arr.length;i++){
		if(i!=0)
			str = str + "," + arr[i];
		else
			str = str + arr[i];
		if(i%3==0 && i!=0)
			str = str +"<br>";
	}
	return str;
}


var exportTable = function(){
	$("textarea").html(html).parent().submit();
}