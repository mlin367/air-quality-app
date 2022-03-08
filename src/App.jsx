import ReactTooltip from "react-tooltip";
import { useEffect, useState } from "react";
import axios from "axios";

import MapChart from "./MapChart";

const App = (props) => {
  const [content, setContent] = useState("");
  return (
    <div>
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip clickable={false} type={"light"} html multiline={true}>
        {content}
      </ReactTooltip>
    </div>
  );
};

export default App;
