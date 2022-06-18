---
title: "[华科]数据库实验5"
description: "华中科技大学 数据库实验5"
date: 2021-06-06
image: https://s2.loli.net/2022/05/21/xBCITtd3PXU2gih.jpg
---



# Lab5



本关任务： (1)编写一个依据人员编号计算其到达所有地点的次数(即行程表中的记录数)的自定义函数，同一人员到达同一地点多次，去几次算几次。 (2)并利用其查询至少有3条行程记录的人员。



为了完成本关任务，你需要掌握： (1)create function语句的语法； (2)使用自己创建的函数； (3)函数体可能用到的其它语句。



函数其实有多种，比如标量函数(仅返回一个值)和表函数(返回结果是表),语法也各不相同。这里，我们仅给出一个简化的创建标量函数的语法。这个简化的语法同时适用于SQL Server和MySQL。

create function语句的语法：

create function function_name([para data_type[,…]]) returns data_type begin    function_body;    return expression;  end

- function_name:函数名；
- para:参数名；
- data_type:参数的数据类型；
- 一个函数可以没有参数，也可以有多个。多参数间用逗号分隔。
- function_body:函数体。即由合法的SQL语句组成的程序段。
- expression:函数返回值，可以是常量、表达式，甚至是一条select语句查询的值（必须保证结果唯一);该值类型应与returns短语定义的类型相同。

函数一旦定义，就可以像内部函数一样使用，比如出现在select列表、表达式、以及where子句的条件中。



(1)用create function语句创建符合以下要求的函数：

- 依据人员编号计算其到达所有地点的次数(即行程表中的记录数)。
- 函数名为：Count_Records。函数的参数名可以自己命名

(2) 利用创建的函数，仅用一条SQL语句查询在行程表中至少有3条行程记录的人员信息，查询结果依人员编号排序。

友情提醒：当前你处于MySQL环境下。



评测程序将执行你的代码段创建函数，并执行查询，然后看执行结果与预期的结果是否一致。评测程序附加有别的语句，直接调用该函数。所以，即使你的SQL语句没有使用该函数也查询出了正确结果，仍不会通过评测。

如果你第一次评测没有通过，请记得在下次评测前，drop掉先前创建的函数。但请你确认你真的创建成功了这个函数，只是该函数运行的结果不符合预期，你需要修改后重新创建。如果这个函数根本没创建成功，你的drop语句会抛出异常，致使程序停止运行。我给你的建议是： (1) MySQL可以使用drop function IF EXISTS function_name; (2) SQL Server可以直接将create关键词改成alter，修改函数的定义（前提仍是该函数已创建，只是没有达到预期效果。如果没有创建成功，则保留关键词create不变，修订错误语句后，重新提交即可 ）。

```sql
delimiter $
create function Count_Records(pid int) returns int 
begin
declare x int;
select count(*) from itinerary where p_id=pid into x;
return x;
end$
delimiter ;

select * from person where Count_Records(id)>=3 order by id;
```

$\checkmark$

