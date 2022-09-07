import React from "react";
import { Carousel } from "react-carousel-minimal";

const CarouselAnuncio = ({ data }) => {
  const captionStyle = {
    fontSize: "2em",
    fontWeight: "bold",
  };
  const slideNumberStyle = {
    fontSize: "20px",
    fontWeight: "bold",
  };

  return (
    <div>
      {/* <div style={{ textAlign: "center" }}> */}
      <div>
        {/* <h2>Faço pinturas em geral de tudo</h2>
        <p>
          Easy to use, responsive and customizable carousel component for React
          Projects.
        </p> */}
        <div
          // style={{
          //   padding: "0 20px",
          // }}
        >
          <Carousel
            data={data}
            automatic={false}
            time={2000}
            width="1000px"
            height="600px"
            slideNumber={true}
            captionStyle={captionStyle}
            radius="10px"            
            slideNumberStyle={slideNumberStyle}
            captionPosition="bottom"            
            dots={true}
            pauseIconColor="white"
            pauseIconSize="40px"
            slideBackgroundColor="darkgrey"
            slideImageFit="cover"
            thumbnails={true}
            showNavBtn={true}                                                                                    
            thumbnailWidth="100px"
            style={{paddingBottom: "2%", maxWidth: "850px"}}
            // style={{
            //   textAlign: "center",
            //   maxWidth: "850px",
            //   maxHeight: "500px",
            //   margin: "40px auto",
            // }}
          />
        </div>
      </div>
    </div>
  );
};

export default CarouselAnuncio;
