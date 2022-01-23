---
title: "[HUST]操作系统"
description: 华中科技大学计算机学院操作系统笔记
date: 2020-12-01
bg: ./.images/living.jpg
---



#  操作系统

## 1.Intro

$冯诺依曼计算机\begin{cases} 集中控制\\顺序执行\end{cases}$

### 1.1x86PC

启动流程

- CS = 0xFFFF; IP = 0x0000
- 寻址 0xFFFF0 ( ROM BIOS映射区 )
- 检查RAM， 键盘， 显示器， 软硬磁盘
- 将磁盘 0 磁道 0 扇区 ( 操作系统引导扇区 bootsect.s, setup.s ) 读入 0x7C00 处 512B
- 设置 CS = 0x07C0， IP=0x0000

操作系统核心代码，system模块在0x0000处

保护模式：32位汇编

### 1.2系统调用

POSIX ( Portable Operating System Interface of Unix )

$系统调用\begin{cases}  任务管理\begin{cases} fork\\execl\\pthread_create\end{cases}\\文件系统\begin{cases}open\\EACCES\\mode_t,st_mode\end{cases}  \end{cases}$

### 1.3权限

  核心态（0） OS服务（1,2） 用户态（3）

DPL > CPL

中断是进入内核的唯一方法 (INT 0X80)

_system_call: CPL(3)->CPI(0)

### 1.4 计算机体系结构

- 应用程序
- 系统应用
- 操作系统
- 计算机硬件

### 1.5 存储程序式计算机

- 基本部件
  - CPU
  - 存储器
  - I/O设备
- 特点
  - 过程性：模拟手工操控
  - 集中控制：由CPU集中管理
  - 顺序性：程序计数器

### 1.6  操作系统 设备管理

$\begin{cases} 处理机管理\\存储器管理\\设备管理\\文件系统  \end{cases}$

- CPU $\Rightarrow$ 进程
- 磁盘 $\Rightarrow$ 文件
- 内存 $\Rightarrow$ 地址空间  

### 1.7  操作系统 发展

- $手工操作系统$

- $早期批处理\begin{cases}  联机批处理\\脱机批处理\\执行系统 \end{cases}$

- $\begin{cases} 多道程序操作系统（宏观并行，微观串行）\begin{cases}多道批处理系统\\分时系统\end{cases}\\实时系统  \end{cases}$

- $\begin{cases} 网络操作系统\\分布式操作系统  \end{cases}$

### 1.8 操作系统 分类

- 批量操作系统

- 分时操作系统    $特点\begin{cases}  并行性\\独占性\\交互性   \end{cases}$

  ​	不能完全重现

- 实时操作系统    $特点\begin{cases}  可靠性,安全性\\及时响应   \end{cases}$
- 个人计算机操作系统
- 多处理机系统
- 网络操作系统
- 分布式系统   $特点\begin{cases}  可扩展性\\增加性能\\高可靠性  \end{cases}$
- 嵌入式操作系统

### 1.9 操作系统 特点

- 并发
- 共享
- 不确定性

### 1.10硬件基础

- 通道
- 中断

## 2.操作系统 结构

### 2.1 操作系统 结构分类

- 层次结构：Unix
- 微内核结构：Linux
- 外核结构

### 2.2 处理机特权级

核态 > 管态 > 用户态

### 2.3 中断

$\begin{cases}  输入输出中断\\外中断\\及其故障中断\\程序性中断\\访管中断（系统调用） \end{cases}$

$\begin{cases} 中断响应\rightarrow硬件\\中断处理\rightarrow软件 \end{cases}$

$程序状态字\begin{cases} PC:指令计数器\\PS:处理机状态字寄存器 \end{cases}$

$中断处理\begin{cases} 上半部分: 不可打断，关键而紧迫\\下半部分: 可被打断 \end{cases}$



## 3.操作系统 用户接口

### 3.1 初启

- 独立引导方式（滚雪球方式）
  - 初始引导：自检$\rightarrow$读入引导程序
  
  - 引导程序执行：将操作系统核心文件读入内存$\rightarrow$控制交给核心初始化程序
  
  - 核心初始化：初始化数据结构和参数
  
  - 系统初始化
  
    

#### 3.1.1 Linux

- 系统加电或复位：$\begin{cases}主存数据清零\\对内存进行校验\\CS:IP\rightarrow BIOS入口\end{cases}$
- BIOS启动：$\begin{cases} CPU从FFFF:0000开始执行\\上电自检\\对硬件设备进行检测和链接，测试数据送入BIOS数据区\\读入0柱面0磁道MBR(Master~Boot~Record)\\控制权交给Boot~Loader \end{cases}$
- Loader ( 引导程序 )：$OS读入内存，并将权限交给OS初始化程序$
- 系统核心初始化 ( Setup.s ): $\begin{cases} Setup\begin{cases}检查调入内存中代码\\获取内存容量信息，设置设备模式\\屏蔽中断，准备进入保护模式\\设置中断描述符表(idt)、全局描述符表(gdt)\\控制权交给Heads\end{cases}\\Heads\begin{cases}对中断向量表作准备工作\\检查CPU类型\\调用Setup\_paging进行页面初始化\\调用main.c中的Start\_kernel()\end{cases}\\Start\_kernel()\begin{cases}与CPU、内存等基本硬件相关部分进行初始化\\对中断向量表进行初始化\\为进程调度程序做准备\\设置基准时钟\\内核的内存分配\\对文件系统进行初始化\\建立init进程\end{cases}\end{cases}$

#### 3.1.2 UNIX

- 操作系统执行代码程序装入内存
- 存储空间及其管理机构初始化
- 与设备有关的初始化
- 与文件系统有关的初始化
- 创建 0# 和 1# 进程
- 1# 进程创建各终端进程
- 终端进程运行 shell
- 各用户终端上出现 login

### 3.2 应用程序处理

$编辑\rightarrow编译\rightarrow链接\rightarrow运行$

#### 3.2.1 链接

- 静态链接
- 动态链接， 需要DLL库

### 3.3 操作命令

- 作业控制语言（JCL）
- 键盘命令：MS-DOS，Linux（UNIX)
- 图形用户界面：Windows

### 3.4 系统功能调用

$\begin{cases} DOS\Rightarrow 0x21H\\Linux\Rightarrow 0x80H \end{cases}$

统一进管方式：访管指令，访管中断

$特点\begin{cases} 每个系统调用对应一个系统调用号\\每个系统调用都有一个对应的执行程序段\\每个系统调用要求一定数量的输入参数和返回值\\整个系统有一个系统调用执行程序入口地址表  \end{cases}$

库函数属于用户程序而非系统程序



## 4.进程管理

- 在没有线程的操作系统里，进程是调度的基本单位
- 在有线程的操作系统里，线程是调度的基本单位

### 4.1 程序

$\begin{cases} 顺序程序\begin{cases}顺序性\\封闭性\\可再现性\end{cases}\\并发程序\begin{cases}失去封闭性与可再现性\\程序与计算不再一一对应\\程序并发直观性的相互制约\begin{cases}资源共享(简介)\\公共变量(直接)\end{cases}\end{cases} \end{cases}$

### 4.2 进程

$\begin{cases} 一个程序可以对应多个进程，一个进程至少包含一个程序\\进程是竞争系统资源的基本单位\\程序是静态概念，进程是动态概念  \end{cases}$

#### 4.2.1 进程状态



![](https://s2.loli.net/2022/01/23/9mHUPw6Lfas18VB.png)

3：

#### 4.2.2 进程数据结构

PCB （ Process Control Block ）

![](https://s2.loli.net/2022/01/23/mvZxf2D94kLVX58.png)

#### 4.2.3 进程控制

原语：不可被中断

$\begin{cases} 创建原语：无\rightarrow 就绪\\撤销原语：有\rightarrow消亡\\阻塞原语：运行\rightarrow等待\\唤醒(等待)原语：等待\rightarrow就绪 \end{cases}$

#### 4.2.4 进程约束

临界资源：一次仅允许一个进程使用的资源

临界区：进程汇总对临界资源进行审查与修改的程序段

#### 4.2.5 进程同步

- 锁  $\begin{cases} 0\rightarrow可用\\1\rightarrow已占用 \end{cases}$
- 信号灯$\begin{cases}Mutex:资源数量\\Mutex初始值\ge0\\P:Mutex--\\V:Mutex++\end{cases}$

例题：

- 进程流程图

![](https://s2.loli.net/2022/01/23/mdYh36KHWnGBxVE.png)

- 共享缓冲区



![](https://s2.loli.net/2022/01/23/mBjK6J3lEnCAxYI.png)

- 生产者消费者

![](https://s2.loli.net/2022/01/23/9cpuf6TvrbdJ7G4.png)

![](https://s2.loli.net/2022/01/23/2V9gK4Zkjpu8QoS.png)

- 理发师问题

```c
# define CHAIRS 5         /*为顾客准备椅子数*/
typedef int semaphone;    /*信号灯类型*/
semaphore customers = 0 ; /*等待服务顾客数*/
semaphore barbers = 0 ;   /*等待理发的理发师数*/
semaphore mutex_waiting = 1 ;/*用于互斥*/
int waiting = 0 ;         /*等待的顾客*/

void barber(void){
	while(true){          /*是否还剩顾客*/
		P(customers);     /*顾客资源-1*/
		P(mutex_waiting);
			waiting--;
		V(barbers);       /*理发师资源+1*/
		V(mutex_waiting); 
		cut_hair();
	}	
}

void customers(void){
	while(true){
		P(mutex_waiting);
		if(waiting < CHAIRS){  /*是否还有剩余座位*/
			waiting++;
			V(customers);      /*顾客资源+1*/
			V(mutex_waiting);
			P(barbers);        /*理发师资源-1*/
			get_haircut();
		}else{                 /*无剩余座位*/
			V(mutex_waiting);
		}
	}
}

void main(){
cobegin
	barber();
	customers();
coend
}

```

#### 4.2.6 进程通信



- 信箱
- 消息缓冲

#### 4.2.7进程调度

$\begin{cases}剥夺方式\\非剥夺方式\end{cases}$

$\begin{cases}  先来先服务\\优先调度\begin{cases}静态优先数\begin{cases}根据所使用资源来计算\\基于程序运行时间估计\\基于进程类型估计\end{cases}\\动态优先数\begin{cases}进程使用CPU超过一定数值降低优先度\\I/O操作后，增加优先数\\进程等待时间超过一定数值,提高优先数\end{cases}\end{cases}  \end{cases}$

![](https://s2.loli.net/2022/01/23/BtufAoNG8pFHDaX.png)

## 5.资源分配

$\begin{cases} 动态分配\\静态分配  \end{cases}$

$资源\begin{cases}  物理资源\\虚拟资源(逻辑资源)  \end{cases}$

| 资源类别 | 物理资源     | 虚拟 ( 逻辑 ) | 映射                       |
| :------: | ------------ | ------------- | -------------------------- |
|  处理机  | CPU          | 进程          | 进程调度                   |
|  存储器  | 主存         | 虚存          | 地址映射                   |
|   设备   | 外部设备     | 逻辑设备      | 设备分配                   |
|   信息   | 文件物理结构 | 文件逻辑结构  | 磁盘空间分配，文件目录查找 |

### 5.1 数据结构

资源描述器 rd （ resource descriptor ）

​		描述各类资源的最小分配单位

资源信息快 rib （ resource information block ）

​        $\begin{cases}请求者队列\\可利用资源队列\\资源分配程序\end{cases}$

### 5.2 分配策略

$\begin{cases}选择请求者\\选择资源 \end{cases}$

常见分配策略

- 现请求先服务 ( 有饿死现象 )

- 优先调度：按照优先级先后

- 针对设备特性的调度策略

  ​	如：$移臂调度算法\begin{cases} FCFS先来先服务算法\\SSTF最短寻到时间优先：寻找时间最短\\ SCAN扫描算法:前进方向上最短查找时间\\CSCAN循环扫描算法: 单向移动\end{cases}$

### 5.3 死锁

![](https://s2.loli.net/2022/01/23/FUyqQ82Luv5wWzG.png)

$原理\begin{cases} 资源数不足\\并发进程推进顺序不当  \end{cases}$

#### 5.3.1 必要条件

- 互斥条件     ( 难于否定 )
- 不剥夺条件 ( 容易否定，难于实现 )
- 占有并等待 ( 容易否定，容易实现 )
- 环路条件     

#### 5.3.2 死锁避免

- 有序资源分配：（资源浪费）
- 银行家算法：当前资源是否满足申请者的最大申请量

$m$ 个并发进程，每个进程需要 $n$ 个资源，则此类资源最少的数量为 $m\times(n-1)+1$ 

#### 5.3.3 死锁检测

算法复杂，开销很大



## 6.处理机

$\begin{cases}  宏观上:作业调度\\微观上:进程调度 \end{cases}$

### 6.1 作业调度

JCB（ Job Control Block ）

$作业状态\begin{cases} 后备状态\\执行状态\\完成状态 \end{cases}$

$衡量指标\begin{cases} 平均周转时间: t=\frac{1}{n}\sum_{i=1}^nt_i~,t_i = t_{ci}-t_{si} \\平均带权周转时间: w=\frac{1}{n}\sum_{i=1}^nw_i~,w_i=\frac{t_i}{t_{ri}}  \end{cases}$

$\begin{cases}  t_{si}:作业进入系统时间\\t_{ci}:作业完成时间\\t_{ri}:作业实际执行时间  \end{cases}$

$调度策略\begin{cases} 先来先服务\\短作业优先调度:平均周转时间最短\\响应比高者优先调度:响应比 = 1+\frac{等待时间}{执行时间} \\优先调度算法:优先数=等待时间^2-要求执行时间-16\times输出量\end{cases}$

### 6.2 进程调度 

$进程调度功能\begin{cases}  记录进程有关情况\\决定分配策略\\实施处理机的分配和回收 \end{cases}$

$进程调度方式\begin{cases} 非剥夺式\\剥夺式  \end{cases}$

$进程调度算法\begin{cases}  优先数调度算法(UNIX)\\循环轮转调度算法 \end{cases}$

#### 6.2.1 UNIX

$p\_pri \in [-127,127]$

$p\_pri$越小优先级越高

$p\_pri = min(127, (p\_cpu/16-p\_nice+PUSER))$

$\begin{cases} p\_cpu:进程占用CPU的程度\\p\_nice:用户通过nice()设置的进程优先数\\PUSER:100 \end{cases}$

0# 进程 -100

磁盘 -80

用户态 > 100



## 7.主存

$主存管理功能\begin{cases} 实现逻辑地址到物理地址的映射\\主存保护\\存储保护\\主存扩充 \end{cases}$

### 7.1 地址映射

$\begin{cases} 静态地址映射:程序装入过程\\动态地址映射:程序执行期间(需要重定位寄存器) \end{cases}$

$\begin{cases}  覆盖技术:需要程序员给出程序段之间的覆盖结构\\交换技术:交换进程  \end{cases}$

### 7.2 主存分配

主存资源信息块 m_rib

$\begin{cases}  分配策略\\放置策略\\调入策略\\淘汰策略 \end{cases}$

### 7.3 主存扩充

可行性：局部性特征

虚拟存储器：逻辑地址与物理地址分开

### 7.4 存储保护

- 上、下界防护：[ 上界寄存器 ,下界寄存器 )

- 基地址、限长防护: [ 基址寄存器, 基址寄存器 + 限长寄存器 )

### 7.5 分区存储管理

#### 7.5.1 数据结构

主存资源信息块 $M\_RIB\begin{cases} 等待队列头指针\\空闲队列头指针\\主存分配程序入口地址 \end{cases}$

分区描述器 $PD\begin{cases} 分配标志:flag(0-空闲区~,1-已分配)\\大小:size\\勾链字:next \end{cases}$

#### 7.5.2 放置策略

- 首次匹配：从低地址到高地址（注意大小端）
- 最佳匹配：空闲区从小到大
- 最坏匹配：空闲区从大到小

![](https://s2.loli.net/2022/01/23/9KHbGnfzUNruvqB.png)

碎片与拼接

eg: 伙伴系统



### 7.6 页式存储管理

VA = { VPN , OFFSET }

PA = { PPN , OFFSET }

页表项 { 页号，主存块号，中断位，辅存地址，引用位，改变位 }

利用联想存储器加快查表速度

$页式系统\begin{cases} 简单页式系统:全加载\\请求页式系统:部分加载 \end{cases}$

$置换算法\begin{cases} OPT:淘汰的页被最久之后使用\\FIFO\\LRU \end{cases}$

缺页中断率

### 7.7 段式存储管理

- 每段占用连续存存储区域
- 不会出现碎片问题
- 段大小由程序员安排

#### 7.7.1 段表

VA = { 段号，段内位移 }

段表 { 段号，长度，基址 }

#### 7.7.2 段页式系统

段表 { 段号， 页表长度， 页表始址 }

![](https://s2.loli.net/2022/01/23/VM8huws5TzkGYKW.png)





## 8.设备管理

### 8.1 设备分类

- 存储设备
- I/O设备
- 通信设备

#### 8.1.1 Linux

- 字符设备
- 块设备
- 网络接口设备

### 8.2 设备独立性

$\begin{cases} 逻辑设备名:逻辑设备描述器ldd\\物理设备名 \end{cases}$

$\begin{cases}  程序独立于分配给他它的某种类型的具体设备\\程序尽可能与它使用的I/O设备类型无关  \end{cases}$

$\begin{cases} 高级语言:软通道\\批处理系统:联接\\交互系统:指派命令 \end{cases}$

### 8.3 数据结构

设备控制块 DCB （ Device Control Block ）

$\begin{cases}设备名\\设备属性\\指向命令转换表指针\\在I/O总线上的设备地址\\设备状态\\当前用户进程指针\\I/O请求队列指针\end{cases}$

### 8.4 缓冲

假设输入速度为 $x$, 输出速度为 $y$

- 单缓冲
	速度为 %
- 双缓冲
- 环形缓冲
- 缓冲池

#### 8.4.1 UNIX

$缓冲区\begin{cases}缓冲数组\\缓冲首部\end{cases}$

$\begin{cases} 设备缓冲区队列:b链\\空闲缓冲区队列:av链\begin{cases}B\_BUSTY=0\\空闲buf\begin{cases}取队首\\放回队尾\end{cases}\\延迟写\begin{cases}当一个具有延迟写标记的buf移到av链头，用于分配时\\取队首\\放回队首\end{cases}\end{cases}  \end{cases}$

### 8.5 SPOOLING  假脱机

- 预输入
- 缓输出

实现SPOOLING系统的基础

- 大容量辅存空间（ 输入井，输出井 ）
- 硬件基础 （ 通道，中断 ）
- 数据结构 （ 预输入表，缓输出表 ）

### 8.6 设备分配

$\begin{cases} 静态分配\\动态分配:设备利用率高，容易发生死锁 \end{cases}$

- 独享分配
- 共享分配
- 虚拟分分配

### 8.6 设备控制

$\begin{cases} 循环测试I/O方式\\I/O中断方式\\DMA方式\\通道方式 \end{cases}$

#### 8.6.1 I/O子系统

![](https://s2.loli.net/2022/01/23/q26UMmcOedlpu4J.png)

$I/O控制功能\begin{cases} 解释用户的I/O系统调用\\设备驱动\\中断处理 \end{cases}$

$I/O接口程序\begin{cases} 将逻辑设备转化为物理设备\\合法性检查\\形成I/O请求块(IORB) \end{cases}$







## 9.文件系统

$文件\begin{cases} 文件名\\文件扩展\\文件属性 \end{cases}$

### 9.1 文件系统简介

文件系统组成

- 管理文件所需数据结构
- 管理程序
- 一组操作

文件系统功能

- 从用户角度看——按名存取
- 从系统角度看$\begin{cases} 赋存空间管理\\文件集合管理\\文件保护  \end{cases}$

文件结构

- 逻辑结构
- 物理结构

### 9.2 文件逻辑结构

#### 9.2.1 流式文件

无结构，有序字符的集合，按照字符个数，或者特殊字符为边界进行存取

#### 9.2.2 记录式文件

有结构，连续顺序的记录的集合

$\begin{cases} 定长记录\\变长记录  \end{cases}$

#### 9.2.3 文件存取

- 顺序存取
- 随机存取

### 9.3 文件物理结构

#### 9.3.1 连续文件

![](https://s2.loli.net/2022/01/23/n32qraT9MC1Og7y.png)

#### 9.3.2 串联文件

![](https://s2.loli.net/2022/01/23/QwAEv8hJUgql7db.png)

![](https://s2.loli.net/2022/01/23/g4dDbHauitoNZpJ.png)

#### 9.3.3 索引文件

![](https://s2.loli.net/2022/01/23/N9xOqDH6Cezoc3i.png)

- 直接索引
- 一级间接索引 ( 间接索引表为一个块大小即512B )
- 二级间接索引

#### 9.3.4 UNIX

##### 9.3.4.1 文件分类

- 普通文件
- 目录文件
- 特别文件

##### 9.3.4.2 文件索引节点

$inode\begin{cases} 文件所有者表示~i\_uid,i\_gid\\文件类型\quad\quad~~~i\_type\\文件获取许可权~i\_mode\\联接计数\quad\quad~~~i\_ilink\\文件存取时间\quad i\_time\\文件长度\quad\quad~~~i\_size\\地址索引表\quad\quad i\_addr[13](System~V)\begin{cases}i\_addr[0:10]:直接索引\\i\_addr[10]:一级间接索引\\i\_addr[11]:二级间接索引\\i\_addr[12]:三级间接索引\end{cases}\ \end{cases}$

系统支持最大文件为$ (10 + 256 + 256^2 + 256^3)\times512B$

256 = 512B / 2B

### 9.5 文件目录

$文件目录\begin{cases} 文件名\\文件逻辑结构\\文件物理结构\\存取控制信息\\管理信息\\文件类型  \end{cases}$

#### 9.5.1 一级文件目录

重命名冲突问题

#### 9.5.2 树型文件目录

![](https://s2.loli.net/2022/01/23/QatlvsBI8refnZ7.png)

#### 9.5.3 UNIX

![](https://s2.loli.net/2022/01/23/WxCrtXIfT8FziOd.png)

![](https://s2.loli.net/2022/01/23/ctM2vsTaSnHNkug.png)

### 9.6 文件存储空间

- 空闲文件目录
- 空闲块链
- 位示图            1：已分配     0：空闲

#### 9.6.1 UNIX

##### 9.6.1.1 文件卷

![](https://s2.loli.net/2022/01/23/UIJYorys8M2pRa4.png)

##### 9.6.1.2 空闲磁盘管理

![](https://s2.loli.net/2022/01/23/3zdicLImExOVUSY.png)

从右往左依次为第0,1,2……块，其索引空闲区域大小分别为99,100,100……

最后一块（最左侧）存放在filsys中

分配时，从filsys开始， s_free[--s_nfree],  当s_free[0]出栈时，分配出倒数第二块的空间，并将倒数第二块的内容入 filsys 中。

回收时，压栈，如果超过100则增加链接



### 9.7 文件共享

#### 9.7.1 文件安全

- 访问控制矩阵
- 存取控制表
- 用户权限表
- 口令
- 密码

#### 9.7.2 链接

- 软连接

  ![](https://s2.loli.net/2022/01/23/rGkEUOHimzbwdBx.png)

- 硬链接

  ![](https://s2.loli.net/2022/01/23/rGkEUOHimzbwdBx.png)



### 9.8 文件操作

#### 9.8.1 打开和关闭

- 代开文件：文件目录表复制到主存约定区域，建立文件控制块
- 关闭文件：主存中文件控制块删去

#### 9.8.2 文件备份

- 周转性转储
- 增量性转储

#### 9.8.3 UNIX

![](https://s2.loli.net/2022/01/23/YeSsk153BvC9Rmp.png)







## 0.Others


### 2.1数据结构

PCB（ Process Control Block ）

管理CPU

就绪态，运行态，阻塞态

### 2.2进程切换

$切换\begin{cases} 指令切换\\映射表切换  \end{cases}$

进程是核心态

$fork\begin{cases}0\rightarrow子进程\\非0\rightarrow父进程\end{cases}$

#### 2.2.1线程

$\begin{cases}用户级线程\\内核级线程\end{cases}$

线程：轻量级线 程TCB（只切换PC和寄存器，不切换内存）

![](https://s2.loli.net/2022/01/23/Kg6JV2xD9kanjyo.png)

##### 2.2.1.1用户级线程

每个线程都有自己的TCB和栈

##### 2.2.1.2内核级线程

每个线程都有自己的TCB和一套栈

![](https://s2.loli.net/2022/01/23/qQiA1BhfK2FMLDr.png)

- 中断入口

- 内核线程切换

- 中断返回

  ![](https://s2.loli.net/2022/01/23/F4SaI1B3iK6NMEW.png)

#### 2.2.2调度策略

$指标\begin{cases}周转时间：等待时间\\响应时间\end{cases}$

FCFS 先来先服务 ( First Come First Serve )

SFJ 短作业优先 

RR 时间片轮转调度 ( Round Robin )

优先级

### 2.3进程通信

