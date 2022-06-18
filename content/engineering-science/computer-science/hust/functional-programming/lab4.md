---
title: "[华科]函数式编程实验4"
description: “华中科技大学 函数式编程实验4题目与答案"
date: 2021-04-21
image: https://s2.loli.net/2022/06/18/BryAis3WRkCItMg.jpg
---



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



### （2）

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

