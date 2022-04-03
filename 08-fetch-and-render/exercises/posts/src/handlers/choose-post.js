import { typicodeResource } from "../api-calls/typicode-resource.js";
import { renderPost} from "../components/render-post.js"

export const choosePost = async (event)=>{
    const postId = event.target.form.postId.value;
    const root = document.getElementById('root');
    root.innerHTML='';

    const postPromise = await typicodeResource('posts',postId);
    const commentsPromise = await typicodeResource('posts',postId,'comments');

    const [post,comments] = await Promise.all([postPromise,commentsPromise]);

    const PostElement = renderPost(post,comments);
    root.appendChild(PostElement);
    console.log("Im here");
}