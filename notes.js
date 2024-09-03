const fs = require('fs')
const chalk = require('chalk')
const { title } = require('process')

const addNote = function(title, body){
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        console.log(chalk.green.inverse('new note added'))
        saveNotes(notes)
    }else{
        console.log(chalk.red.inverse('title taken'))
    }
    
}

const removeNote = function(title){
    const notes = loadNotes()
    const noteskeep = notes.filter((note) => note.title !== title)

    if(notes.length > noteskeep.length){
        console.log(chalk.green.inverse('note remove'))
        saveNotes(noteskeep)
    }else{
        console.log(chalk.red.inverse('no note found'))
    }
}

const listNotes = function(){
    const notes = loadNotes()
    console.log(chalk.inverse('Your notes'))

    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNotes = function(title){
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }else{
        console.log('No note found')
    }
}

const saveNotes = function(notes){
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJson)
}

const loadNotes = function(){
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch(e){
        return []
    }  
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}