import { Thought } from "@prisma/client";
import { createPageInfo } from "~/helpers/createPageInfo";

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
  const pageInfo = createPageInfo({
    count,
    first,
    after: !!after,
    nodes: thoughts,
    cursorKey: "cursor",
  });

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
