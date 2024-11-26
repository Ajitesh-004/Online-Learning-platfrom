import { atom } from "recoil";

export const coursesAtom = atom({
    key: "coursesAtom", // Unique key for this atom
    default: [], 
})