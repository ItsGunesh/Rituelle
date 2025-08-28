import React from "react";

const SessionHistory = ({ sessions }) => {
    // Sample session if none provided
    const sampleSession = {
        date: "Aug 28, 2025",
        sets: [
            { weight: 50, reps: 10, volume: 500 },
            { weight: 55, reps: 8, volume: 440 },
            { weight: 60, reps: 6, volume: 360 },
        ],
    };

    const lastSession =
        sessions && sessions.length > 0
            ? sessions[sessions.length - 1]
            : sampleSession;

    return (
        <div className="bg-white rounded-2xl shadow-md p-4 flex-1">
            <h3 className="text-lg font-bold">Session History</h3>
            <p className="text-sm text-gray-500 mb-3">Last Session</p>

            <div className="flex justify-between">
                <div className="rounded-lg p-3 w-[50%]">
                <p className="text-gray-800 font-medium mb-2">{lastSession.date}</p>

                <div className="space-y-2">
                    {sampleSession.sets.map((set, idx) => (
                        <div
                            key={idx}
                            className="flex justify-between items-center border border-slate-400 rounded-lg px-3 py-2"
                        >
                            <span className="text-gray-600 text-sm">
                                Set {idx + 1}: {set.weight} lbs × {set.reps} reps
                            </span>
                            
                        </div>
                    ))}
                </div>
            </div>
            <div className="rounded-lg p-3 w-[50%]">
                <p className="text-gray-800 font-medium mb-2">{lastSession.date}</p>

                <div className="space-y-2">
                    {sampleSession.sets.map((set, idx) => (
                        <div
                            key={idx}
                            className="flex justify-between items-center border border-slate-400 rounded-lg px-3 py-2"
                        >
                            <span className="text-gray-600 text-sm">
                                Set {idx + 1}: {set.weight} lbs × {set.reps} reps
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </div>
    );
};

export default SessionHistory;
