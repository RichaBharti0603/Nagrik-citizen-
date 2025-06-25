import React, { useEffect, useState } from "react";

function NewsFeed() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("https://nagrik-citizen.onrender.com/api/news")
      .then((res) => res.json())
      .then((data) => setNews(data.articles || []))
      .catch((err) => console.error("News Fetch Error", err));
  }, []);

  return (
    <div>
      <h2>📰 News Feed</h2>
      <ul>
        {news.length > 0 ? (
          news.map((item, index) => (
            <li key={index}>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
            </li>
          ))
        ) : (
          <p>Loading news...</p>
        )}
      </ul>
    </div>
  );
}

export default NewsFeed;
