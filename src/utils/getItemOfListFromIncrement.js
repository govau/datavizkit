
const getItemOfListFromIncrement = (list = [], increment) => {
  let index;
  if (increment < list.length) {
    index = increment;
  } else {
    index = increment % group.length;
  }
  return list[index];
};

export default getItemOfListFromIncrement;
