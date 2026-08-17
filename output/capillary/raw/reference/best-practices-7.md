---
updatedAt: 2026-03-04T06:18:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Best Practices

## **Transformation Endpoint Design**

* **Performance:** Keep transformations efficient to minimize latency
* **Validation:** Include validation logic to ensure correctly formatted output
* **Error Handling:** Return descriptive error messages when transformation fails
* **Logging:** Log important events for debugging purposes

## **Configuration Management**

* **Test Thoroughly:** Always test your transformations with sample data before deploying to production
* **Start with Defaults:** Use the global default transformations as a starting point
* **Versioning:** Consider including version information in your endpoint paths
* **Documentation:** Document your transformations for future reference

## **Implementation**

* **Backward Compatibility:** Ensure transformations maintain backward compatibility
* **Gradual Rollout:** Start with less critical entity types before applying to core business events
* **Monitoring:** Set up monitoring to track transformation performance and errors