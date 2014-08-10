<?php

$type = $_GET['type'];
$name = $_GET['name'];
$sex = $_GET["sex"];
$number = $_GET["number"];
$college = $_GET["college"];
$grade = $_GET["grade"];
$phoneLong = $_GET["phoneLong"];
$phoneShort = $_GET["phoneShort"];
$address = $_GET["address"];
$email = $_GET["email"];
$ename = $_GET["ename"];
$ephoneLong = $_GET["ephoneLong"];
$ephoneShort = $_GET["ephoneShort"];

$mysqli = new mysqli('localhost','root',"");

if($mysqli){
	$mysqli->query("set names 'utf8'");
	if($type=="individual"){
		$query = "INSERT INTO `flourescent`.`individual` (`type`, `name`, `sex`, `number`, `college`, `grade`, `phoneLong`, `phoneShort`, `address`, `email`, `ename`, `ephoneLong`, `ephoneShort`) VALUES ('".$type."', '".$name."', '".$sex."', '".$number."', '".$college."', '".$grade."', '".$phoneLong."', '".$phoneShort."', '".$address."', '".$email."', '".$ename."', '".$ephoneLong."', '".$ephoneShort."')";
	}

	else{
		$groupNum = $_GET["groupNum"];
		$query = "INSERT INTO `flourescent`.`team` (`type`,`groupNum`, `name`, `sex`, `number`, `college`, `grade`, `phoneLong`, `phoneShort`, `address`, `email`, `ename`, `ephoneLong`, `ephoneShort`";
		for($i = 1;$i<$groupNum;$i++){
			$query = $query.",`name".$i."`,`sex".$i."`,`number".$i."`,`college".$i."`,`grade".$i."`,`phoneLong".$i."`,`phoneShort".$i."`,`address".$i."`,`email".$i."`";
		}
		$query = $query.") VALUES ('".$type."', '".$groupNum."', '".$name."', '".$sex."', '".$number."', '".$college."', '".$grade."', '".$phoneLong."', '".$phoneShort."', '".$address."', '".$email."', '".$ename."', '".$ephoneLong."', '".$ephoneShort."'";
		for($i = 1;$i<$groupNum;$i++){
			$query = $query.",'".$_GET["name".$i]."','".$_GET["sex".$i]."','".$_GET["number".$i]."','".$_GET["college".$i]."','".$_GET["grade".$i]."','".$_GET["phoneLong".$i]."','".$_GET["phoneShort"]."','".$_GET["address".$i]."','".$_GET["email".$i]."'";
		}
		$query = $query.")";
	}

	$mysqli->query($query);


}

$mysqli->close();






























?>