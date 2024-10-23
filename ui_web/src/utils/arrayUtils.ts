export const addKeyElement = (arr: any) => {
  const newArr = arr.map((element: any, index: any) => ({
    ...element,
    key: element.id,
  }));
  return newArr;
};

export const findElementById = (arr: any, value: string) => {
  return arr.find((obj: any) => obj.id === value);
};

export const checkListTypeKey = (key: string) => {
  const dateKeyGroups = ["frequency", "storage", "connection"];
  return dateKeyGroups.includes(key);
}