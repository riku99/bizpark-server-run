import { NewsTalkRoomResolvers } from "~/generated/graphql";
import { allMessageSeen } from "./allMessageSeen";
import { members } from "./members";

export const NewsTalkRoom: NewsTalkRoomResolvers = {
  allMessageSeen,
  members,
};
