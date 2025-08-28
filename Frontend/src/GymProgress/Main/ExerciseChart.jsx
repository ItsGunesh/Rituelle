import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const ExerciseChart = ({ data, name }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
      <h2 className="text-lg font-bold">{name}</h2>
      <p className="text-sm text-gray-500 mb-4">Back Exercise</p>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="volume" stroke="#2563eb" strokeWidth={2} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};


export default ExerciseChart
