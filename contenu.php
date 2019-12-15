<?php
$jsonTodoFile = "todo.json";

function getData() {
    $jsonTodoFile = "todo.json";
    $json = file_get_contents($jsonTodoFile);
    if(strlen($json)==0){$json="[]";}
    $jsonArr = json_decode($json,true);
    return $jsonArr;
}

function sanitize($data){
    $arrayData = array();
    foreach ($data as $key => $value) {
        $arrayData[$key]=Array();
        foreach ($data[$key] as $keys => $val) {
             $arrayData[$key][$keys]= filter_var($val,FILTER_SANITIZE_STRING);
          }
       }
    
    return json_encode($arrayData)  ;
}

if($_GET){
    $action = $_REQUEST["action"];
    switch ($action) {
            //////////////////////////////
            // get select context here //
            /////////////////////////////
            case ("getTodo"): 
                $data = getData();
                $sanitData = sanitize($data);
                echo $sanitData;    
            break;
            case("saveTodo"):
                $data=$_GET['data'];            
                if (file_put_contents($jsonTodoFile, $data)) {
                   echo"fichier sauver";
                }else {
                   echo "error fichier";
                }
            break;
            case ("addTodo"):
                $data="[".$_GET['data']."]"; 
                $jsonArr = json_decode($data);
                $sanitData = sanitize($jsonArr);
                echo $sanitData ;
            break;
            
        }
    }