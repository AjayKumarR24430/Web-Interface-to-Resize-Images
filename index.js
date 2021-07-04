const srcImg = document.getElementById('src-image');
const fileInput = document.getElementById('input-file');
const canvas = document.getElementById('dest-canvas');
const grayScaleBtn = document.getElementById('gray-scale-btn');
const lineDrawBtn = document.getElementById('linedraw-btn');
const downloadBtn = document.getElementById('download-btn');
const resizeBtn = document.getElementById('resize-btn');

function convertImageToGray(img) {
    let dst = new cv.Mat();
    cv.cvtColor(img, dst, cv.COLOR_RGBA2GRAY, 0);
    return dst;
}

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

function dataUriToBlob(dataUri) {
    const b64 = atob(dataUri.split(',')[1]);
    const u8 = Uint8Array.from(b64.split(''), e => e.charCodeAt());
    return new Blob([u8], {type: 'image/png'});
}

fileInput.addEventListener('change', e => {
    srcImg.src = URL.createObjectURL(e.target.files[0]);
    hiddenImg.src = URL.createObjectURL(e.target.files[0]);
}, false);

grayScaleBtn.addEventListener('click', e => {
    let src = cv.imread(srcImg);
    const dst = convertImageToGray(src);
    cv.imshow('dest-canvas', dst);
    src.delete();
    dst.delete();
});

lineDrawBtn.addEventListener('click', e => {
    const src = cv.imread(srcImg);
    const dst = convertImageToLineDrawing(src);
    cv.imshow('dest-canvas', dst);
    src.delete();
    dst.delete();
});

downloadBtn.addEventListener('click', e => {
    const data = canvas.toDataURL();
    const url = URL.createObjectURL(dataUriToBlob(data));
    downloadBtn.href = url;
});

resizeBtn.addEventListener('click', e=> {
    let src = cv.imread(srcImg);
    let dst = new cv.Mat();
    let dsize = new cv.Size(300, 300);
    // You can try more different parameters
    cv.resize(src, dst, dsize, 0, 0, cv.INTER_AREA);
    cv.imshow('dest-canvas', dst);
    src.delete(); dst.delete();
});