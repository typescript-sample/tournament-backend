create table users
(
    id character varying(40) not null,
    username character varying(120),
    email character varying(120),
    phone character varying(45),
    date_of_birth timestamp with time zone,
    interests character varying[],
    skills jsonb[],
    achievements jsonb[],
    settings jsonb,
    constraint users_pkey primary key (id)
);
create extension pg_trgm;
create extension btree_gin;
create index users_interests_idx on users (interests);
create index users_skills_idx on users using gin (skills);

-- search varying[]
select * from users where interests && '{"Photography"}';

-- search jsonb
SELECT * from users WHERE settings @> '{"language":"Spanish"}';
select * from users where settings @> '{ "language": "France" }';

-- search jsonb[]
select * from users where '{"skill":"Java","hirable": true}' <@ ANY(skills) or '{"skill":"Nodejs"}' <@ ANY(skills);

-- search multiple fields
select * from users where interests && '{"Photography"}' and settings @> '{ "language": "France" }' and ('{ "subject": "test3", "description": "tesssssssssss" }' <@ ANY(achievements)) and ('{ "skill": "React", "hirable": true }' <@ ANY(skills) or '{"skill":"Nodejs"}' <@ ANY(skills));

insert into users (id, username, email, phone, date_of_birth, interests, skills, achievements, settings) values ('ironman', 'tony.stark', 'tony.stark@gmail.com', '0987654321', '1963-03-25', '{Photography,Football}', '{"{\"skill\": \"Java\", \"hirable\": true}"}', '{"{\"subject\": \"test3\", \"description\": \"tesssssssssss\"}"}', '{"language": "English", "dateFormat": "dd/mm/yyyy", "timeFormat": "hh:mm:ss", "notification": true, "dateTimeFormat": "dd-mm-yyyy:hh:mm"}');
insert into users (id, username, email, phone, date_of_birth, interests, skills, achievements, settings) values ('spiderman', 'peter.parker', 'peter.parker@gmail.com', '0987654321', '1962-08-25', '{Photography,Football}', '{"{\"skill\": \"Nodejs\", \"hirable\": false}"}', '{"{\"subject\": \"test2\", \"description\": \"tesssssssssss\"}"}', '{"language": "Spanish","dateFormat": "dd/mm/yyyy","timeFormat": "hh:mm:ss","notification": true,"dateTimeFormat": "dd-mm-yyyy:hh:mm"}');
insert into users (id, username, email, phone, date_of_birth, interests, skills, achievements, settings) values ('wolverine', 'james.howlett', 'james.howlett@gmail.com', '0987654321', '1974-11-16', '{Basketball,Football}', '{"{\"skill\": \"React\", \"hirable\": true}"}', '{"{\"subject\": \"test3\", \"description\": \"tesssssssssss\"}"}', '{"language": "France","dateFormat": "dd/mm/yyyy","timeFormat": "hh:mm:ss","notification": true,"dateTimeFormat": "dd-mm-yyyy:hh:mm"}');
insert into users (id, username, email, phone, date_of_birth, interests, skills, achievements, settings) values ('ironman1', 'tony.stark', 'tony.stark@gmail.com', '0987654321', '1963-03-25', '{Photography,Football}', '{"{\"skill\": \"Angular\", \"hirable\": false}"}', '{"{\"subject\": \"test4\", \"description\": \"tesssssssssss\"}"}', '{"language": "Spanish","dateFormat": "dd/mm/yyyy","timeFormat": "hh:mm:ss","notification": true,"dateTimeFormat": "dd-mm-yyyy:hh:mm"}');
insert into users (id, username, email, phone, date_of_birth, interests, skills, achievements, settings) values ('wolverine1', 'james.howlett', 'james.howlett@gmail.com', '0987654321', '1974-11-16', '{Basketball,Playgame}', '{"{\"skill\": \"Nodejs\", \"hirable\": false}","{\"skill\": \"React\", \"hirable\": false}"}','{"{\"subject\": \"test2\", \"description\": \"tesssssssssss\"}"}', '{"language": "Spanish","dateFormat": "dd/mm/yyyy","timeFormat": "hh:mm:ss","notification": true,"dateTimeFormat": "dd-mm-yyyy:hh:mm"}');


create table touraments
(
    id character varying(40) not null,
    name character varying(120),
    description character varying(120),
    startDate character varying(45),
    endDate character varying(45),
    kind character varying(40),
    status character varying(40),
    leagueId character varying (40),
    constraint touraments_pkey primary key (id)


);


create table leagues
(
    id character varying(40) not null,
    name character varying(120),
    description character varying(120),
    status character varying(40),
    constraint leagues_pkey primary key (id)
);


insert into touraments (id, name, email, phone, date_of_birth, interests, skills, achievements, settings) values ('ironman', 'tony.stark', 'tony.stark@gmail.com', '0987654321', '1963-03-25', '{Photography,Football}', '{"{\"skill\": \"Java\", \"hirable\": true}"}', '{"{\"subject\": \"test3\", \"description\": \"tesssssssssss\"}"}', '{"language": "English", "dateFormat": "dd/mm/yyyy", "timeFormat": "hh:mm:ss", "notification": true, "dateTimeFormat": "dd-mm-yyyy:hh:mm"}');

create table teams(
    id character varying(40) not null,
    name character varying(120),
    logo character varying(200),
    status character varying(120),
    description character varying(120),
    constraint teams_pkey primary key (id)
);

insert into teams (id, name, status, description,logo) values ('001','VTV Bình Điền Long An','A','bảng A','https://www.pioneeragrobiz.com/wp-content/uploads/2020/06/BFC-300x300.jpg');
insert into teams (id, name, status, description,logo) values ('002','Ngân hàng Công thương','I','bảng A','https://media.loveitopcdn.com/3807/logo-viettinbank-1.png');
insert into teams (id, name, status, description,logo) values ('003','Than Quảng Ninh','A','bảng B','https://upload.wikimedia.org/wikipedia/vi/thumb/a/a0/Logo_CLB_Than_Qu%E1%BA%A3ng_Ninh.svg/206px-Logo_CLB_Than_Qu%E1%BA%A3ng_Ninh.svg.png');

create table players(
    id character varying(40) not null,
    name character varying(120),
    dateOfBirth timestamp without time zone,
    constraint players_pkey primary key (id)
);

insert into players (id, name, dateOfBirth) values ('0001','Đặng Thị Kim Thanh','1999-03-28');
insert into players (id, name, dateOfBirth) values ('0002','Trần Thị Thanh Thúy','1997-11-12');
insert into players (id, name, dateOfBirth) values ('0003','Trần Thị Tuyết Hoa','1991-04-14');
insert into players (id, name, dateOfBirth) values ('0004','Huỳnh Thị Hồng Nhung','1994-07-04');


create table match (
    id character varying(40) not null,
    touramentid character varying(40),
    round character varying(40),
    team1 character varying(120),
    team2 character varying(120),
    score1 integer DEFAULT 0,
    score2 integer DEFAULT 0,
    time timestamp with time zone
); 

insert into match (id, touramentid, round, team1, team2, score1, core2, time) values ('01','ironman','01','VTV Bình Điền Long An','Ngân hàng Công thương',2,1,'2022-06-22');