import pytest
import mysql.connector
import os

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

def test_cascade_delete_seats(mysql_cursor):
    try:
        # Insert a flight into the Flights table
        insert_flight_query = """
        INSERT INTO Flights (flight_id, destination, source, duration, distance, date_time, plane_id)
        VALUES ('F001', 'JFK', 'LHR', 8.5, 3500, '2024-03-20 08:00:00', 'PL001')
        """
        mysql_cursor.execute(insert_flight_query)
        mysql_cursor.connection.commit()

        # Insert a passenger into the Passengers table
        insert_passenger_query = """
        INSERT INTO Passengers (passenger_id, flight_id, name, age, gender, nationality, seat_type, seat_number, email, budget)
        VALUES ('P001', 'F001', 'John Doe', 30, 'M', 'US', 'E', '01A', 'john@example.com', 500)
        """
        mysql_cursor.execute(insert_passenger_query)
        mysql_cursor.connection.commit()

        # Insert a seat into the Seats table
        insert_seat_query = """
        INSERT INTO Seats (flight_id, passenger_id, seat_number)
        VALUES ('F981', 'P001', '01A')
        """
        mysql_cursor.execute(insert_seat_query)
        mysql_cursor.connection.commit()
    
        # Check if the seat has been inserted successfully
        select_seat_query = "SELECT * FROM Seats WHERE flight_id = 'F981' AND passenger_id = 'P001' AND seat_number = '01A'"
        mysql_cursor.execute(select_seat_query)
        result = mysql_cursor.fetchall()
        assert result  # Assert that result is not empty
    except mysql.connector.Error as error:
        pytest.fail(f"Error: {error}")

    try:
        # Delete the flight, which should trigger cascading delete for seats
        delete_flight_query = "DELETE FROM Flights WHERE flight_id = 'F981'"
        mysql_cursor.execute(delete_flight_query)
        mysql_cursor.connection.commit()

        # Check if the seat has been deleted due to cascading delete
        select_seat_query = "SELECT * FROM Seats WHERE flight_id = 'F981' AND passenger_id = 'P001' AND seat_number = '01A'"
        mysql_cursor.execute(select_seat_query)
        result = mysql_cursor.fetchall()
        assert not result  # Assert that result is empty

    ### Here also try deleting passenger
    except mysql.connector.Error as error:
        pytest.fail(f"Error: {error}")
