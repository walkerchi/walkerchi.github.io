import React from 'react'
import { useTranslations} from 'next-intl'
import ReactLoading from "react-loading"
import data from './data'
import Cells from './Cells'
import withIntl from './withIntl'
import styles from './styles.module.css'
class WPython extends React.Component{
    constructor(props){
        super(props)
        this.t = this.props.t
        this.state = {
            messages:["Loading From CDN"],
            isLoading:true
        }

        this.cells = React.createRef(null)
        this.pyodide = null
        this.console = []
        this.restart = this.restart.bind(this)
        this.onLoad  = this.onLoad.bind(this)
        this.appendMesssage = this.appendMesssage.bind(this)
        this.runPython = this.runPython.bind(this)
        this.getLoadingMessage = this.getLoadingMessage.bind(this)
    }
    componentDidMount (){
        
    }
    getLoadingMessage(){
        return this.state.messages[this.state.messages.length-1]
    }
    appendMesssage(message){
        this.setState(({messages:messagesOrigin})=>{
        let messages = [...messagesOrigin]
        messages.push(message)
        return {messages}})
    }
    restart(){
        console.log(globalThis)
        this.setState({isLoading:true})
        globalThis.loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/dev/full/',
            stdout:(msg)=>{this.console.push(msg)}
        }).then(e=>{
            this.appendMesssage(this.t('loading.loading-packages'))
            let promises = data.packages.map(async (pkg)=>{
                return await e.loadPackage(pkg.name)
            })
            
            Promise.all(promises).then(()=>{
                this.appendMesssage(this.t('loading.finish'))
                this.pyodide = e
                this.setState({isLoading:false})
                this.runPython(data.__init__)
                this.cells.current.appendPython()
            })
        })
    }
    onLoad(){
        this.appendMesssage(this.t("loading.init-pyodide"))
        this.setState({isLoading:true})
        this.restart()
    }
    runPython(code){
        try{
            this.console = []
            let output = this.pyodide.runPython(code)
            output = output || this.console.join('<br/>')
            // console.log(output)
            return  output
        }catch(e){
            console.log(e)
            return String(e)
        }
    }
    render(){
        return (
        <div className={styles.wpython}>
            {
                this.state.isLoading?
                <div className={styles.loading}>
                    <ReactLoading type={"cubes"} color="#fff" />
                    {/* <SwitchTransition mode="in-out">
                        <CSSTransition classNames={styles['loading-message']}
                            timeout={500}
                            key={this.getLoadingMessage()}>
                            <div className={styles.message}>
                                {this.getLoadingMessage()}
                            </div>
                        </CSSTransition>
                    </SwitchTransition> */}
                    <div className={styles.message}>
                        {this.getLoadingMessage()}
                    </div>
                </div>:null
            }
            <Cells 
            ref={this.cells}
            restart   ={this.restart}
            runPython={this.runPython}
            />            
        </div>
        )
    }
}


export default withIntl(WPython,'function.wpython')