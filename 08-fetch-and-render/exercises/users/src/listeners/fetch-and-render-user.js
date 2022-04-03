import {chooseUser} from '../handlers/choose-user.js';

export const fetchAndRenderUser = (id='')=>{
    document.getElementById(id).addEventListener('click',chooseUser);
}