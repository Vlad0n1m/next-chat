'use client'

import Image from "next/image";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const [username, setUsername] = useState('')
  const [warn, setWarn] = useState({ code: 'no', message: 'no' })
  const router = useRouter()
  useEffect(() => {
    if (localStorage.getItem('username')) {
      setUsername(String(localStorage.getItem('username')))
      setTimeout(() => {
        router.push('/chat')
      }, 1000);
    }
  }, [])
  const connectToSocket = () => {
    if (username == '') {
      setWarn({ code: 'error', message: 'Никнейм не может быть пустой :|' })
    } else {
      const socket = io('http://localhost:3333', {
        query: {
          username: username
        }
      })
      socket.on('warn', (data) => {
        setWarn(data)
        if (data.code == 'success') {
          localStorage.setItem('username', username)
          setTimeout(() => {
            router.push('/chat')
          }, 1000);
        }

      })
    }
  }
  return (
    <div className="flex flex-col gap-8 items-center h-screen justify-center">
      <h1 className="text-[70px] font-black max-w-[1000px] transition-all" >{username ? `С возвращением, ${username}!` : 'Впервые?'}</h1>
      <div className="flex flex-col gap-4">
        <input placeholder="ЮЗЕРНЕЙМ" value={username} className="bg-transparent border-4 rounded-xl p-8 font-black uppercase leading-none text-[24px] ring-4 focus:ring-fuchsia-600 focus:border-fuchsia-600  transition-all" onChange={(event) => setUsername(event.target.value)} type="text" name="username" id="username" required />
        <button onClick={connectToSocket} className={`${warn.code == 'success' ? 'opacity-10 events-none' : 'bg-red-500'} select-none cursor-pointer bg-transparent border-4 rounded-xl p-8 font-black uppercase leading-none text-[24px] hover:scale-2 hover:border-fuchsia-600 hover:text-fuchsia-600 transition-all`}>Присоединиться к сессии</button>
        <p className={`${warn.code != 'no' ? 'block' : 'hidden'} ${warn.code == 'success' ? 'bg-green-500' : 'bg-red-500'}  p-2 w-max rounded-xl`}>{warn.message}</p>
      </div>
    </div>
  );
}
