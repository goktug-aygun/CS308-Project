import mysql.connector
import os
import pytest

@pytest.fixture(scope="module")
def mysql_connection():
    # Retrieve database credentials from environment variables
    db_host = 'your-mysql-host'
    db_user = 'your-mysql-user'
    db_password = os.getenv('DB_PASSWORD')
    db_name = 'your-database-name'

    # Connect to the MySQL database
    connection = mysql.connector.connect(
        host=db_host,
        user=db_user,
        password=db_password,
        database=db_name
    )

    yield connection

    # Close the connection after all tests are done
    connection.close()

@pytest.fixture(scope="function")
def mysql_cursor(mysql_connection):
    # Create a cursor to execute SQL queries
    cursor = mysql_connection.cursor()
    yield cursor
    cursor.close()

def test_cascade_delete(mysql_cursor):
    try:
        # Insert locations into the Locations table
        insert_location_query1 = """
        INSERT INTO Locations (country_name, city_name, airport_name, airport_code)
        VALUES ('abc', 'abc def', 'John F. Kennedy International Airport', 'abc')
        """
        mysql_cursor.execute(insert_location_query1)
        mysql_cursor.connection.commit()

        insert_location_query2 = """
        INSERT INTO Locations (country_name, city_name, airport_name, airport_code)
        VALUES ('def', 'def abc', 'Heathrow Airport', 'def')
        """
        mysql_cursor.execute(insert_location_query2)
        mysql_cursor.connection.commit()

        # Insert a plane into the Planes table
        insert_plane_query = """
        INSERT INTO Planes (plane_id, type, level, passengerCapacity, crewCapacity, seatCapacity)
        VALUES ('PL981', 'Airbus A380', 'a', 500, 20, 550)
        """
        mysql_cursor.execute(insert_plane_query)
        mysql_cursor.connection.commit()

        # Insert a flight into the Flights table
        insert_flight_query = """
        INSERT INTO Flights (flight_id, destination, source, duration, distance, date_time, plane_id)
        VALUES ('F861', 'abc', 'def', 8.5, 3500, '2024-03-20 08:00:00', 'PL981')
        """
        mysql_cursor.execute(insert_flight_query)
        mysql_cursor.connection.commit()

    except mysql.connector.Error as error:
        pytest.fail(f"Error: {error}")

    try:
        # Check if the cascade delete works for Locations
        delete_location_query = "DELETE FROM Locations WHERE airport_code = 'abc'"
        mysql_cursor.execute(delete_location_query)
        mysql_cursor.connection.commit()

        # Check if the flight with flight_id 'F001' has been deleted
        select_flight_query = "SELECT * FROM Flights WHERE flight_id = 'F861'"
        mysql_cursor.execute(select_flight_query)
        result = mysql_cursor.fetchall()
        assert not result  # Assert that result is empty

    except mysql.connector.Error as error:
        pytest.fail(f"Error: {error}")

    try:
        # Insert locations into the Locations table
        insert_location_query1 = """
        INSERT INTO Locations (country_name, city_name, airport_name, airport_code)
        VALUES ('abc', 'abc def', 'John F. Kennedy International Airport', 'abc')
        """
        mysql_cursor.execute(insert_location_query1)
        mysql_cursor.connection.commit()

        insert_flight_query = """
        INSERT INTO Flights (flight_id, destination, source, duration, distance, date_time, plane_id)
        VALUES ('F861', 'abc', 'def', 8.5, 3500, '2024-03-20 08:00:00', 'PL981')
        """

        mysql_cursor.execute(insert_flight_query)
        mysql_cursor.connection.commit()

        # Check if the cascade delete works for Planes
        delete_plane_query = "DELETE FROM Planes WHERE plane_id = 'PL981'"
        mysql_cursor.execute(delete_plane_query)
        mysql_cursor.connection.commit()

        # Check if the cascade delete works for the flight with flight_id 'F001'
        select_flight_query = "SELECT * FROM Flights WHERE flight_id = 'F861'"
        mysql_cursor.execute(select_flight_query)
        result = mysql_cursor.fetchall()
        assert not result  # Assert that result is empty

        # Check if the cascade delete works for Locations
        delete_location_query = "DELETE FROM Locations WHERE airport_code = 'abc'"
        mysql_cursor.execute(delete_location_query)
        mysql_cursor.connection.commit()

        # Check if the cascade delete works for the flight with flight_id 'F001'
        select_flight_query = "SELECT * FROM Flights WHERE flight_id = 'F861'"
        mysql_cursor.execute(select_flight_query)
        result = mysql_cursor.fetchall()
        assert not result  # Assert that result is empty

    except mysql.connector.Error as error:
        pytest.fail(f"Error: {error}")
