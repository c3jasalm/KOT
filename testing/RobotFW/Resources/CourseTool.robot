*** Settings ***
Resource  ../Resources/PO/FrontPage.robot
Resource  ../Resources/PO/SelectorPage.robot
Resource  ../Resources/PO/TaskList.robot
Library  ../Resources/Extensions/CalendarDateSelector.py
Library  ../Resources/Extensions/DateConverter.py

*** Keywords ***
Login With Correct Credentials
    Login With Credentials  %{KOT_VALID_USERNAME}  %{KOT_VALID_PASSWORD}
    FrontPage.Verify Login Completed

Login With Credentials
    [Arguments]  ${uname}  ${pword}
    FrontPage.Open Login Window
    FrontPage.Type Username  ${uname}
    FrontPage.Type Password  ${pword}
    FrontPage.Submit Login

Clean After Failed Login
    FrontPage.Close Login Window
    FrontPage.Verify Not Logged In

Logout User
    FrontPage.Logout

Click Comment
    Comment Click

Write Comment
    [Arguments]  ${task_comment}
    Type Comment  ${task_comment}

Submit Task
    Click Submit Button

Submit New Task
    [Arguments]  ${day}  ${month}  ${year}  ${duration}  ${comment}
    Set Date  ${day}  ${month}  ${year}
    Set Task Duration  ${duration}
    Write Comment  ${comment}
    Submit Task

Submit New Task And Verify Outcome
    [Arguments]  ${day}  ${month}  ${year}  ${duration}  ${comment}
    Submit New Task  ${day}  ${month}  ${year}  ${duration}  ${comment}
    Sleep  2
    ${date_string} =  Convert Date  ${day}  ${month}  ${year}
    Verify Task Date  ${date_string}
    Verify Duration  ${duration}
    Verify Comment  ${comment}