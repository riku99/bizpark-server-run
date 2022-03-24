import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const create = async () => {
  const ns = [...Array(40).keys()];

  for (const n of ns) {
    try {
      await prisma.notification.create({
        data: {
          userId: 'f4b3860e-1ebc-4a93-a7c5-3622b639fa2c',
          performerId: '5b81b4e2-15bf-48a0-adb0-faa370bb2f57',
          type: 'FOLLOW',
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
};

create();
