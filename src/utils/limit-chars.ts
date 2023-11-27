export const limitChars = (v: string, l: number) => {
  if (v.length > l) {
    v = `${v.substring(0, l)}...`;
  }
  return v;
};
