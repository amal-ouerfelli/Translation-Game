import React from "react";
import "../styles/card.css";

interface IProps {
  title: string;
  content: string;
  setShowHistory: Function;
}

const Card: React.FC<IProps> = ({ title, content, setShowHistory }) => {
  return (
    <div className="card">
      <div className="content">
        <div className="back">
          <div className="back-content">
            <h3>{title}</h3>
            <h2>{content}</h2>
          </div>
        </div>
        <div className="front">
          <div className="img">
            <div className="circle"></div>
            <div className="circle" id="right"></div>
            <div className="circle" id="bottom"></div>
          </div>

          <div className="front-content" onClick={() => setShowHistory()}>
            <small className="badge">history</small>
            <div className="description">
              <div className="title">
                <p className="title">
                  <strong>Click to show details</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
