import { create } from 'zustand';

export const useExerciseStore = create((set) => ({
  selectedExercise: null,
  setSelectedExercise: (exercise) => set({ selectedExercise: exercise }),
}));