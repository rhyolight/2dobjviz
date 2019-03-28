$(() => {

    const cellSize = 20
    const $container = $('#environments')

    // Renders object to canvas
    function renderObject(object, $parent) {
        // <div>
        // <h3></h3>
        // <canvas></canvas>
        // </div>

        let $title = $('<div>').html(object.name)
        let $canvas = $('<canvas>')

        $parent.append($title)
        $parent.append($canvas)

        const ctx = $canvas[0].getContext('2d')
        $canvas.attr('width', cellSize * object.width)
        $canvas.attr('height', cellSize * object.height)
        ctx.font = cellSize + 'px sans-serif'
        object.features.forEach(feature => {
            ctx.fillText(
                feature.data,
                feature.y * cellSize,
                feature.x * cellSize + cellSize)
        })
    }

    // Load yaml file by name
    function loadObject(id) {
        fetch(`/objects/${id}.yml`).then((resp) => {
            return resp.text()
        }).then((text) => {
            let object = jsyaml.load(text)
            renderObject(object, $container)
        })
    }

    ['a', 'b'].forEach(loadObject)

})
