import React, { useState } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const HabitsTodo = () => {
  const [input, setInput] = useState('');
  const [habits, setHabits] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [editValue, setEditValue] = useState('');

  const navigate = useNavigate();

  const handleAdd = () => {
    if (!input.trim()) return;
    setHabits([...habits, input.trim()]);
    setInput('');
  };

  const handleEdit = idx => {
    setEditIdx(idx);
    setEditValue(habits[idx]);
  };

  const handleUpdate = idx => {
    if (!editValue.trim()) return;
    setHabits(habits.map((h, i) => (i === idx ? editValue.trim() : h)));
    setEditIdx(null);
    setEditValue('');
  };

  const handleDelete = idx => {
    setHabits(habits.filter((_, i) => i !== idx));
    if (editIdx === idx) {
      setEditIdx(null);
      setEditValue('');
    }
  };

  const handleSubmit = async () => {
    // console.log('Final habits:', habits);

    const userId = localStorage.getItem("userId");

    try {
        const response = await axios.post('http://localhost:7000/users/habits/insertHabit',{userId,habits},{
          headers:{
            "Content-Type": "application/json",
          },
          withCredentials: true
        })

        console.log(response.status)

        if(response.status===200){
          console.log("Habits saved successfully!")

          navigate("/api/")
        }


    } catch (error) {
      console.log(error)
    }

  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white rounded-xl shadow">
      <div className='text-center font-bold pb-5 text-4xl'>
        Add your commitments
      </div>
      <div className="flex gap-2 mb-4">
        <input
          className="flex-1 border rounded px-2 py-1"
          type="text"
          placeholder="Add a habit..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAdd()}
        />
        <button
          className="bg-gray-200 text-black px-3 py-1 rounded hover:bg-gray-700 hover:text-white"
          onClick={handleAdd}
        >
          Add Habit
        </button>
      </div>
      <ul className="mb-4">
        {habits.map((habit, idx) => (
          <li key={idx} className="flex items-center gap-2 py-1">
            {editIdx === idx ? (
              <>
                <input
                  className="border rounded px-2 py-1 flex-1"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleUpdate(idx)}
                  autoFocus
                />
                <button
                  className="bg-gray-200 text-black px-2 py-1 rounded hover:bg-gray-700 hover:text-white"
                  onClick={() => handleUpdate(idx)}
                >
                  Update
                </button>
              </>
            ) : (
              <>
                <span className="flex-1">{habit}</span>
                <button
                  className="bg-gray-200 text-black px-2 py-1 rounded hover:bg-gray-700 hover:text-white"
                  onClick={() => handleEdit(idx)}
                >
                  Edit
                </button>
                <button
                  className="bg-gray-200 text-black px-2 py-1 rounded hover:bg-gray-700 hover:text-white"
                  onClick={() => handleDelete(idx)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
      <button
        className="w-full bg-gray-200 text-black py-2 rounded hover:bg-gray-700 hover:text-white"
        onClick={handleSubmit}
        disabled={habits.length === 0}
      >
        Ready
      </button>
    </div>
  );
};

export default HabitsTodo;
