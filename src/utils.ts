export const create4digitNumberStr = () => {
  let code: string = '';

  while (code.length < 4) {
    const num = Math.floor(Math.random() * 10);

    if (code.length || num !== 0) {
      code = code + `${num}`;
    }
  }

  return code;
};
