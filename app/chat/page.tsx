'use client'
import io from 'socket.io-client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Chat() {
    const router = useRouter();
    useEffect(() => {
        if (!localStorage.getItem('username')) {
            router.push('/')
        } else {
            const socket = io('http://localhost:3333', {
                query: {
                    username: localStorage.getItem('username')
                }
            })
        }
    }, []);

    return (
        <div className="flex flex-col gap-4">
{localStorage.getItem('username')}
        </div>
    )
}