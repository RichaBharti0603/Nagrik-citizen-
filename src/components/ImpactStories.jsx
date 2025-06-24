import React from "react";

const videos = [
  {
    title: "Swachh Bharat: A People's Movement",
    url: "https://www.youtube.com/embed/Uv0J2WHvRHY",
  },
  {
    title: "India’s Smart Cities Mission",
    url: "https://www.youtube.com/embed/AlVY8UpxP7I",
  },
  {
    title: "RTI Success Story – Know Your Rights",
    url: "https://www.youtube.com/embed/N1WAm4iWkHk",
  },
];

const ImpactStories = () => {
  return (
    <div>
      <h2>🌍 Stories of Change</h2>
      {videos.map((video, i) => (
        <div key={i} style={{ marginBottom: "1.5rem" }}>
          <h4>{video.title}</h4>
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
            <iframe
              src={video.url}
              title={video.title}
              frameBorder="0"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            ></iframe>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImpactStories;
