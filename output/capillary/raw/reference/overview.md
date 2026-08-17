---
updatedAt: 2026-08-03T06:55:47.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Overview

# Introduction

The Store Locator service helps mobile app users find nearby stores of a selected brand based on their current geographical location (latitude and longitude) within a specified radius.

## Use Case

The Store Locator is primarily used in mobile applications for brands. Users can make use of this feature to find nearby stores and view additional store-specific details such as opening hours, amenities, and more, customized through brand-specific fields.

## Implementation

### Step 1: Brand Setup

1. Begin by creating a brand entity in the Store Locator system ([in onboarding UI](https://\{host}/#/login)).
2. Select the appropriate cluster (region/server group) the brand belongs to.
3. Provide required branding information such as the brand name and external ID.
4. Generate a secret key—a secure token used internally for authenticated processes.

<Image align="center" border={true} width="80% " src="https://files.readme.io/b212d485b9edd602dcf93133e3decfb6ff5922892c50f9329d4ee8f0397408f9-image1.png" className="border" />

<Callout icon="📘" theme="info">
  **Note**  

  The Deployer UI requires a login. You must raise a ticket to get access.
</Callout>

### Step 2: Organization Onboarding

1. Associate an organization (org) with the brand created above.
2. Provide the organization name, cluster, and a unique Org ID (which must match the Org ID from the existing system—Intouch).
3. User name is the till ID used in Intouch system.
4. Specify a default user ID which will be used during API calls for authentication and tracking.

### Step 3: Store Data Synchronization

1. Store Locator requires access to store details (e.g., name, address, coordinates).
2. A scheduled sync job fetches this data from the master system (Intouch) via a deployment server.
3. This sync ensures that store information is copied into the Store Locator’s internal database.
4. Syncs can also be manually triggered via the UI for immediate updates.

Once synchronization is complete, the Store Locator can retrieve store details and become fully functional for locating nearby stores. You can also utilize sync org by id API to sync for details, refer to .

<Image align="center" border={true} width="80% " src="https://files.readme.io/6b44c2949062a38ad963d73950cb66a1780352de50ee3c6c5b4b4b243fae8f75-image3.png" className="border" />