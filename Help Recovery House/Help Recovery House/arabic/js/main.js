/// <reference path="jquery.js" />

var sliderTimer;
var sliderClientsTimer;
var val = 0;
var percent = 0;
var lastDiv;
var imgGalleryWidth = 0;
var ballPos = 1;
var liIndex = 1;

//document.getElementById("btn_lang").value = "0";

function displayLoading() {
    document.getElementById("L_transparent").style.display = 'block';
    document.getElementById("L_content").style.display = 'block';
    document.getElementById("L_modebox").style.display = 'block';
}

function hideLoading() {
    document.getElementById("L_transparent").style.display = 'none';
    document.getElementById("L_content").style.display = 'none';
}


$(function () {
    resizeElement();
    liIndex = 2;
    setInterval(function () {
        //$('.SelectedLi .imgGallery').css({ width: "auto" });
        $('.SelectedLi').css({ width: "3%" });
        $('.SelectedLi').removeClass("SelectedLi");
        $('.homepageGallery ul li:nth-child(' + liIndex + ')').css({ width: "84.53%" });
        $('.homepageGallery ul li:nth-child(' + liIndex + ')').addClass("SelectedLi");
        //$('.homepageGallery ul li:nth-child(' + liIndex + ') .imgGallery').css({ width: "100%" });
        if (liIndex >= 6)
            liIndex = 1;
        else
            liIndex++;
    }, 2500);
    window.onresize = function (event) {
        resizeElement();
    };
    $("#btn_lang").on("change", function () {
        if ($(this).val() == "1") {
            window.location.href = "../home.html";
        } else {
            window.location.href = "arabic/home.html";
        }
    });
    try {
        $(".pageContent .subPageContent").hide();
        $(".pageContent .banner > div > img")[0].onload = function () { imgLoaded() };
    } catch (e) {

    }
});

function resizeElement() {
    var valu = $("header").width();
    valu = ((((valu - $("header div").width()) / 2/* to get space reqiured to strech*/) / 7 /* 1% = 7px*/) /*+ 1.1*/) + 100;
    $("header div .mainLeftLogo .upper_bar").css("width", valu + "%");
    $(".pageContent").css({ height: (jQuery(window).height() - 278) });
    $(".pageContentH").css({ height: (jQuery(window).height() - 278) });
    $(".homepage").css({ height: (jQuery(window).height() - 278) });
    $(".homepageGallery").css({ height: (jQuery(window).height() - 278) });
    $(".homepageGallery ul").css({ height: (jQuery(window).height() - 278) });
    $(".imgGallery").css({ height: (jQuery(window).height() - 278) });
    $(".waterMarkLogo").css({ width: jQuery(document).width(), height: jQuery(document).height() });
    ballPos = 1;
    liIndex = 0;
    val = $(window).width() * -1;
    percent = val;
    imgGalleryWidth = val * 4;
    lastDiv = $("#ball1");
    alignBottomMenu();
    alignVision_missionUl();
}

function imgLoaded() {
    $(".pageContent .subPageContent").css({ height: (jQuery(".pageContent").height() - jQuery(".pageContent .banner").height()) });
    $(".pageContent .subPageContent").show();
}

function alignBottomMenu() {
    var allWidth = 0;
    var ulWidth = 0;
    var netWidth = 0;
    var padding = 0;
    $('.footermenu li:not(.footermenu li ul li)').each(function () {
        allWidth += $(this).width();
    });
    ulWidth = $('.footermenu').width();
    netWidth = ulWidth - allWidth;
    padding = netWidth / 6;
    padding -= 5.8;
    $('.footermenu li:not(.footermenu li ul li,.footermenu li:last-child)').each(function () {
        $(this).css("padding", "0px " + padding + "px 0px 0px");
    });
}

//.vision_missionPage .vision_missionUl
function alignVision_missionUl() {
    var allWidth = 0;
    var ulWidth = 0;
    var netWidth = 0;
    var padding = 0;
    $('.vision_missionPage .vision_missionUl li').each(function () {
        allWidth += $(this).width();
    });
    ulWidth = $('.vision_missionPage .vision_missionUl').width();
    netWidth = ulWidth - allWidth;
    padding = netWidth / 2;
    padding -= 5.8;
    $('.vision_missionPage .vision_missionUl li:not(.vision_missionPage .vision_missionUl li:last-child)').each(function () {
        $(this).css("padding", "0px " + padding + "px 0px 0px");
    });
}

function SendMail() {
    var msg = "", flag = true;
    var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    /*if ($("#txt_name").val() == '') {
        msg += "Please provide your Name! \n";
        flag = false;
    }*/
    if ($("#txt_Mobile").val() == '' && $("#txt_Mobile").val().length < 11) {
        msg += "Please provide Mobile! \n";
        flag = false;
    }
    if ($("#txt_Title").val() == '') {
        msg += "Please provide your Title! \n";
        flag = false;
    }
    if (!emailReg.test($("#txt_E_Mail").val()) || $("#txt_E_Mail").val() == '') {
        msg += "Please provide a valid email address! \n";
        flag = false;
    }
    if (flag) {
        displayLoading();
        $.ajax({
            url: "../mailSystem/contactUsMail.php",
            type: "POST",
            data: {
                Name: $("#txt_name").val(),
                Mobile: $("#txt_Mobile").val(),
                Title: $("#txt_Title").val(),
                E_Mail: $("#txt_E_Mail").val(),
                Comment: $("#txt_Comment").val()
            },
            success: function (data) {
                $("#txt_name").val('');
                $("#txt_Mobile").val('');
                $("#txt_Title").val('');
                $("#txt_Comment").val('');
                $("#txt_E_Mail").val('');
                hideLoading();
                alert("Your contact data has been received.");
                $(".popup-container").hide();
            },
            error: function (error) {
                $("#txt_name").val('');
                $("#txt_Mobile").val('');
                $("#txt_Title").val('');
                $("#txt_Comment").val('');
                $("#txt_E_Mail").val('');
                hideLoading();
                alert(error.status + " : " + error.statusText);
            }
        });
    } else {
        alert(msg);
    }
}

$(".IsNumberOnly").keypress(function (evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        {
            return false;
        }
    }
    return true;
});


function DropDown(el) {
    this.dd = el;
    this.initEvents();
}
DropDown.prototype = {
    initEvents: function () {
        var obj = this;

        obj.dd.on('click', function (event) {
            $(this).toggleClass('active');
            event.stopPropagation();
        });
    }
}

$(function () {

    var dd = new DropDown($('#dd'));

    $(document).click(function () {
        // all dropdowns
        $('.wrapper-dropdown-5').removeClass('active');
    });

});