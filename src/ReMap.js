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

class ReMap extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {

    const {label} = this.props;
    const layer = new TileLayer({
      source: new TileWMS({
        url: 'http://localhost:8080/geoserver/wms',
        params: {
          'LAYERS': label === "Bauentwicklung vor 1800" ? 'bern' : 'bern',
          'TILED': true
        },
        serverType: 'geoserver',
        visible: true
      })
    });


    this.map = new Map({
      target: this.mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        layer
      ],
      view: new View({
        center: fromLonLat([7.452094770810841, 46.94834326668507]),
        zoom: 15,
        maxZoom:23,
        minZoom:2,
        projection: getProjection('EPSG:2056')
      }),
      controls: [
        new ZoomSlider({className:'ol-zoomslider'})
      ]
    });
  }

  render() {
    return (
      <div
        ref={this.mapRef}
        style={{ width: '57vw', height: '95vh', marginLeft:'347px'}}
      >
        <SuchFenster />
      </div>
    );
  }
}

export default ReMap;
