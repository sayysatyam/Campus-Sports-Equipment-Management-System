from conftest import login_as_student


def test_10_logout(driver):

    login_as_student(driver)

    logout_button = driver.find_element(
        "xpath",
        "//button[contains(text(), 'Log out')]"
    )

    logout_button.click()

    assert "/login" in driver.current_url