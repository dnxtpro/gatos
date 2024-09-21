import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const App = () => {
  const [positions, setPositions] = useState([
    { id: 1, x: 0, y: 0, directionX: 1, directionY: 1, image: 'cat (1).png' },
    { id: 2, x: 100, y: 100, directionX: -1, directionY: -1, image: 'cat (2).png' },
  ]);

  const totalCats = 35; // Número total de imágenes de gatos que tienes

  // Función para obtener un nombre de imagen aleatoria
  const getRandomCatImage = () => {
    const randomIndex = Math.floor(Math.random() * totalCats) + 1;
    return `cat (${randomIndex}).png`;
  };

  // Función para generar un nuevo movimiento aleatorio
  const getRandomDirection = () => (Math.random() > 0.5 ? 1 : -1);

  // Función para generar posiciones aleatorias
  const getRandomPosition = () => ({
    id: positions.length + 1,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
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

        // Verifica si toca los bordes de la ventana para rebotar
        if (x <= 0 || x >= window.innerWidth - 100) { // El 100 es el tamaño de la imagen
          directionX = -directionX;
        }
        if (y <= 0 || y >= window.innerHeight - 100) {
          directionY = -directionY;
        }

        // Cambia la dirección si se choca con otro elemento
        const newDirectionX = positions.some((otherPos) => otherPos.id !== pos.id && detectCollision(pos, otherPos))
          ? -directionX
          : directionX;
        const newDirectionY = positions.some((otherPos) => otherPos.id !== pos.id && detectCollision(pos, otherPos))
          ? -directionY
          : directionY;

        // Actualiza las posiciones y las direcciones
        return {
          ...pos,
          x: x + newDirectionX * 5,
          y: y + newDirectionY * 5,
          directionX: newDirectionX,
          directionY: newDirectionY,
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
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <button onClick={addNewCat} style={{ position: 'absolute', zIndex: 10, top: 20, left: 20 }}>
        Crear Gato
      </button>

      {positions.map((pos) => (
        <motion.img
          key={pos.id}
          src={`/${pos.image}`} // Carga la imagen aleatoria
          alt="Gato"
          animate={{ x: pos.x, y: pos.y }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            width: '10vh',
           
          }}
        />
      ))}
    </div>
  );
};

export default App;
