from conftest import login_as_student
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_05_equipment_page_opens(driver):
    login_as_student(driver)

    print("\nCURRENT URL:", driver.current_url)
    print("PAGE TITLE:", driver.title)
    print("PAGE SOURCE HAS CATALOG:",
          "Equipment Catalog" in driver.page_source)

    print("PAGE TEXT:")
    print(driver.find_element("tag name", "body").text[:2000])

    heading = driver.find_element(
        "xpath",
        "//h2[contains(text(), 'Equipment Catalog')]"
    )

    assert heading.is_displayed()


def test_06_equipment_is_displayed(driver):

    login_as_student(driver)

    wait = WebDriverWait(driver, 10)

    equipment_card = wait.until(
        EC.presence_of_element_located(
            ("css selector", ".eq-card")
        )
    )

    assert equipment_card.is_displayed()