// Unsplash API
const count = 5;
const apiKey = 'XRmRtAtu8af8kFidIpO2SYwV6gBSueyZrb_u5BXGLLI';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
 
/* Get photos from Unsplash API  */
async function getPhotos () {
try {
    const response = await fetch(apiUrl);
    const data = await response. json () ;
    console. log (data);
} catch (error) {
// Catch Error Here
    }
}

//On Load
getPhotos();