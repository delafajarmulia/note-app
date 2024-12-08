import React from 'react'
import NoteItemContent from './NoteItemContent'
import { NoteItemAction } from './NoteItemAction'

function NotesList({ isArchived, notes, onDelete, onChangeArchive }){
    const hasData = notes.filter(note => note.archived === isArchived)

    return(
        <div className="notes-list">
            {
                hasData.length > 0 ? (
                    hasData.map((note) => (
                        <div className="note-item">
                            <NoteItemContent 
                                key={note.id}
                                id={note.id}
                                {...note}
                            />
                            <NoteItemAction 
                                id={note.id}
                                onDelete={onDelete}
                                onChangeArchive={onChangeArchive}
                            />
                        </div>
                    ))
                ) : (
                    <p className="notes-list__empty-message">Tidak ada catatan</p>
                )
            }
        </div>
    )
}

export default NotesList