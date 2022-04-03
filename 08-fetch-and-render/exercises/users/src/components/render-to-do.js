export const renderToDo = (todo)=>{
const todoElement = document.createElement('div');
todoElement.id = `todo-${todo.id}`;
todoElement.className='todo';
let checked ="";
if(todo.completed){
    checked = "checked";
}
todoElement.innerHTML=`<input type = "checkbox" ${checked}><code>${todo.title}</code>`;

return todoElement;
}