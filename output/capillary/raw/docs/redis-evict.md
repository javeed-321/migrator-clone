---
updatedAt: 2026-03-26T05:47:21.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Redis Evict Block

The Redis Evict block removes old or unused data from the cache to free up memory and ensure that old data is not retrieved. It is useful when cached data becomes outdated due to updates or changes in the underlying data source and helps free up memory.

To remove data from the Redis cache, identify the cache key storing the data. Then, configure the Redis Evict block by specifying this key to target the correct data. Finally, execute the Redis Evict block to remove the data from the cache, to ensure future requests fetch the latest information.

# Configuring the Redis Evict block

To configure the RedisEvict block,

1. From the dataflow canvas, click on the node and select the **RedisEvict** block.
2. In the **Block name** field, enter the block name.\
   **Note**: Block names cannot contain spaces or special characters, except for underscores (\_). Use camelCase or snake\_case formatting.
3. In the **Keys** field, click **+Add field** to enter the key name. The key is the name specified in the **Key** field during caching.
4. Configure the [input execution logic](https://docs.capillarytech.com/docs/configuring-conditions), [cachable feature](https://docs.capillarytech.com/docs/configuring-caching), and [define the execution path](https://docs.capillarytech.com/docs/configuring-relations) as per the requirement.
5. Click **Done**.

<Image align="center" alt="Configuring the Redis Evict block" border={true} caption="Configuring the Redis Evict block" src="https://files.readme.io/85c21a47e92d068d10ba289fd3732d69627b17e8be47fa22f30b5daaff63d49a-17.02.2025_10.47.06_REC_Configuring_Redis.gif" />