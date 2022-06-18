import React from 'react'
import drawingUtils from '@mediapipe/drawing_utils'
import HandsDetection from '../HandsDetection'
import config from './config'
import mpPose from '@mediapipe/pose'
export default class PoseDetection extends HandsDetection{
    constructor(props){
        super(props)
        this.config=config
    }
    resultsHandle(results,canvasCtx){
        if (results.segmentationMask) {
          canvasCtx.drawImage(
              results.segmentationMask, 0, 0, this.canvas.current.width,this.canvas.current.height);
      
          // Only overwrite existing pixels.
          if (activeEffect === 'mask' || activeEffect === 'both') {
            canvasCtx.globalCompositeOperation = 'source-in';
            // This can be a color or a texture or whatever...
            canvasCtx.fillStyle = config.sourceIn.fill
            canvasCtx.fillRect(0, 0, this.canvas.current.width, this.canvas.current.height);
          } else {
            canvasCtx.globalCompositeOperation = 'source-out';
            canvasCtx.fillStyle = config.sourceOut.fill;
            canvasCtx.fillRect(0, 0, this.canvas.current.width, this.canvas.current.height);
          }
      
          // Only overwrite missing pixels.
          canvasCtx.globalCompositeOperation = 'destination-atop';
          canvasCtx.drawImage(results.image, 0, 0, this.canvas.current.width, this.canvas.current.height);
      
          canvasCtx.globalCompositeOperation = 'source-over';
        } else {
           canvasCtx.drawImage(results.image, 0, 0, this.canvas.current.width, this.canvas.current.height);
        }
      
        if (results.poseLandmarks) {
          drawingUtils.drawConnectors(
              canvasCtx, results.poseLandmarks, mpPose.POSE_CONNECTIONS,config.connection);
          drawingUtils.drawLandmarks(
              canvasCtx,
              Object.values(mpPose.POSE_LANDMARKS_LEFT)
                  .map(index => results.poseLandmarks[index]),config.left);
          drawingUtils.drawLandmarks(
              canvasCtx,
              Object.values(mpPose.POSE_LANDMARKS_RIGHT)
                  .map(index => results.poseLandmarks[index]),config.right);
          drawingUtils.drawLandmarks(
              canvasCtx,
              Object.values(mpPose.POSE_LANDMARKS_NEUTRAL)
                  .map(index => results.poseLandmarks[index]),config.neutral);
        }
    }
    initModel(){
        return new mpPose.Pose( {
            locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@${mpPose.VERSION}/${file}`;
          }})
    }
  }
  
  