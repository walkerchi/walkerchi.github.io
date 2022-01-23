import React,{useState,useEffect,useRef} from 'react'
import './markdownEditorLayout.css'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import MarkdownEditor from '../../components/MarkdownEditor/MarkdownEditor'
import MarkdownRender from '../../components/MarkdownRender/MarkdownRender'


export default function MarkdownEditorLayout() {
const [source, setSource] = useState(`
# 一级标题

## 二级标题

****

**粗体**

*斜体*

列表
- 项1
- 项2

表格
|头1|头2|
|:--:|:--:|
| 0 | 1 |

\`\`\`python
# python代码块
import this
\`\`\`

\`\`\`mermaid
graph LR
A-->B
\`\`\`

:smile:
`);
const [renderPPT,setRenderPPT] = useState(false)
const [exportType,setExportType] = useState('Markdown')
const candidateType = [
    {name:'Markdown',avail:true},
    {name:'HTML',avail:false},
    {name:'PDF',avail:false},
    {name:'PPT',avail:false}]

function downloadHandler(){
    if(exportType==="Markdown"){
        const filename="_.md"
        const text = source 
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }else if(exportType === 'HTML'){
        alert("Not Implemented yet")
    }else if(exportType === 'PDF'){
        alert("Not Implemented yet")
    }else if(exportType === 'PPT'){
        alert("Not Implemented yet")
    }
}
  //console.log('markdowneditorlayout')
  return (<div className='markdowneditorlayout-container'>
        <Navbar/>
        <div className='markdowneditorlayout-body'>
            <div className='markdowneditorlayout-manager'>
                <div 
                    className='markdowneditorlayout-rendertype' 
                    onClick={()=>{setRenderPPT(!renderPPT);setSource(source+" ")}}
                >
                    <div>Render as</div>
                    <div>{renderPPT?"PPT":"PDF"}</div>
                </div>
                <div className='markdowneditorlayout-exporttype'>
                    <div className='markdowneditorlayout-export' onClick={()=>{downloadHandler()}}>Export</div>
                    <div> as </div> 
                    <div className='markdowneditorlayout-export-choice'>
                        <span> {exportType} </span>
                        <ul>
                            {
                                candidateType.map(x=>{
                                    if(x.avail){
                                        return(<li onClick={()=>
                                        {setExportType(x.name)}
                                        }>{x.name}</li>)
                                    }else{
                                        return(<li style={{'text-decoration':'line-through'}}>
                                            {x.name}
                                        </li>)
                                    }
                                    
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
            <div className='markdowneditorlayout-content'>
                <div>
                    {/* <MarkdownEditor value={source} onChange={(newSource)=>{setSource(newSource)}}/> */}
                    <MarkdownEditor value={source} onChange={setSource}/>
                </div>
                <div className={renderPPT?"":"markdowneditorlayout-render-state0"}>
                    <MarkdownRender source={source} isPPT={renderPPT}/>
                </div>
            </div>
        </div>
        {/* <Footer/> */}
  </div>);
}
