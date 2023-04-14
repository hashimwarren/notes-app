const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'Your notes...'
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.tittle === title)

    if (!duplicateNote) {
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



const removeNote = (title) => {
    //console.log(title);
    const notes = loadNotes()

    const filteredNotes = notes.filter((note) => title !== note.title)

    if (notes.length === filteredNotes.length) {
        console.log(chalk.bgRed.bold('No note found'));


    } else {
        console.log(chalk.bgGreen.bold('Note deleted'));

    }

    saveNotes(filteredNotes)

    console.table(filteredNotes);


}

const listNotes = () => {
    console.log(chalk.bgWhite.bold('Your Notes'));
    const notes = loadNotes()
    notes.forEach((item) => {
        console.log(item.title);
    })

}

const readNote = (title) => {
    const notes = loadNotes()
    const foundNote = notes.find((note) => note.title === title)

    if (foundNote) {

        console.log(chalk.inverse(foundNote.title), foundNote.body);
    } else {
        console.log(chalk.red('ERROR'));
    }





}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
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
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}