<?php 

$mysqli = new mysqli('localhost','root',"");
$totalCount = 0;
$totalNum = 0;

$html = "
<!DOCTYPE>
<html>
<head>
<title>search form</title>
<meta http-equiv=\"content-type\" content=\"text/html;charset=utf-8\"/>
<style>
  table{border-collapse:collapse;border:none;}
  td,th{border:solid#000 1px;}
</style>
</head>
<body style=\"width:100%;\">";


if($mysqli){
	$mysqli->query("set names 'utf8'");
  $cName = array("农学院","资源环境学院","生命科学学院","经济管理学院","工程学院","动物科学学院","兽医学院","园艺学院","食品学院","林学院","人文与法学学院","理学院","信息学院、软件学院","艺术学院","外国语学院","水利与土木工程学院","公共管理学院","继续教育学院","研究生","校友");

  for($i = 0;$i<count($cName);$i++){
    generateCount("挑战组",$cName[$i]);
    generateCount("体验组",$cName[$i]);
    generatePrint("挑战组",$cName[$i]);
    generatePrint("体验组",$cName[$i]);
  }

  $mysqli->close();
}

echo "<script>alert(\"导出成功！共".$totalCount."组\");</script>";
echo "共".$totalNum."人";
//echo phpinfo();

function generateCount($type,$college){
  global $mysqli;
  global $html;
  global $totalCount;
  global $totalNum;
  $tempCount = 0;
  if($type == "挑战组")
    $stype = "challenge";
  else
    $stype = "volunteer";
  $result = $mysqli->query("SELECT * FROM flourescent.".$stype." where `college` = '".$college."'");
  $teamCount = "<table width=100%  border=1 style=\"border-collapse:collapse;border:none;text-align:center\">
  <thead>
    <tr><td colspan=\"4\"><b>逃跑计划<br>（".$college."-".$type."）</b></td></tr>
  </thead><tbody>";
  $resultCount = mysqli_num_rows($result);
  $totalCount += $resultCount;
  for($i = 0;$i<$resultCount;$i++){
    $record = $result->fetch_array();
    $tempCount += $record['groupNum'];
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
  $path = $college.' '.$type.'(统计).doc';
  $path = iconv("UTF-8","GB2312",$path);
  $of = fopen($path,'w');
  if($of){
  fwrite($of,$html.$teamCount);
  }
  fclose($of);
  $totalNum += $tempCount;
  echo $college."(".$type."):".$tempCount."人<br>";
}


function generatePrint($type,$college){
  global $mysqli;
  global $html;
  if($type == "挑战组")
    $stype = "challenge";
  else
    $stype = "volunteer";
  $result = $mysqli->query("SELECT * FROM flourescent.".$stype." where `college` = '".$college."'");
  $teamPrint = "<table width=100%  border=1 style=\"border-collapse:collapse;border:none;text-align:center\">
  <thead>
    <tr><td colspan=\"6\"><b>逃跑计划<br>（".$college."-".$type."）</b></td></tr>
     <tr><td>编号</td><td>姓名</td><td>学号</td><td>长号</td><td>短号</td><td>签到</td></tr>
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
      $teamPrint = $teamPrint."<td>".$record["phoneLong".$index]."</td><td>".$record["phoneShort".$index]."</td><td>&nbsp;</td>";
    }
    $teamPrint = $teamPrint."<tr style=\"background-color:#aaa\"><td colspan=\"6\"></br></br></td></tr>";
  }
  $teamPrint  = $teamPrint."</tbody></table></body></html>";
  $path = $college.' '.$type.'(签到).doc';
  $path = iconv("UTF-8","GBK",$path);
  $of = fopen($path,'w');
  if($of){
  fwrite($of,$html.$teamPrint);
  }
  fclose($of);

}




?>