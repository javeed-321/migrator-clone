---
updatedAt: 2026-03-09T05:51:57.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Organizing Dataflows using Tags & Filters

A tag is a label or keyword used to categorize a dataflow, allowing you to group related dataflows. For example, you can assign the tag **'Customer'** to all dataflows related to the customer entity. This helps streamline searches, enabling you to locate all dataflows associated with customer-related processes quickly.

A single tag can be associated with multiple dataflows and a dataflow can have multiple tags assigned to it. You can add up to five tags to a dataflow, with each tag having a maximum length of 15 characters.

In addition to regular tags, there are special tags that begin with ‘@’, known as **Filters**. This can be assigned to dataflows to trigger them automatically before or after a specific dataflow in your organization.

* A **pre-filter** is a filter tag assigned to a dataflow that must execute **before** any dataflow in your org.
* A **post-filter** is a filter tag assigned to a dataflow that must execute **after** any dataflow in your org.

For example, suppose you need to generate an authentication token required to run APIs in your dataflows. In this case, you can create a dataflow that generates the token and assign it a pre-filter tag. Whenever a dataflow in your organization is executed, the token generation dataflow will always run first.

You can create up to three dataflows, each with a different pre-filter, and up to three dataflows, each with a different post-filter. This means a maximum of three dataflows can execute before a dataflow, and up to three dataflows can execute after it.

<Image align="center" border={true} src="https://files.readme.io/33d7939332d4abb7b8d46f3df9dd056d7926fec99ffc33de01ebd9cee402730e-Understanding_Filter.png" className="border" />

## Pre-matching filters

An organization can configure up to three dataflows with pre-matching filters. These filters are:

* **@PreMatching-P1**
* **@PreMatching-P2**
* **@PreMatching-P3**

When multiple pre-matching filters are applied, they execute in sequential order, with **@PreMatching-P1** having the highest priority, followed by **@PreMatching-P2**, and finally **@PreMatching-P3**.

## Post-matching filters

An organization can configure up to three dataflows with post-matching filters. These filters are:

* **@PostMatching-P1**
* **@PostMatching-P2**
* **@PostMatching-P3**

When multiple post-matching filters are applied, they execute in sequential order, with **@PostMatching-P1** having the highest priority, followed by **@PostMatching-P2**, and finally **@PostMatching-P3**.

## Rules to execute filters

Your organization can have dataflows with multiple PreMatching and PostMatching filters. When multiple filters are available, the following are the different rules by which the dataflows are executed.

* The first pre-matching filter, `@PreMatching-P1`, receives the original input request. Subsequent filters use the output of the previous one as input. So, P1's output becomes P2's input, and P2's output becomes P3's input.
* The main dataflow takes the original request as input, not the output of the pre-matching filters.
* The main dataflow’s output is the input for the first post-matching filter.
* Each post-matching filter uses the output of the previous one as its input.
* The last post-matching filter produces the final output.
* If no post-matching filters exist, the main dataflow's output becomes the final output.

## Testing filters

You can test dataflows tagged to a filter using any API tool. To execute a dataflow in the **Draft** state, include its **variant ID** in the request headers:

* **x-cap-neo-test-prefilters-list** for **pre-matching filters**
* **x-cap-neo-test-postfilters-list** for **post-matching filters**

You do not need the variant ID to execute a **Live** dataflow tagged to any filters.

When you run a main dataflow in the **Live** state, its corresponding **Live** filter dataflow runs automatically. However, if you provide a variant ID for a specific filter dataflow during execution, only the specified filter runs.

For further details on testing a dataflow, refer [Executing a Dataflow](https://docs.capillarytech.com/docs/execution-monitoring).

**Note**: No other dataflow executes when a dataflow with a pre-matching or post-matching filter runs.

## Dataflow execution with pre-matching and post-matching filters

Multiple pre-matching and post-matching filters can exist within an organization. When multiple filters are available, the execution of tagged dataflows follows a priority order from P1 to P3 for both pre-matching and post-matching filters.

## Example: Dataflows and their associated tags

| Dataflow Name | Tags Associated With          |
| ------------- | ----------------------------- |
| Dataflow 1    | @PreMatching-P1, Customer     |
| Dataflow 2    | @PreMatching-P2               |
| Dataflow 3    | -                             |
| Dataflow 4    | -                             |
| Dataflow 5    | @PostMatching-P1              |
| Dataflow 6    | @PostMatching-P2, Transaction |

## Execution sequences

### Scenario 1: Executing Dataflow 3

When executing Dataflow 3, the following sequence occurs:

1. The request first passes through Dataflow 1, tagged with @PreMatching-P1, and executes.
2. Next, it moves to Dataflow 2, tagged with @PreMatching-P2, applying additional changes.
3. After executing the pre-matching filters, Dataflow 3 runs using the original input.
4. Upon completion, post-matching filters execute in sequence:
   * Dataflow 5 executes first, tagged with @PostMatching-P1.
   * Dataflow 6 follows, tagged with @PostMatching-P2.
5. The final output is the result of Dataflow 6.

Final execution path:\
*(Original request as input) → Dataflow 1 → Dataflow 2 → (Original request as input) → Dataflow 3 → Dataflow 5 → Dataflow 6*

### Scenario 2: Executing Dataflow 1

When executing Dataflow 1, the following sequence occurs:

1. The request enters Dataflow 1, tagged with @PreMatching-P1, and executes.
2. The final output is the result of Dataflow 1.

Final execution path:\
*(Original request as input) → Dataflow 1*

**Notes:**

* If a dataflow has no prefilter or postfilter tags, only the main dataflow runs.
* If no postfilter exists, the main dataflow's output becomes the final output.
* If an unexpected error occurs, the next dataflow in the sequence runs.
* Pre-matching and post-matching filters include a DAO method that allows early exit. If you use this method, the main dataflow or any remaining dataflows are not executed.
* DAO methods in dataflows tagged to filters are updated to access the output of any block from the previous dataflow tagged to filters.