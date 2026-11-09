---
level: A-level
subject: Further Mathematics
topic: "Groups"
as_content: "All of this file is A-level only option content: AQA Discrete (DG), Edexcel Further Pure 2, OCR Additional Pure (8.03) and MEI Extra Pure."
boards:
  - board: AQA
    code: "7367"
    spec_refs: ["DG1", "DG2", "DG3", "DG4", "DG5", "DG6", "DG7", "DG8", "DG9", "DG10", "DG11", "DG12"]
  - board: Edexcel
    code: "9FM0"
    spec_refs: ["FP2 1.1", "FP2 1.2", "FP2 1.3", "FP2 1.4", "FP2 1.5"]
  - board: OCR
    code: "H245"
    spec_refs: ["8.03a", "8.03b", "8.03c", "8.03d", "8.03e", "8.03f", "8.03g", "8.03h", "8.03i", "8.03j", "8.03k", "8.03l", "8.03m"]
  - board: OCR MEI
    code: "H645"
    spec_refs: ["XS1", "XS2", "Xa1", "Xa2", "Xa3", "Xa4", "Xa5", "Xa6", "Xa7", "Xa8"]
refs_checked: false
spec_urls:
  AQA: https://www.aqa.org.uk/subjects/mathematics/a-level/further-mathematics-7367/specification
  Edexcel: https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/further-mathematics-2017.html
  OCR: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-a-h235-h245-from-2017/
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-additional-pure/
---

# Groups

This file covers binary operations and their properties, Cayley tables, the group axioms, standard examples of groups, the order of a group and of an element, subgroups, cyclic groups and generators, Lagrange's theorem, and isomorphism.

## Overview

Option content on every board. It uses modular arithmetic ([25-number-theory.md](25-number-theory.md)), matrices ([05-matrices-operations-and-transformations.md](05-matrices-operations-and-transformations.md)) and roots of unity ([04-complex-numbers-de-moivre-exponential-form-and-nth-roots.md](04-complex-numbers-de-moivre-exponential-form-and-nth-roots.md)).

### Board differences

- AQA DG1 to DG12 (in the Discrete option); Edexcel FP2 1.1 to 1.5; OCR 8.03a to 8.03m; MEI XS1, XS2, Xa1 to Xa8.
- AQA DG2, DG3 and DG5 ask you to prove commutativity, associativity and the existence of an identity for given operations.
- OCR 8.03i expects familiarity with all groups up to order 8 and 8.03m with groups given by generators and relations (such as ⟨a, b : a⁴ = b² = e, ba = a³b⟩).
- Edexcel FP2 1.5 limits isomorphism to groups of order at most 8.

## DG1 Binary operations and their properties

*Refs: AQA DG1, DG2, DG3, DG4, DG5, DG6 · OCR 8.03a, 8.03b · MEI XS1, XS2. Level: A-level only.*

### What you need to know

- A binary operation ∗ on a set S combines two elements a, b to give a ∗ b. S is closed under ∗ if a ∗ b ∈ S for all a, b ∈ S.
- Commutative: a ∗ b = b ∗ a for all a, b. Associative: (a ∗ b) ∗ c = a ∗ (b ∗ c) for all a, b, c.
- Identity e: e ∗ a = a ∗ e = a for all a. Inverse of a: a⁻¹ with a ∗ a⁻¹ = a⁻¹ ∗ a = e.
- A Cayley table shows every product; row element first.
- Examples: addition and multiplication modulo n; matrix multiplication; composition of functions or transformations.

### Explained

To prove a property holds you need a general argument; to show it fails you need one counter-example. Commutativity shows in a Cayley table as symmetry about the leading diagonal. Associativity cannot be seen easily from a table; it is usually inherited (from ordinary multiplication, matrix multiplication or composition of functions).

### Worked example

On ℝ, define a ∗ b = a + b + ab. Is ∗ commutative and associative? Find the identity and the inverse of a.

1. a ∗ b = a + b + ab = b ∗ a: commutative.
2. (a ∗ b) ∗ c = a + b + ab + c + (a + b + ab)c = a + b + c + ab + bc + ca + abc. This is symmetric in a, b, c, so it equals a ∗ (b ∗ c): associative.
3. a ∗ e = a + e + ae = a needs e(1 + a) = 0 for all a, so e = 0.
4. a ∗ x = 0 gives x = −a/(1 + a), which exists unless a = −1.

### Common mistakes

- Checking one example and claiming a property holds in general.

## DG8 The group axioms and examples

*Refs: AQA DG7, DG8, DG9 · Edexcel FP2 1.1, 1.2 · OCR 8.03c, 8.03d · MEI Xa1, Xa2. Level: A-level only.*

### What you need to know

A group (G, ∗) is a set with a binary operation satisfying:

1. **Closure**: a ∗ b ∈ G.
2. **Associativity**.
3. **Identity**: there is e ∈ G with e ∗ a = a ∗ e = a.
4. **Inverses**: every a has a⁻¹ ∈ G.

- Abelian group: also commutative.
- In a finite group's Cayley table each element appears exactly once in every row and column (Latin square property).
- Standard groups: (ℤ, +); (ℤₙ, + mod n); {1, 2, ..., p − 1} under × mod p for p prime; nth roots of unity under ×; symmetries of a regular n-gon (order 2n); non-singular 2 × 2 matrices under multiplication.

### Explained

The identity is unique and each element has exactly one inverse. Cancellation follows: if a ∗ b = a ∗ c then b = c. That is why rows of a Cayley table cannot repeat entries.

{0, 1, ..., n − 1} under × mod n is not a group (0 has no inverse). Even without 0, × mod n fails when n is not prime: 2 × 2 = 0 mod 4.

### Worked example

Show that G = {1, 5, 7, 11} under multiplication modulo 12 is a group.

1. Cayley table products: 5 × 5 = 25 ≡ 1, 7 × 7 = 49 ≡ 1, 11 × 11 = 121 ≡ 1, 5 × 7 = 35 ≡ 11, 5 × 11 = 55 ≡ 7, 7 × 11 = 77 ≡ 5. Closed.
2. Associative: inherited from multiplication of integers.
3. Identity 1. Each element is its own inverse.
4. So G is a group (abelian, every non-identity element of order 2).

Describe the group of symmetries of an equilateral triangle.

1. Three rotations (0°, 120°, 240°) and three reflections: order 6.
2. Not abelian: a rotation followed by a reflection differs from the reflection followed by the rotation.

### Common mistakes

- Forgetting to justify associativity.
- Claiming a set is a group without checking closure.

## DG7 Order, subgroups and Lagrange's theorem

*Refs: AQA DG7, DG10 · Edexcel FP2 1.3, 1.4 · OCR 8.03e, 8.03f, 8.03k · MEI Xa3, Xa4, Xa5, Xa6. Level: A-level only.*

### What you need to know

- The order of a group is the number of elements, |G|.
- The order (period) of an element a is the least positive n with aⁿ = e.
- A subgroup H of G is a subset that is a group under the same operation. Every group has the trivial subgroup {e} and G itself; others are proper non-trivial subgroups.
- **Lagrange's theorem**: for a finite group, the order of a subgroup divides the order of the group.
- Corollary: the order of every element divides |G|. A group of prime order is cyclic and has no proper non-trivial subgroups.

### Explained

To test a subset H of a finite group, check closure (associativity is inherited, and in a finite group closure gives identity and inverses). Lagrange's theorem tells you which subgroup sizes to look for, but not that a subgroup of each size exists. For example, the group of rotations of a regular tetrahedron has order 12 but no subgroup of order 6.

### Worked example

Find the orders of the elements of (ℤ₈, + mod 8) and list its subgroups.

1. 0 has order 1; 4 has order 2; 2 and 6 have order 4; 1, 3, 5, 7 have order 8.
2. Subgroups: {0}, {0, 4}, {0, 2, 4, 6}, ℤ₈ (orders 1, 2, 4, 8, all dividing 8).

A group has order 15. What are the possible orders of its elements?

1. Divisors of 15: 1, 3, 5, 15.

### Common mistakes

- Concluding that a subgroup of every order dividing |G| must exist.

## DG11 Cyclic groups and generators

*Refs: AQA DG9, DG11 · Edexcel FP2 1.3 · OCR 8.03g, 8.03h, 8.03i, 8.03j, 8.03m · MEI Xa3, Xa4. Level: A-level only.*

### What you need to know

- G is cyclic if some element g generates it: every element is a power of g. g is a generator.
- A cyclic group of order n has an element of order n. Cyclic groups are abelian.
- (OCR) Groups up to order 8: orders 1, 2, 3, 5, 7 are cyclic only; order 4 is cyclic C₄ or the Klein group V₄; order 6 is C₆ or the triangle symmetry group D₃; order 8 includes C₈, C₄ × C₂, C₂ × C₂ × C₂, D₄ and the quaternion group Q₈.
- (OCR 8.03m) Groups can be defined by generators and relations.

### Worked example

Show that {1, 2, 3, 4} under × mod 5 is cyclic, and find all generators.

1. Powers of 2: 2, 4, 8 ≡ 3, 6 ≡ 1. All four elements, so 2 is a generator.
2. Powers of 3: 3, 4, 2, 1. Generator. 4 has order 2 (16 ≡ 1), not a generator.
3. Generators 2 and 3.

The group ⟨a, b : a³ = b² = e, ba = a²b⟩ has order 6. Show it is not abelian.

1. ba = a²b ≠ ab (else a² = a, a = e). So ab ≠ ba.

### Common mistakes

- Thinking every abelian group is cyclic (V₄ is abelian but not cyclic).

## DG12 Isomorphism

*Refs: AQA DG12 · Edexcel FP2 1.5 · OCR 8.03l · MEI Xa7, Xa8. Level: A-level only.*

### What you need to know

- G and H are isomorphic if there is a one-to-one correspondence φ: G → H with φ(a ∗ b) = φ(a) ∘ φ(b). The Cayley tables then match after relabelling.
- Isomorphic groups have the same order and the same number of elements of each order. To show two groups are not isomorphic, find a structural difference (for example one is cyclic and the other is not).

### Worked example

Show that ({1, 2, 3, 4}, × mod 5) is isomorphic to (ℤ₄, + mod 4).

1. Both are cyclic of order 4. Map 2ᵏ ↦ k: 1 ↦ 0, 2 ↦ 1, 4 ↦ 2, 3 ↦ 3.
2. 2ʲ × 2ᵏ = 2^{j+k} corresponds to j + k (mod 4), so the operation is preserved.

Are {1, 5, 7, 11} under × mod 12 and (ℤ₄, +) isomorphic?

1. The first has no element of order 4; ℤ₄ has 1 of order 4. Not isomorphic.

### Common mistakes

- Matching elements without checking that the operation is preserved.

## Check questions

1. a ∗ b = |a − b| on the integers. Show that ∗ is commutative but not associative. [3 marks]
2. Show that the set of matrices [[1, n], [0, 1]], n ∈ ℤ, forms a group under matrix multiplication. [5 marks]
3. Construct the Cayley table for {1, 3, 7, 9} under × mod 10, show it is a group, and find the order of each element. [6 marks]
4. G is a group of order 12. List the possible orders of its subgroups, and explain why G cannot have an element of order 5. [3 marks]
5. Show that the fourth roots of unity {1, i, −1, −i} under multiplication form a cyclic group, and state an isomorphism with (ℤ₄, +). [4 marks]
6. Explain why the group of symmetries of a square (order 8) is not isomorphic to (ℤ₈, +). [2 marks]

## Mark scheme

1. |a − b| = |b − a| (1). Counter-example: (1 ∗ 2) ∗ 3 = 1 ∗ 3 = 2 but 1 ∗ (2 ∗ 3) = 1 ∗ 1 = 0 (2).
2. Product [[1, m + n], [0, 1]], closed (1). Matrix multiplication is associative (1). Identity n = 0 (1). Inverse n ↦ −n (1). All conditions met (1).
3. Table correct (2). Closed, identity 1, inverses 3 ↔ 7, 9 ↔ 9, associativity from multiplication (2). Orders: 1 (1), 9 (2), 3 and 7 (4) (2).
4. 1, 2, 3, 4, 6, 12 (2). 5 does not divide 12, so by Lagrange no element has order 5 (1).
5. i generates: i, −1, −i, 1 (2). iᵏ ↦ k (mod 4) (2).
6. ℤ₈ has an element of order 8; no symmetry of a square has order 8 (rotations have order at most 4, reflections order 2) (2).
