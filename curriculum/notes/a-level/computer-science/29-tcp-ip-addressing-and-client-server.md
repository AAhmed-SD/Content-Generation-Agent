---
level: A-level
subject: Computer Science
topic: "TCP/IP: the four-layer stack, sockets, ports, MAC addresses, application protocols, IP addressing, subnets, IPv4 and IPv6, DHCP, NAT, port forwarding, client-server, WebSocket, CRUD and REST, JSON and XML, thin and thick clients"
as_content: "A-level only for AQA (4.9.4). OCR: the TCP/IP stack and protocol layering are also AS."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.9.4.1", "4.9.4.2", "4.9.4.3", "4.9.4.4", "4.9.4.5", "4.9.4.6", "4.9.4.7", "4.9.4.8", "4.9.4.9", "4.9.4.10", "4.9.4.11"]
  - board: OCR
    code: "H446"
    spec_refs: ["1.3.3(a)", "1.3.3(d)"]
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C2.1: Networking", "C2.2: Communication networks"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# TCP/IP, addressing and the client-server model

This file covers the four layers of the TCP/IP stack and why protocols are layered, sockets, ports and MAC addresses, TCP and UDP, application-layer protocols (HTTP, HTTPS, FTP, SMTP, POP3, IMAP, SSH, DHCP), web, email and FTP servers and browsers, IP address structure, subnet masks, IPv4 and IPv6, public and private addresses, DHCP, NAT, port forwarding, the client-server model, WebSocket, CRUD and REST, JSON and XML, and thin and thick clients.

Builds on [GCSE: Protocols and layers](../../gcse/computer-science/16-protocols-and-layers.md).

### Board differences

| Content | AQA 7517 | OCR H446 | Eduqas A500QS |
| --- | --- | --- | --- |
| TCP/IP stack | Four layers; sockets; MAC addresses; well-known and client ports | TCP/IP stack; protocol layering | Typical packet contents using protocols such as TCP/IP |
| Protocols | FTP, HTTP, HTTPS, POP3, SMTP, SSH; email, web servers, browsers | (DNS, file 28) | HTTP, FTP, SMTP, TCP/IP, IMAP, DHCP, UDP, wireless protocols |
| Addressing | IP structure, subnets, v4 and v6, public and private, DHCP, NAT, port forwarding | Not named | DHCP |
| Web apps | Client-server, WebSocket, CRUD and REST, JSON vs XML, thin vs thick client | Client-server (1.3.3(d)); web technologies in file 35 | Not named |

## 4.9.4.1 TCP/IP

*Refs: AQA 4.9.4.1 · OCR 1.3.3(a) · Eduqas C2.1: Networking, C2.2: Communication networks.*

### What you need to know

- Protocol layering: network communication is split into layers, each with its own protocols and job, and each using the services of the layer below. Benefits: each layer can be developed, changed or replaced independently (Wi-Fi can replace Ethernet without changing HTTP); problems are easier to isolate; it is easier to standardise, so equipment and software from different makers work together.
- The four layers of the TCP/IP stack (sending goes down the stack; receiving goes up):
  1. Application layer: the protocols programs use to exchange data (HTTP, FTP, SMTP, DNS). Decides the format and meaning of the messages.
  2. Transport layer: sets up end-to-end communication between the two programs. TCP splits data into segments, numbers them, adds source and destination port numbers, and makes sure they arrive: acknowledgements, retransmission of lost segments, putting segments back in order, and flow control. UDP also adds ports but gives no guarantees: faster, used for streaming, gaming, DNS look-ups and VoIP, where speed matters more than every packet.
  3. Network (internet) layer: adds source and destination IP addresses to make packets; routers work at this layer to route packets across networks (IP).
  4. Link layer: sends the data across the physical network, adding source and destination MAC addresses for the next hop to make frames, and converting them into signals (Ethernet, Wi-Fi).
- Each layer adds its own header (encapsulation); the receiver's matching layer removes it.
- MAC (Media Access Control) address: a unique 48-bit address burned into each network interface card by the maker, written as 6 hex pairs (for example 3C:22:FB:9A:01:7E). Used by the link layer to deliver frames on the local network. MAC addresses change on every hop (each router addresses the frame to the next device); IP addresses stay the same end to end.
- Port: a 16-bit number identifying a particular application or service on a host, so arriving data reaches the right program.
  - Well-known ports (0 to 1023) are assigned to standard server services: HTTP 80, HTTPS 443, FTP 20 and 21, SSH 22, SMTP 25, POP3 110, IMAP 143, DNS 53.
  - Client (ephemeral) ports (usually 49152 and above) are picked temporarily by the client's OS for one connection, so replies come back to the right program and several connections can be open at once.
- Socket: the endpoint of a connection, IP address plus port, such as 192.168.1.5:51034. A connection is identified by a pair of sockets (client and server). Programs use sockets (through an API) to send and receive data via the transport layer.
- TCP three-way handshake (Eduqas handshaking): SYN (client asks to connect), SYN-ACK (server agrees), ACK (client confirms). Then data flows.

### Worked example

Requesting a web page: the browser (application) creates an HTTP GET request; TCP (transport) puts it in a segment from client port 51034 to server port 443 (HTTPS); IP (network) adds source 86.12.4.9 and destination 151.101.0.81; Ethernet or Wi-Fi (link) adds the MAC address of the home router and sends the frame. Each router along the way strips the link header, reads the IP address, and adds a new link header for the next hop.

## 4.9.4.2 Standard application layer protocols

*Refs: AQA 4.9.4.2 · Eduqas C2.1: Networking.*

### What you need to know

| Protocol | Purpose |
| --- | --- |
| HTTP | Requesting and sending web pages and resources between browser and web server |
| HTTPS | HTTP over an encrypted TLS connection: confidentiality, integrity and server authentication using certificates |
| FTP | Transferring files between a client and a server |
| SMTP | Sending email from a client to a mail server, and between mail servers |
| POP3 | Retrieving email from a server; usually downloads and deletes it from the server, so mail lives on one device |
| IMAP (Eduqas) | Retrieving email while keeping it on the server, synchronised across several devices |
| SSH | Secure, encrypted remote login and command execution on another computer |
| DHCP (Eduqas) | Automatically giving devices IP addresses and settings (below) |
| UDP (Eduqas) | Connectionless transport protocol (above) |

- FTP access: anonymous access lets anyone download public files with no account (username "anonymous"); non-anonymous access needs a username and password and lets users upload and manage files. An FTP client program connects to an FTP server to list, upload and download files.
- SSH for remote management: an administrator uses an SSH client to log in securely to a remote server and run commands, as if at its keyboard; everything, including the password, is encrypted. An SSH client can also open a TCP connection to another port on the remote machine and send application-level commands directly, such as an HTTP `GET`, SMTP commands (HELO, MAIL FROM, RCPT TO, DATA) to send an email, or POP3 commands (USER, PASS, LIST, RETR) to retrieve one.
- Email server: stores mailboxes; receives incoming email by SMTP from other servers; sends outgoing email by SMTP; lets users retrieve mail with POP3 or IMAP.
- Web server: stores web pages and resources and responds to HTTP(S) requests by sending them as text (HTML, CSS, JavaScript) or files (images); may generate pages dynamically.
- Web browser: requests a page, receives the HTML, then requests the other resources the page refers to (images, stylesheets, scripts), and renders (displays) the page, running any JavaScript.

## 4.9.4.3 IP address structure

*Refs: AQA 4.9.4.3.*

### What you need to know

- An IP address is split into a network identifier (which network the device is on: routers use this) and a host identifier (which device on that network).
- An IPv4 address is 32 bits, written as four denary numbers 0 to 255 separated by dots (dotted decimal): 192.168.10.75.

## 4.9.4.4 Subnet masking

*Refs: AQA 4.9.4.4.*

### What you need to know

- A network can be divided into smaller subnets (for example one per department), which reduces broadcast traffic, improves security and makes management easier.
- A subnet mask shows which bits of the IP address are the network (and subnet) identifier: 1s for network bits, 0s for host bits. It can be written in dotted decimal (255.255.255.0) or as a prefix length (/24: the first 24 bits are network).
- IP address AND subnet mask gives the network identifier. Two devices are on the same subnet if they have the same network identifier; otherwise traffic between them goes through a router.

### Worked example

IP address 192.168.10.75, mask 255.255.255.192 (/26).

- Last byte: 75 = 0100 1011; mask 1100 0000. AND: 0100 0000 = 64.
- Network identifier 192.168.10.64. Host part 00 1011 = 11.
- With 6 host bits: 2⁶ = 64 addresses per subnet, of which 62 are usable for hosts (the all-0s address is the network and all-1s is the broadcast address). This subnet runs from 192.168.10.64 to .127.
- Is 192.168.10.130 on the same subnet? 130 = 1000 0010 AND 1100 0000 = 1000 0000 = 128. Network 192.168.10.128: different, so a router is needed.

## 4.9.4.5 IP standards

*Refs: AQA 4.9.4.5.*

### What you need to know

- IPv4: 32-bit addresses: about 4.3 billion (2³²). Not enough for every device in the world.
- IPv6: 128-bit addresses, written as eight groups of four hex digits separated by colons (2001:0db8:85a3:0000:0000:8a2e:0370:7334, shortened by dropping leading zeros and replacing one run of zero groups with ::). About 3.4 × 10³⁸ addresses.
- Why IPv6 was introduced: IPv4 addresses ran out because of the growth in internet users and connected devices (phones, Internet of Things). IPv6 also simplifies headers for faster routing, removes the need for NAT, and builds in support for security and auto-configuration.

## 4.9.4.6 Public and private IP addresses

*Refs: AQA 4.9.4.6.*

### What you need to know

- Public (routable) addresses are unique across the whole internet and can be reached from anywhere; they are allocated by registries through ISPs.
- Private (non-routable) addresses are reserved for use inside local networks and are not routed on the internet, so the same private addresses can be reused in millions of networks: 10.0.0.0 to 10.255.255.255, 172.16.0.0 to 172.31.255.255, 192.168.0.0 to 192.168.255.255. Devices with private addresses reach the internet through NAT.

## 4.9.4.7 Dynamic Host Configuration Protocol (DHCP)

*Refs: AQA 4.9.4.7 · Eduqas C2.1: Networking.*

### What you need to know

- DHCP automatically assigns an IP address (and the subnet mask, default gateway and DNS server addresses) to a device when it joins a network, for a limited time (a lease).
- Process (DORA): the new device broadcasts a DHCP Discover; the DHCP server replies with an Offer of an address; the device sends a Request for it; the server sends an Acknowledgement. When the lease ends, the address returns to the pool unless renewed.
- Benefits: no manual configuration; no duplicate addresses; addresses are reused efficiently as devices come and go. Servers and printers often have fixed (static) addresses instead.

## 4.9.4.8 Network Address Translation (NAT)

*Refs: AQA 4.9.4.8.*

### What you need to know

- NAT lets many devices with private IP addresses share one public IP address. The router replaces each outgoing packet's private source address (and port) with its own public address (and a port it chooses), and records the mapping in a translation table. Replies arriving at that public address and port are translated back and sent to the right private device.
- Why it is used: it saves scarce IPv4 public addresses; it hides the internal network structure (outside devices cannot start connections to internal ones directly), adding some security.

## 4.9.4.9 Port forwarding

*Refs: AQA 4.9.4.9.*

### What you need to know

- Because NAT blocks unsolicited incoming connections, a server inside a private network (a game server, home web server or security camera) cannot normally be reached from outside.
- Port forwarding sets a rule on the router: incoming traffic on a given public port is forwarded to a specific private IP address and port. For example, traffic to the router's public address on port 8080 is sent to 192.168.1.20 port 80.
- It allows outside clients to reach the service, but opens a route through the router, so the service must be kept secure.

## 4.9.4.10 Client server model

*Refs: AQA 4.9.4.10 · OCR 1.3.3(d).*

### What you need to know

- In the client-server model, the client sends a request message to the server; the server processes it and replies with a response message. The server waits for requests from many clients.
- WebSocket: a protocol that sets up a persistent, full-duplex connection between a web browser and a server over TCP (starting as an HTTP request that is "upgraded"). Either side can send data at any time without a new request, with low overhead. Used where data must flow instantly both ways: chat apps, live sports scores, multiplayer browser games, collaborative editing, live dashboards and stock tickers. (Plain HTTP is request-response: the server cannot send unless asked, so polling would be needed.)
- Web CRUD applications and REST:
  - CRUD = Create, Retrieve (read), Update, Delete: the four basic operations on stored data.
  - REST (Representational State Transfer) is a style of API that uses HTTP request methods on resources identified by URLs. A REST API runs on the server; JavaScript in the browser (referenced by the HTML page) calls the API over HTTP, and the server talks to the database.
  - Mapping: HTTP GET → SQL SELECT (retrieve); POST → INSERT (create); PUT → UPDATE; DELETE → DELETE.
  - Data is sent between server and web app as JSON or XML.

### Worked example

A REST API for a library:

| HTTP request | Meaning | SQL on the server |
| --- | --- | --- |
| GET /books/42 | Retrieve book 42 | SELECT * FROM Book WHERE BookID = 42 |
| POST /books (data in body) | Create a new book | INSERT INTO Book … |
| PUT /books/42 (data in body) | Update book 42 | UPDATE Book SET … WHERE BookID = 42 |
| DELETE /books/42 | Delete book 42 | DELETE FROM Book WHERE BookID = 42 |

The same book in JSON and XML:

```json
{"id": 42, "title": "Dune", "author": "Herbert", "available": true}
```

```xml
<book>
  <id>42</id>
  <title>Dune</title>
  <author>Herbert</author>
  <available>true</available>
</book>
```

- JSON compared with XML: easier for a human to read; more compact (no closing tags), so less data to send; easier to create; easier and so quicker for computers to parse (it maps directly onto JavaScript objects). XML is more verbose but supports schemas for validation, attributes and namespaces.

```python
import json
book = json.loads('{"id": 42, "title": "Dune", "available": true}')
print(book["title"])     # Dune
```

## 4.9.4.11 Thin- versus thick-client computing

*Refs: AQA 4.9.4.11.*

### What you need to know

| | Thin client | Thick (fat) client |
| --- | --- | --- |
| Where processing happens | Mostly on the server; the client mainly displays and sends input | Mostly on the client, which has its own processing and storage |
| Client hardware | Cheap, low-power | Powerful, more expensive |
| Management | Central: software installed, updated and backed up once on the server; easier security | Each machine needs installing, updating and securing |
| Network | Depends heavily on the network and server; fails if they fail; heavy traffic | Can work offline; less traffic |
| Server | Needs powerful servers | Server load is lighter |
| Examples | Web apps, cloud desktops, school terminals | Desktop games, video editing, CAD workstations |

## Common mistakes

- Putting routing in the transport layer. Routing uses IP at the network layer.
- Saying MAC addresses are used to deliver packets across the internet. They are used only hop by hop on each local link.
- Saying NAT gives each device a public address. NAT shares one public address among many devices.
- Mapping POST to UPDATE. POST creates (INSERT); PUT updates.

## Check questions

1. Describe the role of each of the four layers of the TCP/IP stack. [4 marks]
2. Give two advantages of layering network protocols. [2 marks]
3. Explain what a socket is and why client ports are needed. [3 marks]
4. Explain the difference between a MAC address and an IP address, and when each is used. [3 marks]
5. Explain why UDP rather than TCP is used for live video calls. [2 marks]
6. Explain the difference between POP3 and IMAP. [2 marks]
7. Describe how SSH could be used by an administrator to manage a remote server. [2 marks]
8. A device has IP address 172.16.45.200 with mask 255.255.240.0. Work out the network identifier. [3 marks]
9. Give two reasons why IPv6 was introduced. [2 marks]
10. Explain how NAT allows a household of devices to share one public IP address. [3 marks]
11. Explain why port forwarding would be needed to host a game server at home. [2 marks]
12. Describe the DHCP process when a laptop joins a network. [3 marks]
13. Explain what WebSocket provides and give a suitable use. [3 marks]
14. A web app allows users to add, view, change and remove reviews. Map each action to an HTTP method and SQL command. [4 marks]
15. Give three reasons JSON is often preferred to XML. [3 marks]
16. A school is choosing between thin clients and thick clients for 200 computers. Discuss. [4 marks]

## Mark scheme

1. Application: protocols used by programs to format/exchange data, e.g. HTTP (1). Transport: splits data into segments with port numbers; TCP ensures reliable, ordered delivery (1). Network: adds IP addresses and routes packets across networks (1). Link: transmits frames over the physical network using MAC addresses (1).
2. Any two: layers developed/changed independently (1); easier to find faults (1); standards let different makers' equipment interoperate (1).
3. An endpoint made of an IP address and a port number (1). Client ports are temporary ports assigned by the client's OS (1) so that responses reach the right program and several connections can be open at once (1).
4. MAC is a fixed hardware address of a network interface; IP is a logical address assigned by the network (1). MAC is used to deliver frames on the local link/each hop (1); IP is used to route packets end to end across networks (1).
5. UDP has no acknowledgement/retransmission, so lower latency (1); a few lost packets matter less than delay in live video (1).
6. POP3 downloads email to one device and usually deletes it from the server (1); IMAP keeps email on the server and synchronises across devices (1).
7. SSH client makes an encrypted connection to the server (1); administrator logs in and runs commands remotely as if local (1).
8. Third byte: 45 = 0010 1101 AND 240 = 1111 0000 → 0010 0000 = 32 (1); fourth byte AND 0 = 0 (1); network 172.16.32.0 (1).
9. Any two: IPv4 addresses ran out (1); growth of devices/IoT needs many more addresses (1); removes need for NAT/simplified headers/built-in security (1).
10. Devices use private addresses inside the home (1); the router replaces the private source address/port with its public address and a port, recording the mapping (1); replies are translated back using the table to the correct device (1).
11. NAT blocks incoming connections not started from inside (1); port forwarding tells the router to send traffic on the game's port to the server's private IP address (1).
12. Laptop broadcasts a discover message (1); DHCP server offers an IP address/settings (1); laptop requests it and server acknowledges, leasing it for a time (1).
13. A persistent, full-duplex connection between browser and server over TCP (1); either side can send at any time without new requests, low overhead (1); use: chat/live scores/online game/collaborative editor (1).
14. Add: POST → INSERT (1). View: GET → SELECT (1). Change: PUT → UPDATE (1). Remove: DELETE → DELETE (1).
15. Any three: easier for humans to read (1); more compact (1); easier to create (1); quicker/easier for computers to parse (1).
16. Thin: cheaper clients, central management/updates/security, but needs powerful servers and network; single point of failure (2). Thick: works offline, less network load, suits demanding software, but more costly and harder to manage (1). Justified recommendation (1).
