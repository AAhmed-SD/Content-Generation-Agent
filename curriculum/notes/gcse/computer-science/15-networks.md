---
level: GCSE
subject: Computer Science
topic: "Networks, the internet and topologies"
tiers: Not tiered
boards:
  - board: AQA
    code: "8525"
    spec_refs: ["3.5"]
  - board: OCR
    code: "J277"
    spec_refs: ["1.3.1", "1.3.2"]
  - board: Edexcel
    code: "1CP2"
    spec_refs: ["4.1.1", "4.1.2", "4.1.3", "4.1.4", "4.1.5", "4.1.8"]
  - board: Eduqas
    code: "C500QS"
    spec_refs: ["3: Networks", "3: Internet"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification
  OCR: https://www.ocr.org.uk/qualifications/gcse/computer-science-j277-from-2020/
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/computer-science-2020.html
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-gcse/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/
---

# Networks, the internet and topologies

This file covers what a network is and why computers are networked, PANs, LANs and WANs, client-server and peer-to-peer networks, network hardware, wired and wireless connections, factors affecting performance and transmission time calculations, topologies, the structure of the internet (IP and MAC addresses, routers, routing costs), DNS, URLs and web browsers, hosting, and the cloud.

## Overview

A network is two or more computers or devices connected so they can share data and resources. The internet is a network of networks. Protocols and layers are in [16-protocols-and-layers.md](16-protocols-and-layers.md); network security is in [17-cyber-security.md](17-cyber-security.md).

### Board differences

- AQA 8525: 3.5 (Paper 2). Definition, advantages and disadvantages; PAN (Bluetooth only), LAN, WAN (the internet is the largest); wired (copper and fibre) vs wireless. The 2020 specification (exams to 2026) also had star and bus topologies; the 2025 specification does not list topologies or network hardware.
- OCR J277: 1.3.1 and 1.3.2 (J277/01). LAN and WAN; performance factors; client-server and peer-to-peer; hardware (WAP, router, switch, NIC, transmission media); the internet, DNS, hosting, the cloud, web servers and clients; star and mesh; Ethernet, Wi-Fi and Bluetooth connections; IP addressing (IPv4 and IPv6 format) and MAC addressing. Static/dynamic and public/private IP addresses are not required.
- Edexcel 1CP2: 4.1.1 to 4.1.5 and 4.1.8 (Paper 1). Why network; LAN and WAN; internet structure (IP addressing, routers); wired vs wireless by speed, range, latency, bandwidth; network speeds in bits per second and transmission time expressions; bus, star and mesh topologies.
- Eduqas C500QS: section 3 (Component 1). Characteristics of networks; star and mesh compared with ring and bus; routers, hubs, switches, bridges, WAPs and NICs; routing traffic and calculating routing costs; DNS; URL structure and the web browser.

## What networks are for

*Refs: AQA 3.5 · Edexcel 4.1.1 · Eduqas 3: Networks.*

### What you need to know

- A computer network is two or more computers connected together so they can communicate and share resources.
- Advantages: share files and data; share hardware such as printers; share an internet connection; communicate (email, messaging); central backup and security; software can be installed and updated centrally; users can log on from any computer.
- Disadvantages: cost of hardware and setup; may need a network manager; malware and hackers can spread across the network; if a key device (server, switch) fails, many users are affected; performance can drop with heavy traffic.

## Types of network: PAN, LAN, WAN

*Refs: AQA 3.5 · OCR 1.3.1 · Edexcel 4.1.2.*

### What you need to know

- PAN (personal area network; AQA): devices around one person, a few metres apart, usually connected by Bluetooth (for example, phone, earbuds and smartwatch).
- LAN (local area network): covers a small geographical area such as a home, school or office building. Its hardware is usually owned and managed by one person or organisation.
- WAN (wide area network): covers a large geographical area, connecting LANs in different places. Infrastructure is often owned by many organisations or leased from telecoms companies (collective or distributed ownership). The internet is the largest WAN.

### Common mistakes

- Defining a LAN only as "a small network". Mention the small area and single ownership.

## Client-server and peer-to-peer

*Refs: OCR 1.3.1.*

### What you need to know

- Client-server: a central server provides services (files, web pages, email, logins, printing) and clients request and use them. Advantages: central backup, security and updates; files in one place. Disadvantages: server is expensive and needs expert management; if the server fails, clients lose the service; the server can become a bottleneck.
- Peer-to-peer: all computers have equal status and share resources directly with each other, with no central server. Advantages: cheap and easy to set up; no single point of failure. Disadvantages: no central backup or security; files can be spread around and duplicated; a peer's files are unavailable if it is switched off; performance drops if a peer is busy serving others.

## Network hardware

*Refs: OCR 1.3.1 · Eduqas 3: Networks.*

### What you need to know

- NIC (network interface card/controller): connects a device to a network (wired or wireless). It has a unique MAC address.
- Switch: connects devices on a LAN. It learns the MAC address of each connected device and sends each frame only to the device it is addressed to, reducing unnecessary traffic.
- Hub (Eduqas): connects devices on a LAN but sends every frame to every device. Simpler and cheaper than a switch, but creates more traffic and collisions; now rare.
- Router: connects different networks together (for example a LAN to the internet) and forwards data packets between them using IP addresses, choosing a route.
- Wireless access point (WAP): lets wireless devices connect to a wired network using Wi-Fi.
- Bridge (Eduqas): connects two LAN segments (often using the same protocol) so they act as one network, filtering traffic between them.
- Transmission media (OCR): the cables or wireless signals that carry data: copper (twisted pair Ethernet), fibre optic, radio waves.
- A home "router" is usually a router, switch, WAP and modem in one box.

### Common mistakes

- Saying a switch connects a LAN to the internet. That is the router.
- Confusing a hub and a switch: a hub broadcasts to all; a switch sends to one.

## Wired and wireless connections

*Refs: AQA 3.5 · OCR 1.3.2 · Edexcel 4.1.4.*

### What you need to know

- Wired: Ethernet using copper cable (twisted pair) or fibre optic cable.
  - Copper: cheap, easy to install; slower than fibre over long distances; affected by interference.
  - Fibre optic: sends light; very high bandwidth over long distances; not affected by electrical interference; more expensive. Used for backbones and links between buildings.
- Wireless: Wi-Fi (radio waves, WLAN), Bluetooth (short range, low power, for PANs).
- Comparing them:

| | Wired | Wireless |
| --- | --- | --- |
| Speed and bandwidth | Higher, more consistent | Lower; shared between devices |
| Latency (delay) | Lower | Higher |
| Range | Limited by cable length but reliable | Limited by signal strength; walls and distance weaken it |
| Interference | Little (none for fibre) | Affected by walls, other devices and networks |
| Mobility | Fixed | Devices can move around |
| Security | Need physical access to the cable | Signals can be intercepted, so must be encrypted |
| Cost and setup | Cables cost and take time to install | Cheaper and easier to add devices |

### Worked example

Recommend connections for (a) a games console used for online competitive play next to the router, (b) tablets used by visitors in a café. Justify.

1. (a) Wired Ethernet: lower latency and a stable, high-bandwidth connection matter for real-time play, and the console does not move.
2. (b) Wi-Fi: visitors' devices have no Ethernet port and move around; no cables needed; speed needs are modest.

## Network performance and transmission time

*Refs: OCR 1.3.1 · Edexcel 4.1.4, 4.1.5.*

### What you need to know

- Bandwidth: the amount of data that can be sent in a given time, the maximum rate.
- Latency: the delay before data starts to arrive.
- Factors that affect performance: bandwidth; number of devices sharing the network (more traffic, more collisions); type of transmission media (fibre faster than copper); wired vs wireless; interference and distance from a WAP; the topology; how busy the server is.
- Network speeds are measured in bits per second: kilobit (kbps, 1000 bits per second), megabit (Mbps, 1 000 000), gigabit (Gbps).
- Time (s) = file size (bits) ÷ transmission rate (bits per second).

### Worked example

How long does a 120 MB file take to download at 40 Mbps?

1. File size in bits: 120 × 8 = 960 megabits.
2. Time = 960 ÷ 40 = 24 seconds.

(Edexcel, with the file size in mebibytes) 120 MiB at 40 Mbps:

1. Bits = 120 × 1024 × 1024 × 8 = 1 006 632 960.
2. Rate = 40 × 1 000 000 = 40 000 000 bits per second.
3. Time = 1 006 632 960 ÷ 40 000 000 ≈ 25.2 s. As an expression: (120 × 1024 × 1024 × 8) ÷ (40 × 1000 × 1000).

### Common mistakes

- Forgetting to multiply bytes by 8 to get bits.
- Confusing MB (megabytes) and Mb (megabits).

## Topologies

*Refs: OCR 1.3.1 · Edexcel 4.1.8 · Eduqas 3: Networks · AQA 3.5 (2020 specification).*

### What you need to know

- Star: every device connects to a central switch (or hub).
  - Advantages: a failed cable or device only affects that device; easy to add devices; fast, because the switch sends data only where it needs to go; few collisions.
  - Disadvantages: if the central switch fails, the whole network fails; lots of cable; switch cost.
- Mesh: devices connect to many or all other devices. Data can take several routes.
  - Full mesh: every device connected to every other. Partial mesh: some devices connected to several others.
  - Advantages: no single point of failure; if one link fails, data is rerouted; can carry lots of data at once.
  - Disadvantages: a lot of cabling (expensive) in wired form; complex to set up and manage. Wireless mesh (for example home Wi-Fi mesh systems) avoids the cabling.
- Bus (Edexcel, Eduqas, AQA 2020): all devices connect to one main cable (the backbone) with terminators at each end.
  - Advantages: cheap and easy to set up; little cable.
  - Disadvantages: if the backbone fails, the whole network fails; all devices share the cable, so collisions increase and performance drops as devices are added; less secure, as every device sees all data.
- Ring (Eduqas): each device connects to two others, forming a loop; data travels around the ring in one direction.
  - Advantages: no collisions, as data flows one way (often with a token); performs steadily under load.
  - Disadvantages: one broken link or device can stop the whole ring; adding a device disrupts the network.

### Worked example

A school is choosing between star and bus for a 30-computer room. Recommend one.

1. Star: a fault in one cable only affects one computer, so lessons are not stopped by one failure.
2. The switch sends data only to the computer it is for, so performance stays good with 30 users.
3. Bus would be cheaper, but with 30 devices on one cable there would be many collisions, and one backbone fault would stop everyone.

## The internet, IP and MAC addresses, and routing

*Refs: OCR 1.3.1, 1.3.2 · Edexcel 4.1.3 · Eduqas 3: Networks.*

### What you need to know

- The internet is a worldwide collection of interconnected computer networks (a network of networks). The World Wide Web is a service that runs on it: web pages accessed with HTTP/HTTPS.
- IP address: a logical address given to each device on a network, used to route data to it across networks. It can change if a device moves to a different network.
  - IPv4: 32 bits, written as four denary numbers 0 to 255 separated by dots, for example 192.168.1.20. About 4.3 billion addresses, which is not enough.
  - IPv6: 128 bits, written as eight groups of four hex digits separated by colons, for example 2001:0db8:0000:0000:0000:ff00:0042:8329. Vastly more addresses.
- MAC address: a physical address, unique to each network interface card and set at manufacture. 48 bits, written as six pairs of hex digits, for example 3C:52:82:1A:F0:7E. Used to send data to the right device within a local network (switches use MAC addresses).
- Routers forward packets between networks. Each router reads the destination IP address and sends the packet on towards it, choosing a route.
- (Eduqas) Routing methods: routers keep routing tables of known networks and the next hop to reach each. Each link has a cost (based on distance, speed, delay or traffic); routers choose the route with the lowest total cost. If a link fails or is congested, packets are sent another way.

### Worked example

(Eduqas) Routers A to E are joined by links with these costs: A–B 4, A–C 2, B–C 1, B–D 5, C–D 8, C–E 10, D–E 2. Find the lowest cost route from A to E.

1. A–C–E: 2 + 10 = 12.
2. A–B–D–E: 4 + 5 + 2 = 11.
3. A–C–B–D–E: 2 + 1 + 5 + 2 = 10.
4. A–C–D–E: 2 + 8 + 2 = 12.
5. Lowest cost: A–C–B–D–E, cost 10. Note it is not the route with the fewest hops.

### Common mistakes

- Saying a MAC address is used to find a device across the internet. Across networks, IP addresses are used; MAC addresses are used within a local network.
- Writing an IPv4 address with a number above 255.

## DNS, URLs, web browsers, hosting and the cloud

*Refs: OCR 1.3.1 · Eduqas 3: Internet.*

### What you need to know

- URL (uniform resource locator): the address of a resource on the web. Example: `https://www.example.org/news/today.html`
  - `https` is the protocol.
  - `www.example.org` is the domain name (`.org` is the top-level domain).
  - `/news/today.html` is the path to the file on the server.
- DNS (Domain Name System): a system of many domain name servers that turns domain names into IP addresses. How it works:
  1. The user types a URL. The browser asks a DNS server for the IP address of the domain.
  2. If the DNS server holds the record, it returns the IP address.
  3. If not, it asks other DNS servers (higher up the hierarchy) until one finds it, then passes the IP address back (and stores it for next time).
  4. The browser uses the IP address to request the page from the web server.
- Why DNS: people remember names more easily than numbers, and a site's IP address can change without its name changing.
- Web browser (Eduqas): software on the client that requests web pages using HTTP/HTTPS, receives the HTML, CSS, images and scripts, renders (displays) the page, runs scripts, and lets the user follow links, store bookmarks and keep a history.
- Web servers and clients: a web server stores web pages and sends them when a client (browser) requests them.
- Hosting: storing a website or files on a server that is permanently connected to the internet, often a company's server rented out.
- The cloud: remote services provided over the internet, such as storage, software (for example online office suites) and processing power.
  - Advantages: access from anywhere and any device; no need to buy and maintain your own servers; easy to scale; provider handles backups and updates.
  - Disadvantages: needs an internet connection; reliance on the provider; data security and privacy concerns; ongoing subscription costs.

### Common mistakes

- Saying DNS "stores websites". It stores and looks up IP addresses.
- Mixing up the internet and the web.

## Check questions

1. Give two advantages and one disadvantage of connecting computers in a network. [3 marks]
2. State two differences between a LAN and a WAN. [2 marks]
3. Describe the role of a router and a switch. [2 marks]
4. Explain two factors that could reduce the performance of a wireless network. [4 marks]
5. A 450 MB file is sent over a 100 Mbps connection. Calculate the time taken in seconds. [2 marks]
6. Compare star and mesh topologies. [4 marks]
7. Describe the format of an IPv4 address and explain why IPv6 was introduced. [3 marks]
8. Describe how DNS is used when a user types a web address. [4 marks]
9. Explain the difference between a client-server and a peer-to-peer network. [2 marks]
10. (Eduqas) Name the parts of the URL `https://shop.example.co.uk/basket/view.php`. [3 marks]

## Mark scheme

1. Advantages, any two: share files; share printers/hardware; share internet connection; communication; central backup/security (2). Disadvantage: e.g. cost of hardware, malware can spread, failure of a central device affects many (1).
2. Any two: LAN covers a small area, WAN a large area (1); LAN hardware owned by one organisation, WAN infrastructure often leased/owned by many (1); WAN connects LANs together (1).
3. Router forwards packets between different networks using IP addresses (1). Switch connects devices on a LAN and sends data only to the intended device using MAC addresses (1).
4. Two factors with explanation: distance from WAP – signal weakens, so lower speed (2); many devices sharing bandwidth – less each, more collisions (2); interference from walls/other networks/devices – data must be resent (2).
5. 450 × 8 = 3600 Mb (1); 3600 ÷ 100 = 36 s (1).
6. Star: devices connect to a central switch (1); failure of the switch stops the network (1). Mesh: devices connect to many others with multiple routes (1); no single point of failure but more cabling/cost (1).
7. Four denary numbers 0–255 separated by dots / 32 bits (1). IPv4 has about 4.3 billion addresses (1), which is not enough for all devices; IPv6 (128 bits) gives far more (1).
8. Browser sends the domain name to a DNS server (1); the server looks up the matching IP address (1); if not found, it queries other DNS servers (1); IP address returned and used to request the page from the web server (1).
9. Client-server: a central server provides services/resources that clients request (1). Peer-to-peer: all computers have equal status and share resources directly (1).
10. Protocol: https (1); domain name: shop.example.co.uk (1); path/file: /basket/view.php (1).
