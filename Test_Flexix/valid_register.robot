*** Settings ***
Resource           resource.robot

*** Test Cases ***
Valid Register
    Open Login Page
    Submit To Register Page
    Input First Name    Roos
    Input Last Name    Ter
    Input Email    un_admin1@gmail.com
    Input The Password    Unadmin12345
    Input Confirm Password    Unadmin12345
    Submit Register
    Store Alert
    Login Page Should Be Open
    [Teardown]    Close Browser

