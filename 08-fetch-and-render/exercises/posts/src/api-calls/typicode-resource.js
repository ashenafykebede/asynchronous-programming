import { ORIGIN } from "../config.js";
export const typicodeResource = async(...params)=>{
    const path = params.join('/');
    const url =`${ORIGIN}/${path}`
    const encodedURI = encodeURI(url)
    const response = await fetch(encodedURI);
    const data = await response.json();
    return data;
}