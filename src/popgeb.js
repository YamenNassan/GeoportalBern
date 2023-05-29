import {React, useEffect, useState} from "react";

function Popgeb (){
    const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch('./Geb.geojson')
      .then(response => response.json())
      .then(data => {
        setGeoData(data);
      })
      .catch(error => {
        console.error('Error:', error);
    });
 },[]);
    //Access the features array 
    /*const features = geoData.features; 
    // Iterate over the features 
    const featureList = features.map((feature, index) => { 
    const name = feature.properties.T_NAME;
    console.log(featureList.T_NAME); 
    const coordinates = feature.properties.T_Beschreibung; 
        
    return ( <div key={index}> <h3>Name: {name}</h3> <p>Coordinates: 
            {JSON.stringify(coordinates)}</p> </div> ); }); 
    return ( <div> <h2>GeoJSON Data</h2> {featureList} </div> ); */
} 

export default Popgeb;