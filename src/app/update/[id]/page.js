"use client"
import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";

export default function Update(){
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('')
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    useEffect(() =>{
        fetch('http://localhost:9999/topics/'+id)
        .then(resp=>resp.json())
        .then(result=>{
            setTitle(result.title);
            setBody(result.body);
        })
    }, []);
    return (
        <>
        <form onSubmit={(e)=>{
            e.preventDefault();//주소가 바뀌는 걸 방지
            const title = e.target.title.value;//target은 form 태그를 가리킨다.
            const body = e.target.body.value;
            const options = {
                method: 'PATCH',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({title, body})
            }//json 타입으로 데이터를 변경해서
            fetch(`http://localhost:9999/topics/`+id, options)//위에 있는 options를 같이 넘겨주는 것이다.
            .then(res=>res.json())
            .then(result=>{
                console.log(result);
                const lastid = result.id;
                router.refresh();
                router.push(`/read/${lastid}`);
            })
        }}>
            <p>
                <input
                 type="text"
                 name="title" 
                 placeholder="title" 
                 value={title}
                 onChange={e=>setTitle(e.target.value)}/>
            </p>
            <p>
                <textarea 
                 name="body" 
                 placeholder="body" 
                 value={body}
                 onChange={e=>setBody(e.target.value)}></textarea>
            </p>
            <p>
                <input type="submit" value="update"/>
            </p>
        </form>
        </>
    )
}