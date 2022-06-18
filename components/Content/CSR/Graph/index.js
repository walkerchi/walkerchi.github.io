import React from 'react'
import Image from 'next/image'
import { useMediaQuery,useWindowSize } from '@react-hookz/web'
import * as d3 from 'd3'
import { useTranslations } from 'next-intl'
import config from './config'
import styles from './styles.module.css'
import {getLeaf,applyAll,getID2Node} from '../utils'
function renderGraph(data,t){
    const {W:width,H:height,margin} = config

    let id2type = new Map(applyAll(data,node=>{
        let type
        if(node.isLeaf){
            type = node.name.endsWith('.md')
            ?'md'
            :node.name.endsWith('.ipynb')
            ?'ipy'
            :'unknown'
        }else{
            type = 'dir'
        }
        return [node.id,type]
    }))
    

    data = d3.hierarchy(data)
    let svg = d3.select('#container')
        .append('svg')
        .attr('class',styles.svg)
        .attr('id','graph')
        .attr('width', width)
        .attr('height',height);
    let tree = d3.tree()
                .size([width-2*margin,height-2*margin])
                .separation((a,b)=>(a.parent == b.parent ? 1 : 2) / a.depth)
    
    let treeData = tree(data);
    
    let nodes = treeData.descendants();
    let links = treeData.links();

    let graphGroup = svg.append('g')
                    .attr('transform', `translate(${margin},${margin})`);
    let link = graphGroup.selectAll(".link")
        .data(links)
        .join("path")
        .attr("class", styles['tree-link'])
        .attr('d',d3.linkHorizontal()
        .x(d=>d.y)
        .y(d=>d.x))
    
    let node = graphGroup
        .selectAll(".node")
        .data(nodes)
        .join("g")
        .attr("class", styles['tree-node'])
        .attr("transform", d=>`translate(${d.y},${d.x})`)
    
        
    let circ = node.append("circle")
            .attr('r',d=>config.circle.r[id2type.get(d.data.id)])
            .attr("class",d=>styles['tree-circ-'+id2type.get(d.data.id)])
            .attr("id",d=>'circle'+d.data.id)
    let text = node.append("text")
        .attr('class',d=>styles['tree-text-'+id2type.get(d.data.id)])
        .attr('id',d=>'text'+d.data.id)
        .text(d=>{
            if(d.data.isLeaf)
                return d.data.title
            else
                return t(d.data.localePath)})
        .attr("dx",d=>d.children?-13:13)
        .attr("dy",".35em")
        .attr("text-anchor",d=>config.text.anchor[id2type.get(d.data.id)])
        .attr("transform",d=>`translate(${config.text.x[id2type.get(d.data.id)]},${config.text.y[id2type.get(d.data.id)]})`)
    
    return {
        node
    }
}



export default function Graph({tree,imageProps,focusID,setVisibleLeaf}){
    const isSmallDevice = useMediaQuery('only screen and (max-width : 768px)');
    const windowSize = useWindowSize()
    const t = useTranslations('content')
    let [init,setInit] = React.useState(false)
    let lastFocusID = React.useRef( focusID)

    let id2type = new Map(applyAll(tree,node=>{
        let type
        if(node.isLeaf){
            type = node.name.endsWith('.md')
            ?'md'
            :node.name.endsWith('.ipynb')
            ?'ipy'
            :'unknown'
        }else{
            type = 'dir'
        }
        return [node.id,type]
    }))
    let id2xy = React.useRef(null)
    let id2node = getID2Node(tree)


    React.useEffect(()=>{
        if(!init){
            let graph = renderGraph(tree,t)
            id2xy.current = new Map(graph.node._groups[0].map(n=>{
                return [n.__data__.data.id,
                    {
                        y:n.__data__.x,
                        x:n.__data__.y
                    }
                ]
            }))
            setInit(true)
        }

        let $el
        /* last one */
        $el = document.querySelector('#circle'+lastFocusID.current)
        let $elType = id2type.get(lastFocusID.current)
        $el.setAttribute('r',config.circle.r[$elType])
        $el = document.querySelector('#text'+lastFocusID.current)
        $el.setAttribute('transform',`translate(${config.text.x[$elType]},${config.text.y[$elType]})`)
        $el.setAttribute('text-anchor',config.text.anchor[$elType])
        /* this one */
        $el = document.querySelector('#circle'+focusID)
        $el.setAttribute('r',config.circle.r.__selected__)
        $el = document.querySelector('#text'+focusID)
        $el.setAttribute('transform',`translate(${config.text.x.__selected__},${config.text.y.__selected__}) scale(${config.text.scale.__selected__})`)
        $el.setAttribute('text-anchor',config.text.anchor.__selected__)
        /* update */
        lastFocusID.current = focusID
        /* graph and background translate */
        const {x,y} = id2xy.current.get(focusID)
        const dy= windowSize.height/2-y
        const dx= windowSize.width/2-x 
        $el = document.querySelector('#graph')
        $el.setAttribute('style',`transform:translate(${dx-config.margin}px,${dy-config.margin}px) scale(1);`) 
        $el = document.querySelector('#background')
        $el.setAttribute('style',`transform:translate(${dx/20}px,${dy/20}px) scale(${isSmallDevice?2:1.6});`)
    
        setVisibleLeaf(getLeaf(id2node.get(focusID)))

    },[init,focusID])
    return (
    <div id='container' className={styles.container}>
        <div id='background' className={styles.background}>
            <Image {...imageProps} placeholder='blur' alt='' layout='fill' objectFit='cover'/>
        </div>
    </div>)
}