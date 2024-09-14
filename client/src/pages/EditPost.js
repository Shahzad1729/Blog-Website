import { useEffect, useState } from "react";
import { Navigate,useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditPost(){
    const {id} =useParams();
    const [title,setTitle]=useState('');
    const [summary,setSummary]=useState('');
    const [content,setContent]=useState('');
    const [files,setFiles]=useState('');
    const [redirect,setRedirect]=useState(false);
    const [isDelete,setDelete]=useState(false);


    useEffect(()=>{
        fetch("http://localhost:4000/post/"+id)
        .then(response =>{
            response.json().then(postInfo=>{
                setTitle(postInfo.title);
                setSummary(postInfo.summary);
                setContent(postInfo.content);
              })
        })
    },[])

    async function updatePost(ev)
    {
        ev.preventDefault();

        const data=new FormData();
        
        data.set('title',title);
        data.set('summary',summary);
        data.set('content',content);
        data.set('id',id);
        if(files?.[0])
        {
            data.set('file',files[0]);
        }
       
        const response=await fetch("http://localhost:4000/post",{
            method:'PUT',
            body:data,
            credentials:'include',
        });

        if(response.status===200)
        {
            setRedirect(true);
        }
    }

    async function deletePost(ev)
    {
        ev.preventDefault();
        const response=await fetch("http://localhost:4000/post/delete",{
            method:"POST",
            body:JSON.stringify({id}),
            headers:{'Content-Type':'application/json'},
            credentials:'include'
        });
        if(response.status===200)
            {
               setDelete(true);
            }
    }

    if(redirect)
    {
        alert("Post updated successfully")
        return <Navigate to={"/post/"+id} />
    }
    if(isDelete)
    {
        return <Navigate to={'/'} />
    }

    return (
        <div>
       <form onSubmit={updatePost}>
        <input type="title" 
        placeholder={'Title'} 
        value={title}
        onChange={ev=>setTitle(ev.target.value)}
        />
        <input type="summary"
        placeholder={'Summary'}
        value={summary}
        onChange={ev=>setSummary(ev.target.value)}
        />
        <input 
        type="file"
        onChange={ev=>setFiles(ev.target.files)}
        />
        <Editor value={content} onChange={setContent}/>
        <button>Update Post</button>
       </form>
       <form onSubmit={deletePost}>
       <button className="delete-btn">Delete Post</button>
       </form>
       </div>
    )
}