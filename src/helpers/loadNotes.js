import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async(uid = '') => {
    if (!uid) throw new Error('uid is required');
    const notes = [];
    const notesSnap = await getDocs(collection(FirebaseDB, `${uid}/journal/notes`));
    notesSnap.forEach(snapHijo => {
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data()
        })
    })
    return notes;
}
