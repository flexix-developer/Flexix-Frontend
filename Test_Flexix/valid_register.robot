*** Settings ***
Resource           resource.robot

*** Test Cases ***
Valid Register
    Open Login Page
    Submit To Register Page
    Input First Name    Admin2
    Input Last Name    Admin2
    Input Email    admin2@gmail.com
    Input The Password    Unadmin12345
    Input Confirm Password    Unadmin12345
    Submit Register
    Store Alert
    Login Page Should Be Open
    [Teardown]    Close Browser

