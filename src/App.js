import Slider from './Slider.js';
import React, {useRef, useState, useEffect} from 'react';
import ColorModel from './ColorModel.js';
import './App.css';

function App() {

  const colorRef = useRef();
  if(!colorRef.current) {
    colorRef.current = new ColorModel({red: 100, green: 100, blue: 100}, "rgb");
  }
  const [hexValue, setHexValue] = useState("");

  //TODO: functional components should not utilize `useRef()` --> find alternatives
  const appRef = useRef();

  useEffect(() => {
    appRef.current.style.backgroundColor = "rgb(" + colorRef.current.red + "," + colorRef.current.green + ","+ colorRef.current.blue + ")";
  }, []);

  const updateModel = (new_val, colorProp) => {
    colorRef.current.updateModel(new_val, colorProp);
    setHexValue(colorRef.current.getHex());
    appRef.current.style.backgroundColor = "rgb(" + colorRef.current.red + "," + colorRef.current.green + ","+ colorRef.current.blue + ")";
  };

  return (
    <div className="App" ref={appRef}>
        <table id="sliderTable">
          <thead id="colorDisplay">
              <tr><td colSpan="2">{hexValue}</td></tr>
          </thead>
          <tbody>
            <Slider colorProp="red" maxValue={255} value={() => {
              console.log("Updating sliders");
              return colorRef.current.red
            }} onValueChange={updateModel}/>
            <Slider colorProp="green" maxValue={255} value={colorRef.current.green} onValueChange={updateModel}/>
            <Slider colorProp="blue" maxValue={255} value={colorRef.current.blue} onValueChange={updateModel}/>
            <Slider colorProp="hue" maxValue={360} value={colorRef.current.hue} onValueChange={updateModel}/> 
            <Slider colorProp="saturation" maxValue={100} value={colorRef.current.saturation} onValueChange={updateModel}/>
            <Slider colorProp="brightness" maxValue={100} value={colorRef.current.brightness} onValueChange={updateModel}/>
            <Slider colorProp="luminosity" maxValue={100} value={colorRef.current.luminosity} onValueChange={updateModel}/>
            <Slider colorProp="cyan" maxValue={100} value={colorRef.current.cyan} onValueChange={updateModel}/>
            <Slider colorProp="magenta" maxValue={100} value={colorRef.current.magenta} onValueChange={updateModel}/>
            <Slider colorProp="yellow" maxValue={100} value={colorRef.current.yellow} onValueChange={updateModel}/>
            <Slider colorProp="key" maxValue={100} value={colorRef.current.key} onValueChange={updateModel}/>
          </tbody>
        </table>
    </div>
  );
}

export default App;
