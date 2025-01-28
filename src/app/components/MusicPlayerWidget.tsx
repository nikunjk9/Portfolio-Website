"use client"

import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"

interface Song {
  title: string
  artist: string
  coverUrl: string
  audioUrl: string
}

const playlist: Song[] = [
  {
    title: "FE!N",
    artist: "Travis Scott",
    coverUrl: "/images/icon1.png",
    audioUrl: "/audio/audio1.mp3",
  },
  {
    title: "TORE UP",
    artist: "Don Toliver",
    coverUrl: "/images/icon3.png",
    audioUrl: "/audio/audio2.mp3",
  },
  {
    title: "BADDERS",
    artist: "Skrillex, PEEKABOO, Flowdan, & G-Rex ",
    coverUrl: "/images/icon5.png",
    audioUrl: "/audio/audio3.mp3",
  },
  // Add more songs as needed
]

export default function MusicPlayerWidget() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentSong = playlist[currentSongIndex]

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentSongIndex])// Removed unnecessary dependency: currentSongIndex

  const toggleCollapse = () => setIsCollapsed(!isCollapsed)
  const togglePlayPause = () => setIsPlaying(!isPlaying)

  const skipForward = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % playlist.length)
    setIsPlaying(true)
  }
  
  const skipBackward = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length)
    setIsPlaying(true)
  }


  return (
    <div className="fixed left-0 bottom-8 px-8 lg:block z-70">
      <div className="relative duration-100">
        <button
          onClick={toggleCollapse}
          className="absolute duration-300 hover:scale-110 active:scale-95 transform flex items-center justify-center -top-5 -right-5 z-30 h-10 w-10 border-2 rounded-full overflow-hidden bg-white bg-opacity-20 backdrop-blur-3xl text-white border-opacity-20 border-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-current" viewBox="0 0 24 24">
            <path d="M0 10h24v4h-24z" />
          </svg>
        </button>
        <div
          className={`duration-300 bg-white bg-opacity-20 backdrop-blur-3xl border-[.75px] border-solid border-opacity-10 border-white text-white shadow-md rounded-md relative flex ${
            isCollapsed ? "w-36" : "w-[445px]"
          }`}
        >
          <div className="flex items-center w-full h-[54px]">
            <Image
              src={currentSong.coverUrl || "/placeholder.svg"}
              alt=""
              width={1000}
              height={1000}
              className="transform duration-200 w-20 h-20 -translate-y-3 "
            />

            <div className="icon ml-4 mt-3 playingicon">
              <span className="bg-opacity-80 text-red-600 "></span>
              <span className="bg-opacity-80 text-red-600"></span>
              <span className="bg-opacity-80 text-red-600"></span>
            </div>

            <audio ref={audioRef} src={currentSong.audioUrl} />

            {!isCollapsed && (
              <div className="flex items-center justify-between flex-1 pr-2">
                <div className="text-left w-40 pr-10 flex flex-col justify-center">
                  <h3 className="font-bold uppercase text-[18px] tracking-wide font-['ATC_Arquette'] -mb-1">
                    {currentSong.title}
                  </h3>
                  <h4 className="uppercase font-semibold text-[11px] opacity-40 truncate max-w-[160px] ">
                    {currentSong.artist}
                  </h4>
                </div>
                <div className="grid grid-cols-3  -ml-20 w-36">
                  <button
                    onClick={skipBackward}
                    className="flex items-center justify-center transform hover:scale-110 active:scale-95"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="32"
                      width="32"
                    >
                      <path d="m16 7-7 5 7 5zm-7 5V7H7v10h2z"></path>
                    </svg>
                  </button>
                  <button
                    onClick={togglePlayPause}
                    className="flex items-center justify-center transform hover:scale-110 active:scale-95 rounded-full"
                  >
                    {isPlaying ? (
                      <svg 
                        width="27" 
                        height="27" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg">
                        <rect 
                            x="6" 
                            y="4" 
                            width="4" 
                            height="16" 
                            rx="1" 
                            fill="currentColor" 
                        />
                        <rect 
                            x="14" 
                            y="4" 
                            width="4" 
                            height="16" 
                            rx="1" 
                            fill="currentColor" 
                        />
                      </svg>
                    ) : (
                      <svg 
                        width="27" 
                        height="27" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M8 5.14v14.72a1 1 0 001.5.86l11-7.36a1 1 0 000-1.72l-11-7.36a1 1 0 00-1.5.86z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={skipForward}
                    className="flex items-center justify-center transform hover:scale-110 active:scale-95"
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="32"
                      width="32"
                    >
                      <path d="M7 7v10l7-5zm9 10V7h-2v10z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

