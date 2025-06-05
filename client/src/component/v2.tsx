import React, { useEffect, useState } from "react";
import Column from "./Column";
import { useBoardStore, type Columns } from "../store/ColumeStore";

function V2() {
  const [coll, setColumns] = useState<Columns>({
    column1: [
      {
        id: "a1f3k9",
        title: "Fix login bug",
        assignedUser: "John Doe",
        priority: "HIGH",
      },
      {
        id: "b2l8x7",
        title: "Improve signup validation",
        assignedUser: "Alice Smith",
        priority: "MEDIUM",
      },
      {
        id: "c3q2w6",
        title: "Design login page UI",
        assignedUser: "Bob Brown",
        priority: "LOW",
      },
    ],
    column2: [
      {
        id: "d4r5y1",
        title: "Update user dashboard",
        assignedUser: "Clara West",
        priority: "HIGH",
      },
      {
        id: "e5u6t3",
        title: "Refactor settings component",
        assignedUser: "Daniel Clark",
        priority: "MEDIUM",
      },
      {
        id: "f6m3p8",
        title: "Optimize image loading",
        assignedUser: "Ella Johnson",
        priority: "LOW",
      },
    ],
    column3: [
      {
        id: "g7z9h4",
        title: "Setup CI/CD pipeline",
        assignedUser: "Frank Lee",
        priority: "HIGH",
      },
      {
        id: "h8x1v2",
        title: "Write unit tests",
        assignedUser: "Grace Kim",
        priority: "MEDIUM",
      },
      {
        id: "i9c0b5",
        title: "Clean up CSS",
        assignedUser: "Harry White",
        priority: "LOW",
      },
    ],
    column4: [
      {
        id: "j1a4n0",
        title: "Deploy to staging",
        assignedUser: "Isla Moore",
        priority: "HIGH",
      },
      {
        id: "k2w7s9",
        title: "Review pull requests",
        assignedUser: "Jack Black",
        priority: "MEDIUM",
      },
      {
        id: "l3d6f7",
        title: "Document API endpoints",
        assignedUser: "Karen Adams",
        priority: "LOW",
      },
    ],
  });

  const updateColumns = useBoardStore((state) => state.updateColumns);
  const columns = useBoardStore((state) => state.columns);

  useEffect(() => {
    updateColumns(coll);
  }, []);

  if (!columns) return <>null</>;

  return (
    <div className="bg-gray-900 flex items-center justify-center h-screen w-screen">
      <div className="h-[90%] w-[95%] py-11 px-14  rounded-2xl flex overflow-x-auto items-start gap-5 bg-gray-800 ">
        {Object.keys(columns).map((col, i) => (
          <Column key={i} title={col} tasks={columns[col]} />
        ))}
      </div>
    </div>
  );
}

export default V2;
