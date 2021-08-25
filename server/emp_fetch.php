<?php
include "db.php";
$json=file_get_contents('php://input');
$data=json_decode($json,true);
$type=$data['type'];

if($type=='fetch_emp'){
$resp = array();
$result = mysqli_query($con,"select * from employee");
while($row=$result->fetch_assoc()){
    $resp[]=$row;
}
echo json_encode($resp);
}
else if($type=='del_emp'){
    $id=$data['id'];
    mysqli_query($con,"delete from employee where emp_id='$id'");
    echo json_encode(1);
}
else if($type=='update_emp'){
    $emp_name=$data['emp_name'];
    $emp_id=$data['emp_id'];
$role=$data['role'];
$sal=$data['sal'];
$exp=$data['exp'];
$username=$data['username'];
$pwd=$data['pwd'];
mysqli_query($con,"update employee set emp_name='$emp_name',role='$role',salary='$sal',exp='$exp',username='$username',pwd='$pwd' where emp_id='$emp_id'");
echo json_encode(1);
}
?>