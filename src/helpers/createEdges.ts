export const createEdges = <T, C extends keyof T>({
  nodes,
  cursorKey,
}: {
  nodes: T[];
  cursorKey: C;
}) => {
  return nodes.map((node) => ({
    node,
    cursor: String(node[cursorKey]),
  }));
};
