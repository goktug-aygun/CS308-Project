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

def test_insert_and_delete_crew_member(mysql_cursor):
    try:
        # Insert a crew member into the CrewMembers table
        insert_query = """
        INSERT INTO CrewMembers (crew_id, name, age, gender, nationality, att_type, veh_rest, max_range)
        VALUES ('C921', 'Jane Doe', 25, 'F', 'UK', 's', 1, 500)
        """
        mysql_cursor.execute(insert_query)
        mysql_cursor.connection.commit()

        # Delete the inserted crew member
        delete_query = "DELETE FROM CrewMembers WHERE crew_id = 'C921'"
        mysql_cursor.execute(delete_query)
        mysql_cursor.connection.commit()

    except mysql.connector.Error as error:
        pytest.fail(f"Error: {error}")
