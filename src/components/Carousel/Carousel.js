import React, {useEffect} from "react";
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

  useEffect(() => { //Remove a classe Fade do boostrap pois está dando conflito        
      
      let timerId = setTimeout(() => {      
         data.forEach(() => {
          if (document.querySelector(".fade"))
            document.querySelector(".fade").classList.remove('fade');
         })        
      }, 15);

      return () => clearTimeout(timerId);
  }, [data]);

  return (
    <div>      
      <div>        
        <div>
          <Carousel
            data={data}                        
            automatic={false}
            time={2000}
            className="form-control"
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
