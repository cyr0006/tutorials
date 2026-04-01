// processMyImage.js
function processImage(img, cv) {
    let src = cv.imread(img);

    // Convert to grayscale
    let gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

    // Light Gaussian blur to reduce noise
    let blurred = new cv.Mat();
    cv.GaussianBlur(gray, blurred, new cv.Size(3, 3), 0);

    // Adaptive threshold (better for uneven lighting)
    let thresh = new cv.Mat();
    cv.adaptiveThreshold(
        blurred,
        thresh,
        255,
        cv.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv.THRESH_BINARY,
        11,
        2
    );

    // Optional: Morphological opening to remove small specks
    let kernel = cv.Mat.ones(1, 1, cv.CV_8U);
    let cleaned = new cv.Mat();
    cv.morphologyEx(thresh, cleaned, cv.MORPH_OPEN, kernel);

    // Cleanup
    src.delete();
    gray.delete();
    blurred.delete();
    thresh.delete();
    kernel.delete();

    return cleaned;
}

module.exports = { processImage };