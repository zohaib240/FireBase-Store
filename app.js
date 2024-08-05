


import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { Db } from "./config.js";

const form = document.querySelector("#form");
const todo = document.querySelector("#todo");
const ul = document.querySelector("#ul");
let arr = [];

// Render todos
function renderTodo() {
  ul.innerHTML = '';
  if (arr.length === 0) {
    ul.innerHTML = 'No data found';
    return;
  }
  arr.forEach((item, index) => {
    ul.innerHTML += `
      <li>
        ${item.todo} 
        <button type='button' class="deletebtn" data-index="${index}">Delete todo</button> 
        <button type='button' class="editbtn" data-index="${index}">Edit todo</button>
      </li>`;
  });
}

// Fetch and display todos
async function getData() {
  arr = [];
  const querySnapshot = await getDocs(collection(Db, "todos"));
  querySnapshot.forEach((doc) => {
    arr.push({ id: doc.id, todo: doc.data().todo });
  });
  renderTodo();
}

getData();

// Add a new todo
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const newTodo = todo.value.trim();
  if (newTodo === '') return;

  try {
    const docRef = await addDoc(collection(Db, "todos"), { todo: newTodo });
    arr.push({ id: docRef.id, todo: newTodo });
    renderTodo();
    todo.value = "";
  } catch (e) {
    console.error("Error adding document: ", e);
  }
});

// Event delegation for delete and edit buttons
ul.addEventListener('click', async (event) => {
  const target = event.target;
  const index = target.getAttribute('data-index');
  if (target.classList.contains('deletebtn')) {
    const todoId = arr[index].id;
    await deleteDoc(doc(Db, "todos", todoId));
    arr.splice(index, 1);
    renderTodo();
  } else if (target.classList.contains('editbtn')) {
    const updatedNewValue = prompt("Enter new value", arr[index].todo);
    if (updatedNewValue === null || updatedNewValue.trim() === '') return;

    const todoId = arr[index].id;
    await updateDoc(doc(Db, "todos", todoId), { todo: updatedNewValue });
    arr[index].todo = updatedNewValue;
    renderTodo();
  }
});






