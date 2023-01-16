// Creating API KEY with Axios
const api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1/'
});
api.defaults.headers.common['x-api-key'] = 'live_UNVCidtCuuYSZf0bbcEsrIKuniGxAySa8gkerDa9bzmSh6EHo91to9zZkjlYSVA7';


// API KEY
const API_KEY = 'live_UNVCidtCuuYSZf0bbcEsrIKuniGxAySa8gkerDa9bzmSh6EHo91to9zZkjlYSVA7';

// URL for Random Kitties
const FULL_RANDOM = [
    'https://api.thecatapi.com/v1/images/search',
    '?limit=4',   
    `&api_key=${API_KEY}`,
].join('');

// URL for favorites
const FULL_FAVORITES = [
    'https://api.thecatapi.com/v1/favourites',
    `?api_key=${API_KEY}`,
].join('');

// URL for uploads
const FULL_UPLOAD = [
    'https://api.thecatapi.com/v1/images/upload',
    `?api_key=${API_KEY}`,
].join('');
const spanError = document.getElementById('error')

// Show 3 Random Kitties
async function loadRandomMichis(){
    const res = await fetch(FULL_RANDOM);
    const data = await res.json();

    if(res.status !== 200){
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    }else{

    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const btn3 = document.getElementById('btn3');

    // Add images url from Array
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;

    // Add onClick using id from array
    btn1.onclick = () => saveFavorite(data[0].id);
    btn2.onclick = () => saveFavorite(data[1].id);
    btn3.onclick = () => saveFavorite(data[2].id);

    }
}

// Show Favorite Kitties
async function loadFavoritesMichis(){
    const res = await fetch(FULL_FAVORITES);
    const data = await res.json();
    
    if(res.status !== 200){
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    }else{
        
        const section = document.getElementById('favoriteCats');  
        section.innerHTML = "";
 
        data.forEach(kittie => {

            const article = document.createElement('article');
            const img = document.createElement('img');
            const button = document.createElement('button');
            const buttonText = document.createTextNode('X'); 

            // Creating html dynamically
            button.appendChild(buttonText);
            button.onclick = () => deleteFavorite(kittie.id);
            img.src = kittie.image.url;
            article.appendChild(img);
            article.appendChild(button);
            section.appendChild(article);
        })   
    }
}

// Save as a favorite
async function saveFavorite(id){
    const { data, status } = await api.post('/favourites', {
        image_id: id
    }); 

    if(status !== 200){
        spanError.innerHTML = `Error: ${status} ${data.message}`;
    }else{
        console.log('Guardado bien')
        loadFavoritesMichis();
    }
}


// Delete from favorites
async function deleteFavorite(id){
    const favouriteId = id
    const res = await fetch(`https://api.thecatapi.com/v1/favourites/${favouriteId}?api_key=live_UNVCidtCuuYSZf0bbcEsrIKuniGxAySa8gkerDa9bzmSh6EHo91to9zZkjlYSVA7`, {
        method: 'DELETE',
        headers:{
         'x-api-key': API_KEY,
        }
    });

    const data = await res.json();
   
    if(res.status !== 200){
        spanError.innerHTML = `Error: ${status} ${data.message}`;
    }else{
        console.log('Eliminado bien')
        loadFavoritesMichis();
    }

}

async function uploadPhoto(){
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);

    console.log(formData.get('file'))

    const res = await fetch(FULL_UPLOAD, {
        method: 'POST',
        headers:{
            'x-api-key': API_KEY,
        },
        body: formData,
    });
    if (res.status !== 201) {
        spanError.innerHTML = `Error: ${res.status} ${data.message}`;
    }
    else {
        console.log("Loaded correctly");
        console.log({ data });
        console.log(data.url);
        saveFavorite(data.id) // Added to favorites
    }
}


loadRandomMichis();
loadFavoritesMichis();

