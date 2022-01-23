import React,{Component, useState} from 'react' 
import './sidebar.css'

export default class Sidebar extends Component {
    constructor({props,md_nodes}) {

        super(props);
        /*
            uuid: generate a uuid like "GEN_ID123456"
            emptyString(len)
        */
        function uuid(){
                function randomNum(len){
                    return parseInt(Math.random()*10**len)
                }
                let str="GEN_ID"+randomNum(16)
                return str
        }


            /*menu items init -> dir
        {
            type:
            name:
            id:
            display:
            children:[
                {},{}
            ]
        } 
        */
        let dir = {
            type:'directory',
            name:'blog',
            node:null,
            id:uuid()+'blog',
            display:true,
            children:[]
            }
        let nodes = md_nodes.map(node=>{
            if(node.frontmatter.title===null)node.frontmatter.title="no title"
            if(node.frontmatter.date ===null)node.frontmatter.date ="no date"
            if(node.frontmatter.description===null)node.frontmatter.description="no description";
            let path = node.fileAbsolutePath.split("/")
            node.path = path.slice(path.findIndex(i=>{return i=="blog"}))
            node.relativePath = node.path.join("/")
            let _dir = dir 
            // find path
            node.path.slice(1,-1).forEach((value,index,array)=>{
                let next_dir=null;
                _dir.children.forEach(i=>{
                    if(i.name===value){
                        next_dir=i
                    }
                })
                if(next_dir===null){
                    next_dir = {
                        type:'directory',
                        name:value,
                        node:null,
                        id:uuid()+value,
                        display:false,
                        children:[]
                    }
                    _dir.children.push(next_dir)
                }
                _dir = next_dir
            })
            // add the file
            if(node.path[node.path.length-1]==='README.md'){
                _dir.node=node 
                _dir.id = node.uuid
            }else{
                _dir.children.push({
                    type:'file',
                    name:node.frontmatter.title,
                    id:node.uuid,
                    display:false,
                    node:node
                })
            }
            return node;
        })


        dir.children = dir.children.map(i=>{
            i.display=true;
            return i
        })
        // transform menu items into elements
        function mapId2Dir(dir){
            let id2dir={};
            id2dir[dir.id]=dir
            let queue=dir.children;
            while(queue.length>0){
                let new_queue=[]
                for(let i of queue){
                    if(i.type==='directory'){
                        new_queue=new_queue.concat(i.children)
                    }
                    id2dir[i.id]=i
                }
                queue=new_queue
            }
            return id2dir
        }
        this.state={
            dir:dir,
            id2dir : mapId2Dir(dir)
        }       
    }
    render(){
        function emptyString(len){
            let x = "";
            for(let i=0;i<len;++i){
                x=x+"\xa0";
            }
            return x;
        }
        let that = this
        /* click handler for dir and file
        */
        function dirClickHandler(id,e){
            e.stopPropagation()
            // console.log(id)
            let dir = that.state.id2dir[id]
            let item = document.querySelector('#'+id).children[0]
            let tmp = item.children[1].className.split(' ')
            if(tmp[1]==="menu-dir-img-state0")tmp[1]="menu-dir-img-state1"
            else tmp[1]="menu-dir-img-state0"
            item.children[1].className=tmp.join(" ")
            dir.children.forEach(i=>{
                i.display=!i.display;
                item = document.querySelector('#'+i.id)
                item.style.display=i.display?"block":"none"
            })
        }
        function fileClickHandler(id,e){
            e.stopPropagation()
            window.location.hash=`#${id}-item`
        }

        function changeState(item,state){
            let classes = item.className.split(' ')
            if(classes.includes(state)){
                classes.splice(classes.indexOf(state),1)
            }else{
                classes.push(state)
            }
            item.className=classes.join(' ')
        }

        function sidebarButtonHandler(e){
            let item = document.querySelector('#sidebar-menu')
            changeState(item,"sidebar-menu-hidden")
            item = document.querySelector('#sidebar-button-img')
            changeState(item,"sidebar-button-img-hidden")
            item = document.querySelector('#sidebar-button')
            changeState(item,"sidebar-button-hidden")
            item = document.querySelector('#sidebar-container')
            changeState(item,"sidebar-container-hidden")
        }
        /* dir -> element and bound click event
        */
        function dfs(d,depth){
            if(d.type=='directory'){
                return (<div id={d.id} key={d.id} className='menu-dir' style={{
                            display:d.display?"block":"none"
                        }} 
                        onClick={(e)=>dirClickHandler(d.id,e)}
                        >
                    <span>
                        <p>{emptyString(depth*2)}</p>
                        <div className={`menu-dir-img menu-dir-img-state0`}/>
                        <div className='menu-file-img menu-file-img-state0' style={{
                            display:(d.node===null)?"none":"block"
                        }}/>
                        <p>{d.name}</p>
                        
                    </span>
                    {
                        d.children.map(i=>{
                            return dfs(i,depth+1)
                        })
                    }
                </div>)
            }else if(d.type=='file'){
                return (<div id={d.id} key={d.id} className='menu-file' style={{ 
                    display:d.display?'block':'none'
                    }}
                    onClick={(e)=>fileClickHandler(d.id,e)}
                    >
                    <span>
                        <p>{emptyString(depth*2)}</p>
                        <div className='menu-file-img menu-file-img-state0'/>
                        <p>{d.name}</p>
                    </span>
                </div>)
            }else{
                console.log("ERRRO unrecognize type")
            }
        }


        return (
            <div id='sidebar-container' className='sidebar-container'>
                <div className='sidebar-content'>
                    <div id='sidebar-menu' className='sidebar-menu'>
                    {
                    this.state.dir.children.map(x=>{return dfs(x,0)})
                    }
                    </div>
                    <div
                        id='sidebar-button' 
                        className='sidebar-button'
                        onClick={sidebarButtonHandler}
                    >
                        <div id='sidebar-button-img' className='sidebar-button-img'/>
                    </div>
                </div>
            </div>
        )
    }
}
