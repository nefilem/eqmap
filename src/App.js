import './App.css';
//import Eqmap from './components/eqmap';
import { useEffect, useState } from 'react';
import { Popup, Marker, MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import mag1 from './assets/mag1.svg';
import mag2 from './assets/mag2.svg';
import mag3 from './assets/mag3.svg';
import mag4 from './assets/mag4.svg';
import mag5 from './assets/mag5.svg';
import mag6 from './assets/mag6.svg';
import mag7 from './assets/mag7.svg';
import mag8 from './assets/mag8.svg';
import mag9 from './assets/mag9.svg';
import mag10 from './assets/mag10.svg';

// const placeholders = [ [51.505, -0.09], 
//                       [50.005, -5],
//                       [25.050, -3] ];



function App() {

  const [ request, setRequest ] = useState(false);
  const [ placeholders, setPlaceholders ] = useState("");
  const [ updateMarkers, setUpdateMarkers ] = useState(false);
  // const [ finishedLoading, setFinishedLoading ] = useState(false);  
  // const [ eqdata, setEQData ] = useState(null);
  // const [ eqdatartn, setEQDataRTN ] = useState([]);
  // const [ result, setResult ] = useState(false);

  const today = new Date();

  today.setDate(today.getDate() - 1);

  const addToArray = (value) => {
    //console.log(value);
    setPlaceholders(current => [... current, value]);
  };

  // useEffect(() => {
  //   if (placeholders !== []) {
  //     setFinishedLoading(true);
  //   }
  // }, [request, placeholders]) 
  
  // useEffect(() => {
  //   if (result) {

  //       eqdata.features.map((value, index) => {
  //           //console.log(index + " " + value.geometry.coordinates[0]);
  //           addToArray([ value.geometry.coordinates[0], value.geometry.coordinates[1] ]);
  //       });
  //       /// return data to prop?
  //       updatePlaceholders(eqdatartn);
  //   }
  // }, [result, eqdata]);

  useEffect(() => {
    //console.log(placeholders);
    if (placeholders.length !== 0){
      //console.log("here");
    }
  }, [request, updateMarkers]);

  useEffect(() => {
    async function fetchData() {
      if (!request) {
        setRequest(true);
        fetch('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=' + today.toLocaleDateString("en-US", { year:'numeric' }) + "-" + + today.toLocaleDateString("en-US", { month: '2-digit' }) + "-" + + today.toLocaleDateString("en-US", { day:'2-digit' }), { method: "GET" })
        .then(eqDat => eqDat.json())
        .then(data => { 
          data.features.map((value, index) => {
            //console.log(value);
            let micon = mag1;
            if (value.properties.mag < 1) {
              micon = mag1;
            } else if (value.properties.mag < 2) {
              micon = mag1;
            } else if (value.properties.mag < 3) {
              micon = mag2;
            } else if (value.properties.mag < 4) {
              micon = mag3;
            } else if (value.properties.mag < 5) {
              micon = mag4;
            } else if (value.properties.mag < 6) {
              micon = mag5;
            } else if (value.properties.mag < 7) {
              micon = mag6;
            } else if (value.properties.mag < 8) {
              micon = mag7;
            } else if (value.properties.mag < 9) {
              micon = mag8;
            }  else if (value.properties.mag < 10) {
              micon = mag9;
            } else {
              micon = mag10;
            }

            let markerIcon = L.icon({
              iconUrl: micon,
              iconSize: [80, 40],
              iconAnchor: [0, 0],
              popupAnchor: [0, 0],
            });

            let popuptext = (<span>{value.properties.title}</span>)
            let position = [value.geometry.coordinates[1], value.geometry.coordinates[0]];
            //console.log(index + " " + value.geometry.coordinates[0]);
            addToArray(<Marker position={position} icon={markerIcon}><Popup>{popuptext}</Popup></Marker>);
          }); 
        });
      }
    }
    fetchData().then( setUpdateMarkers(true) );
  }, []);

  const updatePlaceholders = (value) => {
    if (value.length != 0) {
      setPlaceholders(value);
    }
  };

//  const drawMap = () => {

//    const position = [ 51.505, -0.09 ];
  
//    const state = { zoom: 15 };
  
   // if (finishedLoading) {
    // console.log("XXX: ");
    // console.log(placeholders);
    // return (
    //   <div className="App">
    //     <MapContainer 
    //       style={{ height: "100vh" }} 
    //       center={position} 
    //       zoom={state.zoom}>
    //         <TileLayer
    //             attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    //             url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
    //     </MapContainer>
    //   </div>
    // )
    // } else {
    //   return (
    //     <></>
    //   )
    // }
//  }
  const position = [ 51.505, -0.09 ];
  
  const state = { zoom: 2 };

  // return (
  //   <div className="App">
  //     {/*<Eqmap updatePlaceholders={updatePlaceholders}/>*/}
  //     <div>
  //       { drawMap() }  
  //     </div>
  //   </div>
  // );

  return (
    <div className="App">
      <MapContainer 
        style={{ height: "100vh" }} 
        center={position} 
        zoom={state.zoom}>
          <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
          {placeholders}
      </MapContainer>
    </div>
  )

}

export default App;
