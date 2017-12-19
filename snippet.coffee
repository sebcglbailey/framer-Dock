dock = new Dock
	size: Screen
	backgroundColor: null


dock.addLayer "left",
	color: "red"
	width: 100

dock.addLayer "top",
	color: "green"

dock.addLayer "top",
	color: "black"
	height: 50

dock.addLayer "right",
	backgroundColor: "blue"

dock.addLayer "bottom",
	backgroundColor: "yellow"
	height: 300

dock.addLayer()

dock.margin = 20