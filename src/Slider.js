import React, {useState, useEffect} from 'react';
import "./slider.css";

export const Slider = props => {
	const {colorProp, maxValue, value, onValueChange} = props;
	//component state lets us display it next to the component
	const [currentVal, setVal] = useState(value);
	useEffect(() => { setVal(value); }, [value]);

	function updateState(e) {
		console.log(e);
		setVal(e.target.valueAsNumber);
		onValueChange(currentVal);
	}

	return (
			<tr className="sliderContainer">
				<td><label className="sliderLabel" htmlFor={colorProp + "_slider"}>{colorProp}: {currentVal}</label></td>
				<td><input id={colorProp + "_slider"}
					type="range" 
					onInput={updateState}
					max={maxValue}
					value={currentVal}/></td>
			</tr>
			);
}


export default Slider;