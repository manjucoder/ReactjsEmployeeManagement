<?php
include "db.php";
$json=file_get_contents('php://input');
$data=json_decode($json,true);

$type=$data['type'];
$username=$data['username'];
$pwd=$data['pwd'];

if($type=='Manager') {
    $temp=0;
$result=mysqli_query($con,"select * from manager");
while($row=$result->fetch_assoc()){
    if($row['username']==$username && $row['pwd']==$pwd)
        $temp=1;
}
}
else if($type=='Employee'){
    $temp=0;
    $result=mysqli_query($con,"select * from employee");
    while($row=$result->fetch_assoc()){
        if($row['username']==$username && $row['pwd']==$pwd)
            $temp=$row['emp_id'];
    }
}

echo json_encode($temp);
?>