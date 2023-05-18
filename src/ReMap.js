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
import ImageWMS from "ol/source/ImageWMS";
import { Image as ImageLayer} from "ol/layer";
import LayerSwitcher from "ol-layerswitcher";


class ReMap extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    const layers = [
      new TileLayer({
        source: new OSM()
      }),
      new TileLayer({
        source: new TileWMS({
          url: 'http://localhost:8080/geoserver/wms',
          params: {
            'LAYERS': 'bern:bern',
            'TILED': true
          },
          serverType: 'geoserver',
          ratio:1,
          visible: true
        })
      })
    ];
    /*
    const layer = new TileLayer({
      source: new TileWMS({
        url: 'http://localhost:8080/geoserver/wms',
        params: {
          'LAYERS': 'bern:bern',
          'TILED': true
        },
        serverType: 'geoserver',
        visible: true
      })
    });*/

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
    /*
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
    });*/
    const layerSwitcher = new LayerSwitcher({
      reverse: true,
      groupSelectStyle: "group"
    });
    this.map.addControl(layerSwitcher);
  }

  render() {
    return (
      <>
      <div
        ref={this.mapRef}
        style={{ width: '99vw', height: '95vh'}}
      >
        <SuchFenster />
      </div>

      </>
    );
  }
}

export default ReMap;
