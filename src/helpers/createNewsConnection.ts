import { News, NewsPick } from "@prisma/client";

type N = (News & {
  picked: NewsPick[];
})[];

export const createNewsConnection = async ({
  news,
  count,
  after,
  first,
}: {
  news: N;
  count: number;
  after: number | null;
  first: number;
}) => {
  let hasNextPage: boolean;
  let hasPreviousPage: boolean;

  if (after) {
    hasNextPage = count - first > 0;
    hasPreviousPage = true;
  } else {
    hasNextPage = count > first;
    hasPreviousPage = false;
  }

  const pageInfo = {
    hasNextPage,
    hasPreviousPage,
    startCursor: news[0].cursor,
    endCursor: news[news.length - 1].cursor.toString(),
  };

  const convertedNews = news.map((n) => {
    const picked = !!n.picked.length;
    return {
      ...n,
      picked,
    };
  });

  const edges = convertedNews.map((n) => {
    return {
      node: n,
      cursor: n.cursor.toString(),
    };
  });

  return {
    edges,
    pageInfo,
  };
};
