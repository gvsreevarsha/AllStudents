<?php
    require 'connect.php';
    header("Access-Control-Allow-Origin: *");
    header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    error_reporting(E_ERROR);
    $students=[];
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $category= $request->category;
    $batch= $request->batch;
    $gender=$request->gender;
    $sortby=$request->sortby;
    $jobeligible=$request->jobeligible;
    $jobsinhand=$request->jobsinhand;
    $cgpa=$request->cgpa;
    $tenth=$request->tenth;
    $twelve=$request->twelve;
    $back=$request->back;
    if($category=="Any")
        $sql1="SELECT * from display_filtered_students";
    else
        $sql1="SELECT * from display_filtered_students where Program='$category'";
    if($batch=='nill')
        $sql2="SELECT * from display_filtered_students";
    else
        $sql2="SELECT * from display_filtered_students where YOP='$batch'";

    if($gender=="nill")
        $sql3="SELECT * from display_filtered_students";
    else
        $sql3="SELECT * from display_filtered_students where gender='$gender'";

    if($jobeligible=="yes")
        $sql4="SELECT * from display_filtered_students where b_tech_gpa>0";
    else
        $sql4="SELECT * from display_filtered_students where b_tech_gpa=0";
    /*if($jobsinhand=="nill")
        $sql5="SELECT * from display_filtered_students";
    if($jobsinhand=="0")
        $sql5="SELECT * from display_filtered_students,cdt2020 WHERE cdt2020.PIU='Y' and display_filtered_students.user_id=cdt2020.userid group by display_filtered_students.user_id HAVING COUNT(display_filtered_students.user_id)=0";
    else   
        $sql5="SELECT * from display_filtered_students,cdt2020 WHERE cdt2020.PIU='Y' and display_filtered_students.user_id=cdt2020.userid group by display_filtered_students.user_id HAVING COUNT(display_filtered_students.user_id)<=".$jobsinhand;*/
    $sql6="SELECT * from display_filtered_students where b_tech_gpa>'$cgpa'";
    $sql7="SELECT * from display_filtered_students WHERE `SSC_percent`>='$ten'";
    $sql8="SELECT * from display_filtered_students WHERE `inter_percent`>='$twelve'";
    if($backlogs=-1)
        $sql9="SELECT * from display_filtered_students WHERE `pass_category`='A'";
    else if($backlogs<11)
        $sql9="SELECT * from display_filtered_students WHERE `no_of_backlogs`<='$backlogs'";
    else
        $sql9="SELECT * from display_filtered_students WHERE `no_of_backlogs`>11";
    $sql=$sql1." INTERSECT ".$sql2." INTERSECT ".$sql3." INTERSECT ".$sql4." INTERSECT ".$sql6." INTERSECT ".$sql7." INTERSECT ".$sql8;
    if($result = mysqli_query($con,$sql))
    {
        $cr=0;
        while($row = mysqli_fetch_assoc($result))
        {
            $students[$cr]['id']=$row['user_id'];
            $students[$cr]['fname']=$row['first_name'];
            $students[$cr]['mname']=$row['middle_name'];
            $students[$cr]['lname']=$row['last_name'];
            $students[$cr]['Branch']=$row['Branch'];
            $students[$cr]['sscmarks']=$row['SSC_percent'];
            $students[$cr]['intermarks']=$row['inter_percent'];
            $students[$cr]['btechgpa']=$row['b_tech_gpa'];
            $students[$cr]['batch']=$row['YOP'];

            $cr++;
        }
        echo json_encode($students);
    }
    else
    {
        http_response_code(404);
    }
?>