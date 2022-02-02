import { NewsTalkRoomResolvers } from "~/generated/graphql";
import { allMessageSeen } from "./allMessageSeen";

export const NewsTalkRoom: NewsTalkRoomResolvers = {
  allMessageSeen,
};
