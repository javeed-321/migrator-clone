# Component inventory — https://docs.capillarytech.com

1020 pages · 34433 blocks · 25 distinct constructs · 83 pages needed the lenient parser

Page list from `llms.txt`.

## What is on the site, and what it becomes

| Construct | Syntax | Uses | Pages | Documentation.AI | Status | Note |
| --- | --- | ---: | ---: | --- | --- | --- |
| `paragraph` | markdown | 12805 | 951 | plain markdown | direct |  |
| `heading` | markdown | 7801 | 1020 | plain markdown | direct |  |
| `list` | markdown | 5142 | 720 | plain markdown | transform | normalise `*`/`+` markers to `-` |
| `Image` | jsx | 3002 | 502 | `<Image>` | transform | keep src/alt (+ width/height when real); drop align, border, className, and width="smart" |
| `Table` | jsx | 1795 | 477 | plain markdown | transform | rebuild as a markdown table; only cells with block content need HTML |
| `boilerplate` | markdown | 1020 | 1020 | plain markdown | drop | ReadMe's injected llms.txt preamble |
| `Callout` | jsx | 858 | 360 | `<Callout>` | direct | theme/icon -> kind; drop the emoji, Documentation.AI draws its own |
| `code` | markdown | 603 | 130 | plain markdown | direct |  |
| `br` | html | 508 | 256 | plain markdown | drop | <br /> is not needed — blocks are spaced by the parser |
| `thematicBreak` | markdown | 405 | 79 | plain markdown | direct |  |
| `CodeTabs` | markdown | 132 | 34 | `<CodeGroup>` | transform | tab name goes on BOTH the fence and tabs={["a","b"]} |
| `p` | html | 128 | 2 | plain markdown | manual | raw HTML — check it against the Documentation.AI components |
| `HTMLBlock` | jsx | 102 | 85 | plain markdown | manual | raw HTML+CSS+JS has no equivalent — rebuild with Cards/Columns/Steps, or drop |
| `blockquote` | markdown | 96 | 64 | plain markdown | direct |  |
| `img` | html | 11 | 3 | plain markdown | manual | raw HTML — check it against the Documentation.AI components |
| `Embed` | jsx | 7 | 5 | `<Video>` | transform | YouTube/Vimeo/Loom -> <Video src>; anything else -> <Iframe src width height> |
| `details` | html | 6 | 2 | `<Expandable>` | transform | <details>/<summary> -> <Expandable title> |
| `Tab` | jsx | 3 | 1 | `<Tab>` | direct | title carries over; icon becomes a Lucide name |
| `tbody` | html | 2 | 1 | plain markdown | manual | raw HTML — check it against the Documentation.AI components |
| `ol` | html | 2 | 1 | plain markdown | manual | raw HTML — check it against the Documentation.AI components |
| `strong` | html | 1 | 1 | plain markdown | manual | raw HTML — check it against the Documentation.AI components |
| `thead` | html | 1 | 1 | plain markdown | manual | raw HTML — check it against the Documentation.AI components |
| `Tabs` | jsx | 1 | 1 | `<Tabs>` | direct |  |
| `table` | html | 1 | 1 | plain markdown | manual | raw HTML — check it against the Documentation.AI components |
| `div` | html | 1 | 1 | plain markdown | manual | raw HTML — check it against the Documentation.AI components |

## No direct equivalent — decide before converting

- `p` (128× on 2 pages) — raw HTML — check it against the Documentation.AI components. e.g. docs/april-may-june24#43, docs/april-may-june24#44, docs/april-may-june24#45
- `HTMLBlock` (102× on 85 pages) — raw HTML+CSS+JS has no equivalent — rebuild with Cards/Columns/Steps, or drop. e.g. docs/android-sdk#2, docs/audience-management#2, docs/badges-fact-table#8
- `img` (11× on 3 pages) — raw HTML — check it against the Documentation.AI components. e.g. docs/april-may-june-2025#7, docs/april-may-june-2025#20, docs/points#189
- `tbody` (2× on 1 pages) — raw HTML — check it against the Documentation.AI components. e.g. docs/connectplus-use-cases#32, docs/connectplus-use-cases#34
- `ol` (2× on 1 pages) — raw HTML — check it against the Documentation.AI components. e.g. docs/introduction-to-badges#17, docs/introduction-to-badges#19
- `strong` (1× on 1 pages) — raw HTML — check it against the Documentation.AI components. e.g. docs/april-may-june24#79
- `thead` (1× on 1 pages) — raw HTML — check it against the Documentation.AI components. e.g. docs/connectplus-use-cases#31
- `table` (1× on 1 pages) — raw HTML — check it against the Documentation.AI components. e.g. reference/api-reference-guide#8
- `div` (1× on 1 pages) — raw HTML — check it against the Documentation.AI components. e.g. reference/communications#6

## Not carried over

- `boilerplate` (1020×) — ReadMe's injected llms.txt preamble
- `br` (508×) — <br /> is not needed — blocks are spaced by the parser

## Inline syntax

| Kind | Uses | Pages | Examples |
| --- | ---: | ---: | --- |
| absoluteInternalLink | 5562 | 631 | `https://docs.capillarytech.com/docs/loyalty-information-based-filter` `https://docs.capillarytech.com/docs/transaction-based-filters` `https://docs.capillarytech.com/docs/campaigns-coupons-based-filters` `https://docs.capillarytech.com/docs/user-profile-based-filters` `https://docs.capillarytech.com/docs/lead-based-filters` |
| breakTag | 1935 | 344 | `<br />` `<br />` `<br />` `<br />` `<br />` |
| handlebars | 922 | 41 | `{{ textAlign: "left" }}` `{{key}}` `{{key}}` `{{customer_email}}` `{{first_name}}` |
| anchorJsx | 392 | 96 | `https://docs.capillarytech.com/docs/new-user-management-overview` `https://www.cloudflare.com/en-gb/learning/access-management/what-is-saml/` `https://docs.capillarytech.com/docs/create-offer-1#/create-offers` `https://docs.capillarytech.com/docs/points#/` `https://docs.capillarytech.com/docs/create-cart-promotion#/` |
| markdownImage | 354 | 82 | `https://files.readme.io/aa11e868f7d8a5dc5898aba974d6132968c19f54076573c5f926b36e522ec871-image.png` `https://files.readme.io/86db59d-JLjEnbLfbRiQEbpT7bLyCe3BXz6XpqqQng.png` `https://files.readme.io/5d06853-image13.png` `https://files.readme.io/184a9840a4d3ddbeca59e7bf9f67d16883226cab560fbebfb5761a395b006b06-image.png` `https://files.readme.io/c997cff7a25517db282ca7e97191774889f71737055c39e673ecaac1682bdbd3-image.png` |
| escapedAngle | 49 | 9 | `\<alternate currency name>` `\<br>` `\<br>` `\<Alternate Currency Name>` `\<br>` |

## Flagged for repair

| Issue | Occurrences | Examples |
| --- | ---: | --- |
| no alt text — Documentation.AI pages need one | 2820 | docs/access-group#10, docs/access-group#14, docs/access-group#25 |
| className="border" is redundant with border={true} | 1874 | docs/access-group#10, docs/access-group#14, docs/access-group#25 |
| width has a trailing space — trim it | 886 | docs/access-group#14, docs/accessing-capillary#15, docs/accessing-capillary#27 |
| width="smart" is a legacy RDMD value — drop it | 275 | docs/add-audience-group#21, docs/add-audience-group#38, docs/apply-filters-in-report-1#6 |
| reassembled from several raw-HTML chunks — this page needed the lenient parser | 110 | docs/a#3, docs/a#8, docs/a#9 |
| `curl` is not a highlighter language — use bash | 18 | docs/api_management_on_vulcan#25, docs/oauth2-client-credentials-flow#18, docs/oauth2-client-credentials-flow#19 |
| unclosed <br> is invalid MDX | 12 | docs/actions#326, docs/actions#347, docs/configure-email#117 |
| theme="warning" — the canonical spelling is "warn" | 9 | docs/core-concepts-1#67, docs/create-a-cart-promotions#67, docs/create-a-cart-promotions#203 |
| escaped \<br> renders as literal text | 7 | docs/actions#326, docs/actions#347, docs/configure-email#117 |
| string style="…" outside HTMLBlock is invalid MDX | 1 | reference/api-reference-guide#8 |

## Pages that failed the strict MDX parse

These use ReadMe's lenient MDXish dialect. They are fully blocked out, but the syntax needs
repairing before Documentation.AI will compile them.

- docs/a
- docs/access-group
- docs/accessing-capillary
- docs/add-audience-group
- docs/alternate-currencies
- docs/april-may-june-2026
- docs/april-may-june22
- docs/april-may-june23
- docs/april-may-june24
- docs/attribute-date-transactionpurchase-date
- docs/attribute-discount
- docs/attribute-discount-1
- docs/attribute-slab-information
- docs/attribute-transaction-points
- docs/attribute-transaction-value
- docs/attributes-current-customer-points
- docs/attributes-custom-fields
- docs/attributes-kpis
- docs/attributes-line-item-properties
- docs/attributes-tracker
- docs/audience-group-filter-in-reports
- docs/behavioural-events-ingestion
- docs/campaign_faqs
- docs/configure-email-settings
- docs/configure-event-notification
- docs/configure-gateway-ios
- docs/configure-sftp-server-for-data-export
- docs/configure-sms-settings
- docs/configure-sms-template-content
- docs/configure-streaks
- docs/configure-whatsapp-settings
- docs/configuring-customer-status-change-request-workflow
- docs/configuring-earn-badge-request-workflow
- docs/configuring-goodwill-points-request-workflow
- docs/configuring-issue-badges-request-workflow
- docs/configuring-points-redemption-request-workflow
- docs/connectplus-databricks-job-trigger-template
- docs/connectplus-getting-started
- docs/connectplus-use-cases
- docs/create-message
- docs/create-whatsapp-template
- docs/customer_entity
- docs/customer-profiles
- docs/data-entities
- docs/data-import-
- docs/enabling-creating-a-badge
- docs/extended-fields
- docs/faq-1
- docs/handling-of-rejected-transactions
- docs/january-februar-march-2026
- …and 33 more (see `inventory.json`)
