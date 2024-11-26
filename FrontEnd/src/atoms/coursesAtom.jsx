import { atom } from "recoil";

// Helper to load persisted data from localStorage
const loadCourses = () => {
  const savedCourses = localStorage.getItem("courses");
  return savedCourses ? JSON.parse(savedCourses) : [];
};

export const coursesAtom = atom({
  key: "coursesAtom", // Unique key for this atom
  default: loadCourses(), // Load persisted data as the default value
  effects: [
    ({ onSet }) => {
      // Persist data to localStorage whenever the atom is updated
      onSet((newCourses) => {
        localStorage.setItem("courses", JSON.stringify(newCourses));
      });
    },
  ],
});
