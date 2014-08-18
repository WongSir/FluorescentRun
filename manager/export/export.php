<?php

$table = $_GET["table"];

$html = "<!DOCTYPE>
<html>
<head>
<title>Manager</title>
<meta http-equiv=\"content-type\" content=\"text/html;charset=utf-8\"/>
<style>
  table{
  	border-collapse:collapse;
  	border:none;
  	table-layout:fixed;
  	width:100%;
  	text-align:center;
  	word-wrap:break-word;
  	word-break:break-all;
  }
  td,th{
  	border:solid#000 1px;
  	}
</style>
</head>
<body>".$table."</body></html>";
  
$of = fopen('manager.doc','w');
if($of){
	fwrite($of,$html);
}
fclose($of);






?>