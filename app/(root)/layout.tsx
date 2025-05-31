import React from 'react'
import Sidebar from '@/components/nav/Sidebar'
import Header from '@/components/nav/Header'
import { getCurrentUser } from '@/lib/actions/users.action'
import { redirect } from 'next/navigation';
const Layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser=await getCurrentUser()
  if(!currentUser){
    return redirect('/sign-in')
  }
  return (
    <main className='flex h-screen'>
        <Sidebar {...currentUser}/>
        <section className="flex h-full flex-1 flex-col" >
        <Header/>
                <div className="main-content">{children}</div>

        </section>
    </main>
  )
}

export default Layout