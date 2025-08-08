import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loader';

const HabitsTodo = () => {
  const [input, setInput] = useState('');
  const [habits, setHabits] = useState([]);
  const [editIdx, setEditIdx] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [loader,setLoader] = useState(false)

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
    setLoader(true)

    const userId = sessionStorage.getItem("userId");
    // const userId = localStorage.getItem("userId");
    const apiUrl = import.meta.env.VITE_BACKEND_URL

    try {
      const response = await axios.post(`${apiUrl}/users/habits/insertHabit`, { userId, habits }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      })

      console.log(response.status)

      if (response.status === 200) {
        console.log("Habits saved successfully!")

        navigate("/dashboard")
      }

      setLoader(false)
      
      
    } catch (error) {
      setLoader(false)
      console.log(error)
    }

  };

  return (
    <>
      <div className='flex flex-col'>
        <div className="w-full max-w-md mx-auto p-8 bg-gradient-to-r from-blue-50 via-blue-50 to-blue-50 rounded-xl shadow">
        <div className='text-center font-bold pb-5 text-4xl'>
          Add your commitments
        </div>
        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 bg-white border rounded px-2 py-1"
            type="text"
            placeholder="Add a habit..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
          />
          <button
            className="font-bold text-lg text-black px-4 py-1 rounded-md hover:transition-transform duration-100 hover:scale-110 hover:text-black"
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
                    className="border font-bold rounded px-2 py-1 flex-1"
                    value={editValue}
                    onChange={e => setEditValue(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleUpdate(idx)}
                    autoFocus
                  />
                  <button
                    className="font-bold text-lg text-black px-4 py-1 rounded-md hover:transition-transform duration-100 hover:scale-110 hover:text-black"
                    onClick={() => handleUpdate(idx)}
                  >
                    Update
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1">{habit}</span>
                  <button
                    className="font-bold text-lg text-black px-4 py-1 rounded-md hover:transition-transform duration-100 hover:scale-110 hover:text-black"
                    onClick={() => handleEdit(idx)}
                  >
                    Edit
                  </button>
                  <button
                    className="font-bold text-lg text-black px-4 py-1 rounded-md hover:transition-transform duration-100 hover:scale-110 hover:text-black"
                    onClick={() => handleDelete(idx)}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
        {!loader && <button
          className="w-full font-bold text-xl text-black px-4 py-1 rounded-md hover:transition-transform duration-100 hover:scale-110 hover:text-black "
          onClick={handleSubmit}
          disabled={habits.length === 0}
        >
          Ready
        </button>}
        {loader && <Loader/>}
      </div>
      <div>
        <p className='text-lg text-red-600 font-bold mt-6'>Be sure , once a commitment made , cannot be changed...</p>
      </div>
      </div>
    </>
  );
};

export default HabitsTodo;
