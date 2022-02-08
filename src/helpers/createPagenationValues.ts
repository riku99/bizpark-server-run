// 現在アプリ全体でbefore, lastを使う場面がなく、とりあえず今後もなさそうなので一旦 first, after のみを考える
export const createPagenationValues = ({
  first,
  after,
  cursorKey,
}: {
  first: number;
  after?: string | null;
  cursorKey: string;
}) => {
  const decodedAfter = after
    ? Number(Buffer.from(after, "base64").toString())
    : null;
  const take = first;
  const skip = decodedAfter && decodedAfter > 1 ? 1 : 0;
  const cursor = decodedAfter ? { [cursorKey]: decodedAfter } : undefined;

  return {
    after: decodedAfter,
    take,
    skip,
    cursor,
  };
};
