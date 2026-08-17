---
updatedAt: 2026-03-09T05:51:57.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Overview

<Embed url="https://player.vimeo.com/video/1058510121?h=bd2e53f905&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" href="https://player.vimeo.com/video/1058510121?h=bd2e53f905&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" typeOfEmbed="iframe" height="370px" width="100%" iframe="true" />

Capillary’s Extension platform helps you enhance the product's core functionality to better meet each brand's unique needs. By integrating the business logic into existing UI components, you can customize features without creating entirely new APIs or UI elements.

With the extension platform, you can perform the following functions:

* **Customize and enrich existing APIs:**: Tailor existing APIs to meet unique business needs.
* **Create new APIs:**  Create new custom APIs to meet specific requirements.
* **Transform data as per requirement:** Transform the source data as per the requirement. For example, creating a JSON payload for an API from the  CSV file.
* **Build and deploy applications:** Create applications as per the brand’s requirements using existing functionalities and enhancing their capabilities.
* **Enrich and enhance event notification payloads:** Enhance event notifications with custom data tailored to brand requirements.

# Advantages of using the extension platform over traditional coding

Extension platforms provide a structured environment to build and customize features, simplifying the development process. The platform offers performance monitoring, scalability, single-tenant architecture, and security, creating a secure, flexible, and developer-friendly environment.

Below are the features of the extension platform:

* **Performance Monitoring**: Provides detailed metrics and monitoring tools to track system performance.
* **Compliance**: Adheres to SOC 2 (System and Organization Controls 2) standards, ensuring robust security and privacy.
* **Streamlined CI/CD**: Supports Continuous Integration and Continuous Deployment with a single-click setup.
* **Scalability and Performance**: Boosts system capabilities with a single-click caching feature.
* **Single-Tenant Architecture**: Maintains a separate database for each organisation, ensuring data isolation and privacy.
* **Data Sensitivity and Security**: Separates production and non-production databases to safeguard sensitive information.
* **Version Control**: Offers robust versioning support for seamless updates and rollbacks.

## Use case

<Embed url="https://player.vimeo.com/video/1058510158?h=84bfeb56d7&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" href="https://player.vimeo.com/video/1058510158?h=84bfeb56d7&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" typeOfEmbed="iframe" height="370px" width="100%" iframe="true" />

**Problem Scenario**\
Consider a scenario where an airline brand associated with Capillary wants to award loyalty points to its customers. However, customer records in the airline system do not always match those in the loyalty system. For example, while the GET Customer API retrieves basic customer information after a flight and the Add Transaction API updates loyalty points, no API is available to compare customer names between the two systems.

**Solution:**\
A wrapper API is created using the extension platform. This API retrieves the first and last name from the airline customer record and compares it with the corresponding records in the loyalty system. If the names match, using the Add Transaction API, the system awards the customer with the eligible points; if they do not, it returns an error. This approach ensures that loyalty points are awarded only to the correct customers.

# Types of extension platforms

Capillary has two types of extension platforms,

* Classic Extension
* Neo Extension

## Classic extension (Avengers)

The Classic extension platform is ideal for complex requirements. This platform allows you to set up a repository, create a project, and write code using the Loopback framework, a Node. js-based framework. You can utilise core packages and, when required, common utilities provided by the platform. This platform offers flexibility, enabling the implementation of complex requirements.

### Key features:

* **Flexibility**: Fully customizable, capable of handling complex requirements.
* **Core Packages & Utilities**: Access to core platform packages and common utilities.
* **Deployment**: Managed through the dev console, where you can build and deploy.
* **Monitoring:**\
  The Classic extension platform enables you to enhance observability by pushing custom response headers to the monitoring system. These headers include key details such as:
  * Plugin name
  * Status code
  * Error name
  * Error message

Using this information, you can track metrics such as:

* Latency
* 95th percentile response time
* Error rate
* Throughput

For the core module, monitoring focuses on latency, throughput, and error rates, with error grouping based on attributes like error name, status code, and plugin.

You can use Classic Extensions when:

* Full customisation is required, or the requirements involve complex integrations and business logic that cannot be managed using pre-defined blocks.
* You need to build APIs based on protocols such as SAML, XML, or SOAP, as Neo Extensions are designed for creating JSON-based APIs.

## Neo extension (Extension 2.0)

The Neo Extensions platform is a low-code alternative to the Classic extension platform. With Neo, you can create workflows for the entire development process using an intuitive drag-and-drop interface. This approach simplifies development and allows you to focus on core tasks while worrying less about setting up connections, libraries, and other technical details. The workflows built using the drag-and-drop blocks are called dataflows in Neo and the drag-and-drop blocks are called the building blocks. Neo is the default extension platform and is always recommended.

### Key features of Neo

* **User-Friendly Interface**: Intuitive drag-and-drop functionality to create workflow.
* **Eliminates Boilerplate Code**: Automatically handles connections, library initialisation, and other repetitive tasks.
* **Focus on Core Objectives**: Enables you to concentrate on achieving primary goals without concerns about integration, error handling, or authentication.
* **Ease of Maintenance**: Simplifies ongoing updates and management.
* **No Cold Start Issues**: Removes delays associated with cold starts to optimise performance.
* **Expose Private APIs**Enables you to use and also expose <Anchor label="private APIs" target="_blank" href="https://docs.capillarytech.com/reference/private-apis#/">private APIs</Anchor> as required.