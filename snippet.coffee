yellow = new Layer
	backgroundColor: "yellow"
	height: 300

dock = new Dock
	width: 710
	height: 710
	x: 5
	y: 5
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

dock.insertLayer yellow, "bottom"

dock.addLayer()

dock.margin = 20