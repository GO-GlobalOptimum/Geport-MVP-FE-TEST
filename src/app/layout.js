//"use client";
import { Control } from "./Control";
import "./globals.css";
import Link from 'next/link';

export const metadata = {
  title: "Web tutorials",
  description: "Generated by Can",
};
export default async function RootLayout({ children }) {
    const resp = await fetch(process.env.NEXT_PUBLIC_API_URL+'topics', {cache:'no-store'});
    const topics = await resp.json();
  return (
    <html>
      <body>
        <h1 ><Link href ="/">WEB</Link></h1>
        <ol>
          {topics.map((topic)=>{
            return <li key={topic.id}><Link href={`/read/${topic.id}`}>{topic.title}</Link></li>
          })}
        </ol>
        {children}
        <Control/>
        </body>
    </html>
  );
}
