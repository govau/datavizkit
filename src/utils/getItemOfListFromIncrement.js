
const getItemOfListFromIncrement = (list = [], increment) => {// todo - rename to getModulusIndex
  let index;
  if (increment < list.length) {
    index = increment;
  } else {
    index = increment % list.length;
  }
  return index;
};


export const getPointerInLoop = (groupLength, increment) => {
  if (increment < groupLength) {
    return increment;
  } else {
    return increment % groupLength;
  }
};



export default getItemOfListFromIncrement;
