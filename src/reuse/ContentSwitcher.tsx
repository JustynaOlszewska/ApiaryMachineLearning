import React, { useState } from "react";
import Calendar from "../organism/Calendar";
import Tasks from "../organism/Tasks";

interface ContentItem {
  key: string;
  label: string;
  content: React.ReactNode;
}

interface ContentSwitcherProps {
  items: ContentItem[];
}

const ContentSwitcher: React.FC<ContentSwitcherProps> = ({ items }) => {
  const [activeContent, setActiveContent] = useState<string | null>(null);

  return (
    <div>
      {/* Przycisk wyboru treści */}
      <div>
        {items.map((item) => (
          <button key={item.key} onClick={() => setActiveContent(item.key)} style={{ marginRight: "8px" }}>
            {item.label}
          </button>
        ))}
      </div>

      {/* Wyświetlanie treści */}
      <div style={{ marginTop: "20px", padding: "10px", border: "1px solid black" }}>
        {items.map((item) => activeContent === item.key && <div key={item.key}>{item.content}</div>)}
        {!activeContent && <p>Wybierz opcję, aby zobaczyć treść.</p>}
      </div>
    </div>
  );
};

export default ContentSwitcher;
