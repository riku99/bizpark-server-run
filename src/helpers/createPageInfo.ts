export const createPageInfo = ({
  count,
  first,
  after,
  nodes,
  cursorKey,
}: {
  count: number;
  first: number;
  after: boolean | string | number | null;
  nodes: any[];
  cursorKey: string;
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

  return {
    hasPreviousPage,
    hasNextPage,
    startCursor: nodes.length ? nodes[0][cursorKey].toString() : null,
    endCursor: nodes.length
      ? nodes[nodes.length - 1][cursorKey].toString()
      : null,
  };
};
