"use client"
import Navbar from '@/components/Navbar'
import Wrapper from '@/components/Wrapper'
import React, { useEffect } from 'react'
import { useUserContext } from '../../firebase/auth';
import { useParams, useRouter } from 'next/navigation';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Link from 'next/link';


export default function Page() {

  // initialization
  const { user, updatePosts, posts, updateAllUsers } = useUserContext();
  const router = useRouter()


  const data = [
    1, 2, 3, 45, 6, 7, 87, 9, 9, 3, 45, 6, 7, 8
  ]

  // useEffect
  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
    if (user) {
      fetchData()
      fetchUsers()
    }
  }, [user])
  const fetchData = async () => {
    try {
      let data = []
      const q = query(collection(db, "posts"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id })
      });
      updatePosts(data)
    } catch (error) {
      console.log(error)
    }
  }



  // Function

  const fetchUsers = () => {
    try {

      let searchNames = new Set()
      posts.map((item) => {

        searchNames.add(item.name)
      })
      updateAllUsers(Array.from(searchNames))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='relative w-full'>
      <Navbar />
      <Wrapper>


        <div className='w-full'>
          {posts?.map((item, index) => {

            return (
              <div className='my-[20px] bg-[#eeeeee] p-[20px]' key={index}>
                <div className='flex justify-between items-center'>

                  <div className='flex pb-[10px] items-center'>
                    <img className='w-[50px] h-[50px] rounded-full shadow-lg shadow-[#9d9d9da9] border border-black' src="/avatar.png" alt="" />
                    <Link href={`/${item.tweeter}`} className='ml-[10px] font-[600] text-[13px]'>{item.name}</Link>
                  </div>
                  <p className='font-[300] text-[10px]'>Nov 12, 2023, 6:50PM</p>
                </div>
                <p className='w-full mx-auto text-[16px] font-[400]'>{item.content}</p>

              </div>

            )
          })}
        </div>
      </Wrapper>
    </div>
  )
}
