var red_slider;
var blue_slider;
var green_slider;
var objects = new Array({});
var thing_to_change = 'background';
var classname = '';

function LoadOptions() {
   red_slider = document.getElementById("red");
   blue_slider = document.getElementById("blue");
   green_slider = document.getElementById("green");
}

function ChangeColour() {
    if (objects) {
        for (i = 0; i < objects.length; i++) {
            if (thing_to_change == 'backgroundColor') {
                objects[i].style.backgroundColor = "rgb(" + red_slider.value + ", "
                    + green_slider.value + ", " + blue_slider.value + ")";
            }
            else {
                objects[i].style.color = "rgb(" + red_slider.value + ", "
                    + green_slider.value + ", " + blue_slider.value + ")";
            }
        }
    }
}

function SelectObject(class_name) {
    objects = document.getElementsByClassName(class_name);
    this.classname = class_name;

    if (objects.length > 0) {
        var rgbstring;
        if (thing_to_change == 'backgroundColor') {
            rgbstring = window.getComputedStyle(objects[0], null).backgroundColor;
        }
        else {
            rgbstring = window.getComputedStyle(objects[0], null).color;
        }
        ChangeSliders(rgbstring);
    }
}

function CheckClassname(change) {
    thing_to_change = change;
    if (classname.search("button") < 0) {
        thing_to_change = 'backgroundColor';
    }
    if (objects.length > 0) {
        var rgbstring = '';
        if (thing_to_change == 'backgroundColor') {
            rgbstring = window.getComputedStyle(objects[0], null).backgroundColor;
        }
        else {
            rgbstring = window.getComputedStyle(objects[0], null).color;
        }
        ChangeSliders(rgbstring);
    }
}

function ChangeSliders(rgbstring) {
    var rgb = rgbstring.match(/\d+/g);
    red_slider.value = rgb[0];
    green_slider.value = rgb[1];
    blue_slider.value = rgb[2];
}