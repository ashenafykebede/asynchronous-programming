import { renderComment } from "./render-comment.js";

export const renderPost = (post={},comments=[])=>{
    // console.log('rendered');

    const postContainer = document.createElement('div');
    postContainer.id = `post-${post.id}`;

    const H1Ele = document.createElement('h1');
    H1Ele.innerHTML = post.title;
    postContainer.appendChild(H1Ele);

    const codeEle = document.createElement('code');
    codeEle.innerHTML = `posted by user:${post.userId}`;
    postContainer.appendChild(codeEle);

    const PEle = document.createElement('p');
    PEle.innerHTML = post.body;
    postContainer.appendChild(PEle);

    const commentsElement = comments.map(renderComment).reduce((all,next)=>{
     all.appendChild(next);
     return all;
    },document.createElement('div'));
    postContainer.appendChild(commentsElement);

    return postContainer;
}