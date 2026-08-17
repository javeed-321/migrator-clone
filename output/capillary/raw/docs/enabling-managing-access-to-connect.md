---
updatedAt: 2026-05-26T10:18:49.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Access Connect+

Access, prerequisites, and how to manage users and workspace access in Connect+.

Before you start using Connect+, ensure that you have the required access&#x20;

# Access and permissions

You can access Connect+ using the URL: `https://{host}/extensions/connectplus/ui`

To request access, raise a request with your Capillary access team.

Currently, Connect+ does not support user personas.

# Prerequisites

Ensure that the following configurations are completed.

## FTP or SFTP server

Most Connect+ dataflows read source data from an FTP or SFTP location. Before configuring the Connect to source block, have the following details ready.

* Hostname of the FTP or SFTP server
* Port number of the FTP or SFTP server. The standard ports are `21` for FTP and `22` for SFTP.
* Username and password, or an SSH private key for SSH-based authentication
* Folder paths for source files, processed files, and API error files

Each `Live` dataflow must use unique folder paths. Sharing paths across dataflows can cause files to be picked up by the wrong dataflow or routed to the wrong error directories.

> ❗️ **Note**
>
> &#x20;SFTP accounts with Multi-Factor Authentication enabled will fail to connect. Disable MFA on the account used by Connect+ before configuring the block.

If Connect+ needs to read from your brand's SFTP server, whitelist the following Capillary IP addresses to allow incoming connections.

| Cluster                      | IP addresses                  |
| ---------------------------- | ----------------------------- |
| APAC1/INCRM (India)          | 54.235.251.85, 3.227.110.70   |
| APAC2/AsiaCRM (Rest of Asia) | 13.126.188.129                |
| EUCRM                        | 54.247.60.162, 52.214.98.25   |
| USCRM                        | 18.224.36.121, 18.189.151.155 |

## API credentials for the destination

Dataflows that send data to a Capillary API require OAuth2 credentials.

* API key and secret with OAuth2 client credentials flow
* The credentials must have the appropriate access group permissions for the specific API operation being called

For access group permissions, refer to the documentation for the specific API you intend to call.

## Sample source file

A Connect+ source file is the initial input file containing raw data such as customer records, transactions, or product catalogs that you want to ingest into the Capillary platform.

* The file should be in a delimited text format such as CSV, TXT, or DAT.
* It should contain representative column headers and at least a few rows of data.
* The maximum supported file size for uploading a header sample in the Connect to source block is 5 MB.

<br />