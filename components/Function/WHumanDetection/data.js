import HandsDetection from "./HandsDetection"
import FaceMeshDetection from "./FaceMeshDetection"
import PoseDetection from "./PoseDetection"
import handIcon from '../../../public/icons/hand.svg'
import faceIcon from '../../../public/icons/face.svg'
import bodyIcon from '../../../public/icons/body.svg'
const data = {
    loading:{
        type:"bars",
        color:"#fdfdfd"
    },
    detections:[
        {
            name:'Hands',
            icon:handIcon,
            component:HandsDetection
        },
        {
            name:'Face',
            icon:faceIcon,
            component:FaceMeshDetection
        },       
        {   
            name:'Body',
            icon:bodyIcon,
            component:PoseDetection
        }
    ]
}
export default data