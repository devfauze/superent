import React, { useState, useEffect } from 'react';
import { cars } from '../../data/cars';

// Importar todas as imagens
import ferrari from '../../assets/ferrari.svg';
import porsche from '../../assets/porsche.svg';
import astonMartin from '../../assets/astonmartin.svg';
import lamborghini from '../../assets/lamborghini.svg';
import audi from '../../assets/audi.svg';
import bmw from '../../assets/bmw.svg';

const carImages: { [key: string]: string } = {
  'ferrari.svg': ferrari,
  'porsche.svg': porsche,
  'astonmartin.svg': astonMartin,
  'lamborghini.svg': lamborghini,
  'audi.svg': audi,
  'bmw.svg': bmw,
};

const CarDisplay: React.FC = () => {
  const [currentCarIndex, setCurrentCarIndex] = useState(0);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const totalScrollableHeight = document.documentElement.scrollHeight - windowHeight;
    const newIndex = Math.floor((scrollTop / totalScrollableHeight) * cars.length);

    if (newIndex !== currentCarIndex && newIndex >= 0 && newIndex < cars.length) {
      setCurrentCarIndex(newIndex);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentCarIndex]);

  return (
    <div>
      {cars.map((car, index) => (
        <div
          key={car.modelo}
          className={`h-screen ${index === currentCarIndex ? car.color : 'bg-gray-300'} flex flex-col justify-center items-center text-white transition-colors duration-500 relative`}
        >
          <div className='w-full grid grid-cols-8 place-items-center'>
            <div className='col-span-7'>
              <h1 className="text-3xl font-light text-center hover:scale-110 duration-500">{car.marca}</h1>
              <h1 className="text-[250px] font-extrabold hover:scale-110 duration-500">{car.modelo}</h1>

              <img
                src={carImages[car.photo]}
                alt={`${car.marca} ${car.modelo}`}
                className="absolute bottom-32 left-1/4 transform -translate-x-1/3 w-full max-w-3xl hover:scale-110 duration-500"
                style={{ maxHeight: '45vh' }}
              />
            </div>

            <div className='col-span-1'>
              <button
                className="mt-4 px-4 py-2 hover:underline-offset-1 hover:scale-125 duration-500 underline-offset-2 hover:text-gray-400 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
                onClick={() => window.location.href = `/rent/${car.modelo}`}
              >
                RENT
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarDisplay;
