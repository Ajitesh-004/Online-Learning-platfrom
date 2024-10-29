import { atom } from 'recoil';
import Profile from '../assets/DefaultProfile.jpg';

export const profileAtom = atom({
    key: 'profileAtom', 
    default: {
        profilePicture: Profile, 
    },
});
