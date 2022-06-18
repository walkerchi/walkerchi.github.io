import React from 'react'
import Header from 'next/head'
import Script from 'next/script'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkGemoji from 'remark-gemoji'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeMathJax from 'rehype-mathjax'
import rehypeStringify from 'rehype-stringify'
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import styles from './styles.module.css'

async function renderMarkdown(content){
    let ret = await  unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkMath)
            .use(remarkGemoji)
            .use(remarkRehype,{allowDangerousHtml: true})
            .use(rehypeHighlight)
            .use(rehypeMathJax)
            .use(rehypeStringify)
            .process(content)
    return String(ret)
}



export default function WPython() {
    const [cells,setCells] = React.useState([])
    const [selectedCell,setSelectedCell] = React.useState(null)
    const [isLoading,setIsLoading] = React.useState(false)
    let messages = React.useRef([])
    let pyodide  = React.useRef(null)
    let cellsRef = React.useRef({})
    React.useEffect(()=>{
        restart()
    },[])
    function appendPython(){
        setCells(cells=>{
            let cellsCopy = [...cells]
            if(cellsCopy.length === 0 || selectedCell === null){
                cellsCopy.push({
                    isPython:true,
                    code:'',
                    output:null
                })
            }else{
                cellsCopy.splice(selectedCell+1,0,{
                    isPython:true,
                    code:'',
                    output:null
                })
            }
            return cellsCopy
        })
    }
    function appendMarkdown(){
        setCells(cells=>{
            let cellsCopy = [...cells]
            if(cellsCopy.length === 0 || selectedCell===null){
                cellsCopy.push({
                    isMarkdown:true,
                    isRendered:false,
                    code:'',
                    output:null
                })
            }else{
                cellsCopy.splice(selectedCell+1,0,{
                    isMarkdown:true,
                    isRendered:false,
                    code:'',
                    output:null
                })
            }
            return cellsCopy
        })
    }   
    function restart(){
        setIsLoading(true)
        globalThis.loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/dev/full/',
            stdout:(msg)=>{messages.current.push(msg)}
        }).then(e=>{
            e.loadPackage("numpy")
            e.loadPackage("scikit-learn")
            pyodide.current=e
            setIsLoading(false)
        })
    }
    function runAll(){
        setCells(cells=>{
            return cells.map((cell,i)=>{
                cellsRef.current[i].runCell()
            })
        })
    }
    class Cell extends React.Component{
         /*
        python cell:
        {
            isPython:true,
            code:String,
            output:
        }
        markdown cell:
        {
            isMarkdown:true,
            code:String,
            output:String,
            isRendered:boolean
        }
        */
        constructor(props){
            super(props)
            this.code = props.cell.code
            this.cell = props.cell
            this.isSelected = props.isSelected
            this.index = props.index
        }   
        runCell(){
            let that = this
            setCells(cells=>{
                return cells.map((cell,i)=>{
                    if(i===that.index){
                        cell.code = that.code
                        if(cell.isPython){
                            messages.current = []
                            let output = pyodide.current.runPython(cell.code)
                            cell.output = output||messages.current
                        }else if(cell.isMarkdown){
                            if(!cell.isRendered){
                                renderMarkdown(cell.code)
                                .then(e=>{
                                    setCells(cells=>cells.map((cell,i)=>{
                                        if(i===that.index){
                                            cell.output = e
                                            cell.isRendered=true
                                        }
                                        return cell
                                    }))
                                })
                            }else{
                                cell.isRendered=false
                            }
                        }
                    }
                    return cell
                }) 
            })
        }
        changeType(){
            let that =this
            setCells(cells=>{
                return cells.map((cell,i)=>{
                    if(that.index == i){
                        if(cell.isPython){
                            return {
                                isMarkdown:true,
                                isRendered:false,
                                code:'',
                                output:null
                            }
                        }else{
                            return {
                                isPython:true,
                                code:'',
                                output:null
                            }
                        }
                    }else{
                        return cell
                    }
                })
            })
        }
        deleteCell(){
            let that = this
            setCells(cells=>{
                return cells.filter((cell,i)=>{
                    if(i===that.index)
                        return false 
                    return true
                })
            })
        }
        render(){
            let  that =  this
            return (
                <div className={styles.cell} onClick={(e)=>{setSelectedCell(that.index);e.stopPropagation()}}>
                     <div className={`${styles[`change-to-${that.cell.isPython?'markdown':'python'}`]} ${styles.icon}`} onClick={that.changeType.bind(this)}/>
                     <div className={`${styles.delete} ${styles.icon}`} onClick={that.deleteCell.bind(this)}/>
                     {
                         (()=>{
                             if(that.cell.isPython){
                                 return (
                                 <>
                                 <div className={`${styles['run-cell']} ${styles.icon}`} onClick={that.runCell.bind(this)}/>
                                 <CodeMirror
                                 className={`${styles['python-code']} ${styles.code} ${that.isSelected?styles.selected:''}`}
                                 value={that.code}
                                 height="300px"
                                 theme="dark"
                                 editable={true}
                                 readOnly={false}
                                 extensions={[python()]}
                                 onChange={(value)=>{that.code=value}}
                                 />
                                 <div className={styles['python-output']}>{that.cell.output}</div>
                                 </>)
                             }else if(that.cell.isMarkdown){
                                 if(that.cell.isRendered) 
                                     return (<>
                                     <div  className={`${styles['markdown-edit']} ${styles.icon}`} onClick={that.runCell.bind(this)}/>
                                     <div 
                                     className={`${styles['markdown-output']} ${that.isSelected?styles.selected:''}`}
                                     dangerouslySetInnerHTML={{__html:that.cell.output}}/>
                                     </>)
                                 else 
                                     return  (<>
                                     <div className={`${styles['markdown-render']} ${styles.icon}`} onClick={that.runCell.bind(this)}/>
                                     <CodeMirror
                                     className={`${styles['markdown-code']} ${styles.code} ${that.isSelected?styles.selected:''}`}
                                     value={that.code}
                                     height="300px"
                                     theme="dark"
                                     editable={true}
                                     readOnly={false}
                                     //extensions={[markdown({ base: markdownLanguage})]}
                                     // extensions={[python()]}
                                     onChange={(value)=>{that.code=value}}
                                     />
                                     </>)
                             }
                         })()
                     }
                </div>)
        }
    }

    return (
    <div className={styles.wpython} onClick={()=>{setSelectedCell(null)}}>
        <Header>
            <Script src="https://cdn.jsdelivr.net/pyodide/dev/full/pyodide.js"/>
        </Header>
        <div className={styles.loading} style={{display:isLoading?'block':'none'}}>loading</div>
        <div className={styles.controller}>
            <div
            className={`${styles['append-python']} ${styles.icon}`}
            onClick={appendPython}
            />
            <div
            className={`${styles['append-markdown']} ${styles.icon}`}
            onClick={appendMarkdown}
            />
            <div
            className={`${styles.restart} ${styles.icon}`}
            onClick={restart}
            />
            <div 
            className={`${styles['run-all']} ${styles.icon}`}
            onClick={runAll}/>
        </div>
        <div className={styles.cells}>
            {
                cells.map((cell,i)=>(
                    <Cell key={i} cell={cell} ref={e=>{cellsRef.current[i]=e}} isSelected={i===selectedCell} index={i}/>
                ))
            }
        </div>
    </div>
  )
}
