<?php
include "db.php";
$json=file_get_contents('php://input');
$data=json_decode($json,true);

$emp_name=$data['emp_name'];
$role=$data['role'];
$sal=$data['sal'];
$exp=$data['exp'];
$username=$data['username'];
$pwd=$data['pwd'];

$emp_id=0;
$result = mysqli_query($con,"select * from employee");
while($row=$result->fetch_assoc()){
    $emp_id=$row['emp_id'];
}
$emp_id++;

mysqli_query($con,"insert into employee values('$emp_id','$emp_name','$role','$sal','$exp','$username','$pwd')");

echo json_encode($emp_id);
?>