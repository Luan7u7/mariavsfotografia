"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react"

const contactInfo = [
  { icon: Mail, label: "Email", value: "mariaaliiceveiga@gmail.com", href: "mailto:mariaalice@gmail.com" },
  { icon: Phone, label: "Phone", value: "(31) 7555-8047"  , href: "tel:31 7555-8047" },
  { icon: MapPin, label: "Location", value: "Belo Horizonte, MG", href: "#" },
]

const socialLinks = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com/sarahchen.photo" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com/sarahchen.photo" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/sarahchen_photo" },
]

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section ref={sectionRef} className="py-20 bg-gray-900 text-white">
      <motion.div className="max-w-7xl mx-auto px-4" style={{ y }}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-light mb-6 tracking-tight">Let's Create Together</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Ready to capture your story? Get in touch to discuss your photography needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-light mb-8">Get In Touch</h3>
            <div className="space-y-6">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  className="flex items-center group hover:text-gray-300 transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  <item.icon className="w-6 h-6 mr-4 text-gray-400 group-hover:text-gray-300 transition-colors" />
                  <div>
                    <div className="text-sm text-gray-400 uppercase tracking-wider">{item.label}</div>
                    <div className="text-lg">{item.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="mt-12">
              <h4 className="text-xl font-light mb-6">Follow My Work</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-gray-800 rounded-lg p-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-light mb-6">Send a Message</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label className="block text-sm text-gray-300 mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                    placeholder="John"
                  />
                </motion.div>
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <label className="block text-sm text-gray-300 mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                    placeholder="Doe"
                  />
                </motion.div>
              </div>

              <motion.div whileFocus={{ scale: 1.02 }}>
                <label className="block text-sm text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                  placeholder="john@example.com"
                />
              </motion.div>

              <motion.div whileFocus={{ scale: 1.02 }}>
                <label className="block text-sm text-gray-300 mb-2">Message</label>
                <textarea
                  rows={4}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors resize-none"
                  placeholder="Tell me about your photography needs..."
                ></textarea>
              </motion.div>

              <motion.button
                type="submit"
                className="w-full bg-white text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-16 pt-8 border-t border-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400">© 2024 Maria Alice Photography. All rights reserved.</p>
          <p className="text-gray-400">create by Luan Veiga</p>

        </motion.div>
      </motion.div>
    </section>
  )
}
