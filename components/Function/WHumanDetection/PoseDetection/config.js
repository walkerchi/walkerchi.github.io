const config = {
    main:{
        selfieMode: true,
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        smoothSegmentation: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
        effect: 'background',
    },
    sourceIn:{
        fill:'#00FF007F'
    },
    sourceOut:{
        fill:'0000FF7F'
    },
    connection:{visibilityMin: 0.65, color: 'white'},
    left:{visibilityMin: 0.65, color: 'white', fillColor: 'rgb(255,138,0)'},
    right:{visibilityMin: 0.65, color: 'white', fillColor: 'rgb(0,217,231)'},
    neutral:{visibilityMin: 0.65, color: 'white', fillColor: 'white'}
}
export default config