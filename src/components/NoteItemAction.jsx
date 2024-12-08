import React from 'react'
import { Trash, BoxArrowDown } from "@phosphor-icons/react"

export function NoteItemAction({ id, onDelete, onChangeArchive}){
    return(
        <div className="note-item__action">
            <button 
                className="note-item__delete-button"
                onClick={() => onDelete(id)}    
            >
                Delete <Trash size={16} />
            </button>
            <button 
                className="note-item__archive-button"
                onClick={() => onChangeArchive(id)}
            >
                Arsipkan <BoxArrowDown size={16} />
            </button>
        </div>
    )
}