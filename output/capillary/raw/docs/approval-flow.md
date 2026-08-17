---
updatedAt: 2026-03-09T05:51:57.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Dataflow Versioning

Neo dataflows are version-controlled. By default, a dataflow, when created, is in version `v1
` and in the `Draft` state, allowing users with edit access to compose the dataflow.

When a Neo Admin approves a version under review, the system automatically creates a new version with the next consecutive number. This new version starts in the Draft state and is a copy of the recently approved version, allowing further modifications.

## Compare versions

You can compare code changes between different versions of a dataflow.

To compare versions,

1. In the dataflow composing page, click on the version compare icon.\
   The compare versions window opens.
2. In the compare versions window, use the drop-down to select any two versions to compare.

**Note**:  The icon is available only for dataflows in the `Draft` state.

<Image align="center" border={true} src="https://files.readme.io/7f38477da66fea0f2e7df6e0748cddd09721cabbcc923f2069a78f68c8c105bf-compare_versions.gif" className="border" />

## Restore a version

You can revert the current version of the dataflow to the most recently approved version.

To restore a version,

1. In the dataflow composing page, click on the restore version icon.\
   A Revert Rule modal appears.
2. Enter the dataflow name.
3. Click **Yes.**

The version is restored to the most recently approved version.

<Image align="center" border={true} src="https://files.readme.io/fc801ff47ed0e88360d3aa5ef960ddbb007fed2f29691f4e9c8a6b010f677bcd-restore_version.gif" className="border" />

## Version listing page

The version listing page lists the different versions of a dataflow.

To access the version listing page, on the **Dataflows** page, click on the intended dataflow.

<Image align="center" border={true} src="https://files.readme.io/fc592b2e13abea3620c60abd54f770ac36a2a4ade91362d5c180f1fea8449ad9-version_listing_page.png" className="border" />