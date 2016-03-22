*** Settings ***
Library  Selenium2Library
Library  OperatingSystem

*** Variables ***
${login_button} =  css=button.btn-GitHub
${username_field} =  id=login_field
${password_field} =  id=password
${submit_credentials_button} =  name=commit
${user_menu} =  id=login-dropdown-list
${logout_button} =  id=login-buttons-logout

*** Keywords ***
Open Login Window
    Wait Until Page Contains Element  ${login_button}  timeout=20
    Click Element  ${login_button}
    Sleep  5s
    Select Window  title=Sign in to GitHub · GitHub

Type Username
    [Arguments]  ${uname}
    Input Text  ${username_field}  ${uname}

Type Password
    [Arguments]  ${pword}
    Input Password  ${password_field}  ${pword}

Submit Login
    Click Button  ${submit_credentials_button}
    Log  Select Window
    Sleep  5s
    Select Window  title=CourseTool
    Log  Window Selected

Verify Login Completed
    Wait Until Page Contains Element  id=userInfo

Close Login Window
    Sleep  5s
    Select Window  title=Sign in to GitHub · GitHub
    Close Window
    Sleep  5s
    Select Window  title=CourseTool

Verify Not Logged In
    Wait Until Page Contains Element  ${login_button}

Logout
    Verify Login Completed
    Click Element  ${user_menu}
    Click Element  ${logout_button}
    Verify Not Logged In


