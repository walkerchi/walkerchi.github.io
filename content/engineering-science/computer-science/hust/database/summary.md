---
title: "[华科]数据库笔记"
description: "华中科技大学 数据库笔记"
date: 2021-07-04
image: https://s2.loli.net/2022/05/21/xBCITtd3PXU2gih.jpg
---



# 数据库

## 概论

### 特点

结构化、共享度高，冗余度低、易扩展、数据独立性

### ER图

- M:N关系需要一张表
- N:1关系不需要表 

### 数据模型

- 层次模型

  - 双亲是唯一的
  - 只能处理一对多联系

- 网状模型

  - 允许没有双亲
  - 可以有多个双相亲
  - 只能处理一对多联系

- 关系模型（主流）

### 两级映像 三级模式

```mermaid
graph LR
A(内模式)
B(模式)
C(外模式View)
A---B
B---C

```



## 关系数据库

$关系数据库操作语言\begin{cases}关系代数语言\\关系演算语言\\结构化查询语言SQL\end{cases}$

$关系：笛卡尔积中有意义的子集$

$元素：关系中每个元素（行）$

$属性：列名$

$候选码：最小能唯一表示一个元组的一组属性$

$全码：候选码是所有的属性$

$主码：候选码之一$

$主属性：候选码的属性$

$非码属性：任何候选码都不包含的属性$

$外码：在R中的属性组，在S中是主码$

### 关系完整性

- 实体完整性

  主属性不能为空

- 参照完整性

  外码必须为空或S的主码值

- 用户定义完整性

### 关系代数

自然连接：删除重复列 

- $R(X,Y)\div S(Y,Z)$

  $R\div S = \{t[X]|t\in R \and Y_{t[X]} \supseteq \Pi_Y (S)\}$

  $R\div S = \Pi_X(R) - \Pi_X(\Pi_X(R)\times \Pi_Y(S) - R)$
  
  ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200824204535830.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2pvZXlfcm8=,size_16,color_FFFFFF,t_70#pic_center)

## SQL

### 查询

- 列出至少有三门课程成绩在90分以上的学生学号和平均成绩

  ```sql
  select sno,avg(grade) as avg_grade
  from sc sc1
  group by sno
  having (select count(*)
          from sc
          where sno=sc1.sno and grade>=90
         )>=3
  ```

- exist 与 in 转换 

  ```sql
  select ... from T1 
  where C1 in (
  	select C2 from T2 
  	where ...
  )
  select ... from T1
  where exists (
  	select * from T1 
       where ... and C2=T1.C1
  )
  ```

- 查询选修了全部课程的学生的姓名

  ```sql
  select sname 
  from student
  where not exists(
  	select * from course
      where not exists(
          	select * from sc
              where sno=student.sno and cno = cources.cno
          )
  )
  
  select sname
  from student
  where not exists(
  	select * from course
      where cno not in (
      	select cno from sc 
          where sno = student.sno
      )
  )
  ```

  

## 关系数据理论

### 函数依赖

$  若s[X]=t[X]则有s[Y]=t[Y]称X函数确定Y（Y函数依赖X，X\rightarrow Y）$

$X\rightarrow Y, Y\nsubseteq X,则X\rightarrow Y是非平凡的函数依赖$

$X\rightarrow Y,且任意  X'\in X \Rightarrow X'\nrightarrow Y，则Y完全依赖于X$

$主码候选码统称为码$

$Armstrong公理系统\begin{cases}自反律:Y\subseteq X\Rightarrow X\rightarrow Y\\赠广律:X\rightarrow Y\Rightarrow XZ\rightarrow YZ\\传递律:X\rightarrow Y,Y\rightarrow Z\Rightarrow X\rightarrow Z\end{cases}$

$X\rightarrow  Y \Leftrightarrow X_F^+\supseteq Y$

候选码的属性一定不会在右侧出现

- 计算最小依赖集
  1. 右部单属性化
  2. 去掉多余函数依赖
  3. 去掉左部多余属性
- 正则覆盖
  1. 合并左侧相同的函数依赖
  2. 去掉每个函数中的无关属性
- 求候选码
  1. 找到不在右边出现的属性$N$，并计算闭包，如果闭包为U则终止
  2. 找到既在左部又在右部的属性集，将LR的子集并入$N$测试是否构成码

### 范式

- 1NF

  属性不可分

  数据冗余、更新异常、插入异常、删除异常

- 2NF

  非主属性完全依赖于码

  数据冗余、更新异常、插入异常、删除异常

- 3NF

  不允许：
  $$
  X\rightarrow Y \rightarrow Z\\
  X:码\quad Y:不含码\quad Z:非主属性，且Z\nsubseteq Y
  $$
  

  没有非主属性对码的传递依赖

  要么左侧是超码要么右侧是主属性

  没有非主属性一定是3NF

  数据冗余、更新异常、插入异常、删除异常
  $$
  若R\in 3NF 则 R\in 2NF
  \\
  证：\\
  假设R\notin 2NF, 但R\in 3NF\\
  \because R\notin 2NF\\
  \therefore \exist Y\subset X, Y\rightarrow Z\Rightarrow X\rightarrow Y\rightarrow Z\\
  R\notin3NF矛盾
  $$
  
- BCNF

  非平凡函数依赖左侧包含候选码 
  $$
  如果R\in BCNF 则 R\in 3NF
  \\
  证:
  \\
  设R\in BCNF，但R\notin 3NF
  \\
  则必存在码X，属性组Y，非主属性组Z：
  \\
  X\rightarrow Y,Y\rightarrow Z, Y\nrightarrow X, Z\nsubseteq Y
  \\
  由BCNF定义Y必包含候选码，故有Y\rightarrow X，
  矛盾
  $$

- 4NF

  所有非平凡函数依赖$X\rightarrow \rightarrow Y(Y\nsubseteq X)$X都含有候选码
  
  所有二值关系至少是4NF
  
- 5NF

1. 二元关系最高到4NF
2. 全主属性3NF，不一定到BCNF
3. 全码一定是BCNF，不一定是是4NF
4. 只有一个主属性一定是2NF不一定是3NF
5. 只有一个非主属性，不一定到2NF

### 模式分解



- 判断无损链接

  - 方法一

    1. 对每一个关系函数进行遍历，修改右侧，如果为a则都改为a
    2. 出现同花顺停止，则为无损链接

    ![img](https://s2.loli.net/2022/06/18/m9Hlci1weGJCXvE.png)
    
  - 方法二
  
    $U_1\bigcap U_2\rightarrow U_1 - U_2 \in F^+$

1. 若进要求分解具有无损链接性则分解一定能达到4NF
2. 若仅要求分解保持函数依赖，则分解一定能达到3NF
3. 若已具有无损链接性又保持函数依赖则分解一定能达到3NF，不一定达到BCNF

- 模式分解

  ![img](https://s2.loli.net/2022/06/18/PlwEeOWd32haKIm.png)

  

## 查询处理

### 查询操作

$\begin{cases}嵌套循环链接\\排序-合并方法\\索引链接\\hash链接\end{cases}$

### 查询优化

- 例

  ![img](https://s2.loli.net/2022/06/18/iwD87nfZFgqsTO5.png)

  ![img](https://s2.loli.net/2022/06/18/MwJDST5hNfgPQbO.png)

  ![image-20210703180221065](https://s2.loli.net/2022/06/18/GmjHWJDseEYkQKF.png)

  ![img](https://s2.loli.net/2022/06/18/PlwEeOWd32haKIm.png)

  ![img](https://s2.loli.net/2022/06/18/WTzOXLqvK518eIG.png)

  
  $$
  嵌套循环代价：\\
  读块数=Br+\frac{Br\cdot Bs}{K-2}\\
  写块数=Br+\frac{Br\cdot Bs}{K-2}+\frac{Frs\cdot Nr\cdot Ns}{Mrs}\\\
  索引扫描代价:\\
  读块数=L+S\\
  L:B+树层数
  $$

## 数据库恢复

### 事务的特性ACID

- 原子性
-  一致性
- 隔离性
- 持续性

### 故障

- 事务故障  UNDO
- 系统故障  UNDO+REDO
- 介质故障  REDO
- 计算机病毒

### 恢复

- 数据转储

  - 静态转储 动态转储
  - 海量转储 增量转储

- 日志文件

  1. 从检查点开始扫描日志，UNDO队列初始化为ACTIVE队列，REDO队列初始化为空
  2. UNDO队列总每个事务从后向前扫描日志UNDO
  3. REDO对立中每个事务从前向后扫描日志REDO

  ![img](https://s2.loli.net/2022/06/18/upXEGLKg7WetbCm.png)

## 并发控制

### 数据不一致性

- 丢失更新
- 读脏数据
- 不可重复读

### 三级封锁

$\begin{cases} X锁（写锁）\\ S锁（读锁）\end{cases}$

- 一级封锁协议

  事务写之前加X锁

  防止丢失更新

- 二级封锁协议

  事务写之前加X锁，读之前加S锁

  防止丢失更新、读脏数据

- 三级封锁协议

  事务写之前加X锁，事务读之前加S锁

  防止丢失更新、读脏数据、不可重复读

- 活锁

  解决：先来先服务

- 死锁

  $产生条件\begin{cases}互斥\\不可剥夺\\部分分配\\环路\end{cases}$

**可串行化是并行事务正确性的唯一标准**

**n个事务允许并发执行，最多有n种可能的正确结果**

**冲突可串行化调度一定是可串行化调度**

**不是冲突可串行化调度仍有可能是可串行化调度**

### 并发调度可传行性

不同事务，统一数据，读读操作可交换

不同事物，不同数据，皆可交换



### 两段锁

读写之前先封锁

释放封锁后不再申请锁

**三级封锁是两段锁的特例**

**两段锁协议是可串行化调度的充分不必要条件**



### 多粒度封锁

$\Join$
