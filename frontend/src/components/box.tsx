import React from "react";
import '../styles/box.css';

interface IProps {
	title: string
	content: string;
    good:boolean;
}

const Box :React.FC<IProps>=({title,content,good})=>{

return(
    <div className={good ?"box" : "redbox"}>
    <p>{title +':'}</p>
    <p >{content}</p>
</div>
)
}
export default Box;