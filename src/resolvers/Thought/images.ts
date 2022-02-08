import { ThoughtResolvers } from "~/generated/graphql";

export const images: ThoughtResolvers["images"] = async (
  parent,
  _,
  { prisma }
) => {
  const images = await prisma.thought
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .images();

  return images;
};
