const { default: axios } = require("axios");
const express = require("express");
const { generateEndpoint } = require("./utils/generateEndpoint");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/shorts", async (req, res) => {
  let { category, limit } = req.query;
  let articles = [];
  if (!category) {
    category = "all_news";
  }

  try {
    const response = await axios.get(generateEndpoint(category, Number(limit)));
    response.data.data.news_list.forEach((short) => {
      const info = short.news_obj;
      articles.push({
        image: info.image_url,
        auther_name: info.author_name,
        title: info.title,
        content: info.content,
        source_url: info.source_url,
        source_name: info.source_name,
        created_At: info.created_at,
        categories: info.category_names,
        bottom_headline: info.bottom_headline,
        bottom_text: info.bottom_text,
        bottom_link: info.bottom_panel_link,
        byline: info.byline_1[0].text,
      });
    });
    return res.json({ success: true, articles });
  } catch (error) {
    return res.json({ success: false, message: "Something goes wrong" });
  }
});

app.listen(PORT, () => console.log("Gator app listening on port 3000!"));
