<?php


$number = $_GET["number"];

$mysqli = new mysqli('localhost','root',"");

$fetch = "";

if($mysqli){
	$mysqli->query("set names 'utf8'");
		$result = $mysqli->query("SELECT * FROM flourescent.challenge WHERE `number`='".$number."'||`number1`='".$number."'||`number2`='".$number."'||`number3`='".$number."'");
		if(mysqli_num_rows($result)!=0)
			$fetch = "false";
		$result = $mysqli->query("SELECT * FROM flourescent.volunteer WHERE `number`='".$number."'||`number1`='".$number."'||`number2`='".$number."'||`number3`='".$number."'");
		if(mysqli_num_rows($result)!=0)
			$fetch = "false";
	echo $fetch;
}

$mysqli->close();

?>