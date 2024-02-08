*** Settings ***
Resource           resource.robot

*** Test Cases ***
Valid Delete Project
    Open Login Page
    Input Email    admin@admin.com
    Input The Password    Admin1234
    Submit Credentials
    Store Alert
    Click Delete Project
    Workspace Page Should Be Open