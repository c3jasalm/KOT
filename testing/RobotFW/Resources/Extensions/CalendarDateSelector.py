from robot.libraries.BuiltIn import BuiltIn


class CalendarDateSelector(object):
    driver = None

    def get_webdriver_instance(self):
        se2lib = BuiltIn().get_library_instance('Selenium2Library')
        #return se2lib._current_browser()
        global driver
        driver = se2lib._current_browser()

    def set_date(self, day, month, year):
        CalendarDateSelector.get_webdriver_instance(self)

        CalendarDateSelector.select_year(self, year)
        CalendarDateSelector.select_month(self, month)
        CalendarDateSelector.select_date(self, day)

    def select_month(self, month):
        month_table = driver.find_element_by_xpath("/html/body/div[4]/ul/li[1]/div/div[2]/table/tbody")
        CalendarDateSelector.click_table_item(self, month_table, month)

    def select_date(self, day):
        date_table = driver.find_element_by_xpath("/html/body/div[4]/ul/li[1]/div/div[1]/table/tbody")
        CalendarDateSelector.click_table_item(self, date_table, str(day))


    def select_year(self, year):
        global driver
        driver.find_element_by_id("dateTimeCalendar").click()

        #Months
        driver.find_element_by_class_name("picker-switch").click()

        #Years
        driver.find_element_by_xpath("/html/body/div[4]/ul/li[1]/div/div[2]/table/thead/tr/th[2]").click()

        years_table = driver.find_element_by_xpath("/html/body/div[4]/ul/li[1]/div/div[3]/table/tbody")

        CalendarDateSelector.click_table_item(self, years_table, str(year))

    def click_table_item(self, table, target_string):
        all_rows = table.find_elements_by_tag_name("tr")

        for row in all_rows:
            cells = row.find_elements_by_tag_name("td")
            print cells
            for cell in cells:
                print cell.text
                if target_string in cell.text:
                    if target_string == cell.text:
                        cell.click()
                        return
                    else:
                        spans = cell.find_elements_by_tag_name("span")
                        for span in spans:
                            print span.text
                            if target_string == span.text:
                                span.click()
                                return
