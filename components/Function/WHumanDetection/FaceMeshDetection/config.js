const config = {
    main:{
        selfieMode: true,
        enableFaceGeometry: false,
        maxNumFaces: 1,
        refineLandmarks: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    },
    loading:{
        type:"bar",
        color:'#fdfdfd'
    },
    tesselation:{
        color: '#C0C0C070', 
        lineWidth: 1
    },
    right_eye:{
        color: '#FF3030'
    },
    right_eyebrow:{
        color: '#FF3030'
    },
    left_eye:{
        color: '#30FF30'
    },
    left_eyebrow:{
        color: '#30FF30'
    },
    face_oval:{
        color: '#E0E0E0'
    },
    lips:{
        color: '#E0E0E0'
    },
    right_iris:{
        color: '#FF3030'
    },
    left_iris:{
        color: '#30FF30'
    }
}
export default config