---
updatedAt: 2026-03-04T06:05:34.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# FAQs

## 1. What is Vulcan?

The Vulcan framework allows for the seamless integration of custom UI components and functionalities into the existing system, significantly enhancing the user experience and meeting specific brand needs.

## 2. What is the difference between global and native apps in Vulcan?

Global apps are accessible to all organizations and cannot be edited once created.

Native apps are specific to a particular organization but can be shared with other brands.

## 3. What are the prerequisites for developing applications with Vulcan

The prerequisites include using Node.js 14, obtaining the necessary Vulcan access permissions, and configuring your development environment with the required tools and software.

## 4. What access levels are available in Vulcan, and what do they allow

**VULCAN READONLY**\
This access level is for users to view the application without making any changes. Users with this level cannot modify or manage the application.

**VULCAN DEV**\
This access level is for developers actively working on application development and testing. Users with DEV access can upload new builds to the platform and enable or disable User Acceptance Testing (UAT) mode.

**VULCAN ADMIN**\
This access level is for administrators managing the overall application. Users with ADMIN access have full control over the application management process and can upload new builds, enable or disable User Acceptance Testing (UAT) mode, enable or disable production (PROD) mode, and delete applications.

**VULCAN SUPERADMIN**\
This access level is for super users to enable overriding Member Care. This is currently restricted to the Capillary engineering team.

## 5. How can I deploy and update applications on Vulcan?

Upload your build file to Vulcan UI, enable UAT for testing, and then promote to production mode.

## 6. What types of APIs are supported on Vulcan?

Vulcan supports APIs like Intouch, XAJA, Extension, Neo Extensions, and various Arya APIs.

## 7. Can a custom URL be created for a Vulcan application?

Custom URLs can be created for external applications only. External applications are currently unsupported on Vulcan.

## 8. Why is my Member Care customizations not reflecting?

Check if you have the appropriate [VULCAN SUPERADMIN ](https://docs.capillarytech.com/docs/vulcan-getting-started#access-roles)permissions to override Member Care.

Ensure that the application name is in the correct format. Refer to the [Customizing the Member Care UI setup section](https://docs.capillarytech.com/docs/customizing-the-member-care-ui#set-up-the-vulcan-application) for more details.

## 9. Can Sharingan apps be embedded in Vulcan?

No, Sharingan pages need to be migrated to Vulcan before they can be embedded in Member Care.

## 10. Will a forked app receive updates when the global app is updated?

No, forked apps do not automatically get updates when the global Member Care app is updated. It is recommended not to fork the repository unless major changes are necessary.

## 11. Where is the Member Care replica, and how can it be accessed?

The Member Care replica repository is available [here](https://github.com/Capillary/cap-member-care-vulcan-replica). For access, submit a JIRA request to the Capillary UI team.