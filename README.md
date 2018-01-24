[![baseinstall](https://img.shields.io/badge/Built%20For%20WordPress-%E2%93%A6-lightgrey.svg?style=flat-square)](https://github.com/mikejandreau/baguetteBox-WP) 

# baguetteBox for WordPress

BaguetteBox.js is a pure JavaScript lightbox created by Marek Grzybek, aka [feimosi](https://github.com/feimosi/). It's lightweight, free of dependencies, and I've been using it in static sites and WordPress themes for a couple of years now.

This version is a simple WordPress plugin that will turn your galleries into a click/swipe enabled image slideshow. 

## Usage

Download the zip file, install, and activate. That's pretty much it.

## Compatibility

Desktop:
* IE 8+
* Chrome
* Firefox 3.6+
* Opera 12+
* Safari 5+

Mobile:
* Safari on iOS
* Chrome on Android


## Modifications

This is pretty much a fork of feimosi's work with some minor differences in the main JS file, mainly where the image alt text comes from.

```javascript
/**
* Line 518 in baguetteBox.js
* In addition to data-caption, we're looking at the title or img alt text for the caption
*/
imageElement.getAttribute('data-caption') || imageElement.title || thumbnailElement.alt;
```

For WordPress, that means you can do this:

![Alt Text](https://www.dropbox.com/s/65zphlgpab8h06x/baguetteboxWPaltText.jpg?raw=1)

## License

BaguetteBox.js Copyright (c) 2018 [feimosi](https://github.com/feimosi/)

BaguetteBox WP plugin Copyright (c) 2018 [Mike Jandreau](https://github.com/mikejandreau/)

This content is released under the [MIT License](https://opensource.org/licenses/MIT).