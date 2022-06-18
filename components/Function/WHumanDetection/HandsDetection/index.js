import React from 'react'
import mpHands from '@mediapipe/hands'
import controls from '@mediapipe/control_utils'
import drawingUtils from '@mediapipe/drawing_utils'

import styles from './styles.module.css'
import config from './config'
export default class HandsDetection extends React.Component{
    constructor(props){
        super(props)
        this.canvas = React.createRef(null)
        this.video  = React.createRef(null)
        this.panel = React.createRef(null)
        this.onFrame = this.onFrame.bind(this)
        this.onResults = this.onResults.bind(this)
        this.config = config
        
    }
    resultsHandle(results,canvasCtx){
        canvasCtx.drawImage(results.image, 0, 0, this.canvas.current.width, this.canvas.current.height)
        if (results.multiHandLandmarks && results.multiHandedness) {
            for (let index = 0; index < results.multiHandLandmarks.length; index++) {
            const classification = results.multiHandedness[index];
            const isRightHand = classification.label === 'Right';
            const landmarks = results.multiHandLandmarks[index];
            drawingUtils.drawConnectors(
                canvasCtx, landmarks, mpHands.HAND_CONNECTIONS,
                {color: isRightHand ? config.right.connector.color : config.left.connector.color});
            drawingUtils.drawLandmarks(canvasCtx, landmarks, {
                color: isRightHand ? config.right.landmark.color: config.left.landmark.color,
                fillColor: isRightHand ? config.right.landmark.fillColor : config.left.landmark.fillColor,
                radius: (data) => drawingUtils.lerp(data.from.z, -0.15, .1, 10, 1)
            });
            }
        }
    }
    initModel(){
        return new mpHands.Hands({locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${mpHands.VERSION}/${file}`;
        }})
    }
    async onFrame(input,size){
        const aspect = size.height / size.width;
        let width, height
        if (window.innerWidth > window.innerHeight) {
            height = window.innerHeight;
            width = height / aspect;
        } else {
            width = window.innerWidth;
            height = width * aspect;
        }
        this.canvas.current.width = width;
        this.canvas.current.height = height;
        await this.model.send({image: input});
    }
    onResults(results){
        this.props.onLoad()
        this.fpsControl.tick()
        const canvasCtx = this.canvas.current.getContext('2d')
        canvasCtx.save()
        canvasCtx.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height)
        this.resultsHandle(results,canvasCtx)
        canvasCtx.restore();
    }
    componentDidMount(){
        this.model = this.initModel()
        this.fpsControl = new controls.FPS()
        this.sourceControl = new controls.SourcePicker({onFrame:this.onFrame})
        this.model.onResults(this.onResults)
        this.control = new controls
            .ControlPanel(this.panel.current, this.config.main)
            .add([
            this.fpsControl,
            this.sourceControl
            ]) 
            .on((x)=>{this.model.setOptions(x)});
    }
    componentWillUnmount(){
        this.model.close()
    }
    render(){
        return (
        <div className={styles['container']}>
            <video className={styles['input-video']}  ref={this.video}/>
            <canvas className={styles['output-canvas']} ref={this.canvas}/>
            <div className={styles['control-panel']}  ref={this.panel}></div>
        </div>)
    }
  }
  
  