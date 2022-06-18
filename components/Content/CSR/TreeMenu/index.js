import React from 'react'
import { useTranslations } from 'next-intl'
import styles from './styles.module.css'
import { applyNonLeaf,getID2Parent} from '../utils'


export default function TreeMenu({tree,focusID,setFocusID}) {
  const [isOpen,setIsOpen] = React.useState(false)
  const [itemOpen,setItemOpen] = React.useState(applyNonLeaf(tree,node=>false))
  let index2id = applyNonLeaf(tree,node=>node.id)
  let id2index = new Map(Array.from(index2id,(el,i)=>[el,i]))
  let id2node  = new Map(applyNonLeaf(tree,node=>[node.id,node]))
  let id2parent = getID2Parent(tree)
  const t = useTranslations('content')

  function setIDItemState(id,value){
    setItemOpen((items=>{
      let index = id2index.get(id)
      return items.map((s,i)=>{
      if(i === index)
        return value
      else  
        return s
      })
    }))
  }
  function getIDItemState(id){
    return itemOpen[id2index.get(id)]
  }
  function initItemState(){
    setItemOpen(applyNonLeaf(tree,node=>false))
  }
  function setIDUpstreamOpen(id){
    let node = id2node.get(id)
    while(node !== null && node !== undefined){
      setIDItemState(node.id,true)
      node = id2parent.get(node.id)
    }
  }

  function renderNode(node){
    return (
      <div className={styles['node-wrapper']} key={node.id}>
        <div className={styles['node-text']}
        onClick={()=>{
          setFocusID(node.id)
          if(!node.isLeaf){
            // focusID.current = node.id
            initItemState()
            setIDUpstreamOpen(node.id)
            if(getIDItemState(node.id)){
              setIDItemState(node.id,false)
            }
          }
        }}
        >{node.isLeaf?node.title:t(node.localePath)}</div>
        {
          node.isLeaf?null:(
            <div className={`${styles['node-children']} ${getIDItemState(node.id)?'':styles['node-children-close']}`}>
              {node.children.map(renderNode)}
            </div>
          )
        }
      </div>
    )
  }
  

  return (
    <div className={`${styles['tree-menu-wrapper']} ${isOpen?'':styles['tree-menu-wrapper-close']}`}>
      <div className={styles['tree-menu']}>
          {
            tree.children.map(renderNode)
          }
      </div>
      <div className={styles.icon} onClick={()=>{setIsOpen(!isOpen)}}/>
    </div>
  )
}
