import { MutationResolvers } from "~/generated/graphql";
import { ForbiddenError } from "apollo-server-cloud-functions";

export const createThought: MutationResolvers["createThought"] = async (
  _,
  { input },
  { prisma, requestUser }
) => {
  if (!requestUser) {
    throw new ForbiddenError("auth error");
  }

  const thought = await prisma.thought.create({
    data: {
      title: input.title,
      text: input.text,
      contributorId: requestUser.id,
      genre: input.genre,
    },
  });

  const promises: Promise<any>[] = [];
  input.images?.forEach((image) => {
    promises.push(
      prisma.thoughtImage.create({
        data: {
          url: image.url,
          width: image.width,
          height: image.height,
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
