import { getGoogleNews } from "./getGoogleNews";
import { getAllNewsData } from "./getNewsData";
import { getNewscatcher } from "./getNewscatcher";

const getNews = async () => {
  await Promise.all([getGoogleNews(), getAllNewsData(), getNewscatcher()]);
};

getNews();
