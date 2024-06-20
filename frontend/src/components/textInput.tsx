import React, { useEffect, useState } from "react";
import "./style.css";
import { Form } from "react-bootstrap";
interface IProps {
  engWord: string;
  onChange: Function;
  input: string;
  disabled: boolean;
}

const TextInput: React.FC<IProps> = ({
  engWord,
  onChange,
  input,
  disabled,
}) => {
  const [placeholder, setPlaceholder] = useState<string>("");
  useEffect(() => {
    if (engWord?.length > 0) {
      const s = "-".repeat(engWord.length - 1);
      setPlaceholder(engWord[0]?.toUpperCase() + s);
    }
  }, [engWord]);
  return (
    <div>
      <Form.Control
        name="engWord"
        type="text"
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={input}
        disabled={disabled}
      />
    </div>
  );
};
export default TextInput;
