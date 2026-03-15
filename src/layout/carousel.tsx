"use client";

import type React from "react";

import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useState, useRef, useSyncExternalStore, useCallback } from "react";

// Photography-related meaningful words
const photographyWords = [
  {
    word: "Momentos",
    image: "placeholder.svg?height=600&width=800",
    description: "Capturando emoções fugazes",
  },
  {
    word: "Luz",
    image: "placeholder.svg?height=600&width=800",
    description: "Jogando com a iluminação natural",
  },
  {
    word: "Emoção",
    image: "placeholder.svg?height=600&width=800",
    description: "Sentimentos brutos preservados para sempre",
  },
  {
    word: "Memórias",
    image: "placeholder.svg?height=600&width=800",
    description: "Recolhimentos eternos",
  },
  {
    word: "Histórias",
    image: "placeholder.svg?height=600&width=800",
    description: "Narrativas visuais se desenrolam",
  },
  {
    word: "Perspectiva",
    image: "placeholder.svg?height=600&width=800",
    description: "Ângulos únicos e pontos de vista",
  },
  {
    word: "Conexão",
    image: "placeholder.svg?height=600&width=800",
    description: "Vínculos humanos imortais",
  },
  {
    word: "Composição",
    image: "placeholder.svg?height=600&width=800",
    description: "Arranjo artístico de elementos",
  },
  {
    word: "Atmosfera",
    image: "placeholder.svg?height=600&width=800",
    description: "Ambiente e atmosfera capturados",
  },
  {
    word: "Nostalgia",
    image: "placeholder.svg?height=600&width=800",
    description: "Viagens sentimentais",
  },
  {
    word: "Contraste",
    image: "placeholder.svg?height=600&width=800",
    description: "Juxtaposição de elementos",
  },
  {
    word: "Candidato",
    image: "placeholder.svg?height=600&width=800",
    description: "Expressões autênticas não-posadas",
  },
  {
    word: "Silhueta",
    image: "placeholder.svg?height=600&width=800",
    description: "Contornos dramáticos contra a luz",
  },
  {
    word: "Textura",
    image: "placeholder.svg?height=600&width=800",
    description: "Elementos visuais táteis",
  },
  {
    word: "Reflexão",
    image: "placeholder.svg?height=600&width=800",
    description: "Beleza refletida em superfícies",
  },
];

// --- Window size via useSyncExternalStore (sem useEffect) ---
function subscribeToWindowSize(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function getWindowSizeSnapshot() {
  return JSON.stringify({
    width: window.innerWidth,
    height: window.innerHeight,
  });
}

function getServerSnapshot() {
  return JSON.stringify({ width: 0, height: 0 });
}

export default function Carousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Desktop: palavra em hover + rect do elemento para posicionar acima
  const [hoveredInfo, setHoveredInfo] = useState<{
    word: string;
    rect: { top: number; left: number; width: number; height: number };
  } | null>(null);

  // Popup mobile: controla a palavra clicada e a posição do elemento
  const [clickedWord, setClickedWord] = useState<{
    word: string;
    rect: { top: number; left: number; width: number };
  } | null>(null);

  // Window size reativo SEM useEffect
  const windowSizeRaw = useSyncExternalStore(
    subscribeToWindowSize,
    getWindowSizeSnapshot,
    getServerSnapshot,
  );
  const windowSize: { width: number; height: number } =
    JSON.parse(windowSizeRaw);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // Desktop: captura rect da palavra ao entrar com o mouse
  const handleMouseEnter = (word: string, e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setHoveredInfo({
      word,
      rect: {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      },
    });
  };

  // Popup mobile: ao clicar na palavra
  const handleWordClick = useCallback(
    (word: string, e: React.MouseEvent | React.TouchEvent) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setClickedWord((prev) =>
        prev?.word === word
          ? null
          : {
              word,
              rect: { top: rect.top, left: rect.left, width: rect.width },
            },
      );
    },
    [],
  );

  // Fecha popup ao clicar fora
  const handleBackdropClick = useCallback(() => {
    setClickedWord(null);
  }, []);

  const getWordSize = (index: number) => {
    // Mobile: tamanhos menores | Desktop: tamanhos maiores
    const sizes = [
      "text-sm md:text-xl",
      "text-base md:text-2xl",
      "text-lg md:text-3xl",
      "text-xl md:text-4xl",
      "text-lg md:text-5xl",
      "text-base md:text-6xl",
    ];
    return sizes[index % sizes.length];
  };

  const getWordPosition = (index: number) => {
    // Layout orgânico e espalhado — mobile proporcional ao desktop
    const positions = [
      "justify-start ml-4 md:ml-6",
      "justify-end mr-1 md:mr-10",
      "justify-center ml-8 md:ml-14",
      "justify-start ml-12 md:mr-16",
      "justify-end mr-6 md:ml-20",
      "justify-start ml-1 md:mr-24",
      "justify-center mr-8 md:ml-12",
      "justify-end mr-3 md:mr-24",
      "justify-start ml-10 md:ml-28",
      "justify-center ml-2 md:ml-8",
      "justify-end mr-10 md:mr-16",
      "justify-start ml-6 md:ml-20",
      "justify-center mr-5 md:mr-12",
      "justify-end ml-3 md:ml-10",
      "justify-start ml-8 md:ml-16",
    ];
    return positions[index % positions.length];
  };

  const getWordDetails = (word: string) => {
    return photographyWords.find((item) => item.word === word);
  };

  // Posição do preview desktop: centralizado acima da palavra em hover
  const calculatePreviewPosition = () => {
    if (!windowSize.width || !hoveredInfo) return { top: 0, left: 0 };

    const previewWidth = 288; // w-72 = 18rem = 288px
    const previewHeight = 360; // imagem + texto
    const gap = 12; // espaço entre preview e palavra

    // Centraliza horizontalmente em relação à palavra
    let left =
      hoveredInfo.rect.left + hoveredInfo.rect.width / 2 - previewWidth / 2;
    // Posiciona acima da palavra
    let top = hoveredInfo.rect.top - previewHeight - gap;

    // Garantir que não saia pela esquerda
    if (left < 8) left = 8;
    // Garantir que não saia pela direita
    if (left + previewWidth > windowSize.width - 8) {
      left = windowSize.width - previewWidth - 8;
    }
    // Se não cabe acima, posiciona abaixo da palavra
    if (top < 8) {
      top = hoveredInfo.rect.top + hoveredInfo.rect.height + gap;
    }

    return { top, left };
  };

  const previewPosition = calculatePreviewPosition();

  // Popup mobile: centralizado na tela
  const calculateMobilePopupPosition = () => {
    if (!clickedWord || !windowSize.width) return { top: 0, left: 0 };

    const popupWidth = 280; // largura do popup mobile
    const popupHeight = 300;

    // Centraliza horizontalmente na tela
    const left = (windowSize.width - popupWidth) / 2;
    // Centraliza verticalmente na tela (levemente acima do centro)
    const top = (windowSize.height - popupHeight) / 2 - 40;

    return { top: Math.max(16, top), left: Math.max(8, left) };
  };

  const mobilePopupPosition = calculateMobilePopupPosition();

  return (
    <motion.section
      id="carousel"
      ref={sectionRef}
      className="py-20 overflow-hidden"
      style={{ opacity }}
    >
      <motion.div className="max-w-7xl mx-auto px-4" style={{ y }}>
        <motion.h2
          className="text-4xl md:text-5xl font-light text-center text-gray-900 mb-16 tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Momentos
        </motion.h2>

        <motion.div
          className="relative min-h-[500px] md:min-h-[600px] flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          <div
            id="palco"
            className="w-full max-w-6xl bg-red-300 mx-auto flex flex-wrap justify-center items-center gap-x-6 gap-y-6 md:gap-x-24 md:gap-y-12 py-8 md:py-16 px-2 md:px-0 overflow-hidden"
          >
            {photographyWords.map((item, index) => (
              <motion.div
                key={index}
                className={`flex bg-purple-500 ${getWordPosition(index)} w-auto`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <motion.span
                  className={`${getWordSize(index)} text-gray-800 bg-red-600 font-light tracking-widest cursor-pointer relative hover:text-gray-900 transition-colors duration-300`}
                  onMouseEnter={(e) => handleMouseEnter(item.word, e)}
                  onMouseLeave={() => setHoveredInfo(null)}
                  onClick={(e) => handleWordClick(item.word, e)}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    handleWordClick(item.word, e);
                  }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.word}
                </motion.span>
              </motion.div>
            ))}
          </div>

          {/* Desktop: Preview posicionado acima da palavra em hover */}
          <AnimatePresence>
            {hoveredInfo && (
              <motion.div
                ref={previewRef}
                className="fixed pointer-events-none z-50 hidden md:block"
                initial={{ opacity: 0, scale: 0.9, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 8 }}
                transition={{
                  type: "spring",
                  damping: 25,
                  stiffness: 350,
                  mass: 0.6,
                }}
                style={{
                  top: previewPosition.top,
                  left: previewPosition.left,
                }}
              >
                <div className="flex flex-col">
                  <div className="w-72 h-64 rounded-t-lg overflow-hidden shadow-2xl bg-white">
                    <div className="relative w-full h-full">
                      <img
                        src={getWordDetails(hoveredInfo.word)?.image || ""}
                        alt={hoveredInfo.word}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-b-lg shadow-2xl w-72">
                    <h3 className="text-xl font-light text-gray-900 mb-1">
                      {hoveredInfo.word}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {getWordDetails(hoveredInfo.word)?.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile: Popup ao clicar na palavra */}
          <AnimatePresence>
            {clickedWord && (
              <>
                {/* Backdrop invisível para fechar */}
                <motion.div
                  className="fixed inset-0 z-40 md:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleBackdropClick}
                />

                <motion.div
                  className="fixed z-50 md:hidden"
                  style={{
                    top: mobilePopupPosition.top,
                    left: mobilePopupPosition.left,
                  }}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 350,
                  }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-[280px] rounded-xl overflow-hidden shadow-2xl bg-white border border-gray-100">
                      <div className="relative w-full h-44">
                        <img
                          src={getWordDetails(clickedWord.word)?.image || ""}
                          alt={clickedWord.word}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-light text-gray-900 mb-1">
                          {clickedWord.word}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {getWordDetails(clickedWord.word)?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 italic">
            - Uma frase foda de algum fotografo foda
          </p>
          <p className="text-gray-500 text-sm mt-2">- Maria Alice</p>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
