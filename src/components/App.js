import React, { useEffect, useState } from "react";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [questions, setQuestions] = useState([]);
  const [view, setView] = useState("questions");

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((data) => setQuestions(data));
  }, []);

  const addQuestion = async (newQuestion) => {
    const res = await fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    });
    const saved = await res.json();
    setQuestions((prev) => [...prev, saved]);
    setView("questions");
  };

  const deleteQuestion = async (id) => {
    await fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    });
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const updateCorrectAnswer = async (id, newIndex) => {
    // Convert newIndex to number immediately
    const indexAsNumber = parseInt(newIndex, 10);

    const res = await fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: indexAsNumber }),
    });

    const updated = await res.json();

    // Ensure the updated question in state has the new correctIndex
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === id ? { ...updated, correctIndex: indexAsNumber } : q
      )
    );
  };

  return (
    <main>
      <section>
        <button onClick={() => setView("questions")}>View Questions</button>
        <button onClick={() => setView("form")}>New Question</button>
      </section>
      {view === "form" ? (
        <QuestionForm onSubmit={addQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDelete={deleteQuestion}
          onUpdate={updateCorrectAnswer}
        />
      )}
    </main>
  );
}

export default App;
