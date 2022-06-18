import React from 'react'
import controls from '@mediapipe/control_utils'
import drawingUtils from '@mediapipe/drawing_utils'
import HandsDetection from '../HandsDetection'
import styles from '../HandsDetection/styles.module.css'
import config from './config'
let mpFaceMesh 
export default class FaceMeshDetection extends HandsDetection{
    constructor(props){
        super(props)
        this.config = config
    }
    resultsHandle(results,canvasCtx){
        canvasCtx.drawImage(results.image, 0, 0, this.canvas.current.width, this.canvas.current.height);
        if (results.multiFaceLandmarks) {
        for (const landmarks of results.multiFaceLandmarks) {
            drawingUtils.drawConnectors(
                canvasCtx, landmarks, mpFaceMesh.FACEMESH_TESSELATION,
                config.tesselation)
            drawingUtils.drawConnectors(
                canvasCtx, landmarks, mpFaceMesh.FACEMESH_RIGHT_EYE,
                config.right_eye)
            drawingUtils.drawConnectors(
                canvasCtx, landmarks, mpFaceMesh.FACEMESH_RIGHT_EYEBROW,
                config.right_eyebrow)
            drawingUtils.drawConnectors(
                canvasCtx, landmarks, mpFaceMesh.FACEMESH_LEFT_EYE,
                config.left_eye)
            drawingUtils.drawConnectors(
                canvasCtx, landmarks, mpFaceMesh.FACEMESH_LEFT_EYEBROW,
                config.left_eyebrow)
            drawingUtils.drawConnectors(
                canvasCtx, landmarks, mpFaceMesh.FACEMESH_FACE_OVAL,
                config.face_oval)
            drawingUtils.drawConnectors(
                canvasCtx, landmarks, mpFaceMesh.FACEMESH_LIPS, 
                config.lips)
                if (config.main.refineLandmarks) {
                drawingUtils.drawConnectors(
                    canvasCtx, landmarks, mpFaceMesh.FACEMESH_RIGHT_IRIS,
                    config.right_iris)
                drawingUtils.drawConnectors(
                    canvasCtx, landmarks, mpFaceMesh.FACEMESH_LEFT_IRIS,
                    )
                }
        }}
    }
    initModel(){
        mpFaceMesh = require('@mediapipe/face_mesh')
        return  new mpFaceMesh.FaceMesh({locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@` +
                   `${mpFaceMesh.VERSION}/${file}`;
          }})
    }
  }
  
  