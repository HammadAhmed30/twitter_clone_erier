import React from 'react'
import Wrapper from './Wrapper'
import Link from 'next/link'
import { useUserContext } from '../../firebase/auth'


export default function Navbar() {


    const {user} = useUserContext()
    return (
        <div className='w-full'>
            <Wrapper>
                <div className='w-full flex justify-between items-center py-[20px]'>
                    <Link href={"/"} className='font-[900] italic'>ERIER</Link>
                    <Link href={`/${user?.uid}`}>
                    <img className='w-[40px] border border-black rounded-full' src="/avatar.png" alt="" />
                    </Link>
                </div>
                {/* <div className='w-full relative flex justify-center'>
                    <input className='w-full border-b-[2px] border-black px-[10px] outline-none py-[15px] bg-[#eeeeee]' type='text' onFocus={()=>{
                        setFocus(true)
                    }} />
                    <div className='w-full absolute top-[100%] left-0 bg-[white]'>
                        {allUsers?.map((item,index)=>{
                            return<Link key={index} href={`/${item}`}>
                                {item}
                            </Link>
                        })}
                    </div>
                </div> */}
            </Wrapper>
        </div>
    )
}
