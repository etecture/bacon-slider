# bacon-slider
React image Lightbox with Swipe and Keyboard Events


Since i could not find a react component equivalent to Lightbox, Fancybox etc including Swipe and Keyboard Events, i decided to create one.

## How to use
npm i -S bacon-slider

import as you would any other React Component from Node Modules and pass an Array of Image Urls in the props

```
<Gallery isOpen={galleryOpen}
         images={vehicleImageUrls}
         handleCloseGallery={this.handleCloseGallery}
/>
```

## Props 
All 3 props are seen in the code snippet above and all 3 are required. 

|Props|default|required|
|-----|:-----:|:------:|
|isOpen (boolean)| - | yes |
|images (array)| - | yes |
|handleCloseGallery (func)| - | yes |

Your wrapping Component should probably manage the isOpen Prop and have a method to switch it to true or false as needed.
