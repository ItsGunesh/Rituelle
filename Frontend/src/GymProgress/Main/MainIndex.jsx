import React , {useState} from 'react'
import ExerciseChart from './ExerciseChart';
import SessionHistory from './SessionHistory';
import AddSession from './AddSession';

const MainIndex = () => {
  const [sessions, setSessions] = useState([
    { date: "Jan 12", weight: 15, reps: 10, volume: 150 },
    { date: "Jan 10", weight: 15, reps: 8, volume: 120 },
    { date: "Jan 8", weight: 10, reps: 10, volume: 100 },
  ]);

  const data = sessions.map((s) => ({
    date: s.date,
    volume: s.volume,
  }));

  const handleAddSession = ({ weight, reps }) => {
    const volume = weight * reps;
    const newSession = {
      date: `Jan ${12 + sessions.length}`, // mock date
      weight,
      reps,
      volume,
    };
    setSessions([newSession, ...sessions]);
  };

  return (
    <div className="w-full px-4 pb-4">
      <ExerciseChart data={data} name="Pull-ups" />
      <div className="flex gap-4 mt-4 responsive-flex">
        <SessionHistory sessions={sessions} />
        <AddSession onAdd={handleAddSession} />
      </div>
    </div>
  );
};


export default MainIndex
