import React from 'react'
import Sidebar from '@/components/nav/Sidebar'
import Header from '@/components/nav/Header'
const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='flex h-screen'>
        <Sidebar/>
        <section className="flex h-full flex-1 flex-col" >
        <Header/>
                <div className="main-content">{children}</div>

        </section>
    </main>
  )
}

export default Layout