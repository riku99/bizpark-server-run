import { ThoughtResolvers } from "~/generated/graphql";

export const contributor: ThoughtResolvers["contributor"] = async (
  parent,
  _,
  { prisma, requestUser }
) => {
  const contributor = await prisma.thought
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .contributor();

  return contributor;
};
