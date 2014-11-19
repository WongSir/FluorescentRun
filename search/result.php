<?php
header("Content-type:text/html;charset=utf-8");
?>
<html>
<head>
<title>逃跑计划-报名</title>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
<meta name="author" content="dennisleung"/>
<script src="jquery/jquery-1.11.1.min.js"></script>
<link rel="stylesheet" type="text/css" href="style.css">
<script src="script.js"></script>
</head>
<body>

<img src="pic/icon.png" class="logo"><h1>逃跑计划</h1>

<hr>

<div>
<?php

$leaderNumber = $_GET['number'];
$mysqli = new mysqli('localhost','root',"");
if($mysqli){
  echo generateCount();
  $mysqli->close();
}
?>
</div>

<p class="tips">更多活动信息请点击：<a href="http://mp.weixin.qq.com/s?__biz=MzA4MDcyNzIyMg==&mid=201177605&idx=1&sn=6e7e9c4846c66f23a0d946fa8b9110b8#rd" target="_blank">2014华农大逃跑计划</a>&nbsp;&nbsp;活动咨询QQ群：26124596</p>

</body>


<?php


function generateCount(){
  global $mysqli;
  global $leaderNumber;
  $teamCount = "";
  $mysqli->query("set names 'utf8'");
  $result = $mysqli->query("SELECT * FROM ((select * from flourescent.challenge) union (select * from flourescent.volunteer)) as total where `number` = '".$leaderNumber."'");
  if($result==false||mysqli_num_rows($result)==0)
    $teamCount = "<h3>抱歉，我们找不到相关的报名信息<h3>";

  else{
    $record = mysqli_fetch_array($result);
    $groupNum = $record["groupNum"];
    $teamCount = "<table>
    <thead>
      <tr style=\"font-size:20px;font-weight:bold\"><td>报名类型：</td><td>".$record["type"]."</td><td>团队人数：</td><td>".$groupNum."</td></tr>
    </thead><tbody>";
    for($i = 0;$i<$groupNum;$i++){
        switch($i){
          case 0:$teamType = "队长";$index = "";break;
          case 1:$teamType = "队员一";$index = "1";break;
          case 2:$teamType = "队员二";$index = "2";break;
          case 3:$teamType = "队员三";$index = "3";break;
        }
        $teamCount = $teamCount."<tr><td colspan=\"4\" style=\"background-color:rgba(0,0,0,0.3);text-align:center;font-size:20px;font-weight:bold\">".$teamType."</td></tr>";
        $teamCount = $teamCount."<tr><td>姓名：</td><td>".$record["name".$index]."</td><td>性别：</td><td>".$record["sex".$index]."</td></tr>";
        $teamCount = $teamCount."<tr><td>学号：</td><td>".$record["number".$index]."</td><td>宿舍地址：</td><td>".$record["address".$index]."</td></tr>";
        $teamCount = $teamCount."<tr><td>学院：</td><td>".$record["college".$index]."</td><td>年级：</td><td>".$record["grade".$index]."</td></tr>";
        $teamCount = $teamCount."<tr><td>长号：</td><td>".$record["phoneLong".$index]."</td><td>短号：</td><td>".$record["phoneShort".$index]."</td></tr>";
        $teamCount = $teamCount."<tr><td>常用邮箱：</td><td colspan=\"3\">".$record["email".$index]."</td></tr>";
      }
    $teamCount  = $teamCount."</tbody></table>";
  }
  return $teamCount;
  
}

?>