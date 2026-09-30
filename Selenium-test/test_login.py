from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_03_valid_login(driver):

    driver.get("http://localhost:5173/login")

    email = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located(
            ("css selector", "input[type='email']")
        )
    )

    password = driver.find_element(
        "css selector",
        "input[type='password']"
    )

    email.send_keys("legendsatyam45@gmail.com")
    password.send_keys("Asdfghjkl@123")

    login_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable(
            ("xpath", "//button[contains(., 'Log in as Student')]")
        )
    )

    login_button.click()

    # Wait until either login succeeds or an error appears
    try:
        WebDriverWait(driver, 10).until(
            lambda d: "/student" in d.current_url
            or len(d.find_elements("css selector", ".error-banner")) > 0
        )
    except:
        pass

    print("\nCURRENT URL:", driver.current_url)

    errors = driver.find_elements(
        "css selector",
        ".error-banner"
    )

    if errors:
        print("LOGIN ERROR:", errors[0].text)

    assert "/student" in driver.current_url