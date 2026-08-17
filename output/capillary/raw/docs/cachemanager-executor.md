---
updatedAt: 2026-03-26T05:47:21.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Cache Manager Block

The Cache Manager block lets you interact with a cache system, such as Redis, to perform operations like retrieving data, setting distributed locks, incrementing or decrementing numeric values, and managing cache entries within your Neo dataflow. This block helps optimize dataflow performance by caching frequently accessed data, ensuring data consistency across distributed processes using locks, and managing temporary or transient states.

# Example scenario

## Requirement

A high-traffic e-commerce platform displays product recommendations on its homepage. Generating these recommendations requires multiple database queries and machine learning model inferences, which are computationally intensive. To ensure fast page load times and reduce database load, the platform must cache recommendations for popular categories for a short period.

During flash sales, when a user adds a limited-stock item to their cart, the system must place a temporary lock on that item’s inventory count for that user. This lock prevents overselling while the user completes the checkout process.

## Solution

To meet the performance and consistency requirements, you can create a Neo dataflow that uses the **Cache Manager** block for the two key tasks:

### 1. Caching product recommendations

* Use the **Cache Manager** block in `Get` mode to check if recommendations for a product category already exist in the cache.
* If a cache miss occurs (no data found or expired), the dataflow computes the recommendations using downstream blocks (e.g., database queries or model inference).
* While the **Cache Manager** block currently does not support `Set` mode, the system generating the recommendations is responsible for writing them back to the cache with a suitable TTL (time to live). This ensures that future requests can fetch recommendations directly from the cache, improving page load times and reducing database and compute load.

### 2. Locking inventory during flash sales

* You can use the **Cache Manager** block to store a temporary lock for an item’s inventory when a user adds it to their cart.
* The lock entry includes user and item identifiers, with a short TTL to automatically release the lock if the user does not complete the checkout.
* When the user proceeds to checkout, the dataflow can check the cache to validate the lock before finalising the order.

# Configuring the CacheManager block

To configure the **Cache Manager** block:

1. From the dataflow canvas, click the node where you want to add caching logic, and select the **Cache Manager** block from the list of available executors.

   <Image align="center" className="border" width="55% " border={true} src="https://files.readme.io/cff72c3c6a7f19917146409479621cecfa346e992a25900032cb32fbab6617c2-image.png" />

2. In the **Block name** field, enter a descriptive name for the block.\
   **Note**: Block names cannot contain spaces or special characters, except for underscores (`_`). Use camelCase or snake\_case formatting.

3. In the **Operation Mode** field, choose the cache operation to perform.\
   The following operations are available:

   <Table align={["left","left"]}>
     <thead>
       <tr>
         <th style={{ textAlign: "left" }}>
           Operation
         </th>

         <th style={{ textAlign: "left" }}>
           Description
         </th>
       </tr>
     </thead>

     <tbody>
       <tr>
         <td style={{ textAlign: "left" }}>
           Get
           (Retrieve from Cache)
         </td>

         <td style={{ textAlign: "left" }}>
           Retrieves an item from the cache using the specified key. If the cached item was originally the output of a Neo block, specifically a `BlockDto` (Block Data Transfer Object), the system correctly reconstructs it. Returns `null` if the key is not found or if an error occurs.
         </td>
       </tr>

       <tr>
         <td style={{ textAlign: "left" }}>
           Lock\
            (Acquire Distributed Lock)
         </td>

         <td style={{ textAlign: "left" }}>
           Attempts to acquire a distributed lock for a specific key. This is useful for synchronizing operations on shared resources and preventing race conditions.
         </td>
       </tr>

       <tr>
         <td style={{ textAlign: "left" }}>
           Incr\
            (Increment Value)
         </td>

         <td style={{ textAlign: "left" }}>
           Increments the numeric value associated with a key. If the key does not exist, it is initialized to `0` before the increment operation. A Time-To-Live (TTL) can also be set.
         </td>
       </tr>

       <tr>
         <td style={{ textAlign: "left" }}>
           Decr\
           (Decrement Value)
         </td>

         <td style={{ textAlign: "left" }}>
           Decrements the numeric value associated with a key. If the key does not exist, it is initialized to `0` before the decrement operation. A Time-To-Live (TTL) can also be set.
         </td>
       </tr>

       <tr>
         <td style={{ textAlign: "left" }}>
           RemoveKey\
           (Delete from Cache)
         </td>

         <td style={{ textAlign: "left" }}>
           Deletes a key and its associated value from the cache.
         </td>
       </tr>

       <tr>
         <td style={{ textAlign: "left" }}>
           ReleaseLock\
           (Release Distributed Lock)
         </td>

         <td style={{ textAlign: "left" }}>
           Releases a previously acquired distributed lock. Always release locks when they are no longer needed to free up resources.
         </td>
       </tr>

       <tr>
         <td style={{ textAlign: "left" }}>
           Set
         </td>

         <td style={{ textAlign: "left" }}>
            The `Set` operation is currently not supported in the **Cache Manager** block. You must write to the cache using an external system or custom logic.
         </td>
       </tr>
     </tbody>
   </Table>

   <br />

4. In the **Cache Key Expression** field, enter a JavaScript expression that evaluates to the final [cache key](https://docs.capillarytech.com/docs/configuring-caching) string. This key uniquely identifies the data or lock in the cache.\
   **Example**:\
   To create a user-specific cache key, use: `"user_profile_" + input.body.userId`

5. Configure the [input execution logic](https://docs.capillarytech.com/docs/configuring-conditions).

6. Depending on the selected **Operation Mode**, additional fields **become** available:

   * If the **Operation Mode** is `Lock`, the following fields are available. Both fields are optional.

     | Field Name                             | Description                                                                                                                                                                       | Default    | Constraints                                                                                                       |
     | :------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------- | :---------------------------------------------------------------------------------------------------------------- |
     | **Lock Duration (seconds)**            | Specifies the duration, in seconds, to hold the lock. If the lock isn't explicitly released, it automatically expires after this period.                                          | 20 seconds | Must be a positive number between `1` and `20` (inclusive). If an invalid value is provided, the default is used. |
     | **Lock Acquisition Timeout (seconds)** | Specifies the maximum time, in seconds, for the block to try acquiring the lock if another process is holding it. If the lock isn’t acquired within this time, the attempt fails. | 1          | Must be a positive number between `1` and `20` (inclusive).                                                       |

   * If the **Operation Mode** is `Incr` or `Decr`, the following fields are available. Both are optional.

     | Field Name              | Description                                                                                                                         | Default | Constraints                |
     | :---------------------- | :---------------------------------------------------------------------------------------------------------------------------------- | :------ | :------------------------- |
     | **Amount**              | Specifies the numeric value to increment or decrement the cached key.                                                               | 1       | Must be a valid number.    |
     | **Value TTL (seconds)** | Specifies the time-to-live (TTL), in seconds, for the key when its value is set or updated by the increment or decrement operation. | 3600    | Must be a positive number. |

7. Specify the [execution path](https://docs.capillarytech.com/docs/configuring-relations), if needed.

8. Click **Done**.