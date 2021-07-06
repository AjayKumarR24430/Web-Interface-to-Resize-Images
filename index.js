const srcImg = document.getElementById('src-image');
const cropImg = document.getElementById('crop-image');
const fileInput = document.getElementById('input-file');
const cropInput = document.getElementById('file');
const canvas = document.getElementById('canvas');
const canvas1 = document.getElementById('canvas1');
const grayScaleBtn = document.getElementById('gray-scale-btn');
const lineDrawBtn = document.getElementById('linedraw-btn');
const downloadBtn = document.getElementById('download-btn');
const downloadBtn1 = document.getElementById('download-btn1');
const resizeBtn = document.getElementById('resize-btn');
const cropBtn = document.getElementById('crop-btn');

// function to convert the image to gray scale
function convertImageToGray(img) {
    let dst = new cv.Mat();
    cv.cvtColor(img, dst, cv.COLOR_RGBA2GRAY, 0);
    return dst;
}

// function to convert the image to a line drawing
function convertImageToLineDrawing(img) {
    const kernel = cv.getStructuringElement(cv.MORPH_RECT,new cv.Size(5,5));

    const imgGray = new cv.Mat();
    cv.cvtColor(img, imgGray, cv.COLOR_RGBA2GRAY);

    const imgDilated = new cv.Mat();
    cv.dilate(imgGray, imgDilated, kernel, new cv.Point(-1, 1), 1);

    const imgDiff = new cv.Mat();
    cv.absdiff(imgDilated, imgGray, imgDiff);

    const contour = new cv.Mat();
    cv.bitwise_not(imgDiff, contour);
    return contour;
}

// to convert the uri to blob to make it downloadable as a png file
function dataUriToBlob(dataUri) {
    const b64 = atob(dataUri.split(',')[1]);
    const u8 = Uint8Array.from(b64.split(''), e => e.charCodeAt());
    return new Blob([u8], {type: 'image/png'});
}

fileInput.addEventListener('change', e => {
    // setting the src of the image from the Input file
    srcImg.src = URL.createObjectURL(e.target.files[0]);    
}, false);

cropInput.addEventListener('change', e => {
    // setting the src of the image from the Input file
    cropImg.src = URL.createObjectURL(e.target.files[0]);    
}, false);

// onclicking gray scale button, conversion takes place convertImageToGray function is called
grayScaleBtn.addEventListener('click', e => {
    let src = cv.imread(srcImg);
    const dst = convertImageToGray(src);
    // display grayscale image
    cv.imshow('canvas', dst);
    src.delete();
    dst.delete();
});

// onclicking linedraw button, convertImageToLineDrawing function gets called.
lineDrawBtn.addEventListener('click', e => {
    const src = cv.imread(srcImg);
    const dst = convertImageToLineDrawing(src);
    // display line image
    cv.imshow('canvas', dst);
    src.delete();
    dst.delete();
});

resizeBtn.addEventListener('click', e=> {
    let src = cv.imread(srcImg);
    let dst = new cv.Mat();
    //specifying the size of the image here, dimension is 300X300
    let dsize = new cv.Size(300, 300);
    // You can try more different parameters
    cv.resize(src, dst, dsize, 0, 0, cv.INTER_AREA);
    cv.imshow('canvas', dst);
    src.delete(); dst.delete();
});

cropBtn.addEventListener('click', e=> {
    let src = cv.imread(srcImg);
    let dst = new cv.Mat();
    // You can try more different parameters
    let rect = new cv.Rect(250, 250, 250, 250);
    dst = src.roi(rect);
    cv.imshow('canvas', dst);
    src.delete();
    dst.delete();
});

// to download the resized/converted image
downloadBtn.addEventListener('click', e => {
    const data = canvas.toDataURL();
    const url = URL.createObjectURL(dataUriToBlob(data));
    downloadBtn.href = url;
});

// to download the cropped image
downloadBtn1.addEventListener('click', e => {
    const data = canvas1.toDataURL();
    const url = URL.createObjectURL(dataUriToBlob(data));
    console.log(url)
    downloadBtn1.href = url;
});
