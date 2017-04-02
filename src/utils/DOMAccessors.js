
export const findAncestor = (el, cls) => {
  while ((el = el.parentElement) && !el.classList.contains(cls));
  return el;
};

export const findDescendent = (el, cls) => {
  return el.getElementsByClassName(cls)[0];
};

/**
 * Find a DOM sibling or cousin by an ancestor node
 * Instead of DOM traversing:
 * const node = container.parentNode.parentNode.getElementsByClassName('tooltip');
 * @param el
 * @param ancestorCls
 * @param siblingCls
 * @returns {*}
 */
export const findRelativeByAncestor = (el, ancestorCls, siblingCls) => {
  const ancestor = findAncestor(el, ancestorCls);
  if (!ancestor) {
    throw new Error('Must provide a valid ancestor.')
  }
  return findDescendent(ancestor, siblingCls);
};
