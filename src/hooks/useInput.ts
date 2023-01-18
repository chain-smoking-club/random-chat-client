import React, { useState } from "react";

const useInput = (initialInput: string) => {
  const [input, setInput] = useState(initialInput);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInput(e.target.value);

  const resetInput = () => setInput("");

  return { input, onChange, resetInput };
};

export default useInput;
