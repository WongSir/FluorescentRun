<?php 

$mysqli = new mysqli('localhost','root',"");
$html = "
<!DOCTYPE>
<html>
<head>
<title>search form</title>
<meta http-equiv=\"content-type\" content=\"text/html;charset=utf-8\"/>
<style>
  table{border-collapse:collapse;border:none;}
  td,th{border:solid#000 1px;}</style>
</head>
<body>";


if($mysqli){
	$mysqli->query("set names 'utf8'");


  //生成个人统计版
	$result = $mysqli->query("SELECT * FROM flourescent.individual");
  $indiCount = "<table width=100%  border=1 style=\"border-collapse:collapse;border:none;text-align:center\">
  <thead>
    <tr><td colspan=\"4\"><b>荧光夜跑<br>（个人报名）</b></td></tr>
  </thead><tbody>";
	for($i = 0;$i<mysqli_num_rows($result);$i++){
		$record = $result->fetch_array();
		$indiCount = $indiCount."<tr><td>姓名：</td><td>".$record["name"]."</td><td>性别：</td><td>".$record["sex"]."</td></tr>";
    $indiCount = $indiCount."<tr><td>学号：</td><td>".$record["number"]."</td><td>宿舍地址：</td><td>".$record["address"]."</td></tr>";
    $indiCount = $indiCount."<tr><td>学院：</td><td>".$record["college"]."</td><td>年级：</td><td>".$record["grade"]."</td></tr>";
    $indiCount = $indiCount."<tr><td>长号：</td><td>".$record["phoneLong"]."</td><td>短号：</td><td>".$record["phoneShort"]."</td></tr>";
    $indiCount = $indiCount."<tr><td>常用邮箱：</td><td colspan=\"3\">".$record["email"]."</td></tr>";
    $indiCount = $indiCount."<tr><td colspan=\"2\">紧急联系人：<td>姓名：</td><td>".$record["ename"]."</td></tr>";
    $indiCount = $indiCount."<tr><td>长号：</td><td>".$record["ephoneLong"]."</td><td>短号：</td><td>".$record["ephoneShort"]."</td></tr>";
    $indiCount = $indiCount."<tr style=\"background-color:#aaa\"><td colspan=\"4\"></td></tr>";
	}
	$indiCount  = $indiCount."</tbody></table></body></html>";
  
  $of = fopen('individual(count).doc','w');
	if($of){
  fwrite($of,$html.$indiCount);
  }
  fclose($of);
  

  //生成团队统计版
  $result = $mysqli->query("SELECT * FROM flourescent.team");
  $teamCount = "<table width=100%  border=1 style=\"border-collapse:collapse;border:none;text-align:center\">
  <thead>
    <tr><td colspan=\"4\"><b>荧光夜跑<br>（团队报名）</b></td></tr>
  </thead><tbody>";
  for($i = 0;$i<mysqli_num_rows($result);$i++){
    $record = $result->fetch_array();
    $teamCount = $teamCount."<tr><td>报名类型：</td><td>团队</td><td>团队人数：</td><td>".$record["groupNum"]."</td></tr>";
    for($j=0;$j<$record["groupNum"];$j++){
      switch($j){
        case 0:$teamType = "队长";$index = "";break;
        case 1:$teamType = "队员一";$index = "1";break;
        case 2:$teamType = "队员二";$index = "2";break;
        case 3:$teamType = "队员三";$index = "3";break;
      }
      $teamCount = $teamCount."<tr><td colspan=\"4\" style=\"background-color:#eee\">".$teamType."</td></tr>";
      $teamCount = $teamCount."<tr><td>姓名：</td><td>".$record["name".$index]."</td><td>性别：</td><td>".$record["sex".$index]."</td></tr>";
      $teamCount = $teamCount."<tr><td>学号：</td><td>".$record["number".$index]."</td><td>宿舍地址：</td><td>".$record["address".$index]."</td></tr>";
      $teamCount = $teamCount."<tr><td>学院：</td><td>".$record["college".$index]."</td><td>年级：</td><td>".$record["grade".$index]."</td></tr>";
      $teamCount = $teamCount."<tr><td>长号：</td><td>".$record["phoneLong".$index]."</td><td>短号：</td><td>".$record["phoneShort".$index]."</td></tr>";
      $teamCount = $teamCount."<tr><td>常用邮箱：</td><td colspan=\"3\">".$record["email".$index]."</td></tr>";
    }
    $teamCount = $teamCount."<tr style=\"background-color:#777\"><td colspan=\"4\"></br></br></td></tr>";
  }
  $teamCount  = $teamCount."</tbody></table></body></html>";
  
  $of = fopen('team(count).doc','w');
  if($of){
  fwrite($of,$html.$teamCount);
  }
  fclose($of);


//生成个人打印版
  $result = $mysqli->query("SELECT * FROM flourescent.individual");
  $indiPrint = "<table width=100%  border=1 style=\"border-collapse:collapse;border:none;text-align:center\">
  <thead>
    <tr><td colspan=\"5\"><b>荧光夜跑<br>（个人报名）</b></td></tr>
    <tr><td>姓名</td><td>学号</td><td>长号</td><td>短号</td><td>紧急联系人联系方式</td></tr>
  </thead><tbody>";
  for($i = 0;$i<mysqli_num_rows($result);$i++){
    $record = $result->fetch_array();
    $indiPrint = $indiPrint."<tr><td>".$record["name"]."</td>";
    $indiPrint = $indiPrint."<td>".$record["number"]."</td>";
    $indiPrint = $indiPrint."<td>".$record["phoneLong"]."</td><td>".$record["phoneShort"]."</td>";
    if($record["ephoneLong"]=="" || $record["ephoneShort"]=="") $divider = "";
    else $divider = "/";
    $indiPrint = $indiPrint."<td>".$record["ephoneLong"].$divider.$record["ephoneShort"]."</td></tr>";
  }
  $indiPrint  = $indiPrint."</tbody></table></body></html>";
  
  $of = fopen('individual(print).doc','w');
  if($of){
  fwrite($of,$html.$indiPrint);
  }
  fclose($of);


//生成团队打印版
  $result = $mysqli->query("SELECT * FROM flourescent.team");
  $teamPrint = "<table width=100%  border=1 style=\"border-collapse:collapse;border:none;text-align:center\">
  <thead>
    <tr><td colspan=\"5\"><b>荧光夜跑<br>（团队报名）</b></td></tr>
     <tr><td>编号</td><td>姓名</td><td>学号</td><td>长号</td><td>短号</td></tr>
  </thead><tbody>";
  for($i = 0;$i<mysqli_num_rows($result);$i++){
    $record = $result->fetch_array();
    for($j=0;$j<$record["groupNum"];$j++){
      switch($j){
        case 0:$index = "";break;
        default:$index = strval($j);break;
      }
      if($j==0)
        $teamPrint = $teamPrint."<tr><td>".strval($i+1)."</td>";
      else
        $teamPrint = $teamPrint."<tr><td>&nbsp;</td>";
      $teamPrint = $teamPrint."<td>".$record["name".$index]."</td>";
      $teamPrint = $teamPrint."<td>".$record["number".$index]."</td>";
      $teamPrint = $teamPrint."<td>".$record["phoneLong".$index]."</td><td>".$record["phoneShort".$index]."</td>";
    }
  }
  $teamPrint  = $teamPrint."</tbody></table></body></html>";
  
  $of = fopen('team(print).doc','w');
  if($of){
  fwrite($of,$html.$teamPrint);
  }
  fclose($of);






}

  $mysqli->close();


  //echo $html.$indiCount;



?>