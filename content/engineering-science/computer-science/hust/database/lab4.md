---
title: "[华科]数据库实验4"
description: "华中科技大学 数据库实验4"
date: 2021-05-19
image: https://s2.loli.net/2022/05/21/xBCITtd3PXU2gih.jpg
---



# Lab4

## 1

隔离点的人员一旦确诊“新冠”后，将被转入医院，请 编写一个触发器，用于实现以下完整性控制规则： 当隔离表（isolation_record）中的某位隔离人员在诊断表（diagnose_record）中的诊断结果（result）为1(新冠确诊)”时，自动将隔离表中的隔离状态（state)改成3（转入医院）。



为了完成本关任务，你需要掌握： 对你所使用的DBMS的流程控制语句非常熟悉，包括但不限于以下内容： 

(1)变量申明语句(如declare)； 

(2)赋值语句（直接赋值，或用select查询的结果赋值）；

(3)if语句； 

(4)while语句； 

(5)触发器生存期内的特殊表：

- old和new(for MySQL, Oracle, DB2等)
- deleted和inserted(for SQL Server )

(6)create trigger语句的语法；

 (7)触发的时机：before ,after等； 

(8)触发事件：insert,delete,update。

请注意，以上每项内容，在不同的DBMS中都有区别，比如： (1) create trigger 语句的语法格式不同；

(2) SQL Server有instead of触发器，但MySQL没有；  MySQL有before触发器，但SQL Server没有。两者触发的时机虽然相同,都是在触发该触发器的那条语句(insert,delete,update)执行之前执行。但区别是：instead of触发器取代触发它的那条语句，而触发该触发器的那条语句本身并不执行。但before触发器执行完后，触发该触发器的语句本身会执行； 

(3) SQL Server一次可以定义多个事件(insert,delete,upate三者的任意组合)驱动的触发器，但MySQL一次只能定义一个事件(insert,delte,update三选一)驱动的触发器。这意味着，如果你希望多个事件均触发完整性检查，你得创建多个触发器。

(4) 触发器生存周期内的特殊表名不同。

(5) SQL Server不允许在触发器内修改inserted或updated表的内容。但MySQL的before触发器允许修改new表的内容。比如，当发现insert或update后的数据明显错误时，可以通过修改new表的内容纠正这一错误。但我们并不建议你这么做，一个更好的方法是：拒绝插入和修改，并提示错误原因。

(6) SQL Server的create trigger语句必须是批处理中的第一条语句，即它之前不允许有别的语句，否则这条create trigger语句将不会执行。请在create trigger语句前，写一条GO语句，使前面的语句全部执行完。这样，create trigger语句自然成为下一批语句的第一条。 (7) MySQL虽然允许你随时定义触发器，但要求你用“DELIMITER 界符”语句指定触发器定义语句的界符（即结束符)。我们推荐你使用“;;”(即两个连续的分号)作触发器定义语句的界符。请在触发器定义结束后重新指定语句的界符(恢复为单个分号)。

总之，我们建议你认真阅读你所使用的DBMS的官方手册，然后再动手编写触发器，它的主体是一段程序。所以，你务必掌握该语言的各类语句，以及create trigger语句本身。



用create trigger语句创建符合任务要求的触发器（触发器名称自已命名）： 当隔离表（isolation_record）中的某位隔离人员在诊断表（diagnose_record）中的诊断结果（result）为1(新冠确诊)”时，自动将隔离表中的隔离状态（state)改成3（转入医院）。

首先，请考虑清楚触发器应该建在哪个表上； 其次，请考虑触发器执行的时机； 接着，考虑什么事件(insert,update,delete)触发这个触发器运行； 最后，正确创建触发器。

提醒：当前你处于MySQL环境下。



评测程序将执行你的语句创建触发器，然后对相关表执行insert，update操作，来触发你定义的触发器，然后查看预期的结果有没有发生。如果执行insert或update语句后，发生的结果与预期结果一致即过关。

如果你第一次评测没有通过，请记得在下次评测前，drop掉先前创建的触发器。

```sql
drop trigger if exists fuckyou;
drop trigger if exists fuckyoudoubletime;
delimiter $
create trigger fuckyou 
before insert
on diagnose_record 
for each row 
begin 
update isolation_record set state=3 where isolation_record.p_id=NEW.p_id and NEW.result=1;
end$
delimiter ;
delimiter $
create trigger fuckyoudoubletime
before update
on diagnose_record 
for each row 
begin 
update isolation_record set state=3 where isolation_record.p_id=NEW.p_id and NEW.result=1;
end$
delimiter ;
```

