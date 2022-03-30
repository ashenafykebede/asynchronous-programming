export const renderComment = (comment)=>{
    const divEle = document.createElement('div');
    divEle.id = `comment-${comment.id}`;
    divEle.className = 'comment';

    const h2Ele = document.createElement('h2');
    h2Ele.innerHTML = comment.name;
    divEle.appendChild(h2Ele);

    const codeEle = document.createElement('code');
    codeEle.innerHTML = `comment by: ${comment.email}`;
    divEle.appendChild(codeEle);

    const pEle = document.createElement('p');
    pEle.innerHTML = comment.body;
    divEle.appendChild(pEle);

    return divEle;
}