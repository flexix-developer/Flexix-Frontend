*** Settings ***
Resource           resource.robot

*** Test Cases ***
Valid Login
    Open Login Page
    Input Email    admin@admin.com
    Input The Password    Admin1234
    Submit Credentials
    Store Alert
    Workspace Page Should Be Open
    [Teardown]    Close Browser

