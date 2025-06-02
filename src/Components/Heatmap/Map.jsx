import React from 'react'
import Cell from './Cell'
import { getMonthDays } from './Utils';



const Map = () => {

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth(); // 0-indexed
  const days = getMonthDays(year, month);

  // Split days into weeks
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="heatmap">
      {weeks.map((week, weekIdx) => (
        <div key={weekIdx} className="flex">
          {week.map((day, dayIdx) =>
            day ? <Cell key={dayIdx} /> : <div key={dayIdx} className="h-3 w-3 m-0.5" />
          )}
        </div>
      ))}
    </div>
  );
}

export default Map
