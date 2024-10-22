import React from "react";

const AboutPage = () => {
  return (
    <div className="about-page bg-gray-100 p-8">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-indigo-600">About Us</h1>
      <p className="text-lg md:text-xl text-gray-700 mb-4">
        Welcome to our community of travel and adventure enthusiasts! We are passionate about exploring and sharing the natural beauty and vibrant culture of the Basque Country. Whether you love hiking, biking, or discovering new activities, our site is your go-to place for discovering and sharing outdoor routes.
      </p>
      <p className="text-lg md:text-xl text-gray-700 mb-4">
        Our mission is to create a meeting point where you can share your experiences, organize activities, and uncover the hidden gems of the Basque landscapes. From the sun-kissed beaches to the majestic mountains, there's something for everyone. Whether you're drawn to the traditions or seeking new adventures in the diverse regions of the Basque Country, you'll find it all here.
      </p>
      <p className="text-lg md:text-xl text-gray-700 mb-4">
        Join us in celebrating the spirit of adventure and the love for nature. Together, we can make each journey unforgettable and inspire others to discover the wonders of the Basque Country.
      </p>
      <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <img 
          src="https://img.freepik.com/fotos-premium/espectacular-paisaje-mar-isla-san-juan-gaztelugatxe-cielo-atardecer-espana_153437-4052.jpg?w=740" 
          alt="Stunning landscapes of the Basque Country" 
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out">
          <p className="text-white text-2xl md:text-3xl font-semibold">Discover the Basque Country</p>
        </div>
      </div>
    </div>
  );
};
  
export default AboutPage;
