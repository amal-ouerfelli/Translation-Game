import React from "react";
import { Button, Modal, Table } from "react-bootstrap";
import { IWrongAnswers, Iword } from "../utils/utils";

interface IProps {
  goodAnswers: Array<Iword>;
  wrongAnswers: Array<IWrongAnswers>;
  setShowHistory: Function;
}

const ModalHistory: React.FC<IProps> = ({
  goodAnswers,
  wrongAnswers,
  setShowHistory,
}) => {
  return (
    <Modal show={true}>
      <Modal.Header>
        <Modal.Title>Answers history</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ flexDirection: "row" }}>
        {goodAnswers?.length !== 0 && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Good Answers</th>
                <th>Translations</th>
              </tr>
            </thead>
            <tbody>
              {goodAnswers?.map((item: Iword) => {
                return (
                  <tr>
                    <td>{item?.word}</td>
                    <td>{item?.translation}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
        {wrongAnswers?.length !== 0 && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>wrong Answers</th>
              </tr>
            </thead>
            <tbody>
              {wrongAnswers?.map((item: IWrongAnswers) => {
                return (
                  <tr>
                    <td>{item?.word}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
        {wrongAnswers?.length === 0 && goodAnswers?.length === 0 && (
          <h4>you don't have any answer yet</h4>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShowHistory()}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalHistory;
