import React, { useState } from "react";

function QuestionForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", ""],
    correctIndex: "0",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("answer")) {
      const index = parseInt(name.split("answer")[1]);
      const updatedAnswers = [...formData.answers];
      updatedAnswers[index] = value;
      setFormData({ ...formData, answers: updatedAnswers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      prompt: formData.prompt,
      answers: formData.answers,
      correctIndex: parseInt(formData.correctIndex),
    };
    onSubmit(newQuestion);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Prompt:
        <input name="prompt" value={formData.prompt} onChange={handleChange} />
      </label>
      <label>
        Answer 1:
        <input
          name="answer0"
          value={formData.answers[0]}
          onChange={handleChange}
        />
      </label>
      <label>
        Answer 2:
        <input
          name="answer1"
          value={formData.answers[1]}
          onChange={handleChange}
        />
      </label>
      <label>
        Correct Answer:
        <select
          name="correctIndex"
          value={formData.correctIndex}
          onChange={handleChange}
        >
          {formData.answers.map((_, index) => (
            <option key={index} value={index}>
              {index}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Add Question</button>
    </form>
  );
}

export default QuestionForm;
