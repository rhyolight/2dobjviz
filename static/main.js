$(() => {

    const cellSize = 20

    const $container = $('#environments')

    // Parses object from CSV
    function parseCsvObject(csv) {
        let object = {}
        object.features = []
        csv.split('\n').forEach((line, i) => {
            console.log(line)
            if (i === 0) {
                // Object name
                object.name = line
            } else if (i === 1) {
                // Object dimensions
                let dims = line.split(',')
                object.x = parseInt(dims[0])
                object.y = parseInt(dims[1])
            } else if (!line || line.startsWith('---')) {
                // Ignore
            } else {
                // Data
                let feature = {}
                let parts = line.split(',')
                feature.x = parseInt(parts[0])
                feature.y = parseInt(parts[1])
                feature.data = parts[2]
                object.features.push(feature)
            }
        })
        return object
    }

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

        const ctx = $canvas[0].getContext('2d');
        $canvas.attr('width', cellSize * object.x)
        $canvas.attr('height', cellSize * object.y)
        ctx.font = cellSize + 'px sans-serif'
        object.features.forEach(feature => {
            ctx.fillText(
                feature.data,
                feature.y * cellSize,
                feature.x * cellSize + cellSize)
        })
    }

    // Load CSV file by name
    function loadObject(id) {
        fetch(`/objects/${id}.csv`).then((resp) => {
            return resp.text()
        }).then((csv) => {
            let object = parseCsvObject(csv)
            renderObject(object, $container)
        })
    }

    ['a', 'b'].forEach(loadObject)

})
