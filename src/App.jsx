import React, { useState, useEffect } from 'react';
import { motion, useDragControls } from 'framer-motion';
import { Cat, Pointer } from 'lucide-react';
import { Copyright } from 'lucide-react';


const App = () => {
  const [positions, setPositions] = useState([
    
  ]);
  const controls = useDragControls()

  function startDrag(event) {
    controls.start(event)
  }

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

  return (
    <div className='relative w-screen h-screen bg-gradient-to-br from-teal-400 via-emerald-500 to-cyan-600 overflow-hidden'>
  {/* Header fijo en la parte superior */}
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

  {/* Botón centrado en la pantalla */}
  <div className="absolute inset-0 flex justify-center items-center z-50">
    <button 
      onClick={addNewCat} 
      className="flex items-center justify-center px-6 py-3 bg-amber-400 text-amber-900 rounded-full font-bold text-xl shadow-lg transition-all duration-300 ease-in-out hover:bg-amber-300 hover:text-amber-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 active:bg-amber-500"  >
      TKI HNA A 9TETA
      <Cat className="ml-2 w-6 h-6" aria-hidden="true" />
    </button>
  </div>
  <div onPointerDown={startDrag} />
  <div onPointerDown={startDrag} style={{ touchAction: "none" }} />
  <motion.div drag dragConstraints={{      top: -50,
      left: -50,
      right: 50,
      bottom: 50,}} className=" w-1/2 absolute top-1/2 left 1/4">
    HOLA
  </motion.div>
  
  {positions.map((pos) => (
    
    <motion.img
    drag="x" dragControls={controls}
    whileHover={{ scale: 1.05 }}
    whileDrag={{ scale: 2.5, transition: { duration: 1.5 } }} 
      className='absolute cursor-pointer z-100'
      key={pos.id}
      src={`/${pos.image}`} // Carga la imagen aleatoria
      alt="Gato"
      animate={{ x: pos.x, y: pos.y }}
      transition={{ duration: 0.5, ease: 'linear' }}
      style={{
        position: 'absolute',
        width: '10vh',
        top:'0%',
        transform: 'translate(50%, 50%)', 
             
      }}
      onError={(e) => {
        
        target.src = '/placeholder.svg?height=100&width=100'
      }}
    />
  ))}
  <motion.div drag="x" dragControls={controls} />
</div>


  );
};

export default App;
