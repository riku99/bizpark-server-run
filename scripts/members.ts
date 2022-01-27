import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

// 一時的なseedaスクリプトだよ
const createThoughtTalkRoomMembers = async () => {
  const userIds = [...Array(30).keys()];
  for (const id of userIds) {
    try {
      const u = await prisma.user.create({
        data: {
          uid: "uidis" + id,
          name: "seedUser" + id,
          email: `address${id}@seed.com`,
        },
      });

      await prisma.thoughtTalkRoomMember.create({
        data: {
          talkRoomId: 11,
          userId: u.id,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
};

createThoughtTalkRoomMembers();
