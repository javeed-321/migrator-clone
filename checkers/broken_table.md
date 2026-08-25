---
title: "Managing Nodes and UI Elements"
description: "Configure nodes, add features and UI elements, and manage UI element attributes such as control name, type, and business rules in the Test Design canvas."
---

## Configure a Node Using the Add Node Functionality

To create a project for a new user, follow the steps described in the [Creating a Project](https://algoshack.documentationai.com/build-and-automate/managing-the-projects/creating-a-project) topic.

### Node Management

In the Canvas, you can:

- Add a node and make sure to configure a node by adding the required features and UI elements in Test Design and save the changes. By default, one feature will be configured. You can neither delete this feature nor send it to another node. If you perform to delete this feature, the system will display an error message.
- Edit a node by selecting the required node and edit them through Test Design.
- Rename a node by clicking the edit button in the node.
- To fetch all features and UI elements, click the node name from any node.
- Nodes can be zoomed in and out by using the Zoom In and Zoom Out icons present on the canvas.
- Delete or remove a node by clicking the delete button available in the node. After deleting a node in the canvas, save the Canvas configuration.

<Callout kind="info" collapsed="false">
  Note that if you try to delete the node before scenarios, an error message will appear.
</Callout>

- Map any UI element to any feature or any feature to any node. It is not limited to a specific scenario.

### UI Elements Management

In the UI elements configuration, you can:

- Add new UI elements to the required feature by clicking the Plus icon at the top of the controls pane, update the attributes of the UI element, such as control name, control value, and current page. By default, one UI element is configured. The following table describes the attributes and descriptions of UI element line items.

| Attributes             | Description                                                                                                                                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Control Name           | Enter the UI element (control) name. For example, in the login page, the submit button is a UI element name.                                                                                                     |
| Control Type           | Select the UI element type. In the preceding example, it is a clickable button that triggers the submission of the username and password data to authenticate the user.                                          |
| Business Rules         | Select the Assertion and Business Rules buttons, then select the checkbox for Business Rules. The selected business rules will appear in Node Configuration. See [Business rules categories](#business-rules-categories). |
| Control Value          | Enter the test data or parameters for the UI element. For example, when you enter "enter your name" in the UI element text box, the parameter is `<username>`.                                                   |
| Locator                | You can update the XPath information captured using the algoScraper tool.                                                                                                                                       |
| Delete Icon            | You can delete a created UI element line item.                                                                                                                                                                  |
| Set the Default Action | You can enter the default action by clicking the More Menu (three dots) and then click Save.                                                                                                                    |

#### Business rules categories

The Business Rules button is enabled only when the UI element type is Textbox, Text Area, or Dropdown List. You can generate different sets of data using business rules, which help to validate text field, text area, and dropdown list.

Business rules categories are:

1. Correct values
2. Incorrect values
3. Illegal values
4. Invalid values
5. Boundary values

The following table provides a list of various UI element types used in Node Configuration:

| UI Element Type       | Description                                                                                                                                                                                                                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Textbox               | The Textbox UI element allows you to input text into a field. It is used in forms or interfaces where you need to provide information, such as entering your name or email address.                                                                                             |
| Button                | A Button is a clickable element that performs an action, like submitting a form or opening a new page.                                                                                                                                                                          |
| Radio Button          | A Radio Button is a clickable option that allows you to choose one item from a set of choices. Once selected, the other options in the group are automatically deselected.                                                                                                      |
| Checkbox              | A Checkbox is a small box that you can check or uncheck to select or deselect an option. Multiple checkboxes in a group allow users to choose more than one option at a time.                                                                                                   |
| Link                  | A Link is a clickable element on a webpage that takes you to another page or resource when you click it.                                                                                                                                                                        |
| Dropdown List         | A dropdown list is a menu that appears when you click the arrow in a box. It shows a list of options that you can choose from.                                                                                                                                                  |
| Image                 | An Image allows an application or website to display an image. It helps in verifying and comparing the image.                                                                                                                                                                   |
| Text area             | A text area provides a multi-line input field where you can enter or edit text. It allows for more text input compared to a regular text box and is often used for comments or descriptions.                                                                                    |
| File Upload           | A file upload allows you to select and upload files from a device to a website or application. It appears as a button or input field where you can browse your files and choose the one you wish to upload.                                                                     |
| Label                 | A label is a text used in a website or app to explain what a button, text box, or other element does. For example, a label might say "Username" next to a text box where you enter your name. It helps users know what to do with that element.                                 |
| Page                  | A page refers to a single screen or view that displays content to the user. It can contain text, images, buttons, links, and other elements that you can interact with. For example, in a website, a home page displays a welcome message, navigation links, and other content. |
| Anchor Tag (Optional) | An Anchor tag `<a>` can be used to link to a specific section in a page.                                                                                                                                                                                                        |
| Mouse                 | A Mouse refers to a visual component in the user interface (UI) that responds to mouse input. These elements are designed to interact with the user when they use a mouse to perform actions like clicking, hovering, or dragging.                                              |
| Scroll                | A scroll refers to the action of moving content up, down, or sideways within a window or container to view more information that extends beyond the visible area.                                                                                                               |
| Window                | A window is a rectangular area on the screen that displays content and allows interaction with an application or system.                                                                                                                                                        |
| New Tab               | A New Tab in applications or web browsers allows you to open a new tab for viewing or interacting with different content without navigating away from the current screen.                                                                                                       |
| Parent (optional)     | A Parent organizes and contains child UI elements, helping to structure and manage their layout and interaction within the interface.                                                                                                                                           |

- search for a particular UI element by entering a keyword from the UI element's name in the search textbox. The matching elements will appear as you type.
- select all the UI elements by selecting the 'Select All' checkbox or clicking the Select All Controls button.
- select multiple UI elements by clicking the double tick icon. Upon selecting multiple UI elements, the Move Selected Controls icon will be enabled, allowing you to move the UI elements (controls) to different features.
- delete the selected UI elements by clicking the Delete icon.
- save your changes by clicking Save, or revert to the original settings by clicking Cancel.

