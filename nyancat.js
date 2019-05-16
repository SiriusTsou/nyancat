$(document).ready(function () {
    var url = 'https://siriustsou.github.io/nyancat';

    var shiftPressed = 0;   // counter of key presses
    var shiftMax = 5;   // when pressed that many times sequentially, start animation
    var keyCode = 16; // shift key
    var animationDuration = 9000; // number of milliseconds the animation will take

    $('body').append('<img src="' + url + '/nyancat.gif" id="image" width="100" style="position:fixed;z-index:9999;left:0px;top:0px;visibility:hidden"/>');
    var img = $("img#image");

    $('body').append('<audio id="sound" preload="auto"><source src="' + url + '/nyancat.ogg" type="audio/ogg"/><source src="' + url + '/nyancat.mp3" type="audio/mp3" /></audio>');
    var sound = $("#sound").get(0);

    var nyancat_reset = function () {
        //no sound control if not in HTML5
        if (sound.volume != undefined) {
            sound.pause();
            sound.currentTime = 0;
            sound.volume = 1;
        } else {
            $("#sound-ie").remove();
        }

        //img.css("left", "-100px");
    };

    nyancat_start();

    // 两个方向
    var directX = 1; // x轴方向
    var directY = 1; // y轴方向

    // 太阳的坐标
    var sunX = 0;
    var sunY = 0;
    var speed = 1 ;

  //http://blog.csdn.net/wuqinfei_cs/article/details/16949353
    function nyancat_scroll( ) {
        // 改变坐标
        sunX += directX*speed;
        sunY += directY*speed;
        // 改变位置

        // 转变方向,;
        if ( sunX+document.getElementById("image").offsetWidth   >= $(window).width()  || sunX < 0 ) {
            directX = - directX;
        }
        if ( sunY+document.getElementById("image").offsetHeight  >= $(window).height() || sunY < 0 ) {
            directY = - directY;
        }
        img.show().animate({ "left": "+="+(directX*speed)+"px","top": "+="+(directY*speed)+"px" },{duration:1,complete: nyancat_scroll}) ;

    };


    function nyancat_start() {
        //no sound control if not in HTML5
        if (sound.volume != undefined) {
            sound.play();
        }
        else {
            $('body').append('<embed id="sound-ie" src="' + url + '/nyancat.mp3" type="application/x-mplayer2" autostart="true" playcount="true" loop="false" height="0" width="0">');
        }
    // old version
        //img.show().animate({ "left": "+=" + parseInt($("body").width() + 100) + "px" }, animationDuration, nyancat_reset);

    //scroll down
    img.css("visibility","visible");
    nyancat_scroll() ;
  };

  $(document).on("click", function(){
    shiftPressed++;
    if (shiftPressed == shiftMax) {
            nyancat_start();
            shiftPressed = 0;
        }
  });

    $("body").keyup(function (event) {
        if (event.which == keyCode) {
            shiftPressed++;
            event.preventDefault();
        } else {
            shiftPressed = 0;
        }
        if (shiftPressed == shiftMax) {
            nyancat_start();
            shiftPressed = 0;
        }
    });

    $("#sound").on('timeupdate', function () {
        var vol = 1,
        interval = 200;
        if (Math.floor(sound.currentTime) == 6) {
            //console.log("now starting to decrease volume ...");
            if (sound.volume == 1) {
                var intervalID = setInterval(function () {
                    if (vol > 0) {
                        vol -= 0.10;
                        if (vol >= 0.10)
                            sound.volume = vol.toFixed(1);
                    } else {
                        clearInterval(intervalID);
                    }
                },
                interval);
            }
        }
    });
});
