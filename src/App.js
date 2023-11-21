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
  const [isCopied, setIsCopied] = useState(false);


  //TODO: functional components should not utilize `useRef()` --> find alternatives
  const appRef = useRef();

  useEffect(() => {
    setHexValue(colorRef.current.getHex());
    appRef.current.style.backgroundColor = "rgb(" + colorRef.current.red + "," + colorRef.current.green + ","+ colorRef.current.blue + ")";
  }, []);

  const updateModel = (new_val, colorProp) => {
    colorRef.current.updateModel(new_val, colorProp);
    setHexValue(colorRef.current.getHex());
    appRef.current.style.backgroundColor = "rgb(" + colorRef.current.red + "," + colorRef.current.green + ","+ colorRef.current.blue + ")";
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hexValue)
      .then(() => setIsCopied(true))
      .catch((err) => console.error('Failed to copy to clipboard', err));

    // Reset the copied status after a short delay
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="App" ref={appRef}>
      <div id="tableContainer">
        <table id="sliderTable" >
          <thead id="colorDisplay">
              <tr><td colSpan="2" onClick={copyToClipboard} style={{ cursor: 'pointer' }}>
                {hexValue}
                
              </td></tr>
          </thead>

          <thead id="clipboard">
            <tr><td colSpan="2" >{isCopied && <div>Copied to clipboard!</div>}</td></tr>
          </thead>
          
          <tbody>
            
            <Slider colorProp="red" maxValue={255} value={colorRef.current.red} onValueChange={updateModel}/>
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
      
    </div>
  );
}

export default App;
