---
updatedAt: 2026-05-25T13:39:15.000Z
---

Fetch the complete documentation index at: https://docs.capillarytech.com/llms.txt. Use this file to discover all available pages before exploring further.

# Configure SFTP server for data export

Brands are required to have their own Secure FTP (SFTP) infrastructure for exporting data. Currently, Capillary supports data exports only via SFTP.

You can configure up to five SFTP servers. After the data is exported to the SFTP server, you can download it to your local machine.

> 📘 Note
>
> An SFTP once added you cannot be deleted or renamed. However, you can change server details and the path within that SFTP.

# Prerequisites

* [ ] Destination SFTP server for data storage
* [ ] Source Host server IP for data retrieval
* [ ] FTP Configuration Details:
  * [ ] Hostname
  * [ ] Port number
  * [ ] Username and Password
  * [ ] Path to the folder

# Configuring SFTP

To configure the SFTP server, follow these steps.

1. Whitelist the below Capillary's IP addresses to allow connections to the brand's SFTP server.

   | Cluster                      | IPs                               |
   | :--------------------------- | :-------------------------------- |
   | APAC1/INCRM (India)          | 54.235.251.85<br />3.227.110.70   |
   | APAC2/AsiaCRM (Rest of Asia) | 13.126.188.129                    |
   | EUCRM                        | 54.247.60.162<br />52.214.98.25   |
   | USCRM                        | 18.224.36.121<br />18.189.151.155 |
2. In the Insights+ UI, navigate to **Settings** > **FTP**, click **Add Ftp Server**.<br />The Add FTP modal appears.

   <Image src="https://files.readme.io/88ad3ed004ef07ab80c4e94a0f8377cadaa1a16d75e4e83d5b082461675aa56e-Screenshot_2026-05-22_at_3.20.08_PM.png" border={true} />

4) Enter the following information:

   <Image src="https://files.readme.io/21ec602522094ed095b81d43a2e76feef886b035813ce16d1258b6a3a7e085ea-Screenshot_2026-05-22_at_3.48.00_PM.png" border={true} />

   | Field                 | Required | Description                                                                                                                                                                                                                                                                                   |
   | --------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | FTP name              | Yes      | A unique name to identify this FTP server configuration. The name will be displayed when configuring an export job in Select FTP.                                                                                                                                                             |
   | Server address        | Yes      | The hostname or IP address of the FTP server. If the default port (22) is being used, then enter the URL of the client SFTP server. For example, `abc.def.com`.  If custom port 82 is used, then enter the URL with the port number of the client SFTP server.  For example, `abc.def.com:82` |
   | Default target folder | Yes      | The folder path on the FTP server where exported files are saved. For example, '/export'. If the path is not specified, data will be saved in the root directory of the SFTP server.                                                                                                          |
   | Username              | Yes      | The username used to authenticate with the FTP server.                                                                                                                                                                                                                                        |
   | Authentication method | Yes      | The method used to authenticate with the FTP server. Select **Password** or **SSH key.**                                                                                                                                                                                                      |
   | Password              | Yes      | The password for the FTP server account. This field appears when you select Password as the authentication method.                                                                                                                                                                            |
   | SSH key               | Yes      | The private key used to authenticate the SFTP connection through SSH. This field appears when you select SSH key as the authentication method.                                                                                                                                                |
   | Passphrase            | No       | The passphrase that protects the SSH key. This field appears when you select SSH key as the authentication method. Leave this field blank if the private key does not have a passphrase.                                                                                                      |

5) Click **Submit**.

> 🚧 Note
>
> * Connection to the SFTP/FTP server fails if your account has Multi-Factor Authentication (MFA) enabled.
> * If the specified folder is not identified in the Target Path of the SFTP server, the configuration fails.
> * The file name of an exported file will have the following naming convention.
>   * schedulename**templateName\_timestamp. For example, DailySlabChange**SlabChangeLog**2019-10-29-12-30-02**1572356331802.

# Setting up the public key in the Capillary SFTP server

Upload your SSH public key to the Capillary SFTP server before using SSH-based authentication. The SFTP server uses the public key to validate your connection when files are transferred.

## Prerequisites

* Access to the Capillary SFTP server
* Permission to create folders

## Set up the public key

To set up the public key,

1. Sign in to the Capillary SFTP portal at <https://data.capillarydata.com/newSession> using your username and password. The SFTP home page appears.

2. Select the **Profile** icon and select **My account**. <br />The **My Account** page opens.

   <Image src="https://files.readme.io/54556bc3c9ae9e7ccb36b4cddb7b547714aeb0728fdf7a03db11b871e316d008-divya-doc-drafts-google-docs.png" border={true} />

3. Select **Authentication > SFTP/SSH Keys**.

   <Image src="https://files.readme.io/dbe33ad2e59460370db1968bd1137dd12ae705d63b913faa201a1e049dedf710-divya-doc-drafts-google-docs_1.png" border={true} />

4. Click **New SFTP/SSH Key**. <br />The **Create SFTP/SSH Key** page opens.

   <Image src="https://files.readme.io/d8a28b7e045dd00c951a596571e30d5500dc2e594e82888d612f6dd1125603bd-divya-doc-drafts-google-docs_2.png" width="70%" border={true} />

5. Under **Title**, enter a name for the SSH key.

6. Under **Key pair**, choose one of the following options:<br />- [Use your own](https://docs.capillarytech.com/docs/configure-ftp-server-for-data-export#ssh-authentication)<br />- Generate in browser

   For details on creating the key using the different options, refer <https://www.files.com/docs/services/sftp/sftp-ssh-keys/generating-sftp-ssh-keys>

7. Under **Public key**, paste your SSH public key.

8. Select **Save**.

# Testing SFTP configuration

You can either export a test file from Insights and test if the file is exported successfully or can also check the connection using Wetty.

To check the connection using Wetty,

1. Run the command `nmap <hostname>` to check the open port for a host.

<Image src="https://files.readme.io/bb8deed-check_port.png" align="center" width="50% " border={true} />

2. Run the command `telnet <hostname> <port>`.

<Image src="https://files.readme.io/827c7c6-check_whitelist.png" align="center" width="50% " border={true} />

## SSH authentication

SSH (Secure Shell Protocol) is a secure method of connecting to your SFTP (SSH File Transfer Protocol) servers for data transfer. Instead of passwords, SSH authentication relies on a key pair: a public key and a private key.

* **Private key**: Stored on your device and used when you connect to the server.
* **Public key**: Shared with the access team, who link it to your username on the SFTP server to enable SSH-based authentication.

Optionally, you can add a passphrase when creating your key for additional security.

### Steps to create SSH authentication for SFTP

To use SSH for SFTP connections, complete the following steps to generate the SSH key pair:

1. Open your terminal (macOS or Windows) and run the command:

   ```text Bash
   ssh-keygen -t rsa -b 4096 -m PEM -C "tom.sawyer@capillarytech.com"
   ```

   **Note**: Only PEM file formats are supported to store the keys.<br /><br />The command uses the following options:

   * `-t`: Specifies the key algorithm. RSA is recommended.
   * `-b`: Specifies the key length in bits. A higher value indicates stronger encryption.
   * `-m`: Saves the private key in PEM format.
   * `-C`: Adds a comment, typically your email address, for identification.

2. When prompted, choose a location to save the keys. The default locations are:

   * macOS: `/Users/user_name/.ssh/`
   * Windows: `C:\Users\user_name\.ssh\`

   Two files are generated:

   * `id_rsa`: Private key. The private key is in OpenSSH format, including the header and footer lines (`-----BEGIN RSA PRIVATE KEY-----` and `-----END RSA PRIVATE KEY-----`).
   * `id_rsa.pub`: Public key.

3. Optional: When prompted, add a passphrase to secure the key. Select **Enter** to skip if you do not want a passphrase.

<Image src="https://files.readme.io/044d777d4d734885a1dffc1a0a6e6e3f8ec8028e371cd4e4fae8d23119063695-Screenshot_2026-05-22_at_6.27.25_PM.png" width="80%" border={true} />

<br />