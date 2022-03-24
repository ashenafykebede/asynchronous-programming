import {choosePost} from '../handlers/choose-post.js';

export const fetchAndRenderPost = (id='')=>{

    //document.getElementById(id).addEventListener('click',choosePost);
    document.getElementById(id).addEventListener('click', choosePost);
}