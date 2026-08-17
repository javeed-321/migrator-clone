---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# MFA password flow

This section gives the details on MFA password flow.

# Prerequisite

You must enable the MFA password configuration for this feature to work. See [Enable MFA password flow](https://docs.capillarytech.com/reference/authentication-configurations#enable-mfa-password-flow).

# Types of password flow

There are two types of password flow,

* Password flow for a first-time user
* Password flow for old users

## Password flow for first-time users

The workflow for the first-time user with an MFA password is as follows:

1. First-factor verification. Refer [First factor authentication](https://docs.capillarytech.com/reference/generate-authentication-tokenapi).
2. Generate an MFA token, using the token from first-factor authorisation, password, and confirm password - `auth/v1/mfa/token/generate`
3. Generate an MFA OTP using session ID - `auth/v1/mfa/otp/generate`
4. Validate the MFA OTP using session ID - `auth/v1/mfa/otp/validate`

Below is a flow diagram indicating the steps involved in the password flow for a first-time user.

<Image align="center" className="border" border={true} src="https://files.readme.io/0e7c45a-first-time_user_passwd_flow.jpg" />

## Password flow for old users

The workflow for an old user with an MFA password is as follows:

1. First-factor verification. Refer [First factor authentication](https://docs.capillarytech.com/reference/generate-authentication-tokenapi)
2. Generate a token using an authorisation token from the first factor - `auth/v1/mfa/token/generate`
3. Validate password using session ID - `auth/v1/mfa/password/validate`

Below is a flow diagram indicating the steps involved in the password flow for an old user.

<Image align="center" className="border" border={true} src="https://files.readme.io/db5abc6-old_user_passwd_flow.jpg" />

You can change or re-generate your password. Below are the API endpoints.

* Change password - `auth/v1/password/change`
* Create a password when you forget the current password - `auth/v1/mfa/password/forget`