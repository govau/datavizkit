
export const applyHighContrast = (item, idx) => {
  let patternId;
  if (idx <= 8) {
    patternId = idx;
  } else {
    patternId = idx % 8;
  }
  item.color = `url(#highcharts-default-pattern-${patternId})`;
  return item;
};
