import React from "react";
import MusicPlayerWidget from "./components/MusicPlayerWidget";


export default function Home() {
  return (
    <section className='py-24 bg-black'>
      <div className='container'>
        <h1 className='text-xl font-bold text-center'>
          Next.js Template File
          </h1>
      </div>
      <MusicPlayerWidget/>
    </section>
  )
}