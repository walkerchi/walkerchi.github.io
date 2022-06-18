---
title: "[华科]数据库实验2"
description: "华中科技大学 数据库实验2"
date: 2021-05-09
image: https://s2.loli.net/2022/05/21/xBCITtd3PXU2gih.jpg
---



# Lab2

## 1

任务描述
本关任务：练习insert语句,向人员表person插入数据。
这是上关建立的人员表，其结构如下：

表1 人员表(person)

| 字段名称  | 数据类型 | 备注                                   |
| --------- | -------- | -------------------------------------- |
| id        | int      | 人员编号,主码,主码约束名为pk_person    |
| fullname  | char(20) | 姓名，不可空                           |
| telephone | char(11) | 手机号码，不可空。自己无号，填近亲属的 |

编程要求
向人员表插入以下3条数据:

| id   | fullname | telephone   |
| ---- | -------- | ----------- |
| 1    | 张小敏   | 13907110001 |
| 2    | 李大锤   | 18907110002 |
| 3    | 孙二娘   | 13307100003 |

用一条insert语句，或用三条insert语句完成，都可以。请不要另外插入其它数据，确保表中仅有这三条语句，以免影响评测结果。

```sql
insert into person (id, fullname, telephone) values (1,"张小敏",13907110001),(2,"李大锤",18907110002),(3,"孙二娘",13307100003);
```



## 2

本关任务：删除前一关中插入的人员编号为2，姓名为’李大锤’的这条数据。

```sql
delete from person where fullname="李大锤";
```



## 3

将姓名为“张小敏”,人员编号为1的电话号码改为13607176668。

```sql
update person set telephone=13607176668 where fullname="张小敏";
```

