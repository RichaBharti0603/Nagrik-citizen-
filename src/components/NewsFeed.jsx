import React, { useEffect, useState } from "react";
import "./NewsFeed.css";

function NewsFeed() {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  const NEWS_API_KEY = "YOUR_NEWSAPI_KEY"; // replace this with your key

  useEffect(() => {
    fetch(`https://newsapi.org/v2/top-headlines?country=in&category=general&pageSize=5&apiKey=ff1810b06ab743cf822e10a99c5890e3`)

      .then((res) => res.json())
      .then((data) => setArticles(data.articles))
      .catch((err) => setError("Failed to load news"));
  }, []);

  return (
    <div className="news-feed">
      <h2>📰 Live Civic News</h2>
      {error && <p>{error}</p>}
      <div className="news-list">
        {articles.map((article, idx) => (
          <div key={idx} className="news-card">
            <h4>{article.title}</h4>
            <p>{article.description?.slice(0, 100)}...</p>
            <a href={article.url} target="_blank" rel="noreferrer">Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewsFeed;
