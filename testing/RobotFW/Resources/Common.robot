*** Settings ***
Library  Selenium2Library
Resource  ../Resources/CourseTool.robot
Resource  ../Resources/PO/TaskList.robot
Library  Dialogs

*** Variables ***
${BROWSER} =  firefox
${ROOT_URL} =  http://localhost:3000

*** Keywords ***
Begin Web Test
    Open Browser  about:blank  ${BROWSER}
    Maximize Browser Window
    Go To  ${ROOT_URL}

Begin Web Test With Login
    Open Browser  about:blank  ${BROWSER}
    Maximize Browser Window
    Go To  ${ROOT_URL}
    CourseTool.Login With Correct Credentials
    Delete All Tasks

End Web Test
    Run Keyword If  '${BROWSER}' == 'ie'  Logout User
    Close Browser