import React, { useEffect, useState } from "react";
import axios from "axios";

const CivicNewsMap = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(
          `https://gnews.io/api/v4/search?q=civic+issues+india&lang=en&country=in&max=5&apikey=efd25b5153b8c06340a446ccaae28540`
        );
        setNews(res.data.articles);
      } catch (err) {
        console.error("News fetch failed:", err);
      }
    };
    fetchNews();
  }, []);

  return (
    <div style={{ padding: "1rem", background: "#f4f4f4", marginBottom: "2rem" }}>
      <h2>📰 Real Civic News</h2>
      {news.map((article, i) => (
        <div key={i} style={{ marginBottom: "1rem" }}>
          <strong>{article.title}</strong> <br />
          <em>{article.source.name}</em> | <small>{new Date(article.publishedAt).toLocaleString()}</small>
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noreferrer">Read More</a>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default CivicNewsMap;
