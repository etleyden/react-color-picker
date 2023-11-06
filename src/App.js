import Slider from './Slider.js';
import './App.css';

function App() {

  //let color = this.useState([0, 0, 0]);

  return (
    <div className="App">
      <div className="colorDisplay"></div>
      <div id="sliderContainer">
        <Slider colorProp="red" maxValue={255} defaultValue={100}/>
      </div>
    </div>
  );
}

export default App;
