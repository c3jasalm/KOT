*** Settings ***
Library  ../Resources/Extensions/CalendarDateSelector.py
Library  Dialogs
Resource  ../Resources/CourseTool.robot
Resource  ../Resources/Common.robot
Resource  ../Resources/PO/TaskList.robot
Resource  ../Resources/PO/UserInfo.robot

Test Setup  Common.Begin Web Test With Login
Test Teardown  Common.End Web Test

*** Variables ***


*** Test Cases ***
SEL_001 Basic Task Manipulation
    [Tags]  Selector  Smoke  current
    Submit New Task And Verify Outcome  15  Jan  2015  01:00  SEL_001 Task 1

    # Verify task count
    Verify Task Count Is  1

    # Verify user info total time
    Verify User Info Total Hours Is  01:00

    # Delete task and verify deletion
    Delete First Task
    Verify Task Count Is  0

SEL_002 Entering Multiple Tasks
    [Tags]  Selector
    Submit New Task  10  Jan  2015  01:00  SEL_002 Task 1
    Submit New Task  13  Jan  2015  01:45  SEL_002 Task 2
    Submit New Task  18  Jan  2015  02:30  SEL_002 Task 3

    # Verify task count
    Verify Task Count Is  3

    # Verify user info total time
    Verify User Info Total Hours Is  05:15

    # Delete all tasks and verify deletion
    Delete All Tasks
    Verify Task Count Is  0

SEL_003 Task Description Is Mandatory
    [Tags]  Selector
    Set Date  23  Feb  2015
    Set Task Duration  00:45
    Submit Task

    Verify Task Count Is  0
