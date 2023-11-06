import React from 'react';

class Slider extends React.Component {
	const [currentVal, setVal] = useState(0);
	constructor(props) {
		super(props);
			//figuring out how to attach the state to the component
		setVal(props.defaultValue);
	}
	handleChange(e) {
		console.log(e);
		setVal(e.target.valueAsNumber);
	}
	render() {
		return (
			<div className="sliderContainer">
				<p>{this.props.colorProp}: {this.state.currentVal}</p>
				<input id={this.props.colorProp + "_slider"}
					type="range" 
					onInput={this.handleChange}
					max={this.props.maxValue}
					value={this.props.defaultVal}/>
			</div>
			);
	}
}


export default Slider;