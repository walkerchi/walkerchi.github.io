---
title: "[HUST]函数式编程"
description: 华中科技大学计算机学院函数式编程笔记
date: 2021-04-07
bg: ./.images/crossroad.png
---



# 一、函数式语言家族成员调研

完成函数式语言家族成员调研报告，内容可包括但不限于：庞大的函数式语言家族中有哪些成员？都由谁提出来的？各自有什么特征？没落和兴盛的原因？

![](https://s2.loli.net/2022/01/23/Kb2Cunl8Fj4Mkyc.png)

# 二、上机实验心得体会

## 1.

在熟悉安装SML/NJ开发环境的基础上，完成实验内容。在完成实验中选取2-3个感受最深的实验，谈谈在函数式编程学习和实践中的心得和体会。



### 1. Lab2.PrefixSum

**题目**

给定一个数组A[1..n]，前缀和数组PrefixSum[1..n]定义为： PrefixSum[i] = A[0]+A[1]+...+A[i-1]； 例如：PrefixSum [ ] = [ ] PrefixSum [5,4,2] = [5, 9, 11] PrefixSum [5,6,7,8] = [5,11,18,26]

试编写： 函数PrefixSum: int list -> int list， 要求：WPrefixSum(n) = O(n2)。(n为输入int list的长度) (2) 函数fastPrefixSum: int list -> int list， 要求： WfastPrefixSum(n) =O(n). （提示：可借助帮助函数PrefixSumHelp）

**解题思路**

++这样的语言中可以直接用循环来进行操作非常方便，但是SML不支持循环只能用递归来进行操作带来了非常大的挑战。这也让我重新开始思考递归的本质。

递归实际上就是一种树状调用，对于一个只调用自己的递归函数而言。它形成的调用链构成了一个高度为H的K叉树。K为调用自己的次数，H为递归深度，例如：

```ML
fun f ([]) = 0
  |  f(x::L) = x+f(L);
```

就是递归深度为H=n，因为它需要调用自己n次才能遍历完整个数组，如果是二分查找的话，因为每次都是对自己折半长度进行查找，所以递归深度为H=log（n）。

当K=1时，K叉树退化为列表。此时复杂度为O(H)。如果没有退化，则递归复杂度为O(K^H)。

因此对于仅仅递归自己的函数，只能到达的复杂度为O(K^H)或者O(H)。对于无法被分解为这种复杂度的要求，只能通过多个函数相互递归来进行实现，因为太过复杂，情况太多，这里就不进行分析了。

回到题目，题目要求两种复杂度形式，分别是O(n)和O(n\^2)，对于第一种情况好说，直接拆解为一个自己递归自己且K=1，H=n的函数就可以达到这样的复杂度。而对于第二个函数无法通过单个自己递归自己的函数来实现，只能通过两个函数嵌套调用。首先将O(n^2)拆解为O(n*O(n))，即可发现在K=1，H=n的函数中嵌套一个K=1，H=n的函数就可以达到要求。问题也就迎刃而解了。

其实第一次看这个题目没有什么头绪，但是仔细分析了函数式编程的特点后，会发现函数式编程的递归调用的复杂度是有特点的，可以通过复杂度的特点来设计符合要求的函数。

**最终代码：**

```
fun helper1 ([]:int list):int = 0
| helper1((x::X):int list):int= x+(helper1(X));

fun helper2 (prefix:int list, []):int list = []
| helper2 (prefix:int list, (x::tail):int list):int list= helper1(prefix@[x])::helper2(prefix@[x], tail);

fun PrefixSum (x:int list):int list = helper2([],x);


fun helper3(x:int, []:int list):int list = []
| helper3(x:int , (y::tail):int list):int list= (x+y)::helper3(x+y, tail);

fun fastPrefixSum(x:int list):int list = helper3(0, x);
```



### Lab3.Heapify

**题目:**

一棵minheap树定义为：

- l t is Empty;
- l t is a Node(L, x, R), where R, L are minheaps and values(L), value(R) >= x (value(T)函数用于获取树T的根节点的值）

编写函数treecompare, SwapDown 和heapify：

**解题思路:**

对C/C++来说，堆排序再简单不过了，甚至可以不用树结构，直接用数组结构来实现堆排序。对于没有循环只有递归的SML而言，堆排序需要大大改变我们的思维模式。

首先treeCompare函数就是一个递归比较函数，比较简单就略过了。

对于SwapDown函数，需要保证从顶至下都Swap过一次，因此需要在递归中需要对左子树与右子树分别递归，并将递归后的两个子树和根节点进行Compare-Swap，这就需要用let语法构造一个临时空间暂存递归后的两个子树。

对于heapfiy函数则是让每个根节点的左子树和右子树都进行SwapDown过，这一步比SwapDown容易想一点。

但是树不一定是堆，堆是平衡树，因此需要对输入的树进行平衡处理，这里我比较懒直接利用前面写过的函数进行中序遍历再转换成平衡数。

总的来说掌握了函数式编程的思路后，这一道题不是很难，但是做出来又很有成就感，在熟悉了前面的基础上，整个逻辑走下来非常顺利。

**最终代码:**

```
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
```



## 2.

针对本课程的内容设置、实验设置等，提出宝贵的建议和意见。

- 感觉这个课确实学到了很好的思想，但是使用的语言太古老了（StandardML），其实对于Python，JavaScript也支持函数式编程的思想，希望以后可以在课上提一下，或者使用这两种语言来教学，毕竟这两种语言比较普及，我身边的同学也基本上都会。

- 没有认识到函数式编程的优势，除了代码量少，并没有看到它有高并行度等优势，希望能在以后的实验课里看到。

- 老师教的非常有耐心，在检查的时候和同学十分深入的交流，也解决了我的一些疑惑，谢谢老师。