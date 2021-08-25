<?php
include "db.php";
$json=file_get_contents('php://input');
$data=json_decode($json,true);

$type=$data['type'];
$emp_id=$data['emp_id'];

if($type=='create_skill'){
$skill=$data['skill'];
$per =$data['per'];
$result=mysqli_query($con,"select * from skills");
while($row=$result->fetch_assoc()){
    $id=$row['id'];
}
$id++;
mysqli_query($con,"insert into skills values('$id','$emp_id','$skill','$per')");
echo json_encode(1);
}

else if($type=='update_skill'){
$skill=$data['skill'];
$per =$data['per'];
$id=$data['id'];

mysqli_query($con,"update skills set skill='$skill', per='$per' where emp_id='$emp_id' and id='$id'");
echo json_encode(1);
}

else if($type=='fetch_skill'){
$res=array();
$result = mysqli_query($con,"select * from skills where emp_id='$emp_id'");
while($row=$result->fetch_assoc())
{
$res[]=$row;
}
echo json_encode($res);
}

else if($type=='delete_skill'){
    $id=$data['id'];
$result = mysqli_query($con,"delete from skills where emp_id='$emp_id' and id='$id'");
    
echo json_encode(1);
}
?>