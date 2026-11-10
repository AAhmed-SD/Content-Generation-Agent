---
level: A-level
subject: Computer Science
topic: "Files in data processing: file design, master and transaction files, serial, sequential, indexed sequential and direct access, hashing, multi-level indexes, overflow; file security, backups and archiving; data integrity, privacy, access control, biometrics, disaster planning and damage to data"
as_content: "Eduqas content. Eduqas does not separate AS content within its A-level specification (the separate AS, B500QS, is being withdrawn)."
boards:
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C2.4: Files in data processing", "C2.4: File design", "C2.4: File organisation", "C2.8: Protecting data integrity", "C2.8: Privacy and security", "C2.8: Biometrics", "C2.8: Disaster planning", "C2.8: Malicious and accidental damage", "C1.5: Backup and recovery"]
refs_checked: false
spec_urls:
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/
---

# File organisation and data security

This file covers the Eduqas content on files in data processing (records and fields, fixed and variable length, master and transaction files, serial, sequential, indexed sequential and direct access, updating sequential files, hashing, multi-level indexes, overflow and reorganisation, backups, generations, transaction logs and archiving) and on data security and integrity (online updating problems, dangers of personal data files, clerical procedures, access levels, passwords, write protection, biometrics, threats and disaster planning, and malicious and accidental damage). Cryptography is in [20](20-compression-encryption-and-hashing.md); malware and penetration testing in [28](28-the-internet-and-internet-security.md); hash tables in [06](06-graphs-trees-hash-tables-and-dictionaries.md).

### Board differences

Only Eduqas A500QS names this content. Some ideas overlap with AQA and OCR: AQA covers fields, records and text and binary files (file 04) and concurrent access to databases (file 30); OCR covers record locking and redundancy (file 30) and legislation (file 26).

## Files in data processing and file design

*Refs: Eduqas C2.4: Files in data processing, File design.*

### What you need to know

- Purpose of files: to store data permanently (on secondary storage) so it can be processed by programs again and again, shared, and kept after the program ends.
- A file is a collection of records; a record is a collection of related fields about one item (one customer); a field is one item of data (surname). Usually one field is the key field that identifies each record.
- Files are created (records written), organised (in a chosen order and structure), updated (records added, changed, deleted) and processed (records read, for example to print a report or calculate totals) by programs.
- Fixed-length fields and records: every field has a set size (for example 20 characters for a surname, padded with spaces).
  - Advantages: easy to calculate where each record starts (record n begins at n × record size), so direct access is possible; simple to program; easy to update in place.
  - Disadvantages: wasted space when data is shorter than the field; long data may be cut off (truncated).
  - Use: data of predictable size: codes, dates, prices, student IDs.
- Variable-length fields and records: each field uses only the space it needs, with a separator or a length count.
  - Advantages: no wasted space; no truncation.
  - Disadvantages: harder to process; cannot calculate a record's position directly, so must be read in sequence; updates that make a record longer are awkward.
  - Use: free text such as addresses, comments and descriptions.
- Designing a file: choose the fields, their data types and lengths, the key field, and the organisation, based on how it will be used (how often it is searched, how many records are processed per run, how often it changes).

### Worked example

A record for a library member, fixed length:

| Field | Type | Length (bytes) |
| --- | --- | --- |
| MemberID (key) | String | 6 |
| Surname | String | 20 |
| Forename | String | 15 |
| DateJoined | Date | 8 |
| BooksOnLoan | Integer | 1 |
| Fines (pence) | Integer | 2 |
| Total | | 52 |

For 5,000 members: 5,000 × 52 = 260,000 bytes, plus overhead. Record 1,000 starts at byte 1,000 × 52 = 52,000 (counting from record 0).

## File organisation and access

*Refs: Eduqas C2.4: File organisation.*

### What you need to know

- Master file: holds the main, fairly permanent data about the entities (all customers with their current balances). Transaction file: holds the changes (transactions) collected over a period (today's orders and payments), used to update the master file.
- Serial file: records are stored one after another in the order they were added (no order by key). New records are appended at the end. To find a record, read from the start until found. Use: transaction files, logs, temporary data, where every record is processed anyway.
- Sequential file: records are stored in order of a key field. Finding a record still means reading from the start, but you can stop once you pass where it should be. Use: master files processed in batch, where most records are processed every run (payroll, billing).
- Serial versus sequential access: serial is quick to add to but slow to search; sequential needs inserting in order (often by rewriting the file) but allows efficient batch processing by matching against a sorted transaction file.
- Indexed sequential file: records are stored in key order, and there is also an index of keys and their positions (often one index entry per block). Records can be processed sequentially (batch) or accessed directly through the index (single look-ups). Use: systems that need both, such as a stock file processed weekly but also queried at any time.
- Direct (random) access file: the position of each record is worked out from its key by a hashing algorithm (file 06), so it can be read or written straight away without reading others. Very fast for individual records. Use: real-time systems (booking, stock look-ups at a till). Records are not in key order, so it is poor for producing sorted reports.
- Hashing algorithms for files: for example address = key MOD number of blocks; folding; mid-square. Comparing them: a good algorithm is quick to compute, spreads records evenly over the available blocks, and produces few collisions (synonyms). The table size and choice of algorithm should suit the keys (for example, prime numbers of blocks work better with MOD).
- Multi-level indexes: when a file is very large, the index itself becomes too big to search quickly, so an index of the index is made: a top-level index points to blocks of a second-level index, which point to the data blocks. Each look-up reads only a few small index blocks. (B-trees used in databases are a form of this.)
- Overflow: in indexed sequential and direct access files, a new record may belong in a block that is already full (or two keys may hash to the same address). It is placed in an overflow area, with a pointer from the home block. Over time, overflow chains get longer and access slows down, so the file must be reorganised: rewritten with all records in their correct places, overflow emptied, and the index rebuilt. In hashed files, reorganising may mean a bigger file and a new hash function.

### Worked example: sequential file update (batch)

Old master file (sorted by key) and transaction file (sorted by the same key) are read together, record by record, writing a new master file.

```
Old master:       101 Ali 50   |  104 Ben 20   |  107 Cara 0
Transactions:     101 pay +10  |  103 new Dan 5 |  107 delete
New master:       101 Ali 60   |  103 Dan 5    |  104 Ben 20
```

Algorithm:

```
read first master record M and first transaction record T
WHILE not end of both files
    IF M.key < T.key THEN            // no change to this master record
        write M to new master; read next M
    ELSE IF M.key = T.key THEN       // amend or delete
        IF T is delete THEN skip M (do not write) ELSE apply T to M and write
        read next M; read next T
    ELSE                              // T.key < M.key: insert new record
        write new record from T; read next T
    ENDIF
ENDWHILE
```

(A real version handles end of file by treating the finished file's key as a very high value.) The old master and transaction files are kept: this is the basis of generations of files.

```python
def merge_update(master, trans):
    """master: list of (key, data) sorted; trans: list of (key, op, data) sorted"""
    new, i, j = [], 0, 0
    while i < len(master) or j < len(trans):
        mk = master[i][0] if i < len(master) else float("inf")
        tk = trans[j][0] if j < len(trans) else float("inf")
        if mk < tk:
            new.append(master[i]); i += 1
        elif mk == tk:
            op, data = trans[j][1], trans[j][2]
            if op == "amend":
                new.append((mk, data))
            i += 1; j += 1          # delete: write nothing
        else:
            new.append((tk, trans[j][2])); j += 1      # insert
    return new
```

## File security, backups and archiving

*Refs: Eduqas C2.4: File organisation, C1.5: Backup and recovery.*

### What you need to know

- File security means protecting files from loss, damage and unauthorised access.
- Backup: a copy of data kept so the original can be restored if lost or corrupted. Keep backups on different media and off-site (or in the cloud), make them regularly, and test them.
- Generations of files (grandfather–father–son): in batch processing, each update creates a new master (son) from the old master (father) and the transactions. Keep at least three generations with their transaction files. If the son is lost or corrupted, re-run the update from the father and its transactions; if the father is also lost, start from the grandfather.
- Transaction log (journal): a record of every transaction made since the last backup, often with before and after images. After a failure, restore the last backup and re-apply (roll forward) the logged transactions to bring the file up to date; incomplete transactions can be rolled back.
- Archiving: moving data that is no longer in active use (old records, finished projects) to separate long-term storage. It frees space on the live system and speeds it up, while keeping the data for legal reasons, audits or future reference. An archive is not a backup: archived data is removed from the live system, while a backup is a copy of live data.

## Data security and integrity

*Refs: Eduqas C2.8: Protecting data integrity, Privacy and security.*

### What you need to know

- Data integrity: data is accurate, complete and consistent. Data security: data is protected from unauthorised access, change or loss. Privacy: personal data is used only by the right people for the right purposes (file 26).
- Problems during online updating of files: with many users updating at once, two may change the same record at the same time and one update is lost (file 30); a failure partway through a transaction can leave the file inconsistent (half an update); errors are posted immediately, with no batch checking stage; it is harder to recover because files change continuously. Protection: record locking, transaction logging and rollback, validation at entry, and frequent backups.
- Dangers of using computers to manage files of personal data: data can be copied, stolen or leaked in large quantities quickly and transmitted anywhere; files can be linked and combined to build detailed profiles; inaccurate data can be spread widely and affect decisions about people (credit, jobs); data may be used for purposes the person did not agree to; hacking and insider misuse; loss of laptops or USB drives.
- Processes that protect security and integrity:
  - standard clerical procedures: checking source documents, batch totals and hash totals, controlled distribution of printouts, shredding, staff training, procedures for who may authorise changes, separation of duties;
  - levels of permitted access: users have accounts with different rights (read only, read and write, delete, administrator), based on least privilege; views limit what each user sees (file 30);
  - passwords: strong passwords, changed if compromised, with lockout after several failed attempts and two-factor authentication;
  - write-protect mechanisms: setting files or media to read-only (file attributes, physical write-protect switches, read-only permissions), preventing accidental or unauthorised changes;
  - also encryption, firewalls, anti-malware, audit logs and physical security (locks, ID cards).

## Biometrics

*Refs: Eduqas C2.8: Biometrics.*

### What you need to know

- Biometrics identifies or verifies people using unique physical or behavioural characteristics: fingerprints, face, iris or retina, voice print, hand geometry, signature dynamics, typing rhythm.
- Benefits: cannot be forgotten or easily shared or stolen like a password or card; quick and convenient; hard to forge; proves the actual person was present.
- Drawbacks: expensive equipment; false rejections (genuine user refused) and false acceptances; characteristics can change (injury, illness, ageing); some people cannot use some systems; if biometric data is stolen, it cannot be changed like a password; privacy concerns about storing it.
- Complexities of capturing, storing and processing biometric data: capture must be consistent despite different lighting, angles, dirt or background noise; data is converted into a template (key features, not the whole image) to save space and protect privacy; matching is a comparison within a tolerance, not an exact match, so a threshold balances false acceptance against false rejection; templates must be stored securely (encrypted) and legally as special category personal data; processing must be fast enough for real use; large databases need efficient searching.

## Disaster planning

*Refs: Eduqas C2.8: Disaster planning.*

### What you need to know

- Potential threats to computer systems: natural disasters (fire, flood, storm, earthquake); power failure; hardware failure (disk crash); software failure (bugs, failed updates); malicious attacks (hacking, malware, ransomware, denial of service); theft; human error (deleting files, misconfiguration); sabotage by insiders; loss of key staff or suppliers.
- Contingency (disaster recovery) planning prepares for these so the organisation can keep going (business continuity):
  - risk analysis: identify threats, their likelihood and impact, and the most critical systems;
  - preventive measures: backups (off-site), uninterruptible power supplies and generators, RAID and duplicate (redundant) hardware, fire suppression, security measures, staff training;
  - recovery plan: who does what, in what order; alternative sites (a hot site ready to take over immediately, or a cold site with space but needing equipment); restoring data from backups and logs; how long each system can be down (recovery time) and how much data loss is acceptable (recovery point);
  - testing and updating the plan regularly; insurance.

## Malicious and accidental damage

*Refs: Eduqas C2.8: Malicious and accidental damage.*

### What you need to know

- Malicious damage is deliberate: hacking and changing data, malware (viruses deleting files, ransomware encrypting them), disgruntled employees deleting records, theft, vandalism of hardware, denial of service. Likely situations: systems connected to the internet with weak security; staff with too much access; valuable financial or personal data.
- Accidental damage is unintended: deleting or overwriting files by mistake, entering incorrect data, spilling drinks, dropping laptops, power cuts during saving, software bugs, fire and flood. Likely situations: busy staff with poor training, no confirmation prompts, no backups, poorly tested software.
- Protection against both: backups, access rights, validation and verification, audit logs, training, physical security, anti-malware and firewalls, confirmation before deletion, and UPS.

## Common mistakes

- Confusing serial (no order) with sequential (ordered by key).
- Saying direct access files are good for printing sorted reports. Records are placed by hash, not in key order.
- Confusing archiving with backing up.
- Saying biometrics are "100% accurate". Matching uses a tolerance and has false acceptance and rejection rates.

## Check questions

1. Explain the difference between a master file and a transaction file. [2 marks]
2. Give one advantage and one disadvantage of fixed-length records. [2 marks]
3. Compare serial and sequential file organisation, with a suitable use of each. [4 marks]
4. Explain how an indexed sequential file allows both batch processing and direct look-ups. [3 marks]
5. A direct access file has 97 blocks and uses address = key MOD 97. Find the block for keys 4321 and 1023, and explain what happens if they collide with existing records. [4 marks]
6. Explain why a multi-level index is used for a very large file. [2 marks]
7. Explain why a file with overflow areas needs reorganising from time to time. [2 marks]
8. Describe how a sequential master file is updated from a sorted transaction file. [4 marks]
9. Explain the grandfather–father–son system of backup. [3 marks]
10. Explain how a transaction log is used to recover a file after a crash. [2 marks]
11. Explain the difference between archiving and backing up. [2 marks]
12. Describe three procedures that protect the security of personal data held on a computer. [3 marks]
13. Discuss the benefits and drawbacks of using fingerprint recognition to control access to a school's IT rooms. [4 marks]
14. Describe what should be included in a disaster recovery plan. [4 marks]
15. Give two examples each of malicious and accidental damage to data. [4 marks]

## Mark scheme

1. Master file holds the main, fairly permanent data about entities (1); transaction file holds changes/transactions collected over a period used to update the master (1).
2. Advantage: position of a record can be calculated/easy to process/direct access (1). Disadvantage: wasted space/data truncated (1).
3. Serial: records in the order added (1), e.g. transaction file/log (1). Sequential: records in key order (1), e.g. master file for batch payroll (1).
4. Records stored in key order so they can be read sequentially in batch runs (1); an index of keys and block positions (1) allows a single record to be found directly without reading all the earlier ones (1).
5. 4321 MOD 97 = 53 (1); 1023 MOD 97 = 53 (1); collision/synonym: the second record is placed in an overflow area or the next free block (1), with a pointer/search rule so it can be found (1).
6. The single index would be too large to search quickly (1); an index of the index means only a few small index blocks are read per look-up (1).
7. Overflow chains grow as records are added, so access needs more reads and becomes slower (1); reorganising puts records back in their correct places and rebuilds the index (1).
8. Both files sorted on the same key and read record by record (1); master records with no matching transaction are copied to the new master (1); matching transactions amend or delete the master record (1); new records are inserted in key order; the result is written to a new master file (1).
9. Each update produces a new master (son) from the previous master (father) and transactions (1); at least three generations kept with their transaction files (1); if the current file is lost, it can be recreated by re-running the update from the previous generation (1).
10. Restore the most recent backup (1); re-apply the transactions recorded in the log since that backup to bring the file up to date (1).
11. Archiving moves data no longer in active use to long-term storage, removing it from the live system (1); backing up copies live data so it can be restored if lost (1).
12. Any three: access levels/least privilege (1); strong passwords/two-factor authentication (1); encryption (1); write protection/read-only (1); clerical procedures such as shredding/authorisation (1); physical security (1).
13. Benefits: cannot be lost or shared like cards/passwords; quick; proves the person was present (2). Drawbacks: cost; false rejections (dirty or injured fingers); privacy of storing students' biometric data and legal requirements/consent (2).
14. Any four: risk analysis of threats (1); backup arrangements, off-site (1); alternative hardware/site (1); roles and responsibilities/order of recovery (1); recovery times (1); regular testing of the plan (1).
15. Malicious, any two: hacking, malware/ransomware, deliberate deletion by staff, theft (2). Accidental, any two: deleting/overwriting by mistake, incorrect data entry, hardware damage by spills/drops, power cut, fire/flood (2).
