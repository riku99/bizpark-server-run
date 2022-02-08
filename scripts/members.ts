import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const salt = "klerjf";

// 一時的なseedスクリプトだよ
const createThoughtTalkRoomMembers = async () => {
  const userIds = [...Array(80).keys()];
  for (const id of userIds) {
    try {
      const u = await prisma.user.create({
        data: {
          uid: "uid" + id + salt,
          name: "seedUser" + id + salt,
          email: `address${id + salt}@seed.com`,
        },
      });

      await prisma.newsTalkRoomMember.create({
        data: {
          talkRoomId: 1,
          userId: u.id,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
};

createThoughtTalkRoomMembers();
