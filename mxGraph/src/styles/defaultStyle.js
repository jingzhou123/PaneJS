module.exports = {

    common: {
        dx: 0,
        dy: 0,
        scale: 1,

        // rotate
        rotation: 0,
        rotationCx: 0,
        rotationCy: 0,

        // fill
        fillColor: '#e3f4ff',
        fillOpacity: 1,
        fillRule: '',      // nonzero, evenodd
        gradient: false,
        gradientColor1: '#f5f5f5',
        gradientOpacity1: 1,
        gradientColor2: '#e3f4ff',
        gradientOpacity2: 1,
        gradientDirection: 'south', // south, north, west, east

        // border
        strokeWidth: 1,
        strokeColor: '#1ba1e2',
        strokeOpacity: 1,
        dashed: false,
        dashPattern: '3 3',
        dashOffset: 0,
        lineCap: 'butt',   // butt, round, square
        lineJoin: 'miter', // miter, round, bevel
        miterLimit: 10,

        // shadow
        shadow: false,
        shadowColor: 'gray',
        shadowOpacity: 1,
        shadowDx: 2,
        shadowDy: 3,

        glass: false,
        flipH: false,
        flipV: false,
        visible: true,
        outline: false,
        antiAlias: true,

        label: {
            shape: 'label',
            position: 'center',       // top, right, bottom, left, center
            align: 'center',          // left, center, right
            verticalAlign: 'middle',  // top, middle, bottom
            overflow: '',             // hidden, fill, width
            spacing: 5,
            vertical: false,
            verticalRotation: -90
        },
    },


    node: {
        shape: 'rectangle',
        round: 0 // percentage
    },

    link: {
        shape: 'connector',
        endArrow: 'classic',  // classic, block, open, oval, diamond, diamondThin
        fillColor: '#1ba1e2'
    }
};