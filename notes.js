const fs = require('fs')
const chalk = require('chalk')

const getNotes = function () {
    return 'Your notes...'
}

const addNote = function (title, body) {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse(`New note "${title}" added!`))
    } else {
        console.log(chalk.red.inverse(`Note title "${title}" taken!`))
    }
}



const removeNote = function (title) {
    //console.log(title);
    const notes = loadNotes()

    const filteredNotes = notes.filter(function (note) {
        return title !== note.title

    })

    if (notes.length === filteredNotes.length) {
        console.log(chalk.bgRed.bold('No note found'));


    } else {
        console.log(chalk.bgGreen.bold('Note deleted'));

    }

    saveNotes(filteredNotes)

    console.table(filteredNotes);


}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}