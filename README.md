# Build a web interface to accept, convert and resize images 
## Technologies : HTML , JS , CSS , opencv.js 

### Two files to do the tasks:
* Resize_Image.html - Resizes, converts to gray scale, draws lines and crops(automatic) images and download them.
* cropImage.html - Allows to crop image manually and download it

### Elements that are there in the interface :
* Upload Button - that accepts an input image
* Input Canvas  - the input image will be displayed in this canvas 
* Input Text Fields - to fill the target height and width 
* Resize Button - on clicking the resize button , the input image will be resized and    stored in Output Canvas. Resizing the image is done using opencv module.
* Output Canvas - the resize image will be displayed in this canvas 
* Download Button - on clicking the download button, downloads the resized output image   from browser .
