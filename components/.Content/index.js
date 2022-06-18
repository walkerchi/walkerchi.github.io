import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './styles.module.css'
import * as d3 from 'd3'
import {data as config} from './data'
import TreeMenu from './TreeMenu'
import algoliasearch from 'algoliasearch'
import {md5} from 'md5js'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl';
import useScrollPosition from '@react-hook/window-scroll'

const APPLICATION_ID = '5C1Z9Q4AJW'
const SEARCHONLY_API_KEY  = '24f7dca973c7bd88d2a677fe2b13cc90'
const client = algoliasearch(
    APPLICATION_ID,
    SEARCHONLY_API_KEY    
);

var index = client.initIndex(config.algolia.index);
    

function hash(x){
    return 'uuid'+md5(x)
}

function prepareData(files){
    let data = {
        name:'content',
        isLeaf:false,
        type:'dir',
        id:hash('/content'),
        children:[]
    }
    files.forEach(file=>{
        let ptr = data
        file.pathlist.slice(1).forEach((path,i)=>{
            let isExist = false;
            ptr.children.forEach(child=>{
                if(child.name == path){
                    isExist = true;
                    ptr = child
                }
            })
            if(!isExist){
                let newNode = {
                    name:path,
                    fullName:file.pathlist.slice(1,i+2).join('.')+".name",
                    isLeaf:false,
                    type:'dir',
                    id:hash('/'+file.pathlist.slice(0,i+2).join('/')),
                    children:[]
                }
                ptr.children.push(newNode)
                ptr = newNode 
            }
            if(i===file.pathlist.length-2){
                ptr.isLeaf=true
                ptr.file = file
                ptr.id = file.id
                // file.id = ptr.id
                if(file.extname==='ipynb'){
                    ptr.type = 'ipy'
                }else if(file.extname==='md'){
                    ptr.type = 'md'
                }else{
                    console.log(`Unsupport extname ${file.extname}`)
                }
            }
        })
    })
    return  data
}

function dfs(data,callback){
    if(Array.isArray(data)){
        data.forEach(item=>dfs(item,callback))
    }else{
        callback(data)
        data.children.forEach(child=>dfs(child,callback))
    }
}
function dfsWithParent(parent,data,callback){
    callback(parent,data)
    data.children.forEach(child=>dfsWithParent(data,child,callback))
}

   
function drawTree({data,radial=true,t}){
    data = d3.hierarchy(data)
    // const H = document.body.clientHeight
    // const W = document.body.clientWidth
    let width = config.svg.W
    let height = config.svg.H
    let margin = config.svg.margin
    let svg = d3.select('#content')
        .append('svg')
        .attr('class',styles.svg)
        .attr('id','graph')
        .attr('width', width)
        .attr('height',height);
    let tree = d3.tree()
    if(radial){
        let diameter = height * 0.75;
        let radius = diameter / 2;
        tree = tree.size([2 * Math.PI, radius])
    }else{
        tree = tree.size([width-2*margin,height-2*margin])
    }
    tree = tree.separation((a,b)=>(a.parent == b.parent ? 1 : 2) / a.depth)
    
    let treeData = tree(data);
    
    let nodes = treeData.descendants();
    let links = treeData.links();

    let graphGroup = svg.append('g')
    if(radial)
        graphGroup = graphGroup.attr('transform', `translate(${width/2},${height/2})`);
    else 
        graphGroup = graphGroup.attr('transform', `translate(${margin},${margin})`);
    let link = graphGroup.selectAll(".link")
        .data(links)
        .join("path")
        .attr("class", styles['tree-link'])
    
    if(radial){
        link.attr("d", d3.linkRadial()
        .angle(d => d.x)
        .radius(d => d.y))
    }else{
        link.attr('d',d3.linkHorizontal()
        .x(d=>d.y)
        .y(d=>d.x))
    }
        
    let node = graphGroup
        .selectAll(".node")
        .data(nodes)
        .join("g")
        .attr("class", styles['tree-node'])
        
    if(radial){
        node.attr("transform", d=>`rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y}, 0)`)
    }else{
        node.attr("transform", d=>`translate(${d.y},${d.x})`)
    }
        
    let circ = node.append("circle")
            .attr('r',d=>config.svg.circle.r[d.data.type])
            .attr("class",d=>styles['tree-circ-'+d.data.type])
            .attr("id",d=>'circle'+d.data.id)
    let text = node.append("text")
        .attr('class',d=>styles['tree-text-'+d.data.type])
        .attr('id',d=>'text'+d.data.id)
        .text(d=>t(d.data.fullName))
    
    if(radial){
        text.attr("dx", d=> d.x < Math.PI ? 8 : -8)
        .attr("dy", ".31em")
        .attr("text-anchor",d=>d.x < Math.PI ? "start" : "end")
        .attr("transform", d=>d.x < Math.PI ? null : "rotate(180)")
    }else{
        text.attr("dx",d=>d.children?-13:13)
        .attr("dy",".35em")
        .attr("text-anchor",d=>config.svg.text.anchor[d.data.type])
        .attr("transform",d=>`translate(${config.svg.text.x[d.data.type]},${config.svg.text.y[d.data.type]})`)
    }

    return {
        node
    }
}


export default function Content({files,imageProps}) {
    const router = useRouter()
    const t = useTranslations('content')
    let data = prepareData(files)
    let id2type = new Map()
    let id2parent = new Map()
    let id2files = new Map()
    let id2name  = new Map()
    let id2node  = new Map()
    dfs(data,d=>{id2type.set(d.id,d.type);id2name.set(d.id,d.name);id2node.set(d.id,d)})
    dfsWithParent(undefined,data,(p,d)=>{
        id2parent.set(d.id,p?.id)
    })
    files.forEach(f=>{id2files.set(f.id,f)})
    let [clickHandler,setClickHandler] = React.useState(e=>{console.log(e)})
    //let selected = data.id
    let selected = React.useRef()
    selected.current =  data.id
    let [visibleFiles,setVisibleFiles] = React.useState(files)
    let [menuOpen,setMenuOpen] = React.useState(true)
    // let [hasScroll,setHasScroll] = React.useState(false)
    let [selectedId,setSelectedId] = React.useState(data.id)
    let scrollY = useScrollPosition(16)

    React.useEffect(()=>{
        let isHandy = window.innerWidth <= 768
        /* set SVG */
        let graph = drawTree({data,radial:false,t})
        let id2xy = new Map()
        graph.node._groups[0].forEach(n=>{
             id2xy.set(n.__data__.data.id,{y:n.__data__.x,x:n.__data__.y})
        })
        function focusOn(id){
            let $el = document.querySelector('#circle'+selected.current)
            let $elType = id2type.get(selected.current)
            $el.setAttribute('r',config.svg.circle.r[$elType])
            $el = document.querySelector('#text'+selected.current)
            $el.setAttribute('transform',`translate(${config.svg.text.x[$elType]},${config.svg.text.y[$elType]})`)
            $el.setAttribute('text-anchor',config.svg.text.anchor[$elType])
            let $ele = document.querySelector('#circle'+id)
            $ele.setAttribute('r',config.svg.circle.r.__selected__)
            $ele = document.querySelector('#text'+id)
            $ele.setAttribute('transform',`translate(${config.svg.text.x.__selected__},${config.svg.text.y.__selected__}) scale(${config.svg.text.scale.__selected__})`)
            $ele.setAttribute('text-anchor',config.svg.text.anchor.__selected__)
            selected.current = id
            setSelectedId(id)
            const H = document.body.clientHeight
            const W = document.body.clientWidth
            const {x,y} = id2xy.get(id)
            const dy= H/2-y
            const dx= W/2-x 
            let $svg = document.querySelector('#graph')
            $svg.setAttribute('style',`transform:translate(${dx-config.svg.margin}px,${dy-config.svg.margin}px) scale(1);`) 
            $ele = document.querySelector('#background')
            
            $ele.setAttribute('style',`transform:translate(${dx/20}px,${dy/20}px) scale(${isHandy?2:1.6});`)
        }
        function updateVisibleFiles(data){
            let newFiles = []
            dfs(data,d=>{
                if(d.isLeaf){
                    newFiles.push(d.file)
                }
            })
            setVisibleFiles(newFiles)
        }
        focusOn(data.id)
        setClickHandler(()=>(e=>{
            focusOn(e.id)
            updateVisibleFiles(e)
        }))
        

        // /* set scroll bar */
        // function handleScroll(e){
        //     let scrollTop  = document.documentElement.scrollTop      
        //     if(scrollTop > 50){
        //         setHasScroll(true)
        //     }else{
        //         setHasScroll(false)
        //     }
        // }
        // window.addEventListener('scroll', handleScroll);
    },[])


    function handleInput(e){
        let value = e.target.value
        index.search(value,
        {
        attributesToRetrieve: ['name', 'description'],
        hitsPerPage: 10,
        }).then((content) => {
            let hits = content.hits
            .filter(hit=>{
                let ptr = hit.objectID
                while(ptr!==undefined){
                    if(ptr===selected.current)
                        return true 
                    else
                        ptr = id2parent.get(ptr)
                }
                return false
            })      
            .map(hit=>{
                let file = id2files.get(hit.objectID)
                file._highlightResult = hit._highlightResult
                return file
            })   
            setVisibleFiles(hits)       
            console.log(hits)
        })
    }

  return (
    <div id="content" className={styles.content}>
        <div className={styles.wrapper}>
            <div className={`${styles['xs-head']} ${scrollY>50?styles['xs-head-scroll']:''}`}>
                <div className={styles['crumb-menu']}>
                    <div className={styles['crumb-path']}>
                    {
                        function renderCrumbCurrent(){
                            let path = []
                            let ids  = []
                            let ptr  = selectedId
                            while(ptr!==undefined){
                                path.push(id2name.get(ptr))
                                ids.push(ptr)
                                ptr=id2parent.get(ptr)
                            }
                            path = path.reverse()
                            ids  = ids.reverse()
                            path = path.slice(1)
                            ids  = ids.slice(1)
                            return path.map((p,i)=>(
                            <span key={i}>
                                <p>/</p>
                                <p onClick={e=>clickHandler(id2node.get(ids[i]))}>{p}</p>
                            </span>
                            ))
                        }()
                    }
                    </div>
                    <ul className={styles['crumb-list']}>
                    {
                        function renderCrumbList(){
                            return id2node.get(selectedId).children.map((child,i)=>
                                (<li
                                    key = {i}
                                    onClick={e=>clickHandler(id2node.get(child.id))}
                                >
                                    {child.name}
                                </li>))
                        }()
                    }
                    </ul>
                </div>
                <div className={styles.searchbar}>
                    <input onChange={handleInput}></input>
                    <div style={{backgroundImage:`url(${config.search.icon}`}}></div>
                </div>
            </div>
            <div className={styles.body}>
                <div className={`
                    ${styles['body-menu']} 
                    ${menuOpen?styles['body-menu-open']:styles['body-menu-close']} 
                    ${scrollY>50?styles['body-menu-scroll']:''}`}>
                    <TreeMenu 
                    treeData={data.children}
                    onClick={clickHandler}
                    />
                    <div
                    style={{backgroundImage:`url(${config.menu.arrow})`}} 
                    className={`${styles.arrow} ${menuOpen?styles['arrow-open']:styles['arrow-close']}`}
                    onClick={e=>{setMenuOpen(!menuOpen)}}
                    />
                </div>
                
                <div className={styles.items}>
                    {
                        
                        visibleFiles.map((file,i)=>(
                            <Link key={i} 
                                id={"item"+file.id}
                                href = {file.urlpath}
                                >
                                <a className={styles.item}>
                                    {/* {
                                        file.imageProps
                                        ?<Image className={styles['file-image']} {...file.imageProps} placeholder='blur' alt=''/>
                                        :<div className={styles['file-image']} style={{backgroundImage:`url(${config.items.image.url})`}}/>
                                    } */}
                                    <Image className={styles['file-image']} {...file.imageProps} placeholder='blur' alt=''/>
                                    <div className={styles['file-abstract']}>
                                        {
                                            file._highlightResult?.name!==undefined
                                            ?<div 
                                            className = {`${styles['file-name']} 
                                            ${file._highlightResult.name.matchLevel==='full'
                                            ?styles['file-name-full-match']
                                            :file._highlightResult.name.matchLevel==='none'
                                            ?styles['file-name-none-match']
                                            :styles['file-name-else-match']}`}
                                            dangerouslySetInnerHTML={{__html:file._highlightResult.name.value}}/>
                                            :<div className={styles['file-name']}>{file.frontmatter.title}</div>
                                        }
                                        {
                                            file._highlightResult?.description!==undefined
                                            ?<div                   
                                            className = {`${styles['file-descript']} 
                                            ${file._highlightResult.description.matchLevel==='full'
                                            ?styles['file-descript-full-match']
                                            :file._highlightResult.description.matchLevel==='none'
                                            ?styles['file-descript-none-match']
                                            :styles['file-descript-else-match']}`}
                                            dangerouslySetInnerHTML={{__html:file._highlightResult.description.value}}/>
                                            :<div className={styles['file-descript']}>{file.frontmatter.description}</div>
                                        }
                                        {
                                            <div className={styles['file-date']}>{file.frontmatter.date||"--"}</div>
                                        }
                                    </div>
                                    {/* {file.filename}-{file.fileType} */}
                                </a>
                            </Link>
                        ))
                    }
                </div>       
            </div>
        </div>
        <div className={styles.background} id='background'>
            <Image {...imageProps} layout='fill' placeholder='blur' alt="" objectFit='contain' />
        </div>
    </div>
  )
}



