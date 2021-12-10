import { Factory } from "fishery";
import { collapseTree, expandTree } from "../utils";

const ItemFactory = Factory.define(({ sequence }) => ({
  index: sequence - 1,
  children: [],
  expanded: false,
  depth: 0,
}));

describe("utils", () => {
  const items = [
    ItemFactory.build({ index: 0 }),
    ItemFactory.build({
      index: 1,
      children: [
        ItemFactory.build({ index: 2 }),
        ItemFactory.build({ index: 3 }),
      ],
    }),
    ItemFactory.build({ index: 4 }),
  ];

  describe("expand the tree", () => {
    test("should add the item children to items", () => {
      const item = items[1];
      const newItems = expandTree(1, item, items);

      expect(newItems).toEqual([
        items[0],
        { ...items[1], expanded: true },
        items[1].children[0],
        items[1].children[1],
        items[2],
      ]);

      expect(newItems[item.index].expanded).toBeTruthy();
    });
  });

  describe("collapse the tree", () => {
    test("should remove the item children from the items array", () => {
      const item = items[1];
      let newItems = expandTree(1, item, items);

      expect(newItems).toEqual([
        items[0],
        { ...items[1], expanded: true },
        items[1].children[0],
        items[1].children[1],
        items[2],
      ]);

      newItems = collapseTree(1, item, newItems);

      expect(newItems).toEqual(items);
    });
  });
});
