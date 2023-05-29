import ReactDOM from "react-dom";
import { DualAxes } from "@ant-design/plots";
import { memo } from "react";
import { useSelector } from "react-redux";

const DemoDualAxes = () => {
  const response = useSelector(state => state.api.favouriteFilm) ;  
  const data = [{
      time: "24-5",
      film: 9,
      genres: 0,
    },{
      time: "25-5",
      film: 13,
      genres: 11,
    },{
      time: "26-5",
      film: 18,
      genres: 14,
    },{
      time: "27-5",
      film: 19,
      genres: 15,
    },{
      time: "28-5",
      film: 20,
      genres: 20,
    },{
      time: "29-5",
      film: 21,
      genres: 19,
    },{
      time: "30-5",
      film: 25,
      genres: 14,
    },{
      time: "1-6",
      film: 20,
      genres: 15,
    }];
  const config = {
    data: [data, data],
    xField: "time",
    yField: ["film", "genres"],
    geometryOptions: [{
        geometry: "line",
        color: "#5B8FF9",
      },{
        geometry: "line",
        color: "#5AD8A6",
      },{
        geometry: "line",
        color: "black",
      },
    ],
  };
  return <DualAxes {...config} />;
};

export default memo(DemoDualAxes) ;