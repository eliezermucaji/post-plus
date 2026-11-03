// main variables
const userProfile = document.getElementById('profile-image');
const userName = document.getElementById('u-user-name')
const backgroundImage = document.getElementById('background-image');
const postText = document.getElementById('post-description');

// destines
const userProfileLocation = document.getElementById('user-profile-img-inside');
const backgroundImageLocation = document.getElementById('background-image-location');


const userNameLocation = document.querySelector('.user-name-n');
const postDescription = document.querySelector('.innerr-post-text');

const setImage = (image, destine)=>{
    const baseUrl = URL.createObjectURL(image);
    destine.src = baseUrl;
}

console.log(userProfileLocation)

userProfile.addEventListener('change', (e)=>{
    if(e.target.files.length > 0) {
        const myFile = e.target.files[0];
        const baseUrl = URL.createObjectURL(myFile);
        userProfileLocation.src = baseUrl;
    }
})

backgroundImage.addEventListener('change', (e)=>{
    if(e.target.files.length > 0) {
        const myFile = e.target.files[0];
        const baseUrl = URL.createObjectURL(myFile);
        backgroundImageLocation.src = baseUrl;
    }
})

// Tratamento para textos

//Tratamento do nome do user
userName.addEventListener('input', (e)=>{
    let isAlphabetic = /^[A-Za-z]+$/.test(e.key);
    if(isAlphabetic) {
        userNameLocation.innerText = userName.value;
    }
})

postText.addEventListener('input', (e)=>{
    let isAlphabetic = /^[A-Za-z]+$/.test(e.key);
    if(isAlphabetic) {
        postDescription.innerText = postText.value;
    }
})

const savePostBtn = document.querySelector('.download-post');

savePostBtn.addEventListener('click', async ()=>{

    // Aqui é que vamos chamar o html2canvas, para converter a nossa div em imagem...
    const element = document.querySelector('.image-preview-container');
            
    try {
        // 1. Convert HTML element to Canvas
        const canvas = await html2canvas(element, {
            scale: 2,             // Improves image quality (Retina/High-res)
            useCORS: true,        // Allows loading cross-origin images
            backgroundColor: null, // Keeps background transparent if needed
        });

        // 2. Convert Canvas to a data URL (PNG)
        const image = canvas.toDataURL('image/png');

        // 3. Create a temporary link element to trigger the download
        const link = document.createElement('a');
        link.href = image;
        link.download = 'captured-html.png'; // Name of the downloaded file
        
        // 4. Trigger click and clean up
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        
    } catch (error) {
        console.error('Error capturing element:', error);
    }
});
