import { DeleteOutline, SaveOutlined, UploadFileOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useMemo, useRef } from 'react';
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { setActiveNote } from '../../store/journal/journalSlice';
import { startDeletingNote, startUpdateNotes, startUploadingFiles } from '../../store/journal/thunks';
import { ImageGallery } from '../components'

export const NoteView = () => {
    const dispatch = useDispatch()
    const {active,saveMessage,isSaving} = useSelector(state => state.journal);
    const {body,title,onInputChange,formState,date} = useForm(active)

    const dateString = useMemo(() =>{
        const newDate = new Date(date);

        return `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`

    } , [date])


    useEffect(() => {
      dispatch(setActiveNote(formState))
    }, [formState])

    useEffect(() => {
      if(saveMessage.length > 0){
        Swal.fire('Actualizada',saveMessage,'success')
      }
    }, [saveMessage])

    const onSaveNote = () => {
        dispatch(startUpdateNotes(formState))
    }
    const onFileInputChange = (e) => {
        const files = e.target.files;
        if(files === 0) return;
        dispatch(startUploadingFiles(files))
    }

    const fileInput = useRef()
    const onDelete = () =>{
        dispatch(startDeletingNote());
    }
    

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light' >{dateString}</Typography>
        </Grid>
        <Grid item>

            <input type="file" multiple
            onChange={onFileInputChange}
            style={{display:'none'}}
            accept="image/*"
            ref={fileInput}
            />
            <IconButton color="primary" disabled={isSaving}
            onClick={() => fileInput.current.click()}
            >
                <UploadFileOutlined />
            </IconButton>

            <Button 
            disabled={isSaving}
            onClick={onSaveNote}
            color="primary" sx={{ padding: 2 }}>
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                sx={{ border: 'none', mb: 1 }}
                name="title"
                value={ title }
                onChange={onInputChange}
            />

            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió en el día de hoy?"
                minRows={ 5 }
                onChange={onInputChange}
                name="body"
                value={ body }
                onChange={onInputChange}
            />
        </Grid>

        <Grid container justifyContent={'end'}>
            <Button
            onClick={onDelete}
            color="error" sx={{ padding: 2 }}>
                <DeleteOutline/>
            </Button>
        </Grid>

        {/* Image gallery */}
        <ImageGallery images={active.imageUrls}/>

    </Grid>
  )
}
