*** Settings ***
Resource           resource.robot

*** Test Cases ***
Valid Rename Project
    Open Login Page
    Input Email    admin@admin.com
    Input The Password    Admin1234
    Submit Credentials
    Store Alert
    Click FiEdit
    Input New Name Project    Test_Rename
    Click Save Name
    Workspace Page Should Be Open
    [Teardown]    Close Browser
