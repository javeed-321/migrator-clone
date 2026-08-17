---
updatedAt: 2026-03-04T06:05:34.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Configuring Conditions

You can use logical operators to control a block's execution when it receives input from multiple parent blocks, which are blocks that precede and provide input to a child block.

Neo supports two logical operators: AND and OR. The AND operator ensures that the child block executes only when all parent blocks meet their conditions. In contrast, the OR operator allows execution when any one parent block provides input.  Additionally, for an OR operator,  only one parent executes at a time, if multiple parents try to execute simultaneously, the dataflow throws an error.

By default, Neo selects the AND operator.

**Choosing an Operator**

* Click the radio button next to the desired operator.

**Operator Behavior**

* AND Operator – The block executes only after receiving input from all its previous blocks.
* OR Operator – The block executes as soon as it receives input from any of its previous blocks. The OR gate ensures that only one previous block executes at a time.

  <Image alt="Configuring Conditions" align="center" border={true} src="https://files.readme.io/dda0e0f1e86b266d045da38cd282c5b5c4e6ce5c8c806f2bd6084f6c206e445f-image.png">
    Configuring Conditions
  </Image>

#