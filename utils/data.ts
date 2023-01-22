export const deepcopy = <T>(portfolioList: T): T => {
  return JSON.parse(JSON.stringify(portfolioList));
};

export const reorder = <T>(
  dataGridList: T[],
  startIdx: number,
  endIdx: number,
): T[] => {
  const [targetItem] = dataGridList.splice(startIdx, 1);
  dataGridList.splice(endIdx, 0, targetItem);
  return dataGridList;
};
