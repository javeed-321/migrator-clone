---
updatedAt: 2026-08-14T05:45:49.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Qualifying Conditions and Attributes

Qualifying conditions are the specific rules that a member's action must satisfy to be valid for a loyalty promotion. While a [member action](https://docs.capillarytech.com/docs/loyalty-promotions-core-concepts#member-actions) defines a general event, such as making a transaction, qualifying conditions provide the necessary precision by adding specific criteria. These criteria ensure that rewards are granted only when the action meets exact requirements, such as a minimum spend, a specific store location, or the purchase of a particular product.

Attributes allow you to define specific eligibility criteria based on various data sources, including the customer's profile, the details of their current transaction, and the location where the activity occurs. By combining these attributes, you can create dynamic rules that filter for the right audience and context, for example targeting high-value customers shopping at a specific store during a weekend sale.

> **Note:** In the rule builder, the attribute picker organizes attributes into the following categories. Attributes within each category are listed alphabetically.
>
> * **Customer extended fields** — [Extended fields](https://docs.capillarytech.com/docs/extended-fields) added to your organisation's customer profiles.
> * **Event** — Attributes from the event or transaction that triggered the condition.
> * **Member KPI** — Calculated performance metrics such as points balance, tier level, and visit count.
> * **Member Profile** — Core customer profile data such as name, email, and mobile number.

The following attributes are available:

<HTMLBlock>{`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Loyalty Promotions Qualifying Conditions</title>
    <style>
        .lqc-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 14px;
            width: 100%;
            box-sizing: border-box;
        }

        .lqc-card {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none !important;
            color: #000000 !important;
            box-sizing: border-box;
        }

        @media (prefers-color-scheme: dark) {
            .lqc-card {
                color: #e5e5ea !important;
            }
        }

        .lqc-tile {
            width: 100%;
            aspect-ratio: 1 / 1;
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: transform 0.18s ease, background-color 0.18s ease, box-shadow 0.18s ease;
            box-sizing: border-box;
            padding: 14px 10px 14px;

            background-color: #b8b7b6;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }

        .lqc-card:hover .lqc-tile {
            transform: translateY(-3px) scale(1.03);
            background-color: #9e9d9c;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.14);
        }

        @media (prefers-color-scheme: dark) {
            .lqc-tile {
                background-color: #48484a;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
            }
            .lqc-card:hover .lqc-tile {
                background-color: #636366;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45);
            }
        }

        .lqc-tile svg {
            width: 40%;
            height: 40%;
            flex-shrink: 0;
            color: #ffffff;
            display: block;
            filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.18));
        }

        .lqc-label {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-size: 11px;
            font-weight: 400;
            line-height: 1.3;
            letter-spacing: 0.06em;
            word-spacing: 0.03em;
            text-align: center;
            width: 100%;
            padding: 0 8px;
            box-sizing: border-box;
            color: #ffffff !important;
        }

        .lqc-card-double {
            grid-column: span 2;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none !important;
            color: #000000 !important;
            box-sizing: border-box;
        }

        .lqc-tile-double {
            width: 100%;
            height: 100%;
            min-height: 80px;
            border-radius: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: transform 0.18s ease, background-color 0.18s ease, box-shadow 0.18s ease;
            box-sizing: border-box;
            padding: 14px 16px;
            background-color: #b8b7b6;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .lqc-card-double:hover .lqc-tile-double {
            transform: translateY(-3px) scale(1.01);
            background-color: #9e9d9c;
            box-shadow: 0 8px 24px rgba(0,0,0,0.14);
        }

        @media (prefers-color-scheme: dark) {
            .lqc-tile-double {
                background-color: #48484a;
                box-shadow: 0 2px 10px rgba(0,0,0,0.35);
            }
            .lqc-card-double:hover .lqc-tile-double {
                background-color: #636366;
                box-shadow: 0 8px 24px rgba(0,0,0,0.45);
            }
        }

        @media (max-width: 600px) {
            .lqc-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 380px) {
            .lqc-grid { grid-template-columns: repeat(2, 1fr); }
        }
    </style>
</head>
<body>

<div class="lqc-grid">

    
    <a href="https://docs.capillarytech.com/docs/loyalty-promotions-qualifying-conditions#member-attributes" class="lqc-card">
        <div class="lqc-tile">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="7" r="4"></circle>
                <path d="M5.5 21v-2a6 6 0 0 1 13 0v2"></path>
            </svg>
            <span class="lqc-label">Member Attributes</span>
        </div>
    </a>

    
    <a href="https://docs.capillarytech.com/docs/loyalty-promotions-qualifying-conditions#group-primary-member" class="lqc-card">
        <div class="lqc-tile">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path>
                <circle cx="18" cy="9" r="3"></circle>
                <path d="M23 21v-2a3 3 0 0 0-3-3h-1"></path>
            </svg>
            <span class="lqc-label">Group Primary Member</span>
        </div>
    </a>

    
    <a href="https://docs.capillarytech.com/docs/loyalty-promotions-qualifying-conditions#current-group-primary" class="lqc-card">
        <div class="lqc-tile">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"></path>
                <circle cx="18" cy="9" r="3"></circle>
                <path d="M23 21v-2a3 3 0 0 0-3-3h-1"></path>
            </svg>
            <span class="lqc-label">Current Group Primary</span>
        </div>
    </a>

    
    <a href="https://docs.capillarytech.com/docs/loyalty-promotions-qualifying-conditions#user-group" class="lqc-card">
        <div class="lqc-tile">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="7" r="4"></circle>
                <path d="M5.5 21v-2a6 6 0 0 1 13 0v2"></path>
                <circle cx="5" cy="9" r="3"></circle>
                <path d="M2 21v-1.5a3 3 0 0 1 3-3"></path>
                <circle cx="19" cy="9" r="3"></circle>
                <path d="M22 21v-1.5a3 3 0 0 0-3-3"></path>
            </svg>
            <span class="lqc-label">User Group</span>
        </div>
    </a>

    
    <a href="https://docs.capillarytech.com/docs/loyalty-promotions-qualifying-conditions#purchase-attributes" class="lqc-card">
        <div class="lqc-tile">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1" fill="currentColor" stroke="currentColor"></circle>
                <circle cx="20" cy="21" r="1" fill="currentColor" stroke="currentColor"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span class="lqc-label">Purchase Attributes</span>
        </div>
    </a>

    
    <a href="https://docs.capillarytech.com/docs/loyalty-promotions-qualifying-conditions#purchase-store" class="lqc-card">
        <div class="lqc-tile">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 7l1.5-3h15L21 7"></path>
                <path d="M3 7v1a2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0 2 2 2 2 0 0 0 2-2 2 2 0 0 0 2 2 2 2 0 0 0 2-2v-1"></path>
                <path d="M3 10v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V10"></path>
                <rect x="10" y="14" width="4" height="7"></rect>
            </svg>
            <span class="lqc-label">Purchase Store</span>
        </div>
    </a>

    
    <a href="https://docs.capillarytech.com/docs/loyalty-promotions-qualifying-conditions#referrer-code" class="lqc-card">
        <div class="lqc-tile">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"></circle>
            </svg>
            <span class="lqc-label">Referrer Code</span>
        </div>
    </a>

    
    <a href="https://docs.capillarytech.com/docs/loyalty-promotions-qualifying-conditions#activity-attributes" class="lqc-card">
        <div class="lqc-tile">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 250">
                <g fill="none" stroke="#ffffff" stroke-width="18" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="185" cy="55" r="20"></circle>
                    <path d="M 168 68 Q 135 100 125 135"></path>
                    <path d="M 158 78 L 105 55 L 75 90"></path>
                    <path d="M 158 78 L 168 120 L 205 100"></path>
                    <path d="M 125 135 L 80 180 L 40 215 L 70 230"></path>
                    <path d="M 125 135 L 160 170 L 100 195 L 115 215"></path>
                </g>
            </svg>
            <span class="lqc-label">Activity Attributes</span>
        </div>
    </a>

    
    <a href="https://docs.capillarytech.com/docs/loyalty-promotions-qualifying-conditions#event-location" class="lqc-card">
        <div class="lqc-tile">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path>
                <circle cx="12" cy="9" r="2.5"></circle>
            </svg>
            <span class="lqc-label">Event Location</span>
        </div>
    </a>

    
    <a href="#" class="lqc-card">
        <div class="lqc-tile">
            <span class="lqc-label" style="font-size: 17px; white-space: nowrap;">Attributes</span>
        </div>
    </a>

</div>

</body>
</html>
`}</HTMLBlock>

## Member attributes

Member attributes enable you to create conditions based on the individual profile of the person interacting with your brand. This category includes demographic details like a name or email address, as well as dynamic loyalty data, for example, their current tier, available points balance, and lifetime purchase history.

The member attributes are supported for the following member actions: gets enrolled in the program, redeems points, redeems a coupon, updates a customer profile, makes a transaction, gets delinked from a partner program, gets linked to a partner program, tier is updated in a partner program, behavioral event.

<HTMLBlock>{`
<div style="box-sizing:border-box;margin:0 0 16px;padding:0;max-width:100%;"><div style="box-sizing:border-box;margin:0 0 5px;padding:0;font:400 11.5px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#6b7280;">Member Attributes &#183; 65 attributes &#183; zoom in for more clarity</div><div style="box-sizing:border-box;display:block;width:100%;max-width:100%;overflow:hidden;border:1px solid #e1e4e8;border-radius:5px;background:#ffffff;position:relative;z-index:0;isolation:isolate;contain:layout paint;margin:0;padding:6px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1369 665" width="820" height="398" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Member Attributes attributes grouped by value type" style="display:block;width:100%;max-width:100%;height:auto;margin:0 auto">
<rect x="0" y="0" width="1369" height="665" fill="#ffffff"/>
<path d="M 162 213.9 L 172 213.9 L 172 38.0 L 206 38.0" fill="none" stroke="#0000ff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="213.9" rx="2.6" ry="2.6" fill="#0000ff"/>
<ellipse cx="206" cy="38.0" rx="2.6" ry="2.6" fill="#0000ff"/>
<path d="M 162 228.8 L 179 228.8 L 179 183.0 L 206 183.0" fill="none" stroke="#bd00bd" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="228.8" rx="2.6" ry="2.6" fill="#bd00bd"/>
<ellipse cx="206" cy="183.0" rx="2.6" ry="2.6" fill="#bd00bd"/>
<path d="M 162 243.6 L 186 243.6 L 186 283.0 L 206 283.0" fill="none" stroke="#ff3399" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="243.6" rx="2.6" ry="2.6" fill="#ff3399"/>
<ellipse cx="206" cy="283.0" rx="2.6" ry="2.6" fill="#ff3399"/>
<path d="M 162 258.5 L 193 258.5 L 193 17 L 584 17 L 584 38.0 L 593 38.0" fill="none" stroke="#009900" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="258.5" rx="2.6" ry="2.6" fill="#009900"/>
<ellipse cx="593" cy="38.0" rx="2.6" ry="2.6" fill="#009900"/>
<path d="M 162 273.4 L 172 273.4 L 172 21 L 956 21 L 956 38.0 L 980 38.0" fill="none" stroke="#ff8000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="273.4" rx="2.6" ry="2.6" fill="#ff8000"/>
<ellipse cx="980" cy="38.0" rx="2.6" ry="2.6" fill="#ff8000"/>
<path d="M 162 288.2 L 179 288.2 L 179 25 L 961 25 L 961 243.0 L 980 243.0" fill="none" stroke="#990000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="288.2" rx="2.6" ry="2.6" fill="#990000"/>
<ellipse cx="980" cy="243.0" rx="2.6" ry="2.6" fill="#990000"/>
<path d="M 162 303.1 L 186 303.1 L 186 17 L 966 17 L 966 328.0 L 980 328.0" fill="none" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="303.1" rx="2.6" ry="2.6" fill="#666666"/>
<ellipse cx="980" cy="328.0" rx="2.6" ry="2.6" fill="#666666"/>
<rect x="12" y="199.0" width="150" height="119" fill="#1a3c6e" stroke="#333333" stroke-width="1"/>
<text x="87.0" y="262.5" text-anchor="middle" font-family="Helvetica" font-size="11" font-weight="bold" fill="#ffffff">Member Attributes</text>
<rect x="206" y="28" width="357" height="131" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="206" y="28" width="357" height="20" fill="#ccffff" stroke="#333333" stroke-width="1"/>
<text x="384.5" y="42.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">String (7)</text>
<text x="214" y="59.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">First Name</text>
<text x="214" y="74.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Last Name</text>
<text x="214" y="89.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Name</text>
<text x="214" y="104.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Mobile</text>
<text x="214" y="119.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Email</text>
<text x="214" y="134.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">External Id</text>
<rect x="207" y="138" width="355" height="15" fill="#fbfaf3"/>
<text x="214" y="149.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Is Registered At <tspan fill="#8a6d00" font-style="italic">&lt;Concept | Zone | Till&gt; &lt;name&gt;</tspan></text>
<rect x="206" y="173" width="357" height="86" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="206" y="173" width="357" height="20" fill="#fff2cc" stroke="#333333" stroke-width="1"/>
<text x="384.5" y="187.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Date (4) <tspan fill="#8a6d00" font-style="italic">[diff]</tspan></text>
<text x="214" y="204.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Slab Change Date</text>
<text x="214" y="219.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Slab Expiry Date</text>
<text x="214" y="234.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Join Date</text>
<text x="214" y="249.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Customer Enrollment Date</text>
<rect x="206" y="273" width="357" height="131" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="206" y="273" width="357" height="20" fill="#ffe6f2" stroke="#333333" stroke-width="1"/>
<text x="384.5" y="287.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Multi-select / Cluster (7)</text>
<text x="214" y="304.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Communication Profile</text>
<text x="214" y="319.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Belong To Segment</text>
<rect x="207" y="323" width="355" height="15" fill="#fbfaf3"/>
<text x="214" y="334.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Custom Fields <tspan fill="#666666" font-style="italic">[?]</tspan></text>
<text x="214" y="349.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Collections</text>
<text x="214" y="364.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Labels</text>
<rect x="207" y="368" width="355" height="15" fill="#fbfaf3"/>
<text x="214" y="379.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Enrolment Values <tspan fill="#0057a3" font-style="italic">&lt;Enrollment form field&gt;</tspan></text>
<rect x="207" y="383" width="355" height="15" fill="#fbfaf3"/>
<text x="214" y="394.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Optin Values <tspan fill="#0057a3" font-style="italic">&lt;Channel name&gt;</tspan></text>
<rect x="593" y="28" width="357" height="461" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="593" y="28" width="357" height="20" fill="#d5e8d4" stroke="#333333" stroke-width="1"/>
<text x="771.5" y="42.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Numeric (29)</text>
<text x="601" y="59.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Slab Number</text>
<text x="601" y="74.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Points Redeemed Today</text>
<text x="601" y="89.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Number Of Visits</text>
<text x="601" y="104.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Number Of Txns</text>
<text x="601" y="119.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Current All Points</text>
<text x="601" y="134.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Promised points current balance</text>
<text x="601" y="149.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Lifetime promised points earned</text>
<text x="601" y="164.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Initial Current All Points</text>
<text x="601" y="179.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Initial Lifetime Points</text>
<text x="601" y="194.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Points Redeemed In Calendar Week</text>
<text x="601" y="209.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Number Of Redemptions In Calendar Month</text>
<text x="601" y="224.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Number Of Txns Today</text>
<text x="601" y="239.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Initial Current Points</text>
<text x="601" y="254.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Avg Basket Size</text>
<text x="601" y="269.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Number Of Redemptions Today</text>
<text x="601" y="284.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Lifetime All Points</text>
<text x="601" y="299.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Number Of Redemptions In Calendar Week</text>
<text x="601" y="314.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Points Redeemed In Calendar Month</text>
<text x="601" y="329.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Points Redeemed In Period</text>
<text x="601" y="344.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Count Of Redemptions In Period</text>
<text x="601" y="359.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Points Redeemed In Past Days</text>
<text x="601" y="374.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Streak Current Value</text>
<text x="601" y="389.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Number Of Redemptions In Past Days</text>
<text x="601" y="404.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Tracker Value Tracked In Current Event</text>
<text x="601" y="419.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Tracker Value Before Event</text>
<text x="601" y="434.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Transaction Count In Date Range</text>
<rect x="594" y="438" width="355" height="15" fill="#fbfaf3"/>
<text x="601" y="449.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Tracker Value Current Event <tspan fill="#0057a3" font-style="italic">&lt;Tracker name&gt;</tspan></text>
<rect x="594" y="453" width="355" height="15" fill="#fbfaf3"/>
<text x="601" y="464.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Count Active Coupons In Coupon Series <tspan fill="#0057a3" font-style="italic">&lt;Coupon series name&gt;</tspan></text>
<rect x="594" y="468" width="355" height="15" fill="#fbfaf3"/>
<text x="601" y="479.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Currency Metrics <tspan fill="#006064" font-style="italic">[see]</tspan></text>
<rect x="980" y="28" width="357" height="191" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="980" y="28" width="357" height="20" fill="#ffe6cc" stroke="#333333" stroke-width="1"/>
<text x="1158.5" y="42.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Currency (11)</text>
<text x="988" y="59.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Lifetime Purchase</text>
<text x="988" y="74.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Lifetime Purchase (before current activity)</text>
<text x="988" y="89.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Avg Spend Per Visit</text>
<text x="988" y="104.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Sum Of Item Quantity</text>
<text x="988" y="119.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Sum Of Item Gross Amount</text>
<text x="988" y="134.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Count Of Unique Line Items</text>
<text x="988" y="149.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Sum Of Item Discount</text>
<text x="988" y="164.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Transaction Sum In Date Range</text>
<text x="988" y="179.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Target Achieved In Period</text>
<text x="988" y="194.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Target Achieved In Current Period</text>
<rect x="981" y="198" width="355" height="15" fill="#fbfaf3"/>
<text x="988" y="209.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Transaction Metrics <tspan fill="#006064" font-style="italic">[see]</tspan></text>
<rect x="980" y="233" width="357" height="71" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="980" y="233" width="357" height="20" fill="#e6e6ff" stroke="#333333" stroke-width="1"/>
<text x="1158.5" y="247.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Category / Enum (3)</text>
<text x="988" y="264.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Slab Name</text>
<text x="988" y="279.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Loyalty Type</text>
<text x="988" y="294.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Member Status</text>
<rect x="980" y="318" width="357" height="86" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="980" y="318" width="357" height="20" fill="#e6e6e6" stroke="#333333" stroke-width="1"/>
<text x="1158.5" y="332.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Boolean (4)</text>
<rect x="981" y="338" width="355" height="15" fill="#fbfaf3"/>
<text x="988" y="349.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Is Subscribed To Channel <tspan fill="#0057a3" font-style="italic">&lt;Channel name&gt;</tspan></text>
<rect x="981" y="353" width="355" height="15" fill="#fbfaf3"/>
<text x="988" y="364.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Cluster Value Includes <tspan fill="#0057a3" font-style="italic">&lt;Cluster / segment name&gt;</tspan></text>
<rect x="981" y="368" width="355" height="15" fill="#fbfaf3"/>
<text x="988" y="379.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Segment excludes <tspan fill="#0057a3" font-style="italic">&lt;Cluster / segment name&gt;</tspan></text>
<rect x="981" y="383" width="355" height="15" fill="#fbfaf3"/>
<text x="988" y="394.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Custom Field Value Exists <tspan fill="#0057a3" font-style="italic">&lt;Custom field name&gt;</tspan></text>
<rect x="206" y="509.0" width="118" height="53" fill="#ffffff" stroke="#b8860b" stroke-width="1.2"/>
<rect x="206" y="509.0" width="118" height="15" fill="#fff9c4" stroke="#b8860b" stroke-width="1.2"/>
<text x="265.0" y="520.0" text-anchor="middle" font-family="Helvetica" font-size="8" font-weight="bold" fill="#b8860b">Then pick a level</text>
<text x="212" y="532.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Concept</text>
<text x="212" y="543.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Zone</text>
<text x="212" y="554.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Till</text>
<path d="M 324 535.5 L 340 535.5" fill="none" stroke="#b8860b" stroke-width="1.4" stroke-dasharray="4,3" stroke-linecap="round"/>
<rect x="340" y="509.0" width="150" height="53" fill="#ffffff" stroke="#b8860b" stroke-width="1.2"/>
<rect x="340" y="509.0" width="150" height="15" fill="#fff9c4" stroke="#b8860b" stroke-width="1.2"/>
<text x="415.0" y="520.0" text-anchor="middle" font-family="Helvetica" font-size="8" font-weight="bold" fill="#b8860b">Then the value</text>
<text x="346" y="532.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Name of the selected level</text>
<path d="M 563 145.5 L 578.0 145.5 L 578.0 500.0 L 265.0 500.0 L 265.0 509.0" fill="none" stroke="#b8860b" stroke-width="1.4" stroke-dasharray="4,3" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="563" cy="145.5" rx="2.4" ry="2.4" fill="#b8860b"/>
<rect x="520" y="509.0" width="150" height="64" fill="#ffffff" stroke="#b8860b" stroke-width="1.2"/>
<rect x="520" y="509.0" width="150" height="15" fill="#fff9c4" stroke="#b8860b" stroke-width="1.2"/>
<text x="595.0" y="520.0" text-anchor="middle" font-family="Helvetica" font-size="8" font-weight="bold" fill="#b8860b">If you pick a diff operator</text>
<text x="526" y="532.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Date Diff</text>
<text x="526" y="543.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Days Diff</text>
<text x="526" y="554.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Days Diff from String</text>
<text x="526" y="565.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Minutes Diff</text>
<path d="M 670 541.0 L 686 541.0" fill="none" stroke="#b8860b" stroke-width="1.4" stroke-dasharray="4,3" stroke-linecap="round"/>
<rect x="686" y="509.0" width="150" height="64" fill="#ffffff" stroke="#b8860b" stroke-width="1.2"/>
<rect x="686" y="509.0" width="150" height="15" fill="#fff9c4" stroke="#b8860b" stroke-width="1.2"/>
<text x="761.0" y="520.0" text-anchor="middle" font-family="Helvetica" font-size="8" font-weight="bold" fill="#b8860b">Then a date to compare with</text>
<text x="692" y="532.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">e.g. Date of Birth</text>
<path d="M 836 541.0 L 852 541.0" fill="none" stroke="#b8860b" stroke-width="1.4" stroke-dasharray="4,3" stroke-linecap="round"/>
<rect x="852" y="509.0" width="150" height="64" fill="#ffffff" stroke="#b8860b" stroke-width="1.2"/>
<rect x="852" y="509.0" width="150" height="15" fill="#fff9c4" stroke="#b8860b" stroke-width="1.2"/>
<text x="927.0" y="520.0" text-anchor="middle" font-family="Helvetica" font-size="8" font-weight="bold" fill="#b8860b">Then operator + number</text>
<text x="858" y="532.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">e.g. Greater Than 30</text>
<path d="M 563 183.0 L 578.0 183.0 L 578.0 496.0 L 595.0 496.0 L 595.0 509.0" fill="none" stroke="#b8860b" stroke-width="1.4" stroke-dasharray="4,3" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="563" cy="183.0" rx="2.4" ry="2.4" fill="#b8860b"/>
<rect x="12" y="585.0" width="9" height="9" fill="#ccffff" stroke="#333333" stroke-width="0.6"/>
<text x="25" y="592.0" font-family="Helvetica" font-size="8.5" fill="#444444">String</text>
<rect x="66.6" y="585.0" width="9" height="9" fill="#d5e8d4" stroke="#333333" stroke-width="0.6"/>
<text x="79.6" y="592.0" font-family="Helvetica" font-size="8.5" fill="#444444">Numeric</text>
<rect x="125.79999999999998" y="585.0" width="9" height="9" fill="#ffe6cc" stroke="#333333" stroke-width="0.6"/>
<text x="138.79999999999998" y="592.0" font-family="Helvetica" font-size="8.5" fill="#444444">Currency</text>
<rect x="189.59999999999997" y="585.0" width="9" height="9" fill="#fff2cc" stroke="#333333" stroke-width="0.6"/>
<text x="202.59999999999997" y="592.0" font-family="Helvetica" font-size="8.5" fill="#444444">Date</text>
<rect x="234.99999999999997" y="585.0" width="9" height="9" fill="#e6e6ff" stroke="#333333" stroke-width="0.6"/>
<text x="247.99999999999997" y="592.0" font-family="Helvetica" font-size="8.5" fill="#444444">Category / Enum</text>
<rect x="331.0" y="585.0" width="9" height="9" fill="#ffe6f2" stroke="#333333" stroke-width="0.6"/>
<text x="344.0" y="592.0" font-family="Helvetica" font-size="8.5" fill="#444444">Multi-select / Cluster</text>
<rect x="459.2" y="585.0" width="9" height="9" fill="#e6e6e6" stroke="#333333" stroke-width="0.6"/>
<text x="472.2" y="592.0" font-family="Helvetica" font-size="8.5" fill="#444444">Boolean</text>
<text x="12" y="605.0" font-family="Helvetica" font-size="8.5" fill="#0057a3">&lt;...&gt;  pick this before the value</text>
<text x="12" y="617.0" font-family="Helvetica" font-size="8.5" fill="#006064">[see]  opens the &quot;Transaction and currency metrics&quot; builder</text>
<text x="12" y="629.0" font-family="Helvetica" font-size="8.5" fill="#666666">[?]  extra selector not yet confirmed</text>
<text x="12" y="641.0" font-family="Helvetica" font-size="8.5" fill="#8a6d00">[diff]  Date Diff / Days Diff / Days Diff from String / Minutes Diff -&gt; pick a date to compare with -&gt; operator + number</text>
</svg></div></div>
`}</HTMLBlock>

| Attribute                                   | Classification   | Supported Operators                                                                                                                                                                                                                                                                                                                                     | Description                                                                                                                                                                                                                                                                         | Example                                                              |
| :------------------------------------------ | :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| First Name                                  | Member Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches                                                                                                                                                                                                                                                              | The primary member’s first name.                                                                                                                                                                                                                                                    | First Name Matches "Chris"                                           |
| Last Name                                   | Member Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches                                                                                                                                                                                                                                                              | The last name of the group's primary member.                                                                                                                                                                                                                                        | Last Name Equals "Smith"                                             |
| Name                                        | Member Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches                                                                                                                                                                                                                                                              | The full name of the primary member.                                                                                                                                                                                                                                                | Name Contains "John"                                                 |
| Mobile                                      | Member Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches                                                                                                                                                                                                                                                              | The primary member's mobile number.                                                                                                                                                                                                                                                 | Mobile Is Not Null                                                   |
| Email                                       | Member Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches                                                                                                                                                                                                                                                              | The registered email of the primary member.                                                                                                                                                                                                                                         | Email Is Valid                                                       |
| External Id                                 | Member Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches                                                                                                                                                                                                                                                              | Unique external ID of the primary member.                                                                                                                                                                                                                                           | External Id Exists                                                   |
| Slab Number                                 | Member Attribute | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null                                                                                                                                                                                                                                            | The tier number of the primary member.                                                                                                                                                                                                                                              | Slab Number Greater Than Or Equal 4                                  |
| Slab Name                                   | Member Attribute | Not Exists, Is One Of, Matches Regex, Starts With, Is None Of, Does Not Equal, Exists, Contains, Equals                                                                                                                                                                                                                                                 | The tier name of the primary member.                                                                                                                                                                                                                                                | Slab Name Is One Of \["Gold", "Platinum"]                            |
| Slab Change Date                            | Member Attribute | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Minutes Diff, Is Before, Is Not, Is, Is On or Before, Day Of Month, Is On or After, Is Not Null, Is Time Between, Is Null, Is After, Is Valid, Date Diff, Days Diff from String, Is Hour Between, Days Diff, Is Weekend, Is Weekday, Is Between, Is Not Between | Date the primary member last changed tiers.                                                                                                                                                                                                                                         | Slab Change Date Is Before "2024-01-01"                              |
| Slab Expiry Date                            | Member Attribute | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Minutes Diff, Is Before, Is Not, Is, Is On or Before, Day Of Month, Is On or After, Is Not Null, Is Time Between, Is Null, Is After, Is Valid, Date Diff, Days Diff from String, Is Hour Between, Days Diff, Is Weekend, Is Weekday, Is Between, Is Not Between | Tier expiration date for the primary member.                                                                                                                                                                                                                                        | Slab Expiry Date Is After Today                                      |
| Join Date                                   | Member Attribute | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Minutes Diff, Is Before, Is Not, Is, Is On or Before, Day Of Month, Is On or After, Is Not Null, Is Time Between, Is Null, Is After, Is Valid, Date Diff, Days Diff from String, Is Hour Between, Days Diff, Is Weekend, Is Weekday, Is Between, Is Not Between | The date the primary member joined the program.                                                                                                                                                                                                                                     | Month of Join Date Equals 12                                         |
| Customer Enrollment Date                    | Member Attribute | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Minutes Diff, Is Before, Is Not, Is, Is On or Before, Day Of Month, Is On or After, Is Not Null, Is Time Between, Is Null, Is After, Is Valid, Date Diff, Days Diff from String, Is Hour Between, Days Diff, Is Weekend, Is Weekday, Is Between, Is Not Between | The system timestamp when the primary member's record was created.                                                                                                                                                                                                                  | Customer Enrolment Date Is After "2024-01-01"                        |
| Loyalty Type                                | Member Attribute | Not Exists, Is One Of, Matches Regex, Starts With, Is None Of, Does Not Equal, Exists, Contains, Equals                                                                                                                                                                                                                                                 | The loyalty category of the primary member.                                                                                                                                                                                                                                         | Loyalty Type Any Match "LOYAL"                                       |
| Communication Profile                       | Member Attribute | matches all of, matches any of, is not in                                                                                                                                                                                                                                                                                                               | Channels the primary member has opted into.                                                                                                                                                                                                                                         | Communication Profile Contains "WHATSAPP"                            |
| Member Status                               | Member Attribute | Not Exists, Is One Of, Matches Regex, Starts With, Is None Of, Does Not Equal, Exists, Contains, Equals                                                                                                                                                                                                                                                 | Current operational status of the primary member.                                                                                                                                                                                                                                   | Member Status Any Match "ACTIVE"                                     |
| Is Registered At                            | Member Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches                                                                                                                                                                                                                                                              | The location where the primary member registered.                                                                                                                                                                                                                                   | Registered At Equals "Store 101"                                     |
| Belong To Segment                           | Member Attribute | matches all of, matches any of, is not in                                                                                                                                                                                                                                                                                                               | Checks if the primary member is in a specific cluster.                                                                                                                                                                                                                              | Belong To Segment Any Match "VIP"                                    |
| Points Redeemed Today                       | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Points the primary member redeemed today.                                                                                                                                                                                                                                           | Points Redeemed Today Greater Than 500                               |
| Number Of Visits                            | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Total unique visit count of the primary member.                                                                                                                                                                                                                                     | Number Of Visits Greater Than 10                                     |
| Number Of Txns                              | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Total transaction count of the primary member.                                                                                                                                                                                                                                      | Number Of Txns Equals 100                                            |
| Lifetime Purchase                           | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Total spend history of the primary member.                                                                                                                                                                                                                                          | Lifetime Purchase Greater Than 2000                                  |
| Current All Points                          | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Primary member's current total points (Redeemable + Promised).                                                                                                                                                                                                                      | Current All Points Greater Than 10000                                |
| Promised points current balance             | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Primary's balance of promised/pending points.                                                                                                                                                                                                                                       | Current Non Redeemable Points Greater Than 500                       |
| Lifetime promised points earned             | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Total promised points ever earned by the primary member.                                                                                                                                                                                                                            | Lifetime Non Redeemable Points Is Not Null                           |
| Lifetime Purchase (before current activity) | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Primary's lifetime spend before the current event.                                                                                                                                                                                                                                  | Initial Lifetime Purchase Less Than 500                              |
| Initial Current All Points                  | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Primary's total points balance before the current event.                                                                                                                                                                                                                            | Initial Current All Points Equals 0                                  |
| Initial Lifetime Points                     | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Primary's lifetime redeemable points before the current event.                                                                                                                                                                                                                      | Initial Lifetime Points Less Than 10000                              |
| Points Redeemed In Calendar Week            | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Points redeemed by primary member this week.                                                                                                                                                                                                                                        | Points Redeemed In Calendar Week Greater Than 20000                  |
| Number Of Redemptions In Calendar Month     | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Count of primary member's redemptions this month.                                                                                                                                                                                                                                   | Number Of Redemptions In Calendar Month Greater Than Or Equal 5      |
| Number Of Txns Today                        | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Count of primary member's transactions today.                                                                                                                                                                                                                                       | Number Of Txns Today Equals 1                                        |
| Initial Current Points                      | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Primary's redeemable points before current event.                                                                                                                                                                                                                                   | Initial Current Points Less Than 100                                 |
| Avg Basket Size                             | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Primary member's average items per transaction.                                                                                                                                                                                                                                     | Avg Basket Size Greater Than 4                                       |
| Number Of Redemptions Today                 | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Count of primary member's redemptions today.                                                                                                                                                                                                                                        | Number Of Redemptions Today Greater Than 5                           |
| Avg Spend Per Visit                         | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Primary member's average spend per visit.                                                                                                                                                                                                                                           | Avg Spend Per Visit Greater Than 200                                 |
| Lifetime All Points                         | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Total points (all types) ever earned by primary member.                                                                                                                                                                                                                             | Lifetime All Points Greater Than Or Equal 50000                      |
| Number Of Redemptions In Calendar Week      | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Count of primary member's redemptions this week.                                                                                                                                                                                                                                    | Number Of Redemptions In Calendar Week Greater Than 0                |
| Points Redeemed In Calendar Month           | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Points redeemed by primary member this month.                                                                                                                                                                                                                                       | Points Redeemed In Calendar Month Greater Than 1000                  |
| Sum Of Item Quantity                        | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Total quantity of specific items purchased by primary member.                                                                                                                                                                                                                       | Sum Of Item Quantity Greater Than 10                                 |
| Sum Of Item Gross Amount                    | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Total spend on specific items by primary member.                                                                                                                                                                                                                                    | Sum Of Item Gross Amount Greater Than 100                            |
| Points Redeemed In Period                   | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Points redeemed by primary member in a custom period.                                                                                                                                                                                                                               | Points Redeemed In Period Greater Than 5000                          |
| Count Of Redemptions In Period              | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Redemption count in a custom period.                                                                                                                                                                                                                                                | Count Of Redemptions In Period Greater Than 2                        |
| Points Redeemed In Past Days                | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Points redeemed in the last X days.                                                                                                                                                                                                                                                 | Points Redeemed In Past Days Is Not Null                             |
| Count Of Unique Line Items                  | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Distinct products purchased by primary member.                                                                                                                                                                                                                                      | Count Of Unique Line Items Less Than 5                               |
| Sum Of Item Discount                        | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Total discounts received by primary member.                                                                                                                                                                                                                                         | Sum Of Item Discount Greater Than 50                                 |
| Streak Current Value                        | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null                                                                                                                                                                                                                                            | Primary member's progress in a streak.                                                                                                                                                                                                                                              | Streak Current Value Equals 4                                        |
| Number Of Redemptions In Past Days          | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Redemption count in the last X days.                                                                                                                                                                                                                                                | Number Of Redemptions In Past Days Greater Than 2                    |
| Tracker Value Tracked In Current Event      | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Tracker value including current event contribution.                                                                                                                                                                                                                                 | Tracker Value Tracked In Event Greater Than 10                       |
| Tracker Value Before Event                  | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Tracker value excluding current event contribution.                                                                                                                                                                                                                                 | Tracker Value Before Event Less Than 100                             |
| Transaction Count In Date Range             | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Transaction count in a specific date range.                                                                                                                                                                                                                                         | Transaction Count In Range Greater Than 5                            |
| Transaction Sum In Date Range               | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Total spend in a specific date range.                                                                                                                                                                                                                                               | Transaction Sum In Range Greater Than 500                            |
| Custom Fields                               | Member Attribute | matches all of, matches any of, is not in                                                                                                                                                                                                                                                                                                               | Custom metadata or properties defined specifically for the member profile.                                                                                                                                                                                                          | Custom Fields Matches Any Of \["Region:North"]                       |
| Is Subscribed To Channel                    | Member Attribute | Equals, Not Equals                                                                                                                                                                                                                                                                                                                                      | Checks if the member has opted in to receive communications on a specific channel.                                                                                                                                                                                                  | Is Subscribed To Channel (Email) Equals True                         |
| Cluster Value Includes                      | Member Attribute | Equals, Not Equals                                                                                                                                                                                                                                                                                                                                      | Checks if the member belongs to a specific analytical segment or cluster.                                                                                                                                                                                                           | Cluster Value Includes (High Value) Equals True                      |
| Segment excludes                            | Member Attribute | Equals, Not Equals                                                                                                                                                                                                                                                                                                                                      | Checks if the member does not belong to a specific analytical segment or cluster.                                                                                                                                                                                                   | Cluster Value Excludes (Churned) Equals True                         |
| Custom Field Value Exists                   | Member Attribute | Equals, Not Equals                                                                                                                                                                                                                                                                                                                                      | Checks if a specific custom field has been populated with data for the member.                                                                                                                                                                                                      | Custom Field Value Exists (Anniversary) Equals True                  |
| Tracker Value Current Event                 | Member Attribute | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The absolute value of a tracker calculated at the exact moment of the current event.                                                                                                                                                                                                | Tracker Value Current Event (Daily Limit) Less Than 100              |
| Target Achieved In Period                   | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The amount of a target goal achieved within a specific custom timeframe.                                                                                                                                                                                                            | Target Achieved In Period Greater Than 500                           |
| Target Achieved In Current Period           | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The amount of a target goal achieved during the currently active cycle.                                                                                                                                                                                                             | Target Achieved In Current Period Greater Than Or Equal 1000         |
| Count Active Coupons In Coupon Series       | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The number of valid, unredeemed coupons the member holds for a specific series.                                                                                                                                                                                                     | Count Active Coupons In Coupon Series (Summer Sale) Greater Than 0   |
| Currency Metrics                            | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Conditions based on a filtered, aggregated view of a member's currency data, such as points or benefits. Select a specific fact, add optional filters, and define an aggregation. See [Transaction and currency metrics](#transaction-and-currency-metrics) for the selection flow. | Currency Metrics (Get Points, Sum, Duration: Today) Greater Than 500 |
| Collections                                 | Member Attribute | matches all of, matches any of, is not in                                                                                                                                                                                                                                                                                                               | Checks if the primary member is associated with a specific merchandising collection.                                                                                                                                                                                                | Collections Matches Any Of \["Summer Essentials"]                    |
| Labels                                      | Member Attribute | matches all of, matches any of, is not in                                                                                                                                                                                                                                                                                                               | Checks if a specific label or tag has been assigned to the primary member.                                                                                                                                                                                                          | Labels Matches Any Of \["VIP"]                                       |
| Enrolment Values                            | Member Attribute | matches all of, matches any of, is not in                                                                                                                                                                                                                                                                                                               | Checks the values captured for the primary member through a custom enrollment form field.                                                                                                                                                                                           | Enrolment Values (Referral Source) Matches Any Of \["Instagram"]     |
| Optin Values                                | Member Attribute | matches all of, matches any of, is not in                                                                                                                                                                                                                                                                                                               | Checks the specific value or preference recorded when the primary member opted in to a channel.                                                                                                                                                                                     | Optin Values (Email) Matches Any Of \["Newsletter"]                  |
| Transaction Metrics                         | Transaction KPI  | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Conditions based on a filtered, aggregated view of the current transaction's basket data. Select a specific basket fact, add optional filters, and define an aggregation. See [Transaction and currency metrics](#transaction-and-currency-metrics) for the selection flow.         | Transaction Metrics (Basket Item Count, Count) Greater Than 3        |

***

## Group primary member

Group primary member attributes enable you to add conditions for the primary member of a user group. You can use this data to determine eligibility for any member of the group based on the primary member, for example, checking if the primary member holds a Gold tier status or has a specific points balance.

The group primary member attributes are supported for the following member actions: updates a customer profile, makes a transaction.

<HTMLBlock>{`
<div style="box-sizing:border-box;margin:0 0 16px;padding:0;max-width:100%;"><div style="box-sizing:border-box;margin:0 0 5px;padding:0;font:400 11.5px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#6b7280;">Group Primary Member &#183; 64 attributes &#183; zoom in for more clarity</div><div style="box-sizing:border-box;display:block;width:100%;max-width:100%;overflow:hidden;border:1px solid #e1e4e8;border-radius:5px;background:#ffffff;position:relative;z-index:0;isolation:isolate;contain:layout paint;margin:0;padding:6px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1369 668" width="820" height="400" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Group Primary Member attributes grouped by value type" style="display:block;width:100%;max-width:100%;height:auto;margin:0 auto">
<rect x="0" y="0" width="1369" height="668" fill="#ffffff"/>
<path d="M 162 221.4 L 172 221.4 L 172 38.0 L 206 38.0" fill="none" stroke="#0000ff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="221.4" rx="2.6" ry="2.6" fill="#0000ff"/>
<ellipse cx="206" cy="38.0" rx="2.6" ry="2.6" fill="#0000ff"/>
<path d="M 162 236.2 L 179 236.2 L 179 183.0 L 206 183.0" fill="none" stroke="#bd00bd" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="236.2" rx="2.6" ry="2.6" fill="#bd00bd"/>
<ellipse cx="206" cy="183.0" rx="2.6" ry="2.6" fill="#bd00bd"/>
<path d="M 162 251.1 L 186 251.1 L 186 283.0 L 206 283.0" fill="none" stroke="#ff3399" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="251.1" rx="2.6" ry="2.6" fill="#ff3399"/>
<ellipse cx="206" cy="283.0" rx="2.6" ry="2.6" fill="#ff3399"/>
<path d="M 162 266.0 L 193 266.0 L 193 17 L 584 17 L 584 38.0 L 593 38.0" fill="none" stroke="#009900" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="266.0" rx="2.6" ry="2.6" fill="#009900"/>
<ellipse cx="593" cy="38.0" rx="2.6" ry="2.6" fill="#009900"/>
<path d="M 162 280.9 L 172 280.9 L 172 21 L 956 21 L 956 38.0 L 980 38.0" fill="none" stroke="#ff8000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="280.9" rx="2.6" ry="2.6" fill="#ff8000"/>
<ellipse cx="980" cy="38.0" rx="2.6" ry="2.6" fill="#ff8000"/>
<path d="M 162 295.8 L 179 295.8 L 179 25 L 961 25 L 961 228.0 L 980 228.0" fill="none" stroke="#990000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="295.8" rx="2.6" ry="2.6" fill="#990000"/>
<ellipse cx="980" cy="228.0" rx="2.6" ry="2.6" fill="#990000"/>
<path d="M 162 310.6 L 186 310.6 L 186 17 L 966 17 L 966 313.0 L 980 313.0" fill="none" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="310.6" rx="2.6" ry="2.6" fill="#666666"/>
<ellipse cx="980" cy="313.0" rx="2.6" ry="2.6" fill="#666666"/>
<rect x="12" y="206.5" width="150" height="119" fill="#1a3c6e" stroke="#333333" stroke-width="1"/>
<text x="87.0" y="270.0" text-anchor="middle" font-family="Helvetica" font-size="11" font-weight="bold" fill="#ffffff">Group Primary Member</text>
<rect x="206" y="28" width="357" height="131" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="206" y="28" width="357" height="20" fill="#ccffff" stroke="#333333" stroke-width="1"/>
<text x="384.5" y="42.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">String (7)</text>
<text x="214" y="59.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">First Name</text>
<text x="214" y="74.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Last Name</text>
<text x="214" y="89.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Name</text>
<text x="214" y="104.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Email</text>
<text x="214" y="119.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Mobile</text>
<text x="214" y="134.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">External Id</text>
<rect x="207" y="138" width="355" height="15" fill="#fbfaf3"/>
<text x="214" y="149.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Is Registered At <tspan fill="#8a6d00" font-style="italic">&lt;Concept | Zone | Till&gt; &lt;name&gt;</tspan></text>
<rect x="206" y="173" width="357" height="86" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="206" y="173" width="357" height="20" fill="#fff2cc" stroke="#333333" stroke-width="1"/>
<text x="384.5" y="187.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Date (4) <tspan fill="#8a6d00" font-style="italic">[diff]</tspan></text>
<text x="214" y="204.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Slab Change Date</text>
<text x="214" y="219.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Slab Expiry Date</text>
<text x="214" y="234.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Join Date</text>
<text x="214" y="249.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Customer Enrollment Date</text>
<rect x="206" y="273" width="357" height="116" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="206" y="273" width="357" height="20" fill="#ffe6f2" stroke="#333333" stroke-width="1"/>
<text x="384.5" y="287.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Multi-select / Cluster (6)</text>
<text x="214" y="304.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Belong To Segment</text>
<text x="214" y="319.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Collections</text>
<text x="214" y="334.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Communication Profile</text>
<rect x="207" y="338" width="355" height="15" fill="#fbfaf3"/>
<text x="214" y="349.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Enrolment Values <tspan fill="#0057a3" font-style="italic">&lt;Enrollment form field&gt;</tspan></text>
<text x="214" y="364.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Labels</text>
<rect x="207" y="368" width="355" height="15" fill="#fbfaf3"/>
<text x="214" y="379.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Optin Values <tspan fill="#0057a3" font-style="italic">&lt;Channel name&gt;</tspan></text>
<rect x="593" y="28" width="357" height="476" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="593" y="28" width="357" height="20" fill="#d5e8d4" stroke="#333333" stroke-width="1"/>
<text x="771.5" y="42.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Numeric (30)</text>
<text x="601" y="59.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Slab Number</text>
<text x="601" y="74.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Current All Points</text>
<text x="601" y="89.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Number Of Visits</text>
<text x="601" y="104.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Number Of Txns</text>
<text x="601" y="119.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Points Redeemed Today</text>
<text x="601" y="134.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Avg Spend Per Visit</text>
<text x="601" y="149.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Initial Lifetime Points</text>
<text x="601" y="164.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Streak Current Value</text>
<rect x="594" y="168" width="355" height="15" fill="#fbfaf3"/>
<text x="601" y="179.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Count Active Coupons In Coupon Series <tspan fill="#0057a3" font-style="italic">&lt;Coupon series name&gt;</tspan></text>
<text x="601" y="194.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Avg Basket Size</text>
<text x="601" y="209.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Count Of Redemptions In Period</text>
<rect x="594" y="213" width="355" height="15" fill="#fbfaf3"/>
<text x="601" y="224.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Currency Metrics <tspan fill="#006064" font-style="italic">[see]</tspan></text>
<text x="601" y="239.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Initial Current All Points</text>
<text x="601" y="254.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Initial Current Points</text>
<text x="601" y="269.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Lifetime All Points</text>
<text x="601" y="284.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Lifetime promised points earned</text>
<text x="601" y="299.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Number Of Redemptions In Calendar Month</text>
<text x="601" y="314.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Number Of Redemptions In Calendar Week</text>
<text x="601" y="329.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Number Of Redemptions In Past Days</text>
<text x="601" y="344.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Number Of Redemptions Today</text>
<text x="601" y="359.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Number Of Txns Today</text>
<text x="601" y="374.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Points Redeemed In Calendar Month</text>
<text x="601" y="389.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Points Redeemed In Calendar Week</text>
<text x="601" y="404.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Points Redeemed In Past Days</text>
<text x="601" y="419.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Points Redeemed In Period</text>
<text x="601" y="434.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Promised points current balance</text>
<text x="601" y="449.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Tracker Value Before Event</text>
<rect x="594" y="453" width="355" height="15" fill="#fbfaf3"/>
<text x="601" y="464.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Tracker Value Current Event <tspan fill="#0057a3" font-style="italic">&lt;Tracker name&gt;</tspan></text>
<text x="601" y="479.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Tracker Value Tracked In Current Event</text>
<text x="601" y="494.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Transaction Count In Date Range</text>
<rect x="980" y="28" width="357" height="176" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="980" y="28" width="357" height="20" fill="#ffe6cc" stroke="#333333" stroke-width="1"/>
<text x="1158.5" y="42.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Currency (10)</text>
<text x="988" y="59.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Lifetime Purchase</text>
<text x="988" y="74.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Lifetime Purchase (before current activity)</text>
<text x="988" y="89.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Count Of Unique Line Items</text>
<text x="988" y="104.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Sum Of Item Discount</text>
<text x="988" y="119.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Sum Of Item Gross Amount</text>
<text x="988" y="134.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Sum Of Item Quantity</text>
<text x="988" y="149.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Target Achieved In Period</text>
<text x="988" y="164.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Target Achieved In Current Period</text>
<rect x="981" y="168" width="355" height="15" fill="#fbfaf3"/>
<text x="988" y="179.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Transaction Metrics <tspan fill="#006064" font-style="italic">[see]</tspan></text>
<text x="988" y="194.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Transaction Sum In Date Range</text>
<rect x="980" y="218" width="357" height="71" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="980" y="218" width="357" height="20" fill="#e6e6ff" stroke="#333333" stroke-width="1"/>
<text x="1158.5" y="232.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Category / Enum (3)</text>
<text x="988" y="249.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Slab Name</text>
<text x="988" y="264.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Loyalty Type</text>
<text x="988" y="279.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Member Status</text>
<rect x="980" y="303" width="357" height="86" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="980" y="303" width="357" height="20" fill="#e6e6e6" stroke="#333333" stroke-width="1"/>
<text x="1158.5" y="317.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Boolean (4)</text>
<rect x="981" y="323" width="355" height="15" fill="#fbfaf3"/>
<text x="988" y="334.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Cluster Value Includes <tspan fill="#0057a3" font-style="italic">&lt;Cluster / segment name&gt;</tspan></text>
<rect x="981" y="338" width="355" height="15" fill="#fbfaf3"/>
<text x="988" y="349.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Custom Field Value Exists <tspan fill="#0057a3" font-style="italic">&lt;Custom field name&gt;</tspan></text>
<rect x="981" y="353" width="355" height="15" fill="#fbfaf3"/>
<text x="988" y="364.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Is Subscribed To Channel <tspan fill="#0057a3" font-style="italic">&lt;Channel name&gt;</tspan></text>
<rect x="981" y="368" width="355" height="15" fill="#fbfaf3"/>
<text x="988" y="379.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Segment excludes <tspan fill="#0057a3" font-style="italic">&lt;Cluster / segment name&gt;</tspan></text>
<rect x="206" y="524.0" width="118" height="53" fill="#ffffff" stroke="#b8860b" stroke-width="1.2"/>
<rect x="206" y="524.0" width="118" height="15" fill="#fff9c4" stroke="#b8860b" stroke-width="1.2"/>
<text x="265.0" y="535.0" text-anchor="middle" font-family="Helvetica" font-size="8" font-weight="bold" fill="#b8860b">Then pick a level</text>
<text x="212" y="547.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Concept</text>
<text x="212" y="558.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Zone</text>
<text x="212" y="569.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Till</text>
<path d="M 324 550.5 L 340 550.5" fill="none" stroke="#b8860b" stroke-width="1.4" stroke-dasharray="4,3" stroke-linecap="round"/>
<rect x="340" y="524.0" width="150" height="53" fill="#ffffff" stroke="#b8860b" stroke-width="1.2"/>
<rect x="340" y="524.0" width="150" height="15" fill="#fff9c4" stroke="#b8860b" stroke-width="1.2"/>
<text x="415.0" y="535.0" text-anchor="middle" font-family="Helvetica" font-size="8" font-weight="bold" fill="#b8860b">Then the value</text>
<text x="346" y="547.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Name of the selected level</text>
<path d="M 563 145.5 L 578.0 145.5 L 578.0 515.0 L 265.0 515.0 L 265.0 524.0" fill="none" stroke="#b8860b" stroke-width="1.4" stroke-dasharray="4,3" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="563" cy="145.5" rx="2.4" ry="2.4" fill="#b8860b"/>
<rect x="520" y="524.0" width="150" height="64" fill="#ffffff" stroke="#b8860b" stroke-width="1.2"/>
<rect x="520" y="524.0" width="150" height="15" fill="#fff9c4" stroke="#b8860b" stroke-width="1.2"/>
<text x="595.0" y="535.0" text-anchor="middle" font-family="Helvetica" font-size="8" font-weight="bold" fill="#b8860b">If you pick a diff operator</text>
<text x="526" y="547.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Date Diff</text>
<text x="526" y="558.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Days Diff</text>
<text x="526" y="569.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Days Diff from String</text>
<text x="526" y="580.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Minutes Diff</text>
<path d="M 670 556.0 L 686 556.0" fill="none" stroke="#b8860b" stroke-width="1.4" stroke-dasharray="4,3" stroke-linecap="round"/>
<rect x="686" y="524.0" width="150" height="64" fill="#ffffff" stroke="#b8860b" stroke-width="1.2"/>
<rect x="686" y="524.0" width="150" height="15" fill="#fff9c4" stroke="#b8860b" stroke-width="1.2"/>
<text x="761.0" y="535.0" text-anchor="middle" font-family="Helvetica" font-size="8" font-weight="bold" fill="#b8860b">Then a date to compare with</text>
<text x="692" y="547.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">e.g. Date of Birth</text>
<path d="M 836 556.0 L 852 556.0" fill="none" stroke="#b8860b" stroke-width="1.4" stroke-dasharray="4,3" stroke-linecap="round"/>
<rect x="852" y="524.0" width="150" height="64" fill="#ffffff" stroke="#b8860b" stroke-width="1.2"/>
<rect x="852" y="524.0" width="150" height="15" fill="#fff9c4" stroke="#b8860b" stroke-width="1.2"/>
<text x="927.0" y="535.0" text-anchor="middle" font-family="Helvetica" font-size="8" font-weight="bold" fill="#b8860b">Then operator + number</text>
<text x="858" y="547.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">e.g. Greater Than 30</text>
<path d="M 563 183.0 L 578.0 183.0 L 578.0 511.0 L 595.0 511.0 L 595.0 524.0" fill="none" stroke="#b8860b" stroke-width="1.4" stroke-dasharray="4,3" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="563" cy="183.0" rx="2.4" ry="2.4" fill="#b8860b"/>
<rect x="12" y="600.0" width="9" height="9" fill="#ccffff" stroke="#333333" stroke-width="0.6"/>
<text x="25" y="607.0" font-family="Helvetica" font-size="8.5" fill="#444444">String</text>
<rect x="66.6" y="600.0" width="9" height="9" fill="#d5e8d4" stroke="#333333" stroke-width="0.6"/>
<text x="79.6" y="607.0" font-family="Helvetica" font-size="8.5" fill="#444444">Numeric</text>
<rect x="125.79999999999998" y="600.0" width="9" height="9" fill="#ffe6cc" stroke="#333333" stroke-width="0.6"/>
<text x="138.79999999999998" y="607.0" font-family="Helvetica" font-size="8.5" fill="#444444">Currency</text>
<rect x="189.59999999999997" y="600.0" width="9" height="9" fill="#fff2cc" stroke="#333333" stroke-width="0.6"/>
<text x="202.59999999999997" y="607.0" font-family="Helvetica" font-size="8.5" fill="#444444">Date</text>
<rect x="234.99999999999997" y="600.0" width="9" height="9" fill="#e6e6ff" stroke="#333333" stroke-width="0.6"/>
<text x="247.99999999999997" y="607.0" font-family="Helvetica" font-size="8.5" fill="#444444">Category / Enum</text>
<rect x="331.0" y="600.0" width="9" height="9" fill="#ffe6f2" stroke="#333333" stroke-width="0.6"/>
<text x="344.0" y="607.0" font-family="Helvetica" font-size="8.5" fill="#444444">Multi-select / Cluster</text>
<rect x="459.2" y="600.0" width="9" height="9" fill="#e6e6e6" stroke="#333333" stroke-width="0.6"/>
<text x="472.2" y="607.0" font-family="Helvetica" font-size="8.5" fill="#444444">Boolean</text>
<text x="12" y="620.0" font-family="Helvetica" font-size="8.5" fill="#0057a3">&lt;...&gt;  pick this before the value</text>
<text x="12" y="632.0" font-family="Helvetica" font-size="8.5" fill="#006064">[see]  opens the &quot;Transaction and currency metrics&quot; builder</text>
<text x="12" y="644.0" font-family="Helvetica" font-size="8.5" fill="#8a6d00">[diff]  Date Diff / Days Diff / Days Diff from String / Minutes Diff -&gt; pick a date to compare with -&gt; operator + number</text>
</svg></div></div>
`}</HTMLBlock>

| Attribute                                   | Classification   | Supported Operators                                                                                                                                                                                                                                                                                                                                     | Description                                                                                                                                                                                                                                                                         | Example                                                              |
| :------------------------------------------ | :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| First Name                                  | Member Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches                                                                                                                                                                                                                                                              | The primary member's first name.                                                                                                                                                                                                                                                    | First Name Equals "Alice"                                            |
| Last Name                                   | Member Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches                                                                                                                                                                                                                                                              | The primary member's last name.                                                                                                                                                                                                                                                     | Last Name Equals "Johnson"                                           |
| Name                                        | Member Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches                                                                                                                                                                                                                                                              | The full name of the primary member.                                                                                                                                                                                                                                                | Name Contains "Alice Johnson"                                        |
| Email                                       | Member Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches                                                                                                                                                                                                                                                              | The registered email of the primary member.                                                                                                                                                                                                                                         | Email Is Not Null                                                    |
| Mobile                                      | Member Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches                                                                                                                                                                                                                                                              | The primary member's mobile number.                                                                                                                                                                                                                                                 | Mobile Exists                                                        |
| External Id                                 | Member Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches                                                                                                                                                                                                                                                              | Unique external ID of the primary member.                                                                                                                                                                                                                                           | External Id Equals "EXT-99"                                          |
| Slab Number                                 | Member Attribute | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null                                                                                                                                                                                                                                            | The tier number of the primary member.                                                                                                                                                                                                                                              | Slab Number Greater Than 2                                           |
| Slab Name                                   | Member Attribute | Not Exists, Is One Of, Matches Regex, Starts With, Is None Of, Does Not Equal, Exists, Contains, Equals                                                                                                                                                                                                                                                 | The tier name of the primary member.                                                                                                                                                                                                                                                | Slab Name Is One Of \["Platinum"]                                    |
| Slab Change Date                            | Member Attribute | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Minutes Diff, Is Before, Is Not, Is, Is On or Before, Day Of Month, Is On or After, Is Not Null, Is Time Between, Is Null, Is After, Is Valid, Date Diff, Days Diff from String, Is Hour Between, Days Diff, Is Weekend, Is Weekday, Is Between, Is Not Between | Date the primary member last changed tiers.                                                                                                                                                                                                                                         | Slab Change Date Is Before 2024-01-01                                |
| Slab Expiry Date                            | Member Attribute | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Minutes Diff, Is Before, Is Not, Is, Is On or Before, Day Of Month, Is On or After, Is Not Null, Is Time Between, Is Null, Is After, Is Valid, Date Diff, Days Diff from String, Is Hour Between, Days Diff, Is Weekend, Is Weekday, Is Between, Is Not Between | Tier expiration date for the primary member.                                                                                                                                                                                                                                        | Slab Expiry Date Is After Today                                      |
| Join Date                                   | Member Attribute | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Minutes Diff, Is Before, Is Not, Is, Is On or Before, Day Of Month, Is On or After, Is Not Null, Is Time Between, Is Null, Is After, Is Valid, Date Diff, Days Diff from String, Is Hour Between, Days Diff, Is Weekend, Is Weekday, Is Between, Is Not Between | The date the primary member joined the program.                                                                                                                                                                                                                                     | Join Date Month Equals 12                                            |
| Loyalty Type                                | Member Attribute | Not Exists, Is One Of, Matches Regex, Starts With, Is None Of, Does Not Equal, Exists, Contains, Equals                                                                                                                                                                                                                                                 | The loyalty category of the primary member.                                                                                                                                                                                                                                         | Loyalty Type Any Match "LOYAL"                                       |
| Member Status                               | Member Attribute | Not Exists, Is One Of, Matches Regex, Starts With, Is None Of, Does Not Equal, Exists, Contains, Equals                                                                                                                                                                                                                                                 | Current operational status of the primary member.                                                                                                                                                                                                                                   | Member Status Any Match "ACTIVE"                                     |
| Current All Points                          | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Primary member's current total points.                                                                                                                                                                                                                                              | Current All Points Greater Than 5000                                 |
| Lifetime Purchase                           | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Total spend history of the primary member.                                                                                                                                                                                                                                          | Lifetime Purchase Greater Than 10000                                 |
| Number Of Visits                            | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Total unique visit count of the primary member.                                                                                                                                                                                                                                     | Number Of Visits Greater Than 20                                     |
| Number Of Txns                              | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Total transaction count of the primary member.                                                                                                                                                                                                                                      | Number Of Txns Greater Than 50                                       |
| Points Redeemed Today                       | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Points the primary member redeemed today.                                                                                                                                                                                                                                           | Points Redeemed Today Equals 0                                       |
| Avg Spend Per Visit                         | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Average transaction value for the primary member.                                                                                                                                                                                                                                   | Avg Spend Per Visit Greater Than 200                                 |
| Initial Lifetime Points                     | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Primary's lifetime points before this event.                                                                                                                                                                                                                                        | Initial Lifetime Points Less Than 1000                               |
| Lifetime Purchase (before current activity) | #Member KPI      | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Primary's lifetime spend before this event.                                                                                                                                                                                                                                         | Initial Lifetime Purchase Greater Than 500                           |
| Streak Current Value                        | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null                                                                                                                                                                                                                                            | Progress of the primary member's current streak.                                                                                                                                                                                                                                    | Streak Current Value Greater Than 3                                  |
| Count Active Coupons In Coupon Series       | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Number of valid coupons held by the primary member for a specific coupon series.                                                                                                                                                                                                    | Count Active Coupons In Coupon Series Greater Than 0                 |
| Avg Basket Size                             | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Primary member's average items per transaction.                                                                                                                                                                                                                                     | Avg Basket Size Greater Than 4                                       |
| Belong To Segment                           | Member Attribute | matches all of, matches any of, is not in                                                                                                                                                                                                                                                                                                               | Checks if the primary member is in a specific cluster.                                                                                                                                                                                                                              | Belong To Segment Any Match "VIP"                                    |
| Cluster Value Includes                      | Member Attribute | Equals, Not Equals                                                                                                                                                                                                                                                                                                                                      | Checks if the primary member belongs to a specific analytical segment or cluster.                                                                                                                                                                                                   | Cluster Value Includes (High Value) Equals True                      |
| Collections                                 | Member Attribute | matches all of, matches any of, is not in                                                                                                                                                                                                                                                                                                               | Checks if the primary member is associated with a specific merchandising collection.                                                                                                                                                                                                | Collections Matches Any Of \["Summer Essentials"]                    |
| Communication Profile                       | Member Attribute | matches all of, matches any of, is not in                                                                                                                                                                                                                                                                                                               | Channels the primary member has opted into.                                                                                                                                                                                                                                         | Communication Profile Contains "WHATSAPP"                            |
| Count Of Redemptions In Period              | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Redemption count in a custom period.                                                                                                                                                                                                                                                | Count Of Redemptions In Period Greater Than 2                        |
| Count Of Unique Line Items                  | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Distinct products purchased by primary member.                                                                                                                                                                                                                                      | Count Of Unique Line Items Less Than 5                               |
| Currency Metrics                            | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Conditions based on a filtered, aggregated view of a member's currency data, such as points or benefits. Select a specific fact, add optional filters, and define an aggregation. See [Transaction and currency metrics](#transaction-and-currency-metrics) for the selection flow. | Currency Metrics (Get Points, Sum, Duration: Today) Greater Than 500 |
| Custom Field Value Exists                   | Member Attribute | Equals, Not Equals                                                                                                                                                                                                                                                                                                                                      | Checks if a specific custom field has been populated with data for the primary member.                                                                                                                                                                                              | Custom Field Value Exists (Anniversary) Equals True                  |
| Customer Enrollment Date                    | Member Attribute | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Minutes Diff, Is Before, Is Not, Is, Is On or Before, Day Of Month, Is On or After, Is Not Null, Is Time Between, Is Null, Is After, Is Valid, Date Diff, Days Diff from String, Is Hour Between, Days Diff, Is Weekend, Is Weekday, Is Between, Is Not Between | The system timestamp when the primary member's record was created.                                                                                                                                                                                                                  | Customer Enrollment Date Is After "2024-01-01"                       |
| Enrolment Values                            | Member Attribute | matches all of, matches any of, is not in                                                                                                                                                                                                                                                                                                               | Checks the values captured for the primary member through a custom enrollment form field.                                                                                                                                                                                           | Enrolment Values (Referral Source) Matches Any Of \["Instagram"]     |
| Initial Current All Points                  | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Primary's total points balance before the current event.                                                                                                                                                                                                                            | Initial Current All Points Equals 0                                  |
| Initial Current Points                      | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Primary's redeemable points before current event.                                                                                                                                                                                                                                   | Initial Current Points Less Than 100                                 |
| Is Registered At                            | Member Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches                                                                                                                                                                                                                                                              | The location where the primary member registered.                                                                                                                                                                                                                                   | Is Registered At Equals "Store 101"                                  |
| Is Subscribed To Channel                    | Member Attribute | Equals, Not Equals                                                                                                                                                                                                                                                                                                                                      | Checks if the primary member has opted in to receive communications on a specific channel.                                                                                                                                                                                          | Is Subscribed To Channel (Email) Equals True                         |
| Labels                                      | Member Attribute | matches all of, matches any of, is not in                                                                                                                                                                                                                                                                                                               | Checks if a specific label or tag has been assigned to the primary member.                                                                                                                                                                                                          | Labels Matches Any Of \["VIP"]                                       |
| Lifetime All Points                         | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Total points (all types) ever earned by primary member.                                                                                                                                                                                                                             | Lifetime All Points Greater Than Or Equal 50000                      |
| Lifetime promised points earned             | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Total promised points ever earned by the primary member.                                                                                                                                                                                                                            | Lifetime promised points earned Is Not Null                          |
| Number Of Redemptions In Calendar Month     | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Count of primary member's redemptions this month.                                                                                                                                                                                                                                   | Number Of Redemptions In Calendar Month Greater Than Or Equal 5      |
| Number Of Redemptions In Calendar Week      | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Count of primary member's redemptions this week.                                                                                                                                                                                                                                    | Number Of Redemptions In Calendar Week Greater Than 0                |
| Number Of Redemptions In Past Days          | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Redemption count in the last X days.                                                                                                                                                                                                                                                | Number Of Redemptions In Past Days Greater Than 2                    |
| Number Of Redemptions Today                 | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Count of primary member's redemptions today.                                                                                                                                                                                                                                        | Number Of Redemptions Today Greater Than 5                           |
| Number Of Txns Today                        | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Count of primary member's transactions today.                                                                                                                                                                                                                                       | Number Of Txns Today Equals 1                                        |
| Optin Values                                | Member Attribute | matches all of, matches any of, is not in                                                                                                                                                                                                                                                                                                               | Checks the specific value or preference recorded when the primary member opted in to a channel.                                                                                                                                                                                     | Optin Values (Email) Matches Any Of \["Newsletter"]                  |
| Points Redeemed In Calendar Month           | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Points redeemed by primary member this month.                                                                                                                                                                                                                                       | Points Redeemed In Calendar Month Greater Than 1000                  |
| Points Redeemed In Calendar Week            | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Points redeemed by primary member this week.                                                                                                                                                                                                                                        | Points Redeemed In Calendar Week Greater Than 20000                  |
| Points Redeemed In Past Days                | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Points redeemed in the last X days.                                                                                                                                                                                                                                                 | Points Redeemed In Past Days Is Not Null                             |
| Points Redeemed In Period                   | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Points redeemed by primary member in a custom period.                                                                                                                                                                                                                               | Points Redeemed In Period Greater Than 5000                          |
| Promised points current balance             | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Primary's balance of promised/pending points.                                                                                                                                                                                                                                       | Promised points current balance Greater Than 500                     |
| Segment excludes                            | Member Attribute | Equals, Not Equals                                                                                                                                                                                                                                                                                                                                      | Checks if the primary member does not belong to a specific analytical segment or cluster.                                                                                                                                                                                           | Segment excludes (Churned) Equals True                               |
| Sum Of Item Discount                        | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Total discounts received by primary member.                                                                                                                                                                                                                                         | Sum Of Item Discount Greater Than 50                                 |
| Sum Of Item Gross Amount                    | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Total spend on specific items by primary member.                                                                                                                                                                                                                                    | Sum Of Item Gross Amount Greater Than 100                            |
| Sum Of Item Quantity                        | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Total quantity of specific items purchased by primary member.                                                                                                                                                                                                                       | Sum Of Item Quantity Greater Than 10                                 |
| Target Achieved In Period                   | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The amount of a target goal achieved within a specific custom timeframe.                                                                                                                                                                                                            | Target Achieved In Period Greater Than 500                           |
| Target Achieved In Current Period           | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The amount of a target goal achieved during the currently active cycle.                                                                                                                                                                                                             | Target Achieved In Current Period Greater Than Or Equal 1000         |
| Tracker Value Before Event                  | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Tracker value excluding current event contribution.                                                                                                                                                                                                                                 | Tracker Value Before Event Less Than 100                             |
| Tracker Value Current Event                 | Member Attribute | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The absolute value of a tracker calculated at the exact moment of the current event.                                                                                                                                                                                                | Tracker Value Current Event (Daily Limit) Less Than 100              |
| Tracker Value Tracked In Current Event      | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Tracker value including current event contribution.                                                                                                                                                                                                                                 | Tracker Value Tracked In Current Event Greater Than 10               |
| Transaction Count In Date Range             | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Transaction count in a specific date range.                                                                                                                                                                                                                                         | Transaction Count In Date Range Greater Than 5                       |
| Transaction Metrics                         | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Conditions based on a filtered, aggregated view of the current transaction's basket data. Select a specific basket fact, add optional filters, and define an aggregation. See [Transaction and currency metrics](#transaction-and-currency-metrics) for the selection flow.         | Transaction Metrics (Basket Item Count, Count) Greater Than 3        |
| Transaction Sum In Date Range               | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Total spend in a specific date range.                                                                                                                                                                                                                                               | Transaction Sum In Date Range Greater Than 500                       |

***

## Current group primary

Current group primary attributes enable you to add conditions for the primary member of a user group at the exact moment an event occurs. This is commonly used to ensure the primary member meets specific criteria, for example, checking if they have an active subscription or valid membership status, before a transaction triggers a reward for the group.

The current group primary attributes are supported for the following member actions: gets enrolled in the program, redeems points, makes a transaction.

<HTMLBlock>{`
<div style="box-sizing:border-box;margin:0 0 16px;padding:0;max-width:100%;"><div style="box-sizing:border-box;margin:0 0 5px;padding:0;font:400 11.5px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#6b7280;">Current Group Primary &#183; 65 attributes &#183; zoom in for more clarity</div><div style="box-sizing:border-box;display:block;width:100%;max-width:100%;overflow:hidden;border:1px solid #e1e4e8;border-radius:5px;background:#ffffff;position:relative;z-index:0;isolation:isolate;contain:layout paint;margin:0;padding:6px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1369 653" width="820" height="391" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Current Group Primary attributes grouped by value type" style="display:block;width:100%;max-width:100%;height:auto;margin:0 auto">
<rect x="0" y="0" width="1369" height="653" fill="#ffffff"/>
<path d="M 162 213.9 L 172 213.9 L 172 38.0 L 206 38.0" fill="none" stroke="#0000ff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="213.9" rx="2.6" ry="2.6" fill="#0000ff"/>
<ellipse cx="206" cy="38.0" rx="2.6" ry="2.6" fill="#0000ff"/>
<path d="M 162 228.8 L 179 228.8 L 179 183.0 L 206 183.0" fill="none" stroke="#bd00bd" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="228.8" rx="2.6" ry="2.6" fill="#bd00bd"/>
<ellipse cx="206" cy="183.0" rx="2.6" ry="2.6" fill="#bd00bd"/>
<path d="M 162 243.6 L 186 243.6 L 186 298.0 L 206 298.0" fill="none" stroke="#ff3399" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="243.6" rx="2.6" ry="2.6" fill="#ff3399"/>
<ellipse cx="206" cy="298.0" rx="2.6" ry="2.6" fill="#ff3399"/>
<path d="M 162 258.5 L 193 258.5 L 193 17 L 584 17 L 584 38.0 L 593 38.0" fill="none" stroke="#009900" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="258.5" rx="2.6" ry="2.6" fill="#009900"/>
<ellipse cx="593" cy="38.0" rx="2.6" ry="2.6" fill="#009900"/>
<path d="M 162 273.4 L 172 273.4 L 172 21 L 956 21 L 956 38.0 L 980 38.0" fill="none" stroke="#ff8000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="273.4" rx="2.6" ry="2.6" fill="#ff8000"/>
<ellipse cx="980" cy="38.0" rx="2.6" ry="2.6" fill="#ff8000"/>
<path d="M 162 288.2 L 179 288.2 L 179 25 L 961 25 L 961 243.0 L 980 243.0" fill="none" stroke="#990000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="288.2" rx="2.6" ry="2.6" fill="#990000"/>
<ellipse cx="980" cy="243.0" rx="2.6" ry="2.6" fill="#990000"/>
<path d="M 162 303.1 L 186 303.1 L 186 17 L 966 17 L 966 328.0 L 980 328.0" fill="none" stroke="#666666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="303.1" rx="2.6" ry="2.6" fill="#666666"/>
<ellipse cx="980" cy="328.0" rx="2.6" ry="2.6" fill="#666666"/>
<rect x="12" y="199.0" width="150" height="119" fill="#1a3c6e" stroke="#333333" stroke-width="1"/>
<text x="87.0" y="262.5" text-anchor="middle" font-family="Helvetica" font-size="11" font-weight="bold" fill="#ffffff">Current Group Primary</text>
<rect x="206" y="28" width="357" height="131" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="206" y="28" width="357" height="20" fill="#ccffff" stroke="#333333" stroke-width="1"/>
<text x="384.5" y="42.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">String (7)</text>
<text x="214" y="59.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">First Name</text>
<text x="214" y="74.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Last Name</text>
<text x="214" y="89.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Name</text>
<text x="214" y="104.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Email</text>
<text x="214" y="119.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Mobile</text>
<text x="214" y="134.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">External Id</text>
<rect x="207" y="138" width="355" height="15" fill="#fbfaf3"/>
<text x="214" y="149.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Is Registered At <tspan fill="#8a6d00" font-style="italic">&lt;Concept | Zone | Till&gt; &lt;name&gt;</tspan></text>
<rect x="206" y="173" width="357" height="101" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="206" y="173" width="357" height="20" fill="#fff2cc" stroke="#333333" stroke-width="1"/>
<text x="384.5" y="187.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Date (5) <tspan fill="#8a6d00" font-style="italic">[diff]</tspan></text>
<text x="214" y="204.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Slab Change Date</text>
<text x="214" y="219.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Slab Expiry Date</text>
<text x="214" y="234.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Join Date</text>
<text x="214" y="249.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Enrollment Date</text>
<text x="214" y="264.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Customer Enrollment Date</text>
<rect x="206" y="288" width="357" height="116" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="206" y="288" width="357" height="20" fill="#ffe6f2" stroke="#333333" stroke-width="1"/>
<text x="384.5" y="302.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Multi-select / Cluster (6)</text>
<text x="214" y="319.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Communication Profile</text>
<text x="214" y="334.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Belong To Segment</text>
<text x="214" y="349.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Collections</text>
<rect x="207" y="353" width="355" height="15" fill="#fbfaf3"/>
<text x="214" y="364.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Enrolment Values <tspan fill="#0057a3" font-style="italic">&lt;Enrollment form field&gt;</tspan></text>
<text x="214" y="379.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Labels</text>
<rect x="207" y="383" width="355" height="15" fill="#fbfaf3"/>
<text x="214" y="394.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Optin Values <tspan fill="#0057a3" font-style="italic">&lt;Channel name&gt;</tspan></text>
<rect x="593" y="28" width="357" height="461" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="593" y="28" width="357" height="20" fill="#d5e8d4" stroke="#333333" stroke-width="1"/>
<text x="771.5" y="42.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Numeric (29)</text>
<text x="601" y="59.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Slab Number</text>
<text x="601" y="74.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Current All Points</text>
<text x="601" y="89.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Promised points current balance</text>
<text x="601" y="104.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Lifetime All Points</text>
<text x="601" y="119.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Lifetime promised points earned</text>
<text x="601" y="134.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Number Of Visits</text>
<text x="601" y="149.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Number Of Txns</text>
<text x="601" y="164.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Number Of Txns Today</text>
<text x="601" y="179.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Points Redeemed Today</text>
<text x="601" y="194.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Avg Basket Size</text>
<text x="601" y="209.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Streak Current Value</text>
<text x="601" y="224.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Initial Current Points</text>
<text x="601" y="239.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Count Of Redemptions In Period</text>
<rect x="594" y="243" width="355" height="15" fill="#fbfaf3"/>
<text x="601" y="254.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Currency Metrics <tspan fill="#006064" font-style="italic">[see]</tspan></text>
<text x="601" y="269.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Initial Current All Points</text>
<text x="601" y="284.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Number Of Redemptions In Calendar Month</text>
<text x="601" y="299.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Number Of Redemptions In Calendar Week</text>
<text x="601" y="314.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Number Of Redemptions In Past Days</text>
<text x="601" y="329.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Number Of Redemptions Today</text>
<text x="601" y="344.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Points Redeemed In Calendar Month</text>
<text x="601" y="359.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Points Redeemed In Calendar Week</text>
<text x="601" y="374.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Points Redeemed In Past Days</text>
<text x="601" y="389.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Points Redeemed In Period</text>
<text x="601" y="404.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Tracker Value Before Event</text>
<rect x="594" y="408" width="355" height="15" fill="#fbfaf3"/>
<text x="601" y="419.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Tracker Value Current Event <tspan fill="#0057a3" font-style="italic">&lt;Tracker name&gt;</tspan></text>
<text x="601" y="434.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Tracker Value Tracked In Current Event</text>
<text x="601" y="449.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Transaction Count In Date Range</text>
<rect x="594" y="453" width="355" height="15" fill="#fbfaf3"/>
<text x="601" y="464.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Count Active Coupons In Coupon Series <tspan fill="#0057a3" font-style="italic">&lt;Coupon series name&gt;</tspan></text>
<text x="601" y="479.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Initial Lifetime Points</text>
<rect x="980" y="28" width="357" height="191" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="980" y="28" width="357" height="20" fill="#ffe6cc" stroke="#333333" stroke-width="1"/>
<text x="1158.5" y="42.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Currency (11)</text>
<text x="988" y="59.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Lifetime Purchase</text>
<text x="988" y="74.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Lifetime Purchase (before current activity)</text>
<text x="988" y="89.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Avg Spend Per Visit</text>
<text x="988" y="104.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Count Of Unique Line Items</text>
<text x="988" y="119.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Sum Of Item Discount</text>
<text x="988" y="134.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Sum Of Item Gross Amount</text>
<text x="988" y="149.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Sum Of Item Quantity</text>
<text x="988" y="164.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Target Achieved In Period</text>
<text x="988" y="179.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Target Achieved In Current Period</text>
<rect x="981" y="183" width="355" height="15" fill="#fbfaf3"/>
<text x="988" y="194.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Transaction Metrics <tspan fill="#006064" font-style="italic">[see]</tspan></text>
<text x="988" y="209.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Transaction Sum In Date Range</text>
<rect x="980" y="233" width="357" height="71" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="980" y="233" width="357" height="20" fill="#e6e6ff" stroke="#333333" stroke-width="1"/>
<text x="1158.5" y="247.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Category / Enum (3)</text>
<text x="988" y="264.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Slab Name</text>
<text x="988" y="279.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Loyalty Type</text>
<text x="988" y="294.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Member Status</text>
<rect x="980" y="318" width="357" height="86" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="980" y="318" width="357" height="20" fill="#e6e6e6" stroke="#333333" stroke-width="1"/>
<text x="1158.5" y="332.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Boolean (4)</text>
<rect x="981" y="338" width="355" height="15" fill="#fbfaf3"/>
<text x="988" y="349.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Cluster Value Includes <tspan fill="#0057a3" font-style="italic">&lt;Cluster / segment name&gt;</tspan></text>
<rect x="981" y="353" width="355" height="15" fill="#fbfaf3"/>
<text x="988" y="364.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Custom Field Value Exists <tspan fill="#0057a3" font-style="italic">&lt;Custom field name&gt;</tspan></text>
<rect x="981" y="368" width="355" height="15" fill="#fbfaf3"/>
<text x="988" y="379.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Is Subscribed To Channel <tspan fill="#0057a3" font-style="italic">&lt;Channel name&gt;</tspan></text>
<rect x="981" y="383" width="355" height="15" fill="#fbfaf3"/>
<text x="988" y="394.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Segment excludes <tspan fill="#0057a3" font-style="italic">&lt;Cluster / segment name&gt;</tspan></text>
<rect x="206" y="509.0" width="118" height="53" fill="#ffffff" stroke="#b8860b" stroke-width="1.2"/>
<rect x="206" y="509.0" width="118" height="15" fill="#fff9c4" stroke="#b8860b" stroke-width="1.2"/>
<text x="265.0" y="520.0" text-anchor="middle" font-family="Helvetica" font-size="8" font-weight="bold" fill="#b8860b">Then pick a level</text>
<text x="212" y="532.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Concept</text>
<text x="212" y="543.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Zone</text>
<text x="212" y="554.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Till</text>
<path d="M 324 535.5 L 340 535.5" fill="none" stroke="#b8860b" stroke-width="1.4" stroke-dasharray="4,3" stroke-linecap="round"/>
<rect x="340" y="509.0" width="150" height="53" fill="#ffffff" stroke="#b8860b" stroke-width="1.2"/>
<rect x="340" y="509.0" width="150" height="15" fill="#fff9c4" stroke="#b8860b" stroke-width="1.2"/>
<text x="415.0" y="520.0" text-anchor="middle" font-family="Helvetica" font-size="8" font-weight="bold" fill="#b8860b">Then the value</text>
<text x="346" y="532.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Name of the selected level</text>
<path d="M 563 145.5 L 578.0 145.5 L 578.0 500.0 L 265.0 500.0 L 265.0 509.0" fill="none" stroke="#b8860b" stroke-width="1.4" stroke-dasharray="4,3" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="563" cy="145.5" rx="2.4" ry="2.4" fill="#b8860b"/>
<rect x="520" y="509.0" width="150" height="64" fill="#ffffff" stroke="#b8860b" stroke-width="1.2"/>
<rect x="520" y="509.0" width="150" height="15" fill="#fff9c4" stroke="#b8860b" stroke-width="1.2"/>
<text x="595.0" y="520.0" text-anchor="middle" font-family="Helvetica" font-size="8" font-weight="bold" fill="#b8860b">If you pick a diff operator</text>
<text x="526" y="532.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Date Diff</text>
<text x="526" y="543.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Days Diff</text>
<text x="526" y="554.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Days Diff from String</text>
<text x="526" y="565.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Minutes Diff</text>
<path d="M 670 541.0 L 686 541.0" fill="none" stroke="#b8860b" stroke-width="1.4" stroke-dasharray="4,3" stroke-linecap="round"/>
<rect x="686" y="509.0" width="150" height="64" fill="#ffffff" stroke="#b8860b" stroke-width="1.2"/>
<rect x="686" y="509.0" width="150" height="15" fill="#fff9c4" stroke="#b8860b" stroke-width="1.2"/>
<text x="761.0" y="520.0" text-anchor="middle" font-family="Helvetica" font-size="8" font-weight="bold" fill="#b8860b">Then a date to compare with</text>
<text x="692" y="532.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">e.g. Date of Birth</text>
<path d="M 836 541.0 L 852 541.0" fill="none" stroke="#b8860b" stroke-width="1.4" stroke-dasharray="4,3" stroke-linecap="round"/>
<rect x="852" y="509.0" width="150" height="64" fill="#ffffff" stroke="#b8860b" stroke-width="1.2"/>
<rect x="852" y="509.0" width="150" height="15" fill="#fff9c4" stroke="#b8860b" stroke-width="1.2"/>
<text x="927.0" y="520.0" text-anchor="middle" font-family="Helvetica" font-size="8" font-weight="bold" fill="#b8860b">Then operator + number</text>
<text x="858" y="532.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">e.g. Greater Than 30</text>
<path d="M 563 183.0 L 578.0 183.0 L 578.0 496.0 L 595.0 496.0 L 595.0 509.0" fill="none" stroke="#b8860b" stroke-width="1.4" stroke-dasharray="4,3" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="563" cy="183.0" rx="2.4" ry="2.4" fill="#b8860b"/>
<rect x="12" y="585.0" width="9" height="9" fill="#ccffff" stroke="#333333" stroke-width="0.6"/>
<text x="25" y="592.0" font-family="Helvetica" font-size="8.5" fill="#444444">String</text>
<rect x="66.6" y="585.0" width="9" height="9" fill="#d5e8d4" stroke="#333333" stroke-width="0.6"/>
<text x="79.6" y="592.0" font-family="Helvetica" font-size="8.5" fill="#444444">Numeric</text>
<rect x="125.79999999999998" y="585.0" width="9" height="9" fill="#ffe6cc" stroke="#333333" stroke-width="0.6"/>
<text x="138.79999999999998" y="592.0" font-family="Helvetica" font-size="8.5" fill="#444444">Currency</text>
<rect x="189.59999999999997" y="585.0" width="9" height="9" fill="#fff2cc" stroke="#333333" stroke-width="0.6"/>
<text x="202.59999999999997" y="592.0" font-family="Helvetica" font-size="8.5" fill="#444444">Date</text>
<rect x="234.99999999999997" y="585.0" width="9" height="9" fill="#e6e6ff" stroke="#333333" stroke-width="0.6"/>
<text x="247.99999999999997" y="592.0" font-family="Helvetica" font-size="8.5" fill="#444444">Category / Enum</text>
<rect x="331.0" y="585.0" width="9" height="9" fill="#ffe6f2" stroke="#333333" stroke-width="0.6"/>
<text x="344.0" y="592.0" font-family="Helvetica" font-size="8.5" fill="#444444">Multi-select / Cluster</text>
<rect x="459.2" y="585.0" width="9" height="9" fill="#e6e6e6" stroke="#333333" stroke-width="0.6"/>
<text x="472.2" y="592.0" font-family="Helvetica" font-size="8.5" fill="#444444">Boolean</text>
<text x="12" y="605.0" font-family="Helvetica" font-size="8.5" fill="#0057a3">&lt;...&gt;  pick this before the value</text>
<text x="12" y="617.0" font-family="Helvetica" font-size="8.5" fill="#006064">[see]  opens the &quot;Transaction and currency metrics&quot; builder</text>
<text x="12" y="629.0" font-family="Helvetica" font-size="8.5" fill="#8a6d00">[diff]  Date Diff / Days Diff / Days Diff from String / Minutes Diff -&gt; pick a date to compare with -&gt; operator + number</text>
</svg></div></div>
`}</HTMLBlock>

| Attribute                                   | Classification   | Supported Operators                                                                                                                                                                                                                                                                                                                                     | Description                                                                                                                                                                                                                                                                         | Example                                                              |
| :------------------------------------------ | :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| First Name                                  | Member Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches                                                                                                                                                                                                                                                              | The first name of the group's primary member.                                                                                                                                                                                                                                       | First Name Equals "Alice"                                            |
| Last Name                                   | Member Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches                                                                                                                                                                                                                                                              | The last name of the group's primary member.                                                                                                                                                                                                                                        | Last Name Equals "Johnson"                                           |
| Name                                        | Member Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches                                                                                                                                                                                                                                                              | The full name of the primary member.                                                                                                                                                                                                                                                | Name Contains "Alice Johnson"                                        |
| Email                                       | Member Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches                                                                                                                                                                                                                                                              | The registered email address of the primary member.                                                                                                                                                                                                                                 | Email Is Not Null                                                    |
| Mobile                                      | Member Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches                                                                                                                                                                                                                                                              | The mobile number of the primary member.                                                                                                                                                                                                                                            | Mobile Exists                                                        |
| External Id                                 | Member Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches                                                                                                                                                                                                                                                              | The unique external identifier for the primary member.                                                                                                                                                                                                                              | External Id Equals "EXT-99"                                          |
| Slab Number                                 | Member Attribute | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null                                                                                                                                                                                                                                            | The serial number of the primary member's current loyalty tier.                                                                                                                                                                                                                     | Slab Number Greater Than 2                                           |
| Slab Name                                   | Member Attribute | Not Exists, Is One Of, Matches Regex, Starts With, Is None Of, Does Not Equal, Exists, Contains, Equals                                                                                                                                                                                                                                                 | The name of the primary member's current loyalty tier (e.g., "Silver", "Gold").                                                                                                                                                                                                     | Slab Name Is One Of \["Gold", "Platinum"]                            |
| Slab Change Date                            | Member Attribute | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Minutes Diff, Is Before, Is Not, Is, Is On or Before, Day Of Month, Is On or After, Is Not Null, Is Time Between, Is Null, Is After, Is Valid, Date Diff, Days Diff from String, Is Hour Between, Days Diff, Is Weekend, Is Weekday, Is Between, Is Not Between | The specific date when the primary member's loyalty tier was last changed.                                                                                                                                                                                                          | Slab Change Date Is Before "2024-01-01"                              |
| Slab Expiry Date                            | Member Attribute | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Minutes Diff, Is Before, Is Not, Is, Is On or Before, Day Of Month, Is On or After, Is Not Null, Is Time Between, Is Null, Is After, Is Valid, Date Diff, Days Diff from String, Is Hour Between, Days Diff, Is Weekend, Is Weekday, Is Between, Is Not Between | The date on which the primary member's current loyalty tier is set to expire.                                                                                                                                                                                                       | Slab Expiry Date Is After Today                                      |
| Join Date                                   | Member Attribute | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Minutes Diff, Is Before, Is Not, Is, Is On or Before, Day Of Month, Is On or After, Is Not Null, Is Time Between, Is Null, Is After, Is Valid, Date Diff, Days Diff from String, Is Hour Between, Days Diff, Is Weekend, Is Weekday, Is Between, Is Not Between | The date on which the primary member enrolled in the loyalty program.                                                                                                                                                                                                               | Day Of Month of Join Date Equals 1                                   |
| Enrollment Date                             | Member Attribute | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Minutes Diff, Is Before, Is Not, Is, Is On or Before, Day Of Month, Is On or After, Is Not Null, Is Time Between, Is Null, Is After, Is Valid, Date Diff, Days Diff from String, Is Hour Between, Days Diff, Is Weekend, Is Weekday, Is Between, Is Not Between | The system timestamp of the primary member's record creation.                                                                                                                                                                                                                       | Enrollment Date Is Before "2020-01-01"                               |
| Loyalty Type                                | Member Attribute | Not Exists, Is One Of, Matches Regex, Starts With, Is None Of, Does Not Equal, Exists, Contains, Equals                                                                                                                                                                                                                                                 | Categorization of the primary member's loyalty program type.                                                                                                                                                                                                                        | Loyalty Type Equals "Premium"                                        |
| Communication Profile                       | Member Attribute | matches all of, matches any of, is not in                                                                                                                                                                                                                                                                                                               | List of channels the primary member is eligible to be contacted through.                                                                                                                                                                                                            | Communication Profile matches any of "WHATSAPP"                      |
| Current All Points                          | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Sum of all points (Redeemable + Promised) currently held by the primary member.                                                                                                                                                                                                     | Current All Points Greater Than 10000                                |
| Promised points current balance             | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The primary member's current balance of non-redeemable/pending points.                                                                                                                                                                                                              | Promised points current balance Greater Than 500                     |
| Lifetime All Points                         | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Sum of the primary member's lifetime redeemable and promised points.                                                                                                                                                                                                                | Lifetime All Points Greater Than Or Equal 50000                      |
| Lifetime promised points earned             | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The cumulative history of all non-redeemable points the primary member has earned.                                                                                                                                                                                                  | Lifetime promised points earned Is Not Null                          |
| Lifetime Purchase                           | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Total monetary value of all purchases made by the primary member.                                                                                                                                                                                                                   | Lifetime Purchase Greater Than 2000                                  |
| Lifetime Purchase (before current activity) | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Total lifetime spend of the primary member calculated before the current transaction.                                                                                                                                                                                               | Initial Lifetime Purchase Less Than 500                              |
| Number Of Visits                            | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Total count of unique days the primary member has made a transaction.                                                                                                                                                                                                               | Number Of Visits Greater Than 10                                     |
| Number Of Txns                              | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The cumulative number of transactions made by the primary member.                                                                                                                                                                                                                   | Number Of Txns Equals 100                                            |
| Number Of Txns Today                        | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The total number of transactions made by the primary member on the current day.                                                                                                                                                                                                     | Number Of Txns Today Equals 1                                        |
| Points Redeemed Today                       | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Total sum of loyalty points the primary member has redeemed today.                                                                                                                                                                                                                  | Points Redeemed Today Greater Than 500                               |
| Avg Basket Size                             | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Average number of items per transaction for the primary member.                                                                                                                                                                                                                     | Avg Basket Size Greater Than 4                                       |
| Avg Spend Per Visit                         | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The average monetary amount the primary member spends per visit.                                                                                                                                                                                                                    | Avg Spend Per Visit Greater Than 200                                 |
| Streak Current Value                        | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null                                                                                                                                                                                                                                            | Returns the primary member's current progress in a streak challenge.                                                                                                                                                                                                                | Streak Current Value Equals 4                                        |
| Initial Current Points                      | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The redeemable points balance of the primary member before the current transaction.                                                                                                                                                                                                 | Initial Current Points Less Than 500                                 |
| Belong To Segment                           | Member Attribute | matches all of, matches any of, is not in                                                                                                                                                                                                                                                                                                               | Checks if the primary member is in a specific cluster.                                                                                                                                                                                                                              | Belong To Segment Any Match "VIP"                                    |
| Cluster Value Includes                      | Member Attribute | Equals, Not Equals                                                                                                                                                                                                                                                                                                                                      | Checks if the primary member belongs to a specific analytical segment or cluster.                                                                                                                                                                                                   | Cluster Value Includes (High Value) Equals True                      |
| Collections                                 | Member Attribute | matches all of, matches any of, is not in                                                                                                                                                                                                                                                                                                               | Checks if the primary member is associated with a specific merchandising collection.                                                                                                                                                                                                | Collections Matches Any Of \["Summer Essentials"]                    |
| Count Of Redemptions In Period              | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Redemption count in a custom period.                                                                                                                                                                                                                                                | Count Of Redemptions In Period Greater Than 2                        |
| Count Of Unique Line Items                  | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Distinct products purchased by primary member.                                                                                                                                                                                                                                      | Count Of Unique Line Items Less Than 5                               |
| Currency Metrics                            | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Conditions based on a filtered, aggregated view of a member's currency data, such as points or benefits. Select a specific fact, add optional filters, and define an aggregation. See [Transaction and currency metrics](#transaction-and-currency-metrics) for the selection flow. | Currency Metrics (Get Points, Sum, Duration: Today) Greater Than 500 |
| Custom Field Value Exists                   | Member Attribute | Equals, Not Equals                                                                                                                                                                                                                                                                                                                                      | Checks if a specific custom field has been populated with data for the primary member.                                                                                                                                                                                              | Custom Field Value Exists (Anniversary) Equals True                  |
| Customer Enrollment Date                    | Member Attribute | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Minutes Diff, Is Before, Is Not, Is, Is On or Before, Day Of Month, Is On or After, Is Not Null, Is Time Between, Is Null, Is After, Is Valid, Date Diff, Days Diff from String, Is Hour Between, Days Diff, Is Weekend, Is Weekday, Is Between, Is Not Between | The system timestamp when the primary member's record was created.                                                                                                                                                                                                                  | Customer Enrollment Date Is After "2024-01-01"                       |
| Enrolment Values                            | Member Attribute | matches all of, matches any of, is not in                                                                                                                                                                                                                                                                                                               | Checks the values captured for the primary member through a custom enrollment form field.                                                                                                                                                                                           | Enrolment Values (Referral Source) Matches Any Of \["Instagram"]     |
| Initial Current All Points                  | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Primary's total points balance before the current event.                                                                                                                                                                                                                            | Initial Current All Points Equals 0                                  |
| Is Registered At                            | Member Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches                                                                                                                                                                                                                                                              | The location where the primary member registered.                                                                                                                                                                                                                                   | Is Registered At Equals "Store 101"                                  |
| Is Subscribed To Channel                    | Member Attribute | Equals, Not Equals                                                                                                                                                                                                                                                                                                                                      | Checks if the primary member has opted in to receive communications on a specific channel.                                                                                                                                                                                          | Is Subscribed To Channel (Email) Equals True                         |
| Labels                                      | Member Attribute | matches all of, matches any of, is not in                                                                                                                                                                                                                                                                                                               | Checks if a specific label or tag has been assigned to the primary member.                                                                                                                                                                                                          | Labels Matches Any Of \["VIP"]                                       |
| Number Of Redemptions In Calendar Month     | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Count of primary member's redemptions this month.                                                                                                                                                                                                                                   | Number Of Redemptions In Calendar Month Greater Than Or Equal 5      |
| Number Of Redemptions In Calendar Week      | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Count of primary member's redemptions this week.                                                                                                                                                                                                                                    | Number Of Redemptions In Calendar Week Greater Than 0                |
| Number Of Redemptions In Past Days          | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Redemption count in the last X days.                                                                                                                                                                                                                                                | Number Of Redemptions In Past Days Greater Than 2                    |
| Number Of Redemptions Today                 | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Count of primary member's redemptions today.                                                                                                                                                                                                                                        | Number Of Redemptions Today Greater Than 5                           |
| Optin Values                                | Member Attribute | matches all of, matches any of, is not in                                                                                                                                                                                                                                                                                                               | Checks the specific value or preference recorded when the primary member opted in to a channel.                                                                                                                                                                                     | Optin Values (Email) Matches Any Of \["Newsletter"]                  |
| Points Redeemed In Calendar Month           | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Points redeemed by primary member this month.                                                                                                                                                                                                                                       | Points Redeemed In Calendar Month Greater Than 1000                  |
| Points Redeemed In Calendar Week            | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Points redeemed by primary member this week.                                                                                                                                                                                                                                        | Points Redeemed In Calendar Week Greater Than 20000                  |
| Points Redeemed In Past Days                | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Points redeemed in the last X days.                                                                                                                                                                                                                                                 | Points Redeemed In Past Days Is Not Null                             |
| Points Redeemed In Period                   | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Points redeemed by primary member in a custom period.                                                                                                                                                                                                                               | Points Redeemed In Period Greater Than 5000                          |
| Segment excludes                            | Member Attribute | Equals, Not Equals                                                                                                                                                                                                                                                                                                                                      | Checks if the primary member does not belong to a specific analytical segment or cluster.                                                                                                                                                                                           | Segment excludes (Churned) Equals True                               |
| Sum Of Item Discount                        | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Total discounts received by primary member.                                                                                                                                                                                                                                         | Sum Of Item Discount Greater Than 50                                 |
| Sum Of Item Gross Amount                    | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Total spend on specific items by primary member.                                                                                                                                                                                                                                    | Sum Of Item Gross Amount Greater Than 100                            |
| Sum Of Item Quantity                        | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Total quantity of specific items purchased by primary member.                                                                                                                                                                                                                       | Sum Of Item Quantity Greater Than 10                                 |
| Target Achieved In Period                   | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The amount of a target goal achieved within a specific custom timeframe.                                                                                                                                                                                                            | Target Achieved In Period Greater Than 500                           |
| Target Achieved In Current Period           | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The amount of a target goal achieved during the currently active cycle.                                                                                                                                                                                                             | Target Achieved In Current Period Greater Than Or Equal 1000         |
| Tracker Value Before Event                  | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Tracker value excluding current event contribution.                                                                                                                                                                                                                                 | Tracker Value Before Event Less Than 100                             |
| Tracker Value Current Event                 | Member Attribute | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The absolute value of a tracker calculated at the exact moment of the current event.                                                                                                                                                                                                | Tracker Value Current Event (Daily Limit) Less Than 100              |
| Tracker Value Tracked In Current Event      | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Tracker value including current event contribution.                                                                                                                                                                                                                                 | Tracker Value Tracked In Current Event Greater Than 10               |
| Transaction Count In Date Range             | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Transaction count in a specific date range.                                                                                                                                                                                                                                         | Transaction Count In Date Range Greater Than 5                       |
| Transaction Metrics                         | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Conditions based on a filtered, aggregated view of the current transaction's basket data. Select a specific basket fact, add optional filters, and define an aggregation. See [Transaction and currency metrics](#transaction-and-currency-metrics) for the selection flow.         | Transaction Metrics (Basket Item Count, Count) Greater Than 3        |
| Transaction Sum In Date Range               | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Total spend in a specific date range.                                                                                                                                                                                                                                               | Transaction Sum In Date Range Greater Than 500                       |
| Count Active Coupons In Coupon Series       | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The number of valid, unredeemed coupons the primary member holds for a specific series.                                                                                                                                                                                             | Count Active Coupons In Coupon Series (Summer Sale) Greater Than 0   |
| Initial Lifetime Points                     | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Primary's lifetime redeemable points before the current event.                                                                                                                                                                                                                      | Initial Lifetime Points Less Than 10000                              |
| Member Status                               | Member Attribute | Not Exists, Is One Of, Matches Regex, Starts With, Is None Of, Does Not Equal, Exists, Contains, Equals                                                                                                                                                                                                                                                 | Current operational status of the primary member.                                                                                                                                                                                                                                   | Member Status Any Match "ACTIVE"                                     |

***

## User group

User group attributes enable you to create rules based on the specific user group a member belongs to. This category allows you to evaluate the group's overall standing, for example ,checking the group's shared points balance, current tier status, or the total number of members linked to the account.

The user group attributes are supported for the following member actions: redeems points, makes a transaction.

<HTMLBlock>{`
<div style="box-sizing:border-box;margin:0 0 16px;padding:0;max-width:100%;"><div style="box-sizing:border-box;margin:0 0 5px;padding:0;font:400 11.5px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#6b7280;">User Group &#183; 16 attributes &#183; zoom in for more clarity</div><div style="box-sizing:border-box;display:block;width:100%;max-width:100%;overflow:hidden;border:1px solid #e1e4e8;border-radius:5px;background:#ffffff;position:relative;z-index:0;isolation:isolate;contain:layout paint;margin:0;padding:6px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1369 276" width="820" height="165" preserveAspectRatio="xMidYMid meet" role="img" aria-label="User Group attributes grouped by value type" style="display:block;width:100%;max-width:100%;height:auto;margin:0 auto">
<rect x="0" y="0" width="1369" height="276" fill="#ffffff"/>
<path d="M 162 70.2 L 172 70.2 L 172 38.0 L 206 38.0" fill="none" stroke="#0000ff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="70.2" rx="2.6" ry="2.6" fill="#0000ff"/>
<ellipse cx="206" cy="38.0" rx="2.6" ry="2.6" fill="#0000ff"/>
<path d="M 162 84.3 L 179 84.3 L 179 123.0 L 206 123.0" fill="none" stroke="#990000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="84.3" rx="2.6" ry="2.6" fill="#990000"/>
<ellipse cx="206" cy="123.0" rx="2.6" ry="2.6" fill="#990000"/>
<path d="M 162 98.5 L 186 98.5 L 186 25 L 579 25 L 579 38.0 L 593 38.0" fill="none" stroke="#009900" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="98.5" rx="2.6" ry="2.6" fill="#009900"/>
<ellipse cx="593" cy="38.0" rx="2.6" ry="2.6" fill="#009900"/>
<path d="M 162 112.7 L 193 112.7 L 193 17 L 971 17 L 971 38.0 L 980 38.0" fill="none" stroke="#ff8000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="112.7" rx="2.6" ry="2.6" fill="#ff8000"/>
<ellipse cx="980" cy="38.0" rx="2.6" ry="2.6" fill="#ff8000"/>
<path d="M 162 126.8 L 172 126.8 L 172 21 L 956 21 L 956 108.0 L 980 108.0" fill="none" stroke="#bd00bd" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="126.8" rx="2.6" ry="2.6" fill="#bd00bd"/>
<ellipse cx="980" cy="108.0" rx="2.6" ry="2.6" fill="#bd00bd"/>
<rect x="12" y="56.0" width="150" height="85" fill="#1a3c6e" stroke="#333333" stroke-width="1"/>
<text x="87.0" y="102.5" text-anchor="middle" font-family="Helvetica" font-size="11" font-weight="bold" fill="#ffffff">User Group</text>
<rect x="206" y="28" width="357" height="71" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="206" y="28" width="357" height="20" fill="#ccffff" stroke="#333333" stroke-width="1"/>
<text x="384.5" y="42.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">String (3)</text>
<text x="214" y="59.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Name</text>
<text x="214" y="74.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">External Id</text>
<text x="214" y="89.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Slab Name</text>
<rect x="206" y="113" width="357" height="41" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="206" y="113" width="357" height="20" fill="#e6e6ff" stroke="#333333" stroke-width="1"/>
<text x="384.5" y="127.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Category / Enum (1)</text>
<text x="214" y="144.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Initial Slab Name</text>
<rect x="593" y="28" width="357" height="131" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="593" y="28" width="357" height="20" fill="#d5e8d4" stroke="#333333" stroke-width="1"/>
<text x="771.5" y="42.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Numeric (7)</text>
<text x="601" y="59.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Slab Number</text>
<text x="601" y="74.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Member Count</text>
<text x="601" y="89.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Current Points</text>
<text x="601" y="104.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Number Of Txns</text>
<text x="601" y="119.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Number Of Visits</text>
<text x="601" y="134.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Initial Slab Number</text>
<text x="601" y="149.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Number Of Txns Today</text>
<rect x="980" y="28" width="357" height="56" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="980" y="28" width="357" height="20" fill="#ffe6cc" stroke="#333333" stroke-width="1"/>
<text x="1158.5" y="42.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Currency (2)</text>
<text x="988" y="59.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Lifetime Purchase</text>
<text x="988" y="74.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Lifetime Purchase (before current activity)</text>
<rect x="980" y="98" width="357" height="71" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="980" y="98" width="357" height="20" fill="#fff2cc" stroke="#333333" stroke-width="1"/>
<text x="1158.5" y="112.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Date (3) <tspan fill="#8a6d00" font-style="italic">[diff]</tspan></text>
<text x="988" y="129.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Created Date</text>
<text x="988" y="144.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Slab Expiry Date</text>
<text x="988" y="159.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Slab Change Date</text>
<rect x="206" y="189.0" width="150" height="31" fill="#ffffff" stroke="#b8860b" stroke-width="1.2"/>
<rect x="206" y="189.0" width="150" height="15" fill="#fff9c4" stroke="#b8860b" stroke-width="1.2"/>
<text x="281.0" y="200.0" text-anchor="middle" font-family="Helvetica" font-size="8" font-weight="bold" fill="#b8860b">If you pick a diff operator</text>
<text x="212" y="212.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Days Diff</text>
<path d="M 356 204.5 L 372 204.5" fill="none" stroke="#b8860b" stroke-width="1.4" stroke-dasharray="4,3" stroke-linecap="round"/>
<rect x="372" y="189.0" width="150" height="31" fill="#ffffff" stroke="#b8860b" stroke-width="1.2"/>
<rect x="372" y="189.0" width="150" height="15" fill="#fff9c4" stroke="#b8860b" stroke-width="1.2"/>
<text x="447.0" y="200.0" text-anchor="middle" font-family="Helvetica" font-size="8" font-weight="bold" fill="#b8860b">Then a date to compare with</text>
<text x="378" y="212.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">e.g. Date of Birth</text>
<path d="M 522 204.5 L 538 204.5" fill="none" stroke="#b8860b" stroke-width="1.4" stroke-dasharray="4,3" stroke-linecap="round"/>
<rect x="538" y="189.0" width="150" height="31" fill="#ffffff" stroke="#b8860b" stroke-width="1.2"/>
<rect x="538" y="189.0" width="150" height="15" fill="#fff9c4" stroke="#b8860b" stroke-width="1.2"/>
<text x="613.0" y="200.0" text-anchor="middle" font-family="Helvetica" font-size="8" font-weight="bold" fill="#b8860b">Then operator + number</text>
<text x="544" y="212.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">e.g. Greater Than 30</text>
<path d="M 1337 108.0 L 1347.0 108.0 L 1347.0 180.0 L 281.0 180.0 L 281.0 189.0" fill="none" stroke="#b8860b" stroke-width="1.4" stroke-dasharray="4,3" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="1337" cy="108.0" rx="2.4" ry="2.4" fill="#b8860b"/>
<rect x="12" y="232.0" width="9" height="9" fill="#ccffff" stroke="#333333" stroke-width="0.6"/>
<text x="25" y="239.0" font-family="Helvetica" font-size="8.5" fill="#444444">String</text>
<rect x="66.6" y="232.0" width="9" height="9" fill="#d5e8d4" stroke="#333333" stroke-width="0.6"/>
<text x="79.6" y="239.0" font-family="Helvetica" font-size="8.5" fill="#444444">Numeric</text>
<rect x="125.79999999999998" y="232.0" width="9" height="9" fill="#ffe6cc" stroke="#333333" stroke-width="0.6"/>
<text x="138.79999999999998" y="239.0" font-family="Helvetica" font-size="8.5" fill="#444444">Currency</text>
<rect x="189.59999999999997" y="232.0" width="9" height="9" fill="#fff2cc" stroke="#333333" stroke-width="0.6"/>
<text x="202.59999999999997" y="239.0" font-family="Helvetica" font-size="8.5" fill="#444444">Date</text>
<rect x="234.99999999999997" y="232.0" width="9" height="9" fill="#e6e6ff" stroke="#333333" stroke-width="0.6"/>
<text x="247.99999999999997" y="239.0" font-family="Helvetica" font-size="8.5" fill="#444444">Category / Enum</text>
<text x="12" y="252.0" font-family="Helvetica" font-size="8.5" fill="#8a6d00">[diff]  Days Diff -&gt; pick a date to compare with -&gt; operator + number</text>
</svg></div></div>
`}</HTMLBlock>

| Attribute                                       | Classification   | Supported Operators                                                                                                                     | Description                                                                     | Example                                                                            |
| :---------------------------------------------- | :--------------- | :-------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------- |
| **Name**                                        | Member Attribute | Equals, Not Equals, Contains, Matches, Is One Of, Is None Of, Exists, Is Empty, Is Null, Is Not Null                                    | The display name of the user group.                                             | `User Group` > `Name` > `Contains` > `Corporate`                                   |
| **External Id**                                 | Member Attribute | Equals, Not Equals, Contains, Matches, Is One Of, Is None Of, Exists, Is Empty, Is Null, Is Not Null                                    | The unique external identifier assigned to the user group.                      | `User Group` > `External Id` > `Equals` > `GRP-9988`                               |
| **Created Date**                                | Member Attribute | Equals, Not Equals, Is Before, Is After, Is On Or Before, Is On Or After, Is Between, Is Not Between, Is Weekend, Is Weekday, Days Diff | The date when the user group was created in the system.                         | `User Group` > `Created Date` > `Is Before` > `2024-01-01`                         |
| **Slab Name**                                   | Member Attribute | Equals, Not Equals, Contains, Is One Of, Is None Of, Is Null, Is Not Null                                                               | The name of the loyalty tier (slab) currently assigned to the group.            | `User Group` > `Slab Name` > `Is One Of` > `Gold, Platinum`                        |
| **Slab Number**                                 | Member Attribute | Equals, Not Equals, Greater Than, Less Than, Greater Than Or Equal, Less Than Or Equal, Is Null, Is Not Null                            | The numeric rank or level of the group's current loyalty tier.                  | `User Group` > `Slab Number` > `Greater Than` > `2`                                |
| **Slab Expiry Date**                            | Member Attribute | Equals, Not Equals, Is Before, Is After, Is On Or Before, Is On Or After, Is Between, Is Not Between, Days Diff                         | The date when the group's current tier status is set to expire.                 | `User Group` > `Slab Expiry Date` > `Days Diff` > `Current Date`                   |
| **Member Count**                                | Member Attribute | Equals, Not Equals, Greater Than, Less Than, Greater Than Or Equal, Less Than Or Equal, Is Null, Is Not Null                            | The total number of individual members linked to this group.                    | `User Group` > `Member Count` > `Greater Than` > `5`                               |
| **Current Points**                              | Member KPI       | Equals, Not Equals, Greater Than, Less Than, Greater Than Or Equal, Less Than Or Equal, Is Null, Is Not Null                            | The group's current balance of redeemable points.                               | `User Group` > `Current Points` > `Greater Than` > `5000`                          |
| **Lifetime Purchase**                           | Member KPI       | Equals, Not Equals, Greater Than, Less Than, Greater Than Or Equal, Less Than Or Equal, Is Null, Is Not Null                            | The total monetary value of purchases made by the entire group since inception. | `User Group` > `Lifetime Purchase` > `Greater Than` > `10000`                      |
| **Number Of Txns**                              | Member KPI       | Equals, Not Equals, Greater Than, Less Than, Greater Than Or Equal, Less Than Or Equal, Is Null, Is Not Null                            | The cumulative number of transactions completed by all members of the group.    | `User Group` > `Number Of Txns` > `Greater Than` > `50`                            |
| **Number Of Visits**                            | Member KPI       | Equals, Not Equals, Greater Than, Less Than, Greater Than Or Equal, Less Than Or Equal, Is Null, Is Not Null                            | The total count of unique visits made by the group.                             | `User Group` > `Number Of Visits` > `Greater Than` > `20`                          |
| **Lifetime Purchase (before current activity)** | Member KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                  | The group's lifetime spend before the current event.                            | `User Group` > `Lifetime Purchase (before current activity)` > `Less Than` > `500` |
| **Initial Slab Name**                           | Member Attribute | Not Exists, Is One Of, Matches Regex, Starts With, Is None Of, Does Not Equal, Exists, Contains, Equals                                 | The name of the loyalty tier (slab) the group held before the current event.    | `User Group` > `Initial Slab Name` > `Equals` > `Silver`                           |
| **Initial Slab Number**                         | Member Attribute | Equals, Not Equals, Greater Than, Less Than, Greater Than Or Equal, Less Than Or Equal, Is Null, Is Not Null                            | The numeric rank of the group's loyalty tier before the current event.          | `User Group` > `Initial Slab Number` > `Greater Than` > `2`                        |
| **Number Of Txns Today**                        | Member KPI       | Equals, Not Equals, Greater Than, Less Than, Greater Than Or Equal, Less Than Or Equal, Is Null, Is Not Null                            | The number of transactions completed by the group on the current day.           | `User Group` > `Number Of Txns Today` > `Equals` > `1`                             |
| **Slab Change Date**                            | Member Attribute | Equals, Not Equals, Is Before, Is After, Is On Or Before, Is On Or After, Is Between, Is Not Between, Is Weekend, Is Weekday, Days Diff | The date when the group's loyalty tier was last changed.                        | `User Group` > `Slab Change Date` > `Is Before` > `2024-01-01`                     |

***

## Purchase attributes

Purchase Attributes enable you to create conditions based on the granular details of the current transaction bill or receipt. These are financial and operational details of the purchase, including the total gross amount, the specific items present in the basket, the payment mode used, and the time of day the transaction occurred.

The purchase attributes are supported for the following member actions: makes a transaction.

<HTMLBlock>{`
<div style="box-sizing:border-box;margin:0 0 16px;padding:0;max-width:100%;"><div style="box-sizing:border-box;margin:0 0 5px;padding:0;font:400 11.5px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#6b7280;">Purchase Attributes &#183; 28 attributes &#183; zoom in for more clarity</div><div style="box-sizing:border-box;display:block;width:100%;max-width:100%;overflow:hidden;border:1px solid #e1e4e8;border-radius:5px;background:#ffffff;position:relative;z-index:0;isolation:isolate;contain:layout paint;margin:0;padding:6px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1369 503" width="820" height="301" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Purchase Attributes attributes grouped by value type" style="display:block;width:100%;max-width:100%;height:auto;margin:0 auto">
<rect x="0" y="0" width="1369" height="503" fill="#ffffff"/>
<path d="M 162 155.2 L 172 155.2 L 172 38.0 L 206 38.0" fill="none" stroke="#0000ff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="155.2" rx="2.6" ry="2.6" fill="#0000ff"/>
<ellipse cx="206" cy="38.0" rx="2.6" ry="2.6" fill="#0000ff"/>
<path d="M 162 169.3 L 179 169.3 L 179 138.0 L 206 138.0" fill="none" stroke="#ff3399" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="169.3" rx="2.6" ry="2.6" fill="#ff3399"/>
<ellipse cx="206" cy="138.0" rx="2.6" ry="2.6" fill="#ff3399"/>
<path d="M 162 183.5 L 186 183.5 L 186 25 L 579 25 L 579 38.0 L 593 38.0" fill="none" stroke="#ff8000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="183.5" rx="2.6" ry="2.6" fill="#ff8000"/>
<ellipse cx="593" cy="38.0" rx="2.6" ry="2.6" fill="#ff8000"/>
<path d="M 162 197.7 L 193 197.7 L 193 17 L 971 17 L 971 38.0 L 980 38.0" fill="none" stroke="#bd00bd" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="197.7" rx="2.6" ry="2.6" fill="#bd00bd"/>
<ellipse cx="980" cy="38.0" rx="2.6" ry="2.6" fill="#bd00bd"/>
<path d="M 162 211.8 L 172 211.8 L 172 21 L 956 21 L 956 93.0 L 980 93.0" fill="none" stroke="#990000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="211.8" rx="2.6" ry="2.6" fill="#990000"/>
<ellipse cx="980" cy="93.0" rx="2.6" ry="2.6" fill="#990000"/>
<rect x="12" y="141.0" width="150" height="85" fill="#1a3c6e" stroke="#333333" stroke-width="1"/>
<text x="87.0" y="187.5" text-anchor="middle" font-family="Helvetica" font-size="11" font-weight="bold" fill="#ffffff">Purchase Attributes</text>
<rect x="206" y="28" width="357" height="86" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="206" y="28" width="357" height="20" fill="#ccffff" stroke="#333333" stroke-width="1"/>
<text x="384.5" y="42.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">String (4)</text>
<text x="214" y="59.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Number</text>
<text x="214" y="74.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Item Code</text>
<text x="214" y="89.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Item Description</text>
<text x="214" y="104.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Notes</text>
<rect x="206" y="128" width="357" height="71" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="206" y="128" width="357" height="20" fill="#ffe6f2" stroke="#333333" stroke-width="1"/>
<text x="384.5" y="142.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Multi-select / Cluster (3)</text>
<text x="214" y="159.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Transaction Custom Fields</text>
<rect x="207" y="163" width="355" height="15" fill="#fbfaf3"/>
<text x="214" y="174.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Basket Items <tspan fill="#0057a3" font-style="italic">&lt;Brand / Category / SKU&gt;</tspan></text>
<text x="214" y="189.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Tender Notes</text>
<rect x="593" y="28" width="357" height="311" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="593" y="28" width="357" height="20" fill="#ffe6cc" stroke="#333333" stroke-width="1"/>
<text x="771.5" y="42.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Currency (19)</text>
<text x="601" y="59.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Gross Amount</text>
<text x="601" y="74.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Basket Amount Sum</text>
<text x="601" y="89.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Basket Size</text>
<text x="601" y="104.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Tender Amount</text>
<text x="601" y="119.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Item Quantity</text>
<text x="601" y="134.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Item Rate</text>
<text x="601" y="149.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Item Discount</text>
<text x="601" y="164.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Item Discount Percentage</text>
<text x="601" y="179.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Item Net Amount</text>
<text x="601" y="194.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Item Gross Amount</text>
<text x="601" y="209.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Basket Amount Sum Non Discounted</text>
<rect x="594" y="213" width="355" height="15" fill="#fbfaf3"/>
<text x="601" y="224.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Transaction Metrics <tspan fill="#006064" font-style="italic">[see]</tspan></text>
<text x="601" y="239.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Value</text>
<text x="601" y="254.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Currency Awarded On Event</text>
<text x="601" y="269.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Currency Awarded On Event For User</text>
<text x="601" y="284.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Currency Awarded On Event For User Group</text>
<text x="601" y="299.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Promised Currency Awarded On Event</text>
<text x="601" y="314.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Promised Currency Awarded On Event For User</text>
<text x="601" y="329.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Promised Currency Awarded On Event For User Group</text>
<rect x="980" y="28" width="357" height="41" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="980" y="28" width="357" height="20" fill="#fff2cc" stroke="#333333" stroke-width="1"/>
<text x="1158.5" y="42.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Date (1) <tspan fill="#8a6d00" font-style="italic">[diff]</tspan></text>
<text x="988" y="59.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Date</text>
<rect x="980" y="83" width="357" height="41" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="980" y="83" width="357" height="20" fill="#e6e6ff" stroke="#333333" stroke-width="1"/>
<text x="1158.5" y="97.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Category / Enum (1)</text>
<text x="988" y="114.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Tender Code</text>
<rect x="206" y="359.0" width="150" height="64" fill="#ffffff" stroke="#b8860b" stroke-width="1.2"/>
<rect x="206" y="359.0" width="150" height="15" fill="#fff9c4" stroke="#b8860b" stroke-width="1.2"/>
<text x="281.0" y="370.0" text-anchor="middle" font-family="Helvetica" font-size="8" font-weight="bold" fill="#b8860b">If you pick a diff operator</text>
<text x="212" y="382.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Date Diff</text>
<text x="212" y="393.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Days Diff</text>
<text x="212" y="404.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Days Diff from String</text>
<text x="212" y="415.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Minutes Diff</text>
<path d="M 356 391.0 L 372 391.0" fill="none" stroke="#b8860b" stroke-width="1.4" stroke-dasharray="4,3" stroke-linecap="round"/>
<rect x="372" y="359.0" width="150" height="64" fill="#ffffff" stroke="#b8860b" stroke-width="1.2"/>
<rect x="372" y="359.0" width="150" height="15" fill="#fff9c4" stroke="#b8860b" stroke-width="1.2"/>
<text x="447.0" y="370.0" text-anchor="middle" font-family="Helvetica" font-size="8" font-weight="bold" fill="#b8860b">Then a date to compare with</text>
<text x="378" y="382.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">e.g. Date of Birth</text>
<path d="M 522 391.0 L 538 391.0" fill="none" stroke="#b8860b" stroke-width="1.4" stroke-dasharray="4,3" stroke-linecap="round"/>
<rect x="538" y="359.0" width="150" height="64" fill="#ffffff" stroke="#b8860b" stroke-width="1.2"/>
<rect x="538" y="359.0" width="150" height="15" fill="#fff9c4" stroke="#b8860b" stroke-width="1.2"/>
<text x="613.0" y="370.0" text-anchor="middle" font-family="Helvetica" font-size="8" font-weight="bold" fill="#b8860b">Then operator + number</text>
<text x="544" y="382.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">e.g. Greater Than 30</text>
<path d="M 1337 38.0 L 1347.0 38.0 L 1347.0 350.0 L 281.0 350.0 L 281.0 359.0" fill="none" stroke="#b8860b" stroke-width="1.4" stroke-dasharray="4,3" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="1337" cy="38.0" rx="2.4" ry="2.4" fill="#b8860b"/>
<rect x="12" y="435.0" width="9" height="9" fill="#ccffff" stroke="#333333" stroke-width="0.6"/>
<text x="25" y="442.0" font-family="Helvetica" font-size="8.5" fill="#444444">String</text>
<rect x="66.6" y="435.0" width="9" height="9" fill="#ffe6cc" stroke="#333333" stroke-width="0.6"/>
<text x="79.6" y="442.0" font-family="Helvetica" font-size="8.5" fill="#444444">Currency</text>
<rect x="130.39999999999998" y="435.0" width="9" height="9" fill="#fff2cc" stroke="#333333" stroke-width="0.6"/>
<text x="143.39999999999998" y="442.0" font-family="Helvetica" font-size="8.5" fill="#444444">Date</text>
<rect x="175.79999999999998" y="435.0" width="9" height="9" fill="#e6e6ff" stroke="#333333" stroke-width="0.6"/>
<text x="188.79999999999998" y="442.0" font-family="Helvetica" font-size="8.5" fill="#444444">Category / Enum</text>
<rect x="271.79999999999995" y="435.0" width="9" height="9" fill="#ffe6f2" stroke="#333333" stroke-width="0.6"/>
<text x="284.79999999999995" y="442.0" font-family="Helvetica" font-size="8.5" fill="#444444">Multi-select / Cluster</text>
<text x="12" y="455.0" font-family="Helvetica" font-size="8.5" fill="#0057a3">&lt;...&gt;  pick this before the value</text>
<text x="12" y="467.0" font-family="Helvetica" font-size="8.5" fill="#006064">[see]  opens the &quot;Transaction and currency metrics&quot; builder</text>
<text x="12" y="479.0" font-family="Helvetica" font-size="8.5" fill="#8a6d00">[diff]  Date Diff / Days Diff / Days Diff from String / Minutes Diff -&gt; pick a date to compare with -&gt; operator + number</text>
</svg></div></div>
`}</HTMLBlock>

| Attribute                                         | Classification        | Supported Operators                                                                                                                                                                                                                                                                                                                                     | Description                                                                                                                                                                                                                                                                                                                   | Example                                                           |
| :------------------------------------------------ | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------- |
| Number                                            | Transaction Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches                                                                                                                                                                                                                                                              | The unique identifier or receipt number for the transaction.                                                                                                                                                                                                                                                                  | Transaction Number Equals "TXN-10293"                             |
| Date                                              | Transaction Attribute | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Minutes Diff, Is Before, Is Not, Is, Is On or Before, Day Of Month, Is On or After, Is Not Null, Is Time Between, Is Null, Is After, Is Valid, Date Diff, Days Diff from String, Is Hour Between, Days Diff, Is Weekend, Is Weekday, Is Between, Is Not Between | The date and time when the purchase was recorded.                                                                                                                                                                                                                                                                             | Transaction Date Is On Or After "2024-01-01"                      |
| Gross Amount                                      | Transaction Attribute | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The total value of the transaction before any discounts or taxes.                                                                                                                                                                                                                                                             | Gross Amount Greater Than 500                                     |
| Basket Amount Sum                                 | Transaction KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The total net value of the basket after all discounts are applied.                                                                                                                                                                                                                                                            | Basket Amount Sum Is Between 100 and 200                          |
| Basket Size                                       | Transaction KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The total number of unique line items included in the purchase.                                                                                                                                                                                                                                                               | Basket Size Greater Than 3                                        |
| Tender Code                                       | Transaction Attribute | Not Exists, Is One Of, Matches Regex, Starts With, Is None Of, Does Not Equal, Exists, Contains, Equals                                                                                                                                                                                                                                                 | The identifier for the payment method(s) used (e.g., CASH, WALLET). Enter the payment method **name** (for example, `Wag co-branded prepaid debit`), not the numeric tender code ID (for example, `43`). The system resolves numeric IDs to names before evaluating the condition, so entering a numeric ID will never match. | Tender Code Any Match "CREDIT\_CARD"                              |
| Tender Amount                                     | Transaction Attribute | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The specific amount paid through a specific payment tender.                                                                                                                                                                                                                                                                   | Tender Amount Greater Than 50                                     |
| Item Code                                         | Transaction Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches                                                                                                                                                                                                                                                              | A list of all product codes/SKUs present in the current transaction.                                                                                                                                                                                                                                                          | Item Code Contains "PROD-X"                                       |
| Item Description                                  | Transaction Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches                                                                                                                                                                                                                                                              | A list of all product names or descriptions in the basket.                                                                                                                                                                                                                                                                    | Item Description Any Match contains "Shoes"                       |
| Notes                                             | Transaction Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches                                                                                                                                                                                                                                                              | Any additional comments or notes attached to the transaction.                                                                                                                                                                                                                                                                 | Notes Contains "Gift Wrap"                                        |
| Transaction Custom Fields                         | Transaction Attribute | matches all of, matches any of, is not in                                                                                                                                                                                                                                                                                                               | Custom metadata attached to the transaction header.                                                                                                                                                                                                                                                                           | Transaction Custom Fields Contains "Origin:App"                   |
| Basket Items                                      | Transaction Attribute | matches all of, matches any of, is not in                                                                                                                                                                                                                                                                                                               | A list of specific item characteristics (Brand, Category, or SKU) present in the basket.                                                                                                                                                                                                                                      | Basket Items (Brand) Matches Any Of \["Nike", "Adidas"]           |
| Tender Notes                                      | Transaction Attribute | matches all of, matches any of, is not in                                                                                                                                                                                                                                                                                                               | Specific remarks or codes attached to the payment methods used.                                                                                                                                                                                                                                                               | Tender Notes Contains "GiftCard\_1234"                            |
| Item Quantity                                     | Transaction Attribute | Equal To, Less Than or Equal To, Greater Than or Equal To, Is Set, Is Not Set, Less Than, Greater Than, Not Equal To, Is Between                                                                                                                                                                                                                        | A list containing the quantity for every individual line item in the basket.                                                                                                                                                                                                                                                  | Item Quantity Greater Than Or Equal 2                             |
| Item Rate                                         | Transaction Attribute | Equal To, Less Than or Equal To, Greater Than or Equal To, Is Set, Is Not Set, Less Than, Greater Than, Not Equal To, Is Between                                                                                                                                                                                                                        | A list containing the unit price for every individual line item.                                                                                                                                                                                                                                                              | Item Rate Greater Than 50.00                                      |
| Item Discount                                     | Transaction Attribute | Equal To, Less Than or Equal To, Greater Than or Equal To, Is Set, Is Not Set, Less Than, Greater Than, Not Equal To, Is Between                                                                                                                                                                                                                        | A list containing the discount amount applied to every individual line item.                                                                                                                                                                                                                                                  | Item Discount Greater Than 0                                      |
| Item Discount Percentage                          | Transaction Attribute | Equal To, Less Than or Equal To, Greater Than or Equal To, Is Set, Is Not Set, Less Than, Greater Than, Not Equal To, Is Between                                                                                                                                                                                                                        | A list containing the discount percentage applied to every individual line item.                                                                                                                                                                                                                                              | Item Discount Percentage Equals 10                                |
| Item Net Amount                                   | Transaction Attribute | Equal To, Less Than or Equal To, Greater Than or Equal To, Is Set, Is Not Set, Less Than, Greater Than, Not Equal To, Is Between                                                                                                                                                                                                                        | A list containing the final price (after discount) for every individual line item.                                                                                                                                                                                                                                            | Item Net Amount Greater Than 100                                  |
| Item Gross Amount                                 | Transaction Attribute | Equal To, Less Than or Equal To, Greater Than or Equal To, Is Set, Is Not Set, Less Than, Greater Than, Not Equal To, Is Between                                                                                                                                                                                                                        | A list containing the original price (before discount) for every individual line item.                                                                                                                                                                                                                                        | Item Gross Amount Less Than 50                                    |
| Basket Amount Sum Non Discounted                  | Transaction KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The total value of all items in the basket before any discounts are applied.                                                                                                                                                                                                                                                  | Basket Amount Sum Non Discounted Greater Than 200.00              |
| Transaction Metrics                               | Transaction KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | Conditions based on a filtered, aggregated view of the current transaction's basket data. Select a specific basket fact, add optional filters, and define an aggregation. See [Transaction and currency metrics](#transaction-and-currency-metrics) for the selection flow.                                                   | Transaction Metrics (Basket Item Count, Count) Greater Than 3     |
| Value                                             | Transaction KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The numeric amount of loyalty currency associated with the current transaction event.                                                                                                                                                                                                                                         | Value Greater Than 100                                            |
| Currency Awarded On Event                         | Transaction KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The type and amount of loyalty currency awarded for the current transaction.                                                                                                                                                                                                                                                  | Currency Awarded On Event Greater Than 50                         |
| Currency Awarded On Event For User                | Transaction KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The type and amount of loyalty currency awarded to the member for the current transaction.                                                                                                                                                                                                                                    | Currency Awarded On Event For User Greater Than 50                |
| Currency Awarded On Event For User Group          | Transaction KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The type and amount of loyalty currency awarded to the member's user group for the current transaction.                                                                                                                                                                                                                       | Currency Awarded On Event For User Group Greater Than 50          |
| Promised Currency Awarded On Event                | Transaction KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The type and amount of promised (non-redeemable) loyalty currency awarded for the current transaction.                                                                                                                                                                                                                        | Promised Currency Awarded On Event Greater Than 20                |
| Promised Currency Awarded On Event For User       | Transaction KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The type and amount of promised (non-redeemable) loyalty currency awarded to the member for the current transaction.                                                                                                                                                                                                          | Promised Currency Awarded On Event For User Greater Than 20       |
| Promised Currency Awarded On Event For User Group | Transaction KPI       | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The type and amount of promised (non-redeemable) loyalty currency awarded to the member's user group for the current transaction.                                                                                                                                                                                             | Promised Currency Awarded On Event For User Group Greater Than 20 |

<Callout icon="📘" theme="info">
  ### Note:

  Time-based conditions on the **Date** attribute — such as **Is Hour Between** or **Is Time Between** — always evaluate against the **org's configured timezone**, regardless of any timezone offset included in the transaction's billing date. If your org is set to a different timezone than where transactions are processed, convert your target hours to the org timezone before configuring the condition.
</Callout>

***

## Purchase store

Purchase store attributes enable you to define location-specific conditions by targeting the specific outlet where a transaction takes place. You can filter eligibility based on the store's unique identifier or name, as well as custom fields.

The purchase store attributes are supported for the following member actions: gets enrolled in the program, redeems points, redeems a coupon, updates a customer profile, makes a transaction, gets delinked from a partner program, gets linked to a partner program, tier is updated in a partner program.

<HTMLBlock>{`
<div style="box-sizing:border-box;margin:0 0 16px;padding:0;max-width:100%;"><div style="box-sizing:border-box;margin:0 0 5px;padding:0;font:400 11.5px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#6b7280;">Purchase Store &#183; 5 attributes &#183; zoom in for more clarity</div><div style="box-sizing:border-box;display:block;width:100%;max-width:100%;overflow:hidden;border:1px solid #e1e4e8;border-radius:5px;background:#ffffff;position:relative;z-index:0;isolation:isolate;contain:layout paint;margin:0;padding:6px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 982 149" width="588" height="89" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Purchase Store attributes grouped by value type" style="display:block;width:100%;max-width:100%;height:auto;margin:0 auto">
<rect x="0" y="0" width="982" height="149" fill="#ffffff"/>
<path d="M 162 57.5 L 172 57.5 L 172 38.0 L 206 38.0" fill="none" stroke="#0000ff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="57.5" rx="2.6" ry="2.6" fill="#0000ff"/>
<ellipse cx="206" cy="38.0" rx="2.6" ry="2.6" fill="#0000ff"/>
<path d="M 162 69.5 L 179 69.5 L 179 21 L 574 21 L 574 38.0 L 593 38.0" fill="none" stroke="#ff3399" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="69.5" rx="2.6" ry="2.6" fill="#ff3399"/>
<ellipse cx="593" cy="38.0" rx="2.6" ry="2.6" fill="#ff3399"/>
<rect x="12" y="45.5" width="150" height="36" fill="#1a3c6e" stroke="#333333" stroke-width="1"/>
<text x="87.0" y="67.5" text-anchor="middle" font-family="Helvetica" font-size="11" font-weight="bold" fill="#ffffff">Purchase Store</text>
<rect x="206" y="28" width="357" height="71" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="206" y="28" width="357" height="20" fill="#ccffff" stroke="#333333" stroke-width="1"/>
<text x="384.5" y="42.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">String (3)</text>
<text x="214" y="59.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Name</text>
<text x="214" y="74.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Code</text>
<rect x="207" y="78" width="355" height="15" fill="#fbfaf3"/>
<text x="214" y="89.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Store Custom Fields <tspan fill="#0057a3" font-style="italic">&lt;Custom field name&gt;</tspan></text>
<rect x="593" y="28" width="357" height="56" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="593" y="28" width="357" height="20" fill="#ffe6f2" stroke="#333333" stroke-width="1"/>
<text x="771.5" y="42.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Multi-select / Cluster (2)</text>
<text x="601" y="59.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Collections</text>
<text x="601" y="74.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Labels</text>
<rect x="12" y="105.0" width="9" height="9" fill="#ccffff" stroke="#333333" stroke-width="0.6"/>
<text x="25" y="112.0" font-family="Helvetica" font-size="8.5" fill="#444444">String</text>
<rect x="66.6" y="105.0" width="9" height="9" fill="#ffe6f2" stroke="#333333" stroke-width="0.6"/>
<text x="79.6" y="112.0" font-family="Helvetica" font-size="8.5" fill="#444444">Multi-select / Cluster</text>
<text x="12" y="125.0" font-family="Helvetica" font-size="8.5" fill="#0057a3">&lt;...&gt;  pick this before the value</text>
</svg></div></div>
`}</HTMLBlock>

| Attribute           | Classification  | Supported Operators                                                                        | Description                                                                      | Example                                         |
| :------------------ | :-------------- | :----------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------- | :---------------------------------------------- |
| Name                | Store Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches | The name of the store where the transaction or event occurred.                   | Store Name Equals "London Flagship"             |
| Code                | Store Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches | The unique internal identifier for the store.                                    | Store Code Equals "UK-001"                      |
| Store Custom Fields | Store Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches | Custom metadata associated with the store (e.g., store size, region, or format). | Store Custom Fields (Region) Equals "Midlands"  |
| Collections         | Store Attribute | matches all of, matches any of, is not in                                                  | Checks if the store is associated with a specific merchandising collection.      | Collections Matches Any Of \["Flagship Stores"] |
| Labels              | Store Attribute | matches all of, matches any of, is not in                                                  | Checks if a specific label or tag has been assigned to the store.                | Labels Matches Any Of \["Mall Location"]        |

***

## Referrer code

Referrer code attributes enable you to create rules based on a customer's referral history. This category allows you to reward members based on their success in bringing new customers to the program, for example counting how many members they have successfully registered or how many of those member have made a purchase.

The referrer code attributes are supported for the following member actions: gets enrolled in the program, updates a customer profile, makes a transaction.

<HTMLBlock>{`
<div style="box-sizing:border-box;margin:0 0 16px;padding:0;max-width:100%;"><div style="box-sizing:border-box;margin:0 0 5px;padding:0;font:400 11.5px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#6b7280;">Referrer Code &#183; 2 attributes &#183; zoom in for more clarity</div><div style="box-sizing:border-box;display:block;width:100%;max-width:100%;overflow:hidden;border:1px solid #e1e4e8;border-radius:5px;background:#ffffff;position:relative;z-index:0;isolation:isolate;contain:layout paint;margin:0;padding:6px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 595 118" width="356" height="71" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Referrer Code attributes grouped by value type" style="display:block;width:100%;max-width:100%;height:auto;margin:0 auto">
<rect x="0" y="0" width="595" height="118" fill="#ffffff"/>
<path d="M 162 56.0 L 172 56.0 L 172 38.0 L 206 38.0" fill="none" stroke="#009900" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="56.0" rx="2.6" ry="2.6" fill="#009900"/>
<ellipse cx="206" cy="38.0" rx="2.6" ry="2.6" fill="#009900"/>
<rect x="12" y="38.0" width="150" height="36" fill="#1a3c6e" stroke="#333333" stroke-width="1"/>
<text x="87.0" y="60.0" text-anchor="middle" font-family="Helvetica" font-size="11" font-weight="bold" fill="#ffffff">Referrer Code</text>
<rect x="206" y="28" width="357" height="56" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="206" y="28" width="357" height="20" fill="#d5e8d4" stroke="#333333" stroke-width="1"/>
<text x="384.5" y="42.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Numeric (2)</text>
<text x="214" y="59.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Referee Reg Count</text>
<text x="214" y="74.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Referee Txn Count</text>
<rect x="12" y="90.0" width="9" height="9" fill="#d5e8d4" stroke="#333333" stroke-width="0.6"/>
<text x="25" y="97.0" font-family="Helvetica" font-size="8.5" fill="#444444">Numeric</text>
</svg></div></div>
`}</HTMLBlock>

| Attribute             | Classification | Supported Operators                                                                                          | Description                                                                                           | Example                                                                |
| :-------------------- | :------------- | :----------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| **Referee Reg Count** | Member KPI     | Equals, Not Equals, Greater Than, Less Than, Greater Than Or Equal, Less Than Or Equal, Is Null, Is Not Null | The total number of new members who have successfully registered using this customer's referral code. | `Referrer Code` > `Referee Reg Count` > `Greater Than` > `5`           |
| **Referee Txn Count** | Member KPI     | Equals, Not Equals, Greater Than, Less Than, Greater Than Or Equal, Less Than Or Equal, Is Null, Is Not Null | The total number of transactions completed by the new members referred by this customer.              | `Referrer Code` > `Referee Txn Count` > `Greater Than Or Equal` > `10` |

***

## Activity attributes

Activity attributes enable you to create conditions based on the behavioural event triggered. This allows you to evaluate operational metadata surrounding the member's action, for example, the geographic country of origin, the specific channel source of the event, and the exact timestamp of when the activity occurred.

The activity attributes are supported for the following member actions:

<HTMLBlock>{`
<div style="box-sizing:border-box;margin:0 0 16px;padding:0;max-width:100%;"><div style="box-sizing:border-box;margin:0 0 5px;padding:0;font:400 11.5px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#6b7280;">Activity Attributes &#183; 7 attributes &#183; zoom in for more clarity</div><div style="box-sizing:border-box;display:block;width:100%;max-width:100%;overflow:hidden;border:1px solid #e1e4e8;border-radius:5px;background:#ffffff;position:relative;z-index:0;isolation:isolate;contain:layout paint;margin:0;padding:6px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1369 264" width="820" height="158" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Activity Attributes attributes grouped by value type" style="display:block;width:100%;max-width:100%;height:auto;margin:0 auto">
<rect x="0" y="0" width="1369" height="264" fill="#ffffff"/>
<path d="M 162 55.6 L 172 55.6 L 172 38.0 L 206 38.0" fill="none" stroke="#0000ff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="55.6" rx="2.6" ry="2.6" fill="#0000ff"/>
<ellipse cx="206" cy="38.0" rx="2.6" ry="2.6" fill="#0000ff"/>
<path d="M 162 69.2 L 179 69.2 L 179 21 L 574 21 L 574 38.0 L 593 38.0" fill="none" stroke="#009900" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="69.2" rx="2.6" ry="2.6" fill="#009900"/>
<ellipse cx="593" cy="38.0" rx="2.6" ry="2.6" fill="#009900"/>
<path d="M 162 82.8 L 186 82.8 L 186 25 L 579 25 L 579 93.0 L 593 93.0" fill="none" stroke="#990000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="82.8" rx="2.6" ry="2.6" fill="#990000"/>
<ellipse cx="593" cy="93.0" rx="2.6" ry="2.6" fill="#990000"/>
<path d="M 162 96.4 L 193 96.4 L 193 17 L 971 17 L 971 38.0 L 980 38.0" fill="none" stroke="#bd00bd" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="96.4" rx="2.6" ry="2.6" fill="#bd00bd"/>
<ellipse cx="980" cy="38.0" rx="2.6" ry="2.6" fill="#bd00bd"/>
<rect x="12" y="42.0" width="150" height="68" fill="#1a3c6e" stroke="#333333" stroke-width="1"/>
<text x="87.0" y="80.0" text-anchor="middle" font-family="Helvetica" font-size="11" font-weight="bold" fill="#ffffff">Activity Attributes</text>
<rect x="206" y="28" width="357" height="86" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="206" y="28" width="357" height="20" fill="#ccffff" stroke="#333333" stroke-width="1"/>
<text x="384.5" y="42.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">String (4)</text>
<text x="214" y="59.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Event Source</text>
<text x="214" y="74.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Notes</text>
<text x="214" y="89.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Redeemed On Bill Number</text>
<text x="214" y="104.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Redeemed Coupon Series Id</text>
<rect x="593" y="28" width="357" height="41" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="593" y="28" width="357" height="20" fill="#d5e8d4" stroke="#333333" stroke-width="1"/>
<text x="771.5" y="42.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Numeric (1)</text>
<text x="601" y="59.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Points To Redeem</text>
<rect x="593" y="83" width="357" height="41" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="593" y="83" width="357" height="20" fill="#e6e6ff" stroke="#333333" stroke-width="1"/>
<text x="771.5" y="97.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Category / Enum (1)</text>
<text x="601" y="114.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Redemption Purpose</text>
<rect x="980" y="28" width="357" height="41" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="980" y="28" width="357" height="20" fill="#fff2cc" stroke="#333333" stroke-width="1"/>
<text x="1158.5" y="42.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">Date (1) <tspan fill="#8a6d00" font-style="italic">[diff]</tspan></text>
<text x="988" y="59.0" font-family="Helvetica" font-size="10" fill="#1a1a1a">Event Date</text>
<rect x="206" y="144.0" width="150" height="64" fill="#ffffff" stroke="#b8860b" stroke-width="1.2"/>
<rect x="206" y="144.0" width="150" height="15" fill="#fff9c4" stroke="#b8860b" stroke-width="1.2"/>
<text x="281.0" y="155.0" text-anchor="middle" font-family="Helvetica" font-size="8" font-weight="bold" fill="#b8860b">If you pick a diff operator</text>
<text x="212" y="167.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Date Diff</text>
<text x="212" y="178.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Days Diff</text>
<text x="212" y="189.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Days Diff from String</text>
<text x="212" y="200.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Minutes Diff</text>
<path d="M 356 176.0 L 372 176.0" fill="none" stroke="#b8860b" stroke-width="1.4" stroke-dasharray="4,3" stroke-linecap="round"/>
<rect x="372" y="144.0" width="150" height="64" fill="#ffffff" stroke="#b8860b" stroke-width="1.2"/>
<rect x="372" y="144.0" width="150" height="15" fill="#fff9c4" stroke="#b8860b" stroke-width="1.2"/>
<text x="447.0" y="155.0" text-anchor="middle" font-family="Helvetica" font-size="8" font-weight="bold" fill="#b8860b">Then a date to compare with</text>
<text x="378" y="167.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">e.g. Date of Birth</text>
<path d="M 522 176.0 L 538 176.0" fill="none" stroke="#b8860b" stroke-width="1.4" stroke-dasharray="4,3" stroke-linecap="round"/>
<rect x="538" y="144.0" width="150" height="64" fill="#ffffff" stroke="#b8860b" stroke-width="1.2"/>
<rect x="538" y="144.0" width="150" height="15" fill="#fff9c4" stroke="#b8860b" stroke-width="1.2"/>
<text x="613.0" y="155.0" text-anchor="middle" font-family="Helvetica" font-size="8" font-weight="bold" fill="#b8860b">Then operator + number</text>
<text x="544" y="167.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">e.g. Greater Than 30</text>
<path d="M 1337 38.0 L 1347.0 38.0 L 1347.0 135.0 L 281.0 135.0 L 281.0 144.0" fill="none" stroke="#b8860b" stroke-width="1.4" stroke-dasharray="4,3" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="1337" cy="38.0" rx="2.4" ry="2.4" fill="#b8860b"/>
<rect x="12" y="220.0" width="9" height="9" fill="#ccffff" stroke="#333333" stroke-width="0.6"/>
<text x="25" y="227.0" font-family="Helvetica" font-size="8.5" fill="#444444">String</text>
<rect x="66.6" y="220.0" width="9" height="9" fill="#d5e8d4" stroke="#333333" stroke-width="0.6"/>
<text x="79.6" y="227.0" font-family="Helvetica" font-size="8.5" fill="#444444">Numeric</text>
<rect x="125.79999999999998" y="220.0" width="9" height="9" fill="#fff2cc" stroke="#333333" stroke-width="0.6"/>
<text x="138.79999999999998" y="227.0" font-family="Helvetica" font-size="8.5" fill="#444444">Date</text>
<rect x="171.2" y="220.0" width="9" height="9" fill="#e6e6ff" stroke="#333333" stroke-width="0.6"/>
<text x="184.2" y="227.0" font-family="Helvetica" font-size="8.5" fill="#444444">Category / Enum</text>
<text x="12" y="240.0" font-family="Helvetica" font-size="8.5" fill="#8a6d00">[diff]  Date Diff / Days Diff / Days Diff from String / Minutes Diff -&gt; pick a date to compare with -&gt; operator + number</text>
</svg></div></div>
`}</HTMLBlock>

| Attribute                 | Classification     | Supported Operators                                                                                                                                                                                                                                                                                                                                     | Description                                                                   | Example                                     |
| :------------------------ | :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------- | :------------------------------------------ |
| Event Source              | Activity Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches                                                                                                                                                                                                                                                              | The specific platform, device, or channel from which the event was triggered. | Event Source Is One Of \["APP", "WEB"]      |
| Event Date                | Activity Attribute | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Minutes Diff, Is Before, Is Not, Is, Is On or Before, Day Of Month, Is On or After, Is Not Null, Is Time Between, Is Null, Is After, Is Valid, Date Diff, Days Diff from String, Is Hour Between, Days Diff, Is Weekend, Is Weekday, Is Between, Is Not Between | The actual date and time the event occurred on the client side.               | Event Date Is Weekday                       |
| Notes                     | Activity Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches                                                                                                                                                                                                                                                              | Any additional comments or notes attached to the activity or redemption.      | Notes Contains "Gift Wrap"                  |
| Points To Redeem          | Activity Attribute | Equals, Less Than, Greater Than, Less Than or Equal, Greater Than or Equal, Not Equals, Is Not Null, Is Null, Interval                                                                                                                                                                                                                                  | The number of points requested to be redeemed in the current activity.        | Points To Redeem Greater Than 100           |
| Redeemed On Bill Number   | Activity Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches                                                                                                                                                                                                                                                              | The transaction or bill number against which the redemption was recorded.     | Redeemed On Bill Number Equals "TXN-10293"  |
| Redemption Purpose        | Activity Attribute | Not Exists, Is One Of, Matches Regex, Starts With, Is None Of, Does Not Equal, Exists, Contains, Equals                                                                                                                                                                                                                                                 | The stated reason or purpose selected for the points or coupon redemption.    | Redemption Purpose Equals "GIFT"            |
| Redeemed Coupon Series Id | Activity Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches                                                                                                                                                                                                                                                              | The identifier of the coupon series the redeemed coupon belongs to.           | Redeemed Coupon Series Id Equals "SUMMER24" |

### Comparing date differences

Operators such as **Date Diff**, **Days Diff**, **Days Diff from String**, and **Minutes Diff** calculate the difference between the selected date attribute and another date, then let you compare that difference against a number. Completing a condition with one of these operators takes two more steps than a simple date comparison:

1. Select the date attribute, for example **Event Date**.
2. Select the difference operator, for example **Date Diff**, then select the date to compare against.
3. Select a comparison operator (such as **Greater Than**, **Less Than**, or **Equals**) and enter the number of days, hours, or minutes to compare the difference against.

For example, to flag events that happened more than 30 days after a member's date of birth: Event Date > Date Diff > Date of Birth > Greater Than > 30.

> **Note:** **Is Between** and **Is Not Between** let you check whether a date falls inside or outside a range, without a separate comparison operator step.

***

## Event Location

Event Location attributes allow you to create conditions based on the organisational scope where the event occurred. You can filter by concept, zone, or till to ensure rewards are granted only for activities at specific locations within your organisation hierarchy.

<HTMLBlock>{`
<div style="box-sizing:border-box;margin:0 0 16px;padding:0;max-width:100%;"><div style="box-sizing:border-box;margin:0 0 5px;padding:0;font:400 11.5px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#6b7280;">Event Location &#183; 1 attributes &#183; zoom in for more clarity</div><div style="box-sizing:border-box;display:block;width:100%;max-width:100%;overflow:hidden;border:1px solid #e1e4e8;border-radius:5px;background:#ffffff;position:relative;z-index:0;isolation:isolate;contain:layout paint;margin:0;padding:6px;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 595 198" width="356" height="119" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Event Location attributes grouped by value type" style="display:block;width:100%;max-width:100%;height:auto;margin:0 auto">
<rect x="0" y="0" width="595" height="198" fill="#ffffff"/>
<path d="M 162 48.5 L 172 48.5 L 172 38.0 L 206 38.0" fill="none" stroke="#0000ff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="162" cy="48.5" rx="2.6" ry="2.6" fill="#0000ff"/>
<ellipse cx="206" cy="38.0" rx="2.6" ry="2.6" fill="#0000ff"/>
<rect x="12" y="30.5" width="150" height="36" fill="#1a3c6e" stroke="#333333" stroke-width="1"/>
<text x="87.0" y="52.5" text-anchor="middle" font-family="Helvetica" font-size="11" font-weight="bold" fill="#ffffff">Event Location</text>
<rect x="206" y="28" width="357" height="41" fill="#ffffff" stroke="#333333" stroke-width="1"/>
<rect x="206" y="28" width="357" height="20" fill="#ccffff" stroke="#333333" stroke-width="1"/>
<text x="384.5" y="42.0" text-anchor="middle" font-family="Helvetica" font-size="11.5" font-weight="bold" fill="#0000EE">String (1)</text>
<rect x="207" y="48" width="355" height="15" fill="#fbfaf3"/>
<text x="214" y="59.0" font-family="Helvetica" font-size="10" font-weight="bold" fill="#1a1a1a">Scope <tspan fill="#8a6d00" font-style="italic">&lt;Concept | Zone | Till&gt; &lt;name&gt;</tspan></text>
<rect x="206" y="89.0" width="118" height="53" fill="#ffffff" stroke="#b8860b" stroke-width="1.2"/>
<rect x="206" y="89.0" width="118" height="15" fill="#fff9c4" stroke="#b8860b" stroke-width="1.2"/>
<text x="265.0" y="100.0" text-anchor="middle" font-family="Helvetica" font-size="8" font-weight="bold" fill="#b8860b">Then pick a level</text>
<text x="212" y="112.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Concept</text>
<text x="212" y="123.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Zone</text>
<text x="212" y="134.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Till</text>
<path d="M 324 115.5 L 340 115.5" fill="none" stroke="#b8860b" stroke-width="1.4" stroke-dasharray="4,3" stroke-linecap="round"/>
<rect x="340" y="89.0" width="150" height="53" fill="#ffffff" stroke="#b8860b" stroke-width="1.2"/>
<rect x="340" y="89.0" width="150" height="15" fill="#fff9c4" stroke="#b8860b" stroke-width="1.2"/>
<text x="415.0" y="100.0" text-anchor="middle" font-family="Helvetica" font-size="8" font-weight="bold" fill="#b8860b">Then the value</text>
<text x="346" y="112.5" font-family="Helvetica" font-size="7.5" fill="#1a1a1a">Name of the selected level</text>
<path d="M 563 55.5 L 573.0 55.5 L 573.0 80.0 L 265.0 80.0 L 265.0 89.0" fill="none" stroke="#b8860b" stroke-width="1.4" stroke-dasharray="4,3" stroke-linecap="round" stroke-linejoin="round"/>
<ellipse cx="563" cy="55.5" rx="2.4" ry="2.4" fill="#b8860b"/>
<rect x="12" y="154.0" width="9" height="9" fill="#ccffff" stroke="#333333" stroke-width="0.6"/>
<text x="25" y="161.0" font-family="Helvetica" font-size="8.5" fill="#444444">String</text>
<text x="12" y="174.0" font-family="Helvetica" font-size="8.5" fill="#0057a3">&lt;...&gt;  pick this before the value</text>
</svg></div></div>
`}</HTMLBlock>

| Attribute | Data Type | Classification     | Supported Operators                                                                        | Description                                                                                                                              | Example                                            |
| :-------- | :-------- | :----------------- | :----------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------- |
| Scope     | String    | Activity Attribute | Equals, Not Equals, Contains, Not Exists, Is Empty, Is None Of, Exists, Is One Of, Matches | The organisational scope where the event occurred. You can filter by concept (business unit), zone (geographic region), or till (store). | Event Location - Scope - Store - Equals - Store001 |

***

## Transaction and currency metrics

**Currency Metrics** and **Transaction Metrics** let you build conditions based on a filtered, aggregated view of data. Both use a multi-step selection flow: select a KPI fact, optionally add **Refine by** filters to narrow the data, then set a **Calculate by** aggregation.

* **Currency Metrics** is available under **Member attributes** and measures a member's currency balances, such as points earned and benefit activity.
* **Transaction Metrics** is available under **Purchase attributes** and measures basket-level data from the current transaction, such as item amounts, quantities, and discounts.

### KPI facts

| Metric dimension    | Available facts                                                    |
| :------------------ | :----------------------------------------------------------------- |
| Currency Metrics    | Get Benefits, Get Alternate Currencies, Get Points                 |
| Transaction Metrics | Basket Discount, Basket Quantity, Basket Item Count, Basket Amount |

### Refine by options

Use **Refine by** to narrow which records contribute to the calculation. The following options are available for Currency Metrics:

| Option      | Description                                                            |
| :---------- | :--------------------------------------------------------------------- |
| Duration    | Narrows records by a relative time period, such as today or this week. |
| Reward Type | Narrows records by reward currency type, such as points or benefits.   |

### Calculate by options

The following aggregation methods are available for both metric dimensions: **Average**, **Count**, **Sum**.

**To build a currency metric condition:**

1. In the attribute category dropdown, select **Member attributes**.
2. In the metric dimension dropdown, select **Currency Metrics**.
3. In the **Select Fact** dropdown, select the fact you want to measure.
4. Select **Refine by**, then choose a filter type and value. To add more filters, select **Add filter**.
5. Select **Calculate by**, then choose an aggregation method.
6. Select an operator and enter a value to complete the condition.

   <Image src="https://files.readme.io/fa0dd6ccf682cafdc9032f3b0f03a532bdc41a55dde5c71a6235c787a7c78bb1-image.png" align="left" width="100%" border={true} wrap={true} />

<br />

<br />

<br />

<br />

<br />

<br />

<br />

<br />

<br />

**To build a transaction metric condition:**

1. In the attribute category dropdown, select **Purchase attributes**.
2. In the metric dimension dropdown, select **Transaction Metrics**.
3. In the **Select Fact** dropdown, select the fact you want to measure.
4. Select **Refine by**, then choose a filter type and value. To add more filters, select **Add filter**.
5. Select **Calculate by**, then choose an aggregation method.

Select an operator and enter a value to complete the condition.

<Image src="https://files.readme.io/298547600f9d68af098d423a2ae2b385efc071dc8e6663433c2241e859b45404-image.png" align="left" width="100%" border={true} wrap={true} />

> **Note:** Add all **Refine by** filters before selecting **Calculate by**. Once you set a **Calculate by** method, you can't add more **Refine by** filters.