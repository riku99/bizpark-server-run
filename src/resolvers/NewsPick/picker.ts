import { NewsPickResolvers } from "~/generated/graphql";

export const picker: NewsPickResolvers["picker"] = async (
  parent,
  _,
  { prisma }
) => {
  const picker = await prisma.newsPick
    .findUnique({
      where: {
        id: parent.id,
      },
    })
    .picker();

  return picker;
};
