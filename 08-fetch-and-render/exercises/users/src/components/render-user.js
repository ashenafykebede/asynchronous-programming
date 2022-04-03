import {renderToDo} from './render-to-do.js'

export const renderUser = (user='',todos=[])=>{
console.log('user data rendered');
const userContainer = document.createElement('div');
userContainer.id = `user-${user.id}`;

const h1El = document.createElement('h1');
h1El.innerHTML = user.username;
userContainer.appendChild(h1El);

const pEleName = document.createElement('p');
pEleName.innerHTML= `name: ${user.name}`;
userContainer.appendChild(pEleName);

const pElEmail = document.createElement('p');
pElEmail.innerHTML= `email: ${user.email}`;
userContainer.appendChild(pElEmail);

const pEleWebsite = document.createElement('p');
pEleWebsite.innerHTML= `website: <a href="${user.website}" target="_blank"> ${user.website}</a>`;
userContainer.appendChild(pEleWebsite);

const todosElement = todos.map(renderToDo).reduce((all,next)=>{
all.appendChild(next);
return all;
},document.createElement('div'));

userContainer.appendChild(todosElement);

return userContainer;
}