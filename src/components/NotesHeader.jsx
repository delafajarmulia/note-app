import React from 'react'

class NotesHeader extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            keyword: ''
        }

        this.onKeywordChangeEventHandler = this.onKeywordChangeEventHandler.bind(this)
    }

    onKeywordChangeEventHandler(event){
        event.preventDefault()
        this.props.searchNote(event.target.value)
    }

    render(){
        return(
            <div className="note-app__header">
                <h1>
                    Dela's Notes App 🚀
                </h1>
                <div className="note-search">
                    <input type="text" placeholder="Cari catatan ..." onChange={this.onKeywordChangeEventHandler}/>
                </div>
            </div>
        )
    }
}

export default NotesHeader