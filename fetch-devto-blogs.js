// fetch-devto-blogs.js
import { writeFile } from 'fs/promises';
import fetch from 'node-fetch';

const DEVTO_USERNAME = 'parshuram_singh';
const DEVTO_API_URL = `https://dev.to/api/articles?username=${DEVTO_USERNAME}&per_page=100`;

async function fetchDevtoBlogs() {
  try {
    const response = await fetch(DEVTO_API_URL);
    const articles = await response.json();

    const formattedBlogs = articles.map((article, index) => ({
      id: index + 1,
      title: article.title,
      description: article.description,
      url: article.url,
      cover_image: article.cover_image || '',
      published_at: article.published_at,
      public_reactions_count: article.public_reactions_count,
    }));

    await writeFile('./public/blogs.json', JSON.stringify(formattedBlogs, null, 2));
    console.log('✅ blogs.json updated successfully!');
  } catch (error) {
    console.error('❌ Failed to fetch blogs:', error);
    process.exit(1);
  }
}

fetchDevtoBlogs();
