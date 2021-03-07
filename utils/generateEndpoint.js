const default_limit = 10;

const generateEndpoint = (category, limit) => {
  if (
    category == "all_news" ||
    category == "trending" ||
    category == "top_stories"
  )
    return `https://inshorts.com/api/en/news?category=${category}&include_card_data=true&max_limit=${
      limit ? limit : default_limit
    }`;

  return `https://inshorts.com/api/en/search/trending_topics/${category}&max_limit=${
    limit ? limit : default_limit
  }&type=NEWS_CATEGORY`;
};

module.exports = {
  generateEndpoint,
};
