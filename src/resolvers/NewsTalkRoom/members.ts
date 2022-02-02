import { NewsTalkRoomResolvers } from "~/generated/graphql";

const DEFAULT_TAKE_COUNT = 6;

export const members: NewsTalkRoomResolvers["members"] = async (
  parent,
  _,
  { requestUser, prisma }
) => {};
