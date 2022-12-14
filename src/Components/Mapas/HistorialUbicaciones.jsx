import React from "react";
import { useEffect, useState } from "react";
import GoogleMaps from "simple-react-google-maps";
import { MDBIcon } from "mdb-react-ui-kit";

const HistorialUbicaciones = () => {
  const keymap = "";
  const [ubicaciones, setUbicaciones] = useState([]);
  const [ubicacioneshoy, setUbicacionesHoy] = useState([]);
  const [ubicacion, setUbicacion] = useState({
    lat: -24.7636438,
    lng: -65.4093321,
  });
  const [ubicacionesMarkers, setUbicacionesMarkers] = useState([]);
  const [ubicacionesMarkersHoy, setUbicacionesMarkersHoy] = useState([]);
  const [ubihoy, setUbiHoy] = useState(false);

  const obtenerUbicaciones = async () => {
    const data = await fetch("http://138.219.42.86:8092/api/ubicacion").then(
      (response) => response.json()
    );
    setUbicaciones(data);
  };

  const obtenerUbicacionesHoy = async () => {
    const data = await fetch(
      "http://138.219.42.86:8092/api/ubicacion/hoy"
    ).then((response) => response.json());
    setUbicacionesHoy(data);
  };

  function setFocus() {
    window.scrollTo(300, 500);
  }

  const mostrarUbicaciones = () => {
    const markers = [];

    for (let i = 0; i < ubicaciones.length; i++) {
      markers.push({
        lat: parseFloat(ubicaciones[i].Latitud),
        lng: parseFloat(ubicaciones[i].Longitud),
      });
    }
    setUbicacion(markers[0]);
    setUbicacionesMarkers(markers);
    setFocus();
    setUbiHoy(false);
    console.log(markers);
    setUbicacionesMarkersHoy([]);
  };

  const mostrarUbicacionesHoy = () => {
    const markers = [];
    if (ubicacioneshoy.length >= 1) {
      for (let i = 0; i < ubicacioneshoy.length; i++) {
        markers.push({
          lat: parseFloat(ubicacioneshoy[i].Latitud),
          lng: parseFloat(ubicacioneshoy[i].Longitud),
        });
      }
      setUbicacion(markers[0]);
      setUbicacionesMarkersHoy(markers);
      setFocus();
      console.log(markers);
    } else {
      setUbiHoy(true);
      setUbicacion({
        lat: -24.7636438,
        lng: -65.4093321,
      });
    }
    setUbicacionesMarkers([]);
  };

  useEffect(() => {
    if (ubicaciones.length <= 0) {
      obtenerUbicaciones();
    }
    if (ubicacioneshoy.length <= 0) {
      obtenerUbicacionesHoy();
    }
  }, []);

  return (
    <div className="container col-lg-8 col-md-8 mt-4">
      <h3 className="text-center mb-4">Localizador de Mascotas</h3>
      <div className="d-flex justify-content-around flex-wrap">
        <div className="text-center">
          <button className="btn btn-secondary">
            <MDBIcon
              className="btnMascota"
              onClick={mostrarUbicaciones}
              fas
              icon="paw"
            />
          </button>
          <p>Historial Ubicaciones</p>
        </div>
        <div className="text-center">
          <button className="btn btn-secondary">
            <MDBIcon
              className="btnMascota"
              onClick={mostrarUbicacionesHoy}
              fas
              icon="paw"
            />
          </button>
          <p>Localizar Mascota</p>
        </div>
        {/* <ul className="list-group">
          {ubicaciones.map((item) => (
            <div key={item.Id}>
              <li className="btn list-group-item list-group-item-action">
                Fecha: {item.FechaHora}
              </li>
            </div>
          ))}
        </ul> */}
      </div>
      <div>
        <h3 className="text-center mb-4">Ubicación:</h3>
        {ubihoy && (
          <>
            <div className="d-flex justify-content-center">
              <p>No hay ubicaciones hoy</p>
            </div>
          </>
        )}
        {ubicacionesMarkers.length == 0 && (
          <>
            <div className="d-flex justify-content-center">
              <GoogleMaps
                apiKey={keymap}
                style={{ height: "600px", width: "500px" }}
                zoom={14}
                center={{
                  lat: ubicacion.lat,
                  lng: ubicacion.lng,
                }}
                markers={ubicacionesMarkers}
              />
            </div>
          </>
        )}
        {ubicacionesMarkers.length >= 1 && (
          <>
            <div className="d-flex justify-content-center">
              <GoogleMaps
                apiKey={keymap}
                style={{ height: "800px", width: "570px" }}
                zoom={16}
                center={{
                  lat: ubicacion.lat,
                  lng: ubicacion.lng,
                }}
                markers={ubicacionesMarkers}
              />
            </div>
          </>
        )}
        {ubicacionesMarkersHoy.length > 1 && (
          <>
            <div className="d-flex justify-content-center">
              <GoogleMaps
                apiKey={keymap}
                style={{ height: "800px", width: "570px" }}
                zoom={16}
                center={{
                  lat: ubicacion.lat,
                  lng: ubicacion.lng,
                }}
                markers={ubicacionesMarkersHoy}
              />
            </div>
          </>
        )}
      </div>
      <div id="focus"></div>
    </div>
  );
};

export default HistorialUbicaciones;
