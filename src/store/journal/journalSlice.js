import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving:false,
        saveMessage:'',
        notes:[],
        active:null
    },
    reducers: {
        creatingNewNote: (state) => {
            state.isSaving = true;
            state.saveMessage = 'Creating new note';
        },
        addNewNote:(state,action)=>{
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote:(state,action)=>{
            state.active = action.payload;
            state.saveMessage = '';
        },
        setNotes:(state,action)=>{
            state.notes = action.payload;
        },
        setSaving:(state)=>{
            state.isSaving = true;
            state.saveMessage = '';
        },
        updateNote:(state,action)=>{
            state.isSaving = false;
            state.notes = state.notes.map(note=>{
                if(note.id===action.payload.id){
                    return action.payload;
                }
                return note;
            })
            state.saveMessage = `${action.payload.title} actualizada`;
        },
        setPhotosActiveNote:(state,action)=>{
            state.isSaving = false;
            state.active.imageUrls = [...state.active.imageUrls,...action.payload];
        },
        clearNotesLogout:(state)=>{
            state.isSaving = false;
            state.saveMessage = '';
            state.notes = [];
            state.active = null;
        },
        deleteNoteById:(state,action)=>{
            state.isSaving = false;
            state.notes = state.notes.filter(note=>note.id!==action.payload);
            state.active = null;
        },
    }
});


// Action creators are generated for each case reducer function
export const { addNewNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,creatingNewNote,
    setPhotosActiveNote,
    clearNotesLogout } = journalSlice.actions;