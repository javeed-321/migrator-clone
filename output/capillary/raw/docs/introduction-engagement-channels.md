---
updatedAt: 2026-03-04T06:04:35.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Introduction

Engage+ supports multiple engagement channels to help you communicate effectively with customers. It provides a library of templates for all supported channels, allowing you to manage messages efficiently and maintain consistency in design, structure, and style. This not only enhances the professional appearance of your messages but also saves time by avoiding the need to recreate templates from scratch. You can customize the look and feel of each message based on the campaign or loyalty communication needs.  You can create content from scratch, store it, and reuse it as needed. It supports the full content lifecycle covering creation, delivery, retrieval, and governance of digital assets such as text, images, audio, video, and other multimedia.

Engage+ supports the following engagement channels:

<HTMLBlock>{`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    body {
      margin: 0 !important;
      padding: 0 !important;
      font-family: sans-serif !important;
      text-align: left !important;
    }
    .grid {
      display: grid !important;
      grid-template-columns: repeat(3, 1fr) !important;
      gap: 16px !important;
      padding: 20px !important;
      box-sizing: border-box !important;
      text-align: left !important;
    }
    .tile {
      background-color: #F9F9F9 !important;
      padding: 0 !important;
      border-radius: 8px !important;
      border: 1px solid #ddd !important;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08) !important;
      transition: background-color 0.2s ease, transform 0.2s ease !important;
      text-align: left !important;
      position: static !important;
      overflow: hidden !important;
    }
    .tile a {
      display: block !important;
      text-decoration: none !important;
      color: #333 !important;
      width: 100% !important;
      text-align: left !important;
      padding: 16px !important;
      margin: 0 !important;
      position: static !important;
      transition: background-color 0.2s ease, transform 0.2s ease !important;
      border-radius: 8px !important;
    }
    .tile span {
      font-size: 1em !important;
      font-weight: 500 !important;
      margin-left: 8px !important;
      white-space: nowrap !important;
      text-align: left !important;
      padding: 0 !important;
      display: inline-block !important;
      vertical-align: middle !important;
    }
    .icon {
      width: 24px !important;
      height: 24px !important;
      object-fit: contain !important;
      display: inline-block !important;
      vertical-align: middle !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    .tile:hover {
      transform: scale(1.02) !important;
    }
    .tile[data-tile="sms"] a:hover { background-color: rgba(255, 204, 0, 0.3) !important; }
    .tile[data-tile="email"] a:hover { background-color: rgba(204, 0, 0, 0.3) !important; }
    .tile[data-tile="push-notifications"] a:hover { background-color: rgba(153, 102, 255, 0.4) !important; }
    .tile[data-tile="wechat"] a:hover { background-color: rgba(0, 185, 0, 0.3) !important; }
    .tile[data-tile="call-task"] a:hover { background-color: rgba(102, 204, 255, 0.3) !important; }
    .tile[data-tile="line"] a:hover { background-color: rgba(0, 153, 51, 0.4) !important; }
    .tile[data-tile="viber"] a:hover { background-color: rgba(123, 104, 238, 0.3) !important; }
    .tile[data-tile="whatsapp"] a:hover { background-color: rgba(37, 211, 102, 0.3) !important; }
    .tile[data-tile="rcs"] a:hover { background-color: rgba(0, 123, 255, 0.3) !important; }
    .tile[data-tile="zalo"] a:hover { background-color: rgba(0, 153, 255, 0.3) !important; }
    .tile[data-tile="in-app-message"] a:hover { background-color: rgba(255, 102, 102, 0.3) !important; }
  </style>
</head>
<body>
  <div class="grid">
    <div class="tile" data-tile="sms">
      <a href="https://docs.capillarytech.com/docs/sms">
        <img class="icon" src="https://cdn-icons-png.flaticon.com/512/11685/11685202.png" alt="SMS Icon" />
        <span>SMS</span>
      </a>
    </div>
    <div class="tile" data-tile="email">
      <a href="https://docs.capillarytech.com/docs/email">
        <img class="icon" src="https://cdn-icons-png.flaticon.com/512/732/732200.png" alt="Email Icon" />
        <span>Email</span>
      </a>
    </div>
    <div class="tile" data-tile="push-notifications">
      <a href="https://docs.capillarytech.com/docs/push-notifications">
        <img class="icon" src="https://cdn-icons-png.flaticon.com/512/1827/1827349.png" alt="Push Notifications Icon" />
        <span>Push Notifications</span>
      </a>
    </div>
    <div class="tile" data-tile="wechat">
      <a href="https://docs.capillarytech.com/docs/wechat">
        <img class="icon" src="https://cdn-icons-png.flaticon.com/512/3670/3670101.png" alt="WeChat Logo" />
        <span>WeChat</span>
      </a>
    </div>
    <div class="tile" data-tile="call-task">
      <a href="https://docs.capillarytech.com/docs/call-task">
        <img class="icon" src="https://cdn-icons-png.flaticon.com/512/724/724664.png" alt="Call Task Icon" />
        <span>Call Task</span>
      </a>
    </div>
    <div class="tile" data-tile="line">
      <a href="https://docs.capillarytech.com/docs/line-overview">
        <img class="icon" src="https://www.svgrepo.com/show/303189/line-messenger-logo.svg" alt="LINE Logo" />
        <span>LINE</span>
      </a>
    </div>
    <div class="tile" data-tile="viber">
      <a href="https://docs.capillarytech.com/docs/viber">
        <img class="icon" src="https://cdn-icons-png.flaticon.com/512/3670/3670059.png" alt="Viber Logo" />
        <span>Viber</span>
      </a>
    </div>
    <div class="tile" data-tile="whatsapp">
      <a href="https://docs.capillarytech.com/docs/whatsapp">
        <img class="icon" src="https://cdn-icons-png.flaticon.com/512/3536/3536445.png" alt="WhatsApp Icon" />
        <span>WhatsApp</span>
      </a>
    </div>
    <div class="tile" data-tile="rcs">
      <a href="https://docs.capillarytech.com/docs/rcs">
        <img class="icon" src="https://cdn-icons-png.flaticon.com/512/7286/7286142.png" alt="RCS Icon" />
        <span>RCS</span>
      </a>
    </div>
    <div class="tile" data-tile="zalo">
      <a href="https://docs.capillarytech.com/docs/zalo">
        <img class="icon" src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" alt="Zalo Logo" />
        <span>Zalo</span>
      </a>
    </div>
    <div class="tile" data-tile="in-app-message">
      <a href="https://docs.capillarytech.com/docs/in-app-message">
        <img class="icon" src="https://cdn-icons-png.flaticon.com/512/204/204301.png" alt="In-app Message Icon" />
        <span>In-app Message</span>
      </a>
    </div>
  </div>
</body>
</html>
`}</HTMLBlock>

# Messaging availability across channels and platforms

This table provides an overview of support for various types of messages (Transactional, OTP, and Bulk) across multiple communication channels and platforms.

**How to Read the Table**

* **✓ (Checkmark):** Indicates that the feature is available. For example, **Bulk SMS** under the **Engage+** channel means that bulk SMS messaging is supported.
* **<img src="https://cdn-icons-png.flaticon.com/512/8022/8022293.png" alt="Template Creation" title="Template Creation" width="16" height="16" />(Template Creation):** Indicates that while direct sending might not be supported, templates can be created for that message type. For instance, for **Engage+**, in **WhatsApp OTP**, the <img src="https://cdn-icons-png.flaticon.com/512/8022/8022293.png" alt="Template Creation" title="Template Creation" width="16" height="16" /> symbol means that Whatsapp OTP message templates can be created in the Engage+ channel.

<HTMLBlock>{`
<table style="width: 100%; border-collapse: collapse; font-size: 16px; border: 1px solid #d3d3d3;">
  <thead>
    <tr>
      <th style=border-right: 1px solid black; text-align: center;">Channel</th>
      <th style="border: none; text-align: center;">Type of Message</th>
      <th style="border: none; text-align: center;">SMS</th>
      <th style="border: none; text-align: center;">Email</th>
      <th style="border: none; text-align: center;">WhatsApp</th>
      <th style="border: none; text-align: center;">Zalo</th>
      <th style="border: none; text-align: center;">LINE*</th>
      <th style="border: none; text-align: center;">Mobile Push/In-app</th>
      <th style="border: none; text-align: center;">Viber</th>
      <th style="border: none; text-align: center;">RCS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3" style=border-right: 1px solid black; text-align: center;"><b>Engage+</b></td>
      <td style="border: none; text-align: center;">Transactional</td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
    </tr>
    <tr>
      <td style="border: none; text-align: center;">OTP</td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"><img src="https://cdn-icons-png.flaticon.com/512/8022/8022293.png" alt='Template Creation' title='Template Creation' width="16" height="16" /></td>
      <td style="border: none; text-align: center;"><img src="https://cdn-icons-png.flaticon.com/512/8022/8022293.png" alt='Template Creation' title='Template Creation' width="16" height="16" /></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
    </tr>
    <tr>
      <td style="border: none; text-align: center;">Bulk</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
    </tr>
    <tr>
      <td rowspan="3" style=border-right: 1px solid black; text-align: center;"><b>Journeys</b></td>
      <td style="border: none; text-align: center;">Transactional</td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
    </tr>
    <tr>
      <td style="border: none; text-align: center;">OTP</td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
    </tr>
    <tr>
      <td style="border: none; text-align: center;">Bulk</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
    </tr>
    <tr>
      <td rowspan="3" style=border-right: 1px; text-align: center;"><b>Loyalty+</b></td>
      <td style="border: none; text-align: center;">Transactional</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
    </tr>
    <tr>
      <td style="border: none; text-align: center;">OTP</td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
    </tr>
    <tr>
      <td style="border: none; text-align: center;">Bulk</td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
    </tr>
    <tr>
      <td rowspan="3" style=border-right: 1px solid black; text-align: center;"><b>Unified Comms. Engine</b></td>
      <td style="border: none; text-align: center;">Transactional</td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
    </tr>
    <tr>
      <td style="border: none; text-align: center;">OTP</td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
    </tr>
    <tr>
      <td style="border: none; text-align: center;">Bulk</td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
    </tr>
    <tr>
      <td rowspan="3" style=border-right: 1px solid black; text-align: center;"><b>Send Comm. API</b></td>
      <td style="border: none; text-align: center;">Transactional</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
    </tr>
    <tr>
      <td style="border: none; text-align: center;">OTP</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
    </tr>
    <tr>
      <td style="border: none; text-align: center;">Bulk</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
    </tr>
    <tr>
      <td rowspan="3" style=border-right: 1px solid black; text-align: center;"><b>GET Customer Interactions<br>API</b></td>
      <td style="border: none; text-align: center;">Transactional</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
    </tr>
    <tr>
      <td style="border: none; text-align: center;">OTP</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
    </tr>
    <tr>
      <td style="border: none; text-align: center;">Bulk</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
    </tr>
    <tr>
      <td rowspan="3" style=border-right: 1px solid black; text-align: center;"><b>Auth Engine</b></td>
      <td style="border: none; text-align: center;">Transactional</td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
    </tr>
    <tr>
      <td style="border: none; text-align: center;">OTP</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;">✓</td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
    </tr>
    <tr>
      <td style="border: none; text-align: center;">Bulk</td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
      <td style="border: none; text-align: center;"></td>
    </tr>
  </tbody>
</table>
`}</HTMLBlock>

\*For the LINE channel, individual message delivery statuses are not available.

\*\*For information on creating OTP templates, refer to the documentation on [creating templates](https://docs.capillarytech.com/docs/creatives).

# Supported gateway partners

The following table lists the gateway partners integrated with Capillary, along with the respective communication channels they support.

<HTMLBlock>{`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gateway Partners</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        
        table {
            width: 100%;
            border-collapse: collapse;
        }
        
        th, td {
            padding: 10px;
            text-align: left;
            border: 1px solid #ccc;
        }
        
        th {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <table>
        <thead>
            <tr>
                <th>Channel</th>
                <th>Gateway Partners</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Email</td>
                <td>SendGrid, Falconide, Netcore, Octane, ValueFirst</td>
            </tr>
            <tr>
                <td>WhatsApp</td>
                <td>Karix, Tanla, ICS, Gupshup</td>
            </tr>
            <tr>
                <td>SMS</td>
                <td>ICS, Airtel, Alibaba, Sinch, Onextel, Cequence, SolutionInfini, Tanla, Broadnet, Infobip, SSL, ValueFirst, TBP, Vectramind, Unicel, Karix</td>
            </tr>
        </tbody>
    </table>
</body>
</html>
`}</HTMLBlock>

# Supported features for engagement channels

This table provides a comprehensive overview of features available across different engagement channels, helping you choose the right channel for your communication needs.

| Section/Channels         | Push notification | In-app message | WhatsApp | RCS | SMS | Email | Line | Viber | Zalo |
| ------------------------ | ----------------- | -------------- | -------- | --- | --- | ----- | ---- | ----- | ---- |
| Template name            | Yes               | Yes            | Yes      | Yes | Yes | Yes   | Yes  | Yes   | Yes  |
| Subject / Title          | Yes               | Yes            | No       | Yes | No  | Yes   | Yes  | No    | No   |
| Message/Content          | Yes               | Yes            | Yes      | Yes | Yes | Yes   | Yes  | Yes   | Yes  |
| Image                    | Yes               | Yes            | Yes      | Yes | No  | Yes   | Yes  | Yes   | No   |
| Video                    | Yes               | No             | Yes      | Yes | No  | Yes   | Yes  | Yes   | No   |
| Carousel                 | Yes               | No             | Yes      | No  | No  | No    | Yes  | Yes   | No   |
| Primary button           | Yes               | Yes            | Yes      | Yes | No  | Yes   | No   | Yes   | Yes  |
| Secondary button         | Yes               | Yes            | Yes      | No  | No  | Yes   | No   | No    | No   |
| Tertiary button          | Yes               | No             | No       | No  | No  | Yes   | No   | No    | No   |
| Upload HTML              | No                | Yes            | No       | No  | No  | Yes   | No   | No    | No   |
| Link URL to content      | Yes               | Yes            | No       | No  | No  | Yes   | No   | No    | No   |
| Device type: Android/iOS | Yes               | Yes            | No       | No  | No  | No    | No   | No    | No   |
| Template/layout type     | No                | Yes            | Yes      | No  | No  | No    | Yes  | No    | No   |