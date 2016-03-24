*** Settings ***
Library  Selenium2Library
Library  Collections
Library  Dialogs
Library  ../Extensions/CounterPageExt.py

*** Variables ***
${start_stop_button} =  id=startStop
${counter_comment_field} =  id=counterComment
${counter_submit} =  id=counterSubmitButton

*** Keywords ***
Start Stop Clock
    Click Button  ${start_stop_button}

Write Comment
    [Arguments]  ${comment}
    Input Text  ${counter_comment_field}  ${comment}

Submit Task
    Click Button   ${counter_submit}

Wait Until Clock Is
    [Arguments]  ${hour}  ${minutes}  ${seconds}
    Start Stop Clock
    Wait Until  ${minutes}  ${seconds}
    Start Stop Clock

Wait Until Clock Is Manual Start Stop
    [Arguments]  ${hour}  ${minutes}  ${seconds}
    Wait Until  ${minutes}  ${seconds}
