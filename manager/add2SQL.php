<?php

/*
策划组组长  cehuaLeader
策划组副组长  cehuaSLeader
策划组秘书长  cehuaSecretary
财务处队员  financeMem
智囊团团员	ideaMem
媒体摄影组组长  meitiLeader
媒体摄影组副组长  meitiSLeader
媒体摄影组组员 meitiMem
宣传组组长  xcLeader
网络宣传队队长  netLeader
海报视频制作队队长  vpLeader
网络宣传队队员  netMem
海报视频制作队队员  vpMem
外联组组长  wailianLeader
外联组副组长  wailianSLeader
外联组组员  wailianMem
实践组组长  shijianLeader
站点服务队队长  zdLeader
站点服务队副队长  zdSLeader
骑行巡逻队队长  qxLeader
前台紧急服务中心队长  qtLeader
医疗救护队队长  ylLeader
站点服务队队员  zdMem
骑行巡逻队队员  qxMem
前台紧急服务中心队员  qtMem
医疗救护队队员  ylMem
机动队队员 jdMem
*/


$college = $_GET["college"];
$name = $_GET["name"];
$number = $_GET["number"];
$position = explode(",",$_GET["position"]);

$mysqli = new mysqli('localhost','root',"");

if($mysqli){
	$mysqli->query("set names 'utf8'");
	$query = "INSERT INTO `flourescent`.`manager`(`college`,`name`,`number`";
	for($i = 0;$i<count($position);$i++){
		$temp = "";
		switch($position[$i]){
			case "策划组组长":$temp="cehuaLeader";break;
			case "策划组副组长":$temp="cehuaSLeader";break;
			case "策划组秘书长":$temp="cehuaSecretary";break;
			case "财务处队员":$temp="financeMem";break;
			case "智囊团团员":$temp="ideaMem";break;
			case "媒体摄影组组长":$temp="meitiLeader";break;
			case "媒体摄影组副组长":$temp="meitiSLeader";break;
			case "媒体摄影组组员":$temp="meitiMem";break;
			case "宣传组组长":$temp="xcLeader";break;
			case "网络宣传队队长":$temp="netLeader";break;
			case "海报视频制作队队长":$temp="vpLeader";break;
			case "网络宣传队队员":$temp="netMem";break;
			case "海报视频制作队队员":$temp="vpMem";break;
			case "外联组组长":$temp="wailianLeader";break;
			case "外联组副组长":$temp="wailianSLeader";break;
			case "外联组组员":$temp="wailianMem";break;
			case "实践组组长":$temp="shijianLeader";break;
			case "站点服务队队长":$temp="zdLeader";break;
			case "站点服务队副队长":$temp="zdSLeader";break;
			case "骑行巡逻队队长":$temp="qxLeader";break;
			case "前台紧急服务中心队长":$temp="qtLeader";break;
			case "医疗救护队队长":$temp="ylLeader";break;
			case "站点服务队队员":$temp="zdMem";break;
			case "骑行巡逻队队员":$temp="qxMem";break;
			case "前台紧急服务中心队员":$temp="qtMem";break;
			case "医疗救护队队员":$temp="ylMem";break;
			case "机动队队员":$temp="jdMem";break;
			default:break;
		}
		$query = $query.",`".$temp."`";
	}
	$query = $query.") VALUES ('".$college."','".$name."','".$number."'";
	for($i = 0;$i<count($position);$i++){
		$query = $query.",'1'";
	}
	$query = $query.")";
	$mysqli->query($query);
	//echo $query;
}

$mysqli->close();






?>