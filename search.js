// Replace 'YOUR_API_KEY' with your actual YouTube API key
const apiKey = 'AIzaSyDJxTKi_f1yXKzExhoMwP1tFBNmvi81PZQ';

document.getElementById('input__button__shadow').addEventListener('click', searchYouTube);

function searchYouTube() {
    const searchTerm = document.getElementById('input__search').value;
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${searchTerm}&part=snippet&type=video&maxResults=10`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayResults(data.items);
        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors de la recherche :', error);
        });
}

function displayResults(videos) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';

    videos.forEach(video => {
        const videoDiv = document.createElement('div');
        videoDiv.classList.add('video');

        const videoTitle = document.createElement('h2');
        videoTitle.textContent = video.snippet.title;

        const videoThumbnail = document.createElement('img');
        videoThumbnail.src = video.snippet.thumbnails.medium.url;

        const videoLink = document.createElement('a');
        videoLink.href = `https://www.youtube.com/watch?v=${video.id.videoId}`;
        videoLink.target = '_blank';
        videoLink.appendChild(videoThumbnail);

        videoDiv.appendChild(videoLink);
        videoDiv.appendChild(videoTitle);

        resultsContainer.appendChild(videoDiv);
    });
}
