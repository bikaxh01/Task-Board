import React, { useState } from "react";
import Column from "./Column";



function V2() {
  const [columns, setColumns] = useState({
    column1: [
      {
        title: "Fix login bug",
        assignedUser: "John Doe",
        priority: "HIGH",
      },
      {
        title: "Improve signup validation",
        assignedUser: "Alice Smith",
        priority: "MEDIUM",
      },
      {
        title: "Design login page UI",
        assignedUser: "Bob Brown",
        priority: "LOW",
      },
    ],
    column2: [
      {
        title: "Update user dashboard",
        assignedUser: "Clara West",
        priority: "HIGH",
      },
      {
        title: "Refactor settings component",
        assignedUser: "Daniel Clark",
        priority: "MEDIUM",
      },
      {
        title: "Optimize image loading",
        assignedUser: "Ella Johnson",
        priority: "LOW",
      },
    ],
    column3: [
      {
        title: "Setup CI/CD pipeline",
        assignedUser: "Frank Lee",
        priority: "HIGH",
      },
      {
        title: "Write unit tests",
        assignedUser: "Grace Kim",
        priority: "MEDIUM",
      },
      {
        title: "Clean up CSS",
        assignedUser: "Harry White",
        priority: "LOW",
      },
    ],
    column4: [
      {
        title: "Deploy to staging",
        assignedUser: "Isla Moore",
        priority: "HIGH",
      },
      {
        title: "Review pull requests",
        assignedUser: "Jack Black",
        priority: "MEDIUM",
      },
      {
        title: "Document API endpoints",
        assignedUser: "Karen Adams",
        priority: "LOW",
      },
    ],
  });

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
