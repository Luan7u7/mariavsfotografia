"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.3,
      },
    },
  }

  // const itemVariants = {
  //   hidden: { opacity: 0, y: 30 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: { duration: 0.8, ease: "easeOut" },
  //   },
  // }

  // const scrollToCarousel = () => {
  //   document.getElementById("carousel")?.scrollIntoView({ behavior: "smooth" })
  // }
  // const scrollToServices = () => {
  //   document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
  // }
  const scrollToPortfolio = () => {
    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })
  }
  // const scrollToContact = () => {
  //   document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  // }

  return (
    <section className="relative h-screen flex items-center  justify-center bg-gradient-to-br from-[#f5f5f5] to-[#c5c5c5">
      <div className="absolute inset-0 bg-black/5"></div>

      <motion.div
        className="text-center z-10 px-4 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl flex flex-col justify-center items-center font-light text-gray-900 mb-6 tracking-tight"
           variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
            }
          }}
        > 
          <img src="assets/logo.png" alt="logo" className=" w-3/4 h-3/4 antialiased" />
          {/* Maria Alice */}
        </motion.h1>

        <motion.p className="text-xl md:text-2xl text-gray-600 mb-8 font-light tracking-wide" 
        variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
            }
          }}>
          Visual Storyteller
        </motion.p>

        <motion.p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed" 
        variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
            }
          }}>
          Capturing life's most precious moments through the lens of artistry and emotion
        </motion.p>

        <motion.button
          onClick={scrollToPortfolio}
          className="inline-flex items-center text-gray-700 hover:text-gray-900 transition-colors duration-300"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
            }
          }}
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
        >
          <span className="mr-2 text-sm tracking-wider uppercase">Explore Work</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </motion.button>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="w-px h-16 bg-gradient-to-b from-gray-400 to-transparent"></div>
      </motion.div>
    </section>
  )
}
