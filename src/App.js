import Slider from './Slider.js';
import React, {useState, useRef, useEffect} from 'react';
import './App.css';

function App() {

  let [color, setColor] = useState([100, 100, 100]);



  const appRef = useRef();
  const redRef = useRef();
  const greenRef = useRef();
  const blueRef = useRef();

  useEffect(() => {
    appRef.current.style.backgroundColor = "rgb(" + color[0] + "," + color[1] + ","+ color[2] + ")";
  });

  return (
    <div className="App" ref={appRef}>
      <div className="colorDisplay"></div>
      <div id="sliderContainer">
        <Slider ref={redRef} colorProp="red" maxValue={255} value={color[0]} onValueChange={(new_val) => {
            setColor([new_val, color[1], color[2]]);
          }}/>
        <Slider ref={greenRef} colorProp="green" maxValue={255} value={color[1]} onValueChange={(new_val) => {
            setColor([color[0], new_val, color[2]]);
          }}/>
        <Slider ref={blueRef} colorProp="blue" maxValue={255} value={color[2]} onValueChange={(new_val) => {
            setColor([color[0], color[1], new_val]);
          }}/>
      </div>
    </div>
  );
}

export default App;
