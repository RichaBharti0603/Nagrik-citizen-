import React, { useEffect, useState } from "react";

const PublicInputEmbed = ({ url }) => {
  const [embedHtml, setEmbedHtml] = useState("");

  useEffect(() => {
    const fetchEmbed = async () => {
      const res = await fetch(
        `https://api.embed.ly/1/oembed?url=${encodeURIComponent(url)}&key=YOUR_EMBEDLY_API_KEY`
      );
      const data = await res.json();
      setEmbedHtml(data.html);
    };

    fetchEmbed();
  }, [url]);

  return (
    <div dangerouslySetInnerHTML={{ __html: embedHtml }} />
  );
};

export default PublicInputEmbed;
