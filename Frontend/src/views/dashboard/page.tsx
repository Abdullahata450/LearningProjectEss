'use client'
import { useSession , signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const page = () => {
  const {data:session , status} = useSession();
  const router = useRouter();

  useEffect(()=>{
    if(status === 'unauthenticated'){
      router.push('/auth/signin');
    }
  })

  return (
    <div>
        <h1 className="bg-black text-2xl text-white p-5">Dashboard</h1>      
    </div>
  )
}

export default page
