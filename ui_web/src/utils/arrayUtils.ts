export const addKeyElement = (arr: any) => {
  const newArr = arr.map((element: any, index: any) => ({
    ...element,
    key: element.id,
  }));
  return newArr;
};
