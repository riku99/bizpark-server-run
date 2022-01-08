import { getGoogleNews } from "./getGoogleNews";
import { getAllNewsData } from "./getNewsData";
import { getNewscatcher } from "./getNewscatcher";
import { getBingNews } from "./getBingNews";

const getNews = async () => {
  await Promise.all([
    getGoogleNews(),
    getAllNewsData(),
    getNewscatcher(),
    getBingNews(),
  ]);
};

getNews();
