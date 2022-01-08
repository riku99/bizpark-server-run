export type GoogleNewsArticle = {
  id: string;
  title: string;
  link: string;
  published: string;
  source: {
    href: string;
    title: string;
  };
};
export type GoogleNewsTopic = "BUSINESS" | "TECHNOLOGY";

// https://api.rakuten.net/algodom-media-algodom-media-default/api/newsdata2?endpoint=apiendpoint_3be2ebd4-edfc-4d7f-9eda-225f2a4c7d80

export type NewsDataResult = {
  title: string;
  link: string;
  pubDate: string;
  source_id: string;
};

export type NewsDataResponse = {
  status: string;
  totalResults: number;
  results: NewsDataResult[];
  nextPage: number | null;
};

export type NewsDataCategory = "politics";

export type NewsDataSourceResult = {
  id: string; // ex) nhk
  name: string; // ex) NHK
};

export type NewscatcherArticle = {
  title: string;
  link: string;
  media: string; // 関連画像
  published_date: string;
  rights: string;
};

export type NewscatcherTopic = "business" | "finance" | "politics";
