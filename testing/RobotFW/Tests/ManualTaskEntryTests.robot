*** Settings ***
Library  ../Resources/Extensions/CalendarDateSelector.py
Library  Dialogs
Resource  ../Resources/CourseTool.robot
Resource  ../Resources/Common.robot
Resource  ../Resources/PO/TaskList.robot

Test Setup  Common.Begin Web Test With Login
Test Teardown  Common.End Web Test

*** Variables ***


*** Test Cases ***
SEL_001 Basic Task Manipulation
    [Tags]  selector  smoke
    Set Date  15  Jan  2015
    Write Comment  SEL_001 Task 1
    Submit Task
    #Count tasks = 1
    ${tasks} =  TaskList.Get Task Count
    Should Be Equal As Integers  ${tasks}  1   Wrong task count, task not added
    #Verify task content
    #Verify user info total time
    #Delete tasks
    Delete First Task
    #Count tasks = 0
    ${tasks} =  TaskList.Get Task Count
    Should Be Equal As Integers  ${tasks}  0   Wrong task count, task not deleted

SEL_002 Entering Multiple Tasks
    [Tags]  selector  current
    Set Date  15  Jan  2015
    Write Comment  SEL_002 Task 1
    Submit Task
    Set Date  17  Jan  2015
    Write Comment  SEL_002 Task 2
    Submit Task
    Set Date  18  Jan  2015
    Write Comment  SEL_002 Task 3
    Submit Task
    ${tasks} =  TaskList.Get Task Count
    Should Be Equal As Integers  ${tasks}  3   Wrong task count, tasks not added
    #Verify user info total time
    Delete All Tasks
    ${tasks} =  TaskList.Get Task Count
    Should Be Equal As Integers  ${tasks}  0   Wrong task count, tasks not deleted
