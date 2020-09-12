const axios = require("axios");

const NEWS_API = "e54d80ef1b3f46b8ab791939d81bffe0";
const baseURL = `https://newsapi.org/v2/top-headlines?apiKey=${NEWS_API}&pageSize=10&country=us&category=`;

const getNewsByCategory = async (category) => {
  if (category.toLowerCase() === "headlines") {
    category = "";
  }

  const response = await axios.get(baseURL + category);

  return response.data.articles;
};

const getNews = async (categories) => {
  const news = {};

  for (var i = 0; i < categories.length; i++) {
    news[categories[i]] = await getNewsByCategory(categories[i]);
  }

  return news;
};

module.exports = { getNews };
