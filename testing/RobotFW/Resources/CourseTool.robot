*** Settings ***
Resource  ../Resources/PO/FrontPage.robot
Resource  ../Resources/PO/SelectorPage.robot

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

