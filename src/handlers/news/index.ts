import { getGoogleNews } from "./getGoogleNews";
import { getAllNewsData } from "./getNewsData";
import { getNewscatcher } from "./getNewscatcher";
import { getBingNews } from "./getBingNews";

export const getNews = async () => {
  await Promise.all([
    getGoogleNews(),
    getAllNewsData(),
    getNewscatcher(),
    getBingNews(),
  ]);
};
