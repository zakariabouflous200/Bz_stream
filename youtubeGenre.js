const API_KEY = 'AIzaSyDJxTKi_f1yXKzExhoMwP1tFBNmvi81PZQ';

// Fonction pour récupérer la liste des genres depuis l'API YouTube
function fetchYouTubeGenres() {
    const API_URL = `https://www.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=${API_KEY}`;

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            // Vous pouvez maintenant traiter les données pour afficher les genres
            displayGenres(data.items);
        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors de la récupération des genres :', error);
        });
}

// Fonction pour afficher les genres
function displayGenres(genres) {
    const genreSelect = document.querySelector('#genre-select');

    // Parcourez les genres et ajoutez-les à la liste déroulante
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.snippet.title;
        genreSelect.appendChild(option);
    });

    // Gestionnaire d'événements lorsque l'utilisateur sélectionne un genre dans la liste déroulante
    genreSelect.addEventListener('change', event => {
        const selectedGenreId = event.target.value;
        fetchVideosByGenre(selectedGenreId);
    });
}

// Fonction pour récupérer des vidéos par genre
function fetchVideosByGenre(genreId) {
    const API_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=9&videoCategoryId=${genreId}&key=${API_KEY}`;

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            // Vous pouvez maintenant traiter les données pour afficher les vidéos dans le genre sélectionné
            displayVideos(data.items);
        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors de la récupération des vidéos :', error);
        });
}

// Fonction pour afficher les vidéos dans le genre sélectionné
function displayVideos(videos) {
    const genreVideosSection = document.querySelector('#genre-videos');

    // Effacez le contenu précédent s'il y en a
    genreVideosSection.innerHTML = '';

    // Parcourez les vidéos et affichez-les
    videos.forEach(video => {
        const videoCard = document.createElement('div');
        videoCard.classList.add('video-card2');
        videoCard.innerHTML = `
            <h2>${video.snippet.title}</h2>
            <p>Publiée le : ${new Date(video.snippet.publishedAt).toLocaleDateString()}</p>
            <iframe width="350" height="280" src="https://www.youtube.com/embed/${video.id}" frameborder="0" allowfullscreen></iframe>
        `;

        genreVideosSection.appendChild(videoCard);
    });

    // Ajustez la hauteur de la section en fonction du nombre de vidéos
    const videoCardHeight = genreVideosSection.querySelector('.video-card2').offsetHeight;
    const numVideos = videos.length;
    const numRows = Math.ceil(numVideos / 3); // Supposant 3 vidéos par ligne
    const newHeight = numRows * videoCardHeight;

    // Ajustez la hauteur de la section #genres en utilisant des unités vh
    const genresSection = document.querySelector('#genres');
    genresSection.style.height = `calc(${newHeight}px + 40vh)`; // Vous pouvez ajuster la taille selon vos besoins
}

// Au chargement de la page, récupérez les genres depuis YouTube
fetchYouTubeGenres();
