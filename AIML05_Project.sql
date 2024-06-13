use aiml_05;

create table gym_member(
member_id int auto_increment primary key,
member_gender varchar(20),
member_name varchar(50),
member_phone varchar(10),
member_age int ,
member_city varchar(200),
member_image blob,
encoding json
);

-- alter table TABLE_NAME add column NEW_COLUMN_NAME varchar(255) not null after COLUMN_NAME;
alter table gym_member add column member_image blob NOT null;
alter table gym_member rename column member_address to member_city;
alter table gym_member add primary key(member_id);
ALTER TABLE gym_member MODIFY member_id INT AUTO_INCREMENT;
ALTER TABLE gym_member MODIFY member_id INT AUTO_INCREMENT PRIMARY KEY;
ALTER TABLE gym_member MODIFY member_name VARCHAR(100) NOT NULL;
ALTER TABLE gym_member MODIFY member_gender VARCHAR(100) NULL;
ALTER TABLE gym_member MODIFY member_phone VARCHAR(100) NOT NULL;
ALTER TABLE gym_member MODIFY member_age VARCHAR(100) NOT NULL;
ALTER TABLE gym_member MODIFY member_city VARCHAR(100) NULL;
alter table gym_member modify column member_phone varchar(10);
ALTER TABLE gym_member ADD encoding JSON;
update gym_member set member_phone = '0922222222' where member_id = 2;
desc gym_member;
select * from gym_member;
select member_image from gym_member;


insert into  gym_member
(member_id,member_gender,member_name,member_phone,member_age,member_city)
values
(1,'male','wally',0911111111,66,'taipei');
insert into  gym_member
(member_id,member_gender,member_name,member_phone,member_age,member_city)
values
(2,'male','john',0922222222,55,'new taipei');



-- CREATE USER 'WALLY'@'localhost' IDENTIFIED BY 'P@ssw0rd';
-- GRANT ALL PRIVILEGES ON *.* TO 'WALLY'@'localhost';
-- FLUSH PRIVILEGES;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'P@ssw0rd';
SELECT user,authentication_string,plugin,host FROM mysql.user;
SHOW databases;

create table gym_coach(
coach_id int auto_increment primary key,
coach_gender varchar(20),
coach_name varchar(50),
coach_age int
);

desc gym_coach;

create table gym_login(
gym_account varchar(10),
gym_password varchar(16)
);
desc gym_login;
select * from gym_login;
alter table gym_login modify gym_account varchar(10) not null;
alter table gym_login modify gym_password varchar(16) not null;
insert into gym_login
(gym_account,gym_password)
values
(1234554321,9999988888);
ALTER TABLE gym_login
ADD COLUMN member_id int FIRST, -- 將 member_id 欄位置於表格最前面
ADD CONSTRAINT fk_member_id -- 添加外鍵約束
FOREIGN KEY (member_id) REFERENCES gym_member(member_id);
SHOW CREATE TABLE gym_login;
