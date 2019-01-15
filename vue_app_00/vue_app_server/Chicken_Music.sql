# 丢弃指定的数据库，如果存在的话
DROP DATABASE IF EXISTS Chicken_Music;
# 创建数据库 Chicken_Music
CREATE DATABASE Chicken_Music;
# 进入创建好的数据库 Chicken_Music
USE Chicken_Music;
# 创建用户数据表
CREATE TABLE Chicken_user(
    Mid  INT(11)  AUTO_INCREMENT 
)