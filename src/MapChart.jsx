import axios from "axios";
import ReactTooltip from "react-tooltip";
import React, { memo, useEffect, useState } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import DetailedView from "./DetailedView";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";

const MapChart = ({ setTooltipContent }) => {
  const [aqData, setAqData] = useState([]);
  const [locationId, setLocationId] = useState(null);
  const [position, setPosition] = useState({
    coordinates: [-100, 35],
    zoom: 1.5,
  });

  useEffect(() => {
    axios
      .get(
        "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/locations?country_id=US&limit=1000"
      )
      .then(({ data }) => {
        setAqData(data.results);
      });
  }, []);

  const handleMoveEnd = (position) => {
    setPosition(position);
  };

  const produceTooltipString = ({
    name,
    entity,
    country,
    sensorType,
    coordinates,
    measurements,
  }) => {
    return `Name: ${name}<br />Entity: ${entity}<br />Country: ${country}<br />Sensor Type: ${sensorType}<br /> Coordinates: ${coordinates.latitude}, ${coordinates.longitude}<br /> Measurements: ${measurements} <br /><svg viewBox="0 0 502 502" width="50" height="50">
    <path d="M170.667 188.791c0-44.367 35.966-80.333 80.333-80.333s80.333 35.966 80.333 80.333H170.667z" fill="#4d93e8"/>
    <path fill="#ccd7eb" d="M10 309.291h160.667v146.951H10zM331.333 309.291H492v146.951H331.333z"/>
    <path fill="#4d93e8" d="M10 252.47h160.667v56.821H10zM331.333 252.47H492v56.821H331.333z"/>
    <path fill="#ccd7eb" d="M170.667 188.791h160.667v267.451H170.667z"/>
    <path d="M278.431 456.242h-54.862v-67.598c0-15.15 12.281-27.431 27.431-27.431s27.431 12.281 27.431 27.431v67.598zM46.248 345.539h26.451v58.78H46.248zM108.947 345.539h26.451v58.78h-26.451zM366.602 345.539h26.451v58.78h-26.451zM429.301 345.539h26.451v58.78h-26.451zM251 45.758h53.882v35.268H251z" fill="#4d93e8"/>
    <path d="M241 99.014c-45.121 4.992-80.333 43.347-80.333 89.777v53.679H10c-5.522 0-10 4.477-10 10v203.772c0 5.523 4.478 10 10 10h482c5.522 0 10-4.477 10-10V252.47c0-5.523-4.478-10-10-10H341.333v-53.679c0-46.43-35.212-84.784-80.333-89.777v-7.988h43.882c5.522 0 10-4.477 10-10V45.758c0-5.523-4.478-10-10-10H251c-5.522 0-10 4.477-10 10v53.256zM482 262.47v36.821H341.333V262.47H482zM294.882 71.026H261V55.758h33.882v15.268zM251 118.458c35.388 0 64.755 26.271 69.624 60.333H181.377c4.868-34.063 34.235-60.333 69.623-60.333zM20 262.47h140.667v36.821H20V262.47zm0 56.821h140.667v126.951H20V319.291zm301.333 126.951h-32.902v-57.598c0-20.639-16.791-37.431-37.431-37.431s-37.431 16.792-37.431 37.431v57.598h-32.902V198.791h32.902V313.21c0 5.523 4.478 10 10 10s10-4.477 10-10V198.791h34.861v72.292c0 5.523 4.478 10 10 10s10-4.477 10-10v-72.292h32.902v247.451zm-87.764 0v-57.598c0-9.611 7.819-17.431 17.431-17.431s17.431 7.819 17.431 17.431v57.598h-34.862zm248.431 0H341.333V319.291H482v126.951z"/>
    <path d="M278.431 323.209c5.522 0 10-4.477 10-10v-10.776c0-5.523-4.478-10-10-10s-10 4.477-10 10v10.776c0 5.523 4.477 10 10 10zM72.699 335.539H46.248c-5.522 0-10 4.477-10 10v58.781c0 5.523 4.478 10 10 10h26.451c5.522 0 10-4.477 10-10v-58.781c0-5.523-4.477-10-10-10zm-10 58.78h-6.451v-38.781h6.451v38.781zM135.398 335.539h-26.451c-5.522 0-10 4.477-10 10v58.781c0 5.523 4.478 10 10 10h26.451c5.522 0 10-4.477 10-10v-58.781c0-5.523-4.477-10-10-10zm-10 58.78h-6.451v-38.781h6.451v38.781zM366.602 414.319h26.451c5.522 0 10-4.477 10-10v-58.781c0-5.523-4.478-10-10-10h-26.451c-5.522 0-10 4.477-10 10v58.781c0 5.523 4.477 10 10 10zm10-58.78h6.451v38.781h-6.451v-38.781zM429.301 414.319h26.451c5.522 0 10-4.477 10-10v-58.781c0-5.523-4.478-10-10-10h-26.451c-5.522 0-10 4.477-10 10v58.781c0 5.523 4.477 10 10 10zm10-58.78h6.451v38.781h-6.451v-38.781z"/>
    </svg>`;
  };

  return (
    <>
      <ComposableMap
        data-tip=""
        projection={"geoAlbers"}
        projectionConfig={{ scale: 200 }}
      >
        <ZoomableGroup
          maxZoom={Infinity}
          center={position.coordinates}
          zoom={position.zoom}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none",
                    },
                    hover: {
                      fill: "#D6D6DA",
                      outline: "#D6D6DA",
                    },
                  }}
                />
              ))
            }
          </Geographies>
          {aqData.map((dataPoint, i) => (
            <Marker
              onClick={() => setLocationId(dataPoint.id)}
              onMouseEnter={() => {
                setTooltipContent(produceTooltipString(dataPoint));
              }}
              onMouseLeave={() => {
                setTooltipContent("");
              }}
              key={dataPoint.name + i}
              coordinates={[
                dataPoint.coordinates.longitude,
                dataPoint.coordinates.latitude,
              ]}
            >
              <g
                className="markerCircle"
                fill="#FF5533"
                stroke={"#FF5533"}
                strokeWidth={`${
                  0.5 / position.zoom > 0.004 ? 0.5 / position.zoom : 0.004
                }`}
                strokeLinecap="round"
                strokeLinejoin="round"
                // transform="translate(-12, -24)"
              >
                <circle
                  cx={`${
                    1 / position.zoom > 0.007 ? 1 / position.zoom : 0.007
                  }`}
                  cy={`${
                    1 / position.zoom > 0.007 ? 1 / position.zoom : 0.007
                  }`}
                  r={`${1 / position.zoom > 0.007 ? 1 / position.zoom : 0.007}`}
                />{" "}
                *
                {/* <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" /> */}
              </g>
            </Marker>
          ))}
          {locationId && <DetailedView locationId={locationId}/>}
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
