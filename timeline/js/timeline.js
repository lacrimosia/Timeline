 // keyboard shortcuts for accessibility
    $(document).bind('keyup', function(e) {
        key = e.keyCode;
        if (key == 39 && disableKey==false) {
            //right arrow key - go to next slide
            timeline.goToNext();
        } else if (key == 37 && disableKey==false) {
            //left arrow key - go to previous slide
            timeline.goToPrev();
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
        disableKey=false;
    }