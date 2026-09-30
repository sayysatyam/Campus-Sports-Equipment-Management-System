def test_04_invalid_login(driver):

    driver.get("http://localhost:5173/login")

    driver.find_element(
        "css selector",
        "input[type='email']"
    ).send_keys("wrong-user@example.com")

    driver.find_element(
        "css selector",
        "input[type='password']"
    ).send_keys("WrongPassword123")

    driver.find_element(
        "xpath",
        "//button[contains(., 'Log in as Student')]"
    ).click()

    error = driver.find_element(
        "css selector",
        ".error-banner"
    )

    assert error.is_displayed()