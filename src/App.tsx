import React, { useState } from "react";
import QuestionInput from "./components/QuestionInput";
import ResponseDisplay from "./components/ResponseDisplay";
import type { ApiResponse } from "./types/api";

const App: React.FC = () => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [activeTab, setActiveTab] = useState("answer");

  const handleSubmit = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("http://localhost:8000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "google/gemma-2-2b-it", text: question }),
      });
      const data: ApiResponse = await res.json();
      setResponse(data);
      setActiveTab("answer");
    } catch (err) {
      console.error(err);
      setResponse({ answer: `Error fetching response - ${err}`, context: "", urls: [] });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setQuestion("");
    setResponse(null);
    setActiveTab("answer");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h1>Ask a Question</h1>
      <QuestionInput
        question={question}
        setQuestion={setQuestion}
        onSubmit={handleSubmit}
        onClear={handleClear}
        loading={loading}
      />
      {response && (
        <ResponseDisplay
          response={response}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
    </div>
  );
};

export default App;
