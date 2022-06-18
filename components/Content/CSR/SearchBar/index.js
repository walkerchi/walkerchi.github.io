import React from 'react'
import algoliasearch from 'algoliasearch'
import {APPLICATION_ID,SEARCHONLY_API_KEY,INDEX,SEARCH_CONFIG} from './config'
import styles from './styles.module.css'
import { getID2Parent,getID2Node} from '../utils'
const client = algoliasearch(APPLICATION_ID,SEARCHONLY_API_KEY)
const index  = client.initIndex(INDEX)

export default function SearchBar({tree,focusID,setVisibleLeaf}) {
  let id2parent = getID2Parent(tree)
  let id2node = getID2Node(tree)

  function isIDParentUpstream(parentID,childID){
    let node = id2node.get(childID)
    while(node!==null && node !== undefined){
      if(parentID === node.id)
        return true
      node = id2parent.get(node.id)
    }
    return false
  }


  function handleInput(e){
    let value = e.target.value 
    index.search(value,SEARCH_CONFIG)
      .then(content=>{
        let hits = content.hits
          .filter(hit=>{
            return isIDParentUpstream(focusID,hit.objectID)
          })
          .map(hit=>{
            let node = id2node.get(hit.objectID)
            node._highlightResult = hit._highlightResult
            return node
          })
        setVisibleLeaf(hits)
      })
  }
  
  return (
    <div className={styles.searchbar}>
      <input onChange={handleInput}/>
    </div>
  )
}
