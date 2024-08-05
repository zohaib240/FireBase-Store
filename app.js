
import {
  collection,
  addDoc,
  getDocs,
deleteDoc} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";
import { Db } from "./config.js";


const form = document.querySelector("#form");
const todo = document.querySelector("#todo");
const ul = document.querySelector("#ul");
let arr=[];

function renderTodo () {
  ul.innerHTML=''
  if (arr.length===0) {
      ul.innerHTML='no datafound'
      return
  }else{
  arr.map((item)=>{
 ul.innerHTML+=`<li>${item.todo} 
  <button type='submit' class="deletebtn">Delete todo</button> 
  <button type='submit' class="editbtn">Edit todo</button></li>`
  })
   
  }
}


async function getData() {
  arr=[]
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


// delete data from arry and firestore


let deleteBtn = document.querySelector('.deletebtn')

// deletebtn.forEach((btn,index)=>{

//   btn.addEventListener('click',async()=>{
//     console.log(arr[index]);
//     await deleteDoc(doc(Db,'todos',arr[index].id))
//     console.log('delete data')
//     arr.splice(index,1)
//     renderTodo()
//   })
// })

deleteBtn.forEach((btn, index) => {
  btn.addEventListener("click", async () => {
    console.log(arr[index]);
    await deleteDoc(doc(Db, "todos", arr[index].id));
    console.log("Data deleted");
    arr.splice(index, 1);
    renderTodo();
  });
});

//  edit from arry and firestore


let editBtn = document.querySelector('.editbtn')
editBtn.forEach((btn, index) => {
  btn.addEventListener("click", async () => {
    const updatedNewValue = prompt("enter new value");
    const todoUpdate = doc(Db, "todos", arr[index].id);
    await updateDoc(todoUpdate, {
      todo: updatedNewValue,
    });
    console.log("update");
    arr[index].todo = updatedNewValue;
    renderTodo();
  });
});








