---
level: GCSE
subject: Computer Science
topic: "Protocols, standards and layers"
tiers: Not tiered
boards:
  - board: AQA
    code: "8525"
    spec_refs: ["3.5"]
  - board: OCR
    code: "J277"
    spec_refs: ["1.3.2"]
  - board: Edexcel
    code: "1CP2"
    spec_refs: ["4.1.6", "4.1.7"]
  - board: Eduqas
    code: "C500QS"
    spec_refs: ["3: Networks"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification
  OCR: https://www.ocr.org.uk/qualifications/gcse/computer-science-j277-from-2020/
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/computer-science-2020.html
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-gcse/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/
---

# Protocols, standards and layers

This file covers what standards and protocols are, the common network and email protocols (TCP, IP, UDP, HTTP, HTTPS, FTP, SMTP, POP, IMAP, Ethernet, Wi-Fi, Bluetooth), why protocols are organised in layers, the 4-layer TCP/IP model, the 7-layer OSI model (Eduqas), and packets and packet switching (Eduqas).

## Overview

Devices made by different companies can only talk to each other if they follow the same rules. Standards and protocols are those rules; layers split the job of communicating into separate parts.

### Board differences

- AQA 8525: 3.5 (Paper 2). Define a protocol; purpose of TCP, IP, HTTP, HTTPS, SMTP and IMAP; the 4-layer TCP/IP model (application, transport, internet, link), with HTTP, HTTPS, SMTP and IMAP at the application layer, TCP at transport, IP at internet, and what each layer does. The 2020 specification also had Ethernet, Wi-Fi, UDP and FTP (FTP at the application layer, UDP at transport).
- OCR J277: 1.3.2 (J277/01). Standards; TCP/IP, HTTP, HTTPS, FTP, POP, IMAP, SMTP; the concept of layers and their benefits. OCR does not require the names or functions of the individual TCP/IP layers, nor how Ethernet, Wi-Fi and Bluetooth work.
- Edexcel 1CP2: 4.1.6 and 4.1.7 (Paper 1). Ethernet, Wi-Fi, TCP/IP, HTTP, HTTPS, FTP; email protocols POP3, SMTP, IMAP; how the 4-layer TCP/IP model handles data transmission.
- Eduqas C500QS: 3 Networks (Component 1). The importance of standards; the purpose of each layer of the 7-layer OSI model; HTTP, HTTPS, SMTP, FTP, TCP, IP, Ethernet and Wi-Fi (802.11) placed in the OSI model; the contents of a TCP/IP packet; packet switching.

## Standards and protocols

*Refs: AQA 3.5 · OCR 1.3.2 · Edexcel 4.1.6 · Eduqas 3: Networks.*

### What you need to know

- A standard is an agreed set of rules for an area of computing (for example, the size of a USB plug, the format of a JPEG file, Wi-Fi radio frequencies). Standards let hardware and software from different manufacturers work together, give buyers choice, and let developers build products that will work with others.
- A protocol is a set of rules for how data is transmitted between devices: for example the format of messages, how devices are addressed, how errors are detected, and how the start and end of a transmission are signalled.

## Common protocols

*Refs: AQA 3.5 · OCR 1.3.2 · Edexcel 4.1.6 · Eduqas 3: Networks.*

### What you need to know

| Protocol | Purpose |
| --- | --- |
| TCP (Transmission Control Protocol) | Sets up a connection between sender and receiver; splits data into packets, numbers them, checks they all arrive without errors (receiver sends acknowledgements), asks for missing or damaged ones to be resent, and puts them back in order |
| IP (Internet Protocol) | Addresses packets with source and destination IP addresses and routes them across networks |
| UDP (User Datagram Protocol; AQA 2020) | Sends packets without setting up a connection or checking delivery; faster but unreliable; used for live streaming, online games and voice calls, where speed matters more than every packet |
| HTTP (Hypertext Transfer Protocol) | Requests and sends web pages between a browser (client) and web server |
| HTTPS (HTTP Secure) | HTTP with encryption, so data such as passwords and card details cannot be read if intercepted; also checks the server's identity with a certificate |
| FTP (File Transfer Protocol) | Transfers files between computers over a network, for example uploading a website to a server |
| SMTP (Simple Mail Transfer Protocol) | Sends email from a client to a mail server and between mail servers |
| POP / POP3 (Post Office Protocol) | Retrieves email from a server by downloading it to one device and (usually) deleting it from the server |
| IMAP (Internet Message Access Protocol) | Retrieves email but keeps it on the server, so the mailbox stays in sync across several devices |
| Ethernet | A family of protocols for wired LANs: how data is framed and sent over cables, using MAC addresses |
| Wi-Fi (IEEE 802.11) | A family of protocols for wireless LANs using radio waves. Wi-Fi is a trademark; the general term is WLAN |
| Bluetooth | Short-range, low-power wireless protocol for PANs |

TCP/IP is often named as one, because TCP and IP work together for most internet traffic.

### Worked example

A user writes an email on a phone, sends it, and later reads replies on both a laptop and a phone. Name the protocols involved.

1. Sending: SMTP (phone to mail server, and server to server).
2. Reading on two devices: IMAP, because the messages stay on the server so both devices show the same mailbox. POP would download them to one device and remove them from the server.

### Common mistakes

- Saying SMTP is used to receive email.
- Saying HTTPS "makes the website secure". It encrypts data in transit; the site itself can still be malicious.

## Layers and the 4-layer TCP/IP model

*Refs: AQA 3.5 · OCR 1.3.2 · Edexcel 4.1.7.*

### What you need to know

- Protocols are grouped into layers. Each layer has a specific job, uses services of the layer below and provides services to the layer above.
- Benefits of layers: the problem is split into smaller, manageable parts; each layer can be developed and changed independently, as long as it keeps the same interface to the layers around it; different manufacturers can make products for one layer that work with others; it is easier to find and fix faults.
- The 4-layer TCP/IP model, top to bottom:

| Layer | What it does | Protocols |
| --- | --- | --- |
| Application | Where network applications (web browsers, email clients) work; provides services to the user's software and formats data for the application | HTTP, HTTPS, FTP, SMTP, IMAP, POP |
| Transport | Sets up communication between the two hosts; agrees settings such as packet size; splits data into packets, numbers them, checks delivery and reassembles them | TCP, UDP |
| Internet (network) | Adds source and destination IP addresses and routes packets across networks | IP |
| Link | The network hardware (NIC) and device drivers; sends data across the physical network, using MAC addresses | Ethernet, Wi-Fi |

- How data is sent: on the sending device, data passes down the layers and each adds its own header information. It travels across the network. On the receiving device it passes up the layers, and each removes its header, until the application gets the data.

### Worked example

A browser requests a web page. Describe what each layer does on the sending computer.

1. Application: the browser forms an HTTP (or HTTPS) request for the page.
2. Transport: TCP sets up a connection with the server, splits the request into packets and numbers them.
3. Internet: IP adds the source and destination IP addresses to each packet.
4. Link: the NIC and driver send the packets as frames over Ethernet or Wi-Fi to the router, using MAC addresses for the local hop.

### Common mistakes

- Putting TCP at the internet layer or IP at the transport layer.
- (OCR) Spending time on layer names when the question asks for the benefits of layers.

## The OSI model (Eduqas)

*Refs: Eduqas 3: Networks.*

### What you need to know

The 7-layer Open Systems Interconnection model, from layer 7 (top) to layer 1 (bottom):

| Layer | Purpose | Protocols placed here |
| --- | --- | --- |
| 7 Application | Network services for applications the user runs | HTTP, HTTPS, SMTP, FTP |
| 6 Presentation | Translates data into a common format; encryption and compression | (HTTPS encryption is often placed here) |
| 5 Session | Opens, manages and closes sessions (conversations) between devices | |
| 4 Transport | End-to-end delivery: splitting into segments/packets, sequencing, error checking and resending | TCP |
| 3 Network | Logical addressing and routing between networks | IP |
| 2 Data link | Frames data, uses MAC addresses, detects errors on a single link | Ethernet, Wi-Fi (802.11) |
| 1 Physical | Sends raw bits as electrical, light or radio signals over the medium | Ethernet and Wi-Fi physical standards (cables, radio) |

- The TCP/IP model's application layer covers OSI layers 5 to 7; its link layer covers OSI layers 1 and 2.
- A memory aid for 1 to 7: Please Do Not Throw Sausage Pizza Away.

## Packets and packet switching (Eduqas)

*Refs: Eduqas 3: Networks.*

### What you need to know

- Data sent over the internet is split into packets (small chunks).
- Typical contents of a TCP/IP packet:
  - Header: source IP address, destination IP address, packet (sequence) number, total number of packets, protocol, time to live (hop limit, so lost packets are eventually discarded), and port numbers.
  - Payload (body): the actual data, a part of the file or message.
  - Trailer/footer: an error-checking value (such as a checksum) and a marker for the end of the packet.
- Packet switching:
  1. The data is split into numbered packets.
  2. Each packet is sent separately and routers send each one by the best available route at that moment, so packets may take different routes.
  3. Packets may arrive out of order; the receiver uses the sequence numbers to reassemble them.
  4. The receiver checks each packet for errors and requests any missing or damaged packets again.
- Advantages: the network is used efficiently (many users share the links); routes avoid busy or broken links; only damaged packets need resending. Disadvantage: packets must be reassembled and can be delayed, which matters for live audio and video.

### Common mistakes

- Saying all packets "follow the same route".
- Leaving the sequence number out of the header: without it, packets cannot be put back in order.

## Check questions

1. Explain what is meant by a protocol. [1 mark]
2. Explain why standards are important in computing. [2 marks]
3. State the purpose of each protocol: (a) FTP, (b) SMTP, (c) IMAP. [3 marks]
4. Explain why an online shop uses HTTPS rather than HTTP. [2 marks]
5. Give two benefits of using layers in networking. [2 marks]
6. Name the four layers of the TCP/IP model in order from the top, and give one protocol that works at each of the top three. [4 marks]
7. Describe the job of the transport layer. [2 marks]
8. (Eduqas) List four items found in the header of a TCP/IP packet. [4 marks]
9. (Eduqas) Describe how packet switching sends a file across the internet. [4 marks]
10. (Eduqas) State the OSI layer at which IP operates. [1 mark]

## Mark scheme

1. A set of rules for transmitting data between devices (1).
2. Hardware/software from different manufacturers can work together (1); gives a common format so products are compatible / developers know the rules to follow (1).
3. (a) Transferring files between computers over a network (1). (b) Sending email / between mail servers (1). (c) Retrieving email while keeping it on the server, synced across devices (1).
4. HTTPS encrypts data sent between browser and server (1), so card details/passwords cannot be read if intercepted (1).
5. Any two: breaks the problem into manageable parts (1); layers can be changed independently without affecting others (1); manufacturers can make products for one layer that work with others (1); easier to find and fix faults (1).
6. Application, transport, internet, link in order (1). One protocol each: application e.g. HTTP (1); transport TCP or UDP (1); internet IP (1).
7. Sets up communication between the two devices / agrees settings such as packet size (1); splits data into numbered packets and checks they arrive / reorders them (1).
8. Any four: source IP address; destination IP address; packet/sequence number; total number of packets; protocol; time to live; port numbers (4).
9. Data split into numbered packets (1); each packet sent independently and may take a different route chosen by routers (1); packets reassembled in order at the destination using sequence numbers (1); missing or corrupted packets requested again (1).
10. Network layer (layer 3) (1).
