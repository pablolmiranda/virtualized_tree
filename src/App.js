import { ComponentsProvider, Select } from "@looker/components";
import { FixedSizeList as List } from "react-window";
import React from "react";
import { collapseTree, expandTree } from "./utils";

const options = [10, 100, 1000, 10000, 100000];

export default function App() {
  const [numberOfItems, setNumberOfItems] = React.useState(10);
  const selectNumberElements = (value) => {
    setNumberOfItems(value);
  };

  const tree = React.useMemo(
    () =>
      new Array(numberOfItems).fill(true).reduce((items, item, index) => {
        const shouldBeAChild = Math.floor(Math.random() * 1000) % 2 === 0;
        if (index > 0 && shouldBeAChild) {
          items[items.length - 1].children.push({
            index,
            children: [],
            expanded: false,
            depth: 1,
          });
        } else {
          items.push({ index, children: [], expanded: false, depth: 0 });
        }

        return items;
      }, []),
    [numberOfItems]
  );

  const [items, setItems] = React.useState(() => tree);

  React.useEffect(() => {
    setItems(tree);
  }, [tree]);

  const toggleItem = (index, item) => {
    let newItems;

    if (item.expanded) {
      console.log("collapsing the tree");
      newItems = collapseTree(index, item, items);
    } else {
      newItems = expandTree(index, item, items);
    }

    console.log("updated items: ", newItems);

    setItems(newItems);
  };

  const RenderRow = ({ index, style }) => {
    const item = items[index];

    return (
      <div style={style}>
        <div>Item {item.index}</div>
        {item.children.length > 0 && (
          <button onClick={() => toggleItem(index, item)}>
            {item.expanded ? "Collapse" : "Expand"}
          </button>
        )}
      </div>
    );
  };

  return (
    <ComponentsProvider>
      <div className="App">
        <h1>Hello to tree virtualized</h1>
        <Select
          value={numberOfItems}
          options={options.map((item) => ({ value: item, label: item }))}
          onChange={selectNumberElements}
        />
        <br />
        <List height={600} itemCount={items.length} itemSize={50} width={300}>
          {RenderRow}
        </List>
      </div>
    </ComponentsProvider>
  );
}
