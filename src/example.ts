const main = async () => {
  const a = [1, 2, 3];

  a.forEach(async () => {});

  const b = a.map(async (a) => a);

  console.log('Done forEach');
};

main();
