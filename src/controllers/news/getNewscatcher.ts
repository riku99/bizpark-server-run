import { default as axios } from "axios";
import { prisma } from "../../lib/prisma";
import { NewscatcherArticle, NewscatcherTopic } from "~/types";
import { NewsGenre } from "@prisma/client";

const getNewscatcherWithTopic = async ({
  topic,
}: {
  topic: NewscatcherTopic;
}) => {
  const endpoint = "https://newscatcher.p.rapidapi.com/v1/latest_headlines";
  const lang = "ja";
  const media = "True";

  const headers = {
    "x-rapidapi-key": process.env.RAKUTEN_RAPID_API_KEY as string,
    "x-rapidapi-host": "newscatcher.p.rapidapi.com",
    useQueryString: "true",
  };

  let genre: NewsGenre;
  switch (topic) {
    case "business":
      genre = "BUSINESS";
      break;
    case "finance":
      genre = "ECONOMY";
      break;
    case "politics":
      genre = "POLITICS";
      break;
  }

  try {
    const { data } = await axios.get(
      `${endpoint}?lang=${lang}&media=${media}&topic=${topic}`,
      {
        headers,
      }
    );
    const prismaPromises: Promise<any>[] = [];
    const articles = data.articles as NewscatcherArticle[];

    articles.forEach((article) => {
      if (article.title && article.link) {
        prismaPromises.push(
          prisma.news.create({
            data: {
              title: article.title,
              link: article.link,
              provider: article.rights,
              articleCreatedAt: new Date(article.published_date),
              genre,
              image: article.media,
            },
          })
        );
      }
    });

    await Promise.all(prismaPromises);
  } catch (e) {
    console.log(e);
  }
};

const newscatcherTopics: NewscatcherTopic[] = [
  "business",
  "finance",
  "politics",
];

export const getNewscatcher = async () => {
  const promises: Promise<any>[] = [];
  newscatcherTopics.forEach((topic) => {
    promises.push(getNewscatcherWithTopic({ topic }));
  });

  await Promise.all(promises);
};
