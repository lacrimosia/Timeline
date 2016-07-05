// Timeline JS3 Custom interaction
// 6/2016

var current = 0; // set the current to first slide
var voiceType = "US English Female"; // Male voice for audio
var voiceRate = 0.9; // voice rate for the audio
var enabled = false; // hide intro screen
var disableKey = true; // disable keyboard until intro screen is hidden
var sound = false; // Toggle sound on and off from button and keyboard
var soundOn = "<i class='fa fa-volume-up'></i> ON"; // change to sound on icon
var soundOff = "<i class='fa fa-volume-off'></i> OFF"; // change to sound off icon
var showHelp = false; // show help when clicked or key is pressed
var openHelp = false; // whether help menu is open or closed
var playing = true; //checks if sound is playing
var sounds = [];


// init
init();

function init() {
    // $('.help_Menu').hide();

}

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
        sound = false;
        audioSound();

    } else if (key == 37 && disableKey == false) {
        //left arrow key - go to previous slide
        timeline.goToPrev(); // go to previous slide
        sound = false;
        audioSound();
    } else if (key == 82) {
        location.reload(); //reload app - r key
    } else if (key == 83) {
        intro(); //Start App - s key
       // $('.sound').html(soundOff); // init icon 
    } else if (key == 65 && disableKey == false) {
        // A key - toggle Sound
        // toggles sound and changes icon based on whether sound is on or off
        sound = !sound;
        sound ? playSound(getSlideIndex()) : stopSound(getSlideIndex());
        changeSoundIcon();
    } else if (key == 72 && disableKey == false) {
        // H key - Help Menu
        // toggles sound and changes icon based on whether sound is on or off
        openHelp = !openHelp;
        sound = false;
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
    sound = false;
    $('.sound').html(soundOff); // init icon 
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
    sound = !sound;
    sound ? playSound(getSlideIndex()) : stopSound(getSlideIndex());
    changeSoundIcon();
});

// read when user clicks next
timeline.on("nav_next", function(data) {
    sound = false;
    audioSound();
    changeSoundIcon();
});

// read when user clicks previous
timeline.on("nav_previous", function(data) {
    sound = false;
    audioSound();
    changeSoundIcon();
});

// read on slide change
timeline.on("change", function(data) {
    sound = false;
    audioSound();
    changeSoundIcon();
});

function intro() {
    $('.help_Menu').hide();
    //  readIntro();
    enabled = true;
    disableKey = false;
}


function getSlideIndex() {
    // slide array
    var slideArray = timeline._storyslider._slides;
    // return current slide number
    var current = _.findIndex(slideArray, function(o) {
        return o.active == true;
    });

    console.log('current', current);
    return current;
}

function playSound(current) {
    var slideArray = timeline._storyslider._slides;
    var sound = new buzz.sound(slideArray[current].data.audio.sound);
    sound.play();
}

function stopSound(current) {
    for (var i in buzz.sounds) {
        buzz.sounds[i].mute();
    }
}

function audioSound() {
    if (sound == false) {
        stopSound(getSlideIndex());
        $('.sound').html(soundOff);
    } else {
        playSound(getSlideIndex());
        ('.sound').html(soundOn)
    }
}

/*function toggleSound() {
    // turn sound on/off with keystroke
    // check if sound is playing and turn on
    sound = !sound; //toggle sound state
    return sound;
}*/

function changeSoundIcon() {
  //  sound = !sound;
    sound ? $('.sound').html(soundOn) : $('.sound').html(soundOff);
}


function showHelpMenu() {
    $('.help_Menu').show();
    toggleSound();
}

function closeHelpMenu() {
    $('.help_Menu').hide();
}
