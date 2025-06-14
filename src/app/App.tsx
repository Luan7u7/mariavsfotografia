import { motion, useScroll, useTransform } from "framer-motion"
import Portfolio from "../layout/portfolio"
import Carousel from "../layout/carousel"
import Services from "../layout/services"
import Hero from "../layout/hero"
import { useRef } from "react"
import Contact from "../layout/contact"

function App() {
    const containerRef = useRef<HTMLDivElement>(null)

   const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })
const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  return (
    <div className="bg-white">
     <motion.div style={{ opacity }}>
        <Hero />
      </motion.div>
      <Portfolio />
      <Carousel />
      <Services />
      <Contact />
    </div>
  )
}

export default App
