"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Download, Camera, Heart, Users } from "lucide-react"

const services = [
  {
    icon: Heart,
    title: "Wedding Photography",
    description: "Capturing your special day with artistic vision and emotional depth",
    price: "Starting at $2,500",
    features: ["8-hour coverage", "Engagement session", "500+ edited photos", "Online gallery"],
  },
  {
    icon: Users,
    title: "Portrait Sessions",
    description: "Professional portraits that reveal your authentic self",
    price: "Starting at $350",
    features: ["1-hour session", "25+ edited photos", "Wardrobe consultation", "Print release"],
  },
  {
    icon: Camera,
    title: "Event Photography",
    description: "Documenting your corporate events and special occasions",
    price: "Starting at $800",
    features: ["4-hour coverage", "200+ edited photos", "Same-day preview", "Commercial license"],
  },
]

const contracts = [
  { name: "Wedding Photography Contract", type: "PDF" },
  { name: "Portrait Session Agreement", type: "PDF" },
  { name: "Event Photography Terms", type: "PDF" },
]

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <motion.div className="max-w-7xl mx-auto px-4" style={{ y }}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">Services & Packages</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Tailored photography services to meet your unique needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <service.icon className="w-12 h-12 text-gray-700 mb-6" />
              <h3 className="text-2xl font-light text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              <div className="text-2xl font-light text-gray-900 mb-6">{service.price}</div>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-gray-600 flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-gray-50 rounded-lg p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-light text-gray-900 mb-6 text-center">Contract Templates</h3>
          <p className="text-gray-600 text-center mb-8 leading-relaxed">
            Download our standard contract templates to review terms and conditions
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contracts.map((contract, index) => (
              <motion.button
                key={index}
                className="flex items-center justify-between bg-white p-4 rounded-lg hover:shadow-md transition-shadow duration-300 group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center">
                  <Download className="w-5 h-5 text-gray-600 mr-3 group-hover:text-gray-900 transition-colors" />
                  <span className="text-gray-700 group-hover:text-gray-900 transition-colors">{contract.name}</span>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{contract.type}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
