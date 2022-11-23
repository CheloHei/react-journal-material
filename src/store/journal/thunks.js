import {collection, deleteDoc, doc, getDocs, setDoc}  from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { fileUpload } from '../../helpers/fileUpload';
import { loadNotes } from '../../helpers/loadNotes';
import { addNewNote, setActiveNote,creatingNewNote, setNotes, setSaving, updateNote, setPhotosActiveNote, deleteNoteById } from './journalSlice';


export const startNewNote = () => {

    return async(dispatch,getState) => {
        dispatch(creatingNewNote())
        const {uid} = getState().auth;

        const newNote = {
            title:'',
            body:'',
            date: new Date().getTime()
        }
        const newDoc = doc(collection(FirebaseDB,`${uid}/journal/notes`));
        const respDoc = await setDoc(newDoc, newNote);
        console.log(respDoc)

        newNote.id = newDoc.id;
        dispatch(addNewNote(newNote));
        dispatch(setActiveNote(newNote));
    }

}
export const startLoadingNotes = () => {

    return async(dispatch,getState) => {
        const {uid} = getState().auth;
        if(!uid) throw new Error('uid is required'); 

        const notes = await loadNotes(uid);
        
        dispatch(setNotes(notes));
    }

}

export const startUpdateNotes = () => {

    return async(dispatch,getState) => {
        dispatch(setSaving())
        const {uid} = getState().auth;
        if(!uid) throw new Error('uid is required'); 
        const {active} = getState().journal;

        const noteToFirestore = {...active};
        delete noteToFirestore.id;

        const docRef = doc(FirebaseDB,`${uid}/journal/notes/${active.id}`);

        await setDoc(docRef,noteToFirestore,{merge:true});
        
        dispatch(updateNote(active));
        // const notes = await loadNotes(uid);
        
        // dispatch(setNotes(notes));
    }

}
export const startUploadingFiles = (files=[]) => {

    return async(dispatch) => {
        dispatch(setSaving())
        console.log(files)
        const fileUploadPromises = [];
        for(const file of files){
            fileUploadPromises.push(fileUpload(file));
        }
        const urls = await Promise.all(fileUploadPromises);
        console.log(urls);

        dispatch(setPhotosActiveNote(urls));
    }

}

export const startDeletingNote = ()=>{
    return async(dispatch,getState)=>{
        const {uid} = getState().auth;
        const {active} = getState().journal;
        const docRef = doc(FirebaseDB,`${uid}/journal/notes/${active.id}`);
        await deleteDoc(docRef);
        dispatch(deleteNoteById(active.id));
    }
}