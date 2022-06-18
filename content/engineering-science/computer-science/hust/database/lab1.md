---
title: "[华科]数据库实验1"
description: "华中科技大学 数据库实验1"
date: 2021-05-09
image: https://s2.loli.net/2022/05/21/xBCITtd3PXU2gih.jpg
---



# Lab 1

## 1

```sql
create database covid19mon;
```



## 2

```sql
drop database if exists covid19mon;
create database if not exists covid19mon;
use covid19mon;
```



### 表1 人员表(person)

| 字段名称  | 数据类型 | 备注                                   |
| --------- | -------- | -------------------------------------- |
| id        | int      | 人员编号,主码,主码约束名为pk_person    |
| fullname  | char(20) | 姓名，不可空                           |
| telephone | char(11) | 手机号码，不可空。自己无号，填近亲属的 |

```sql

create table person(id int not null,fullname char(20) not null,telephone char(11) not null,constraint pk_person primary key (id)
);
```

### 表2 地点表(location)

| 字段名称      | 数据类型 | 备注                                  |
| ------------- | -------- | ------------------------------------- |
| id            | int      | 地点编号,主码,主码约束名为pk_location |
| location_name | char(20) | 地点名称，不可空                      |

```sql
create table location(id int not null, location_name char(20) not null, constraint pk_location primary key (id));
```



### 表3 行程表（itinerary）

| 字段名称 | 备注                                          | 数据类型 |
| -------- | --------------------------------------------- | -------- |
| id       | 行程编号,主码,主码约束名为pk_itinerary        | int      |
| p_id     | 人员编号,外码,外码约束名为fk_itinerary_pid    | int      |
| loc_id   | 所在地点编号，外码,外码约束为fk_itinerary_lid | int      |
| s_time   | 到达该地点的时间                              | datetime |
| e_time   | 离开该地点的时间                              | datetime |

```sql
create table itinerary(id int not null, p_id int ,loc_id int, s_time datetime, e_time datetime, constraint pk_itinerary primary key (id), constraint fk_itinerary_pid foreign key(p_id) references person(id), constraint fk_itinerary_lid foreign key (loc_id) references location(id));
```



### 表4 诊断表（diagnose_record）

| 字段名称      | 数据类型s | 备注                                          |
| ------------- | --------- | --------------------------------------------- |
| id            | int       | 诊断编号,主码,主码约束为pk_diagnose_record    |
| p_id          | int       | 人员编号,外码,外码约束名为fk_diagnose_pid     |
| diagnose_date | datetime  | 诊断日期                                      |
| result        | int       | 诊断结果。1：新冠确诊;2：无症状感染者;3：正常 |

```sql
create table diagnose_record(id int not null, p_id int, diagnose_date datetime, result int, constraint pk_diagnose_record primary key (id), constraint fk_diagnose_pid foreign key (p_id) references person(id), check(result > 0 and result < 4));
```



### 表5 密切接触者表（close_contact）

| 字段名称     | 数据类型 | 备注                                             |
| ------------ | -------- | ------------------------------------------------ |
| id           | int      | 密切接触编号,主码,主码约束名为pk_close_contact   |
| p_id         | int      | 被接触人员编号,外码,外码约束名为fk_contact_pid   |
| contact_date | datetime | 接触日期                                         |
| loc_id       | int      | 接触地点编号，外码,外码约束名为fk_contact_lid    |
| case_p_id    | int      | 病例人员编号。外码,外码约束名为fk_contact_caseid |

```sql
create table close_contact(id int not null, p_id int, contact_date datetime, loc_id int, case_p_id int, constraint pk_close_contact primary key (id), constraint fk_contact_pid foreign key(p_id) references person(id), constraint fk_contact_lid foreign key(loc_id) references location(id), constraint fk_contact_caseid foreign key(case_p_id) references person(id));
```



### 表6 隔离表（isolation_record）

| 字段名称    | 数据类型 | 备注                                             |
| ----------- | -------- | ------------------------------------------------ |
| id          | int      | 隔离编号,主码，主码约束名为pk_isolation          |
| p_id        | int      | 被隔离人员编号,外码,外码约束名为fk_isolation_pid |
| s_date      | datetime | 开始隔离日期                                     |
| e_date      | datetime | 结束隔离日期                                     |
| isol_loc_id | int      | 隔离地点编号，外码,外码约束名为fk_isolation_lid  |
| state       | int      | 隔离状态：1：正在隔离 2：隔离结束 3：转入医院    |

注意：这里的隔离地点编号对应的是隔离地点表的地点编号，而不是地点表的地点编号。

```sql
create table isolation_record(id int not null, p_id int, s_date datetime, e_date datetime, isol_loc_id int, state int, constraint pk_isolation primary key(id), constraint fk_isolation_pid foreign key(p_id) references person(id), check(state>0 and state<4));
```



### 表7 隔离地点表（isolation_location）

| 字段名称      | 数据类型 | 备注                                           |
| ------------- | -------- | ---------------------------------------------- |
| id            | int      | 隔离地点编号,主码,主码约束名为pk_isolation_loc |
| location_name | char(20) | 隔离地点名                                     |
| capacity      | int      | 房间容量                                       |

```sql
create table isolation_location(id int not null, location_name char(20), capacity int, constraint pk_isolation_loc primary key(id));
```





```sql
alter table isolation_record add constraint fk_isolation_lid foreign key(isol_loc_id) references isolation_location(id);
```

