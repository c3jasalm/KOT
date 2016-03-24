*** Settings ***
Library  Selenium2Library

*** Variables ***
${comment_field} =  id=comment
${calendar} =  id=dateTimeCalendar
${submit_button} =  id=submitButton
${duration_dropdown} =  id=setTime

*** Keywords ***
Comment Click
    Click Element  ${comment}

Type Comment
    [Arguments]  ${task_comment}
    Input Text  ${comment_field}  ${task_comment}

Set Task Duration
    [Arguments]  ${duration}
    Select From List  ${duration_dropdown}  ${duration}

Click Submit Button
    Click Button   ${submit_button}