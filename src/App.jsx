import { useState } from "react";
import "./styles/index.css";
import axios from "axios";
import { FiMapPin } from "react-icons/fi";

export default function App() {
  const ENTER = 13;

  const api = {
    key: "c3d6ade44c0ce0044a017dc9c5815b1d",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const Change = (event) => {
    setValue(event.target.value);
    console.log(value);
  };

  const Clear = () => {
    setValue("");
  };

  const Search = (events) => {
    if (events.which === ENTER) {
      axios
        .get(`${api.base}weather?q=${value}&units=metric&APPID=${api.key}`)
        .then((response) => {
          setResult(response.data);
          console.log(result);
          Clear();
        })
        .catch((error) => {
          console.log("Something wrong", error);
        });
    }
  };

  return (
    <>
      <div className="app">
        <h3>Digite o local que deseja buscar o clima</h3>
        <div className="form">
          <input
            type="text"
            placeholder="Enter the name of the place"
            value={value}
            onChange={Change}
            onKeyDown={Search}
          />
        </div>

        {typeof result.main !== "undefined" ? (
          <div className="data-weather">
            {result.length === 0 && <span>Carregando...</span>}
            <div className="container-weather">
              <p>{new Date().toLocaleDateString()}</p>
              <img
                src={`https://openweathermap.org/img/wn/${result.weather[0].icon}.png`}
              />
              <h3>
                <FiMapPin /> {result.name}
              </h3>
              <h2 className="temperature">C&deg; {result.main.temp}</h2>

              <h2>{result.weather[0].description}</h2>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
