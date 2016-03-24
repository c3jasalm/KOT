*** Settings ***
Library  Selenium2Library
Library  Collections
Library  Dialogs
Library  ../Extensions/TaskListExt.py


*** Variables ***
${task_row} =  name=taskRow
${show_delete} =  id=showDelete


*** Keywords ***
Get Task Count
    ${count} =  Get matching xpath count  //*[@name='taskRow']
    Return From Keyword  ${count}

Delete First Task
    Click Element  ${show_delete}
    ${count} =  Get Task Count
    @{tasks} =  Get Webelements  name=deleteButton
    ${number_of_tasks} =  Get Length  ${tasks}
    ${top_task} =  Get From List  ${tasks}  0
    Click Element  ${top_task}
    Alert Should Be Present
    Click Element  ${show_delete}

Delete All Tasks
    ${count} =  Get Task Count
    : FOR  ${index}  IN RANGE  0  ${count}
    \  Delete First Task

Verify Task Date
    [Arguments]  ${expected_date}
    ${task_date} =  Get Text  //*[@name='date']
    Should Be Equal As Strings  ${expected_date}  ${task_date}  Task date is incorrect

Verify Duration
    [Arguments]  ${expected_duration}
    ${task_duration} =  Get Text  //*[@name='duration']
    Should Be Equal As Strings  ${expected_duration}  ${task_duration}  Task duration is incorrect

Verify Comment
    [Arguments]  ${expected_comment}
    ${task_comment} =  Get Task Comment
    Should Be Equal As Strings  ${expected_comment}  ${task_comment}  Task comment is incorrect

Verify Task Count Is
    [Arguments]  ${expected_count}
    ${task_count} =  TaskList.Get Task Count
    Should Be Equal As Integers  ${task_count}  ${expected_count}   Wrong task count, task not added