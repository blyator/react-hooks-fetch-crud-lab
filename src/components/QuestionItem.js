import React, { useState, useEffect } from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  // Add local state to track the select value
  const [selectedValue, setSelectedValue] = useState(
    question.correctIndex.toString()
  );

  // Update local state when question prop changes
  useEffect(() => {
    setSelectedValue(question.correctIndex.toString());
  }, [question.correctIndex]);

  const handleChange = (e) => {
    const newValue = e.target.value;
    // Update local state immediately
    setSelectedValue(newValue);
    // Then update parent state
    onUpdate(question.id, newValue);
  };

  return (
    <li>
      <h4>{question.prompt}</h4>
      <label>
        Correct Answer:
        <select
          aria-label="Correct Answer"
          value={selectedValue} // Use local state instead of prop directly
          onChange={handleChange}
        >
          {question.answers.map((answer, index) => (
            <option key={index} value={index.toString()}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={() => onDelete(question.id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
