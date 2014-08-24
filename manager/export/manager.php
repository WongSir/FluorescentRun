<?php

$position = array("cehuaLeader","cehuaSLeader","cehuaSecretary","financeMem","ideaMem","meitiLeader","meitiSLeader","meitiMem","xcLeader","netLeader","vpLeader","netMem","vpMem","wailianLeader","wailianSLeader","wailianMem","shijianLeader","zdLeader","zdSLeader","qxLeader","qtLeader","ylLeader","zdMem","qxMem","qtMem","ylMem","jdMem");
$member = "new Array(";
$mysqli = new mysqli('localhost','root',"");

if($mysqli){
	$mysqli->query("set names utf8");
	$result = $mysqli->query("SELECT * FROM flourescent.manager");
	$currentNum = mysqli_num_rows($result);
	for($i=0;$i<27;$i++){
		$result = $mysqli->query("SELECT * FROM flourescent.manager WHERE `".$position[$i]."`='1'");
		$temp = "\"";
		for($j=0;$j<mysqli_num_rows($result);$j++){
			$record = $result->fetch_array();
			if($j!=0)
				$temp = $temp.",";
			$temp = $temp.$record['name']."(".$record['college'].")";
		}
		$temp = $temp."\"";
		if($i!=0)
			$member = $member.",";
		$member = $member.$temp;
	}
	$member = $member.")";
}
$mysqli->close();


echo"
<!DOCTYPE>
<html>
<head>
<title>荧光夜跑-组委会产生结果</title>
<meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\"/>
<meta name=\"author\" content=\"dennisleung\"/>
<meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0\"/>
<link rel=\"stylesheet\" href=\"../../bootstrap/css/bootstrap.min.css\">
<link rel=\"stylesheet\" href=\"style.css\">
<script src=\"../../jquery/jquery-1.11.1.min.js\"></script>
<script src=\"script.js\"></script>
<script>var member = ".$member.";</script>
</head>
<body>
<div class=\"container col-md-10\">
<div class=\"text\">组委会最少组建人数为:&nbsp;&nbsp;&nbsp;<b>145</b></div>
<div class=\"text\">当前报名总人数为:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>".$currentNum."</b></div><br>
<center><button class=\"btn btn-primary btn-lg\" onclick=\"generate();\">点击产生随机分组</button></center><br><hr>
<div id=\"showResult\"></div>
<hr><center><button class=\"btn btn-default\" onclick=\"exportTable()\">导出结果</button></center>
</div>

<form action=\"export.php\" method=\"post\" style=\"display:none\" target=\"exportFrame\">
<textarea name=\"table\"></textarea>
</form>

<iframe style=\"display:none\" name=\"exportFrame\">
</iframe>


</body>
</html>";


?>