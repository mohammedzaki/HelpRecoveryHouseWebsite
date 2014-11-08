<?php
include 'library.php';
include "PHPMailer_5.2.4/class.phpmailer.php"; // include the class file name
$Name = $_POST[Name];
$Mobile = $_POST[Mobile];
$Title = $_POST[Title];
$Comment =$_POST[Comment];
$E_Mail = $_POST[E_Mail];

    $mail   = new PHPMailer; // call the class 
    $mail->IsSMTP(); 
    $mail->Host = SMTP_HOST; //Hostname of the mail server
    $mail->Port = SMTP_PORT; //Port of the SMTP like to be 25, 80, 465 or 587
    $mail->SMTPAuth = true; //Whether to use SMTP authentication
    $mail->Username = SMTP_UNAME; //Username for SMTP authentication any valid email created in your domain
    $mail->Password = SMTP_PWORD; //Password for SMTP authentication
    $mail->AddReplyTo($E_Mail, $Name); //reply-to address
    $mail->SetFrom($E_Mail, $Name); //From address of the mail
    // put your while loop here like below,
    $mail->Subject = "Contact Me Data"; //Subject add your mail
    //$mail->AddAddress(_UMAIL, _UNAME); //To address who will receive this email
    $mail->AddAddress(_UMAIL1, _UNAME); //To address who will receive this email
    $mail->AddAddress(_UMAIL2, _UNAME); //To address who will receive this email
    //$mail->AddAddress(_UMAIL3, _UNAME); //To address who will receive this email
    $mail->MsgHTML("Hello! This is my contact info. \n Name: $Name. \n Mobile: $Mobile. \n E_Mail: $E_Mail. \n Comment: $Comment"); //Put your body of the message you can place html code here
    $send = $mail->Send(); //Send the mails
?>