const config = {
    main:{
        selfieMode: true,
        maxNumHands: 2,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    },
    loading:{
        type:"bar",
        color:'#fdfdfd'
    },
    left:{
        connector:{
            color:'#FF0000'
        },
        landmark:{
            color:'#00FF00',
            fillColor:'#00FF00'
        }
    },
    right:{
        connector:{
            color:'#FF0000'
        },
        landmark:{
            color:'#00FF00',
            fillColor:'#00FF00'
        }   
    }
}
export default config