import React, { useState, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { Cat, Pointer } from 'lucide-react';
import { Copyright } from 'lucide-react';

const Loader = () => {
  
  return (
    <div className="flex h-screen bg-teal-900">
      <motion.div
        className="flex items-center"
        initial={{ opacity: 0, x: 100, }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        {/* SVG de la persona */}
        <img src='undraw_focus_sey6.svg' className="w-52 text-white" /* Aquí puedes agregar tu SVG de persona */ />
        <motion.span className="text-white text-xl ml-4" animate={{opacity:1}} initial={{opacity:0}}  transition={{ duration: 1, delay: 2}}>
          PSPSPSPSPS</motion.span>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: 1000 }}
        animate={{ opacity: 1, x: 20 }}
        transition={{ duration: 2, delay: 2.5}}
        className="flex items-center mt-10"
      >
        {/* Gato que aparece desde la izquierda */}
        <img  src='yeah.gif' className="w-32 text-white" />
        <motion.span className="text-white text-xl ml-4" animate={{opacity:1}} initial={{opacity:0}}  transition={{ duration: 1, delay: 4.5}}>
        MIAU</motion.span>
      </motion.div>
    </div>
  );
};
const App = () => {
  const [positions, setPositions] = useState([
    
  ]);
  const controls = useDragControls()
  const [loading, setLoading] = useState(true);

  function startDrag(event) {
    controls.start(event)
  }
  
  useEffect(() => {
    // Simula la carga de imágenes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 6000); // Tiempo de carga en milisegundos

    return () => clearTimeout(timer);
  }, []);


  const totalCats = 40; // Número total de imágenes de gatos que tienes

  // Función para obtener un nombre de imagen aleatoria
  // Variable para controlar la primera llamada

  const getRandomCatImage = () => {
   
  
    const randomIndex = Math.floor(Math.random() * (totalCats - 1)) + 1; // Rango 1-44
  
    if (randomIndex <= 35) {
      return `cat (${randomIndex}).png`; // 1-35 para PNG
    } else {
      console.log('mayor que 35')
      return `cat (${randomIndex}).gif`; // 36-45 para GIF
    }
  };

  // Función para generar un nuevo movimiento aleatorio
  const getRandomDirection = () => (Math.random() > 0.5 ? 1 : -1);

  // Función para generar posiciones aleatorias
  const getRandomPosition = () => ({
    id: positions.length + 1,
    x:  Math.random() * window.innerWidth / 2,
    y:   Math.random() * window.innerHeight / 2,
    directionX: getRandomDirection(),
    directionY: getRandomDirection(),
    image: getRandomCatImage(),
  });

  // Función para agregar un nuevo "gato"
  const addNewCat = () => {
    setPositions([...positions, getRandomPosition()]);
  };

  // Función que detecta si dos elementos están chocando
  const detectCollision = (pos1, pos2) => {
    const distance = Math.sqrt((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2);
    return distance < 100; // Ajusta este valor según el tamaño de tus imágenes
  };

  // Función que actualiza las posiciones de los elementos
  const updatePositions = () => {
    setPositions((prevPositions) =>
      prevPositions.map((pos) => {
        let { x, y, directionX, directionY } = pos;
        const imageSize = window.innerHeight * 0.05; // 10vh en píxeles

        // Verifica si toca los bordes de la ventana para rebotar
        if (x <= 0 || x >= window.innerWidth - imageSize) {
          
          directionX = -directionX; // Rebote horizontal
          x = Math.max(0, Math.min(x, window.innerWidth - imageSize)); // Ajusta para evitar que se salga
        }
        if (y <= 0 || y >= window.innerHeight - imageSize) {
          
          directionY = -directionY; // Rebote vertical
          y = Math.max(0, Math.min(y, window.innerHeight - imageSize)); // Ajusta para evitar que se salga
        }

        // Actualiza las posiciones sumando direcciones aleatorias
        x += directionX * 10;  // Incremento aleatorio en x
        y += directionY * 10;  // Incremento aleatorio en y

        return {
          ...pos,
          x,
          y,
          directionX,
          directionY,
        };
      })
    );
  };

  // Efecto que actualiza las posiciones en un intervalo
  useEffect(() => {
    const interval = setInterval(updatePositions, 50); // Ajusta la velocidad de actualización
    return () => clearInterval(interval);
  }, []);

  return (<div className='relative w-screen h-screen bg-gradient-to-br from-teal-400 via-emerald-500 to-cyan-600 overflow-hidden'>
    {loading ? (
      <Loader />
    ) : (
      <>
        <div className="fixed top-0 left-0 w-full py-8 px-4 sm:px-6 lg:px-8 bg-opacity-80 bg-teal-900 z-0">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex flex-col justify-center text-center mb-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
                Curso de Peluqueros Palomas
              </h1>
              <p className="text-xl text-teal-200 font-semibold mb-6 flex flex-row text-center justify-center items-center">
                9TETAT <Copyright className='w-4 h-4 ml-2 text-teal-300' aria-hidden="true" />
              </p>
              <p className="text-l text-teal-200 font-semibold flex flex-row text-center justify-center items-center">
                tiki f dik boton bzf d marrat <Copyright className='w-4 h-4 ml-2 text-teal-300' aria-hidden="true" />
              </p>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 flex justify-center items-center z-50">
          <button 
            onClick={addNewCat} 
            className="flex items-center justify-center px-6 py-3 bg-amber-400 text-amber-900 rounded-full font-bold text-xl shadow-lg transition-all duration-300 ease-in-out hover:bg-amber-300 hover:text-amber-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 active:bg-amber-500"  >
            TKI HNA A 9TETA
            <Cat className="ml-2 w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {positions.map((pos) => (
          <motion.img
            drag="x" dragControls={controls}
            whileHover={{ scale: 1.05 }}
            whileDrag={{ scale: 2.5, transition: { duration: 1.5 } }} 
            className='absolute cursor-pointer z-100'
            key={pos.id}
            src={`/${pos.image}`} 
            alt="Gato"
            animate={{ x: pos.x, y: pos.y }}
            transition={{ duration: 0.5, ease: 'linear' }}
            style={{
              position: 'absolute',
              width: '10vh',
              transform: 'translate(50%, 50%)', 
            }}
            onError={(e) => {
              e.target.src = '/placeholder.svg?height=100&width=100';
            }}
          />
        ))}
      </>
    )}
  </div>
);
};

export default App;