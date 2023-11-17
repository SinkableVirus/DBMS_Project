CREATE DATABASE  IF NOT EXISTS `blood_bank` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `blood_bank`;
-- drop database blood_bank;
SET SQL_SAFE_UPDATES = 0;

-- Create the Patient table
CREATE TABLE Patient (
    patient_id INT PRIMARY KEY auto_increment,
    patient_name VARCHAR(25),
    patient_password varchar(20)
);



-- Create the Donor table
CREATE TABLE Donor (
    donor_id INT PRIMARY KEY auto_increment,
    donor_name varchar(20),
    Blood_Type VARCHAR(255),
    Blood_Amount DECIMAL(10, 2),
    donor_password varchar(20)
);





-- Create the Blood_Bank table
CREATE TABLE Blood_Bank (
    blood_bank_id INT PRIMARY KEY,
    blood_bank_name VARCHAR(25)
    
);



-- Create the Hospital table
CREATE TABLE Hospital (
    hospitalid INT PRIMARY KEY,
    hospital_name VARCHAR(255),
    location VARCHAR(255)
);

-- Create the Order table
CREATE TABLE Order_table (
    order_id INT PRIMARY KEY auto_increment,
    Blood_type VARCHAR(255),
    Blood_amount DECIMAL(10, 2),
    price int,
    order_time datetime,
    status int
);

-- Create the Admin table
CREATE TABLE Admin (
    admin_Id INT PRIMARY KEY auto_increment,
    admin_name VARCHAR(25),
    hospital_id INT,
    admin_password varchar(20),
    FOREIGN KEY (hospital_id) REFERENCES Hospital(hospitalid)
);

-- Create the Manages table
CREATE TABLE Manages (
    blood_bank_id INT,
    hospital_id INT,
    PRIMARY KEY (blood_bank_id, hospital_id),
    FOREIGN KEY (blood_bank_id) REFERENCES Blood_Bank(blood_bank_id),
    FOREIGN KEY (hospital_id) REFERENCES Hospital(hospitalid)
);



-- Create the Purchase table
CREATE TABLE Purchase (
    patient_id INT ,
    hospital_id INT ,
    order_id INT ,
    primary key(patient_id,hospital_id,order_id),
    foreign key (patient_id) references Patient(patient_id),
    foreign key (order_id) references order_table(order_id)
    
);






-- Create the Sells table to represent the relationship between blood banks and donors
CREATE TABLE Sells (
    blood_bank_id INT,
    donor_id INT,
    PRIMARY KEY (blood_bank_id, donor_id),
    FOREIGN KEY (blood_bank_id) REFERENCES Blood_Bank(blood_bank_id),
    FOREIGN KEY (donor_id) REFERENCES Donor(donor_id) on delete cascade
);

create table blood(
	blood_type varchar(5) primary key,
    blood_amount DECIMAL(10, 2)
);
insert into blood values("A+",0.00),("A-",0.00),("B+",0.00),("B-",0.00),("AB+",0.00),("AB-",0.00),("O+",0.00),("O-",0.00);


-- Create the stored procedure for updating blood on insert
DELIMITER //
CREATE PROCEDURE UpdateBloodAmountOnInsert(IN newBloodAmount DECIMAL(10, 2), IN newBloodType VARCHAR(255))
BEGIN
    UPDATE blood
    SET blood_amount = blood_amount + newBloodAmount
    WHERE blood_type = newBloodType;
END;
//
DELIMITER ;

-- Create the stored procedure for updating blood on delete
DELIMITER //
CREATE PROCEDURE UpdateBloodAmountOnDelete(IN oldBloodAmount DECIMAL(10, 2), IN oldBloodType VARCHAR(255))
BEGIN
    UPDATE blood
    SET blood_amount = blood_amount - oldBloodAmount
    WHERE blood_type = oldBloodType;
END;
//
DELIMITER ;

-- Create the AFTER INSERT trigger
DELIMITER //
CREATE TRIGGER after_donor_insert
AFTER INSERT
ON Donor FOR EACH ROW
BEGIN
    CALL UpdateBloodAmountOnInsert(NEW.Blood_Amount, NEW.Blood_Type);
END;
//
DELIMITER ;

-- Create the BEFORE DELETE trigger
DELIMITER //
CREATE TRIGGER before_donor_delete
BEFORE DELETE
ON Donor FOR EACH ROW
BEGIN
    CALL UpdateBloodAmountOnDelete(OLD.Blood_Amount, OLD.Blood_Type);
END;
//
DELIMITER ;


insert into hospital values(1,"xyz","Baker Street");
insert into admin (admin_name,hospital_id,admin_password) value ('srini',1,"4203");
insert into blood_bank values(1,"abc");
insert into blood_bank values(2,"def");
INSERT INTO Donor (donor_name, blood_type, blood_amount, donor_password) VALUES ('a', 'A+', 5.00, '1234');
INSERT INTO Donor (donor_name, blood_type, blood_amount, donor_password) VALUES ('b', 'AB+', 2.00, '5678');
INSERT INTO Donor (donor_name, blood_type, blood_amount, donor_password) VALUES ('c', 'AB+', 5.00, '7891');
INSERT INTO Donor (donor_name, blood_type, blood_amount, donor_password) VALUES ('d', 'B-', 5.00, '4684');

insert into sells values(1,1);
insert into sells values(1,2);
insert into sells values(1,3);
insert into sells values(2,4);


insert into patient (patient_name,patient_password) VALUES ('g','5742');
insert into order_table ( blood_type, blood_amount, price,order_time,status) values ( 'A+', 5.00, 500,now(),0);
insert into purchase values(1,1,1);

insert into patient (patient_name, patient_password) VALUES ('x','1982');
insert into order_table ( blood_type, blood_amount,price,order_time,status) values ( 'AB+', 2.00, 200,now(),1);
insert into purchase values(2,1,2);

insert into patient (patient_name, patient_password) VALUES ('y',  '5684');
insert into order_table ( blood_type, blood_amount,price,order_time,status) values ('A+', 6.00,600,now(),0);
insert into purchase values(3,1,3);





select * from blood;

delete from donor where donor_id=5;

UPDATE blood AS b
JOIN (
	SELECT blood_type, SUM(blood_amount) AS total_blood_amount
	FROM Donor
	GROUP BY blood_type
) AS d
ON b.blood_type = d.blood_type
SET b.blood_amount = d.total_blood_amount;

SELECT blood_type, SUM(blood_amount) AS total_blood_amount
FROM Donor
GROUP BY blood_type;

drop schema blood_bank;
drop table blood;


UPDATE blood AS b
JOIN (
    SELECT blood_type, SUM(blood_amount) AS total_blood_amount
    FROM Donor
    GROUP BY blood_type
) AS d
ON b.blood_type = d.blood_type
SET b.blood_amount = b.blood_amount + d.total_blood_amount;






update order_table set status=0 where order_id=1;

insert into admin (admin_name,hospital_id,admin_password) value ('srini',1,"4203");

delete from donor where donor_id=1;

select * from patient;
select * from purchase;
select * from order_table;
select * from hospital;
select * from sells;
select * from donor;
select * from blood_bank;
select * from admin;
select * from blood;

select order_id,patient_name,blood_type,blood_type,blood_amount,price,status from patient natural join purchase natural join order_table;

select * from donor natural join sells natural join blood_bank;

SELECT * FROM Donor
INNER JOIN Sells ON Donor.donor_id = Sells.donor_id
INNER JOIN Blood_Bank ON Sells.blood_bank_id = Blood_Bank.blood_bank_id;



SELECT blood_type,sum(blood_amount) as quantity,blood_bank_name FROM Donor
INNER JOIN Sells ON Donor.donor_id = Sells.donor_id
INNER JOIN Blood_Bank ON Sells.blood_bank_id = Blood_Bank.blood_bank_id
group by blood_type, blood_bank_name;

select * from patient where patient_name="g" and patient_password=5742;


