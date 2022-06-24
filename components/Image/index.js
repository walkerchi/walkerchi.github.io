
import React from 'react'
import Image from 'next/image'

export default function ImageComponent(props){
    console.log(props)
    return <Image {...props}/>
}


// export default function ImageComponent(props) {
//     let [isLoaded,setIsLoaded] = React.useState(props.blurDataURL===undefined)
//   return (
//     <div 
//         className={props.className?props.className:""}
//         style={
//             Object.assign({
//                 },
//                 props.layout==="fill"?{
//                     width:"100%",
//                     height:"100%"
//                 }:{
//                     width:props.width,
//                     height:props.height
//                 }
//             )
       
//     }>
//         <img src={props.src} 
//             onLoad={()=>{
//                 console.log('onload')
//                 setIsLoaded(true)}}
//             style={{
//                 display:isLoaded?'block':'none',
//                 width:"100%",
//                 height:"100%",
//                 objectFit:props.objectFit
//         }}/>
//         <img src={props.blurDataURL} style={{
//             display:isLoaded?'none':'block',
//             width:"100%",
//             height:"100%",
//             objectFit:props.objectFit
//         }}
//         onLoad={()=>{
//             console.log('blur onload')
//         }}
//         />
//     </div>
//   )
// }
