// Timeline JS3 Custom interaction
// 6/2016

var current = 0; // set the current to first slide
var voiceType = "US English Female"; // Male voice for audio
var voiceRate = 0.9; // voice rate for the audio
var enabled = false; // hide intro screen
var disableKey = true; // disable keyboard until intro screen is hidden
var sound = true; // Toggle sound on and off from button and keyboard
var soundOn = "<i class='fa fa-volume-up'></i> ON"; // change to sound on icon
var soundOff = "<i class='fa fa-volume-off'></i> OFF"; // change to sound off icon
var showHelp = false; // show help when clicked or key is pressed
var openHelp = false; // whether help menu is open or closed
var playing = true; //checks if sound is playing


// init
init();

// information from timeline slides data 
//  count += 1;

// unique id - console.log('timelines unique id', timeline.getSlide(1).data.unique_id);
// current_id - console.log('timeline', timeline.current_id);
// slides - console.log('timeline', timeline._storyslider._slides);
// console.log('timeline', timeline._storyslider._slides);

// keyboard shortcuts for accessibility
$(document).bind('keyup', function(e) {
    key = e.keyCode;

    if (key == 39 && disableKey == false) {
        //right arrow key - go to next slide
        timeline.goToNext(); // go to next slide

    } else if (key == 37 && disableKey == false) {
        //left arrow key - go to previous slide
        timeline.goToPrev(); // go to previous slide


    } else if (key == 82) {
        location.reload(); //reload app - r key
    } else if (key == 83) {
        intro(); //Start App - s key
        $('.sound').html(soundOn); // init icon 
    } else if (key == 65 && disableKey == false) {
        // A key - toggle Sound
        // toggles sound and changes icon based on whether sound is on or off
        changeSoundIcon();
    } else if (key == 72 && disableKey == false) {
        // H key - Help Menu
        // toggles sound and changes icon based on whether sound is on or off
        openHelp = !openHelp;
        if (openHelp == true) {
            showHelpMenu();
            $('.help_Button').html("Close <i class='fa fa-times'></i>");
        } else {
            closeHelpMenu();
        }
    }
});

// start sound on intro
$('.help_Button').click(function() {
    intro(); //Start App - s key
    $('.sound').html(soundOn); // init icon 
});

// reload app 
$('.reload').click(function() {
    location.reload();
});

// help menu will show
$('.help').click(function() {
    showHelpMenu();
    $('.help_Button').html("Close");
});

// close help menu
$('.help_Button').click(function() {
    closeHelpMenu();
});

// toggle sound button
$('.sound').click(function() {
    // toggles sound and changes icon based on whether sound is on or off
    changeSoundIcon();
});

// grayscale
/*$('.grayscale').click(function(){
    var buttonColor = tinycolor("rgb(234,0,31)").desaturate(100).toString();
    $('.btn').css({
        'background-color': buttonColor
    });

    $('.btn').css({
        'background-color': buttonColor
    });
    console.log('grayscale', buttonColor);
});*/

// read when user clicks next
timeline.on("nav_next", function(data) {
    getSlideIndex();
});



// read when user clicks previous
timeline.on("nav_previous", function(data) {
    //  getSlideIndex();
});

// read on slide change
timeline.on("change", function(data) {
  //  playing = false;
});

function intro() {
    $('.help_Menu').hide();
    //  readIntro();
    enabled = true;
    disableKey = false;
}

// getSlideIndex();

// sound files
var audio = [{
    "soundfile": "./audio/Phipps_0.mp3"
}, {
    "soundfile": "./audio/Phipps_1.mp3"
}, {
    "soundfile": "./audio/Phipps_2.mp3"
}, {
    "soundfile": "./audio/Phipps_3.mp3"
}, {
    "soundfile": "./audio/Phipps_4.mp3"
}, {
    "soundfile": "./audio/Phipps_5.mp3"
}, {
    "soundfile": "./audio/Phipps_6.mp3"
}];

function getSlideIndex() {
    var slideArray = timeline._storyslider._slides;
    // console.log(timeline.getCurrentSlide());
    for (var s = 0; s < slideArray.length; s++) {
        var mySound = new buzz.sound(audio[s].soundfile);
        if (slideArray[s].active == true) {
          //  playing = true;
          //  mySound.play();
            console.log("is active", slideArray[s].active);
            console.log("current", s);
            for (var i in buzz.sounds) {
                if(i != s){
                    buzz.sounds[i].mute();
                }else{
                    buzz.sounds[s].play();
                }
            }
        }


    }
    return s;
}

function toggleSound() {
    // turn sound on/off with keystroke
    // check if sound is playing and turn ona
    sound = !sound; //toggle sound state
    if (sound == false) {

    } else {

    }
    // console.log('toggleSound()', sound);
    return sound;
}

function changeSoundIcon() {
    toggleSound() ? $('.sound').html(soundOn) : $('.sound').html(soundOff);
}

function init() {
    // $('.help_Menu').hide();
}

function showHelpMenu() {
    $('.help_Menu').show();
}

function closeHelpMenu() {
    $('.help_Menu').hide();
}
