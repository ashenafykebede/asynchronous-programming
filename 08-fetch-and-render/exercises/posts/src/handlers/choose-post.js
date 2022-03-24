import { typicodeResource } from "../api-calls/typicode-resource.js";

export const choosePost = async (event)=>{
    const postId = event.target.form.postId.value;
    const root = document.getElementById('root');
    root.innerHTML='';

    const response = await typicodeResource('posts',postId);
    console.log(response);
}