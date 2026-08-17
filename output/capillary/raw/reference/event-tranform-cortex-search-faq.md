---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# FAQs

#### **Q: What happens if I don't configure a transformation for my organization?**

**A:** The system will use the global default transformation.

#### **Q: Can I have different transformations for different entity types?**

**A:** Yes, you can configure separate transformations for each entity type.

#### **Q: How do I deactivate a transformation?**

**A:** Set the `active` field to `false` in your configuration.

#### **Q: What happens if my transformation endpoint returns an error?**

**A:** The system will log the error and the event will be added to a failed events queue.

#### **Q: Can I see my transformation configuration in the UI?**

**A:** Currently, configurations are managed through the API only.

#### **Q: Is there a limitation on the complexity of transformations?**

**A:** While there are no strict limitations, complex transformations may impact performance.

#### **Q: Can I use the same endpoint for multiple entity types?**

**A:** Yes, but your endpoint should be able to handle different entity types appropriately.