import React from 'react'
import Cell from './Cell'
import {uuid,renderMarkdown} from './utils'
import styles from './styles.module.css'
export default class Cells extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selectedCell:null,
            cells:[]
        }
        this.cellsRef = React.createRef({})
        this.appendCell = this.appendCell.bind(this)
        this.appendPython = this.appendPython.bind(this)
        this.appendMarkdown = this.appendMarkdown.bind(this)
        this.restart = this.restart.bind(this)
        this.runAll = this.runAll.bind(this)

        this.updateCell = this.updateCell.bind(this)
        this.deleteCell = this.deleteCell.bind(this)
        this.selectCell = this.selectCell.bind(this)
        this.runCell = this.runCell.bind(this)
        this.switchCell = this.switchCell.bind(this)
    }
    appendCell(cell){
        if(this.state.selectedCell===null){
            console.log('appendCell push outer')
            this.setState(({cells:cellsOrigin})=>{
                let cells = [...cellsOrigin]
                cells.push(cell)
                return {cells}})
        }else{
            this.setState(({cells:cellsOrigin,selectedCell})=>{
                let cells = [...cellsOrigin]
                cells.splice(selectedCell+1,0,cell)
                return {cells}})
        }
    }
    appendPython(){
        this.appendCell({
            id:uuid(),
            isPython:true,
            code:'',
            output:null
        })
    }
    appendMarkdown(){
        this.appendCell({
            id:uuid(),
            isMarkdown:true,
            isRendered:false,
            code:'',
            output:null
        })
    }
    restart(){
        this.props.restart()
    }
    runAll(){
        for(let i = 0;i<this.state.cells.length;++i){
            if(this.state.cells[i].isPython || (this.state.cells[i].isMarkdown && !this.state.cells[i].isRendered)){
                this.cellsRef.current[i].run()
            }
        }
    }
    editCell(index){
        this.setState(({cells:cellsOrigin})=>{
            let cells = [...cellsOrigin]
            let cell = cells[index]
            cell.isRendered = false 
            return {cells}
        })
    }
    updateCell(index,content){
        this.setState(({cells:cellsOrigin})=>{
            let cells = [...cellsOrigin]
            let cell = cells[index]
            cell.code = content
            return {cells}
        })
    }
    deleteCell(index){
        this.setState(({cells:cellsOrigin})=>{
            let cells = [...cellsOrigin]
            cells.splice(index,1)
            return {cells}})
    }
    selectCell(index){
        console.log(index)
        this.setState({selectedCell:index})
    }
    runCell(index){
        this.setState(({cells:cellsOrigin})=>{
            let cells = [...cellsOrigin]
            let cell = cells[index]
            if(cell.isPython){
                cell.output = this.props.runPython(cell.code)
                let body = document.getElementsByTagName('body')[0]
                let lastEl = body.lastChild
                if(lastEl.id&&lastEl.id.startsWith('matplotlib')){
                    let outputEl = document.getElementById(`output-${cell.id}`)
                    console.log(outputEl)
                    if(outputEl.childNodes.length>0){
                        outputEl.removeChild(outputEl.children[0])
                    }
                    outputEl.appendChild(lastEl)
                    this.props.runPython('plt.close("all")')
                }
            }else if(cell.isMarkdown){
                let that = this
                renderMarkdown(cell.code)
                .then(output=>{
                    that.setState(({cells:cellsOrigin})=>{
                        let cells = [...cellsOrigin]
                        let cell = cells[index]
                        cell.output = output 
                        cell.isRendered = true 
                        return {cells}
                    })                    
                })
            }
            return {cells}
        })
    }
    switchCell(index){
        this.setState(({cells:cellsOrigin})=>{
            let cells = [...cellsOrigin]
            let cell = cells[index]
            if(cell.isPython){
                cells[index] = {
                    id:cell.id,
                    isMarkdown:true,
                    code:cell.code,
                    output:null
                }
            }else if(cell.isMarkdown){
                cells[index] = {
                    id:cell.id,
                    isPython:true,
                    code:cell.code,
                    output:null
                }
            }
            console.log(cells)
            return {cells}
        })
    }

    render(){
        let that = this
        this.cellsRef.current = []
        return (
        <div className={styles.container} onClick={()=>{this.selectCell(null)}}>
            <div className={styles.controller}>
                <div
                className={`${styles['append-python']} ${styles.icon}`}
                onClick={this.appendPython}
                />
                <div
                className={`${styles['append-markdown']} ${styles.icon}`}
                onClick={this.appendMarkdown}
                />
                <div
                className={`${styles.restart} ${styles.icon}`}
                onClick={this.restart}
                />
                <div 
                className={`${styles['run-all']} ${styles.icon}`}
                onClick={this.runAll}/>
            </div>
            <div className={styles.cells} >
                {
                    this.state.cells.map((cell,i)=>(
                        <Cell key={cell.id}
                        {...cell}
                        ref = {(e)=>{this.cellsRef.current[i]=e}}
                        update={(content)=>{that.updateCell(i,content)}}
                        run={()=>{that.runCell(i)}}
                        edit={()=>{that.editCell(i)}}
                        switch={()=>{that.switchCell(i)}}
                        delete={()=>{that.deleteCell(i)}}
                        select={()=>{that.selectCell(i)}}
                        isSelected={i===that.state.selectedCell}/>
                    ))
                }
            </div>
        </div>
        )
    }
}