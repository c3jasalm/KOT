*** Settings ***
Library  Selenium2Library
Library  Collections
Library  Dialogs
Library  ../Extensions/CounterPageExt.py

*** Variables ***
${counter_tab} =  id=ui-id-2


*** Keywords ***
Switch To Counter Tab
    Click Element  ${counter_tab}
