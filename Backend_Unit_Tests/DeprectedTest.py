import unittest
import mysql.connector
import os

class TestMySQLInteraction(unittest.TestCase):
    def setUp(self):
        # Retrieve database credentials from environment variables
        self.db_host = 'your-mysql-host'
        self.db_user = 'your-mysql-user'
        self.db_password = os.getenv('DB_PASSWORD')
        self.db_name = 'your-database-name'

        # Connect to the MySQL database
        self.connection = mysql.connector.connect(
            host=self.db_host,
            user=self.db_user,
            password=self.db_password,
            database=self.db_name
        )

        # Create a cursor to execute SQL queries
        self.cursor = self.connection.cursor()

    def tearDown(self):
        # Close the cursor and connection
        self.cursor.close()
        self.connection.close()

    def test_insert_and_delete_pilot(self):
        try:
            # Insert a pilot into the Pilots table
            insert_query = """
            INSERT INTO Pilots (pilot_id, name, age, gender, nationality, sen_level, veh_rest, max_range, email)
            VALUES ('P921', 'John Doe', 30, 'M', 'US', 't', 2, 1000, 'john@example.com')
            """
            self.cursor.execute(insert_query)
            self.connection.commit()

            # Delete the inserted pilot
            delete_query = "DELETE FROM Pilots WHERE pilot_id = 'P921'"
            self.cursor.execute(delete_query)
            self.connection.commit()

        except mysql.connector.Error as error:
            self.fail(f"Error: {error}")

    def test_insert_and_delete_known_language(self):
        try:
            # Insert a known language entry
            insert_query = """
            INSERT INTO KnownLanguages (language, crew_id)
            VALUES ('abcde', 'C001')
            """
            self.cursor.execute(insert_query)
            self.connection.commit()

            # Delete the inserted known language entry
            delete_query = "DELETE FROM KnownLanguages WHERE language = 'abcde'"
            self.cursor.execute(delete_query)
            self.connection.commit()

        except mysql.connector.Error as error:
            self.fail(f"Error: {error}")

    def test_insert_and_delete_crew_member(self):
        try:
            # Insert a crew member into the CrewMembers table
            insert_query = """
            INSERT INTO CrewMembers (crew_id, name, age, gender, nationality, att_type, veh_rest, max_range)
            VALUES ('C921', 'Jane Doe', 25, 'F', 'UK', 's', 1, 500)
            """
            self.cursor.execute(insert_query)
            self.connection.commit()

            # Delete the inserted crew member
            delete_query = "DELETE FROM CrewMembers WHERE crew_id = 'C921'"
            self.cursor.execute(delete_query)
            self.connection.commit()

        except mysql.connector.Error as error:
            self.fail(f"Error: {error}")

    def test_insert_and_delete_location(self):
        try:
            # Insert a location into the Locations table
            insert_query = """
            INSERT INTO Locations (country_name, city_name, airport_name, airport_code)
            VALUES ('USA', 'New York', 'John F. Kennedy International Airport', 'JFK')
            """
            self.cursor.execute(insert_query)
            self.connection.commit()

            # Delete the inserted location
            delete_query = "DELETE FROM Locations WHERE airport_code = 'JFK'"
            self.cursor.execute(delete_query)
            self.connection.commit()

        except mysql.connector.Error as error:
            self.fail(f"Error: {error}")
    
    def test_insert_and_delete_plane(self):
        try:
            # Insert a plane into the Planes table
            insert_query = """
            INSERT INTO Planes (plane_id, type, level, passengerCapacity, crewCapacity, seatCapacity)
            VALUES ('PL001', 'Airbus A380', 'a', 500, 20, 550)
            """
            self.cursor.execute(insert_query)
            self.connection.commit()

            # Delete the inserted plane
            delete_query = "DELETE FROM Planes WHERE plane_id = 'PL001'"
            self.cursor.execute(delete_query)
            self.connection.commit()

        except mysql.connector.Error as error:
            self.fail(f"Error: {error}")

    def check_for_flights(self):
        try:
            # Insert a plane into the Planes table
            insert_query = """
            INSERT INTO Planes (plane_id, type, level, passengerCapacity, crewCapacity, seatCapacity)
            VALUES ('PL001', 'Airbus A380', 'a', 500, 20, 550)
            """
            self.cursor.execute(insert_query)
            self.connection.commit()

            # Delete the inserted plane
            delete_query = "DELETE FROM Planes WHERE plane_id = 'PL001'"
            self.cursor.execute(delete_query)
            self.connection.commit()

        except mysql.connector.Error as error:
            self.fail(f"Error: {error}")
    
    def test_cascade_delete(self):
        try:
            # Insert locations into the Locations table
            insert_location_query1 = """
            INSERT INTO Locations (country_name, city_name, airport_name, airport_code)
            VALUES ('abc', 'abc def', 'John F. Kennedy International Airport', 'abc')
            """
            self.cursor.execute(insert_location_query1)
            self.connection.commit()

            insert_location_query2 = """
            INSERT INTO Locations (country_name, city_name, airport_name, airport_code)
            VALUES ('def', 'def abc', 'Heathrow Airport', 'def')
            """
            self.cursor.execute(insert_location_query2)
            self.connection.commit()

            # Insert a plane into the Planes table
            insert_plane_query = """
            INSERT INTO Planes (plane_id, type, level, passengerCapacity, crewCapacity, seatCapacity)
            VALUES ('PL981', 'Airbus A380', 'a', 500, 20, 550)
            """
            self.cursor.execute(insert_plane_query)
            self.connection.commit()

            # Insert a flight into the Flights table
            insert_flight_query = """
            INSERT INTO Flights (flight_id, destination, source, duration, distance, date_time, plane_id)
            VALUES ('F861', 'abc', 'def', 8.5, 3500, '2024-03-20 08:00:00', 'PL981')
            """
            self.cursor.execute(insert_flight_query)
            self.connection.commit()

        except mysql.connector.Error as error:
            self.fail(f"Error: {error}")

        try:
            # Check if the cascade delete works for Locations
            delete_location_query = "DELETE FROM Locations WHERE airport_code = 'abc'"
            self.cursor.execute(delete_location_query)
            self.connection.commit()

            # Check if the flight with flight_id 'F001' has been deleted
            select_flight_query = "SELECT * FROM Flights WHERE flight_id = 'F861'"
            self.cursor.execute(select_flight_query)
            result = self.cursor.fetchall()
            self.assertFalse(result)  # Assert that result is empty

        except mysql.connector.Error as error:
            self.fail(f"Error: {error}")

        try:
            # Insert locations into the Locations table
            insert_location_query1 = """
            INSERT INTO Locations (country_name, city_name, airport_name, airport_code)
            VALUES ('abc', 'abc def', 'John F. Kennedy International Airport', 'abc')
            """
            self.cursor.execute(insert_location_query1)
            self.connection.commit()

            insert_flight_query = """
            INSERT INTO Flights (flight_id, destination, source, duration, distance, date_time, plane_id)
            VALUES ('F861', 'abc', 'def', 8.5, 3500, '2024-03-20 08:00:00', 'PL981')
            """

            self.cursor.execute(insert_flight_query)
            self.connection.commit()

            # Check if the cascade delete works for Planes
            delete_plane_query = "DELETE FROM Planes WHERE plane_id = 'PL981'"
            self.cursor.execute(delete_plane_query)
            self.connection.commit()

            # Check if the cascade delete works for the flight with flight_id 'F001'
            # If plane is deleted, flight should also be deleted due to cascade delete
            select_flight_query = "SELECT * FROM Flights WHERE flight_id = 'F861'"
            self.cursor.execute(select_flight_query)
            result = self.cursor.fetchall()
            self.assertFalse(result)  # Assert that result is empty

            # Check if the cascade delete works for Locations
            delete_location_query = "DELETE FROM Locations WHERE airport_code = 'abc'"
            self.cursor.execute(delete_location_query)
            self.connection.commit()

        except mysql.connector.Error as error:
            self.fail(f"Error: {error}")



    def test_cascade_delete_seats(self):
        try:
            # Insert a flight into the Flights table
            insert_flight_query = """
            INSERT INTO Flights (flight_id, destination, source, duration, distance, date_time, plane_id)
            VALUES ('F001', 'JFK', 'LHR', 8.5, 3500, '2024-03-20 08:00:00', 'PL001')
            """
            self.cursor.execute(insert_flight_query)
            self.connection.commit()

            # Insert a passenger into the Passengers table
            insert_passenger_query = """
            INSERT INTO Passengers (passenger_id, flight_id, name, age, gender, nationality, seat_type, seat_number, email, budget)
            VALUES ('P001', 'F001', 'John Doe', 30, 'M', 'US', 'E', '01A', 'john@example.com', 500)
            """
            self.cursor.execute(insert_passenger_query)
            self.connection.commit()

            # Insert a seat into the Seats table
            insert_seat_query = """
            INSERT INTO Seats (flight_id, passenger_id, seat_number)
            VALUES ('F981', 'P001', '01A')
            """
            self.cursor.execute(insert_seat_query)
            self.connection.commit()
        
            # Check if the seat has been inserted successfully
            select_seat_query = "SELECT * FROM Seats WHERE flight_id = 'F981' AND passenger_id = 'P001' AND seat_number = '01A'"
            self.cursor.execute(select_seat_query)
            result = self.cursor.fetchall()
            self.assertTrue(result)  # Assert that result is not empty
        except mysql.connector.Error as error:
            self.fail(f"Error: {error}")

        try:
            # Delete the flight, which should trigger cascading delete for seats
            delete_flight_query = "DELETE FROM Flights WHERE flight_id = 'F981'"
            self.cursor.execute(delete_flight_query)
            self.connection.commit()

            # Check if the seat has been deleted due to cascading delete
            select_seat_query = "SELECT * FROM Seats WHERE flight_id = 'F981' AND passenger_id = 'P001' AND seat_number = '01A'"
            self.cursor.execute(select_seat_query)
            result = self.cursor.fetchall()
            self.assertFalse(result)  # Assert that result is empty


        ### Here also try deleting passenger
        except mysql.connector.Error as error:
            self.fail(f"Error: {error}")
        
        
    def test_cascade_delete_flight_crew(self):
        try:
            # Insert a pilot into the Pilots table
            insert_pilot_query = """
            INSERT INTO Pilots (pilot_id, name, age, gender, nationality, sen_level, veh_rest, max_range, email)
            VALUES ('P571', 'John Doe', 30, 'M', 'US', 't', 2, 1000, 'john@example.com')
            """
            self.cursor.execute(insert_pilot_query)
            self.connection.commit()

            # Insert a crew member into the CrewMembers table
            insert_crew_query = """
            INSERT INTO CrewMembers (crew_id, name, age, gender, nationality, att_type, veh_rest, max_range)
            VALUES ('C671', 'Jane Smith', 25, 'F', 'UK', 'c', 3, 1200)
            """
            self.cursor.execute(insert_crew_query)
            self.connection.commit()

            # Insert a flight into the Flights table
            insert_flight_query = """
            INSERT INTO Flights (flight_id, destination, source, duration, distance, date_time, plane_id)
            VALUES ('F971', 'JFK', 'LHR', 8.5, 3500, '2024-03-20 08:00:00', 'PL001')
            """
            self.cursor.execute(insert_flight_query)
            self.connection.commit()

            # Insert a flight crew member into the FlightCrew table
            insert_flight_crew_query = """
            INSERT INTO FlightCrew (flight_id, pilot_id, crew_id)
            VALUES ('F971', 'P571', 'C671')
            """
            self.cursor.execute(insert_flight_crew_query)
            self.connection.commit()

            # Check if the flight crew member has been inserted successfully
            select_flight_crew_query = "SELECT * FROM FlightCrew WHERE flight_id = 'F001' AND pilot_id = 'P001' AND crew_id = 'C001'"
            self.cursor.execute(select_flight_crew_query)
            result = self.cursor.fetchall()
            self.assertTrue(result)  # Assert that result is not empty

            # Delete the flight, which should trigger cascading delete for flight crew
            delete_flight_query = "DELETE FROM Flights WHERE flight_id = 'F971'"
            self.cursor.execute(delete_flight_query)
            self.connection.commit()

            # Check if the flight crew member has been deleted due to cascading delete
            select_flight_crew_query = "SELECT * FROM FlightCrew WHERE flight_id = 'F001' AND pilot_id = 'P001' AND crew_id = 'C001'"
            self.cursor.execute(select_flight_crew_query)
            result = self.cursor.fetchall()
            self.assertFalse(result)  # Assert that result is empty

        ### also might check crew deletion
        except mysql.connector.Error as error:
            self.fail(f"Error: {error}")


if __name__ == '__main__':
    unittest.main()

'''
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
'''