*** Settings ***
Library           Selenium2Library
Library           OperatingSystem

*** Variables ***
${SERVER}         http://localhost:3000/
${BROWSER}        chrome
${DELAY}          1
${LOGIN URL}      http://localhost:3000/login
${REGISTER URL}   http://localhost:3000/register
${WORKSPACE URL}  http://localhost:3000/workspace

*** Keywords ***
# Login Group
Open Login Page
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed    ${DELAY}
    Login Page Should Be Open

Login Page Should Be Open
    Title Should Be    Frontend Builder

# Go To Login Page
#     Go To    ${LOGIN URL}
#     Login Page Should Be Open

Input Email
    [Arguments]    ${email}
    Input Text    email    ${email}

Input The Password
    [Arguments]    ${password}
    Input Text    password    ${password}

Submit Credentials
    Click Button    sign_in

Store Alert
    Handle Alert

Workspace Page Should Be Open
    Location Should Be    ${WORKSPACE URL}
    Title Should Be    Frontend Builder

# register
Submit To Register Page
    Click Link    /register

Register Page Should Be Open
    Location Should Be    ${REGISTER URL}
    Title Should Be    Frontend Builder

# Go To Register Page
#     Go To    ${Register URL}
#     Login Page Should Be Open

Input First Name
    [Arguments]    ${fname}
    Input Text    fname    ${fname}

Input Last Name
    [Arguments]    ${lname}
    Input Text    lname    ${lname}

Input Confirm Password
    [Arguments]    ${name}
    Input Text    name    ${name}

Submit Register
    Click Button    sign_up

# Forgot Password
Click To forgot Page
    Click Link    /forgot

Submit Send OTP
    Click Button    BT_Send

Input OTP
    [Arguments]    ${verifycode}
    Input Text    verifycode    ${verifycode}

Click Continue OTP
    Click Button    OPT_continue

Input New Password
    [Arguments]    ${newPassword}
    Input Text    newPassword    ${newPassword}

Input Confirm New Password
    [Arguments]    ${confirmPassword}
    Input Text    confirmPassword    ${confirmPassword}

Click Next Confirm Password
    Click Button    next_confirm


# Create project
Click New Project
    Click Element   new_project

Input Name Project
    [Arguments]    ${project_name}
    Input Text    project_name    ${project_name}

Click Create Project
    Click Button    create_project

# Delete Project
*** Keywords ***
# Click Element And Remove By Id
#     [Arguments]    ${locator}
#     ${id}    Get Element Attribute    delete_project    id
#     Execute JavaScript    document.getElementById('${id}').remove()
#     Click Element    delete_project
Click Delete Project
    Click Element    delete_project

# Edit Name Project
Click FiEdit
    Click Element    fiCheckIcon

Input New Name Project
    [Arguments]    ${new_name_project}
    Input Text    new_name_project    ${new_name_project}

Click Save Name
    Click Element    save_new_name
