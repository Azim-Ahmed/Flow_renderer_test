const geojsonStyles = {
    lineLayout: {
        "line-join": "round",
        "line-cap": "round"
    },
    linePaint: {
        "line-color": "#ff11ff",
        "line-width": 4,
        "line-opacity": 1
    },
    symbolLayout: {
        "text-field": "{text}",
        "symbol-placement": "line",
        "text-rotation-alignment": "map",
        "text-offset": [-0.6, -0.6],
        "text-size": {
            base: 1,
            stops: [[9, 9], [14, 12]]
        }
    },
    symbolPaint: {
        "text-color": "rgba(0, 0, 0, 1)",
        "text-halo-color": "rgba(255, 255, 255, 1)",
        "text-halo-width": 2
    }
};

export default geojsonStyles;
