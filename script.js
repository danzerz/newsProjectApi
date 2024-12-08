// news api
const newsApiKey = "6d0ff5e6744244b1a7141f2783825110";
// Unsplash API
const unsplashAccessKey = "sEelj7rMUH_ebeQVcDUqZKq45d01w-zCO4T8Bfso_TM";

const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`;
const newsContainer = document.getElementById("newsContainer");
// fetching news api
async function fetchNews() {
  try {
    // Fetch news data
    const response = await fetch(newsApiUrl);
    // Parse the JSON response
    const data = await response.json();
    // Call display function with articles
    displayNews(data.articles);
  } catch (error) {
    // logging any potential error to the console
    console.error("Error fetching news:", error);
    newsContainer.innerText = "Error loading news.";
  }
}

// feting images from unsplash
async function fetchImage(query) {
  try {
    //Unsplash API URL

    const unsplashUrl = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
      query
    )}&client_id=${unsplashAccessKey}`;
    // Fetch image data
    const response = await fetch(unsplashUrl);
    // Fetch image data
    // Return the first image URL or a placeholder if none found

    const data = await response.json();
    return data.results.length > 0
      ? data.results[0].urls.small
      : "https://via.placeholder.com/300";
  } catch (error) {
    console.error("Error fetching image:", error);
    return "https://via.placeholder.com/300";
  }
}

// Function to display news articles in the DOM
async function displayNews(articles) {
  // Clear  news content
  newsContainer.innerHTML = "";
  for (const article of articles) {
    // Fetch an image for the article

    const imageUrl = await fetchImage(article.title || "news");
    const newsCard = document.createElement("div");
    // Add a class for styling

    newsCard.className = "news-card";

    newsCard.innerHTML = `
      <img src="${imageUrl}" alt="News Image">
      <div class="news-card-content">
        <h2>${article.title}</h2>
        <p>${article.description || "No description available."}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      </div>
    `;
    // Append the card to the container

    newsContainer.appendChild(newsCard);
  }
}

// Call the fetchNews function to initialize and load news
fetchNews();
