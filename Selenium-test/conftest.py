import os
import pytest
from selenium import webdriver
from selenium.webdriver.chrome.options import Options


BASE_URL = "http://localhost:5173"

# Put your test account credentials here temporarily.
# Better: use environment variables later.
TEST_EMAIL = os.getenv("TEST_EMAIL", "legendsatyam45@gmail.com")
TEST_PASSWORD = os.getenv("TEST_PASSWORD", "Asdfghjkl@123")


@pytest.fixture
def driver():

    options = Options()

    driver = webdriver.Chrome(options=options)
    driver.maximize_window()

    yield driver

    driver.quit()


def login_as_student(driver):

    driver.get(f"{BASE_URL}/login")

    email = driver.find_element(
        "css selector",
        "input[type='email']"
    )

    password = driver.find_element(
        "css selector",
        "input[type='password']"
    )

    email.send_keys(TEST_EMAIL)
    password.send_keys(TEST_PASSWORD)

    # Student is selected by default in your LoginPage
    login_button = driver.find_element(
        "xpath",
        "//button[contains(., 'Log in as Student')]"
    )

    login_button.click()

    return driver