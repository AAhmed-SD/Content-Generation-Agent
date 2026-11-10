---
level: A-level
subject: Computer Science
topic: "Communication methods, transmission basics, topologies, client-server and peer-to-peer, network hardware and wireless networking"
as_content: "AQA 4.9.1 and 4.9.2 are also AS (7516 3.9). OCR: characteristics of networks, LANs and WANs, and client-server and peer-to-peer are also AS; network hardware (1.3.3(c)) is A-level only."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.9.1.1", "4.9.1.2", "4.9.2.1", "4.9.2.2", "4.9.2.3"]
  - board: OCR
    code: "H446"
    spec_refs: ["1.3.3(a)", "1.3.3(c)", "1.3.3(d)"]
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C2.1: Networking", "C2.2: Data transmission", "C2.2: Communication networks"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# Communication and networking

This file covers serial and parallel transmission, synchronous and asynchronous transmission with start and stop bits, simplex and duplex, baud rate, bit rate, bandwidth, latency and protocols, data transfer calculations, multiplexing and switching, LANs and WANs, star and bus topologies (physical and logical), peer-to-peer and client-server networks, network hardware, Wi-Fi, its security, CSMA/CA with RTS/CTS, collisions and CSMA/CD, and handshaking. The internet, packet switching and security are in [28-the-internet-and-internet-security.md](28-the-internet-and-internet-security.md); TCP/IP and addressing in [29-tcp-ip-addressing-and-client-server.md](29-tcp-ip-addressing-and-client-server.md).

Builds on [GCSE: Networks](../../gcse/computer-science/15-networks.md) and [GCSE: Protocols and layers](../../gcse/computer-science/16-protocols-and-layers.md).

### Board differences

| Content | AQA 7517 | OCR H446 | Eduqas A500QS |
| --- | --- | --- | --- |
| Transmission | Serial vs parallel; synchronous vs asynchronous; start and stop bits | Not named | Serial vs parallel; simplex, half and full duplex; multiplexing and switching |
| Basics | Baud rate, bit rate, bandwidth, latency, protocol | Protocols and standards | Networking standards; calculate data transfer rates |
| Topology | Physical star and logical bus | LANs and WANs | Not named |
| Hosts | Peer-to-peer and client-server | Client-server and peer-to-peer | Not named |
| Hardware | Wireless adapter, access point | Network hardware (1.3.3(c)) | Wireless hardware; portable devices |
| Wireless | Wi-Fi, security, CSMA/CA and RTS/CTS, SSID | Not named | Wireless protocols; handshaking |
| Collisions | CSMA/CD not required | Not named | Collision, detection and how it is dealt with |

## 4.9.1.1 Communication methods

*Refs: AQA 4.9.1.1 · Eduqas C2.2: Data transmission.*

### What you need to know

- Serial transmission: bits are sent one after another along a single wire (or channel).
- Parallel transmission: several bits (for example 8) are sent at the same time along several parallel wires.
- Advantages of serial over parallel (why serial is now used even inside computers: USB, SATA, PCI Express):
  - no skew: in parallel, bits on different wires arrive at slightly different times over longer distances, so the receiver must wait, limiting speed and distance;
  - less crosstalk (interference between neighbouring wires), so higher frequencies can be used;
  - fewer wires: cheaper cables and connectors, works over long distances;
  - so in practice serial links can run faster.
  Parallel is still used over very short distances (for example inside chips).
- Synchronous transmission: sender and receiver share a clock signal (or keep their clocks in step), and data is sent as a continuous stream in blocks, timed by the clock. Efficient for large amounts of data.
- Asynchronous transmission: no shared clock; data is sent one character (byte) at a time, whenever ready. Each character is framed:
  - a start bit tells the receiver a character is coming and lets it synchronise its clock to read the bits that follow;
  - a stop bit (or bits) marks the end and gives the receiver time to get ready for the next start bit.
  Simple and cheap, good for irregular data (a keyboard), but the extra bits waste bandwidth (for example 10 bits sent for 8 data bits).
- Eduqas: simplex (one direction only: a TV broadcast, sensor to computer); half duplex (both directions but one at a time: walkie-talkie); full duplex (both directions at once: phone call, most network links).

## 4.9.1.2 Communication basics

*Refs: AQA 4.9.1.2 · OCR 1.3.3(a) · Eduqas C2.1: Networking, C2.2: Communication networks.*

### What you need to know

- Baud rate: the number of signal changes (symbols) per second on the line.
- Bit rate: the number of bits transmitted per second (bps). If each signal change can represent more than one bit (for example 4 voltage levels give 2 bits per symbol), bit rate = baud rate × bits per symbol, so the bit rate can be higher than the baud rate.
- Bandwidth: the range of frequencies a channel can carry (in Hz). Bit rate is directly proportional to bandwidth: a higher bandwidth channel can carry more bits per second. (In everyday use "bandwidth" often means the maximum bit rate.)
- Latency: the time delay between data being sent and arriving (caused by distance, the number of devices it passes through, and processing). Matters for gaming, video calls and trading.
- Protocol: an agreed set of rules for communication between devices, covering format of data, timing, error checking, addressing and how to start and end a connection. Standards (Eduqas, OCR) are protocols and hardware specifications agreed by bodies such as the IEEE and IETF, so equipment from different makers works together.
- Data transfer time (Eduqas) = file size in bits ÷ bit rate (bits per second). Remember 1 byte = 8 bits and check the prefixes.

### Worked example

A line has a baud rate of 2,400 and each symbol encodes 4 bits: bit rate = 9,600 bps.

Time to send a 15 MB file on a 40 Mbps link: 15 × 10⁶ × 8 = 120 × 10⁶ bits; 120 × 10⁶ ÷ 40 × 10⁶ = 3 s. With asynchronous framing of 1 start and 1 stop bit per byte, 10 bits are sent per byte, so 150 × 10⁶ bits: 3.75 s.

## Multiplexing and switching

*Refs: Eduqas C2.2: Data transmission.*

### What you need to know

- Multiplexing combines several signals so they share one channel (one cable or radio band), which is cheaper than a separate link for each. Time-division multiplexing gives each signal a time slot in turn; frequency-division multiplexing gives each a different frequency band (as in broadband over phone lines, or radio). A demultiplexer separates them at the other end.
- Switching decides how data is routed through a network: circuit switching sets up a dedicated path for the whole communication (traditional phone calls); packet switching splits data into packets that are routed independently (the internet). Both are compared in file 28.

## 4.9.2.1 Network topology

*Refs: AQA 4.9.2.1 · OCR 1.3.3(a).*

### What you need to know

- A LAN (local area network) covers a small area such as a building or site; the organisation owns the equipment. A WAN (wide area network) covers a large geographical area, often using communication links leased from telecoms companies; the internet is the largest WAN.
- Physical topology: how the devices are actually wired. Logical topology: how data actually flows between them.
- Physical star: each device has its own cable to a central switch (or hub).
  - Operation: with a switch, a frame goes only to the device it is addressed to (using MAC addresses).
  - Advantages: a cable fault only affects one device; easy to add devices; good performance as each link is separate; secure as data goes only to its recipient. Disadvantages: more cable; if the central switch fails, the whole network fails.
- Logical bus: all devices share one communication channel, so a transmission reaches every device and each one checks whether it is the recipient. Only one device can transmit at a time, and collisions can happen.
- A network physically wired as a star can behave logically as a bus if the centre is a hub (or the protocol broadcasts every frame to all ports), as early Ethernet did.

## 4.9.2.2 Types of networking between hosts

*Refs: AQA 4.9.2.2 · OCR 1.3.3(d).*

### What you need to know

- Peer-to-peer (P2P): every computer has equal status and can act as both client and server, sharing its own resources directly with others.
  - Advantages: cheap (no dedicated server), easy to set up, no single point of failure; for file sharing, load is spread across many peers.
  - Disadvantages: no central management, backup or security; files scattered; performance depends on peers being online.
  - Uses: small home or office networks; file sharing (BitTorrent); some video calling and blockchain systems.
- Client-server: one or more computers are servers that provide services (files, email, web pages, printing, databases, authentication); the rest are clients that request services.
  - Advantages: central control of security, user accounts, backups and updates; files in one place; scales to large organisations.
  - Disadvantages: servers are expensive and need specialist staff; if a server fails, its service is lost (single point of failure unless duplicated).
  - Uses: schools, businesses, websites, online games.

## Network hardware

*Refs: OCR 1.3.3(c) · Eduqas C2.1: Networking.*

### What you need to know

- Network interface card (NIC) or network adapter: connects a device to the network; has a unique MAC address. A wireless network adapter does this by radio.
- Switch: connects devices on a LAN; learns which MAC address is on which port and forwards each frame only to the right port.
- Hub (older): forwards every frame to all ports (creating a logical bus).
- Router: connects different networks (for example a LAN to the internet) and forwards packets between them using IP addresses.
- Wireless access point (WAP): lets wireless devices join a wired network. Home "routers" usually combine a router, switch, WAP and modem.
- Modem: converts digital data to signals for a phone or cable line and back.
- Transmission media: copper (twisted pair Ethernet), fibre optic (very fast, long distance, immune to electrical interference, expensive), and wireless (radio).

## 4.9.2.3 Wireless networking

*Refs: AQA 4.9.2.3 · Eduqas C2.1: Networking.*

### What you need to know

- Wi-Fi is a wireless local area network technology based on international standards (IEEE 802.11). Its purpose: let devices connect to a network without cables, so they can move around.
- Components: a wireless network adapter in each device, and a wireless access point connected to the wired network.
- SSID (Service Set Identifier): the name of a wireless network, broadcast so devices can find and choose it (it also identifies which network each frame belongs to).
- Securing a wireless network:
  - strong encryption of transmitted data using WPA2 or WPA3 (Wi-Fi Protected Access) with a strong passphrase;
  - disabling SSID broadcast (hides the network from casual scanning, though it can still be found with tools);
  - a MAC address allow list (only listed devices may connect, though MAC addresses can be faked).
- CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance): wireless devices cannot detect a collision while transmitting, so they try to avoid one:
  1. Listen to check the channel is idle (carrier sense).
  2. If it is busy, wait a random back-off time, then listen again.
  3. If it is idle, transmit the frame.
  4. Wait for an acknowledgement (ACK) from the receiver. If none arrives, assume a collision happened and try again after a random wait.
- RTS/CTS (Request to Send / Clear to Send), an optional addition: before sending, the device sends a short RTS frame to the access point; the access point replies with CTS, which all devices in range hear, so they stay quiet for the stated time. This solves the hidden node problem: two devices that are both in range of the access point but out of range of each other cannot hear each other's transmissions, so carrier sense alone would not stop them colliding.
- Eduqas: portable devices (laptops, phones, tablets, sensors) need networks for internet access, email, cloud storage, synchronisation, location services, and updates. Contemporary wireless technologies include Wi-Fi, Bluetooth (short range, personal area networks), mobile data (4G and 5G), NFC (very short range: contactless payment) and satellite.

## Collisions and handshaking

*Refs: Eduqas C2.1: Networking, C2.2: Communication networks.*

### What you need to know

- A collision happens when two devices on a shared channel transmit at the same time and their signals interfere, so both frames are corrupted.
- CSMA/CD (Collision Detection), used on wired shared Ethernet: listen before sending; while sending, keep listening; if a collision is detected, stop, send a jam signal so all devices know, then each waits a random back-off time before trying again (random times make a second collision less likely). (AQA does not require CSMA/CD.) Switched full-duplex Ethernet has no collisions because each link is separate.
- Handshaking: an exchange of signals between two devices before (and during) communication to agree they are ready and to set the rules: speed, protocol, error checking. Example: TCP's three-way handshake (SYN, SYN-ACK, ACK) sets up a connection (file 29); a printer signals "ready" or "busy" to the computer.

## Common mistakes

- Saying parallel is always faster because "more bits at once". Skew and crosstalk limit parallel links over distance.
- Mixing up baud rate and bit rate.
- Saying disabling SSID broadcast or MAC filtering makes a network secure. Encryption is the essential protection; the others only deter casual users.
- Saying CSMA/CA detects collisions. It avoids them, and infers a collision when no acknowledgement arrives.

## Check questions

1. Give two reasons why serial transmission is used for long-distance links instead of parallel. [2 marks]
2. Explain the purpose of start and stop bits in asynchronous transmission. [2 marks]
3. Compare synchronous and asynchronous transmission. [3 marks]
4. A modem uses 8 signal levels at 1,200 baud. Calculate its bit rate. [2 marks]
5. Define latency and bandwidth, and state the relationship between bandwidth and bit rate. [3 marks]
6. (Eduqas) Calculate the time to transfer a 600 MB file over a 100 Mbps connection. [2 marks]
7. Explain how a network can be a physical star but a logical bus. [2 marks]
8. A small dental surgery has five computers. Recommend peer-to-peer or client-server, with reasons. [3 marks]
9. Describe three ways of securing a Wi-Fi network. [3 marks]
10. Describe how CSMA/CA with RTS/CTS works and the problem RTS/CTS solves. [5 marks]
11. (Eduqas) Explain what a network collision is and how CSMA/CD deals with it. [4 marks]
12. (Eduqas) Explain the difference between half duplex and full duplex, with an example of each. [2 marks]
13. (OCR) State the function of a switch and a router. [2 marks]

## Mark scheme

1. Any two: no skew between wires (1); less crosstalk/interference (1); fewer wires so cheaper (1); can run at higher frequency/faster (1).
2. Start bit signals the start of a character and lets the receiver synchronise its clock (1); stop bit marks the end and gives time before the next character (1).
3. Synchronous uses a shared clock/timing signal and asynchronous does not (1); synchronous sends continuous blocks, asynchronous sends one character at a time with start/stop bits (1); synchronous is more efficient for large data, asynchronous suits irregular data/is simpler (1).
4. 8 levels = 3 bits per symbol (1); 3 × 1,200 = 3,600 bps (1).
5. Latency: delay between sending and receiving (1). Bandwidth: range of frequencies the channel can carry (1). Bit rate is directly proportional to bandwidth (1).
6. 600 × 8 = 4,800 Mb (1); 4,800 ÷ 100 = 48 s (1).
7. Each device is wired to a central hub/switch (physical star) (1); but the hub/protocol sends every transmission to all devices, which share one channel (logical bus) (1).
8. Peer-to-peer may suit the small size and cost (1); but client-server is better for patient records: central security, access control, backups and data protection compliance (1); justified recommendation (1).
9. WPA2/WPA3 encryption with a strong key (1); disable SSID broadcast (1); MAC address allow list (1).
10. Device listens for an idle channel; if busy, waits a random time (1). Sends RTS to the access point (1); AP replies with CTS, heard by all devices, which stay quiet (1); device sends data and waits for ACK; no ACK means retransmit after random back-off (1). Solves the hidden node problem where devices cannot hear each other but can both reach the AP (1).
11. Two devices transmit on a shared medium at the same time and the signals corrupt each other (1). Devices listen before sending and while sending (1); on detecting a collision, stop and send a jam signal (1); wait a random back-off time and retry (1).
12. Half duplex: both directions but only one at a time, e.g. walkie-talkie (1). Full duplex: both directions at once, e.g. telephone call (1).
13. Switch forwards frames within a LAN only to the destination device using MAC addresses (1); router forwards packets between networks using IP addresses (1).
