---
level: GCSE
subject: Computer Science
topic: "Cyber security and network security"
tiers: Not tiered
boards:
  - board: AQA
    code: "8525"
    spec_refs: ["3.5", "3.6.1", "3.6.2", "3.6.2.1", "3.6.2.2", "3.6.3"]
  - board: OCR
    code: "J277"
    spec_refs: ["1.3.2", "1.4.1", "1.4.2"]
  - board: Edexcel
    code: "1CP2"
    spec_refs: ["3.2.3", "4.2.1", "5.3.1", "5.3.2"]
  - board: Eduqas
    code: "C500QS"
    spec_refs: ["3: Cybersecurity"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/computer-science/gcse/computer-science-8525/specification
  OCR: https://www.ocr.org.uk/qualifications/gcse/computer-science-j277-from-2020/
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-gcses/computer-science-2020.html
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-gcse/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/
---

# Cyber security and network security

This file covers what cyber security is, the threats to computer systems (malware, social engineering, brute-force and denial of service attacks, data interception, SQL injection, pharming, weak passwords, misconfigured access rights, removable media, unpatched software), and the ways of finding and preventing vulnerabilities (penetration testing, network forensics, anti-malware, firewalls, encryption, authentication, access levels, physical security, MAC address filtering, CAPTCHA, policies, backups, audit trails and code reviews).

## Overview

Every board asks the same three things about each threat: what it is, how it works, and how to protect against it. Answers score best when they link a specific protection to a specific threat.

### Board differences

| Content | AQA 8525 | OCR J277 | Edexcel 1CP2 | Eduqas C500QS |
| --- | --- | --- | --- | --- |
| Threats named | Social engineering (blagging, phishing, shouldering), malware (virus, trojan, spyware), pharming, weak and default passwords, misconfigured access rights, removable media, unpatched or outdated software | Malware, social engineering (phishing, people as the weak point), brute force, denial of service, data interception and theft, SQL injection | Malware (viruses, worms, Trojans, ransomware, key loggers), unpatched software, out-of-date anti-malware, social engineering | Malware, phishing, social engineering, brute force, denial of service, data interception and theft, SQL injection |
| Protection named | Biometrics, passwords, CAPTCHA, email confirmation, automatic updates, penetration testing; network: authentication, encryption, firewall, MAC address filtering | Penetration testing, anti-malware, firewalls, user access levels, passwords, encryption, physical security | Penetration testing, ethical hacking, access control, physical security, firewalls, anti-malware, encryption, acceptable use policies, backup and recovery; audit trails and code reviews | Penetration testing, network forensics, anti-malware, firewalls, user access levels, passwords, double (two-factor) authentication, encryption |

AQA 3.6 and the network security part of 3.5 are on Paper 2. OCR 1.4 is on J277/01 (encryption is also in 1.3.2). Edexcel 3.2.3, 4.2.1 and 5.3 are on Paper 1. Eduqas section 3 is on Component 1.

## What cyber security is

*Refs: AQA 3.6.1 · AQA 3.5 · Edexcel 4.2.1.*

### What you need to know

- Cyber security is the processes, practices and technologies that protect networks, computers, programs and data from attack, damage or unauthorised access.
- Its main purposes: keep data confidential (only the right people can see it), keep data and systems intact (not changed or damaged), and keep them available (working when needed).
- Network security matters because networks hold valuable personal and business data, an attack can spread to every connected device, and organisations have legal duties to protect personal data.

## Malware

*Refs: AQA 3.6.2, 3.6.2.2 · OCR 1.4.1 · Edexcel 5.3.1 · Eduqas 3: Cybersecurity.*

### What you need to know

Malware (malicious software) is an umbrella term for software written to harm a computer or its user, or to gain unauthorised access.

- Virus: attaches itself to a file or program; spreads when the infected file is run and copied or shared; can delete or corrupt data.
- Worm: copies itself and spreads across a network by itself, without needing a host file or user action; uses up bandwidth and resources.
- Trojan: malware disguised as a useful or harmless program; the user is tricked into installing it; it can then open a back door for attackers. It does not replicate itself.
- Spyware: secretly records what the user does (sites visited, passwords) and sends it to a third party.
- Key logger: records every key pressed, to capture passwords and card numbers.
- Ransomware: encrypts the user's files and demands payment for the key.

Protection: anti-malware software kept up to date; automatic updates for the OS and apps; do not open unknown attachments or download from untrusted sites; firewalls; regular backups (so ransomware cannot hold data hostage); limited user access rights.

### Common mistakes

- Using "virus" for all malware.
- Saying a Trojan spreads by itself. It relies on the user being tricked.

## Social engineering

*Refs: AQA 3.6.2, 3.6.2.1 · OCR 1.4.1 · Edexcel 5.3.1 · Eduqas 3: Cybersecurity.*

### What you need to know

- Social engineering is manipulating people into giving away confidential information or access. People are often the weakest point in a system.
- Phishing: fake emails, texts or messages that seem to come from a trusted organisation (a bank, a delivery firm), asking the user to click a link and enter details, or open an attachment. Signs: urgent tone, generic greeting, spelling errors, a link address that does not match the real site.
- Blagging (pretexting; AQA): inventing a scenario to persuade the victim to hand over information or do something, for example phoning as "IT support" asking for a password.
- Shouldering (shoulder surfing; AQA): watching someone enter a PIN or password, at a cash machine or in a public place.
- Protection: staff training to recognise attempts; never give passwords by phone or email; check sender addresses and links; verify requests through a known contact; spam filters; shield PIN entry; two-factor authentication so a stolen password alone is not enough.

## Pharming (AQA)

*Refs: AQA 3.6.2.*

### What you need to know

- Pharming redirects traffic meant for a genuine website to a fake one, for example by altering DNS records or the computer's local settings with malware. The user types the correct address but lands on a copy that collects their details.
- Protection: anti-malware; check for HTTPS and a valid certificate; keep software updated; use trusted DNS.

## Brute-force and denial of service attacks

*Refs: OCR 1.4.1 · Eduqas 3: Cybersecurity.*

### What you need to know

- Brute-force attack: trying every possible password (or many likely ones, from a list) automatically until one works.
  - Protection: strong passwords (long, mixed character types); locking accounts after a few failed attempts; CAPTCHA; two-factor authentication.
- Denial of service (DoS): flooding a server or network with so many requests that it cannot respond to genuine users. A distributed DoS (DDoS) uses many compromised computers (a botnet) at once.
  - Purpose: disrupt a business, cost it money, protest, or distract from another attack. Data is not usually stolen.
  - Protection: firewalls that block traffic from suspicious sources; services that filter and spread traffic; extra capacity.

### Worked example

A 4-digit PIN has 10⁴ = 10 000 possibilities. A password of 8 characters from 62 letters and digits has 62⁸, about 218 trillion. Explain how this affects a brute-force attack.

1. The PIN can be tried exhaustively very quickly unless attempts are limited, which is why cash machines keep the card after 3 wrong tries.
2. The longer password with more character types has vastly more combinations, so trying them all takes far longer.

## Data interception and theft; SQL injection

*Refs: OCR 1.4.1 · Eduqas 3: Cybersecurity.*

### What you need to know

- Data interception: capturing data as it travels across a network (for example with packet-sniffing software on an unsecured Wi-Fi network), then reading or stealing it.
  - Protection: encryption (HTTPS, WPA2/WPA3 on Wi-Fi, VPNs).
- SQL injection: entering SQL code into an input box on a website, so that the database runs the attacker's code. It can reveal, change or delete data, or bypass a login.
  - Protection: validate and sanitise input; use parameterised queries (so input is treated only as data); limit database access rights; penetration testing.

### Explained

A login built by joining strings is vulnerable:

```python
username = input("Username: ")
sql = "SELECT * FROM Users WHERE name = '" + username + "'"
```

If someone types `' OR '1'='1`, the query becomes `SELECT * FROM Users WHERE name = '' OR '1'='1'`, which is true for every row, so all users are returned.

A parameterised query passes the input separately, so it can never become code:

```python
cursor.execute("SELECT * FROM Users WHERE name = ?", (username,))
```

## Other vulnerabilities (AQA, Edexcel)

*Refs: AQA 3.6.2 · Edexcel 5.3.1.*

### What you need to know

- Weak and default passwords: short, common or guessable passwords, or devices left with the maker's default password (such as "admin"), are easily cracked.
- Misconfigured access rights: users given more access than they need can read or change data they should not (by mistake or deliberately).
- Removable media: USB sticks can carry malware into a system, or carry data out of it if lost or stolen.
- Unpatched or outdated software: known security holes stay open until updates (patches) are installed. Attackers exploit these technical vulnerabilities.
- Out-of-date anti-malware (Edexcel): it cannot recognise new malware without the latest definitions.

## Finding and preventing vulnerabilities

*Refs: AQA 3.5, 3.6.2, 3.6.3 · OCR 1.3.2, 1.4.2 · Edexcel 3.2.3, 4.2.1, 5.3.2 · Eduqas 3: Cybersecurity.*

### What you need to know

- Penetration testing: authorised people try to break into a system, as an attacker would, to find weaknesses before criminals do. AQA names two kinds:
  - With some knowledge or basic credentials: simulates a malicious insider (such as an employee).
  - With no knowledge or credentials: simulates an external attack.
- Ethical hacking (Edexcel): hacking with permission, to find and report vulnerabilities; penetration testing is one form.
- Network forensics (Eduqas): capturing, recording and analysing network traffic to find out how an attack happened, what was affected and who was responsible, and to detect intrusions.
- Anti-malware: detects, quarantines and removes malware.
- Firewall: hardware or software that monitors incoming and outgoing network traffic and allows or blocks it according to a set of security rules (for example blocking certain ports or addresses).
- Encryption: data is scrambled using an algorithm and a key into ciphertext, which cannot be understood without the key. It does not stop data being intercepted, but makes it useless to the thief. Used for data in transit (HTTPS, Wi-Fi) and stored data (encrypted drives).
- Authentication: confirming a user's identity. Methods:
  - Passwords: strong (long, mixed case, digits, symbols), not reused, changed if compromised; systems lock after several failures.
  - Biometrics: fingerprint, face, iris or voice recognition; especially used on mobile devices; hard to copy or forget.
  - Two-factor (double) authentication: two different types of proof, such as a password plus a code sent to a phone.
  - CAPTCHA (AQA): a test that is easy for humans but hard for automated programs, to stop bots creating accounts or guessing passwords.
  - Email confirmation (AQA): a link sent to the user's email address to confirm they own it, used when signing up or resetting a password.
- User access levels / access control: each user only gets the access they need (for example, read-only for most staff, edit rights for managers), limiting damage from mistakes, insiders or stolen accounts.
- MAC address filtering (AQA): the network only allows (or blocks) devices whose MAC addresses are on a list. Weakness: MAC addresses can be faked.
- Physical security: locked server rooms, ID cards, CCTV, security staff, cable locks, to stop people physically accessing or stealing equipment.
- Automatic software updates (AQA): install security patches as soon as they are released.
- Acceptable use policy (Edexcel): rules users agree to about how they may use the organisation's systems (for example, no installing software, no sharing passwords).
- Backup and recovery procedures (Edexcel): regular copies stored separately (off-site or in the cloud), with a tested plan for restoring systems after an attack or failure.
- Robust software (Edexcel 3.2.3): software should be written to resist attack and errors. Ways of finding vulnerabilities in code:
  - Code reviews: other programmers examine the code to find bugs and security flaws.
  - Audit trails: records of who did what and when in a system, so suspicious actions can be traced and investigated.
- Layered protection: no single method is enough; methods work together (AQA: authentication, encryption, firewall and MAC filtering combined).

### Explained

A simple encryption example, the Caesar cipher, shifts each letter by a key:

```python
def caesar(text, key):
    result = ""
    for ch in text.upper():
        if ch.isalpha():
            result = result + chr((ord(ch) - 65 + key) % 26 + 65)
        else:
            result = result + ch
    return result

print(caesar("MEET AT TEN", 3))    # PHHW DW WHQ
print(caesar("PHHW DW WHQ", -3))   # MEET AT TEN
```

It is easily broken (there are only 25 possible keys), so real systems use much stronger algorithms, but the idea of an algorithm plus a key is the same.

### Worked example

A small accountancy firm has 15 staff, a Wi-Fi network, a file server holding client records, and staff who sometimes work from cafés. Recommend four measures and justify each.

1. Firewall: blocks unauthorised incoming traffic to the server from the internet.
2. Encryption: WPA3 on the office Wi-Fi and a VPN for café working, so intercepted data cannot be read.
3. User access levels: only partners can open payroll records; others read-only, limiting damage if an account is misused.
4. Staff training on phishing: people are the weak point; trained staff are less likely to give away logins.
5. (Also good) Regular off-site backups to recover from ransomware.

### Common mistakes

- Saying encryption "stops hackers getting the data". It stops them understanding it.
- Saying a firewall removes viruses. It filters traffic; anti-malware removes malware.
- Listing protections that do not match the threat in the question.

## Check questions

1. Define cyber security. [1 mark]
2. Describe the difference between a virus and a worm. [2 marks]
3. Explain how phishing works and give two ways to reduce the risk. [4 marks]
4. (AQA) Explain what is meant by blagging and by shouldering. [2 marks]
5. Explain what a denial of service attack is and why it is carried out. [3 marks]
6. Describe how an SQL injection attack works and one method to prevent it. [3 marks]
7. Explain how a firewall protects a network. [2 marks]
8. (AQA) Describe the two types of penetration testing. [2 marks]
9. Explain why two-factor authentication is more secure than a password alone. [2 marks]
10. (Edexcel) Explain how audit trails help to keep a system secure. [2 marks]
11. (Eduqas) State what is meant by network forensics. [1 mark]
12. A hospital wants to protect patient records. Discuss the methods it should use. [6 marks]

## Mark scheme

1. Processes, practices and technologies to protect networks, computers, programs and data from attack, damage or unauthorised access (1).
2. A virus attaches to a file and needs the file to be run/shared to spread (1); a worm replicates and spreads across a network by itself (1).
3. A fake message appearing to come from a trusted source (1) tricks the user into clicking a link/entering details on a fake site (1). Any two: staff training; check sender and link addresses; spam filters; two-factor authentication; never give details by email (2).
4. Blagging: inventing a scenario to persuade someone to give information (1). Shouldering: watching someone enter a PIN/password (1).
5. Flooding a server/network with requests (1) so it cannot respond to genuine users (1); to disrupt a business / cost it money / protest / distract (1).
6. Attacker enters SQL code into an input field (1) which is run by the database, revealing/changing data or bypassing login (1). Prevention: input validation/sanitisation or parameterised queries (1).
7. Monitors incoming and outgoing traffic (1) and blocks traffic that breaks the security rules / from unauthorised sources (1).
8. Testing with some knowledge/credentials to simulate a malicious insider (1); testing with no knowledge/credentials to simulate an external attacker (1).
9. Two different types of evidence are needed, e.g. password and phone code (1); a stolen or guessed password alone is not enough (1).
10. A record of who accessed or changed what and when (1); suspicious activity can be detected and traced to a user (1).
11. Capturing and analysing network traffic to investigate/detect attacks (1).
12. Levels-based: 5–6 marks for a balanced discussion of several methods each linked to a threat (e.g. access levels so only relevant staff see records; strong passwords and two-factor authentication against stolen logins; encryption of stored and transmitted data against interception/theft; firewall and anti-malware against external attack and ransomware; backups for recovery; staff training against phishing; physical security of servers; penetration testing), with a justified conclusion. 3–4 marks: several methods with some links. 1–2 marks: methods listed without explanation.
