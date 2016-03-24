from robot.libraries.BuiltIn import BuiltIn


class TaskListExt(object):
    driver = None

    def get_webdriver_instance(self):
        se2lib = BuiltIn().get_library_instance('Selenium2Library')
        # return se2lib._current_browser()
        global driver
        driver = se2lib._current_browser()


    def get_task_comment(self):
        TaskListExt.get_webdriver_instance(self)

        global driver
        taskRow = driver.find_element_by_name("taskRow")
        comment = taskRow.find_element_by_name("comment").text
        return comment

