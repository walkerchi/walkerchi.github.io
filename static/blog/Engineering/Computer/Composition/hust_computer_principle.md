---
    title: "[HUST]计算机组成原理"
    description: 华中科技大学计算机学院计算机组成原理笔记
    date: 2020-11-24
    bg: ./.images/a_long_way.jpg
---



# 计算机组成原理

## 1.Intro

### 1.1性能评价

$\begin{cases}      非时间指标 \begin{cases} 机器字长：机器一次能处理(ALU)的二进制位数\\总线宽度：数据总线(DR)一次能并行传输的最大信息位数\\主存容量、存储带宽\\CPU内核数 \end{cases}     \\时间指标 \begin{cases}主频、周期、外频、倍频：主频=外频\times倍频\\ CPI：Clock cycle Per Instruction\\IPC：Instructions Per Clock cycle \\ MIPS(Million Instruction Per Second)\\MFLOPS(MillionFloatingPointOperationPerSeconde)\\ CPU时间:执行某个任务时，CPU实际消耗的时间=CPU时钟周期\times CPI \times 指令条数(全性能公式)\end{cases}       \end{cases}$

$MIPS = IPC\times f=\frac{f}{CPI\times 10^6}???$

$指令执行时间T_e = \frac{指令条数}{MIPS\times 10^6}$

MIPS CPI 越高不代表计算机性能越高

CPI越小则性能越好



## 2.数据表示

### 2.1机器码

真值：用$\pm$表示

$\begin{cases}原码\begin{cases}  定点小数原码\begin{cases} x\quad\quad\quad 0\leq x<1\\1+|x|\quad -1 < x\leq 0  \end{cases}\\定点整数原码 \begin{cases}  x\quad\quad\quad 0\leq x <2^n\\2^n+|x| \quad-2^n<x\leq 0  \end{cases}  \end{cases}\\反码\begin{cases} 定点小数反码\begin{cases} x\quad\quad\quad 0\leq x<1\\(2-2^{-n})+x\quad -1<x\leq0 \end{cases}\\定点整数反码\begin{cases} x\quad\quad\quad0\leq x<2^n\\(2^{n+1}-1)+x\quad-2^n<x\leq0\end{cases} \end{cases}\\补码\begin{cases} 定点小数补码\begin{cases} x\quad\quad\quad0\leq x < 1\\2-|x|\quad-1\leq x<0 \end{cases}\\定点整数补码 \begin{cases}x\quad\quad\quad 0\leq x< 2^n\\2^{n+1}+x \quad -2^n\leq x < 0\end{cases}\end{cases}\\移码:整数移码:2^n+x \end{cases}$

变型补码：2位符号位，左移右移符号位参与运算

补码的模是$2^n$

$变形补码\begin{cases}  00\rightarrow正\\11\rightarrow负\\01\rightarrow正溢出(结果为负)\\10\rightarrow负溢出(结果为正)  \end{cases}$

$原码变移码\begin{cases}  正数:最高位前加1\\负数:全部取反,最高位前加0  \end{cases}$

### 2.2数据类型

$\begin{cases} 定点数\\浮点数(IEEE754)\begin{cases}1位符号S+8位偏指数E+23位有效尾数M\\1位符号S+11位偏指数E+52位有效尾数M \\ E=0, M\neq0\Rightarrow非规划化浮点数(-1)^s\times(0.M)\times2^{(-126)}\\E=1-254\Rightarrow(-1)^s\times(1.M)\times2^{(E-127)}\\E=255,M=0\Rightarrow 无穷大\\ E=255,M\neq0\Rightarrow NaN\end{cases} \end{cases}$

若同时有无符号和带符号整数，将带符号整数强制转6547ty8y7uiyt547换为无符号整数

C90中-2147483648为uint

C99中-2147483648为int

规格化定义:$\frac{1}{2}\leq |M| < 1$

规格化尾数$\begin{cases}   M\geq 0 \rightarrow M=0.1xxxx\\M\lt 0\rightarrow M=1.xxxx   \end{cases}$

浮点数用补码表示，数符与尾数小数点后第一位数字相异则为规格化

$\begin{cases} i = (int)(float)i\times\\i=(int)(double)i\checkmark \end{cases}$

### 2.3数据校验

增大码距

$\begin{cases} 码距\ge e+1\Rightarrow 可检测e个错误\\码距\ge2t+1\Rightarrow可纠正t个错误\\码距\ge e+t+1(e > t)可纠正t个错误,同时检测e个错误 \end{cases}$

有效信息k+校验信息r

#### 2.3.1奇偶校验

最小码距:2

偶校验：异或为0（偶数个1）[异或]

奇校验：异或为1（奇数个1）[异或取反]

可检测一位错

改进奇偶校验(双向奇偶校验)可检验两位错

#### 2.3.2CRC校验（循环冗余校验）

生成多项式

![](https://s2.loli.net/2022/01/23/f5JbKRIt1lzdEW2.png)

$k+r\leq2^r-1$找到最小的r

$G(x)是X^{k+r}+1的因式之一$

发送方

1.将k左移r位

2.将k模2除G(x)，余数作为r

接收方

1.将接受数模2除G(x)得到余数

2.若余数不为0则左移，并继续除G(x)

3.重复2 x次，直到余数为第1位出错的余数， 则为第x位出错

![](https://s2.loli.net/2022/01/23/AZQtHDp2yM356iu.png)

#### 2.3.3海明校验

最小码距:3

$k+r\le2^r-1$

可纠正一位错

海明校验码分布在$2^i$的位置上

![](https://s2.loli.net/2022/01/23/l8saYMhQAcTgx5d.png)

$G_4G_3G_2G_1直接指出了错误的位置$

### 2.4编码

#### 2.4.1ASCii

7bit表示128个

#### 2.4.2GB2312

16bit  = {8bit(区码), 8bit(位码)} + 0xA0A0

94区*94位

编址范围 A1A1~FEFE

包含数字和英文（全角字符：一个字符占两个标准字符位置）

#### 2.4.3Unicode

16bit



## 3.ALU

### 3.1定点数加减法

$[X\pm Y]_补 = [X]_补 + [\pm Y]_补$

$[x]_移+[y]_补=[x+y]_移$

$溢出检测\begin{cases}有符号数\begin{cases} 对符号位进行检测:V=X_fY_f\overline{S_f}+\overline{X_f}\overline{Y_f}S_f          \\对进位进行检测:V = C_n\bigoplus C_{n-1}       \\变形补码:两位符号位  V=X_{f1}\bigoplus X_{f2} \end{cases}        \\无符号数：U=Sub\bigoplus C_{out}\\移码：\begin{cases}X_fY_fS_f+\overline{X_f}\overline{Y_f}\overline{S_f}\\S_{f1}S_{f2}=10\rightarrow上溢,S_{f1}S_{f2}=11\rightarrow下溢\end{cases}\end{cases}$

全加器FA：6T

异或门：3T

#### 3.1.1串行进位加法器

(2n+4)T 

异或溢出检测(2n+6)T

![](https://s2.loli.net/2022/01/23/3NypS7DmJYgdosr.png)
![](https://s2.loli.net/2022/01/23/Av8T1HGpLdyWYb9.png)
![](https://s2.loli.net/2022/01/23/4dQyEF92H7VePo3.png)

#### 3.1.2并行 进位加法器

4位并行（先行）加法器

$\begin{cases} G_i = X_iY_i(进位生成函数)\\P_i=X_i\bigoplus Y_i(进位传递函数)\\S_i=P_i\bigoplus C_i\\C_i =G_i+P_iC_{i-1}     \\ C_4 = G_4+P_4G_3+P_4P_3G_2+P_4P_3P_2G_1+P_4P_3P_2P_1C_0  \\P_4^\ast=P_4P_3P_2P_1\\G_4^\ast=G_4+P_4G_3+P_4P_3G_2+P_4P_3P_2G_1 \end{cases}$

$四位并行加法器\begin{cases}  GP产生电路:3T(异或门3T)/1T(异或门1T)\\先行进位电路(C_0,G_i,P_i\rightarrow C_4  \quad G_i,P_i\rightarrow P^\ast, G^\ast)：2T\\S产生电路(P_i,C_i\rightarrow S_i)：3T(异或门3T)/1T(异或门1T)  \end{cases}$

$C_i = G_i + P_iC_0$

16位加法器(4个并行加法器串联)：14T(异或门3T)/10T(异或门1T)

![](https://s2.loli.net/2022/01/23/l6u7azGfDUoptQ2.png)16位加法器(并行)：12T(异或门3T)/8T(异或门1T)

![](https://s2.loli.net/2022/01/23/mFolV648jJRaeyt.png)

32位并行加法器:14T(异或门3T)/10T(异或门1T)

![](https://s2.loli.net/2022/01/23/8ckhA2TSIaOPDFy.png)

64位并行加法器：16T(异或门3T)/12T(异或门1T)

![](https://s2.loli.net/2022/01/23/bFE6KMsSQowj9Op.png)

![](https://s2.loli.net/2022/01/23/1Jn2vBDQZ3RHYdO.png)

16位并行（先行）加法器

![](https://s2.loli.net/2022/01/23/TZkdxncwLfHzyrE.png)

### 3.2 定点数乘法

#### 3.2.1原码一位乘法

符号位单独参与运算

右移n次，加n次（除去符号位有n位）

![](https://s2.loli.net/2022/01/23/VOSCeYU2piIPDAK.png)

![](https://s2.loli.net/2022/01/23/T3hbgFe7uzpmsSx.png)

$\{\Sigma, Y\}={}<<1$

#### 3.2.2补码一位乘法（Booth算法）

符号位参与运算

部分积使用双符号位

右移n-1次， 加n次(包含符号位有n位)

补上$Y_{n+1}=0$

![](https://s2.loli.net/2022/01/23/5zqTmudcMCIyafZ.png)

![](https://s2.loli.net/2022/01/23/JCog6DsRBtrbn28.png)

![](https://s2.loli.net/2022/01/23/BrHaKdPSCVuzcpJ.png)

#### 3.2.3原码阵列乘法

(3n-4)*6T+T

#### ![](https://s2.loli.net/2022/01/23/HdtJypTPxLAuUmO.png)

(2n-2)*6T+T

![](https://s2.loli.net/2022/01/23/XbUes7dxcy1zBKf.png)

#### 3.2.4补码阵列乘法

![](https://s2.loli.net/2022/01/23/T1R4v7M2paNhlPW.png)

### 3.3定点数除法

#### 3.3.1回复余数发

#### 3.3.2加减交替法

加法计算n+1次

![](https://s2.loli.net/2022/01/23/uPpwWsZ54xcnjmU.png)

![](https://s2.loli.net/2022/01/23/1sbSaJLEfD4XvRO.png)

$R_2为数位值$

#### 3.3.3阵列除法

CAS(可控加减法单元)

P=1时为减法

![](https://s2.loli.net/2022/01/23/1sJXu3xZegHY5ti.png)

![](https://s2.loli.net/2022/01/23/BLzbn1kh9gNFdl4.png)

### 3.4浮点数加减运算

规格化浮点数：最高位与符号位不同

规格化：左移或右移

$\begin{cases} 对阶(小阶对大阶)\\ 尾数加/减 \\ 结果规格化\\ 舍入：0舍1入 \\溢出处理 \end{cases}$

## 4.存储系统

$局部性原理\begin{cases} 时间局部性\\空间局部性 \end{cases}$

哈弗结构：数据和指令分别存放

按边界对齐

$\begin{cases}  双字长末三位为000\\单字长末两位为00\\半字长末一位为0  \end{cases} $

![](https://s2.loli.net/2022/01/23/ld4sV9JRjLmoPYp.png)

$\begin{cases}  大端存放:低位保存在低地址中\\小端存放:低位保存在高地址中  \end{cases}$

### 4.1物理结构

#### 4.1.1SRAM

总是有两个晶体管处于饱和导通状态

总共六管

![](https://s2.loli.net/2022/01/23/GCvf1JdlIWVmXqL.png)

#### 4.1.2 DRAM

读之前需要进行预充刷新

保持的时候需要充电（刷新）

刷新按照行进行（X地址译码线）

$刷新\begin{cases}  集中刷新(存在死区)\\ 分散刷新(效率低                )\\ 异步刷新 \end{cases}$

![](https://s2.loli.net/2022/01/23/reYlt6oxsLFXh82.png)

![](https://s2.loli.net/2022/01/23/ia1gGAzslHET7Qq.png)

#### 4.1.3ROM

EPROM

闪存（EEPROM）

MARM (DRAM一样高容量,SRAM一样高速度)

#### 4.1.4存储扩展

$\begin{cases}  字长扩展(字位扩展)\\字数扩展(字扩展)  \end{cases}$

### 4.2多体交叉存储器

**低位多体交叉**

片选信号放在低位，而不是高位

相邻信息可以同时访问

地址总线和数据总线不相同

### 4.3Cache

cache 地址

![](https://s2.loli.net/2022/01/23/YB6lW4OjGX7o2uI.png)

cache结构

valid: cache中数据是否有效

dirty：主存中数据是否是最新的

![](https://s2.loli.net/2022/01/23/Vxa65uNhMSXLO7k.png)

$cache总容量=cache总行数\times(valid+tag+data)$

$cache容量=cache总行数\times data$

全相联命中率>直接相联命中率

$\begin{cases}时间局部性：当程序访问一个位置时，很有可能在不久的将来再次访问同一个位置\\空间局部性：当程序访问了某个存储单元，在不久之后其附近的存储单元也将被访问\end{cases}$

#### 4.3.1 相联存储器

CAM

通过内容查找，而不是地址查找

![](https://s2.loli.net/2022/01/23/qeoYbzI1D2mypC5.png)

![](https://s2.loli.net/2022/01/23/CtYTqpH9o3LEAPj.png)

#### 4.3.2 全相联

cahce空间利用率高

冲突低

适用于与小容量cache

![](https://s2.loli.net/2022/01/23/S7yXKxfHbs8F6Qt.png)

#### 4.3.3 直接相联

cache利用率低

冲突高

适用于大容量cache

![](https://s2.loli.net/2022/01/23/2urUW4zoVqvi7cL.png)

#### 4.3.4 组相联

$\begin{cases}  1路组相连\rightarrow直接相联\\路组相连\rightarrow全相联  \end{cases}$

2路组相联

![](https://s2.loli.net/2022/01/23/IUJP4gempxDuHO6.png)

#### 4.3.5 替换算法

$\begin{cases}    FIFO:先进先出\\LFU:最不经常使用(淘汰使用次数最少)\\LRU:近期最少使用(淘汰计时值最大)\\随机     \end{cases}$

抖动问题: 降低性能

### 4.4虚拟存储器

MMU(Memory Management Unit)管理虚拟存储器和物理存储器

页表寄存器: 虚拟地址->物理地址

OS维护TLB

TLB(Translation Lookaside Buffer)类似于cache，存放页表项的子集（访问结果为物理页号非物理地址）

![](https://s2.loli.net/2022/01/23/jUougbiG2yhPrnq.png)

RAID(Redundant Arrays of Inexpensive/INdependent Distks)廉价/独立磁盘冗余阵列

磁盘备份

 $\begin{cases}  RAID0\\RAID1\\RAID3/4\\RAID5\\RAID10   \end{cases}$

## 5.指令系统

$指令基本概念\begin{cases}  指令\\指令系统:机器指令集合\\指令字长   \end{cases}$

$指令分类\begin{cases}按照寄存器地址数量 \begin{cases} 三地址指令:OP|A_1|A_2|A_3\quad (A_1)OP(A_2)\rightarrow(A_3)\\二地址指令:OP|A_1|A_2\quad (A_1)OP(A_2)\rightarrow(A_3)\\一地址指令:OP|A_1\quad(AC)OP(A_1)\rightarrow(AC) \\零地址指令   \end{cases}\\按照操作数类型\\按照指令功能\end{cases}$

$寻址方式\begin{cases}\begin{cases} 立即数寻址(快)：不用访问任何存储空间\\寄存器寻址(快)：访问寄存器一次\\ 直接寻址(慢)：需要访问主存一次 \\间接寻址(很慢)：需要访问主存两次 \\寄存器间接寻址(慢)：需要访问寄存器一次主存一次 \end{cases}\\\begin{cases}  相对寻址(慢)：在下条指令PC上进行加减进行访问(注意要加上指令字长)\\基址寻址(慢)\\变址寻址(慢)\end{cases} \end{cases}$

### 5.1MIPS指令

#### 5.1.1指令格式

shamt：位移量 : 2^5 = 32

寻址方式隐藏在操作码中

![](https://s2.loli.net/2022/01/23/5uC3eycxgtm7QvP.png)

![](https://s2.loli.net/2022/01/23/wVM23IJxOCgzWGK.png)

#### 5.1.2寻址方式

访问更大的存储空间、访问更大的数据、方便程序设计、提高指令的执行速度

MIPS只有I型指令访问存储器，寄存器数量多，每类指令需要寻址方式有限

R型 op和funct隐含方式

I,J型 op隐含方式

$\begin{cases} 立即数寻址\\寄存器寻址\\基址寻址(16bit立即数+R_s)\\相对寻址(PC+16bit立即数<<2并符号扩展到32bit)\\伪直接寻址(\{PC高四位，26bit立即数<<2\})  \end{cases}$

R型指令3寄存器

![](https://s2.loli.net/2022/01/23/pDiga92lvTX8Zno.png)

I型指令

![](https://s2.loli.net/2022/01/23/4G1giFkLrE32ZBa.png)

![](https://s2.loli.net/2022/01/23/2HuMyzr3fdEJl4x.png)

slt：如果\$2<\$3则\$1=1否则为0

## 6.中央处理器

$\begin{cases}程序控制\\时序控制\\异常控制\end{cases}$

$\begin{cases}  运算器\\控制器  \end{cases}$

$主要寄存器\begin{cases} PC(ProgramCounter)[必须]\\IR(Instruction Register)\\AR(AddressRegister)\\DR(DataRegister)\\AC(AccumulateCount)\\PSW(Program StatusWord) \end{cases}$

$时钟周期> Clk_{toQ}(触发器时延)+关键路径延迟+SetupTime(建立时延)$

$Clk_{toQ}+最短路径传播>HoldTime(保持时延)$

$数据通路\begin{cases} 共享通路\\专用通路  \end{cases}$

$\begin{cases} 单总线:2个Reg，3个时钟周期\\双总线:1个Reg， 2个周期\\三总线:0个Reg，1个时钟周期  \end{cases}$

$\begin{cases} 时钟周期\\机器周期:CPU周期,从主存读出一条指令的最短时间(M_{IF},M_{ID},M_{EX},M_{WB})\\指令周期:从主存取一条指令并执行的时间\end{cases}$

### 6.1硬布线控制器

$\begin{cases}  传统时序:\begin{cases}M_{if},M_{cal},M_{ex},M_{int}\\T_1,T_2,T_3,T_4\end{cases}\\现代时序：有限状态机 \end{cases}$

### 6.2微指令控制器

$微指令\begin{cases} 操作控制字段\\顺序控制字段\begin{cases} 判别字段\\下址字段 \end{cases}  \end{cases}$

![](https://s2.loli.net/2022/01/23/Im5eFuRPqhWyf18.png)

$压缩微指令\begin{cases} 改为编码表示压缩互斥性微指令(注意考虑全0情况)\\去掉下址字段\\改水平型微指令为垂直型微指令  \end{cases}$

## 7.中断

$中断\begin{cases} 内部中断\begin{cases} 软件中断\\异常\begin{cases}故障\\陷阱\\终止\end{cases}\end{cases}\\外部中断\begin{cases} 可屏蔽中断INTR\\不可屏蔽中断NMI\end{cases} \end{cases}$

中断屏蔽: 1->屏蔽

中断响应周期：CPU执行完一条指令

中断处理：保存现场（关闭中断），执行中断服务程序，返回断点

$\begin{cases}CLI：关中断\\STI：开中断\end{cases}$

$\begin{cases}  中断请求\\中断响应\\保护断点和现场\\中断处理\\中断返回 \end{cases}$

$中断处理\begin{cases}\begin{cases}关中断\\保存断点\\中断源识别\\保护现场\end{cases} \\ \begin{cases}中断服务\end{cases}\\ \begin{cases}恢复现场\\开中断\\中断返回\end{cases}\end{cases}$

