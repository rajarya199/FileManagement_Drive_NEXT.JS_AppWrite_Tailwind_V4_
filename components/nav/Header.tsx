import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
const Header = () => {
  return (
    <header className='header'>
        search
<div className='header-wrapper'>
    file uploader
    <form action="">
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