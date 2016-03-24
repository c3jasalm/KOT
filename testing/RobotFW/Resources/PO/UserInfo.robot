*** Settings ***
Library  ../Extensions/UserInfoExt.py
Library  Selenium2Library
Library  Collections
Library  Dialogs
Library  BuiltIn

*** Variables ***
${user_info_row} =  id=userInfo

*** Keywords ***
Verify User Info Total Hours Is
    [Arguments]  ${expected_hours}
    ${user_info_text} =  Get Text  ${user_info_row}
    ${total_hours} =  Get User Info Hours  ${user_info_text}
    Should Be Equal As Strings  ${expected_hours}  ${total_hours}  Total hours does not match

