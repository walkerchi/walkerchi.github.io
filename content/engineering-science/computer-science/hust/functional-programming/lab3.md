---
title: "[华科]函数式编程实验3"
description: "华中科技大学 函数式编程实验3题目与答案"
date: 2021-05-02
image: https://s2.loli.net/2022/06/18/BryAis3WRkCItMg.jpg
---



# Lab3

## Q1

编写函数listToTree: int list -> tree，将一个表转换成一棵平衡树

提示：可调用split函数，split函数定义如下：
如果L非空，则存在L1, x, L2，满足：
	split L = (L1, x, L2) 	且 
	L = L1 @ x :: L2 		且 
	length(L1)和length(L2)差值小于1。

```
datatype tree = Empty | Node of tree*int*tree;

fun split (x:int list):(int list*int*int list) = 
	let 
		val ind = (List.length(x) div 2)
		val y::R = List.drop(x,ind)
		val L    = List.take(x,ind)
	in
		(L,y,R)
	end;
	
fun listToTree ([]:int list):tree = Empty
  | listToTree ([x]:int list):tree = Node(Empty,x,Empty)
  | listToTree (X:int list):tree = 
  		let 
  			val (L,x,R) = split(X)
  		in 
  			Node(listToTree(L),x,listToTree(R))
  		end;

  			
```





## Q2

编写函数revT: tree -> tree，对树进行反转，使trav(revT t) = reverse(trav t)。（trav为树的中序遍历函数）。假设输入参数为一棵平衡二叉树，验证程序的正确性，并分析该函数的执行性能（work和span）

$Span_{revT} = O(d)$

$Work_{revT} = O(n)$

``` 
datatype tree = Empty | Node of tree*int*tree;

fun trav (Empty:tree):int list = []
  | trav (Node(l,x,r):tree):int list = 
  		let 
  			val L = trav l
			val R = trav r
		in 
			L@[x]@R
		end;
		

fun revT (Empty:tree):tree = Empty
  | revT (Node(l,x,r):tree):tree = Node(revT r, x, revT l);
  


fun reverse (x:int list):int list = List.rev(x);
```







## Q3

编写函数binarySearch: tree * int -> bool。当输出参数1为有序树时，如果树中包含值为参数2的节点，则返回true；否则返回false。要求：程序中请使用函数Int.compare（系统提供），不要使用<, =, >。
datatype order = GREATER | EQUAL | LESS
case Int.compare(x1, x2) of
	GREATER => (* x1 > x2 *)
        | EQUAL => (* x1 = x2 *)
        | LESS => (* x1 < x2 *)

```
datatype tree = Empty | Node of tree*int*tree;
datatype order = GREATER | EQUAL | LESS

fun binarySearch (Empty:tree,y:int):bool = false
  | binarySearch (Node(Empty,x,Empty):tree,y:int):bool = (x=y)
  | binarySearch (Node(l,x,r):tree,y:int):bool = 
  		case Int.compare(x,y) of
  			GREATER => binarySearch(l,y)
  			| EQUAL => true
  			| LESS  => binarySearch(r,y);
```





## Q4

一棵minheap树定义为：

1. t is Empty;
2. t is a Node(L, x, R), where R, L are minheaps and values(L), value(R) >= x	(value(T)函数用于获取树T的根节点的值）

编写函数treecompare, SwapDown 和heapify：

```
treecompare: tree * tree -> order (* when given two trees, returns a value of type order, based on which tree has a larger value at the root node *) 

SwapDown: tree -> tree (* REQUIRES the subtrees of t are both minheaps * ENSURES swapDown(t) = if t is Empty or all of t’s immediate children are empty then * just return t, otherwise returns a minheap which contains exactly the elements in t. *) 

heapify : tree -> tree (* given an arbitrary tree t, evaluates to a minheap with exactly the elements of t.  *)
```

分析SwapDown 和heapify两个函数的work和span

$Span_{SwapDown}=O(d)$

$Work_{SwapDown}=O(d)$

$Span_{heapify}=O(d^2)$

$Work_{heapify}=O(nlogn)$

````
datatype tree = Empty | Node of tree*int*tree;
datatype order = GREATER | EQUAL | LESS

fun treecompare (Empty, Empty) = EQUAL
  | treecompare (X, Empty) = GREATER
  | treecompare (Empty, Y) = LESS
  | treecompare (Node(l1,x1,r1),Node(l2,x2,r2)) = Int.compare(x1,x2);
  			
fun SwapDown (Empty:tree):tree = Empty
  | SwapDown (Node(Empty,x,Empty):tree):tree = Node(Empty, x, Empty)
  | SwapDown (Node(Empty,x,r):tree):tree = 
        let  
            val Node(rl, rx, rr) = SwapDown r 
        in 
            case Int.compare(rx, x) of
                LESS => Node(Empty, rx, Node(rl, x, rr))
                | _  => Node(Empty, x,  Node(rl, rx,rr))
        end
  | SwapDown (Node(l,x,Empty):tree):tree = 
        let 
            val Node(ll,lx,lr) = SwapDown l 
        in
            case Int.compare(lx, x) of
                LESS => Node(Node(ll,x,lr), lx, Empty)
                | _  => Node(Node(ll,lx,lr),x , Empty)
        end
  | SwapDown (Node(l,x,r):tree):tree = 
  		let 
  			val Node(ll, lx, lr) = SwapDown l
  			val Node(rl, rx, rr) = SwapDown r
  		in
  			case Int.compare(lx, rx) of
  				GREATER => (case Int.compare(rx, x) of
                			LESS => Node(Node(ll,lx,lr),rx,Node(rl,x,rr))
                        	| _ => Node(Node(ll,lx,lr),x,Node(rl,rx,rr))
                            )
                | LESS  => (case Int.compare(lx, x) of
                 			LESS => Node(Node(ll,x,lr),lx,Node(rl,rx,rr))
                 			| _  => Node(Node(ll,lx,lr),x,Node(rl,rx,rr))
                            )
                | EQUAL => Node(Node(ll,lx,lr),x,Node(rl,rx,rr)) 
         end;    
         
 fun balance (T:tree):tree = listToTree(trav T);
         
 fun heapify_helper(Empty:tree):tree = Empty
   | heapify_helper(T:tree):tree = 
   		let 
            val Node(sd_l, sd_x, sd_r) = SwapDown T
   		in
   			Node( SwapDown sd_l, sd_x, SwapDown sd_r )
   		end
         
 fun heapify (T:tree):tree = heapify_helper(balance T);
````

