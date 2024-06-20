import React from 'react';
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

interface CirclePercentageProps {
  percentages: number[];
}

const CirclePercentage: React.FC <CirclePercentageProps> = ({percentages})=>{

  const data= {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [{
      data: [percentages[0], percentages[1], percentages[2]],
      backgroundColor: [
        'green',
        'yellow',
        'red'
      ],
      
    }]}
  
ChartJS.register(ArcElement, Tooltip, Legend);

return(
  <Doughnut data={data} options={{plugins:{legend: {title:{display:true, text:"difficulty of good answers"}}}}} />)
}

export default CirclePercentage;
