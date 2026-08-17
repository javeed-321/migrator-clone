---
updatedAt: 2026-08-03T06:55:47.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Get Org Webhooks

Retrieves details of all Webhook accounts created for the organization. An org can have one Webhook account per transformer.

# Example request

```
curl --location 'https://eu.api.capillarytech.com/v2/events/webhooks' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic bmVlc3RvcmV0aWxsTUyZDIzNGI3MA==' \
--header 'Cookie: _cfuvid=gWIp7UTFtKTbf6qKC5IAetGrDGssq6jXMuucoD_.osY-1763039566141-0.0.1.1-604800000' \
--data ''
```

<br />

# Example response

```
{
    "data": [
        {
            "transformerType": "webEngageTransformer",
            "webHookId": "5006f0ab1c82299c504e86b",
            "uniquenessCheckEnabled": true,
            "tillCode": "forrester.1",
            "webHookUri": "https://{host}/eucrm/webhooks/dab1c82299c504e86b",
            "authEnabled": false
        },
        {
            "transformerType": "kumulosTransformer",
            "webHookId": "c2d7c6e0fd68b1976b2765b",
            "uniquenessCheckEnabled": true,
            "tillCode": "test.bukl01",
            "webHookUri": "https://{host}/eucrm/webhookse3f55ecadb0fd68b1976b2765b",
            "authEnabled": false
        },
        {
            "transformerType": "defaultTransformer",
            "webHookId": "b56e785a21f4f77432817",
            "uniquenessCheckEnabled": true,
            "tillCode": "demostorebukl.1",
            "webHookUri": "https://{host}/eucrm/webhooks/62085a21f4f77432817",
            "authEnabled": false
        }
    ],
    "warnings": [],
    "errors": []
}
```

<br />