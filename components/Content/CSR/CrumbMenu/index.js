
import React from 'react'
import { useTranslations } from 'next-intl'
import {getID2Node,getID2Parent } from '../utils'
import styles from './styles.module.css'
export default function CrumbMenu({tree,focusID,setFocusID}) {


  const t = useTranslations('content')
  const id2parent = getID2Parent(tree)
  const id2node = getID2Node(tree)
  function getIDupstream(id){
    let ptr = id2node.get(id)
    let ret = []
    while(ptr !== null){
      ret.push(ptr)
      ptr = id2parent.get(ptr.id)
    }
    ret.reverse()
    return ret
  }

  
  return (
    <div className={styles['crumb-menu']}>
      <div className={styles['current-path']}>
        {
          getIDupstream(focusID).map((node,i)=>(
          <div className={styles['current-path-node']}
            onClick={()=>{setFocusID(node.id)}}
            key={i}
          >
            {node.isLeaf?node.title:t(node.name)}
          </div>))
        }
      </div>
      <div className={styles['next-path']}>
        {
          id2node.get(focusID).isLeaf
          ?null
          :id2node.get(focusID).children.map((node,i)=>(
            <div className={styles['next-path-node']} 
              onClick={()=>{setFocusID(node.id)}}
              key={i}
            >
              {node.isLeaf?node.title:t(node.name)}
            </div>
          ))
        }
      </div>
    </div>
  )
}
