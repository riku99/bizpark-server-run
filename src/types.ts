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
