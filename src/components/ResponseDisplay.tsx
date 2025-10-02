import React, { FC } from "react";
import type { ApiResponse } from "../types/api";
import Tabs from "./Tabs";
import UrlList from "./UrlList";

interface ResponseDisplayProps {
  response: ApiResponse;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ResponseDisplay: FC<ResponseDisplayProps> = ({
  response,
  activeTab,
  setActiveTab,
}) => {
  const isError = response.answer.startsWith("Error");

  return (
    <div
      style={{
        marginTop: "20px",
        width: "80%",
        maxWidth: "800px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
      }}
    >
      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={["answer", "context", "urls"]}
      />

      {activeTab === "answer" && (
        <p style={{ color: isError ? "#dc3545" : "inherit" }}>
          {response.answer}
        </p>
      )}

      {activeTab === "context" && (
        <pre
          style={{
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            backgroundColor: "#f5f5f5",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          {response.context
            .split(/\[WORK ITEM/) // split on each work item
            .filter(Boolean)
            .map((chunk, idx) => {
              // Re-add "[WORK ITEM" because split removes it
              const fullChunk = `[WORK ITEM${chunk}`;

              // Highlight the ID using regex replacement
              const highlighted = fullChunk.replace(
                /\[WORK ITEM (\d+)/,
                (_, id) =>
                  `[WORK ITEM <strong style="color:#0d6efd">${id}</strong>`,
              );

              return (
                <div
                  key={idx}
                  style={{ marginBottom: "1.5em" }}
                  dangerouslySetInnerHTML={{ __html: highlighted }}
                />
              );
            })}
        </pre>
      )}
      {activeTab === "urls" && <UrlList urls={response.urls} />}
    </div>
  );
};

export default ResponseDisplay;
