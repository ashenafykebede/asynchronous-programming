import {renderUser} from '../components/render-user.js';
import {typiCode} from '../api-calls/typicode-resource.js';

export const chooseUser = async (event)=>{
    const userId = event.target.form.userId.value;

    const root = document.getElementById('root');
    root.innerHTML = "";

    const userPromise = typiCode('users',userId);
    const todosPromise = typiCode('users',userId,'todos');

    const [user,todos] = await Promise.all([userPromise,todosPromise]);
    const userElement = renderUser(user,todos);

    root.appendChild(userElement);
    
}