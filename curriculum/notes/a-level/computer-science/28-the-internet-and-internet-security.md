---
level: A-level
subject: Computer Science
topic: "The internet: structure, packet and circuit switching, routing, URLs, domain names and DNS, registries; internet security: firewalls, proxies, encryption, certificates, signatures and malware"
as_content: "A-level only for AQA (4.9.3). OCR: internet structure, TCP/IP, DNS, layering, LANs and WANs and packet and circuit switching are also AS; network security and threats (1.3.3(b)) are A-level only."
boards:
  - board: AQA
    code: "7517"
    spec_refs: ["4.9.3.1", "4.9.3.2"]
  - board: OCR
    code: "H446"
    spec_refs: ["1.3.3(a)", "1.3.3(b)"]
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C2.2: Communication networks", "C2.8: Malicious software and mechanisms of attack and defence"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/a-level/computer-science-7517/specification
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/computer-science-h046-h446-from-2015/
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/a-level-aqa/
---

# The internet and internet security

This file covers the structure of the internet, packet switching and circuit switching, what is in a packet, routers and gateways, how routing works, URLs, fully qualified domain names, domain names and IP addresses, DNS, internet registries, firewalls (packet filtering, proxy servers, stateful inspection), symmetric and asymmetric encryption and key exchange, digital certificates and signatures, and worms, trojans and viruses and how to defend against them. TCP/IP layers and addressing are in [29-tcp-ip-addressing-and-client-server.md](29-tcp-ip-addressing-and-client-server.md); encryption basics in [20](20-compression-encryption-and-hashing.md).

Builds on [GCSE: Networks](../../gcse/computer-science/15-networks.md) and [GCSE: Cyber security](../../gcse/computer-science/17-cyber-security.md).

### Board differences

| Content | AQA 7517 | OCR H446 | Eduqas A500QS |
| --- | --- | --- | --- |
| Structure | Internet structure; packet switching; routers; gateways; routing; URL, FQDN, DNS, registries | Internet structure; DNS; packet and circuit switching | The internet as a world-wide infrastructure; packet contents; routing traffic |
| Security | Firewalls (packet filtering, proxy, stateful inspection); encryption and key exchange; certificates and signatures; worms, trojans, viruses | Network security and threats; firewalls, proxies and encryption | Malware types, vectors; black hat, white hat, penetration testing (C2.8); more in file 36 |

## 4.9.3.1 The internet and how it works

*Refs: AQA 4.9.3.1 · OCR 1.3.3(a) · Eduqas C2.2: Communication networks.*

### What you need to know

Structure:

- The internet is a global network of networks: millions of separate networks (homes, businesses, universities, ISPs) connected together and all using the TCP/IP protocols.
- The backbone is made of very high-capacity links (mostly fibre optic, including undersea cables) between major routers and internet exchange points run by large network providers. Internet service providers (ISPs) connect homes and organisations to it. Eduqas: it is a world-wide communications infrastructure that services such as the web, email, streaming and VoIP run on top of.
- The internet is not the World Wide Web: the web is one service (web pages over HTTP) that runs on the internet.

Packet switching:

- Data is split into packets. Each packet is sent independently and may take a different route; routers forward each packet towards its destination based on its address and current network conditions. At the destination, packets are put back in order using their sequence numbers, and missing ones are requested again.
- Main components of a packet:
  - header: source IP address, destination IP address, sequence number (packet number and total), protocol, time to live (TTL: a hop count, reduced by each router; the packet is discarded at 0 so it cannot circulate forever);
  - payload: the data itself;
  - trailer: an error check such as a checksum or CRC (in some protocols).
- Advantages: links are shared by many users, so efficient use of capacity; packets route around failures or congestion; no setup needed. Disadvantages: packets may arrive out of order or be delayed (variable latency), so less suited to real-time data without extra measures; overhead of headers.

Circuit switching (OCR, Eduqas):

- A dedicated path is set up between sender and receiver for the whole communication (as in traditional phone calls). All data follows that path in order.
- Advantages: guaranteed bandwidth, data arrives in order with constant delay: good for real-time voice and video. Disadvantages: the link is reserved even when nothing is sent (wasteful); setup time; a broken link ends the call.

Routers and gateways:

- A router connects two or more networks and forwards packets between them. It reads the destination IP address and uses its routing table to choose the next hop: the best neighbouring router towards the destination.
- A gateway connects networks that use different protocols, translating between them (for example changing the packet format). The device connecting a home network to the internet is often called the default gateway.
- Routing: each router only knows the next step. Routers share information with each other (routing protocols) to build their tables, often choosing paths with the fewest hops or lowest cost, using algorithms like Dijkstra's (file 10). If a link fails, tables are updated and packets take another path.

URLs, domain names and IP addresses:

- An IP address identifies a device's network interface on the internet (for example 151.101.0.81 in IPv4).
- A domain name is a human-readable name for a network or organisation, such as example.co.uk.
- A fully qualified domain name (FQDN) includes the host name too, identifying one specific host: www.example.co.uk or mail.example.co.uk.
- Domain names are organised hierarchically, read right to left: the root, then top-level domains (.com, .uk, .org), second-level domains (.co under .uk), the organisation's own name, then subdomains or host names.
- A URL (uniform resource locator) gives the full address of a resource on the internet: protocol (scheme), FQDN (or IP address), optional port, and path to the file. For https://www.example.co.uk/courses/cs.html: protocol https, FQDN www.example.co.uk, path /courses/cs.html.

DNS:

- The Domain Name System translates domain names into IP addresses, because people remember names but routers use numbers.
- How a look-up works: the browser checks its own cache, then the computer's, then asks the configured DNS resolver (usually the ISP's). If the resolver does not have it cached, it asks a root server, which refers it to the server for the top-level domain (.uk), which refers it to the server for example.co.uk, which returns the IP address. The resolver caches the answer (for a set time) and returns it to the browser, which then connects to that IP address.
- DNS is a distributed, hierarchical database: no single server holds everything, which makes it scalable and resilient.

Internet registries:

- Internet registries allocate and record IP addresses and domain names, so that each one is unique worldwide. IANA (the Internet Assigned Numbers Authority) manages the global pool and allocates blocks to five regional internet registries (such as RIPE NCC for Europe), which allocate them to ISPs and organisations. Domain registries keep the records for each top-level domain (Nominet for .uk).
- Needed because addresses and names must be unique or data could not be delivered, and because IPv4 addresses are scarce and must be shared out fairly. Registries also keep a public record of who holds each domain (WHOIS).

### Common mistakes

- Saying each packet "follows the same route". In packet switching each one is routed independently.
- Saying DNS "stores websites". It maps names to IP addresses.
- Mixing up a domain name and an FQDN: the FQDN includes the host name.

## 4.9.3.2 Internet security

*Refs: AQA 4.9.3.2 · OCR 1.3.3(b) · Eduqas C2.8: Malicious software and mechanisms of attack and defence.*

### Firewalls and proxies

- A firewall monitors and controls traffic between a trusted network and an untrusted one (the internet), allowing or blocking it according to rules. It can be hardware, software, or both.
- Packet filtering (static filtering): examines each packet's header (source and destination IP addresses, port numbers, protocol) against rules, and accepts or drops it. Fast, but each packet is judged on its own; it cannot see the packet's content or whether it belongs to a valid conversation. Blocking a port number blocks the service that uses it (for example blocking port 23 blocks Telnet).
- Stateful inspection: keeps track of active connections (state tables) and checks that each packet belongs to an established, legitimate conversation (for example, allowing incoming packets only in reply to a request from inside). It can also check packet contents. More secure, but uses more processing.
- Proxy server: acts as an intermediary. Clients send requests to the proxy, which makes the request to the external server on their behalf and passes the reply back. The external server sees only the proxy's IP address, hiding internal addresses. The proxy can filter content (block sites, scan for malware), log use, and cache popular pages to save bandwidth and speed up access.

### Encryption and key exchange

- Symmetric encryption: one shared secret key encrypts and decrypts. Fast, but the key must be exchanged securely first, and if intercepted, everything is readable (the key exchange problem).
- Asymmetric (public key) encryption: each party has a key pair. The public key is shared openly; the private key is kept secret. Data encrypted with someone's public key can only be decrypted with their private key, so anyone can send them a confidential message without a shared secret.
- Key exchange in practice: asymmetric encryption is slow, so it is used to agree or send a symmetric session key securely (for example the client encrypts a random session key with the server's public key; only the server can decrypt it). Both then use the fast symmetric key for the rest of the session. This is what TLS (used by HTTPS) does.

### Digital signatures

- Purpose: prove who sent a message (authentication), that it has not been changed (integrity), and that the sender cannot deny sending it (non-repudiation).
- Creating one: the sender hashes the message to get a digest, then encrypts the digest with their own private key. That encrypted digest is the signature, sent with the message.
- Checking one: the receiver decrypts the signature with the sender's public key to get the original digest, hashes the received message themselves, and compares. If they match, the message is from the holder of the private key and has not been altered.

### Digital certificates

- Problem: how do you know a public key really belongs to the bank and not an attacker?
- A digital certificate is an electronic document issued by a trusted certificate authority (CA) that binds a public key to an identity (for example a website's domain). It contains the owner's name and domain, their public key, the CA's name, a serial number, validity dates, and the CA's digital signature.
- Obtaining one: the organisation generates a key pair and sends its public key and identity details to a CA; the CA checks the identity and then signs the certificate with the CA's private key.
- Using one: when a browser connects to a site over HTTPS, the server sends its certificate. The browser checks the CA's signature using the CA's public key (built into the browser or OS), that the certificate is in date and not revoked, and that the domain matches. If all is well, the browser trusts the server's public key (and shows a padlock).

### Worms, trojans and viruses

| Malware | How it spreads | What it exploits |
| --- | --- | --- |
| Virus | Attaches itself to a host file or program; spreads when the infected file is run and copied or shared | Users running infected files; lack of scanning |
| Worm | Standalone; replicates itself across networks automatically, without a host file or user action | Unpatched software vulnerabilities (for example buffer overflows in network services), weak passwords, open ports |
| Trojan | Disguised as legitimate, useful software; the user installs it willingly; does not replicate | Social engineering: trusting users, downloads from unofficial sources |

- Effects: deleting or encrypting files (ransomware), stealing data, creating backdoors, using the computer in a botnet, slowing the network.
- Vulnerabilities exploited: software bugs (buffer overflows, injection), unpatched systems, default or weak passwords, users opening attachments and links, unnecessary open ports and services.

Addressing them:

- Improved code quality: secure coding practices (validate all input, check array bounds to prevent buffer overflows, use parameterised queries to prevent SQL injection), code reviews, testing (including penetration testing), and memory-safe languages, so there are fewer vulnerabilities to exploit.
- Monitoring: intrusion detection systems, firewall and network logs, checking for unusual traffic or behaviour, so attacks are spotted and stopped quickly.
- Protection: anti-malware software with up-to-date signatures and heuristic detection; installing security patches promptly; firewalls; least privilege (users and programs only have the access they need); user training about phishing and suspicious downloads; regular backups so data can be restored.

### Hackers and penetration testing

*Refs: Eduqas C2.8: Malicious software and mechanisms of attack and defence.*

- Black hat hacking: breaking into systems without permission for malicious or criminal purposes (theft, damage). Illegal (Computer Misuse Act).
- White hat hacking (ethical hacking): security experts who, with the owner's permission, look for weaknesses so they can be fixed.
- Penetration testing: an authorised, simulated attack on a system to find vulnerabilities before criminals do. It can be external (attacking from outside like an outsider) or internal (simulating a malicious insider), and black box (testers have no inside knowledge) or white box (testers are given details of the system). Results are reported with recommended fixes.

## Common mistakes

- Saying a digital signature encrypts the whole message. It encrypts a hash (digest) of it with the sender's private key.
- Saying the CA "encrypts the website". The CA vouches for the link between a public key and an identity.
- Describing a trojan as self-replicating. Viruses and worms replicate; trojans do not.
- Saying a proxy server is the same as a firewall. A proxy can be part of a firewall setup but acts as an intermediary for requests.

## Check questions

1. Explain how packet switching is used to send an email across the internet. [4 marks]
2. List four items in a packet header. [2 marks]
3. Compare packet switching and circuit switching. [4 marks]
4. Explain the difference between a router and a gateway. [2 marks]
5. For the URL https://shop.example.com/basket/view, identify the protocol, the FQDN, the domain name and the path. [4 marks]
6. Describe how DNS resolves a domain name into an IP address. [4 marks]
7. Explain why internet registries are needed. [2 marks]
8. Compare packet filtering and stateful inspection. [3 marks]
9. Explain two ways a proxy server improves security or performance. [2 marks]
10. Explain how asymmetric encryption allows a symmetric key to be exchanged securely. [3 marks]
11. Describe how a digital signature is created and verified. [5 marks]
12. Explain how a browser uses a digital certificate to trust a website's public key. [3 marks]
13. Compare a worm with a virus, and explain how improved code quality reduces the threat from worms. [4 marks]
14. (Eduqas) Explain the purpose of penetration testing and the difference between white hat and black hat hacking. [3 marks]

## Mark scheme

1. Email split into packets (1); each packet given a header with source/destination address and sequence number (1); packets routed independently by routers, possibly by different routes (1); reassembled in order at the destination, missing packets re-requested (1).
2. Any four: source IP, destination IP, sequence number, protocol, time to live, packet length/total packets (2 for four, 1 for two).
3. Packet switching: data split into packets sent independently, links shared, no setup, may arrive out of order (2). Circuit switching: dedicated path set up for the whole communication, data in order with constant delay, link reserved even when idle (2).
4. Router forwards packets between networks using the same protocol, choosing the next hop (1); gateway connects networks with different protocols, translating between them (1).
5. Protocol https (1); FQDN shop.example.com (1); domain name example.com (1); path /basket/view (1).
6. Checks local/browser cache first (1); request sent to DNS resolver (1); resolver queries root, then TLD server, then authoritative server for the domain (1); IP address returned to the browser and cached (1).
7. IP addresses and domain names must be unique worldwide so data can be delivered (1); registries allocate and record them/share out scarce IPv4 addresses (1).
8. Packet filtering checks header details (IP addresses, ports, protocol) of each packet individually against rules (1); stateful inspection tracks connections and checks packets belong to a valid established conversation (1); stateful is more secure but slower/more processing (1).
9. Any two: hides internal IP addresses (1); filters content/blocks sites/scans for malware (1); caches pages to reduce bandwidth and speed access (1); logs use (1).
10. Client encrypts a random symmetric session key with the server's public key (1); only the server's private key can decrypt it, so an interceptor cannot read it (1); both then use the fast symmetric key for the session (1).
11. Sender hashes the message to produce a digest (1); encrypts the digest with the sender's private key to form the signature (1). Receiver decrypts the signature with the sender's public key (1); hashes the received message (1); if the digests match, the message is authentic and unaltered (1).
12. Server sends its certificate containing its public key, signed by a CA (1); browser verifies the CA's signature using the CA's public key built into the browser (1); checks dates/revocation/domain match, then trusts the public key (1).
13. Worm is standalone and spreads across networks by itself; virus needs a host file and user action to spread (2). Secure coding/input validation/bounds checking/testing removes vulnerabilities such as buffer overflows that worms exploit (2).
14. Authorised simulated attack to find vulnerabilities so they can be fixed (1). White hat: permission, aims to improve security (1). Black hat: no permission, malicious/criminal (1).
