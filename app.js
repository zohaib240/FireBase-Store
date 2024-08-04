
import {
  collection,
  addDoc,
  getDocs,} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { Db } from "./config.js";


const form = document.querySelector("#form");
const todo = document.querySelector("#todo");
const ul = document.querySelector("#ul");

const arr=[];

function renderTodo () {
  ul.innerHTML=''
  if (arr.length===0) {
      ul.innerHTML='no datafound'
      return
  }else{
  arr.map((item)=>{
 ul.innerHTML+=`<li>${item.todo}</li>`
  })
   
  }
}

async function getData() {
  
  const querySnapshot = await getDocs(collection(Db, "todos"));
  querySnapshot.forEach((doc) => {
    console.log(doc.data());
    arr.push(doc.data());
  });
  console.log(arr);
  renderTodo();

}

getData();




form.addEventListener('submit',async (event)=>{
    event.preventDefault()
  arr.push({
    todo:todo.value,
  })
  console.log(arr)
renderTodo()
try {
  const docRef = await addDoc(collection(Db, "todos"), {
    todo: todo.value,
  });
  todo.value = "";
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}

todo.value=''
})