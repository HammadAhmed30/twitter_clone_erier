"use client"

import Navbar from '@/components/Navbar'
import Wrapper from '@/components/Wrapper'
import { signOut } from 'firebase/auth'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../../firebase/firebase'
import { useUserContext } from '../../../firebase/auth'
import { useParams, useRouter } from 'next/navigation'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'

export default function Page() {

    // States
    const [tweet, setTweet] = useState("")



    const { user, updateUser, posts, updatePosts } = useUserContext();

    const data = [
        1, 2, 3, 45, 6, 7, 87, 9, 9, 3, 45, 6, 7, 8
    ]
    const router = useRouter()
    const params = useParams()


    useEffect(() => {
        if (!user) {
            router.push("/login")
        }
        if(user){
            updatePosts(null)
            fetchData()
        }
    }, [user])


    // Functions

    const createPost = async () => {
        try {
            if (tweet === "") {
                return;
            }
            const docRef = await addDoc(collection(db, "posts"), {
                tweeter: user?.uid,
                content: tweet,
                name:user?.displayName

            });
            fetchData()
        } catch (error) {
            console.log(error)
        }
    }

    const deletePost = async () => {
        try {
            console.log("deletePost")
        } catch (error) {
            console.log(error)
        }
    }

    const editPost = async () => {
        try {
            console.log("editPost")
        } catch (error) {
            console.log(error)
        }
    }
    const fetchData = async () => {
        try {
            let data = []
            const q = query(collection(db, "posts"), where("tweeter", "==", params.user));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id })
            });
            updatePosts(data)
        } catch (error) {
            console.log(error)
        }
    }
    const logOut = () => {
        signOut(auth).then(() => updateUser(null))
    }


    return (
        <div className='w-full relative'>
            <button className='bg-[black] text-white px-[25px] py-[10px] mt-[20px] text-[20px] rounded-md fixed bottom-[10px] right-[10px]' onClick={logOut}>Log Out</button>
            <Navbar />

            <Wrapper>

                {params.user === user?.uid ? <div className='w-full flex flex-col justify-center items-center'>
                    <input className='w-full border-[2px] border-black px-[10px] outline-none py-[15px] bg-[#eeeeee] mt-[20px]' type='text' value={tweet} onChange={(e) => setTweet(e.target.value)} />
                    <button className='bg-[black] text-white px-[25px] py-[10px] mt-[20px] text-[20px] rounded-md' onClick={createPost}>Create Post</button>
                </div> : ""}

                <p className='text-center mt-[20px] text-[25px] font-[800] underline'>Some Posts</p>
                <div className='w-full'>
                    {posts?.map((item, index) => {

                        return index < 3 && (
                            <div className='my-[20px] bg-[#eeeeee] p-[20px]' key={index}>
                                <div className='flex justify-between items-center'>

                                    <div className='flex pb-[10px] items-center'>
                                        <img className='w-[50px] h-[50px] rounded-full shadow-lg shadow-[#9d9d9da9] border border-black' src="/avatar.png" alt="" />
                                        <p className='ml-[10px] font-[600] text-[13px]'>{item.name}</p>
                                    </div>
                                    <p className='font-[300] text-[10px]'>Nov 12, 2023, 6:50PM</p>
                                </div>
                                <p className='w-full mx-auto text-[16px] font-[400]'>{item.content}</p>
                                {params.user === user?.uid ? <div>
                                    <button className='bg-[black] text-white px-[15px] py-[4px] mt-[13px] text-[14px] rounded-md' onClick={editPost}>Edit</button>
                                    <button className='bg-[black] text-white px-[15px] py-[4px] mt-[13px] text-[14px] rounded-md ml-[15px]' onClick={deletePost}>Delete</button>
                                </div> : ""}
                            </div>

                        )
                    })}
                </div>
                <div className='w-full flex justify-center pb-[20px]'>

                    <Link href={`/${user?.uid}/post`} className=" text-center underline text-[blue]">See All</Link>
                </div>
            </Wrapper>
        </div>
    )
}
