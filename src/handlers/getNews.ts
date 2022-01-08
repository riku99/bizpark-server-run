import { default as axios } from "axios";
import { prisma } from "../lib/prisma";
import { GoogleNewsArticle, GoogleNewsTopic } from "~/types";
import { NewsGenre } from "@prisma/client";

const getGoogleNewsWithTopics = async ({
  topic,
}: {
  topic: GoogleNewsTopic;
}) => {
  const endpoint = process.env.RAKUTEN_RAPID_API_KEY;
  const lang = "jp";
  const country = "JP";
  let genre: NewsGenre;
  switch (topic) {
    case "BUSINESS":
      genre = "BUSINESS";
      break;
    case "TECHNOLOGY":
      genre = "TECHNOLOGY";
      break;
  }

  const headers = {
    "x-rapidapi-key": "1beaf1dd23msh2fc296d43f143edp1fa377jsn40e17fa594e1",
    "x-rapidapi-host": "google-news.p.rapidapi.com",
    useQueryString: "true",
  };

  try {
    const {
      data,
    } = await axios.get(
      `${endpoint}?lang=${lang}&country=${country}&topic=${topic}`,
      { headers }
    );

    const prismaPromises: Promise<any>[] = [];
    const articles = data.articles as GoogleNewsArticle[];
    articles.forEach((article) => {
      prismaPromises.push(
        prisma.news.create({
          data: {
            title: article.title,
            link: article.link,
            provider: article.source.title,
            articleCreatedAt: new Date(article.published),
            genre,
          },
        })
      );
    });

    await Promise.all(prismaPromises);
  } catch (e) {
    console.log(e);
  }
};

const googleNewsTopics: GoogleNewsTopic[] = ["BUSINESS", "TECHNOLOGY"];
const getGoogleNews = async () => {
  const promises: Promise<any>[] = [];
  googleNewsTopics.forEach((topic) => {
    promises.push(getGoogleNewsWithTopics({ topic }));
  });
  await Promise.all(promises);
};

const getNews = async () => {
  await Promise.all([getGoogleNews()]);
};

getNews();
