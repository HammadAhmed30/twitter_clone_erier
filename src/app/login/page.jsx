"use client"
import Wrapper from '@/components/Wrapper'
import React, { useEffect } from 'react'
import { useUserContext } from '../../../firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../firebase/firebase';
import { useRouter } from 'next/navigation'


// Provider
const Provider  = new GoogleAuthProvider()


export default function Page() {

    // initialization
    const {user, updateUser } = useUserContext();
    const router = useRouter()


    // Functions
    const loginWithGoogle = async () => {
        try {
            const {user} = await signInWithPopup(auth, Provider)
            updateUser(user)
        } catch (error) {
            console.log(error)
        }
    }

    
    // useEffect
    useEffect(()=>{
        if(user){
            router.push("/")
        }
    },[user])

    return (
        <div className='w-full'>
            <Wrapper className={"h-[100vh] flex justify-center items-center"}>
                <button className='bg-black text-white w-full max-w-[400px] py-[15px] rounded-full' onClick={loginWithGoogle}>Login with Google</button>
            </Wrapper>
        </div>
    )
}
