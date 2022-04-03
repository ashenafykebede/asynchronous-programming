import { ORIGIN } from "../config.js";

export const typiCode = async (...params)=>{

    const subPath = params.join("/");
    const url = `${ORIGIN}/${subPath}`;
    const encodedURL = encodeURI(url);
    const response = await fetch(encodedURL);
    const data = await response.json();
    return data;
}