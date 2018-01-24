/**
* LIGHTBOX SLIDESHOW
* Trigger JavaScript slideshow using baguetteBox.js, no jQuery required
* If screen is smaller than 800px, hide left/right arrow buttons and use swipe
*/ 

// Find all instances of .gallery
var baguetteBoxGallery = document.getElementsByClassName('gallery');

// Iterate through all instances of .gallery to add .baguetteBox
for (var i = 0; i < baguetteBoxGallery.length; i++) {
    // add the unique class to eliminate conflicts with multiple galleries
    baguetteBoxGallery[i].classList.add("baguetteBox" + (i+1));
}

// Run up to 3 instances of slideshow on a single page
// Follow the pattern to have more or less if needed
var baguetteBoxOne = document.getElementsByClassName('baguetteBox1');
if (baguetteBoxOne.length > 0) {
    baguetteBox.run('.baguetteBox1');
}

var baguetteBoxTwo = document.getElementsByClassName('baguetteBox2');
if (baguetteBoxTwo.length > 0) {
    baguetteBox.run('.baguetteBox2');
}

var baguetteBoxThree = document.getElementsByClassName('baguetteBox3');
if (baguetteBoxThree.length > 0) {
    baguetteBox.run('.baguetteBox3');
}

var baguetteBoxFour = document.getElementsByClassName('baguetteBox4');
if (baguetteBoxFour.length > 0) {
    baguetteBox.run('.baguetteBox4');
}
