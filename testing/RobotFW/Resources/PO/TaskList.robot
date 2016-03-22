*** Settings ***
Library  Selenium2Library
Library  Collections
Library  Dialogs


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
