import axios from "axios";
import React, { memo, useEffect, useState } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json";

const rounded = (num) => {
  if (num > 1000000000) {
    return Math.round(num / 100000000) / 10 + "Bn";
  } else if (num > 1000000) {
    return Math.round(num / 100000) / 10 + "M";
  } else {
    return Math.round(num / 100) / 10 + "K";
  }
};

const MapChart = ({ setTooltipContent }) => {
  const [aqData, setAqData] = useState([]);
  const [position, setPosition] = useState({ coordinates: [-100, 50], zoom: 1.5 });

  useEffect(() => {
    axios
      .get(
        "https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/locations?country_id=US&limit=1000"
      )
      .then(({ data }) => {
        setAqData(data.results);
      });
  }, []);

  const handleMoveEnd = position => {
    setPosition(position);
  }

  return (
    <>
      <ComposableMap
        data-tip=""
        projection={"geoAlbers"}
        projectionConfig={{ scale: 200 }}
      >
        <ZoomableGroup maxZoom={100} center={position.coordinates} zoom={position.zoom} onMoveEnd={handleMoveEnd}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { NAME, POP_EST } = geo.properties;
                    setTooltipContent(`${NAME} — ${rounded(POP_EST)}`);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none",
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none",
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>
          {aqData && aqData.map(({ name, coordinates }, i) => (
            <Marker style={{ }} key={name + i} coordinates={[coordinates.longitude, coordinates.latitude]}>
              <g
                fill="none"
                stroke="#FF5533"
                strokeWidth={`${1/position.zoom}`}
                strokeLinecap="round"
                strokeLinejoin="round"
                // transform="translate(-12, -24)"
              >
                <circle r={`${1/position.zoom}`} />
                {/* <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" /> */}
              </g>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
