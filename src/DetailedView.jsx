import axios from "axios";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";

const columns = [
  { title: "Parameter", field: "parameter" },
  { title: "Value", field: "value" },
  { title: "Unit", field: "unit" },
  { title: "Date", field: "date" },
];

const DetailedView = ({ locationId }) => {
  const [measurementData, setMeasurementData] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://u50g7n0cbj.execute-api.us-east-1.amazonaws.com/v2/measurements?country_id=US&location_id=${locationId}`
      )
      .then(({ data }) =>
        setMeasurementData(
          // data.results.map(({ parameter, value, date, unit }) => ({
          //   parameter,
          //   value,
          //   date: date.utc,
          //   unit,
          // }))
          [{ parameter: 'dsfds', value: 3, date: 'dsfs', unit: 'saf'}]
        )
      );
  }, []);

  return (
    measurementData.length && (
      // <div
      //   onClick={event => event.stopPropagation()}
      //   style={{
      //     position: "absolute",
      //     top: 0,
      //     left: 0,
      //     bottom: 0,
      //     right: 0,
      //     width: "100vw",
      //     height: "100vh",
      //     backgroundColor: "#a9a9a987",
      //     zIndex: 100,
      //   }}
      // >
        <MaterialTable columns={columns} data={measurementData} />
      // </div>
    )
  );
};

export default DetailedView;
