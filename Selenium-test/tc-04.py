from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_06_equipment_is_displayed(driver):

    login_as_student(driver)

    wait = WebDriverWait(driver, 10)

    equipment_card = wait.until(
        EC.presence_of_element_located(
            ("css selector", ".eq-card")
        )
    )

    assert equipment_card.is_displayed()