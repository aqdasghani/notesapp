const inputNotes = document.getElementById("input");
const addBtn = document.getElementById("addbutton");
const notesContainer = document.getElementById("notesContainer");

function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function getNotes() {
    const notes = JSON.parse(localStorage.getItem('notes'));
    return notes ? notes : [];
}

function createNoteElement(inputText, index) {

    const parentDiv = document.createElement('div');
    parentDiv.classList.add('parentDiv')

    const buttonsDiv = document.createElement('div')
    buttonsDiv.classList.add('buttonsDiv')

    const newDiv = document.createElement('div');
    newDiv.classList.add('newDiv');
    newDiv.innerText = inputText;
    parentDiv.append(newDiv);

    const deleteBtn = document.createElement('button');
    const editBtn = document.createElement('button');
    deleteBtn.classList.add('deleteBtn');
    editBtn.classList.add('editBtn');

    editBtn.innerText = "Edit";
    deleteBtn.innerText = "Delete";

    buttonsDiv.append(deleteBtn, editBtn);
    parentDiv.append(newDiv, buttonsDiv);
    notesContainer.append(parentDiv)
    

    deleteBtn.addEventListener('click', () => {
        const notes = getNotes();
        notes.splice(index, 1);
        saveNotes(notes);

        renderNotes();
    });

    editBtn.addEventListener('click', () => {
        const notes = getNotes();
        inputNotes.value = notes[index];
        notes.splice(index, 1);
        saveNotes(notes);

        renderNotes();
    });
}


function renderNotes() {
    notesContainer.innerHTML = "";
    const notes = getNotes();
    notes.forEach((note, index) => {
        createNoteElement(note, index);
    });
}


addBtn.addEventListener('click', () => {
    if (inputNotes.value.trim() === "") {
        alert("Please add notes first");
        return;
    }

    const inputText = inputNotes.value;
    const notes = getNotes();
    notes.push(inputText);
    saveNotes(notes);

    inputNotes.value = "";
    renderNotes();
});


window.addEventListener('DOMContentLoaded', () => {
    renderNotes();
});
