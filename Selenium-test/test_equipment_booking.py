from selenium import webdriver
from selenium.webdriver.chrome.options import Options


def test_website_opens():
    options = Options()
    driver = webdriver.Chrome(options=options)

    try:
        driver.get("http://localhost:5173")

        assert "localhost" in driver.current_url

    finally:
        driver.quit()