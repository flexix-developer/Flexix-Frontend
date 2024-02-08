*** Settings ***
Resource           resource.robot

*** Test Cases ***
Valid Forgot Password
    Open Login Page
    Click To forgot Page
    Input Email    admin@admin.com
    Submit Send OTP
    Store Alert
    Input OTP    567890
    Click Continue OTP
    Store Alert
    Input New Password    Admin12345
    Input Confirm New Password    Admin12345
    Click Next Confirm Password
    Store Alert
    Login Page Should Be Open
    [Teardown]    Close Browser

