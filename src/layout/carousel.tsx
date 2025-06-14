"use client"

import type React from "react"

import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useRef, useEffect } from "react"

// Photography-related meaningful words
const photographyWords = [
  { word: "Moments", image: "/placeholder.svg?height=600&width=800", description: "Capturing fleeting emotions" },
  { word: "Light", image: "/placeholder.svg?height=600&width=800", description: "Playing with natural illumination" },
  { word: "Emotion", image: "/placeholder.svg?height=600&width=800", description: "Raw feelings preserved forever" },
  { word: "Memories", image: "/placeholder.svg?height=600&width=800", description: "Timeless recollections" },
  { word: "Stories", image: "/placeholder.svg?height=600&width=800", description: "Visual narratives unfolding" },
  { word: "Perspective", image: "/placeholder.svg?height=600&width=800", description: "Unique angles and viewpoints" },
  { word: "Connection", image: "/placeholder.svg?height=600&width=800", description: "Human bonds immortalized" },
  {
    word: "Composition",
    image: "/placeholder.svg?height=600&width=800",
    description: "Artful arrangement of elements",
  },
  { word: "Atmosphere", image: "assets/placeholder.svg?height=600&width=800", description: "Mood and ambiance captured" },
  { word: "Nostalgia", image: "assets/placeholder.svg?height=600&width=800", description: "Sentimental journeys" },
  { word: "Contrast", image: "assets/placeholder.svg?height=600&width=800", description: "Juxtaposition of elements" },
  { word: "Candid", image: "assets/placeholder.svg?height=600&width=800", description: "Unposed authentic expressions" },
  {
    word: "Silhouette",
    image: "assets/placeholder.svg?height=600&width=800",
    description: "Dramatic outlines against light",
  },
  { word: "Texture", image: "assets/placeholder.svg?height=600&width=800", description: "Tactile visual elements" },
  { word: "Reflection", image: "assets/placeholder.svg?height=600&width=800", description: "Mirrored beauty in surfaces" },
]

export default function Carousel() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const [hoveredWord, setHoveredWord] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  // Update window size on mount and resize
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Set initial size
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Track mouse position globally
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleGlobalMouseMove)
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove)
  }, [])

  const handleMouseEnter = (word: string, e: React.MouseEvent) => {
    setHoveredWord(word)
    // Ensure we have the latest mouse position when hovering starts
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  const getWordSize = (index: number) => {
    // Create varying sizes for visual interest
    const sizes = ["text-xl", "text-2xl", "text-3xl", "text-4xl", "text-5xl"]
    return sizes[index % sizes.length]
  }

  const getWordPosition = (index: number) => {
    // Create a more organic, scattered layout
    const positions = [
      "justify-start",
      "justify-center",
      "justify-end",
      "justify-start ml-12",
      "justify-center mr-16",
      "justify-end ml-20",
      "justify-start mr-8",
      "justify-center ml-24",
      "justify-end mr-12",
    ]
    return positions[index % positions.length]
  }

  const getWordDetails = (word: string) => {
    return photographyWords.find((item) => item.word === word)
  }

  // Calculate preview position that stays within screen boundaries
  const calculatePreviewPosition = () => {
    if (!windowSize.width || !hoveredWord) return { x: 0, y: 0 }

    // Default offset from cursor
    const offsetX = 20
    const offsetY = 20

    // Estimated preview dimensions (adjust based on your actual sizes)
    const previewWidth = 300 // Width of preview + padding
    const previewHeight = 400 // Height of preview + padding

    let x = mousePosition.x + offsetX
    let y = mousePosition.y - offsetY

    // Check right edge
    if (x + previewWidth > windowSize.width) {
      x = mousePosition.x - previewWidth - offsetX
    }

    // Check bottom edge
    if (y + previewHeight > windowSize.height) {
      y = mousePosition.y - previewHeight - offsetY
    }

    // Check left edge (ensure preview doesn't go off-screen left)
    if (x < 0) {
      x = offsetX
    }

    // Check top edge (ensure preview doesn't go off-screen top)
    if (y < 0) {
      y = offsetY
    }

    return { x, y }
  }

  // Get the current preview position
  const previewPosition = calculatePreviewPosition()

  return (
    <motion.section id="carousel" ref={sectionRef} className="py-20 overflow-hidden" style={{ opacity }}>
      <motion.div className="max-w-7xl mx-auto px-4" style={{ y }}>
        <motion.h2
          className="text-4xl md:text-5xl font-light text-center text-gray-900 mb-16 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Featured Work
        </motion.h2>

        <motion.div
          className="relative min-h-[500px] md:min-h-[600px] flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="w-full max-w-4xl mx-auto flex flex-wrap justify-center items-center gap-x-6 gap-y-10 py-12">
            {photographyWords.map((item, index) => (
              <motion.div
                key={index}
                className={`flex ${getWordPosition(index)} w-auto`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <motion.span
                  className={`${getWordSize(index)} text-gray-800 font-light tracking-wide cursor-pointer relative hover:text-gray-900 transition-colors duration-300`}
                  onMouseEnter={(e) => handleMouseEnter(item.word, e)}
                  onMouseLeave={() => setHoveredWord(null)}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.word}
                </motion.span>
              </motion.div>
            ))}
          </div>

          {/* Floating image preview with fixed positioning */}
          {hoveredWord && (
            <motion.div
              ref={previewRef}
              className="fixed pointer-events-none z-50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: previewPosition.x - previewPosition.x/0.9,
                y: previewPosition.y - previewPosition.y/0.9,
              }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 400,
                mass: 0.8,
              }}
              style={{ top: previewPosition.y - previewPosition.y / 2, left: previewPosition.x - previewPosition.y / 2 }}
            >
              <div className="flex flex-col">
                <div className="w-64 h-64 md:w-72 md:h-72 rounded-lg overflow-hidden shadow-2xl bg-white">
                  <div className="relative w-full h-full">
                    <img
                      src={getWordDetails(hoveredWord)?.image || ""}
                      alt={hoveredWord}
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="bg-white p-4 rounded-b-lg shadow-2xl w-64 md:w-72 -mt-1">
                  <h3 className="text-xl font-light text-gray-900 mb-1">{hoveredWord}</h3>
                  <p className="text-sm text-gray-600">{getWordDetails(hoveredWord)?.description}</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Mobile-friendly alternative view */}
        <div className="md:hidden mt-12">
          <p className="text-center text-gray-500 mb-6">Tap on words to explore featured work</p>
          <div className="grid grid-cols-2 gap-4">
            {photographyWords.slice(0, 6).map((item, index) => (
              <motion.div
                key={index}
                className="aspect-square relative rounded-lg overflow-hidden"
                whileTap={{ scale: 0.95 }}
              >
                <img src={item.image || "/placeholder.svg"} alt={item.word} className="object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-xl font-light text-white">{item.word}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 italic">"Photography is the story I fail to put into words"</p>
          <p className="text-gray-500 text-sm mt-2">— Destin Sparks</p>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}
