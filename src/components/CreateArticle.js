import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';


function Topics() {
  return (
    <div>
      <h1>Topics</h1>
      {/* Add your topics content here */}
      <Carousel showThumbs={false}>
  <div>
    <img src="image1.jpg" alt="Image 1" />
    <p className="legend">Image 1</p>
  </div>
  <div>
    <img src="image2.jpg" alt="Image 2" />
    <p className="legend">Image 2</p>
  </div>
  <div>
    <img src="image3.jpg" alt="Image 3" />
    <p className="legend">Image 3</p>
  </div>
</Carousel>

    </div>
  );
}

export default Topics;
