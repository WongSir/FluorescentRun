<?php

$name = array();
$sex = array();
$number = array();
$college = array();
$grade = array();
$phoneLong = array();
$phoneShort = array();
$address = array();
$email = array();
$type = $_GET['type'];
$groupNum = $_GET["groupNum"];

$mysqli = new mysqli('localhost','root',"");


if($mysqli){
	if(checkTime()===false){
		echo "报名已截止，感谢你的关注！";
		return;
	}
	for($i = 0;$i<$groupNum;$i++){
		if($i==0)
			$index = "";
		else
			$index = (string)$i;
		array_push($name,$_GET["name".$index]);
		array_push($sex,$_GET["sex".$index]);
		array_push($number,$_GET["number".$index]);
		array_push($college,$_GET["college".$index]);
		array_push($grade,$_GET["grade".$index]);
		array_push($phoneLong,$_GET["phoneLong".$index]);
		array_push($phoneShort,$_GET["phoneShort".$index]);
		array_push($address,$_GET["address".$index]);
		array_push($email,$_GET["email".$index]);
	}
	if(!checkName()){echo "error";return false;}
	if(!checkNumber()){echo "error";return false;}
	if(!checkLocalNumber()){echo "error";return false;}
	if(!checkPhoneNumber()){echo "error";return false;}
	if(!checkEmail()){echo "error";return false;}
	if(($result=checkRe())!==true){echo $result;return false;}
	save();
	echo "success";
	$mysqli->close();
}


function checkTime(){
	$date1 = strtotime('2014-11-14 19:00:00');
	if($date1-time()<=0)
		return false;
	else
		return true;
}

function checkName(){
	global $groupNum;
	global $name;
	for($i = 0;$i<$groupNum;$i++){
		$memberName = str_replace(' ','',$name[$i]);
		if($memberName=="")
			return false;
	}
	return true;
}

function checkNumber(){
	global $groupNum;
	global $number;
	for($i = 0;$i<$groupNum;$i++){
		if(!preg_match("/^[0-9]*$/", $number[$i]))
			return false;
	}
	return true;
}

function checkLocalNumber(){
	global $groupNum;
	global $number;
	for($i = 0;$i<$groupNum;$i++)
		for($j = $i+1;$j<$groupNum;$j++)
			if($number[$i]==$number[$j]){
				return false;
			}
	return true;
}

function checkPhoneNumber(){
	global $groupNum;
	global $phoneLong;
	global $phoneShort;
	for($i=0;$i<$groupNum;$i++)
		if((!preg_match("/^[0-9]*$/", $phoneLong[$i])) && (!preg_match("/^[0-9]*$/", $phoneShort[$i])))
			break;
	if($i>=$groupNum)
		return true;
	else
		return false;	
}


function checkEmail(){
	global $groupNum;
	global $email;
	for($i = 0;$i<$groupNum;$i++){
		if(!preg_match("/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/", $email[$i]))
			return false;
	}
	return true;
}


function checkRe(){
	global $groupNum;
	global $number;
	global $mysqli;
	for($i = 0;$i<$groupNum;$i++){
		$result = $mysqli->query("SELECT * FROM flourescent.challenge WHERE `number`='".$number[$i]."'||`number1`='".$number[$i]."'||`number2`='".$number[$i]."'||`number3`='".$number[$i]."'");
		if(mysqli_num_rows($result)!=0)
			return $number[$i];
		$result = $mysqli->query("SELECT * FROM flourescent.volunteer WHERE `number`='".$number[$i]."'||`number1`='".$number[$i]."'||`number2`='".$number[$i]."'||`number3`='".$number[$i]."'");
		if(mysqli_num_rows($result)!=0)
			return $number[$i];
	}
	return true;
}



function save(){
	global $groupNum;
	global $mysqli;
	global $name;
	global $sex;
	global $number;
	global $college;
	global $grade;
	global $phoneLong;
	global $phoneShort;
	global $address;
	global $email;
	global $type;
	$mysqli->query("set names 'utf8'");
		if($type=="挑战组")
			$formName = "challenge";
		else
			$formName = "volunteer";
		$query = "INSERT INTO `flourescent`.`".$formName."` (`type`,`groupNum`, `name`, `sex`, `number`, `college`, `grade`, `phoneLong`, `phoneShort`, `address`, `email`";
		for($i = 1;$i<$groupNum;$i++){
			$query = $query.",`name".$i."`,`sex".$i."`,`number".$i."`,`college".$i."`,`grade".$i."`,`phoneLong".$i."`,`phoneShort".$i."`,`address".$i."`,`email".$i."`";
		}
		$query = $query.") VALUES ('".$type."','".$groupNum."'";
		for($i = 0;$i<$groupNum;$i++){
			$query = $query.",'".$name[$i]."','".$sex[$i]."','".$number[$i]."','".$college[$i]."','".$grade[$i]."','".$phoneLong[$i]."','".$phoneShort[$i]."','".$address[$i]."','".$email[$i]."'";
		}
		$query = $query.")";
	$mysqli->query($query);
}

































?>