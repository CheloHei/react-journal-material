import { TurnedInNot } from '@mui/icons-material'
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../store/journal/journalSlice';

export const SidebarItem = ({id,title ='',body,date,imageUrls=[]}) => {

    const dispatch = useDispatch();

    const activeItem = ()=>{
        dispatch(setActiveNote({id,title,body,date,imageUrls}))
    }
    const newTitle = useMemo(() => {
        return title.length > 17 ? title.substr(0,17) + '...' : title;
    },[title])

  return (
    <ListItem disablePadding>
    <ListItemButton
    onClick={activeItem}
    >
        <ListItemIcon>
            <TurnedInNot />
        </ListItemIcon>
        <Grid container>
            <ListItemText primary={ newTitle } />
            <ListItemText secondary={ body } />
        </Grid>
    </ListItemButton>
</ListItem>
  )
}
