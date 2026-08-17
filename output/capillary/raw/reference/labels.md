---
updatedAt: 2026-06-30T06:58:14.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Labels

The [Labels](https://docs.capillarytech.com/update/docs/labels) APIs let you create, retrieve, update, and manage static metadata labels and their assignments to entities such as customers, products, and stores. Use these APIs to classify and organise entities at scale, control label lifecycles through expiry configurations, and query which labels are attached to which entities.

### What you can do

You can use the Labels APIs to:

* **Create, retrieve, and update labels** scoped to entity types — `CUSTOMER`, `PRODUCT`, or `STORE`
* **Configure label expiry** using fixed dates, relative durations, or no expiry
* **Assign labels to entities** and remove assignments when they are no longer needed
* **Search label assignments** by label identifier, or retrieve all assignments for a given set of entities
* **Update assignment expiry** without removing and re-creating the assignment
* **Auto-create labels on assignment** when a label name is provided and no active label with that name exists for the entity type

<Callout icon="🚧" theme="warn">
  ###

  Notes

  - Deletion is **not supported** for labels. Deactivate a label by setting its `status` to `ARCHIVED`.
  - An archived label can only be re-activated (`status: ACTIVE`). No other fields can be changed while a label is archived.
  - Label names and external IDs must be unique per entity type within an organisation.
</Callout>

### Labels

Static labels are metadata tags attached to entities to classify and organise them. Labels are scoped to an entity type (`CUSTOMER`, `PRODUCT`, or `STORE`) and must be unique by name within the same entity type and organisation.

Each label supports one of three expiry configurations:

| Expiry type  | Description                                                                     |
| ------------ | ------------------------------------------------------------------------------- |
| `NONE`       | Label does not expire (default)                                                 |
| `FIXED_DATE` | Label expires on a specific ISO 8601 date                                       |
| `RELATIVE`   | Label expires after a set duration from creation (`DAYS`, `MONTHS`, or `YEARS`) |

Label create and update operations support batch requests of up to **10 labels per request**. If some labels in a batch succeed and others fail, the API returns **HTTP 207 Multi-Status** with successes in `data` and failures in `errors`.

### Label assignments

A label assignment links a label to a specific entity — for example, a product tagged "Flash-Sale" or a customer tagged "VIP". All assignment operations use the `/v2/labels/assignments` endpoint, except Search which uses `/v2/labels/assignments/search`.

| Operation                   | Method | Endpoint                        | Batch limit                          |
| --------------------------- | ------ | ------------------------------- | ------------------------------------ |
| Create assignments          | POST   | `/v2/labels/assignments`        | 100 assignments per request          |
| Get assignments by entity   | GET    | `/v2/labels/assignments`        | 10 entity IDs per request            |
| Search assignments by label | GET    | `/v2/labels/assignments/search` | Paginated; up to 50 results per page |
| Update assignment expiry    | PUT    | `/v2/labels/assignments`        | 100 updates per request              |
| Remove assignments          | DELETE | `/v2/labels/assignments`        | 100 removals per request             |

Each entity is capped at **100 active label assignments** by default. You can configure this limit per organisation using the `LABEL_ASSIGNMENT_MAX_LABELS_PER_ENTITY` configuration. When you remove an assignment, the entity is untagged immediately — downstream features such as promotions or campaigns that filter by that label will no longer include the entity.

**Auto-creation of labels on assignment.** If you supply `labelName` when creating an assignment and no active label with that name exists for the entity type, the API automatically creates a new label with no expiry before creating the assignment.

<Callout icon="🚧" theme="warn">
  ###

  Notes

  - Only the `expiryDate` field is updatable on an existing assignment. To identify the assignment to update, provide `labelId`, `labelName`, or `labelExternalId` — any one is sufficient.
  - For Remove assignments, supply exactly one identifier type per removal item: `labelIds`, `labelNames`, or `labelExternalIds` (each accepts an array).
  - Use `includeInactive=true` on Get assignments to include expired and removed assignments alongside active ones.
  - Removing an assignment is permanent and takes effect immediately.
</Callout>

## QuickStart: set up and apply labels

Use this sequence when tagging entities for the first time. Follow the order to avoid dependency errors.

### Step 1: Create labels

Define labels scoped to the target entity type (`CUSTOMER`, `PRODUCT`, or `STORE`). Set the expiry type that matches your use case.

### Step 2: Retrieve and verify labels

Use the Get Labels API to confirm label names, external IDs, and expiry configuration before assigning. Results default to `PRODUCT` entity type and `ACTIVE` status — pass `entityType` explicitly if you are working with customers or stores.

### Step 3: Create label assignments

Assign labels to entities in batches of up to 100 assignments per request.

### Step 4: Retrieve assignments

Use Get Label Assignments to confirm which entities are tagged (up to 10 entity IDs per request), or use Search Label Assignments to query all entities tagged with a specific label.

### Step 5: Update or remove assignments

Update assignment expiry as needed, or remove assignments when a tag no longer applies.

<HTMLBlock>{`
<!DOCTYPE html> <html lang="en"> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Capillary Labels API</title> <style> body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell; line-height: 1.6; } .nav-list { list-style: none; padding: 0; margin: 0; max-width: 800px; } .nav-item { padding: 0; border-radius: 8px; margin: 8px 0; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); background-color: rgba(240, 240, 240, 0.4); border: 1px solid rgba(60, 60, 60, 0.1); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02); overflow: hidden; } .nav-item:hover { background-color: rgba(255, 255, 255, 0.8); transform: translateX(4px); border-color: rgba(0, 122, 255, 0.3); box-shadow: 0 8px 16px rgba(0, 122, 255, 0.1); } .nav-link { text-decoration: none !important; border-bottom: none !important; color: #1d1d1f; display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; font-size: 15px; font-weight: 500; } .nav-link:hover { color: #007AFF; text-decoration: none !important; } .badge { font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 6px; min-width: 45px; text-align: center; letter-spacing: 0.5px; transition: all 0.3s ease; opacity: 0.75; } .post { background-color: #e6f7ed; color: #1e7e34; border: 1px solid #bcebc9; } .put { background-color: #fff8e1; color: #b7791f; border: 1px solid #ffeeba; } .get { background-color: #e3f2fd; color: #0d47a1; border: 1px solid #bbdefb; } .delete { background-color: #fde8e8; color: #9b1c1c; border: 1px solid #f5c6c6; } .nav-item:hover .badge { opacity: 1; transform: scale(1.05); color: white; border-color: transparent; } .nav-item:hover .post { background-color: #2ea44f; box-shadow: 0 0 12px rgba(46, 164, 79, 0.5); } .nav-item:hover .put { background-color: #f7811d; box-shadow: 0 0 12px rgba(247, 129, 29, 0.5); } .nav-item:hover .get { background-color: #0366d6; box-shadow: 0 0 12px rgba(3, 102, 214, 0.5); } .nav-item:hover .delete { background-color: #c81e1e; box-shadow: 0 0 12px rgba(200, 30, 30, 0.5); } </style> </head> <body> <div class="doc-container"> <ul class="nav-list"> <li class="nav-item"> <a href="https://docs.capillarytech.com/reference/create-labels" class="nav-link"> <span>Create Labels</span> <span class="badge post">POST</span> </a> </li> <li class="nav-item"> <a href="https://docs.capillarytech.com/reference/update-labels" class="nav-link"> <span>Update Labels</span> <span class="badge put">PUT</span> </a> </li> <li class="nav-item"> <a href="https://docs.capillarytech.com/reference/get-labels" class="nav-link"> <span>Get Labels</span> <span class="badge get">GET</span> </a> </li> <li class="nav-item"> <a href="https://docs.capillarytech.com/reference/create-label-assignments" class="nav-link"> <span>Create Label Assignments</span> <span class="badge post">POST</span> </a> </li> <li class="nav-item"> <a href="https://docs.capillarytech.com/reference/get-label-assignments" class="nav-link"> <span>Get Label Assignments</span> <span class="badge get">GET</span> </a> </li> <li class="nav-item"> <a href="https://docs.capillarytech.com/reference/search-label-assignments" class="nav-link"> <span>Search Label Assignments</span> <span class="badge get">GET</span> </a> </li> <li class="nav-item"> <a href="https://docs.capillarytech.com/reference/update-label-assignments" class="nav-link"> <span>Update Label Assignments</span> <span class="badge put">PUT</span> </a> </li> <li class="nav-item"> <a href="https://docs.capillarytech.com/reference/remove-label-assignments" class="nav-link"> <span>Remove Label Assignments</span> <span class="badge delete">DELETE</span> </a> </li> </ul> </div> </body> </html>
`}</HTMLBlock>

<br />

<br />