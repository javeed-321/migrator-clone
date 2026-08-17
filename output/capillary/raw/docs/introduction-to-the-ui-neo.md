---
updatedAt: 2026-03-04T06:05:34.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Introduction to the UI

<Embed url="https://player.vimeo.com/video/1068739450?h=91153c2f28&badge=0&autopause=0&player_id=0&app_id=58479" href="https://player.vimeo.com/video/1068739450?h=91153c2f28&badge=0&autopause=0&player_id=0&app_id=58479" typeOfEmbed="iframe" height="370px" width="100%" iframe="true" />

The screenshot below shows a dataflow and highlights the various UI features.

<Image align="center" border={true} src="https://files.readme.io/5d52e621cc879176798d63ea5f06c4189c46314321d17e424d51eb840efe5e9a-Frame_18.png" className="border" />

<Table align={["left","left","left"]}>
  <thead>
    <tr>
      <th>
        Sl. No
      </th>

      <th>
        Name
      </th>

      <th>
        Description
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        1
      </td>

      <td>
        Name
      </td>

      <td>
        Mentions the name of the dataflow
      </td>
    </tr>

    <tr>
      <td>
        2
      </td>

      <td>
        Tags
      </td>

      <td>
        Indicates the number of tags associated with the dataflow. Place the cursor to see the tag names.
      </td>
    </tr>

    <tr>
      <td>
        3
      </td>

      <td>
        State
      </td>

      <td>
        Specifies if the dataflow is _Active_ or _Inactive_
      </td>
    </tr>

    <tr>
      <td>
        4
      </td>

      <td>
        Version
      </td>

      <td>
        Specifies the version number of the dataflow.
      </td>
    </tr>

    <tr>
      <td>
        5
      </td>

      <td>
        Status
      </td>

      <td>
        Indicates the current status of the dataflow.
      </td>
    </tr>

    <tr>
      <td>
        6
      </td>

      <td>
        Version compare
      </td>

      <td>
        Compares code changes between different versions of the dataflow.

        **Note**: The icon is available only for dataflows in the `Draft` state.
      </td>
    </tr>

    <tr>
      <td>
        7
      </td>

      <td>
        Copy cURL
      </td>

      <td>
        Copies the B2B or B2C cURL of the dataflow, which is used to execute the dataflow.  
      </td>
    </tr>

    <tr>
      <td>
        8
      </td>

      <td>
        Action logs
      </td>

      <td>
        You can view the history of actions performed on a dataflow. This helps you identify the user and the action that was performed on the dataflow. The history is not user-specific. You can view it by clicking the **Action Logs** icon in the Neo UI.  
        Currently, it displays the logs for the copy, view, and paste operations performed using Aira Coder on a dataflow. These logs help you understand how a dataflow moved across organizations or clusters. The log entry includes the following details:

        * User name: The name of the user who performed the action.  
        * Link: If the dataflow was pasted, this shows a link to the original dataflow from which it was copied.
        * Timestamp: The date and time when the action occurred.
        * Operation type: Indicates whether the entry corresponds to a copy, view, or paste action.
      </td>
    </tr>

    <tr>
      <td>
        9
      </td>

      <td>
        Libraries
      </td>

      <td>
        Adds libraries to the dataflow to import blocks.
      </td>
    </tr>

    <tr>
      <td>
        10
      </td>

      <td>
        Restore version
      </td>

      <td>
        Allows you to revert the current version of the dataflow to the most recently approved version.
      </td>
    </tr>

    <tr>
      <td>
        11
      </td>

      <td>
        Save
      </td>

      <td>
        Save changes to the dataflow in the `Draft` version.

        **Note**: This option is only available for dataflows in the `Draft` state.
      </td>
    </tr>

    <tr>
      <td>
        12
      </td>

      <td>
        Send for approval
      </td>

      <td>
        Send the dataflow in the `Draft` state for Neo admin approval. For a dataflow in the `Approved` state, use the **Make Live** option. For a dataflow in the `Live` state, no options are available.

        **Note**: For a dataflow sent for approval, the admin can **Review and approve** it.
      </td>
    </tr>

    <tr>
      <td>
        13
      </td>

      <td>
        Interactivity
      </td>

      <td>
        Controls block interactivity by locking or unlocking it:

        * **Locked**: You cannot move individual blocks. The entire dataflow moves as a single unit, but you can still add new blocks.
        * **Unlocked**: You can move individual blocks, add new blocks and modify connections.
      </td>
    </tr>

    <tr>
      <td>
        14
      </td>

      <td>
        Fit to window
      </td>

      <td>
        Zoom in or zoom out the dataflow to fit the screen.
      </td>
    </tr>

    <tr>
      <td>
        15
      </td>

      <td>
        Zoom out
      </td>

      <td>
        Zoom out to view the entire dataflow at once.
      </td>
    </tr>

    <tr>
      <td>
        16
      </td>

      <td>
        Zoom in
      </td>

      <td>
        Zoom in to focus on specific blocks or connections in the dataflow.
      </td>
    </tr>

    <tr>
      <td>
        17
      </td>

      <td>
        Code view
      </td>

      <td>
        Displays the pseudocode for the latest saved dataflow, covering all the blocks in the dataflow.
      </td>
    </tr>

    <tr>
      <td>
        18
      </td>

      <td>
        Canvas
      </td>

      <td>
        Refers to a workspace where you can design, configure, and visualise the dataflow.
      </td>
    </tr>

    <tr>
      <td>
        19
      </td>

      <td>
        Name (Tab Name)
      </td>

      <td>
        Displays the name of the dataflow within the browser tab. This allows you to organise and view multiple dataflows tabs in the browser.
      </td>
    </tr>
  </tbody>
</Table>