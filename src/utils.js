/**
 * Given an item, add all the item children to the items array
 */
export function expandTree(itemIndex, item, items) {
  const newItems = [
    ...items.slice(0, itemIndex + 1),
    ...item.children,
    ...items.slice(itemIndex + 1, items.length),
  ];
  const newItem = { ...item, expanded: true };
  newItems[itemIndex] = newItem;

  return newItems;
}

export function collapseTree(itemIndex, item, items) {
  const numberOfChildren = item.children.length;
  const firstIndexAfterChildren = itemIndex + numberOfChildren + 1;

  const newItems = [
    ...items.slice(0, itemIndex + 1),
    ...items.slice(firstIndexAfterChildren),
  ];

  const newItem = { ...item, expanded: false };
  newItems[itemIndex] = newItem;

  return newItems;
}
