var current = 0; // set the current to first slide
var voiceType = "UK English Male"; // Male voice for audio
var voiceRate = 0.9; // voice rate for the audio
var enabled = false; // hide intro screen
var disableKey = true; // disable keyboard until intro screen is hidden
var sound = true; // Toggle sound on and off from button and keyboard

// information from timeline slides data 
//  count += 1;
// slide heading - console.log('timeline slide heading', timeline.getSlide(count));
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
        getCount(); // get current slide
        read(); // enable speech
    } else if (key == 37 && disableKey == false) {
        //left arrow key - go to previous slide
        timeline.goToPrev(); // go to previous slide
        getCount(); // get current slide
        read(); // enable speech

    } else if (key == 82) {
        //reload app - r key
        location.reload();
    } else if (key == 83) {
        //Start App - s key
        intro();
    }
});


function intro() {
    $('.intro').hide();
    enabled = true;
    disableKey = false;
}

// get the slide id 
// check for the active==true
// return the slide index from id
// use this to retrieve text data for audio
function getCount() {
    var listing = timeline._storyslider._slides;
    for (var x = 0; x < listing.length; x++) {
        if (listing[x].active == true) {
            current = x;
            console.log('current', current);
        }
    }
    return current;
}


function read() {
    if (getCount() == 0 && disableKey == false) {
        responsiveVoice.speak(timeline.getData(getCount()).text.headline + ". " + timeline.getData(getCount()).text.text, voiceType, { rate: voiceRate });
    } else {
        responsiveVoice.speak(timeline.getData(getCount()).text.headline + ". " + timeline.getData(getCount()).text.text, voiceType, { rate: voiceRate });
    }

}
