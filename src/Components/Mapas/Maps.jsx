import React from "react";
import GoogleMaps from "simple-react-google-maps";
import { useParams } from "react-router-dom";

const Maps = ({ markers }) => {
  const { latitud, longitud } = useParams();

  const lat = parseFloat(latitud);
  const lng = parseFloat(longitud);

  console.log(latitud, longitud);

  return (
    <>
      <div className="container col-lg-8 col-md-8 mt-4">
        <h3 className="text-center mb-4">Ubicación:</h3>
        <div className="d-flex justify-content-center">
          <GoogleMaps
            apiKey={"AIzaSyBx5g3YHS3LPpxU4wbw6YpHDbvYtD6fe4w"}
            style={{ height: "500px", width: "370px" }}
            zoom={16}
            center={markers[0]}
            markers={markers}
          />
        </div>
      </div>
    </>
  );
};

export default Maps;
