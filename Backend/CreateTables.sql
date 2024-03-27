#Used AWS Relational Database Service to host our SQL database

CREATE DATABASE CS308_MAIN_SQL_DATABASE;
USE CS308_MAIN_SQL_DATABASE;

CREATE TABLE Personels(
    personel_id     VARCHAR(7)  NOT NULL,
    name            VARCHAR(20) NOT NULL,
    age             INT         NOT NULL,
    gender          VARCHAR(1)  NOT NULL,
    nationality     VARCHAR(20) NOT NULL,
    veh_rest    INT NOT NULL,
    email           VARCHAR(100) NOT NULL,
    PRIMARY KEY (personel_id)
);

CREATE TABLE Pilots(
    personel_id     VARCHAR(7)  NOT NULL,
    sen_level       VARCHAR(1)  NOT NULL,
    max_range       INT         NOT NULL,
    FOREIGN KEY (personel_id) REFERENCES Personels(personel_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (personel_id)
);

CREATE TABLE CabinCrew(
    personel_id     VARCHAR(7)  NOT NULL,
    att_type        VARCHAR(1)  NOT NULL,
    FOREIGN KEY (personel_id) REFERENCES Personels(personel_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (personel_id)
);

CREATE TABLE KnownLanguages(
    personel_id     VARCHAR(7)  NOT NULL,
    language        VARCHAR(20)  NOT NULL,
    FOREIGN KEY (personel_id) REFERENCES Personels(personel_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (personel_id, language)
);

CREATE TABLE Locations(
    country_name VARCHAR(20) NOT NULL,
    city_name    VARCHAR(20) NOT NULL,
    airport_name VARCHAR(50) NOT NULL,
    airport_code VARCHAR(3)  NOT NULL,
    PRIMARY KEY (airport_code)
);

CREATE TABLE Planes(
    plane_id    VARCHAR(7) NOT NULL,
    type        VARCHAR(20) NOT NULL,  #airbus a380
    level       VARCHAR(1) NOT NULL,  #a,b,c,d
    passengerCapacity INT NOT NULL,
    crewCapacity INT NOT NULL,
    seatCapacity INT NOT NULL,
    PRIMARY KEY (plane_id)
);

CREATE TABLE Flights(
    flight_id                  VARCHAR(6) NOT NULL,
    destination                VARCHAR(3) NOT NULL,
    source                     VARCHAR(3) NOT NULL,
    duration                   DOUBLE     NOT NULL,
    distance                   DOUBLE     NOT NULL,
    date_time                  TIMESTAMP  NOT NULL,
    plane_id                   VARCHAR(6) NOT NULL,
    shared_flight_company_code VARCHAR(3), #null or company_code
    shared_flight_company_name VARCHAR(50), #null or company name
    FOREIGN KEY (destination) REFERENCES Locations(airport_code) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (source) REFERENCES Locations(airport_code) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (plane_id) REFERENCES Planes(plane_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (flight_id)
);

CREATE TABLE Passengers(
    passenger_id    VARCHAR(7)  NOT NULL,
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
    FOREIGN KEY (parentID1) REFERENCES Passengers (passenger_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (parentID2) REFERENCES Passengers (passenger_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (flight_id) REFERENCES Flights(flight_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (passenger_id)
);

CREATE TABLE Seats(
    flight_id    VARCHAR(6) NOT NULL,
    passenger_id VARCHAR(7) NOT NULL,
    seat_number  VARCHAR(3) NOT NULL,
    FOREIGN KEY (flight_id) REFERENCES Flights(flight_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (passenger_id) REFERENCES Passengers(passenger_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (flight_id, passenger_id, seat_number)
);

CREATE TABLE FlightCrew(
    flight_id   VARCHAR(6) NOT NULL,
    personel_id    VARCHAR(7),
    FOREIGN KEY (pilot_id) REFERENCES Personels(personel_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (flight_id, personel_id)
);