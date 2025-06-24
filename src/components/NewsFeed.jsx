import React, { useEffect, useState } from "react";

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(
          `https://newsapi.org/v2/top-headlines?country=in&category=general&pageSize=5&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
        );
        const data = await res.json();
        if (data.status === "ok" && data.articles) {
          setArticles(data.articles);
        } else {
          setArticles([]); // fallback if something is wrong
        }
      } catch (error) {
        console.error("News API error:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <h2>📰 Civic News</h2>
      {loading ? (
        <p>Loading headlines...</p>
      ) : articles.length > 0 ? (
        <ul>
          {articles.map((article, i) => (
            <li key={i} style={{ marginBottom: "1rem" }}>
              <a href={article.url} target="_blank" rel="noreferrer">
                <strong>{article.title}</strong>
              </a>
              <p>{article.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No news available at the moment.</p>
      )}
    </div>
  );
};

export default NewsFeed;
