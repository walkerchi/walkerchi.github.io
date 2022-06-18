
import React from 'react'
import styles from './styles.module.css'
import { useTranslations } from 'next-intl'
import {data as config} from './data'



function clickHandler(e,data,state,setState){
    let isOpen = state.id2isOpen.get(data.id)
    if(isOpen){
        let {treeData,id2isOpen} = state
        dfs(data,d=>{
            id2isOpen.set(d.id,false)
        })
        setState({treeData,id2isOpen})
    }else{
        let {treeData,id2isOpen} = state
        for(let key of id2isOpen.keys()){
            id2isOpen.set(key,false)
        }
        upstream(data,d=>{
            id2isOpen.set(d.id,true)
        })
        setState({treeData,id2isOpen})
    }
}

function renderNode(props){
    
    let {data,state,setState,onClick,t} = props
    function closeStyle(){
        if(!data.parent){
            return ''
        }else if(state.id2isOpen.get(data.parent.id)){
            return ''
        }else{
            return styles['menu-content-close']
        }
    }
    if(data.isLeaf){
        return (
        <li className={`${styles['menu-item']}`} key={data.id}>
            <div 
            className={`${styles['menu-content']} ${closeStyle()}`}
            style={{color:config.palette[data.type]}}
            onClick={e=>onClick(data)}
            >
                <div style={{backgroundImage:`url(${config.icon[data.type]})`}} className={styles.icon}/>
                <div className={styles.text}>{data.file.frontmatter.title}</div>
            </div>
        </li>
        )
    }else{
        return (
        <li className={`${styles['menu-item']}`} key={data.id}>
            <div
            className={`${styles['menu-content']} ${closeStyle()}`}
            style={{color:config.palette[data.type]}}
            onClick={e=>{
                clickHandler(e,data,state,setState)
                onClick(data)
            }}
            >
            <div style={{backgroundImage:`url(${config.icon[data.type]})`}} className={styles.icon}/>    
            {t(data.fullName)}
            </div>
            <ul className={`${styles['menu-list']}`}>
                {
                    data.children.map(child=>{
                        return  renderNode({data:child,state,setState,onClick,t})
                    })
                }
            </ul>
        </li>
        )
    }
}

function renderTree(state,setState,onClick,t){
    if(Array.isArray(state.treeData)){
        return state.treeData.map(item=>renderNode({data:item,state,setState,onClick,t}))
    }else{
        return renderNode({data:state.treeData,state,setState,onClick,t})
    }
}

function upstream(data,callback){
    let ptr = data 
    while(ptr !== undefined){
        callback(ptr)
        ptr = ptr.parent
    }
}

function dfs(data,callback,parent){
    if(Array.isArray(data)){
        data.forEach(item=>dfs(item,callback,undefined))
    }else{
        callback(data,parent)
        data.children.forEach(child=>dfs(child,callback,data))
    }
}

export default function TreeMenu({treeData,onClick}) {
    const t = useTranslations('content')
    let id2isOpen = new Map()
    dfs(treeData,(d,p)=>{
        if(p===undefined){
            d.depth = 0
        }else{
            d.depth = p.depth + 1
        }
        d.parent = p
        id2isOpen.set(d.id,false)
    })
    // treeData.forEach(d=>{id2isOpen.set(d.id,true)})
    let [state,setState] = React.useState({treeData,id2isOpen})
    // let [isClose,setIsClose]  = React.useState(false)
  return (
    <ul className={
        styles['tree-menu']
        // `${styles['tree-menu']} ${isClose?styles['tree-menu-close']:''}`
        }>
        {
            renderTree(state,setState,onClick,t)
        }
    </ul>
  )
}
