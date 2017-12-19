class exports.Dock extends Layer

	constructor: (@options={}) ->
		@options.margin ?= 10

		super @options

		@options.availableFrame =
			x: @margin
			y: @margin
			width: @width - @margin*2
			height: @height - @margin*2

	addLayer: (position, options={}) ->
		if typeof position == "object"
			options = position
			position = "fill"

		if @options.availableFrame.x > 0 && @options.availableFrame.y > 0 && @options.availableFrame.width > 0 && @options.availableFrame.height > 0
			layer = new Layer
				parent: @
	
			options.width ?= 200
			options.height ?= 200
			options.backgroundColor ?= options.color || Utils.randomColor()
			layer.props = options

			layer.position = position

			@drawLayer position, layer

		else
			print "Not enough space to add the layer"
			return

	drawLayer: (position, layer) ->
		if position == "top"
			layer.props =
				y: @options.availableFrame.y
				x: @options.availableFrame.x
				width: @options.availableFrame.width
			@options.availableFrame.y += layer.height + @options.margin
			@options.availableFrame.height -= layer.height + @options.margin

		else if position == "left"
			layer.props =
				y: @options.availableFrame.y
				x: @options.availableFrame.x
				height: @options.availableFrame.height
			@options.availableFrame.x += layer.width + @options.margin
			@options.availableFrame.width -= layer.width + @options.margin

		else if position == "bottom"
			layer.props =
				x: @options.availableFrame.x
				maxY: @options.availableFrame.height + @options.availableFrame.y
				width: @options.availableFrame.width
			@options.availableFrame.height -= layer.height + @options.margin

		else if position == "right"
			layer.props =
				y: @options.availableFrame.y
				maxX: @options.availableFrame.width + @options.availableFrame.x
				height: @options.availableFrame.height
			@options.availableFrame.width -= layer.width + @options.margin

		else if position == "fill" || position == undefined
			layer.props =
				y: @options.availableFrame.y
				x: @options.availableFrame.x
				width: @options.availableFrame.width
				height: @options.availableFrame.height
			@options.availableFrame =
				x: 0
				y: 0
				width: 0
				height: 0

	@define "availableFrame",
		get: -> @options.availableFrame
		set: (value) ->
			@options.availableFrame = value
	@define "margin",
		get: -> @options.margin
		set: (value) ->
			originalMargin = @options.margin
			diff = value - originalMargin
			@options.margin = value

			@options.availableFrame =
				x: value
				y: value
				width: @width - value*2
				height: @height - value*2

			for child in @children
				@drawLayer child.position, child