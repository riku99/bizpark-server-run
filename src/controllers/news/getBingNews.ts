import { default as axios } from "axios";
import { prisma } from "../../lib/prisma";
import { BingNewsValue, BingNewsCategory } from "~/types";
import { NewsGenre } from "@prisma/client";

const headers = {
  "x-bingapis-sdk": "true",
  "x-rapidapi-key": process.env.RAKUTEN_RAPID_API_KEY as string,
  "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
  useQueryString: "true",
};

const cc = "ja";
const safeSearch = "Off";
const textFormat = "Raw";

const getBingNewsWithCategory = async ({
  category,
}: {
  category: BingNewsCategory;
}) => {
  const endpoint = "https://bing-news-search1.p.rapidapi.com/news";

  let genre: NewsGenre;
  switch (category) {
    case "Business":
      genre = "BUSINESS";
      break;
    case "Politics":
      genre = "POLITICS";
      break;
  }

  try {
    const {
      data,
    } = await axios.get(
      `${endpoint}?cc=${cc}&safeSearch=${safeSearch}&textFormat=${textFormat}`,
      { headers }
    );

    const prismaPromises: Promise<any>[] = [];
    const value = data.value as BingNewsValue[];

    value.forEach((v) => {
      const { name, url, provider, datePublished, image } = v;
      if (name && url) {
        prismaPromises.push(
          prisma.news.create({
            data: {
              title: name,
              link: url,
              provider: provider[0].name,
              articleCreatedAt: new Date(datePublished),
              genre,
              image: image ? image.thumbnail.contentUrl : null,
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

const bingNewsCategories: BingNewsCategory[] = ["Business", "Politics"];

export const getBingNews = async () => {
  const promises: Promise<any>[] = [];
  bingNewsCategories.forEach((category) => {
    promises.push(getBingNewsWithCategory({ category }));
  });
};
