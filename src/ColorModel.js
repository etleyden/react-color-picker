class ColorModel {
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
		};
		function validateProperties(modelType) {
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
				case "cmyk":
					rgb = cmykToRGB(this.cyan, this.magenta, this.yellow, this.key);
					[this.red, this.green, this.blue] = rgb;
					hsb = rgbToHSB(this.red, this.green, this.blue);
					[this.hue, this.saturation, this.brightness] = hsb;
					hsl = rgbToHSL(this.red, this.green, this.blue);
					this.luminosity = hsl[2];
					break;
				default:
					throw new Error("modelType " + modelType + " is not allowed as.a model type for complete color conversion");

			}
		};
	}
}
//https://www.geeksforgeeks.org/program-change-rgb-color-model-hsv-color-model/
function rgbToHSB(r, g, b) {
	r = r / 255;
	g = g / 255;
	b = b / 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const diff = max - min;
	let hue, saturation;
	if(max == r) {
		hue = (60 * ((g - b) / diff) + 120) % 60;
	} else if(max == g) {
		hue = (60 * ((b - r) / diff) + 120) % 60;
	} else if (max == b) {
		hue = (60 * ((r - g) / diff) + 120) % 60;
	} else {
		hue = 0;
	}
	if(max == 0) {
		saturation = 0;
	} else {
		saturation = (diff/max) * 100;
	}
	let brightness = max * 100;
	return [hue, saturation, brightness];
}
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
	return [c, m, y, k];
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
	return [255 * (1 - c) * (1 - k),
			255 * (1 - m) * (1 - k),
			255 * (1 - y) * (1 - k)];
}