import pytest
import mysql.connector
import os

@pytest.fixture(scope="module")
def db_connection():
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
def db_cursor(db_connection):
    # Create a cursor to execute SQL queries
    cursor = db_connection.cursor()
    yield cursor
    cursor.close()

def test_cascade_delete_flight_crew(db_cursor):
    try:
        # Insert test data into the database
        insert_queries = [
            """
            INSERT INTO Pilots (pilot_id, name, age, gender, nationality, sen_level, veh_rest, max_range, email)
            VALUES ('P571', 'John Doe', 30, 'M', 'US', 't', 2, 1000, 'john@example.com')
            """,
            """
            INSERT INTO CrewMembers (crew_id, name, age, gender, nationality, att_type, veh_rest, max_range)
            VALUES ('C671', 'Jane Smith', 25, 'F', 'UK', 'c', 3, 1200)
            """,
            """
            INSERT INTO Flights (flight_id, destination, source, duration, distance, date_time, plane_id)
            VALUES ('F971', 'JFK', 'LHR', 8.5, 3500, '2024-03-20 08:00:00', 'PL001')
            """,
            """
            INSERT INTO FlightCrew (flight_id, pilot_id, crew_id)
            VALUES ('F971', 'P571', 'C671')
            """
        ]

        for query in insert_queries:
            db_cursor.execute(query)
            db_cursor.connection.commit()

        # Check if the flight crew member has been inserted successfully
        select_flight_crew_query = "SELECT * FROM FlightCrew WHERE flight_id = 'F971' AND pilot_id = 'P571' AND crew_id = 'C671'"
        db_cursor.execute(select_flight_crew_query)
        result = db_cursor.fetchall()
        assert result  # Assert that result is not empty

        # Delete the flight, which should trigger cascading delete for flight crew
        delete_flight_query = "DELETE FROM Flights WHERE flight_id = 'F971'"
        db_cursor.execute(delete_flight_query)
        db_cursor.connection.commit()

        # Check if the flight crew member has been deleted due to cascading delete
        select_flight_crew_query = "SELECT * FROM FlightCrew WHERE flight_id = 'F971' AND pilot_id = 'P571' AND crew_id = 'C671'"
        db_cursor.execute(select_flight_crew_query)
        result = db_cursor.fetchall()
        assert not result  # Assert that result is empty

    except mysql.connector.Error as error:
        pytest.fail(f"Error: {error}")
