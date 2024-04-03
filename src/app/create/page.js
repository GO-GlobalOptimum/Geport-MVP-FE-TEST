"use client"
import {useRouter} from "next/navigation";

export default function Create(){
    const router = useRouter();
    return (
        <>
        <form onSubmit={(e)=>{
            e.preventDefault();//주소가 바뀌는 걸 방지
            const title = e.target.title.value;//target은 form 태그를 가리킨다.
            const body = e.target.body.value;
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({title, body})
            }//json 타입으로 데이터를 변경해서
            fetch(process.env.NEXT_PUBLIC_API_URL+`topics`, options)//위에 있는 options를 같이 넘겨주는 것이다.
            .then(res=>res.json())
            .then(result=>{
                console.log(result);
                const lastid = result.id;
                router.refresh();
                router.push(`/read/${lastid}`);
            })
        }}>
            <p>
                <input type="text" name="title" placeholder="title"/>
            </p>
            <p>
                <textarea name="body" placeholder="body"></textarea>
            </p>
            <p>
                <input type="submit" value="create"/>
            </p>
        </form>
        </>
    )
}