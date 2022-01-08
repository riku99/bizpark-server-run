import { default as axios } from "axios";
import { prisma } from "../../lib/prisma";
import { NewsDataResponse } from "~/types";

// piliticsのみ
// 2022/01/08現在politicsの場合 source_id が nhk のみなので provider はとりあえずNHKに固定
const getNewsData = async ({ page = 1 }: { page: number }) => {
  const endpoint = "https://newsdata2.p.rapidapi.com/news";
  const country = "jp";
  const category = "politics";
  const language = "jp";

  const headers = {
    "x-rapidapi-key": process.env.RAKUTEN_RAPID_API_KEY as string,
    "x-rapidapi-host": "newsdata2.p.rapidapi.com",
    useQueryString: "true",
  };

  try {
    const { data } = await axios.get<NewsDataResponse>(
      `${endpoint}?country=${country}&category=${category}&language=${language}&page=${page}`,
      { headers }
    );

    const prismaPromises: Promise<any>[] = [];
    const results = data.results;

    results.forEach((result) => {
      prismaPromises.push(
        prisma.news.create({
          data: {
            title: result.title,
            link: result.link,
            articleCreatedAt: new Date(result.pubDate),
            provider: result.source_id === "nhk" ? "NHK" : "不明",
            genre: "POLITICS",
          },
        })
      );
    });

    await Promise.all(prismaPromises);

    return data.nextPage;
  } catch (e) {
    console.log(e);
    return;
  }
};

export const getAllNewsData = async () => {
  let nextPage: number | null | undefined = 1;
  while (nextPage) {
    nextPage = await getNewsData({ page: nextPage });
  }
};

getAllNewsData();
