import { MutationResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-cloud-functions";
import { Genre } from "@prisma/client";

export const createThought: MutationResolvers["createThought"] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  // TODO ジャンル可変にする
  const thought = await prisma.thought.create({
    data: {
      title: input.title,
      text: input.text,
      contributorId: requestUser.id,
      genre: Genre.SOCIETY,
    },
  });

  const promises: Promise<any>[] = [];
  input.images?.forEach((image) => {
    promises.push(
      prisma.thoughtImage.create({
        data: {
          url: image,
          thoughtId: thought.id,
        },
      })
    );
  });

  await Promise.all(promises);

  return {
    id: thought.id,
  };
};
