<?php


$number = explode(",",$_GET["numberOfMem"]);

$mysqli = new mysqli('localhost','root',"");

$fetch = "";

if($mysqli){
	$mysqli->query("set names 'utf8'");
	for($i=0;$i<count($number);$i++){
		$result = $mysqli->query("SELECT * FROM flourescent.individual WHERE `number`='".$number[$i]."'");
		if(mysqli_num_rows($result)!=0)
			break;
		$result = $mysqli->query("SELECT * FROM flourescent.team WHERE `number`='".$number[$i]."'||`number1`='".$number[$i]."'||`number2`='".$number[$i]."'||`number3`='".$number[$i]."'");
		if(mysqli_num_rows($result)!=0)
			break;
	}
	if($i<count($number))
		$fetch =$number[$i];
	echo $fetch;
}

?>