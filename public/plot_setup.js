var options = {
	xaxis: {
		//mode: "time",
		//tickSize:[1, "second"],
		//timeformat: "%M:%S",
		axisLabel: "Count",
		axisLabelUseCanvas: true,
		axisLabelFontSizePixels: 12,
		axisLabelFontFamily: 'Verdana, Arial',
		axisLabelPadding: 10
	},
	yaxis: {
		//min: -32768,
		//max: 32767,
		axisLabel: "Raw Gyro Value",
		axisLabelUseCanvas: true,
		axisLabelFontSizePixels: 12,
		axisLabelFontFamily: 'Verdana, Arial',
		axisLabelPadding: 6
	},

	series: {
		lines: {show: true,
				lineWidth: 1.2,
				fill: false},
	}
};