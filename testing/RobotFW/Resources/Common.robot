*** Settings ***
Library  Selenium2Library
Library  ../Resources/Extensions/Saucelabs.py
Resource  ../Resources/CourseTool.robot
Resource  ../Resources/PO/TaskList.robot
Library  Dialogs

*** Variables ***
${BROWSER} =  firefox
${ROOT_URL} =  http://192.168.0.10:3000
${REMOTE_URL} =  LOCAL
${DESIRED_CAPABILITES} =  name:Win8 + Chrome 43,platform:Windows 8.1,browserName:chrome,version:43

*** Keywords ***
Begin Web Test
    Run Keyword If  '${REMOTE_URL}' == 'LOCAL'
    ...  Open Browser  about:blank  ${BROWSER}
    Run Keyword If  '${REMOTE_URL}' != 'LOCAL'
    ...  Open Browser  ${ROOT_URL}  ${BROWSER}  remote_url=${REMOTE_URL}  desired_capabilities=${DESIRED_CAPABILITES}
    Run keyword if  '${REMOTE_URL}' != 'LOCAL'
    ...  Update Saucelabs Test Name
    ...  ${SUITE_NAME}: ${TEST_NAME}
    ...  ${REMOTE_URL}
    Maximize Browser Window
    Go To  ${ROOT_URL}

Begin Web Test With Login
    Begin Web Test
    CourseTool.Login With Correct Credentials
    Delete All Tasks

End Web Test
    Run Keyword If  '${BROWSER}' == 'ie'
    ...  Logout User
    ...  Delete All Cookies
    Run keyword if  '${REMOTE_URL}' != 'LOCAL'
    ...  Update Saucelabs Test Result
    ...  ${SUITE_NAME}: ${TEST_NAME}
    ...  ${TEST_STATUS}  ${TEST_TAGS}  ${REMOTE_URL}
    Close Browser