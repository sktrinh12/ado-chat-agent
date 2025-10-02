import React, { FC } from "react";

interface QuestionInputProps {
  question: string;
  setQuestion: (q: string) => void;
  onSubmit: () => void;
  onClear: () => void;
  loading: boolean;
}

const QuestionInput: FC<QuestionInputProps> = ({
  question,
  setQuestion,
  onSubmit,
  onClear,
  loading,
}) => {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ position: "relative", display: "inline-block" }}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          disabled={loading}
          rows={4}
          cols={50}
          placeholder="Type your question here..."
          style={{
            padding: "10px",
            fontSize: "16px",
            opacity: loading ? 0.5 : 1,
            boxSizing: "border-box",
          }}
        />

        {/* Overlay spinner when loading */}
        {loading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255,255,255,0.7)",
              borderRadius: "8px",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #007bff",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                animation: "spin 1s linear infinite",
              }}
            />
          </div>
        )}
      </div>

      <div style={{ marginTop: "10px" }}>
        <button onClick={onSubmit} disabled={loading}>
          {loading ? "Loading..." : "Submit"}
        </button>
        <button
          onClick={onClear}
          disabled={loading}
          style={{ marginLeft: "10px" }}
        >
          Clear
        </button>
      </div>

      {/* Spinner animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default QuestionInput;
