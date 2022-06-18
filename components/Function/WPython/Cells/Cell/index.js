import React from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import styles from './styles.module.css'
class Cell extends React.Component{
    constructor(props){
        super(props)
        this.code = ""
        this.run = this.run.bind(this)
        this.edit   = this.edit.bind(this)
        this.switch = this.switch.bind(this)
        this.select = this.select.bind(this)
        this.delete = this.delete.bind(this)
    }   
    run(){
        this.props.update(this.code)
        this.props.run()
    }
    edit(){
        this.props.edit()
    }
    switch(){
        this.props.switch()
    }
    select(e){
        this.props.select()
        e.stopPropagation()
    }
    delete(){
        this.props.delete()
    }
    render(){
        return (
        <div className={`${styles.cell} ${this.props.isSelected?styles.selected:''}`} onClick={this.select}>
            <div className={`${styles[`change-to-${this.props.isPython?'markdown':'python'}`]} ${styles.icon}`} onClick={this.switch}/>
            <div className={`${styles.delete} ${styles.icon}`} onClick={this.delete}/>
            {
                this.props.isPython?
                <>
                    <div className={`${styles['run-cell']} ${styles.icon}`} onClick={this.run}/>
                    <CodeMirror
                        className={`${styles['python-code']} ${styles.code}`}
                        value={this.code}
                        height="300px"
                        theme="dark"
                        editable={true}
                        readOnly={false}
                        extensions={[python()]}
                        onChange={(value)=>{this.code=value}}
                    />
                    <div className={styles['python-output']}>
                        <div
                        dangerouslySetInnerHTML={{__html:this.props.output}}
                        />
                        <div id={`output-${this.props.id}`}></div>
                    </div>
                </>
                :this.props.isRendered?
                <>
                    <div  className={`${styles['markdown-edit']} ${styles.icon}`} onClick={this.edit}/>
                    <div 
                    className={styles['markdown-output']}
                    dangerouslySetInnerHTML={{__html:this.props.output}}/>
                </>
                :
                <>
                    <div className={`${styles['markdown-render']} ${styles.icon}`} onClick={this.run}/>
                    <CodeMirror
                        className={`${styles['markdown-code']} ${styles.code}`}
                        value={this.code}
                        height="300px"
                        theme="dark"
                        editable={true}
                        readOnly={false}
                        //extensions={[markdown({ base: markdownLanguage})]}
                        // extensions={[python()]}
                        onChange={(value)=>{this.code=value}}
                    />
                </>
            }
        </div>)
    }
}
export default Cell