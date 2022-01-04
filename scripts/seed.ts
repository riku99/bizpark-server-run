import { PrismaClient } from "@prisma/client";
import { addHours, addMilliseconds } from "date-fns";

const prisma = new PrismaClient();

const main = async () => {
  const userData = await Promise.all([
    prisma.user.create({
      data: {
        uid: "uid1",
        name: "Riku",
        email: "riku@sample",
        imageUrl:
          "https://kuro-bucket-sample.s3.ap-northeast-1.amazonaws.com/IMG_0261.HEIC",
        bio:
          "初めまして\nBizparkの製作者です。スタートアップでエンジニアインターンとして働いています。\nサービスやビジネスやテクノロジーが好きで、自分で事業を起こすためにプログラムを書き始めました。何か要望ありましたら是非メッセージ送ってください!",
      },
    }),
    prisma.user.create({
      data: {
        uid: "deiwodwe",
        name: "You",
        email: "you@sample",
        imageUrl:
          "https://kuro-bucket-sample.s3.ap-northeast-1.amazonaws.com/Open+Peeps+-+Bust.png",
        bio: "大手証券会社でトレーダーしてます。金融全般に興味あります。",
      },
    }),
    prisma.user.create({
      data: {
        uid: "oeriqo",
        name: "長場",
        email: "nagaba@sample",
        imageUrl:
          "https://kuro-bucket-sample.s3.ap-northeast-1.amazonaws.com/%E3%83%9F%E3%83%BC.jpg",
        bio: "メーカーの営業してます。営業のお話しできたらいいなと思ってます!",
      },
    }),
    prisma.user.create({
      data: {
        uid: "djeiowdfjo",
        name: "りさ",
        email: "risa@sample",
        bio: "社会問題に興味のある学生です!",
        imageUrl:
          "https://kuro-bucket-sample.s3.ap-northeast-1.amazonaws.com/CB94078B-EE74-41F3-A005-6EED4B3B0D75.JPG",
      },
    }),
    prisma.user.create({
      data: {
        uid: "alkmcefj",
        name: "Eric",
        email: "eric@sample",
        bio: "アメリカ人です。日本とアメリカの政治的関係について考えています。",
      },
    }),
  ]);

  const ids = [...Array(50).keys()];

  for (const id of ids) {
    try {
      await prisma.thought.create({
        data: {
          text: "seed" + id,
          genre: "BUSINESS",
          contributorId: userData[0].id,
          createdAt: addMilliseconds(new Date(), id * id),
        },
      });
    } catch (e) {
      console.log("unique error");
    }
  }

  const ids2 = [...Array(19).keys()];
  for (const id of ids2) {
    await prisma.thought.create({
      data: {
        text: "politics seed" + id,
        genre: "POLITICS",
        contributorId: userData[1].id,
        createdAt: addMilliseconds(new Date(), id * id),
      },
    });
  }

  await Promise.all([
    prisma.thought.create({
      data: {
        title: "キーエンスの強みを雑に",
        text:
          "大小に関わらず、判断には必ずベネフィットとコストが発生する。例えばキーエンスは直販モデルであり、代理店を使って全国に展開しているほかのメーカーと比べて商品を幅広く売るには非効率に見える。ただ、直販モデルにすることで得られるベネフィットも必ずある。代理店を挟む形だと「顧客からの要望」がメーカー側に伝わりにくい。代理店は売ることが仕事であり、商品を良くすることが仕事ではないからだ。わざわざメーカー側に要望するインセンティブが少ない。対して直販の場合は営業マンは要望の伝達も仕事のうちであり、もはや報告を強制されている可能性もあるだろう。なので顧客の要望を確実に拾うことができ、それが商品力のアップに繋がる。",
        contributorId: userData[0].id,
        genre: "BUSINESS",
        createdAt: addHours(new Date(), 1),
      },
    }),
    prisma.thought.create({
      data: {
        text:
          "コロナ禍においても株価は上昇している。このウイルスをきっかけに新たなテクノロジーが生まれることが期待されている証拠なのかな。",
        contributorId: userData[1].id,
        genre: "ECONOMY",
        createdAt: addHours(new Date(), 2),
      },
    }),
    prisma.thought.create({
      data: {
        title: "ワークマンすごいよね",
        text:
          "ワークマンの専務取締役である土屋さんは三井物産出身。「過度な目標によるプレッシャー」を反省し、大きな1つの目標を掲げ「何年かかってもこれを達成しよう」という経営を行った。大手からの来た人って大手のやり方を推す人多いイメージだけど、柔軟だな〜",
        contributorId: userData[2].id,
        genre: "BUSINESS",
        createdAt: addHours(new Date(), 3),
      },
    }),
    prisma.thought.create({
      data: {
        title: "SDGsのこと",
        text: "SDGsのことはいろいろ取り組まれているけど、もっとすべき",
        contributorId: userData[3].id,
        genre: "SOCIETY",
        createdAt: addHours(new Date(), 4),
      },
    }),
    prisma.thought.create({
      data: {
        text: "アメリカと日本は仲良いデス!",
        contributorId: userData[4].id,
        genre: "POLITICS",
        createdAt: addHours(new Date(), 5),
      },
    }),
    prisma.thought.create({
      data: {
        title: "TOYOTA",
        text:
          "トヨタ自動車株式会社（トヨタじどうしゃ、英: Toyota Motor Corporation、通称: トヨタ、TMC）は、日本はもちろん、世界を代表する大手自動車メーカーである。豊田自動織機を源流とするトヨタグループの中核企業。ダイハツ工業と日野自動車の親会社、SUBARUの筆頭株主である。",
        genre: "BUSINESS",
        contributorId: userData[0].id,
        createdAt: addHours(new Date(), 6),
      },
    }),
    prisma.thought.create({
      data: {
        title: "HONDA",
        text:
          "本田技研工業株式会社（ほんだぎけんこうぎょう、英称: Honda Motor Co., Ltd.）は、東京都港区に本社を置く日本の大手輸送機器メーカーである。通称「Honda」、「ホンダ」。オートバイの販売台数、売上高は世界首位[2]。自動車の販売台数は世界第7位（2015年度）[3]、国内2位。小型ジェット機の出荷数、芝刈機のシェアは世界首位。発電機、除雪機、小型耕うん機のシェアは国内首位。日経平均株価およびTOPIX Core30、JPX日経インデックス400の構成銘柄の一つ[",
        genre: "BUSINESS",
        contributorId: userData[0].id,
        createdAt: addHours(new Date(), 7),
      },
    }),
    prisma.thought.create({
      data: {
        title: "LINE",
        text:
          "LINE株式会社（ライン、英: LINE Corporation）は、Zホールディングスの完全子会社で、コミュニケーションアプリ「LINE」を中心にインターネット関連事業を展開する日本の企業。現在の法人は2019年に初代法人の中間持株会社化に伴って設立された2代目",
        genre: "BUSINESS",
        contributorId: userData[0].id,
        createdAt: addHours(new Date(), 8),
      },
    }),
    prisma.thought.create({
      data: {
        text: "aaa",
        genre: "BUSINESS",
        contributorId: userData[0].id,
        createdAt: addHours(new Date(), 9),
      },
    }),
    prisma.thought.create({
      data: {
        title: "サイバーエージェント",
        text:
          "株式会社サイバーエージェント（CyberAgent, Inc.）は、インターネット広告事業、メディア事業、ゲーム事業を主とする日本の会社。日経平均株価の構成銘柄の一つ[5]。",
        genre: "BUSINESS",
        contributorId: userData[0].id,
        createdAt: addHours(new Date(), 10),
      },
    }),
  ]);
};

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
