---
updatedAt: 2026-07-17T10:49:35.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Authentication configurations

# Enable MFA password flow

Below are the configurations for the password flow in MFA.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Configuration
      </th>

      <th>
        Description
      </th>

      <th>
        Default value
      </th>

      <th>
        Applicability

        (MFA/Primary flow - First factor authentication)
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        IS_MFA_PASSWORD_ENABLED
      </td>

      <td>
        Determines if the password flow in MFA is enabled
      </td>

      <td>
        False
      </td>

      <td>
        MFA
      </td>
    </tr>

    <tr>
      <td>
        MFA_PASSWORD_REGEX
      </td>

      <td>
        System verifies the user-entered password against the password in this config.
      </td>

      <td>

      </td>

      <td>
        MFA
      </td>
    </tr>
  </tbody>
</Table>

**Note:** The above two configurations are independent and must be enabled separately.

# Configuring validity for the key

For security purposes, you can configure a validity period for the [generated key while validating the OTP](https://docs.capillarytech.com/reference/validate-otp-api). This prevents a user session from remaining active indefinitely even after they log out.

<Callout icon="📘" theme="info">
  ### **Note**

  To enable these configurations, you need to raise a ticket. The turnaround time is 5 days.
</Callout>

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Configuration
      </th>

      <th>
        Description
      </th>

      <th>
        Default value
      </th>

      <th>
        Applicability

        (MFA/Primary flow - First factor authentication)
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        CONF_ENABLE_EXPIRY_BASED_KEY
      </td>

      <td>
        Set the value to True to enable the configuration.
      </td>

      <td>
        False (Disabled)
      </td>

      <td>
        Both
      </td>
    </tr>

    <tr>
      <td>
        CONF_KEY_EXPIRY_IN_MINUTES
      </td>

      <td>
        Defines the expiry time.
      </td>

      <td>
        60 minutes
      </td>

      <td>
        Primary
      </td>
    </tr>

    <tr>
      <td>
        CONF_KEY_EXPIRY_MFA_IN_MINUTES
      </td>

      <td>
        Defines the expiry time for the key generated for the MFA token
      </td>

      <td>
        60 minutes
      </td>

      <td>
        MFA
      </td>
    </tr>
  </tbody>
</Table>

# Defining maximum OTP retry attempts

You can define the below configurations and set the maximum OTP/password retry attempts. If the user attempts more than the defined number, the account gets locked for that particular session. To restrict the user from starting a new session and reattempting the OTP or password, it is recommended to [activate the account locking feature](https://docs.capillarytech.com/reference/authentication-configurations#account-locking-feature).

<Table align={[null,null,null,"left"]}>
  <thead>
    <tr>
      <th>
        Configuration
      </th>

      <th>
        Description
      </th>

      <th>
        Default value
      </th>

      <th>
        Applicability

        (MFA/Primary flow - First factor authentication)
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        CONF_MAX_OTP_RETRY_COUNT
      </td>

      <td>
        Defines the maximum number of allowed attempts to enter the primary OTP.
      </td>

      <td>
        5
      </td>

      <td>
        Primary
      </td>
    </tr>

    <tr>
      <td>
        CONF_MAX_PASSWORD_RETRY_COUNT
      </td>

      <td>
        Defines the maximum allowed attempts to enter the primary password.
      </td>

      <td>
        5
      </td>

      <td>
        Primary
      </td>
    </tr>

    <tr>
      <td>
        CONF_MFA_MAX_OTP_RETRY_COUNT
      </td>

      <td>
        Defines the maximum allowed attempts to enter the MFA OTP.
      </td>

      <td>
        5
      </td>

      <td>
        MFA
      </td>
    </tr>

    <tr>
      <td>
        CONF_MFA_MAX_PASSWORD_RETRY_COUNT
      </td>

      <td>
        Defines the maximum allowed attempts to enter the MFA password
      </td>

      <td>
        5
      </td>

      <td>
        MFA
      </td>
    </tr>
  </tbody>
</Table>

# Enable API encryption

You can enable encryption for particular APIs using this configuration. Enabling the configuration safeguards the auth-engine from being exploited by triggering OTPs multiple times. If the encryption logic is enabled for a brand,  the APIs to generate OTP have to go through the encryption flow.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Configuration
      </th>

      <th>
        Description
      </th>

      <th>
        Default value
      </th>

      <th>
        Applicability

        (MFA/Primary flow - First factor authentication)
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        CONF_ENABLE_ENCRYPTION
      </td>

      <td>
        To enable the encryption.
      </td>

      <td>
        False (Disabled)
      </td>

      <td>
        Both
      </td>
    </tr>

    <tr>
      <td>
        CONF_ENCRYPTION_PUBLIC_KEY
      </td>

      <td>
        To store the org's public key. The keys are encoded in Base64 format and are constant and do not change.
      </td>

      <td>
        \<PUBLICKEY>
      </td>

      <td>
        Both
      </td>
    </tr>

    <tr>
      <td>
        CONF_ENCRYPTION_PRIVATE_KEY
      </td>

      <td>
        To store the org's private key. The keys are encoded in Base64 format and are constant and do not change.
      </td>

      <td>
        \<PRIVATEKEY>
      </td>

      <td>
        Both
      </td>
    </tr>

    <tr>
      <td>
        CONF_ENCRYPTION_VALID_IN_SECONDS
      </td>

      <td>
        To define the time window during which it considers requests as valid.
      </td>

      <td>
        120 seconds
      </td>

      <td>
        Both
      </td>
    </tr>

    <tr>
      <td>
        CONF_ENCRYPTION_ENDPOINTS
      </td>

      <td>
        To define the API endpoints for which the payload needs to be encrypted. You can encrypt the payload of the APIs `otp/generate` (OTP) and `mfa/otp/generate` (MFA_OTP) API
      </td>

      <td>
        ""
      </td>

      <td>
        Both
      </td>
    </tr>
  </tbody>
</Table>

# Account locking feature

You can configure the account-locking feature to lock a user account after several defined unsuccessful attempts to enter the correct OTP. For example, if the OTP maximum attempt is defined as five and the user enters incorrect OTPs more than five times, you can configure the account locking in such a way that the account gets locked for a defined time. The account unlocks after the [specified number](https://docs.capillarytech.com/reference/validate-otp-api#defining-maximum-otp-retry-attempts).

<Table align={[null,null,null,"left"]}>
  <thead>
    <tr>
      <th>
        Configuration
      </th>

      <th>
        Description
      </th>

      <th>
        Default value
      </th>

      <th>
        Applicability

        (MFA/Primary flow - First factor authentication)
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        CONF_ENABLE_ACCOUNT_LOCKING
      </td>

      <td>
        Enables the account locking feature for the OTP and password.
      </td>

      <td>
        False
      </td>

      <td>
        Primary
      </td>
    </tr>

    <tr>
      <td>
        CONF_LOCK_PERIOD_IN_MINUTES
      </td>

      <td>
        Defines the duration of account locking after entering the OTP/password incorrectly for the specified number of times. The maximum value allowed is 43,200 minutes.
      </td>

      <td>
        30 minutes
      </td>

      <td>
        Primary
      </td>
    </tr>

    <tr>
      <td>
        CONF_ENABLE_ACCOUNT_LOCKING_MFA
      </td>

      <td>
        Enables the account locking feature for the MFA OTP/password.
      </td>

      <td>
        False
      </td>

      <td>
        MFA
      </td>
    </tr>

    <tr>
      <td>
        CONF_MFA_LOCK_PERIOD_IN_MINUTES
      </td>

      <td>
        Defines the duration of account locking after entering the MFA OTP/password incorrectly for the specified number of times. The maximum value allowed is 43,200 minutes.
      </td>

      <td>
        30 minutes
      </td>

      <td>
        MFA
      </td>
    </tr>

    <tr>
      <td>
        CONF_INCORRECT_ATTEMPT_INTERVAL
      </td>

      <td>
        Defines the time interval after which any subsequent attempt is considered a new one, resetting the incorrect OTP/password counter. For more information, refer to the detailed explanation below. **Note:** This is applicable for both primary/MFA OTP and primary/MFA passwords.
      </td>

      <td>
        30 minutes
      </td>

      <td>
        Both
      </td>
    </tr>
  </tbody>
</Table>

# General configurations

Below are some general configurations related to the OTP and token generation in MFA and primary flows.

<Table align={["left","left","left","left"]}>
  <thead>
    <tr>
      <th>
        Configuration
      </th>

      <th>
        Description
      </th>

      <th>
        Default value
      </th>

      <th>
        Applicability

        (MFA/Primary flow - First factor authentication)
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        CONF_TOKEN_SESSION_EXPIRY_MINUTES
      </td>

      <td>
        Defines the expiry time of the session created while generating the token in the primary flow
      </td>

      <td>
        15 minutes
      </td>

      <td>
        Primary
      </td>
    </tr>

    <tr>
      <td>
        CONF_MFA_TOKEN_SESSION_EXPIRY_MINUTES
      </td>

      <td>
        Defines the expiry time of the session created while generating the MFA token in the MFA flow
      </td>

      <td>
        15 minutes
      </td>

      <td>
        MFA
      </td>
    </tr>

    <tr>
      <td>
        CONF_MFA_TOKEN_EXPIRY_IN_MINUTES
      </td>

      <td>
        Defines the validity of the token created in MFA flow.
      </td>

      <td>
        15 minutes
      </td>

      <td>
        MFA
      </td>
    </tr>

    <tr>
      <td>
        CONF_MFA_SESSION_EXPIRY_MINUTES
      </td>

      <td>
        Defines the validity of the MFA session.
      </td>

      <td>
        15 minutes
      </td>

      <td>
        MFA
      </td>
    </tr>

    <tr>
      <td>
        CONF_OTP_LENGTH
      </td>

      <td>
        Defines the length of the One-time password
      </td>

      <td>
        6
      </td>

      <td>
        Both
      </td>
    </tr>

    <tr>
      <td>
        CONF_REGENERATE_TOKEN
      </td>

      <td>
        If enabled, a key is generated after validating the OTP/password. This key is used to regenerate the token from the primary flow.
      </td>

      <td>
        True
      </td>

      <td>
        Primary
      </td>
    </tr>

    <tr>
      <td>
        CONF_REGENERATE_MFA_TOKEN
      </td>

      <td>
        If enabled, a key is generated after validating the OTP/password. This key is used to regenerate the token from the MFA flow.
      </td>

      <td>
        True
      </td>

      <td>
        MFA
      </td>
    </tr>

    <tr>
      <td>
        MFA_ROLE
      </td>

      <td>
        Defines the user role for both MFA and primary flows.<br />
        If the user is not enrolled for MFA, the role is set to USER.<br />
        If enrolled for MFA, the role is set to MFA_PENDING.<br />
        After the MFA process, the role is set to USER.
      </td>

      <td>
        DEFAULT_MFA_ROLE
      </td>

      <td>
        Both
      </td>
    </tr>

    <tr>
      <td>
        CONF_FORCED_MFA
      </td>

      <td>
        Defines if all users need to be forced into the MFA role.<br />
        If set to True, all the users are set to MFA_PENDING and moved to the USER role after the MFA process.
      </td>

      <td>
        False
      </td>

      <td>
        Both
      </td>
    </tr>

    <tr>
      <td>
        CONF_EXTERNAL_ID_LOGIN_ENABLED
      </td>

      <td>
        If enabled, a user is fetched from the Intouch portal if not in the auth-engine.
      </td>

      <td>
        False
      </td>

      <td>
        Primary
      </td>
    </tr>

    <tr>
      <td>
        CONF_INTOUCH_USERRECOG_ON_REFRESH
      </td>

      <td>
        If enabled, the auth-engine updates the token with the customer's latest Intouch user ID on every token refresh, not only during `otp/validate`. Enable this config when an identifier, such as a mobile number, can change in the app, so the token stays current without the customer having to sign out and sign in again.
      </td>

      <td>
        False
      </td>

      <td>
        Both
      </td>
    </tr>

    <tr>
      <td>
        CONF_OTP_SEND_FOR_EXTERNAL_ID
      </td>

      <td>
        Defines where the OTP is to be sent. Possible values: mobile or email.
      </td>

      <td>
        Mobile
      </td>

      <td>
        Both
      </td>
    </tr>

    <tr>
      <td>
        CONFIG_REJECT_NON_CF_CALLS
      </td>

      <td>
        Enforces validation for CloudFront calls during OTP generate requests.<br />
        If enabled, the system expects a specific header during the OTP generation call. If the header is missing, the request to generate OTP is rejected.
      </td>

      <td>
        False
      </td>

      <td>
        Both
      </td>
    </tr>

    <tr>
      <td>
        CONF_SKIP_OTP_VALIDATE
      </td>

      <td>
        If enabled, disables the requirement for OTP validation during the MFA password set-up.
      </td>

      <td>
        False
      </td>

      <td>
        MFA
      </td>
    </tr>

    <tr>
      <td>
        CONF_SKIP_OTP_VALIDATE_RESET
      </td>

      <td>
        If enabled, disables the requirement for OTP validation during the MFA password reset.
      </td>

      <td>
        False
      </td>

      <td>
        MFA
      </td>
    </tr>

    <tr>
      <td>
        CONF_AUTO_FILL_2ND_FACTOR_IDENTIFIER
      </td>

      <td>
        If enabled, the identifier type and value are automatically populated for each API of the MFA flow. This occurs for the particular session for which the token is generated from the primary flow.
      </td>

      <td>
        False
      </td>

      <td>
        MFA
      </td>
    </tr>
  </tbody>
</Table>

## Configuring incorrect attempt time interval

<Callout icon="❗️" theme="error">
  ### Attention

  Make sure that you define a time interval so that the user does not misuse the OTP/password attempts. For example, if you define one minute, the user can wait for one minute after an incorrect OTP/password attempt and start fresh OTP/password attempts
</Callout>

This value defines the time interval after which, any subsequent attempt is considered a new one, resetting the incorrect OTP/password counter. The OTP/password attempts within this time interval are counted together.<br />**Example**<br />Consider that the value is set as five minutes.

* User A attempts to log in but enters the wrong OTP.
* The system records this as the first incorrect attempt and starts a 5-minute countdown timer.<br />Within 5 minutes, User A attempts to log in again but enters the wrong OTP once more.
* Since the second attempt is made within the defined interval of five minutes, the system continues to consider the attempts made within this 5-minute window as part of the same attempt count.
* If User A makes another incorrect attempt after the 5-minute interval has elapsed, it will be considered as the first incorrect attempt again, and the process repeat.

# Integrating WhatsApp and Zalo for OTP communication

You can enable and configure the below configs to integrate WhatsApp and Zalo to send OTPs.

<Table align={[null,null,null,"left"]}>
  <thead>
    <tr>
      <th>
        Configuration
      </th>

      <th>
        Description
      </th>

      <th>
        Default Value
      </th>

      <th>
        Applicability

        (MFA/Primary flow - First factor authentication)
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        CONF\_MOBILE\_SUB\_CHANNEL
      </td>

      <td>
        Channel to send the primary OTP to the user. Values: WHATSAPP or ZALO.
      </td>

      <td>
        -
      </td>

      <td>
        Primary
      </td>
    </tr>

    <tr>
      <td>
        CONF\_MOBILE\_SUB\_CHANNEL\_PROPERTIES
      </td>

      <td>
        Properties for each subchannel (WHATSAPP and ZALO) in JSON format. The message will be sent in this format.
      </td>

      <td>
        {"WHATSAPP": { "template": "OTP generated for whatsapp is {otp}" },<br />
        "ZALO": { "template": "OTP generated for zalo is {otp}" }}
      </td>

      <td>
        Primary
      </td>
    </tr>

    <tr>
      <td>
        CONF\_MFA\_MOBILE\_SUB\_CHANNEL
      </td>

      <td>
        Channel to send MFA OTP to the user. Values: WHATSAPP or ZALO.
      </td>

      <td>
        -
      </td>

      <td>
        MFA
      </td>
    </tr>

    <tr>
      <td>
        CONF\_MFA\_MOBILE\_SUB\_CHANNEL\_PROPERTIES
      </td>

      <td>
        Properties for each subchannel (WHATSAPP and ZALO) in JSON format. The message will be sent in this format.
      </td>

      <td>
        {"WHATSAPP": { "template": "OTP generated for whatsapp is {otp}" },"ZALO": { "template": "OTP generated for zalo is {otp}" }}
      </td>

      <td>
        MFA
      </td>
    </tr>

    <tr>
      <td>
        CONF\_FALLBACK\_CHANNELS
      </td>

      <td>
        Specifies the fallback communication channel to send the OTP.  Supported values: any channel except the defined primary subchannel. See [Fallback channel ](https://docs.capillarytech.com/reference/authentication-configurations#fallback-channel)for more details.
      </td>

      <td>
        -
      </td>

      <td>
        Both
      </td>
    </tr>

    <tr>
      <td>
        CONF\_FALLBACK\_CHANNELS\_PROPERTIES
      </td>

      <td>
        Defines the properties for each fallback channel (WHATSAPP, ZALO, SMS) in JSON format.
      </td>

      <td>
        {"WHATSAPP": { "template": "OTP generated for whatsapp is {otp}" },"ZALO": { "template": "OTP generated for zalo is {otp}" },"SMS": { "template": "OTP generated for sms is {otp}" }}
      </td>

      <td>
        Both
      </td>
    </tr>
  </tbody>
</Table>

## Fallback channel

A fallback channel is used to skip the defined primary subchannel and send the OTP to the communication channel defined in this config. If you have defined a fallback channel and if you use `fallbackChannel={comm channel}` as a query parameter in the [OTP generate API](https://docs.capillarytech.com/reference/generate-otp-api) URL, the system ignores the defined sub-channel and sends the OTP to the channel defined in the fallback channel configuration. For example,

if CONF\_MOBILE\_SUB\_CHANNEL = WHATSAPP,

CONF\_FALLBACK\_CHANNELS = SMS, and

OPT generate URL = `https\:\{host\}/auth/v1/web/otp/generate?fallbackChannel=SMS`

the system always sends the OTP using SMS as the communication channel.

This feature can be used to send OTP to a different channel if the sub-channel is not reachable.

## Error codes

| Error code                                                          | Solution                                                                                  |
| :------------------------------------------------------------------ | :---------------------------------------------------------------------------------------- |
| 1601 Fallback Channel needs identifier mobile                       | Ensure 'mobile' is passed in the body if fallback channel is set as mobile.               |
| 1602 Fallback Channel needs identifier email                        | Ensure 'email' is passed in the body if fallback channel is set, instead of query params. |
| 1603 Channel is not configured properly, please check and try again | Verify subchannel/fallback channel configuration is valid.                                |

<br />