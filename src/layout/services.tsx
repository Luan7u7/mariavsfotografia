"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Download, Camera, Heart, Users } from "lucide-react"

const services = [
  {
    icon: Heart,
    title: "Fotografia de Casamento",
    description: "Capturando o seu dia especial com visão artística e profundidade emocional",
    price: "A partir de R$2,500",
    features: ["8 horas de cobertura", "Sessão de noivado", "500+ fotos editadas", "Galeria online"],
  },
  {
    icon: Users,
    title: "Sessão de Retrato",
    description: "Fotografias profissionais que revelam sua autenticidade",
    price: "A partir de R$350",
    features: ["1 hora de sessão", "25+ fotos editadas", "Consultoria de vestimenta", "Liberação de impressão"],
  },
  {
    icon: Camera,
    title: "Fotografia de Eventos",
    description: "Documentando seus eventos corporativos e ocasiões especiais",
    price: "A partir de R$800",
    features: ["4 horas de cobertura", "200+ fotos editadas", "Preview do mesmo dia", "Licença comercial"],
  },
]

const contracts = [
  { name: "Contrato de Fotografia de Casamento", type: "PDF" },
  { name: "Contrato de Sessão de Retrato", type: "PDF" },
  { name: "Contrato de Fotografia de Eventos", type: "PDF" },
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
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-6 tracking-tight">Serviços e Pacotes</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">Tudo que você precisa para capturar os momentos mais importantes da sua vida</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-zinc-100 rounded-lg p-8 hover:shadow-lg  duration-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <service.icon className="w-12 h-12 text-gray-700 mb-6" />
              <h3 className="text-2xl font-light  text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              <div className="text-2xl font-light text-gray-900 mb-6">{service.price}</div>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-gray-600  flex items-center">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-zinc-100 rounded-lg p-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-light text-gray-900 mb-6 text-center">Contratos</h3>
          <p className="text-gray-600 text-center mb-8 leading-relaxed">
            Baixe os nossos contratos padrão para revisar os termos e condições
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
