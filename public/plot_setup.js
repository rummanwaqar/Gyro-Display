var data = [];
var totalPoints = 100;
var updateInterval = 1000;
var now = new Date().getTime();

function GetData() {
	data.shift(); //to remove first item of array
 
	while (data.length < totalPoints) {    
		var y = Math.random() * 100;
		var temp = [now += updateInterval, y]; //data format [x, y]
 
		data.push(temp);
	}
}

var dataset = [
	{
		label: 'line1',
		data: data
	}
];

var options = {
	xaxis: {
		mode: "time",
		tickSize:[2, "second"],
		tickFormatter: function (v, axis) {
			var date = new Date(v);
					 
			if (date.getSeconds() % 20 == 0) {
				var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
				var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
					 
				return hours + ":" + minutes + ":" + seconds;
			} else {
				return "";
			}
		},
		axisLabel: "Time",
		axisLabelUseCanvas: true,
		axisLabelFontSizePixels: 12,
		axisLabelFontFamily: 'Verdana, Arial',
		axisLabelPadding: 10
	},
	yaxis: {
		min: 0,
		max: 100,                         
		tickFormatter: function (v, axis) {
			if (v % 10 == 0) {
				return v + "%";
			} else {
				return "";
			}
		},
		axisLabel: "CPU loading",
		axisLabelUseCanvas: true,
		axisLabelFontSizePixels: 12,
		axisLabelFontFamily: 'Verdana, Arial',
		axisLabelPadding: 6
	},

	series: {
		lines: {show: true,
				lineWidth: 1.2,
				fill: true},
	}
};

$(document).ready(function() {
	GetData();

	dataset = [{ label:"CPU", data:data, color:"#00FF00" }];

	$.plot($("#flot-placeholder"), dataset, options);
				
	function update() {
		GetData();
				 
		$.plot($("#flot-placeholder"), dataset, options)
		setTimeout(update, updateInterval);
	}

	update();
});