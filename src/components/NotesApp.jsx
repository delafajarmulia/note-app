import React from 'react'
import { getInitialData, showFormattedDate } from '../utils'
import NotesHeader from './NotesHeader'
import NotesInput from './NotesInput'
import NotesList from './NotesList'

class NotesApp extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            notes: this.changeFormatDate()
        }

        this.changeFormatDate = this.changeFormatDate.bind(this)
        this.onAddNoteHandler = this.onAddNoteHandler.bind(this)
        this.onDeleteHandler = this.onDeleteHandler.bind(this)
        this.onChangeArchiveHandler = this.onChangeArchiveHandler.bind(this)
        this.onSearchTitleHandler = this.onSearchTitleHandler.bind(this)
    }

    changeFormatDate(){
        let notes = getInitialData()
        notes = notes.map((note) => (
            {
                id : note.id,
                title : note.title,
                body : note.body,
                createdAt : showFormattedDate(note.createdAt),
                archived : note.archived
            }
        ))
        return notes
    }

    onAddNoteHandler({ title, body }){
        this.setState((prevState) => {
            return{
                notes: [
                    ...prevState.notes,
                    {
                        id: +new Date(),
                        title,
                        body,
                        createdAt: showFormattedDate(+new Date()),
                        archived: false
                    }
                ]
            }
        })
    }

    onDeleteHandler(id){
        const notes = this.state.notes.filter(note => note.id !== id)
        this.setState({ notes })
    }

    onChangeArchiveHandler(id){
        const notes = this.state.notes
        const note = notes.filter(note => note.id === id)
        const findIndex = notes.findIndex(note => note.id === id)
        const tempNote = {
            id: note[0].id,
            title: note[0].title,
            body: note[0].body,
            createdAt: note[0].createdAt,
            archived: note[0].archived === true ? false : true
        }
        notes[findIndex] = tempNote
        this.setState({ notes })
        return note
    }

    onSearchTitleHandler(title){
        const notes = this.state.notes
        let valueLength = title.length
        
        if(valueLength === 0){
            this.setState(() => {
                return {
                    notes: this.changeFormatDate()
                }
            })
        } else {
            this.setState(() => {
                return {
                    notes: this.state.notes.filter(note => 
                        note.title.toLowerCase().includes(title)
                    )
                }
            })
        }
    }

    render(){
        return(
            <div className="">
                <NotesHeader 
                    searchNote={this.onSearchTitleHandler}
                />
                <div className="note-app__body">
                    <NotesInput 
                        addNote={this.onAddNoteHandler}
                    />
                    <h2>Catatan Aktif</h2>
                    <NotesList
                        key={this.state.notes.length + 1}
                        isArchived={false}
                        notes={this.state.notes} 
                        onDelete={this.onDeleteHandler}
                        onChangeArchive = {this.onChangeArchiveHandler}
                    />
                    <h2>Arsip</h2>
                    <NotesList
                        key={this.state.notes.length - 1}
                        isArchived={true}
                        notes={this.state.notes} 
                        onDelete={this.onDeleteHandler}
                        onChangeArchive = {this.onChangeArchiveHandler}
                    />
                </div>
            </div>
        )
    }
}

export default NotesApp