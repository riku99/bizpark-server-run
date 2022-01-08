import { getGoogleNews } from "./getGoogleNews";
import { getAllNewsData } from "./getNewsData";

const getNews = async () => {
  await Promise.all([getGoogleNews(), getAllNewsData()]);
};

getNews();
