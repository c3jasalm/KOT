*** Settings ***
Resource  ../Resources/CourseTool.robot
Resource  ../Resources/Common.robot

Test Setup  Common.Begin Web Test
Test Teardown  Common.End Web Test

*** Variables ***


*** Test Cases ***
SEC_001 Login With Correct Credentials
    [Tags]  Login  Smoke
    CourseTool.Login With Correct Credentials

SEC_002 Login With Incorrect Credentials
    [Tags]  Login
    CourseTool.Login With Credentials  %{KOT_VALID_USERNAME}  WrongPassword
    CourseTool.Clean After Failed Login

SEC_003 Logout
    [Tags]  Login  Smoke
    CourseTool.Login With Correct Credentials
    CourseTool.Logout User



