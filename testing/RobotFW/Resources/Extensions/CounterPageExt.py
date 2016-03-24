from robot.libraries.BuiltIn import BuiltIn
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class CounterPageExt(object):
    driver = None

    def get_webdriver_instance(self):
        se2lib = BuiltIn().get_library_instance('Selenium2Library')
        # return se2lib._current_browser()
        global driver
        driver = se2lib._current_browser()

    def wait_until(self, minutes, seconds):
        CounterPageExt.get_webdriver_instance(self)

        timeout = int(minutes) * 60 + int(seconds) + 10

        WebDriverWait(driver, timeout).until(
            EC.text_to_be_present_in_element((By.ID, "stats"), "0h " + str(minutes) + "min " + str(seconds) + "sec"))
