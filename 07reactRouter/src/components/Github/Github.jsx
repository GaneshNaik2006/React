import { useEffect,useState } from "react";
import {useLoaderData} from 'react-router-dom'
function Github(){
    const data=useLoaderData();
    // const [data,setData]=useState([]);

    // useEffect(
    //     ()=>{
    //         fetch("https://api.github.com/users/GaneshNaik2006 ")
    //         .then(res=>res.json())
    //         .then(data=>setData(data))
    //     },[]
    // )
    return(
        <div  className="text-xl font-bold text-center p-4 bg-amber-400 ">
            Github:{data.followers}
            <img src={data.avatar_url} alt="Avatar" className="rounded-full w-16 h-16 mx-auto" />
        </div>
    )
}

export default Github;

export const Githubinfo= async()=>{
    const res=await fetch("https://api.github.com/users/GaneshNaik2006 ")
    const data=await res.json();
    return data;
}