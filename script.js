const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

// Unsplash API
// const count = 5; is the initial load
const count = 5;
const apiKey = 'i8bc1RRtY12DAKgqjWIte0D5rA_iOXTtcMo6b0kO0QA';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    initialLoad = false;
    // const count = 30; is the load after 
    count = 30;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
  
}

//Helper Function to set attributes on DOM Elements
function setAttributes(element, { href, target, src, alt, title }) {
  element.setAttribute('href', href);
  element.setAttribute('target', target);
  element.setAttribute('src', src);
  element.setAttribute('alt', alt);
  element.setAttribute('title', title);
}


//Create Elements for Links & Photos,Add to DOM
function displayPhotos() {
    imagesLoaded = 0;
  totalImages = photosArray.length;
  // Run function for each object in photosArray
    photosArray.forEach((photo) => {
    // Create <a> to link to full photo
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);

  });
}

/* Get photos from Unsplash API  */
async function getPhotos() {
  const response = await fetch(apiUrl);
  photosArray = await response.json();
  displayPhotos();
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

//On Load
getPhotos();