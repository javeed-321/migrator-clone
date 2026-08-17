---
updatedAt: 2026-04-09T13:55:13.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

#  InTouch password security and account lockout

InTouch protects user accounts through secure password storage and automatic account lockout after repeated failed login attempts. This page describes both mechanisms for security reviews and audit purposes.

## Password storage

InTouch never stores passwords in plain text. All user passwords are processed through the Zion authentication service and stored as irreversible cryptographic hashes.

### Hashing algorithm

Passwords are hashed using the following algorithm before storage:

```
hex( SHA-256 iterated 500,000 times, after an initial salted SHA-256 )
```

This approach has the following properties:

* **One-way:** The stored hash cannot be reversed to recover the original password.
* **Salted:** Each user's password is hashed with a unique salt. See [Salt storage](#salt-storage) for details.
* **Computationally expensive:** 500,000 iterations make brute-force attacks impractical.

### Salt storage

A **salt** is a random value added to a password before hashing. It ensures that two users with the same password produce completely different stored hashes, making large-scale attacks such as rainbow table lookups ineffective.

A unique `password_salt` value is generated and stored for each user. At login, InTouch applies the same salt to the entered password and compares the resulting hash against the stored value. The salt is not an encryption key and cannot be used to recover the original password.

### Storage location

Hashed passwords and salts are stored in the `loggable_users` table in Capillary's Zion-managed authentication database. Passwords are never written to:

* Browser `localStorage` or session storage
* Application logs
* API responses

***

## Account lockout

InTouch automatically locks an account after a defined number of failed login or OTP attempts. This protects against brute-force and credential-stuffing attacks.

### Login lockout

| Parameter                      | Value               |
| ------------------------------ | ------------------- |
| Failed attempts before lockout | 5                   |
| Lockout duration               | 30 minutes          |
| Counter reset                  | On successful login |

If a user enters an incorrect password 5 times, their account is locked for 30 minutes. After the lockout period expires, login attempts are automatically re-enabled. The failed attempt counter resets when the user logs in successfully.

### OTP lockout

OTP verification has a separate lockout counter, independent of the login lockout.

| Parameter                          | Value                          |
| ---------------------------------- | ------------------------------ |
| Failed OTP attempts before lockout | 5                              |
| Lockout duration                   | 30 minutes                     |
| Counter reset                      | On successful OTP verification |

A user can be subject to login lockout, OTP lockout, or both simultaneously if both counters have been exceeded.

### Locked account behavior

When an account is locked, any login attempt returns an error. The user must wait for the lockout period to expire before trying again.

### Lockout configuration

Lockout thresholds (number of attempts and lockout duration) are not configurable per org at this time. The values are fixed platform-wide.

### Unlocking an account

There is no self-serve unlock flow. If a user needs their account unlocked before the lockout period expires, raise a ticket with the Capillary Product Support team.

***

<br />