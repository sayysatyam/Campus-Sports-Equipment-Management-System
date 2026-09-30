def test_website_opens(driver):

    driver.get("http://localhost:5173")

    assert "localhost:5173" in driver.current_url