import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { signOutuser } from '@/lib/actions/users.action'
import FileUploader from '../upload/FileUploader'
import Search from '@/components/Search'
const Header = ({userId,accountId}:{  userId: string;
  accountId: string}) => {
  return (
    <header className='header'>
      <Search/>
<div className='header-wrapper'>
          <FileUploader ownerId={userId} accountId={accountId} />

    <form  action={async () => {
            "use server";

            await signOutuser();
          }}>
 <Button type="submit" className="sign-out-button">
            <Image
              src="/assets/icons/logout.svg"
              alt="logo"
              width={24}
              height={24}
              className="w-6"
            />
          </Button>
    </form>
      
</div>
    </header>
  )
}

export default Header