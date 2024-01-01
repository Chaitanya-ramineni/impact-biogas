document.addEventListener("DOMContentLoaded", function () {
  const scannerContainer = document.getElementById("scanner-container");
  const qrVideo = document.getElementById("qr-video");
  const resultDiv = document.getElementById("result");

  let scannedURL = ""; // To store the scanned URL

  // Initialize the scanner
  const scanner = new Instascan.Scanner({ video: qrVideo });

  // Listen for scan event
  scanner.addListener("scan", function (content) {
    resultDiv.textContent = "Scanned QR Code: " + content;
    scannedURL = content;
    
    // Get the user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          
          // Store the location and redirect to the scanned URL
          storeLocationAndRedirect(scannedURL, latitude, longitude);
        },
        function (error) {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported in this browser.");
    }
  });

  // Start scanning
  Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) {
      scanner.start(cameras[0]);
    } else {
      console.error("No cameras found.");
      resultDiv.textContent = "No cameras found.";
    }
  });

  function storeLocationAndRedirect(url, latitude, longitude) {
    // Perform any necessary storage of the location here
    console.log("Stored Location: Latitude", latitude, "Longitude", longitude);
    
    // Redirect to the scanned URL
    window.location.href = url;
  }
  
  // Attach a click event to stop scanning
  qrVideo.addEventListener("click", function () {
    scanner.stop();
    resultDiv.textContent = "Scanning stopped.";
  });
});
