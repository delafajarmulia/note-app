import React from 'react'
import { Pencil, Bookmarks } from '@phosphor-icons/react'

class NotesInput extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            title: '',
            body: '',
            maxLength: 50,
            tempLength: 0
        }

        this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this)
        this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this)
        this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this)
    }

    onTitleChangeEventHandler(event){
        let maxLength = this.state.maxLength
        let valueLength = event.target.value.length
        let tempLength = this.state.tempLength
        if(valueLength > tempLength){
            this.setState(() => {
                return{
                    title: event.target.value,
                    tempLength:  valueLength, 
                    maxLength: maxLength - 1
                }
            })
        }else{
            this.setState(() => {
                return{
                    title: event.target.value,
                    tempLength:  valueLength, 
                    maxLength: maxLength + 1
                }
            })
        }
    }

    onBodyChangeEventHandler(event){
        this.setState(() => {
            return{
                body: event.target.value
            }
        })
    }

    onSubmitEventHandler(event){
        event.preventDefault()
        this.props.addNote(this.state)
    }
    
    render(){
        return(
            <div className="note-input">
                <h2>Buat Catatan <Bookmarks size={30} /></h2>
                <form onSubmit={this.onSubmitEventHandler}>
                    <p className="note-input__title__char-limit">
                        Sisa karakter : { this.state.maxLength }
                    </p>
                    <input 
                        type="text" 
                        className="note-input__title" 
                        placeholder="Ini adalah judul ..." 
                        value={this.state.title}
                        onChange={this.onTitleChangeEventHandler}
                        required
                    />
                    <textarea 
                        className="note-input__body" 
                        placeholder="Tuliskan catatanmu disini ..." 
                        value={this.state.body}
                        onChange={this.onBodyChangeEventHandler}
                        required
                    ></textarea>
                    <button type="submit">Buat <Pencil size={18} /></button>
                </form>
            </div>
        )
    }
}

export default NotesInput