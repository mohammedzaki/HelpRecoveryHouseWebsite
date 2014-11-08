<?php
include 'library.php';
include "PHPMailer_5.2.4/class.phpmailer.php"; // include the class file name

$target_path = "uploads/";
$target_path = $target_path . basename( $_FILES['file']['name']); 

if(move_uploaded_file($_FILES['file']['tmp_name'], $target_path)) {
	echo "Thank you your C.V. has been uploaded.";
} else{
    echo "There was an error uploading the file, please try again!";
}

    $mail   = new PHPMailer; // call the class 
    $mail->IsSMTP(); 
    $mail->Host = SMTP_HOST; //Hostname of the mail server
    $mail->Port = SMTP_PORT; //Port of the SMTP like to be 25, 80, 465 or 587
    $mail->SMTPAuth = true; //Whether to use Port_SMTP authentication
    $mail->Username = SMTP_UNAME; //Username for SMTP authentication any valid email created in your domain
    $mail->Password = SMTP_PWORD; //Password for SMTP authentication
    //$mail->AddReplyTo(SMTP_UNAME, $Name); //reply-to address
    $mail->SetFrom(SMTP_UNAME, $Name); //From address of the mail
    // put your while loop here like below,
    $mail->Subject = "New CV"; //Subject add your mail
    $mail->AddAddress(_UMAIL, _UNAME); //To address who will receive this email
    $mail->MsgHTML("New CV"); //Put your body of the message you can place html code here
    $mail->AddAttachment($target_path); //Attach a file here if any or comment this line, 
    $send = $mail->Send(); //Send the mails
?>