import React from "react";
import Button from "./button.tsx";
import { Form } from "react-bootstrap";
import "../styles/form.css";
interface IProps {
  title: string;
  onClick: Function;
  onChange: Function;
  placeholder: string;
  buttonTitle: string;
}

const FormLogin: React.FC<IProps> = ({
  title,
  onClick,
  onChange,
  buttonTitle,
  placeholder,
}) => {
  return (
    <form action="" className="form_main">
      <p className="heading">{title}</p>

      <Form.Control
        placeholder={"Username"}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: "40%" }}
        type="text"
      />

      <Button title="join game" onClick={() => onClick()} disabled={false} />
    </form>
  );
};
export default FormLogin;
