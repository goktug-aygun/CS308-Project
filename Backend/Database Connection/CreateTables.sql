#Used AWS Relational Database Service to host our SQL database

CREATE DATABASE CS308_MAIN_SQL_DATABASE;
USE CS308_MAIN_SQL_DATABASE;

CREATE TABLE Pilots(
    pilot_id    VARCHAR(7) NOT NULL,
    name        VARCHAR(20) NOT NULL,
    age         INT NOT NULL,
    gender      VARCHAR(1) NOT NULL, #M,F
    nationality VARCHAR(20) NOT NULL,
    sen_level   VARCHAR(1) NOT NULL,  #t,j,s
    veh_rest    INT NOT NULL,  #1,2,3,4
    max_range   INT NOT NULL,
    email       VARCHAR(100) NOT NULL,
    PRIMARY KEY (pilot_id)
);

CREATE TABLE CrewMembers(
    crew_id     VARCHAR(7) NOT NULL,
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

CREATE TABLE KnownLanguages (
    language VARCHAR(20) NOT NULL ,
    crew_id VARCHAR(7),
    pilot_id VARCHAR(7),
    FOREIGN KEY (crew_id) REFERENCES CrewMembers(crew_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (pilot_id) REFERENCES Pilots(pilot_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Locations(
    country_name VARCHAR(20) NOT NULL,
    city_name    VARCHAR(20) NOT NULL,
    airport_name VARCHAR(50) NOT NULL,
    airport_code VARCHAR(3)  NOT NULL,
    latitude     DOUBLE NOT NULL,
    longitude    DOUBLE NOT NULL,
    PRIMARY KEY (airport_code)
);

CREATE TABLE Planes(
    plane_id    VARCHAR(7) NOT NULL, #In the format SK-NNNN
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
    duration              DOUBLE     NOT NULL,
    distance              DOUBLE     NOT NULL,
    date_time             TIMESTAMP NOT NULL,
    plane_id              VARCHAR(7) NOT NULL,
    shared_flight_company VARCHAR(2), #null or company_code
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
    pilot_id    VARCHAR(7),
    crew_id     VARCHAR(7),
    FOREIGN KEY (pilot_id) REFERENCES Pilots(pilot_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (crew_id) REFERENCES CrewMembers(crew_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (flight_id,pilot_id,crew_id)
);

CREATE TABLE Recipes(
    food_id         VARCHAR(6) NOT NULL,
    dish_name       VARCHAR(75) NOT NULL,
    is_vegetarian   BOOLEAN NOT NULL,
    is_vegan        BOOLEAN NOT NULL,
    is_alcohol      BOOLEAN NOT NULL,
    is_drink        BOOLEAN NOT NULL,
    is_halal        BOOLEAN NOT NULL,
    is_dessert      BOOLEAN NOT NULL,
    calorie         INT NOT NULL,
    price           INT NOT NULL,
    PRIMARY KEY (food_id)
);

CREATE TABLE ChefsFoods(
    chef_id VARCHAR(7) NOT NULL,
    food_id VARCHAR(6) NOT NULL,
    FOREIGN KEY (chef_id) REFERENCES CrewMembers(crew_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (food_id) REFERENCES Recipes(food_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (chef_id,food_id)
);


INSERT INTO Locations (country_name, city_name, airport_name, airport_code, latitude, longitude)
VALUES
("United States", "New York City", "John F. Kennedy International Airport", "JFK", 40.6413, -73.7781),
("Japan", "Tokyo", "Narita International Airport", "NRT", 35.7647, 140.3863),
("Brazil", "Rio de Janeiro", "Galeão International Airport", "GIG", -22.8134, -43.2486),
("Australia", "Sydney", "Kingsford Smith International Airport", "SYD", -33.9461, 151.1772),
("England", "London", "Heathrow Airport", "LHR", 51.4700, -0.4543),
("India", "Delhi", "Indira Gandhi International Airport", "DEL", 28.5562, 77.1000),
("Italy", "Rome", "Leonardo da Vinci–Fiumicino Airport", "FCO", 41.8003, 12.2389),
("Canada", "Toronto", "Toronto Pearson International Airport", "YYZ", 43.6777, -79.6248),
("Germany", "Frankfurt", "Frankfurt Airport", "FRA", 50.0344, 8.5575),
("South Korea", "Seoul", "Incheon International Airport", "ICN", 37.4602, 126.4407),
("Spain", "Barcelona", "Barcelona-El Prat Airport", "BCN", 41.2971, 2.0785),
("China", "Beijing", "Beijing Capital International Airport", "PEK", 40.0801, 116.5845),
("Mexico", "Mexico City", "Mexico City International Airport", "MEX", 19.4363, -99.0720),
("United Arab Emirates", "Dubai", "Dubai International Airport", "DXB", 25.2528, 55.3644),
("Netherlands", "Amsterdam", "Amsterdam Airport Schiphol", "AMS", 52.3086, 4.7639),
("Thailand", "Bangkok", "Suvarnabhumi Airport", "BKK", 13.6813, 100.7477),
("Argentina", "Buenos Aires", "Ezeiza International Airport", "EZE", -34.8221, -58.5338),
("Egypt", "Cairo", "Cairo International Airport", "CAI", 30.1111, 31.4139),
("South Africa", "Cape Town", "Cape Town International Airport", "CPT", -33.9715, 18.6021),
("Kenya", "Nairobi", "Jomo Kenyatta International Airport", "NBO", -1.3192, 36.9273);