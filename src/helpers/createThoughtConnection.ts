import { Thought } from "@prisma/client";

type T = (Thought & {
  picked: {
    id: string;
  }[];
  images: {
    id: string;
    url: string;
    width: number | null;
    height: number | null;
  }[];
})[];

export const createThoughtConnection = async ({
  count,
  after,
  first,
  thoughts,
}: {
  count: number;
  after: number | null;
  first: number;
  thoughts: T;
}) => {
  let hasNextPage: boolean;
  let hasPreviousPage: boolean;

  if (after) {
    hasNextPage = count - first > 0;
    hasPreviousPage = true;
  } else {
    // afterがない。初回
    hasNextPage = count > first;
    hasPreviousPage = false;
  }

  const pageInfo = {
    hasNextPage,
    hasPreviousPage,
    startCursor: thoughts.length ? thoughts[0].cursor : null,
    endCursor: thoughts.length
      ? thoughts[thoughts.length - 1].cursor.toString()
      : null,
  };

  const convertedThoughts = thoughts.map((t) => {
    const picked = !!t.picked.length;
    return {
      ...t,
      picked,
    };
  });

  const edges = convertedThoughts.map((thought) => {
    return {
      node: thought,
      cursor: thought.cursor,
    };
  });

  return {
    edges,
    pageInfo,
  };
};
