import React, { useState } from "react";
import { Flex } from "antd";
import Calendar from "../organism/Calendar";
import Tasks from "../organism/Tasks";
import ContentSwitcher from "../reuse/ContentSwitcher";
const Plans = () => {
  const items = [
    { key: "calendar", label: "Calendar", content: <Calendar /> },
    { key: "tasks", label: "Tasks", content: <Tasks /> },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        height: "100%",
      }}>
      <ContentSwitcher items={items} />
    </div>
  );
};

export default Plans;
