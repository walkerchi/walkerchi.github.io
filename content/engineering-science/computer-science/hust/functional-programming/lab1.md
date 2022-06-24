---
title: "[华科]函数式编程实验1"
description: "华中科技大学 函数式编程实验1题目与答案"
date: 2021-04-07
image: https://s2.loli.net/2022/06/18/BryAis3WRkCItMg.jpg
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

```
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
-  ```
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
