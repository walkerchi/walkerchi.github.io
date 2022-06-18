---
title: "[华科]函数式编程实验2"
description: "华中科技大学 函数式编程实验2题目与答案"
date: 2021-04-07
image: https://s2.loli.net/2022/06/18/BryAis3WRkCItMg.jpg
---



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