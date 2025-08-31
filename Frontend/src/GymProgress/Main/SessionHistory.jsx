import axios from "axios";
import React, { useEffect, useState } from "react";
import { useExerciseStore } from '../useExerciseStore.js';

const SessionHistory = ({ sessions }) => {
    const apiUrl = import.meta.env.VITE_BACKEND_URL;
    const userId = sessionStorage.getItem("userId");
    const selectedExercise = useExerciseStore(state => state.selectedExercise);
    const [fetchedSessions, setFetchedSesssion] = useState([]);

    const getExeHistory = async () => {
        try {
            const response = await axios.get(`${apiUrl}/api/gym/fetchprogress`, {
                params: { userId, name: selectedExercise },
                withCredentials: true
            });

            if (response.status === 200) {
                setFetchedSesssion(response.data.data);
            }
        } catch (error) {
            console.log("Unable to complete getExeHistory", error);
        }
    };

    useEffect(() => {
        if (selectedExercise) {
            getExeHistory();
        }
    }, [selectedExercise]);

    const lastTwoSessions = fetchedSessions.slice(0,2);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    };

    useEffect(()=>{
        getExeHistory()
    },[sessions])

    return (
        <div className="bg-white rounded-2xl shadow-md p-4 flex-1">
            <h3 className="text-sm font-semibold text-center">Session History</h3>
            <p className="text-2xl font-bold text-gray-900 mb-1 text-center">{selectedExercise}</p>

            <div className="flex justify-between">
                <div className="rounded-lg p-3 w-[100%] flex justify-between">
                    {lastTwoSessions.length === 0 ? (
                        <p className="text-center">No sessions found</p>
                    ) : (
                        lastTwoSessions.map((session, index) => (
                            <div key={index} className="mb-4">
                                <p className="text-gray-800 text-center font-medium mb-2">{formatDate(session.date)}</p>
                                <div className="space-y-2">
                                    {session.sets.map((set, idx) => (
                                        <div
                                            key={idx}
                                            className="flex justify-between items-center border border-slate-400 rounded-lg px-3 py-2"
                                        >
                                            <span className="text-gray-600 font-bold text-sm px-5">
                                                Set {idx + 1}: {set.weight} Kgs × {set.reps} reps
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default SessionHistory;
