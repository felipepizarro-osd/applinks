create database database_links;

use database_links;

create table users (
    id int(11) not null primary key auto_increment,
    username varchar(16) not null,
    pass varchar(60) not null,
    fullname varchar(100) not null

);

create table links (
    id int (11) not null,
    title varchar(150) not null,
    url varchar(255) not null,
    description text,
    user_id int(11),
    create_at timestamp not null default current_timestamp,
    constraint fk_user foreign key (user_id) references users(id)
);
alter table links 
    add primary key id;

alter table links modify id int(11) not null auto_increment;