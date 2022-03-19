import { QueryResolvers, CustomErrorResponseCode } from "~/generated/graphql";
import { ForbiddenError, ApolloError } from "apollo-server-express";

export const oneNews: QueryResolvers["oneNews"] = async (
  _,
  { id },
  { requestUser, prisma }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const news = await prisma.news.findUnique({
    where: {
      id,
    },
  });

  if (!news) {
    throw new ApolloError(
      "ニュースが見つかりませんでした",
      CustomErrorResponseCode.InvalidRequest
    );
  }

  return news;
};
