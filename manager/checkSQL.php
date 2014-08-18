<?php

$number = $_GET["number"];

$mysqli = new mysqli('localhost','root',"");

if($mysqli){
	$mysqli->query("set names 'utf8'");
	$result = $mysqli->query("SELECT * FROM flourescent.manager WHERE `number`='".$number."'");
	if(mysqli_num_rows($result)==0){
		echo "false";
	}
	else
		echo "true";
}
$mysqli->close();


?>