import { useId, useState } from "react";

function V1() {
  const [columns, setColumns] = useState({
    column1: ["item1", "item2"],
    column2: ["item1", "item2"],
    column3: ["item1", "item2"],
    column4: ["item1", "item2"],
  });

  const handleDrop = (event, toColumn, index) => {
    event.preventDefault();
    const item = event.dataTransfer.getData("item");

    const fromColumn = event.dataTransfer.getData("fromColumn");

    if (fromColumn == toColumn) return;

    setColumns((prev) => {
      console.log("🚀 ~ setColumns ~ prev:", prev);
      const fromData = prev[fromColumn].filter((it) => it !== item);
      const toData = [...prev[toColumn]];
      toData.splice(index, 0, item);
      return {
        ...prev,
        [fromColumn]: fromData,
        [toColumn]: toData,
      };
    });
  };

  const handleDrag = (event, fromColumn, item) => {
    event.dataTransfer.setData("item", item);

    event.dataTransfer.setData("fromColumn", fromColumn);
  };

  const handleCreateTask = (event, col, value) => {
    event.preventDefault();

    setColumns((prev) => {
      return {
        ...prev,
        [col]: [...prev[col], `Task added ${value}`],
      };
    });
  };

  const handleCreateColumn = () => {
    setColumns((prev) => {
      return {
        ...prev,
        newCol: [],
      };
    });
  };

  return (
    <>
      <div className=" flex gap-9  h-fit">
        <button onClick={handleCreateColumn}>create column</button>
        {Object.keys(columns).map((col) => {
          return (
            <div
              className=" border p-2  h-fit flex flex-col gap-3 w-[12rem] bg-red-400"
              key={col}
            >
              <span className=" font-bold">{col}</span>
              {columns[col].map((item, i) => {
                return (
                  <div>
                    <span
                      className=" bg-red-300"
                      onDrop={(e) => handleDrop(e, col, i)}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      drop Area
                    </span>
                    <h1
                      key={i}
                      draggable
                      onDragStart={(e) => handleDrag(e, col, item)}
                      className=" border p-2 "
                    >
                      {item}
                    </h1>
                  </div>
                );
              })}
              <button
                onClick={(e) =>
                  handleCreateTask(e, col, Math.floor(Math.random() * 100))
                }
              >
                Create new task
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default V1;
