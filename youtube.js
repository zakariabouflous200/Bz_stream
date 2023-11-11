document.addEventListener('DOMContentLoaded', function () {
    const API_KEY = 'AIzaSyDJxTKi_f1yXKzExhoMwP1tFBNmvi81PZQ'; 
    const API_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&maxResults=9&key=${API_KEY}`;

    async function fetchTrendingVideos() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('La requête vers l\'API YouTube a échoué.');
            }

            const data = await response.json();

            if (!data.items) {
                throw new Error('Aucune vidéo trouvée dans la réponse de l\'API YouTube.');
            }

            const trendingVideosSection = document.getElementById('trending-videos');

            if (!trendingVideosSection) {
                throw new Error('L\'élément #trending-videos n\'a pas été trouvé dans le document.');
            }

            data.items.forEach((video) => {
                const videoCard = document.createElement('div');
                videoCard.classList.add('video-card');
                
                const canvas = document.createElement('canvas');
                canvas.classList.add('video-thumbnail');
                canvas.width = 320;
                canvas.height = 180;
                
                const context = canvas.getContext('2d');
            
                const thumbnailImage = new Image();
                thumbnailImage.src = video.snippet.thumbnails.medium.url;
            
                thumbnailImage.onload = () => {
                    // Dessinez l'image sur le canevas
                    context.drawImage(thumbnailImage, 0, 0, canvas.width, canvas.height);

                    videoCard.innerHTML = `
                        <h2>${video.snippet.title}</h2><br>
                        <p>Durée : ${parseDuration(video.contentDetails.duration)}</p>
                        <p>Auteur : ${video.snippet.channelTitle}</p>
                        <p>Publiée le : ${new Date(video.snippet.publishedAt).toLocaleDateString()}</p>
                        <br>
                    `;
            
                    videoCard.appendChild(canvas);
                };
            
                // Ajoutez un gestionnaire d'événements pour ouvrir la vidéo en plein écran
                videoCard.addEventListener('click', () => {
                    const videoId = video.id;
                    const videoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            
                    // Ouvrez la vidéo en plein écran dans une nouvelle fenêtre
                    window.open(videoUrl, '_blank');
                });

                trendingVideosSection.appendChild(videoCard);
            });
        } catch (error) {
            console.error('Une erreur s\'est produite :', error);
        }
    }


    // Fonction pour analyser la durée de la vidéo au format ISO 8601
    function parseDuration(duration) {
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        const hours = parseInt(match[1]) || 0;
        const minutes = parseInt(match[2]) || 0;
        const seconds = parseInt(match[3]) || 0;
        return `${hours}h ${minutes}m ${seconds}s`;
    }

    fetchTrendingVideos();
});
