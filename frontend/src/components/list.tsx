import React from "react";
import "../styles/list.css";

interface user {
  name: string;
  score: number;
}
interface IProps {
  list: Array<user>;
  title: string;
  username: string;
}

const List: React.FC<IProps> = ({ title, list, username }) => {
  return (
    <div className="list">
      <p className="title">{title}</p>
      <div className="user__container">
        {list.map((item: user, key: number) => {
          return (
            <div className="user" key={key}>
              <div className="image"></div>
              <div className="user__content">
                <div className="text">
                  <span className="name">
                    {username == item?.name ? "you" : "other player"}
                  </span>
                  <p className="username">{item?.name}</p>
                </div>
                <p className="scoreList">{item?.score}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default List;
