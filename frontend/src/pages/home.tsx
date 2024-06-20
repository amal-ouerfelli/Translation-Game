import React, { useEffect, useState } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import "../styles/home.css";
import TextInput from "../components/textInput.tsx";
import { IWrongAnswers, Iword, difficulty } from "../utils/utils.ts";
import ModalHistory from "../components/modalHistory.tsx";
import { useSocket } from "../utils/soketContext.tsx";
import { getWord } from "../services/words.services.ts";
import Card from "../components/card.tsx";
import Box from "../components/box.tsx";
import Button from "../components/button.tsx";
import ResetButton from "../components/resetButton.tsx";
import FormLogin from "../components/form.tsx";
import List from "../components/list.tsx";

const Home: React.FC = () => {
  const socket = useSocket();
  const [players, setPlayers] = useState<{
    [key: string]: { name: string; score: number };
  }>({}); // list of players
  const [word, setWord] = useState<string>(""); // current word to be translated
  const [connected, setConnected] = useState<boolean>(false); // the player is connected or not
  const [username, setUsername] = useState<string>(""); // username of the player
  const [translation, setTranslation] = useState<string>(""); // the result of translation
  const [total, setTotal] = useState<number>(10); // total score 
  const [input, setInput] = useState<string>(""); // the translation suggestion
  const [diff, setDiff] = useState<difficulty>(difficulty.medium); // difficulty of the word to be translated
  const [cHistory, setCHistory] = useState<Array<Iword>>([]); // list of good answers
  const [fHistory, setFHistory] = useState<Array<IWrongAnswers>>([]); // list of wrong answers
  const [showHistory, setShowHistory] = useState<boolean>(false); 
  const [showResult, setShowResult] = useState<boolean>(false);
  const [currentTurn, setCurrentTurn] = useState<string | null>(null); // current turn take the name of the player who has the turn

  var percentages: Array<number> = [0, 0, 0];
  const player = JSON.parse(localStorage.getItem("player")); // get the player username from the localStorage
// useEffect to call the socket and set the players list and the current turn
  useEffect(() => {
    if (socket?.connected) {
      socket.on("updatePlayers", (players) => {
        if (Object.keys(players).length > 0) {
          setPlayers(players);
        }
      });
      socket.on("turnUpdate", ({ currentTurn }) => {
        setCurrentTurn(currentTurn);
      });
    }
  }, [socket]);
  
// useEffect to set the username of the player is exist and set list of players
  useEffect(() => {
    if (player) {
      setUsername(player);
      if (
        !Object.values(players).some((e) => e.name == player) &&
        Object.values(players).length > 0
      ) {
        socket?.emit("joinGame", { playerName: player, score: total });
      } else {
        socket?.emit("connected");
      }
      if (socket) {
        socket?.on("updatePlayers", (players) => {
          if (Object.keys(players).length > 0) {
            setPlayers(players);
          }
        });
        socket.on("turnUpdate", ({ currentTurn }) => {
          setCurrentTurn(currentTurn);
        });
      }
      setConnected(true);
    }
  }, [player, connected]);

  // useEffect to set show a modal indicating the winner if the score of one player is 0 or 20
  useEffect(() => {
    Object.values(players).map((player) => {
      if (player.score === 20 || player.score === 0) {
        setShowResult(true);
      }
    });
  }, [players]);

  /**
   * @function joinGame function that allow player to join room and start playing
   * @param  {string} username the username of the player
   *
   */
  const joinGame = (username: string) => {
    socket?.emit("joinGame", { playerName: username, score: total });
    localStorage.setItem("player", JSON.stringify(username)); // set the player name in localStorage
    setConnected(true);
  };

  // useEffect to set the word to be translated, the translation and the difficulty as well as list of good and wrong answers
  useEffect(() => {
    getWord("medium").then((res) => {
      setWord(res.word.word);
      setTranslation(res.res);
      setDiff(res.word?.difficulty);
    });
    const correct = JSON.parse(localStorage.getItem("cHistory"));
    if (correct) {
      setCHistory(correct);
      setTotal(total + correct.length);
    }
    const failure = JSON.parse(localStorage.getItem("fHistory"));
    if (failure) {
      setFHistory(failure);
      setTotal(total - failure.length);
    }
  }, []);

  // useEffect to set percentages of good answers difficulty (to be implemented)
  useEffect(() => {
    cHistory.map((item) => {
      if (item.difficulty === difficulty.easy) {
        percentages[0] = percentages[0] + 1;
      } else if (item.difficulty === difficulty.medium) {
        percentages[1] = percentages[1] + 1;
      } else {
        percentages[2] = percentages[2] + 1;
      }
    });
  }, [total]);

  /**
   * @function Play function that allows the player to play and then give the turn to the other player
   */
  const Play = async () => {
    if (input.toUpperCase() === translation?.toUpperCase()) {
      let l = cHistory;
      l.push({ word: word, translation: translation, difficulty: diff }); // add the word to the list of good answers
      setCHistory(l); // set the list of good answers
      localStorage.setItem("cHistory", JSON.stringify(l)); // set the list of good answers in the localStorage
      socket?.emit("updateScore", { score: total + 1 });
      setTotal(total + 1);
      await setDiff(difficulty.hard); // modify the difficulty of the word to "hard" when the player gives a correct answer to load a hard word
    } else {
      let l = fHistory;
      l.push({ word: word, difficulty: diff }); // add this word to the list of wrong answers
      setFHistory(l); //set the list of wrong answers
      localStorage.setItem("fHistory", JSON.stringify(l));
      socket?.emit("updateScore", { score: total - 1 });
      setTotal(total - 1);
      await setDiff(difficulty.easy); // modify the difficulty of the word to "easy" when the player gives a wrong answer to load an easy word
    }
  // get new word
    getWord(diff).then((res) => {
      setWord(res.word.word);
      setTranslation(res.res);
    });
    setInput(""); // reset the input
    // update players score
    socket?.on("updatePlayers", (players) => {
      if (Object.keys(players).length > 0) {
        setPlayers(players);
      }
    });
    socket?.emit("endTurn");
  };

  /**
   * @function Reset function that reset cache and restart the game
   */
  const Reset = () => {
    localStorage.removeItem("cHistory"); // remove list of good answers from the localStorage
    localStorage.removeItem("fHistory"); // remove list of wrong answers from the localStorage
    localStorage.removeItem("player"); // remove the player's name from the localStorage
    setCHistory([]); //reset the list of good answers
    setFHistory([]); //reset the list of wrong answers
    setTotal(10); // reset the total score to 10
    socket?.emit("reset");
    setPlayers({}); // reset the list of players
    setConnected(false);
    setShowResult(false);
  };

  return (
    <div>
      {!connected ? (
        <div className="containerLogin">
          <FormLogin
            title="Start game"
            onChange={(e) => setUsername(e)}
            onClick={() => joinGame(username)}
            placeholder="Username"
            buttonTitle="Join game"
          />
        </div>
      ) : (
        <div className="container">
          <Row>
            <Col md={{ span: 6, offset: 1 }}>
              <List
                title={"players"}
                list={Object.values(players)}
                username={username}
              />
            </Col>
            <Col>
              <Card
                title={"total points"}
                content={total.toString()}
                setShowHistory={() => setShowHistory(!showHistory)}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: 40 }}>
            <Row>
              <Col md={{ span: 5, offset: 2 }}>
                <Box
                  title={"good answers"}
                  content={cHistory.length.toString()}
                  good={true}
                />
              </Col>
              <Col>
                <Box
                  title={"wrong answers"}
                  content={fHistory.length.toString()}
                  good={false}
                />
              </Col>
              {/* <Col>{<CirclePercentage percentages={percentages} />}</Col> */}
            </Row>
          </Row>
          <Row style={{ marginTop: 20 }}>
            <h4>Guess the translation of this word: </h4>
            <h1>{word}</h1>
            <Col md={{ span: 4, offset: 1 }}>
              <TextInput
                engWord={translation}
                onChange={(input: string) => setInput(input)}
                input={input}
                disabled={currentTurn !== username}
              />
            </Col>
            <Col md={{ span: 3, offset: 1 }} style={{ marginTop: -60 }}>
              <Button
                title="play"
                onClick={() => Play()}
                disabled={currentTurn !== username}
              />
            </Col>
            <Col md={3} style={{ marginTop: -10 }}>
              <ResetButton onClick={() => Reset()} />
            </Col>
          </Row>
          {showHistory && (
            <ModalHistory
              goodAnswers={cHistory}
              wrongAnswers={fHistory}
              setShowHistory={() => setShowHistory(false)}
            />
          )}
          {showResult && (
            <Modal show={showResult}>
              <Modal.Body
                style={{ justifyContent: "space-around", alignItems: "center" }}
              >
                <Box
                  title={total === 20 ? "You Win" : "You lose"}
                  content={""}
                  good={total === 20 ? true : false}
                />
              </Modal.Body>
              <Modal.Footer>
                <ResetButton onClick={() => Reset()} />
              </Modal.Footer>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
