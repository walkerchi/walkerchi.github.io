function bfs(node,callback){
    let queue = [node]
    while(queue.length>0){
        let newQueue = []
        queue.forEach(item=>{
            callback(item)
            if(!item.isLeaf){
                newQueue = newQueue.concat(item.children)
            }
        })
        queue = newQueue
    }
}
function bfsWithParent(node,callback){
    let queue = [node]
    callback(null,node)
    while(queue.length >  0){
        let newQueue = []
        queue.forEach(item=>{
            if(!item.isLeaf){
                item.children.forEach(n=>{callback(item,n)})
                newQueue = newQueue.concat(item.children)
            }
        })
        queue = newQueue
    }
}

export function applyLeaf(tree,callback){
    let ret = []
    bfs(tree,(node)=>{
        if(node.isLeaf){
            ret.push(callback(node))
        }
    })
    return ret
}
export function applyNonLeaf(tree,callback){
    let ret = []
    bfs(tree,node=>{
        if(!node.isLeaf){
            ret.push(callback(node))
        }
    })
    return ret
}
export function applyAll(tree,callback){
    let ret = []
    bfs(tree,(node)=>{
        ret.push(callback(node))
    })
    return ret
}
export function getLeaf(tree){
    let ret = []
    bfs(tree,(node)=>{
        if(node.isLeaf){
            ret.push(node)
        }
    })
    return ret
}
export function getID2Parent(tree){
    let parents = []
    let ids     = []
    bfsWithParent(tree,(parent,node)=>{
        parents.push(parent)
        ids.push(node.id)
    })
    return new Map(parents.map((parent,i)=>[ids[i],parent]))
}
export function getID2Node(tree){
    return new Map(applyAll(tree,node=>[node.id,node]))
}
export function isParent(parentNode,childNode){
    while(childNode !== null){
        if(childNode.id === parentNode.id){
            return  true
        }else{
            childNode = childNode.parent
        }
    }
    return false
}

