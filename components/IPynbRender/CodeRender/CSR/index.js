import React from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import OutputRender from './OutputRender'
import styles from './styles.module.css'


export default function CodeCSRRender({cell}) {
  let [isOpen,setIsOpen] = React.useState(false)
  return (
    <div className={`${styles['code-render']} ${isOpen?'':styles.close}`}> 
        <CodeMirror
          className={styles.code}
          value={cell.source}
          height="300px"
          theme="dark"
          editable={false}
          readOnly={true}
          extensions={[python()]}
        />
        <div 
        className={styles.control}
        onClick = {e=>{setIsOpen(!isOpen)}}
        />
        {
            cell.outputs.map((output,i)=>(
                <OutputRender output={output} key={i}/>
            ))
        }   
    </div>
  )
}
