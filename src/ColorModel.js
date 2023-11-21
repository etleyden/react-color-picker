export default class ColorModel {
	constructor(model, modelType) {
		switch(modelType) {
			case "rgb":
				this.red = model.red;
				this.green = model.green;
				this.blue = model.blue;
				break;
			case "hsb":
				this.hue = model.hue;
				this.saturation = model.saturation;
				this.brightness = model.brightness;
				break;
			case "hsl":
				this.hue = model.hue;
				this.saturation = model.saturation;
				this.luminosity = model.luminosity;
				break;
			case "cmyk":
				this.cyan = model.cyan;
				this.magenta = model.magenta;
				this.yellow = model.yellow;
				this.key = model.black;
				break;
			default:
				throw new Error("Invalid color model: " + modelType);
		}
		this.validateProperties(modelType);
	};
	validateProperties(modelType) {
		let rgb, hsb, hsl, cmyk;
		switch(modelType) {
			case "rgb":
				hsb = rgbToHSB(this.red, this.green, this.blue);
				this.hue = hsb[0];
				this.saturation = hsb[1];
				this.brightness = hsb[2];
				hsl = rgbToHSL(this.red, this.green, this.blue);
				this.luminosity = hsl[2];
				cmyk = rgbToCMYK(this.red, this.green, this.blue);
				this.cyan = cmyk[0];
				this.magenta = cmyk[1];
				this.yellow = cmyk[2];
				this.key = cmyk[3];
				break;
			case "hsb":
				rgb = hsbToRGB(this.hue, this.saturation, this.brightness);
				this.red = rgb[0];
				this.green = rgb[1];
				this.blue = rgb[2];
				hsl = rgbToHSL(this.red, this.green, this.blue);
				this.luminosity = hsl[2];
				cmyk = rgbToCMYK(this.red, this.green, this.blue);
				[this.cyan, this.magenta, this.yellow, this.key] = cmyk;
				break;
			case "hsl":
				rgb = hslToRGB(this.hue, this.saturation, this.luminosity);
				[this.red, this.green, this.blue] = rgb;
				hsb = rgbToHSB(this.hue, this.saturation, this.luminosity);
				this.brightness = hsb[2];
				cmyk = rgbToCMYK(this.red, this.green, this.blue);
				[this.cyan, this.magenta, this.yellow, this.key] = cmyk;
				break;
			case "cmyk":
				rgb = cmykToRGB(this.cyan, this.magenta, this.yellow, this.key);
				console.log(rgb);
				[this.red, this.green, this.blue] = rgb;
				hsb = rgbToHSB(this.red, this.green, this.blue);
				[this.hue, this.saturation, this.brightness] = hsb;
				hsl = rgbToHSL(this.red, this.green, this.blue);
				this.luminosity = hsl[2];
				break;
			default:
				throw new Error("modelType " + modelType + " is not allowed as.a model type for complete color conversion");
		}
		for(let i in this) {
			this[i] = Math.floor(this[i]);
		}
	}
	getHex() {
	  let hex_str = "#";
    hex_str += hex(Math.floor(this.red / 16)) + hex(this.red % 16);
    hex_str += hex(Math.floor(this.green / 16)) + hex(this.green % 16);
    hex_str += hex(Math.floor(this.blue / 16)) + hex(this.blue % 16);
  	return hex_str;
	}
	updateModel(new_val, channel_name) {
		console.log("Updating the model");
		switch(channel_name) {
			case "red":
				this.red = new_val;
				this.validateProperties("rgb");
				break;
			case "green":
				this.green = new_val;
				this.validateProperties("rgb");
				break;
			case "blue":
				this.blue = new_val;
				this.validateProperties("rgb");
				break;
			case "hue":
				this.hue = new_val;
				this.validateProperties("hsb");
				break;
			case "saturation":
				this.saturation = new_val;
				this.validateProperties("hsb");
				break;
			case "brightness":
				this.brightness = new_val;
				this.validateProperties("hsb");
				break;
			case "luminosity":
				this.luminosity = new_val;
				this.validateProperties("hsl");
				break;
			case "cyan":
				this.cyan = new_val;
				this.validateProperties("cmyk");
				break;
			case "magenta":
				this.magenta = new_val;
				this.validateProperties("cmyk");
				break;
			case "yellow":
				this.yellow = new_val;
				this.validateProperties("cmyk");
				break;
			case "key":
				this.key = new_val;
				this.validateProperties("cmyk");
				break;
			default:
				throw new Error(channel_name + " does not exists as a valid color channel");
		}
	}
}
//Take a number between 0 and 15 (inclusive) and return the hexadecimal result. 
function hex(num) {
  if(num >= 16 || num < 0) {
    throw new Error("Cannot convert a number greater than 15 or less than 0 to a single-digit hexadecimal: " + num);
  }
  const mapping = "ABCDEF";
  if(num >= 10) {
    return mapping.charAt(num - 10);
  } else {
    return num.toString(); 
  }
}
//https://www.30secondsofcode.org/js/s/rgb-to-hsb/
const rgbToHSB = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;
  const v = Math.max(r, g, b),
    n = v - Math.min(r, g, b);
  const h =
    n === 0 ? 0 : n && v === r ? (g - b) / n : v === g ? 2 + (b - r) / n : 4 + (r - g) / n;
  return [60 * (h < 0 ? h + 6 : h), v && (n / v) * 100, v * 100];
};
//https://www.30secondsofcode.org/js/s/rgb-to-hsl/
function rgbToHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const l = Math.max(r, g, b);
  const s = l - Math.min(r, g, b);
  const h = s
    ? l === r
      ? (g - b) / s
      : l === g
      ? 2 + (b - r) / s
      : 4 + (r - g) / s
    : 0;
  return [
    60 * h < 0 ? 60 * h + 360 : 60 * h,
    100 * (s ? (l <= 0.5 ? s / (2 * l - s) : s / (2 - (2 * l - s))) : 0),
    (100 * (2 * l - s)) / 2,
  ];
}
//https://stackoverflow.com/questions/2426432/convert-rgb-color-to-cmyk
function rgbToCMYK(r, g, b) {
	r /= 255; g /= 255; b /= 255;
	const k = Math.min(1-r, 1-g, 1-b);
	const c = (1-r-k)/(1-k);
	const m = (1-g-k)/(1-k);
	const y = (1-b-k)/(1-k);
	return [c * 100, m * 100, y * 100, k * 100];
}
//https://www.30secondsofcode.org/js/s/hsb-to-rgb/
function hsbToRGB(h, s, b) {
	s /= 100;
 	b /= 100;
	const k = (n) => (n + h / 60) % 6;
	const f = (n) => b * (1 - s * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
	return [255 * f(5), 255 * f(3), 255 * f(1)];
}
//https://www.30secondsofcode.org/js/s/hsl-to-rgb/
function hslToRGB(h, s, l) {
	s /= 100;
  	l /= 100;
  	const k = n => (n + h / 30) % 12;
  	const a = s * Math.min(l, 1 - l);
  	const f = n =>
    	l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  	return [255 * f(0), 255 * f(8), 255 * f(4)];
}
function cmykToRGB(c, m, y, k) {
	c /= 100;
	m /= 100;
	y /= 100;
	k /= 100;
	return [255 * (1 - c) * (1 - k),
			255 * (1 - m) * (1 - k),
			255 * (1 - y) * (1 - k)];
}