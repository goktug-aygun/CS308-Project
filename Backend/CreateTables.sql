#Used AWS Relational Database Service to host our SQL database
    
#host: 'aws-cs308.c5gk4os06v5f.eu-north-1.rds.amazonaws.com',
#port:'3306',
#user: 'admin',
#password: 'cs308project',
#database: 'CS308_MAIN_SQL_DATABASE'

CREATE DATABASE CS308_MAIN_SQL_DATABASE;
USE CS308_MAIN_SQL_DATABASE;

CREATE TABLE Pilots(
    pilot_id    VARCHAR(8) NOT NULL,
    name        VARCHAR(20) NOT NULL,
    age         INT NOT NULL,
    gender      VARCHAR(1) NOT NULL, #M,F
    nationality VARCHAR(20) NOT NULL,
    #known languages are given in table "PilotsKnownLanguages"
    sen_level   VARCHAR(1) NOT NULL,  #t,j,s
    veh_rest    INT NOT NULL,  #1,2,3,4
    max_range   INT NOT NULL,
    email       VARCHAR(100) NOT NULL,
    PRIMARY KEY (pilot_id)
);

CREATE TABLE PilotsKnownLanguages(
    pilot_id VARCHAR(8) NOT NULL,
    language VARCHAR(20) NOT NULL,
    FOREIGN KEY (pilot_id) REFERENCES Pilots(pilot_id),
    PRIMARY KEY (pilot_id, language)
);

CREATE TABLE CrewMembers(
    crew_id     VARCHAR(8) NOT NULL,
    name        VARCHAR(20) NOT NULL,
    age         INT NOT NULL,
    gender      VARCHAR(1) NOT NULL,
    nationality VARCHAR(20) NOT NULL,
    #known languages will be given in table "CrewKnownLanguages"
    att_type    VARCHAR(1) NOT NULL,  #s,j,c
    veh_rest    INT NOT NULL,  #1,2,3,4
    max_range   INT NOT NULL,
    PRIMARY KEY (crew_id)
);

CREATE TABLE CrewKnownLanguages(
    crew_id     VARCHAR(8) NOT NULL,
    language    VARCHAR(20) NOT NULL,
    FOREIGN KEY (crew_id) REFERENCES CrewMembers(crew_id),
    PRIMARY KEY (crew_id, language)
);

CREATE TABLE Locations(
    country_name VARCHAR(20) NOT NULL,
    city_name    VARCHAR(20) NOT NULL,
    airport_name VARCHAR(50) NOT NULL,
    airport_code VARCHAR(3)  NOT NULL,
    PRIMARY KEY (airport_code)
);

CREATE TABLE Planes(
    plane_id    VARCHAR(6) NOT NULL,
    type        VARCHAR(20) NOT NULL,  #airbus a380
    level       VARCHAR(1) NOT NULL,  #a,b,c,d
    passengerCapacity INT NOT NULL,
    crewCapacity INT NOT NULL,
    seatCapacity INT NOT NULL,
    PRIMARY KEY (plane_id)
);

CREATE TABLE Flights(
    flight_id             VARCHAR(6) NOT NULL,
    destination           VARCHAR(3) NOT NULL,
    source                VARCHAR(3) NOT NULL,
    duration              INT        NOT NULL,
    distance              INT        NOT NULL,
    date_time             TIMESTAMP NOT NULL,
    plane_id              VARCHAR(6) NOT NULL,
    shared_flight_company VARCHAR(3), #null or company_code
    FOREIGN KEY (destination) REFERENCES Locations(airport_code),
    FOREIGN KEY (source) REFERENCES Locations(airport_code),
    FOREIGN KEY (plane_id) REFERENCES Planes(plane_id),
    PRIMARY KEY (flight_id)
);

CREATE TABLE Passengers(
    passenger_id    VARCHAR(8)  NOT NULL,
    flight_id       VARCHAR(6)  NOT NULL,
    name            VARCHAR(20) NOT NULL,
    age             INT         NOT NULL,
    gender          VARCHAR(1)  NOT NULL,
    nationality     VARCHAR(20) NOT NULL,
    seat_type       VARCHAR (1) NOT NULL, #B,E
    seat_number     VARCHAR (3) NOT NULL, #01A
    parentID1       VARCHAR (8),
    parentID2       VARCHAR(8),
    email           VARCHAR(100) NOT NULL,
    budget          INT NOT NULL,
    FOREIGN KEY (parentID1) REFERENCES Passengers (passenger_id) ON DELETE CASCADE,
    FOREIGN KEY (parentID2) REFERENCES Passengers (passenger_id) ON DELETE CASCADE,
    FOREIGN KEY (flight_id) REFERENCES Flights(flight_id) ON DELETE CASCADE,
    PRIMARY KEY (passenger_id)
);

CREATE TABLE Seats(
    flight_id    VARCHAR(6) NOT NULL,
    passenger_id VARCHAR(6) NOT NULL,
    seat_number  VARCHAR(3) NOT NULL,
    FOREIGN KEY (flight_id) REFERENCES Flights(flight_id),
    FOREIGN KEY (passenger_id) REFERENCES Passengers(passenger_id),
    PRIMARY KEY (flight_id, passenger_id, seat_number)
);