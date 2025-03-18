// Select the HTML element with the class 'notes-container' and store it in the 'notesContainer' variable
const notesContainer = document.querySelector(".notes-container");

// Select the HTML element with the class 'btn' and store it in the 'createBtn' variable
const createBtn = document.querySelector(".btn");

// Select all HTML elements with the class 'input-box' and store them in the 'notes' variable
let notes = document.querySelectorAll(".input-box");

// Define a function 'showNotes' that will display the notes stored in local storage
function showNotes(){
    // Set the innerHTML of the 'notesContainer' element to the value stored in local storage under the key 'notes'
    notesContainer.innerHTML = localStorage.getItem("notes");
}

// Call the 'showNotes' function to display any existing notes
showNotes();    

// Define a function 'updateStorage' that will update the notes stored in local storage
function updateStorage() {
    // Set the value stored in local storage under the key 'notes' to the current innerHTML of the 'notesContainer' element
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Add an event listener to the 'createBtn' element that will trigger when the button is clicked
createBtn.addEventListener("click", ()=>{
    // Create a new HTML paragraph element
    let inputBox = document.createElement("p");
    
    // Create a new HTML image element
    let img = document.createElement("img");
    
    // Set the class of the new paragraph element to 'input-box'
    inputBox.className = "input-box";
    
    // Make the new paragraph element editable
    inputBox.setAttribute("contenteditable", "true");
    
    // Set the source of the new image element to 'images/delete.png'
    img.src = "images/delete.png";
    
    // Append the new paragraph element to the 'notesContainer' element, and then append the new image element to the paragraph element
    notesContainer.appendChild(inputBox).appendChild(img);
});

// Add an event listener to the 'notesContainer' element that will trigger when any element inside it is clicked
notesContainer.addEventListener("click", function(e){
    // Check if the element that was clicked is an image
    if(e.target.tagName === "IMG"){
        // Remove the parent element of the image (i.e. the paragraph element that contains the image)
        e.target.parentElement.remove();
        
        // Update the notes stored in local storage
        updateStorage();
    }
    // Check if the element that was clicked is a paragraph
    else if(e.target.tagName === "P"){
        // Update the 'notes' variable to include any new paragraph elements that may have been added
        notes = document.querySelectorAll(".input-box");
        
        // Loop through each paragraph element
        notes.forEach(nt => {
            // Add an event listener to each paragraph element that will trigger when a key is pressed and released
            nt.onkeyup = function(){
                // Update the notes stored in local storage
                updateStorage();
            }
        });
    }
});

// Add an event listener to the document that will trigger when a key is pressed down
document.addEventListener("keydown", event => {
    // Check if the pressed key is "Enter"
    if(event.key === "Enter"){
        // Insert a line break in the editable content
        document.execCommand("insertLineBreak");
        // Prevent the default action of the Enter key (which is to submit a form or create a new line)
        event.preventDefault();
    }
});