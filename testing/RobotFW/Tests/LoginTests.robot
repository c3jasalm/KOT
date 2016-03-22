*** Settings ***
Resource  ../Resources/CourseTool.robot
Resource  ../Resources/Common.robot

Test Setup  Common.Begin Web Test
Test Teardown  Common.End Web Test

*** Variables ***


*** Test Cases ***
SEC_001 Login With Correct Credentials
    [Tags]  login  smoke
    CourseTool.Login With Correct Credentials

SEC_002 Login With Incorrect Credentials
    [Tags]  login
    CourseTool.Login With Credentials  %{KOT_VALID_USERNAME}  WrongPassword
    CourseTool.Clean After Failed Login

SEC_003 Logout
    [Tags]  login  smoke
    CourseTool.Login With Correct Credentials
    CourseTool.Logout User



