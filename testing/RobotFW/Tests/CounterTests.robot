*** Settings ***
Resource  ../Resources/CourseTool.robot
Resource  ../Resources/Common.robot
Resource  ../Resources/PO/CounterPage.robot
Resource  ../Resources/PO/TaskList.robot
Resource  ../Resources/PO/TabNavigation.robot

Test Setup  Common.Begin Web Test With Login
Test Teardown  Common.End Web Test


*** Variables ***


*** Test Cases ***
CNT_001 Too Short Task Stop Clock
    [Tags]  Counter
    Switch To Counter Tab

    Wait Until Clock Is  0  0  10

    Alert Should Be Present
    CounterPage.Write Comment  CNT_001 Task 1
    CounterPage.Submit Task
    Verify Task Count Is  0

CNT_002 Too Short Task Continue
    [Tags]  Counter
    Switch To Counter Tab

    Choose Cancel On Next Confirmation
    Wait Until Clock Is  0  0  30
    Confirm Action

    Wait Until Clock Is Manual Start Stop  0  1  15
    Start Stop Clock
    Dismiss Alert

    CounterPage.Write Comment  CNT_002 Task 1
    CounterPage.Submit Task
    Verify Task Count Is  0

CNT_003 Valid Task Length
    [Tags]  Counter
    Switch To Counter Tab

    Wait Until Clock Is  0  18  0

    CounterPage.Write Comment  CNT_003 Task 1
    CounterPage.Submit Task
    Verify Task Count Is  1




