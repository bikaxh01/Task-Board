import React, { useState } from "react";
import { useBoardStore, type Task } from "../store/ColumeStore";

function DropComponent({ col, index }: { col: string; index: number }) {
  const [active, setActive] = useState(false);
 

  const columns = useBoardStore((state) => state.columns);
  const updateColumns = useBoardStore((state) => state.updateColumns);

  const handleDrop = (
    event: React.DragEvent,
    toColumn: string,
    index: number
  ) => {
    if (!columns) return;
    event.preventDefault();
    const item: Task = JSON.parse(event.dataTransfer.getData("item"));

    const fromColumn = event.dataTransfer.getData("fromColumn");

   // if (fromColumn == toColumn) return;

    const fromData = columns[fromColumn].filter((it) => it.id !== item.id);
    const toData = [...columns[toColumn]];
    toData.splice(index, 0, item);
    const updatedColumns = {
      ...columns,
      [fromColumn]: fromData,
      [toColumn]: toData,
    };

    updateColumns(updatedColumns);
  };

  return (
    <div
      className="min-h-2"
      onDragEnter={(e) => {
        e.preventDefault();
        setActive(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setActive(false);
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      {active ? (
        <div
          className="bg-gray-600 text-xs text-primary h-18 rounded-md flex items-center justify-center"
          onDrop={(e) => {
            setActive(false);
            handleDrop(e, col, index);
          }}
        >
          Drop Here {JSON.stringify(active)}
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-2">
          <div className="border border-dashed border-indigo-500/25 w-full"></div>
        </div>
      )}
    </div>
  );
}

export default DropComponent;
