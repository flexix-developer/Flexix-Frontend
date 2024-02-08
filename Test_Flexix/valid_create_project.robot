*** Settings ***
Resource           resource.robot

*** Test Cases ***
Valid Create Project
    Open Login Page
    Input Email    admin@admin.com
    Input The Password    Admin1234
    Submit Credentials
    Store Alert
    Click New Project
    Input Name Project   Robot
    Click Create Project
    Store Alert
    Workspace Page Should Be Open
    [Teardown]    Close Browser
