---
title: "[HUST]函数式编程实验"
description: 华中科技大学计算机学院函数式编程实验笔记
date: 2021-04-07
bg: ./.images/crossroad.png
---



# Lab1

## Q1

 下列模式能否与类型为int list的L匹配成功？如果匹配不成功，指出该模式的类型？（假设x为int类型）

x::L	    *成功*	
\_::\_		*成功*
x::(y::L)  *y为int时成功*
(x::y)::L  *语法错误*
[x, y]      *y为int时成功*

## Q2

试写出与下列表述相对应的模式。如果没有模式与其对应，试说明原因

list of length 3           					
lists of length 2 or 3
Non-empty lists of pairs
Pairs with both components being non-empty lists

## Q3

分析下述程序段（左边括号内为标注的行号）

```sml
val x : int = 3
 		val temp : int = x + 1
 		fun assemble (x : int, y : real) : int =
			let val g : real = let val x : int = 2
							val m : real = 6.2 * (real x)
							val x : int = 9001
 							val y : real = m * y
						  in y – m
 						  end
			in
			  x + (trunc g)
			end
val z = assemble (x, 3.0)

```

试问：第4行中的x、第5行中的m和第6行中的x的声明绑定的类型和值分别为什么？第14行表达式assemble(x, 3.0)计算的结果是什么？

*4.x:int = 2*

*5.m:real = 12.4*

*6.x:int = 9001*

*14.z:int = 27*



## Q4

指出下列代码的错误

- ```
  (* pi: real *)
   val pi : real = 3.14159;
  ```


  *正确*

- ```
  (* fact: int -> int *)
  fun fact (0 : int) : int = 1
    | fact n = n * (fact (n - 1));
  ```

  *正确*

  

- ```
  (* f : int -> int *)
  fun f (3 : int) : int = 9
      f _ = 4;
  ```

  *修正*

  ```
  fun f(3:int):int = 9
  
    | f _ = 4;
  ```

- ```
  (* circ : real -> real *)
   fun circ (r : real) : real = 2 * pi * r
  ```

     *修正*

   ```
  fun circ(r:real):real = 2.0 * pi * r
   ```

- ```
  (* semicirc : real -> real *)
  fun semicirc : real = pie * r
  ```

  *修正*

  ```
   fun semicirc (r:real):real = pi*r
  ```


- ```
  (* area : real -> real *)
   fun area (r : int) : real = pi * r * r
  ```

  *修正*

  ```
  fun area (r:int):real = pi * real r * real r
  ```

  

## Q5

在提示符下依次输入下列语句，观察并分析每次语句的执行结果。


- ``` 
  3+ 4;
  ```

  ```
  val it = 7 : int
  ```

- ```
  3 + 2.0;
  ```

  ```
  stdIn:21.1-21.6 Error: operator and operand do not agree [overload - bad instantiation]
  operator domain: 'Z[INT] * 'Z[INT]
  operand:         'Z[INT] * real
  in expression:
    3 + 2.0
  ```

 - ```
   it + 6;
   ```

   缺省变量it 使用3+4的结果

   ```
   val it = 13 : int
   ```

- ```
  val it = “hello”;
  ```

  ```
  val it = "hello" : string
  ```

- ```
  it + “ world”;
  ```

  ```
  stdIn:23.4 Error: overloaded variable not defined at type
  symbol: +
  type: string
  ```

- ```
  it + 5;
  ```

  ```
  stdIn:25.1-25.6 Error: operator and operand do not agree [overload - bad instantiation]
  operator domain: string * string
  operand:         string * 'Z[INT]
  in expression:
    it + 5
  stdIn:25.4 Error: overloaded variable not defined at type
  symbol: +
  type: string
  ```

- ```
  val a = 5;
  ```

  ```
  val a = 5 : int
  ```

- ```
  a = 6;
  ```

  ```
  val it = false : bool
  ```

- ```
  a + 8; 
  ```

  ```
  val it = 13 : int
  ```

- ```
  val twice = (fn x => 2 * x);
  ```

  匿名函数，类似JS的匿名函数和python和c++的lambda函数

  ```
  val twice = fn : int -> int
  ```

- ```
  twice a;
  ```

  ```
  val it = 10 : int
  ```

- ```
  let x = 1 in x end;
  ```

  ?????

  ```
  stdIn:1.2-37.2 Error: syntax error: deleting  LET IDA EQUALOP
  
  stdIn:42.1 Error: syntax error found at IN
  ```

- ```
  foo;
  ```

  ```
  stdIn:1.2-35.2 Error: unbound variable or constructor: foo
  ```

- ```
  [1, “foo”];
  ```

  ```
  stdIn:1.2-42.3 Error: operator and operand do not agree [overload - bad instantiation]
  operator domain: 'Z[INT] * 'Z[INT] list
  operand:         'Z[INT] * string list
  in expression:
   1 :: "foo" :: nil
  ```





## Q6

函数sum用于求解整数列表中所有整数的和，函数定义如下

```
(* sum : int list -> int 		*)
(* REQUIRES: true		*)
(* ENSURES: sum(L) evaluates to the sum of the integers in L. *)
fun sum [ ] = 0
    | sum (x ::L) = x + (sum L);
```


完成函数mult的编写，实现求解整数列表中所有整数的乘积。

```
(* mult : int list -> int 		*)
(* REQUIRES: true		*)
(* ENSURES: mult(L) evaluates to the product of the integers in L. *)
fun mult [ ] = 		(* FILL IN *)
    | mult (x ::L) = 	(* FILL IN *) 

```

```
fun mult [] = 0
  | mult (x::L) = x*mult L;
```





# Lab2

## Q1

 分析以下函数或表达式的类型(先自己分析再程序验证)

- ```
  fun all (your, base) =
    case your of·
    0 => base
    | _ => "are belong to us" :: all(your - 1, base)
  ```

  类型

  ```
  val int* string list->string list
  ```


- ```
  fun funny (f, []) = 0
  | funny (f, x::xs) = f(x, funny(f, xs))
  ```

  类型

  ```
  val ('a*int->int) * 'a list -> int
  ```


- ```
  (fn x => (fn y => x)) "Hello, World!"
  ```

  ```
  val it = fn : ?.X1 -> string
  ```


## Q2

用归纳法证明ins函数和isort函数的正确性

```
fun ins (x, [ ]) = [x]
| ins (x, y::L) = case compare(x, y) of
		    GREATER => y::ins(x, L)
	  |        _ 	  => x::y::L
```

*证明*
当L长度为1时，[x]为有序
假设L'长度为n-1有序，则对于L长度为n
  min(x,y)::L'有序

```
isort : int list -> int list

(* REQUIRES true 				*)
(* ENSURES isort(L) = a sorted perm of L 	*)

fun isort [ ] = [ ]
   |   isort (x::L) = ins (x, isort L)
```

*证明*
当L长度为0时,[]有序
假设L'长度为n-1有序，则对于L长度为n
	L=ins(x,L')有序，所以L有序





## Q3

分析下面菲波拉契函数的执行性能

```
fun fib n = if n<=2 then 1 else fib(n-1) + fib(n-2);
```

树状结构
$O(2^n)$

```
fun fibber (0: int) : int * int = (1, 1)
  | fibber (n: int) : int * int =
   let val (x: int, y: int) = fibber (n-1)
   in (y, x + y)
   end
```

线性结构
$O(n)$

## Q4

定义函数divisibleByThree: int -> bool，以使当n为3的倍数时，divisibleByThree n为true，否则为false。注意：程序中不能使用取余函数’mod’。

```
(* divisibleByThree : int -> bool 	*)
(* REQUIRES: n>=0				*)
(* ENSURES: divisibleByThree n evaluates to true if n is a multiple of 3 and to false otherwise *)
fun divisibleByThree 0=true
  | divisibleByThree 1=false
  | divisibleByThree 2=false
  | divisibleByThree n=divisbleByThree(n-3);
```


## Q5

函数evenP为偶数判断函数，即当且仅当该数为偶数时返回true。
    其代码描述如下：

```
(* evenP : int -> bool 		*)
	(* REQUIRES: n >= 0 		*)
	(* ENSURES: evenP n evaluates to true iff n is even. *)
	fun evenP (0 : int) : bool = true
  	    | evenP 1 = false
  	    | evenP n = evenP (n - 2)
```

试编写奇数判断函数oddP: int -> bool，当且仅当该数为奇数时返回true。注意：代码不要调用函数evenP或mod。


```
fun oddP (0: int):bool = false
 |  oddP 1 = true
 | oddP n = oddP(n-2);
```


## Q6

编写函数 interleave: int list * int list -> int list，该函数能实现两个int list数据的合并，且两个list中的元素在结果中交替出现，直至其中一个int list数据结束，而另一个int list数据中的剩余元素则直接附加至结果数据的尾部。如：
interleave([2],[4]) = [2,4]
interleave([2,3],[4,5]) = [2,4,3,5]
interleave([2,3],[4,5,6,7,8,9]) = [2,4,3,5,6,7,8,9]
interleave([2,3],[ ]) = [2,3]

```
fun interleave ([]:int list, []:int list):int list = []
| interleave ([]:int list, y:int list):int list=y
| interleave (x:int list, []:int list):int list=x
| interleave (x::X:int list, y::Y:int list):int list = x::(y::interleave(X, Y))
```


## Q7

编写函数reverse和reverse’，要求：
函数类型均为：int list->int list，功能均为实现输出表参数的逆序输出；
函数reverse不能借助任何帮助函数；函数reverse’可以借助帮助函数，时间复杂度为O(n)。

```
fun reverse []:int list :int list= []
| reverse x::X:int list :int list= (reverse X)@[x]; 


fun helper ([]:int list, y:int list):int list = y
| helper (x::L:int list, y:int list) = helper(L, x::y);

fun reverse' (x: int list):int list = helper(x, []);
```



## Q8

给定一个数组A[1..n]，前缀和数组PrefixSum[1..n]定义为：	PrefixSum[i] = A[0]+A[1]+...+A[i-1]；
例如：PrefixSum [ ] = [ ]
	  PrefixSum [5,4,2] = [5, 9, 11]
	  PrefixSum [5,6,7,8] = [5,11,18,26]

试编写：
函数PrefixSum: int list -> int list，
	要求：WPrefixSum(n) = O(n2)。(n为输入int list的长度)
(2) 函数fastPrefixSum: int list -> int list，
	要求： WfastPrefixSum(n) =O(n). 
		（提示：可借助帮助函数PrefixSumHelp）
	

```
fun helper1 ([]:int list):int = 0
| helper1((x::X):int list):int= x+(helper1(X));

fun helper2 (prefix:int list, []):int list = []
| helper2 (prefix:int list, (x::tail):int list):int list= helper1(prefix@[x])::helper2(prefix@[x], tail);

fun PrefixSum (x:int list):int list = helper2([],x);
```

```
fun helper3(x:int, []:int list):int list = []
| helper3(x:int , (y::tail):int list):int list= (x+y)::helper3(x+y, tail);

fun fastPrefixSum(x:int list):int list = helper3(0, x);
```



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





# Lab4

## Q1

编写函数thenAddOne，要求：
1.函数类型为: ((int ->int) * int) -> int；
2.功能为将一个整数通过函数变换(如翻倍、求平方或求阶乘)后再加1。

```
fun double(x) = 2*x;
fun square(x) = x*x;
fun factorial(1) = 1  
  | factorial(x) = x*factorial(x-1);

fun thenAddOne (f:(int->int),x:int):int = f(x)+1;
```



## Q2

编写函数mapList，要求：
1.类型为: ((‘a -> ‘b) * ‘a list) -> ‘b list；
2.功能为实现整数集的数学变换(如翻倍、求平方或求阶乘)

````
fun mapList(f,[]) = []
  | mapList(f,x::L) = f(x)::mapList(f,L);
````





## Q3

编写函数mapList’，要求：

  ① 函数类型为: (‘a -> ‘b) -> (‘a list -> ‘b list)；

 ② 功能为实现整数集的数学变换(如翻倍、求平方或求阶乘)。

  ③ 比较函数mapList’和mapList，分析、体会它们有什么不同。

````
fun mapList' (f) = 
	let
		fun ret [] = []
		  | ret (x::L) = f(x)::ret(L)
	in
		ret
	end;
````





## Q4

编写函数：
	exists: (‘a -> bool) -> ‘a list -> bool
	forall: (‘a -> bool) -> ‘a list -> bool
   对函数p: t -> bool, 整数集L: t list,
	有：exist p L =>* true if there is an x in L such that p x=true;
	         exits p L =>* false otherwise.
	         forall p L =>* true if p x = true for every item x in L;
	         forall p L =>* false otherwise.

```
fun exists (f) = 
	let
		fun wrapper([]) = false
           | wrapper(x::L)=
           		case f(x) of
           			true => true
           			| false => wrapper(L) 
	in
		wrapper
	end;
	
	
fun forAll (f) = 
	let 
		fun wrapper([]) = true
		  | wrapper(x::L) = 
		  		case f(x) of
		  			false => false
		  			| true => wrapper(L)
	in 
		wrapper
	end;


```





## Q5

编写函数：
	treeFilter: (‘a -> bool) -> ‘a tree -> ‘a option tree
    将树中满足条件P（ ‘a -> bool ）的节点封装成option类型保留，否则替换成NONE

```
datatype 'a tree = EMPTY | Node of 'a tree*'a*'a tree
datatype 'a option = NONE | SOME of 'a

fun treeFilter (f) = 
	let
		fun wrapper(EMPTY) = EMPTY
		  | wrapper(Node(l,x,r)) = 
			case f(x) of 
				true => Node(wrapper(l), SOME x, wrapper(r))
				| false => Node(wrapper(l), NONE, wrapper(r))
	in 
		wrapper
	end;
```



## Q6

十进制数可表示为$54_{10}$，而二进制数可表示为$10_{2}$. 其中右下标的’10’,’2’称为基数。通常，给定一个基数b和n个数字dndn-1…d1组成的字符串，该数字字符串的值可用公式计算：∑i=1nbi-1di. 如：$54_{10}=5*10^1+4*10^0=54$,$10_2=1*2^1+0*2^0=2. $
同时，任意一个数可以表示成b以内数字的int list形式。如11002=[0,0,1,1], 5410=[4,5].

(1)编写高阶函数：toInt: int -> int list -> int.
    对所有b>1和所有L: int list,如果L是一个b进制数的int list表示，函数toInt b L为其相应的整数值，toInt b的结果类型为：int list -> int.
    如： val base2ToInt = toInt 2;
              val 2 = base2ToInt [0,1];

(2) 利用数学操作mod和div可以将任意十进制整数n表示成基于基数b的b进制数形式，如$42-_{10} = 132_{5}$。
 编写高阶函数  toBase: int -> int -> int list 实现该转换：toBase b n将十进制数n转换为b进制数的int list表述形式（b>1, n≥0）。

(3)编写高阶函数    convert: int * int -> int list -> int list
对任意b1, b2 > 1和所有L: int list（L为一个b1进制数的int list表述形式），函数convert(b1, b2) L将b1进制数的int list表述L转换成b2进制数的int list表述，即满足 toInt b2 (convert(b1, b2) L) = toInt b1 L。



### (1)

```
fun toInt(base) = 
	let
		fun wrapper ([]) = 0
		  | wrapper (x:L) = 
			let 
				fun pow(0)=1
				  | pow(n) = base*pow(n-1)
				val pos = pow(List.length(L))
			in
				pos*x + wrapper(L)
			end
	in
		wrapper
	end;
```



### (2)

```
fun toBase (base) = 
	let
		fun wrapper(0) = []
		  | wrapper(value) = 
		  	let 
		  		val q = value div base
		  		val p = value mod base
		  	in
		  		wrapper(q)@[p]
		  	end
	in
		wrapper
	end;
```





### (3)

````
fun convert (baseSrc, baseDst) = 
	let
		fun wrapper L = 
            let 
                val toIntSrc = toInt(baseSrc)
                val toBaseDst = toBase(baseDst)
            in
                toBaseDst(toIntSrc(L))
            end
            
	in
		wrapper
	end;
	
	
	
fun convert (baseSrc, baseDst) = 
	let
		fun wrapper = toBase(baseDst, toInt(baseSrc))
	in
		wrapper
	end;
````

