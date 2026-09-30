from conftest import login_as_student
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_07_booking_form_opens(driver):

    login_as_student(driver)

    book_button = driver.find_element(
        "xpath",
        "//button[contains(text(), 'Book Now')]"
    )

    book_button.click()

    heading = driver.find_element(
        "xpath",
        "//h3[contains(text(), 'Book')]"
    )

    assert heading.is_displayed()


def test_08_equipment_booking(driver):

    login_as_student(driver)

    wait = WebDriverWait(driver, 10)

    book_button = wait.until(
        EC.element_to_be_clickable(
            ("xpath", "//button[contains(text(), 'Book Now')]")
        )
    )

    book_button.click()

    wait.until(
        EC.visibility_of_element_located(
            ("xpath", "//h3[contains(text(), 'Book')]")
        )
    )

    quantity = driver.find_element(
        "css selector",
        ".modal input[type='number']"
    )

    quantity.clear()
    quantity.send_keys("1")

    submit_button = driver.find_element(
        "xpath",
        "//div[contains(@class,'modal')]//button[contains(text(), 'Submit Request')]"
    )

    submit_button.click()

    success = wait.until(
        EC.visibility_of_element_located(
            ("css selector", ".toast")
        )
    )

    assert "Booking request submitted" in success.text


def test_09_booking_appears_in_my_bookings(driver):

    login_as_student(driver)

    driver.find_element(
        "xpath",
        "//button[contains(text(), 'My Bookings')]"
    ).click()

    heading = driver.find_element(
        "xpath",
        "//h2[contains(text(), 'My Bookings')]"
    )

    assert heading.is_displayed()

    table = driver.find_element(
        "css selector",
        ".table-wrap table"
    )

    assert table.is_displayed()

    rows = table.find_elements(
        "css selector",
        "tbody tr"
    )

    assert len(rows) > 0