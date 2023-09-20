"use client"

import Wrapper from '@/components/Wrapper'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useUserContext } from '../../../../firebase/auth'
import Navbar from '@/components/Navbar'


export default function Page() {

    const data = [
        1, 2, 3, 45, 6, 7, 87, 9, 9, 3, 45, 6, 7, 8
    ]

    const router = useRouter()
    const params = useParams()
    const { user, posts } = useUserContext();

    // Functions




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
    // useEffect
    useEffect(() => {
        if (!user) {
            router.push("/login")
        }
    }, [user])
    return (
        <div className='w-full'>
            <Navbar />

            <Wrapper>
                <p className='mt-[13px]'>Posts {"("}{posts?.length}{")"}</p>
                {posts?.map((item, index) => {

                    return (
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
            </Wrapper>
        </div>
    )
}
