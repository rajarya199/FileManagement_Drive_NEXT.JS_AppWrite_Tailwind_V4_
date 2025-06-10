"use client"
import React,{useState,useEffect} from 'react'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Models } from "node-appwrite";

import { Input } from './ui/input'
const Search = () => {
  const[query,setQuery]=useState<string>("")
  const searchParams = useSearchParams();
    const searchQuery = searchParams.get("query") || "";

    const router = useRouter();
  const path = usePathname();
  const [results, setResults] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
    }
  }, [searchQuery]);

  return (
    <div className='search'>
      <div className='search-input-wrapper'>
         <Image
          src="/assets/icons/search.svg"
          alt="Search"
          width={24}
          height={24}
        />
        <Input
          value={query}
          placeholder="Search..."
          className="search-input"
          onChange={(e) => setQuery(e.target.value)}
        />

      </div>

    </div>
  )
}

export default Search