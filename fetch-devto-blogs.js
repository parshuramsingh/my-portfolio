// fetch-devto-blogs.js

const fs = require("fs");
const https = require("https");

const username = "parshuram_singh"; // Your Dev.to username

https.get(`https://dev.to/api/articles?username=${username}`, (res) => {
  let data = "";

  res.on("data", (chunk) => {
    data += chunk;
  });

  res.on("end", () => {
    try {
      const articles = JSON.parse(data).slice(0, 6).map((article) => ({
        id: article.id,
        title: article.title,
        description: article.description,
        url: article.url,
        published_at: article.published_at,
        cover_image: article.cover_image,
      }));

      fs.writeFileSync("public/blogs.json", JSON.stringify(articles, null, 2));
      console.log("✅ blogs.json updated successfully!");
    } catch (err) {
      console.error("❌ Failed to parse response:", err);
    }
  });
}).on("error", (err) => {
  console.error("❌ Error fetching blogs:", err.message);
});
