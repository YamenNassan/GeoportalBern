import React from "react";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import {get as getProjection} from "ol/proj";
import ZoomSlider from "ol/control/ZoomSlider";
import "./App.css";
import SuchFenster from "./SuchFenster";
import TileWMS from 'ol/source/TileWMS';

import "ol/ol.css";
import "ol-layerswitcher/dist/ol-layerswitcher.css";
import LayerSwitcher from "ol-layerswitcher";
import XYZ from 'ol/source/XYZ';
import "./App.css"
import Overlay from "ol/Overlay";
import Popgeb from "./popgeb";

/*
const geoJsonData = {
    "type": "FeatureCollection",
    "name": "gebfilter",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::2056" } },
    "features": [
    { "type": "Feature", "properties": { "fid": 2, "T_NAME": "Grosse Schanze", "T_Beschreibung": "Die Grosse Schanze "}, "geometry": { "type": "MultiPolygon", "coordinates": [ [ [ [ 2600006.02250000089407, 1199822.298799999058247 ], [ 2599990.052499998360872, 1199809.695000000298023 ], [ 2599971.9375, 1199832.642499998211861 ], [ 2599963.771299999207258, 1199826.195000000298023 ], [ 2599960.4375, 1199830.418800000101328 ], [ 2599984.573800001293421, 1199849.472500000149012 ], [ 2600006.02250000089407, 1199822.298799999058247 ] ] ], [ [ [ 2599978.607500001788139, 1199924.842500001192093 ], [ 2599981.817499998956919, 1199920.206300001591444 ], [ 2599960.747499998658895, 1199907.342500001192093 ], [ 2599957.872499998658895, 1199912.026299998164177 ], [ 2599925.951299998909235, 1199903.003800000995398 ], [ 2599916.428800001740456, 1199937.997499998658895 ], [ 2599930.098799999803305, 1199941.801300000399351 ], [ 2599934.178800001740456, 1199926.676300000399351 ], [ 2599941.8213, 1199922.356300000101328 ], [ 2599946.251299999654293, 1199923.57880000025034 ], [ 2599944.871300000697374, 1199928.416299998760223 ], [ 2599968.928800001740456, 1199943.631299998611212 ], [ 2599972.973799999803305, 1199940.553800001740456 ], [ 2599975.926300000399351, 1199943.941300000995398 ], [ 2599975.21000000089407, 1199952.78999999910593 ], [ 2599963.350000001490116, 1199962.9712999984622 ], [ 2599972.536299999803305, 1199973.730000000447035 ], [ 2600000.046300001442432, 1199950.010000001639128 ], [ 2599978.607500001788139, 1199924.842500001192093 ] ] ] ] } },
    ]    
};*/

class ReMapp extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.popupRef = React.createRef();
    this.overlay = null;
    this.tileLayer = null;
    this.state = {
      popupOpen: false, // Zustand für das Popup
    };
  }

  componentDidMount() {
    const layers = [
      new TileLayer({
        title: "Open Street Map",
        source: new XYZ({
          url: 'https://stamen-tiles-{a-d}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png',
          attributions: 'Map tiles by Stamen Design, under CC BY 3.0. Data by OpenStreetMap, under ODbL',
          maxZoom: 18,
        })
      }),
      new TileLayer({
        title:"Bern vor 1800",
        source: new TileWMS({
          url: 'http://localhost:8080/geoserver/wms',
          params: {'LAYERS': 'bern:bern','TILED': true},
          serverType: 'geoserver',
          ratio:1,
          visible: false,
        })
      }),
      new TileLayer({
        title:"Bern_Gebäude",
        source: new TileWMS({
          url: 'http://localhost:8080/geoserver/wms',
          params: {'LAYERS': 'ne:Bern_Gebaeude','TILED': true},
          serverType: 'geoserver',
          ratio:1,
          visible: true,
        }),
      }),
      this.tileLayer = new TileLayer({
        title:"Sehenswürdigkeit",
        source: new TileWMS({
          url: 'http://localhost:8080/geoserver/wms',
          params: {'LAYERS': 'bern:GEM_BERN_GEB_FILTER','TILED': true},
          serverType: 'geoserver',
          ratio:1,
          visible: true,
        }),
      }),
      new TileLayer({
        title:"Bern von 1800 bis 1850 ",
        source: new TileWMS({
          url: 'http://localhost:8080/geoserver/wms',
          params: {'LAYERS': 'bern:1800-1850','TILED': true},
          serverType: 'geoserver',
          ratio:1,
          visible: true,
        })
      }),
      new TileLayer({
        title:"Bern von 1851 bis 1900 ",
        source: new TileWMS({
          url: 'http://localhost:8080/geoserver/wms',
          params: {'LAYERS': 'bern:1851-1900','TILED': true},
          serverType: 'geoserver',
          ratio:1,
          visible: true,
        })
      }),
      new TileLayer({
        title:"Bern von 1901 bis 1925 ",
        source: new TileWMS({
          url: 'http://localhost:8080/geoserver/wms',
          params: {'LAYERS': 'bern:1901-1925','TILED': true},
          serverType: 'geoserver',
          ratio:1,
          visible: true,
        })
      }),
      new TileLayer({
        title:"Bern von 1926 bis 1941 ",
        source: new TileWMS({
          url: 'http://localhost:8080/geoserver/wms',
          params: {'LAYERS': 'bern:1926-1941','TILED': true},
          serverType: 'geoserver',
          ratio:1,
          visible: true,
        })
      }),
      new TileLayer({
        title:"Bern von 1942 bis 1962 ",
        source: new TileWMS({
          url: 'http://localhost:8080/geoserver/wms',
          params: {'LAYERS': 'bern:1942-1962','TILED': true},
          serverType: 'geoserver',
          ratio:1,
          visible: true,
        })
      }),
      new TileLayer({
        title:"Bern von 1963 bis 1978 ",
        source: new TileWMS({
          url: 'http://localhost:8080/geoserver/wms',
          params: {'LAYERS': 'bern:1963-1978','TILED': true},
          serverType: 'geoserver',
          ratio:1,
          visible: true,
        })
      }),
      new TileLayer({
        title:"Bern von 1979 bis 2000 ",
        source: new TileWMS({
          url: 'http://localhost:8080/geoserver/wms',
          params: {'LAYERS': 'bern:1979-2000','TILED': true},
          serverType: 'geoserver',
          ratio:1,
          visible: true,
        })
      }),
      new TileLayer({
        title:"Bern von 2001 bis 2020 ",
        source: new TileWMS({
          url: 'http://localhost:8080/geoserver/wms',
          params: {'LAYERS': 'bern:2001-2020','TILED': true},
          serverType: 'geoserver',
          ratio:1,
          visible: true,
        })
      }),
      new TileLayer({
        title:"ab 2021 ",
        source: new TileWMS({
          url: 'http://localhost:8080/geoserver/wms',
          params: {'LAYERS': 'bern:ab-2021','TILED': true},
          serverType: 'geoserver',
          ratio:1,
          visible: true,
        })
      }),
    ];
    this.map = new Map({
      target: this.mapRef.current,
      layers: layers,
      view: new View({
        center: fromLonLat([7.452094770810841, 46.94834326668507]),
        zoom: 15,
        maxZoom: 23,
        minZoom: 2,
        projection: getProjection("EPSG:2056")
      }),
      controls: [new ZoomSlider({ className: "ol-zoomslider" })]
    });

    const layerSwitcher = new LayerSwitcher({
      reverse: true,
      groupSelectStyle: "group"
    });
    this.map.addControl(layerSwitcher);


    // Erstelle das Overlay für das Popup
    this.overlay = new Overlay({
      element: this.popupRef.current,
      autoPan: false,
      autoPanAnimation: {
        duration: 250,
      },
    });
    this.map.addOverlay(this.overlay);

    // Füge den Klick-Eventlistener zum Layer hinzu
    this.map.on("click", this.handleMapClick);

    // Aktualisiere den State, um das Popup zu öffnen/schließen
    this.setState({ popupOpen: false });
  }

  handleMapClick = (event) => {
    const coordinate = event.coordinate;
    
    // Überprüfen, ob der geklickte Layer der gewünschte Layer ist
    const clickedLayerTitle = "Sehenswürdigkeit"; // Titel des gewünschten Layers
    let isClickedLayer = false;
  
    this.map.getLayers().forEach((layer) => {
      if (layer instanceof TileLayer && layer.get("title") === clickedLayerTitle && layer.getVisible()) {
        isClickedLayer = true;
        return;
      }
    });
    
    // Überprüfen, ob das Popup bereits geöffnet ist
    if (isClickedLayer) {
      // Überprüfen, ob das Popup bereits geöffnet ist
      if (this.state.popupOpen) {
        // Schließe das Popup
        this.overlay.setPosition(undefined);
        this.setState({ popupOpen: false });
      } else {
        // Öffne das Popup
        this.overlay.setPosition(coordinate);
        this.setState({ popupOpen: true });
      }
    }
  }
   

  render() {
    return (
      <>
      <div ref={this.mapRef} style={{ width: '99vw', height: '95vh'}}>
        {/* Popup-Overlay */}
        <div ref={this.popupRef} id="popup" className={this.state.popupOpen ? "popup" : "popup hidden"}>
          {/* Popup-Inhalt */}
          <div id="popup-content">
            <Popgeb></Popgeb>
            
          </div>
        </div>
      </div>
      </>
    );
  }
}

export default ReMapp;
