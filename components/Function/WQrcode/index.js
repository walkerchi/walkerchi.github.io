import React from 'react'
import { useTranslations } from 'next-intl';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import QRCode from 'qrcode'
import jsQR from 'jsqr'
import config from './config'
import styles from './styles.module.css'
export default function WQrcode() {
    const [info,setInfo] = React.useState('walkerchi')
    const [isUsingCamera,setIsUsingCamera] = React.useState(false)
    const t = useTranslations('function.wqrcode')
    let qrCanvas = React.useRef(null)
    let cameraCanvas = React.useRef(null)
    let video  = React.useRef(null)
    let uploader = React.useRef(null)
    let animID  = React.useRef(null)
    
    let mediaStreamTrack = React.useRef(null)
    React.useEffect(()=>{
        window.requestAnimationFrame =
                window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame 
                                || window.msRequestAnimationFrame;
    },[])

    React.useEffect(()=>{
        QRCode.toCanvas(qrCanvas.current, info, {
            version:8,
            errorCorrectionLevel:"M"
            },
            function (error) {
            if (error) console.error(error)
            else   console.log('success!');
            })
    },[info])


    function useCamera(){
        if(isUsingCamera){
            console.log(mediaStreamTrack.current.getTracks())
            mediaStreamTrack.current.getTracks()[0].stop()
            window.cancelAnimationFrame(animID.current)
            let canvasCtx = cameraCanvas.current.getContext('2d')
            canvasCtx.clearRect(0, 0, cameraCanvas.current.width, cameraCanvas.current.height);
        }else{
            // let video = document.createElement('video')
            let canvasCtx = cameraCanvas.current.getContext('2d')
            function drawLine(begin,end,color){
                canvasCtx.beginPath()
                canvasCtx.moveTo(begin.x,begin.y)
                canvasCtx.lineTo(end.x,end.y)
                canvasCtx.lineWidth  = 4
                canvasCtx.strokeStyle = color 
                canvasCtx.stroke()
            }
            function tick(){
                if(video.readyState === video.HAVE_ENOUGH_DATA){
                    cameraCanvas.current.height =video.current.offsetHeight 
                    cameraCanvas.current.width  = video.current.offsetWidth 
                    canvasCtx.drawImage(video.current,0,0,cameraCanvas.current.width,cameraCanvas.current.height)
                    let imageData = canvasCtx.getImageData(0,0,cameraCanvas.current.width,cameraCanvas.current.height)
                    let code = jsQR(imageData.data,imageData.width,imageData.height,{inversionAttempts:"dontInvert"})
                    if(code){
                        drawLine(code.location.topLeftCorner,code.location.topRightCorner,config.outline.color)
                        drawLine(code.location.topRightCorner,code.location.bottomRightCorner,config.outline.color)
                        drawLine(code.location.bottomRightCorner,code.location.bottomLeftCorner,config.outline.color)
                        drawLine(code.location.bottomLeftCorner,code.location.topLeftCorner,config.outline.color)
                        setInfo(code.data)
                    }
                }
                animID.current = requestAnimationFrame(tick)
            }
            
            navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: "environment",
                    width:500,
                    height:500
                },
                audio:false 
            })
            .then(stream=>{
                    video.current.srcObject = stream 
                    mediaStreamTrack.current = stream
                    animID.current = requestAnimationFrame(tick)
                })
        }
        setIsUsingCamera(isUsingCamera=>!isUsingCamera)
    }
    function handleUpload(){
        let fileData = uploader.current.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(fileData)
        reader.onload = function () {
            let canvasCtx = qrCanvas.current.getContext('2d');
            let img = new Image();
            img.src = this.result;
            img.onload = function () {
                canvasCtx.clearRect(0, 0, qrCanvas.current.width, qrCanvas.current.height);
                let width = img.width;
                let height = img.height;
                let result = geometric_scaling(width, height, qrCanvas.current.width, qrCanvas.current.height);
                if (result['scale_by'] === 'none') {
                    canvasCtx.drawImage(img, (qrCanvas.current.width - result['width']) / 2, (qrCanvas.current.height - result['height']) / 2, result['width'], result['height'])
                }
                if (result['scale_by'] === 'width') {
                    canvasCtx.drawImage(img, 0, (qrCanvas.current.height - result['height']) / 2, result['width'], result['height'])
                }
                if (result['scale_by'] === 'height') {
                    canvasCtx.drawImage(img, (qrCanvas.current.width - result['width']) / 2, 0, result['width'], result['height'])
                }
                let imageData = canvasCtx.getImageData(0,0,qrCanvas.current.width,qrCanvas.current.height)
                let code = jsQR(imageData.data,imageData.width,imageData.height,{inversionAttempts:"dontInvert"})
                if(code){
                    drawLine(code.location.topLeftCorner,code.location.topRightCorner,config.outline.color)
                    drawLine(code.location.topRightCorner,code.location.bottomRightCorner,config.outline.color)
                    drawLine(code.location.bottomRightCorner,code.location.bottomLeftCorner,config.outline.color)
                    drawLine(code.location.bottomLeftCorner,code.location.topLeftCorner,config.outline.color)
                    setInfo(code.data)
                }
                function drawLine(begin,end,color){
                    canvasCtx.beginPath()
                    canvasCtx.moveTo(begin.x,begin.y)
                    canvasCtx.lineTo(end.x,end.y)
                    canvasCtx.lineWidth  = 4
                    canvasCtx.strokeStyle = color 
                    canvasCtx.stroke()
                }
                function geometric_scaling(image_width, image_height, canvas_width, canvas_height) {
                    let width = image_width;
                    let height = image_height;
                    let scale = 1;
                    let scale_by = 'none';
                    let return_data = { width, height, scale, scale_by };
                    if (image_height < canvas_height && image_width < canvas_width) {
                        return return_data
                    }
                    else if (image_height > canvas_height && image_width > canvas_width) {
                        let scale_height = canvas_height / image_height;
                        let scale_width = canvas_width / image_width;
                        if (scale_height < scale_width) {
                            scale = scale_height;
                            scale_by = 'height';
                        }
                        else {
                            scale = scale_width;
                            scale_by = 'width';
                        }
                    }
                    else if (image_height > canvas_height) {
                        scale = canvas_height / image_height;
                        scale_by = 'height';
                    }
                    else {
                        scale = canvas_width / image_width;
                        scale_by = 'width';
                    }
                    return_data['width'] = image_width * scale;
                    return_data['height'] = image_height * scale;
                    return_data['scale'] = scale;
                    return_data['scale_by'] = scale_by;
                    return return_data
                }  
            }
        }
    }

    function download(){
        let a = document.createElement("a")
        a.download = 'qrcode'
        a.href = qrCanvas.current.toDataURL("image/png")
        document.body.appendChild(a)
        a.click()
        a.remove()
    }

  return (
    <div className={styles.wqrcode}>
        <div className={styles.container}>
            <div className={`${styles.buttons} ${isUsingCamera?styles['using-camera']:''}`}>
                <div className={styles['camera-button']} onClick={useCamera}>{t(config.buttons.camera.name)}</div>
                <div className={styles['upload-button']}>
                    <input  type="file" name="qrcode" accept="image/*" ref={uploader} onChange={()=>{if(!isUsingCamera)handleUpload()}}/>
                    <label onClick={()=>{uploader.current.click()}}>{t(config.buttons.upload.name)}</label>
                </div>
                
            </div>
            <div className={styles.qrcode}>
                <canvas ref={cameraCanvas} style={{display:isUsingCamera?"block":"none"}}/>
                <canvas ref={qrCanvas} onClick={download} style={{display:isUsingCamera?"none":"block"}}/>
                <div className={styles['switch-camera']} style={{display:isUsingCamera?"none":"block"}}></div>
            </div>
        </div>
        <div className={styles.json}>
            <CodeMirror
                className={`${styles['python-code']} ${styles.code}`}
                value={info}
                height="300px"
                theme="dark"
                editable={!isUsingCamera}
                readOnly={false}
                extensions={[]}
                onChange={(value)=>{if(!isUsingCamera)setInfo(value)}}
            />
        </div>
        <video autoPlay playsInline ref={video} className={styles.video}></video>
    </div>
  )
}
