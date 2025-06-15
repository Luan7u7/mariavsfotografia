"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const portfolioImages = [
  { src: "/placeholder.svg?height=400&width=300", title: "Casamento", category: "Wedding" },
  { src: "/placeholder.svg?height=400&width=300", title: "Retratos", category: "Street" },
  { src: "/placeholder.svg?height=400&width=300", title: "Eventos", category: "Portrait" },
  { src: "/placeholder.svg?height=400&width=300", title: "Paisagens", category: "Landscape" },
  { src: "/placeholder.svg?height=400&width=300", title: "Momentos Intimos", category: "Wedding" },
  { src: "/placeholder.svg?height=400&width=300", title: "City Lights", category: "Street" },
  { src: "/placeholder.svg?height=400&width=300", title: "Timeless Grace", category: "Portrait" },
  { src: "/placeholder.svg?height=400&width=300", title: "Serenidade", category: "Landscape" },
]

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section id="portfolio" ref={sectionRef} className="py-10 bg-gray-50">
      <motion.div id="portfolio" className="max-w-7xl mx-auto px-4" style={{ y }}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">Portfólio</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Uma coleção de momentos que contam histórias além das palavras
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioImages.map((image, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <motion.img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 0.4 }}
              >
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-medium mb-1">{image.title}</h3>
                  <p className="text-sm text-gray-300">{image.category}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
