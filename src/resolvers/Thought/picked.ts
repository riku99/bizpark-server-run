import { ThoughtResolvers } from "~/generated/graphql";

export const picked: ThoughtResolvers["picked"] = async (
  parent,
  _,
  { requestUser, prisma }
) => {
  if (!requestUser) {
    return false;
  }

  const picked = await prisma.thought
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .picked({
      where: {
        pickerId: requestUser?.id,
      },
    });

  return !!picked.length;
};
