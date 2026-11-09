---
level: A-level
subject: Further Mathematics
topic: "Investigating curves and differential equations with technology"
as_content: "All of this file is A-level only (MEI Further Pure with Technology, Y436). Y436 is being withdrawn: last first teaching September 2026, last exam summer 2028."
boards:
  - board: OCR MEI
    code: "H645"
    spec_refs: ["TC1", "TC2", "TC3", "TC4", "TC5", "TC6", "TC7", "TC9", "TC10", "TC11", "TC12", "TC8", "Tc1", "Tc2", "Tc3", "Tc4", "Tc5", "Tc6"]
refs_checked: false
spec_urls:
  OCR MEI: https://www.ocr.org.uk/qualifications/as-and-a-level/further-mathematics-b-mei-h635-h645-from-2017/
pmt_url: https://www.physicsandmathstutor.com/maths-revision/further-additional-pure/
---

# Investigating curves and differential equations with technology

This file covers the MEI Further Pure with Technology topics on curves and differential equations: families of curves, the vocabulary of curves, converting between Cartesian, parametric and polar forms, tangents, normals and chords, envelopes, asymptotes and cusps, and exploring first order differential equations with tangent fields and software. The numerical solution of differential equations (Tc7 to Tc10) is in [22-numerical-integration-and-step-by-step-methods.md](22-numerical-integration-and-step-by-step-methods.md), arc length (TC8) in [20-arc-length-surface-area-and-reduction-formulae.md](20-arc-length-surface-area-and-reduction-formulae.md), and number theory (TT) in [25-number-theory.md](25-number-theory.md).

## Overview

MEI only. The paper is taken with graphing software, a computer algebra system (CAS) and a spreadsheet; questions ask you to explore, then explain with algebra. Polar curves are in [14-polar-coordinates.md](14-polar-coordinates.md) and conics in [19-conic-sections.md](19-conic-sections.md).

### Board differences

- MEI TC1 to TC12 (investigation of curves) and Tc1 to Tc6 (exploring differential equations). No other board has this option.

## Families of curves and their features

*Refs: MEI TC1, TC2, TC3, TC4, TC5, TC10, TC11, TC12. Level: A-level only.*

### What you need to know

- Plot a family of curves with a parameter (for example y = x³ + ax, or r = 1 + a cos θ) using a slider, and describe how the shape changes.
- Vocabulary: symmetry, asymptote, cusp, loop, point of inflection, stationary point, bounded, periodic.
- Convert between Cartesian, parametric and polar forms.
- Find asymptotes (vertical where the curve goes to infinity at finite x; horizontal or oblique from the behaviour as x → ±∞; in parametric form, as t approaches a value).
- A cusp of a parametric curve occurs where dx/dt = dy/dt = 0 and the curve reverses direction.
- Use limits to describe what happens as the parameter tends to a value.

### Explained

Software shows patterns; algebra explains them. A typical question: "describe how the curve changes as a increases through 0, and prove that every curve in the family passes through a fixed point." Find fixed points by looking for (x, y) that satisfy the equation whatever the parameter is.

### Worked example

The family y = x³ + ax. Describe how the number of stationary points depends on a.

1. dy/dx = 3x² + a.
2. a < 0: two stationary points at x = ±√(−a/3). a = 0: a stationary point of inflection at the origin. a > 0: none.
3. Every member passes through the origin and has rotational symmetry about it (odd function).

Show that the curve x = t², y = t³ has a cusp at the origin.

1. dx/dt = 2t, dy/dt = 3t²; both are 0 at t = 0.
2. For t > 0, y > 0; for t < 0, y < 0, while x > 0 on both sides: the curve comes into the origin and goes back out. Cartesian form y² = x³.

Find the asymptote of x = t/(1 + t³), y = t²/(1 + t³) (the folium) as t → −1.

1. x + y = t(1 + t)/(1 + t³) = t/(1 − t + t²) → −1/3 as t → −1.
2. Asymptote x + y = −1/3.

### Common mistakes

- Describing a family with one example only; show the change at the critical parameter values.

## Tangents, chords and envelopes

*Refs: MEI TC6, TC7, TC9. Level: A-level only.*

### What you need to know

- Find the gradient of a tangent in Cartesian, parametric or polar form, and equations of tangents, normals and chords.
- The envelope of a family of curves F(x, y, t) = 0 is a curve that touches every member. Find it by solving F = 0 and ∂F/∂t = 0 together and eliminating t.

### Worked example

Find the envelope of the lines y = tx − t².

1. F = tx − t² − y. ∂F/∂t = x − 2t = 0, t = x/2.
2. y = x²/2 − x²/4 = x²/4. Each line is a tangent to the parabola y = x²/4.

Find the envelope of the lines x cos t + y sin t = 2.

1. ∂/∂t: −x sin t + y cos t = 0.
2. Squaring and adding: x² + y² = 4. The lines are tangents to a circle of radius 2.

### Common mistakes

- Forgetting to eliminate the parameter.

## Exploring differential equations

*Refs: MEI Tc1, Tc2, Tc3, Tc4, Tc5, Tc6. Level: A-level only.*

### What you need to know

- A tangent field (slope field) for dy/dx = f(x, y) shows short line segments with gradient f at many points. Solution curves follow the segments.
- Isoclines are curves f(x, y) = m along which every segment has gradient m.
- Use software to produce analytical solutions (CAS), tangent fields, and families of solution curves; verify a given solution by substitution.
- Sketch a tangent field by hand for simple equations.

### Worked example

For dy/dx = x − y, find the isoclines, show that one of them is itself a solution, and find the general solution.

1. Isoclines x − y = m: lines y = x − m with gradient 1.
2. On the isocline m = 1, y = x − 1, the slope is 1, which matches the line's own gradient. So y = x − 1 is a solution.
3. Integrating factor eˣ: (yeˣ)′ = xeˣ, yeˣ = (x − 1)eˣ + C, y = x − 1 + Ce^{−x}.
4. Every solution curve approaches the line y = x − 1 as x → ∞.

Verify that y = 1/(C − x) satisfies dy/dx = y².

1. dy/dx = 1/(C − x)² = y² ✓. Each solution has a vertical asymptote at x = C.

### Common mistakes

- Drawing tangent-field segments with the wrong gradient sign in some quadrants; check a few points.

## Check questions

1. For the family y = x/(x² + a), describe the graph for a > 0, a = 0 and a < 0, including asymptotes. [6 marks]
2. Find the points where the curve x = cos 2t, y = sin 3t has a vertical tangent for 0 ≤ t < π. [4 marks]
3. Find the envelope of the family of lines x/t + ty = 2 (t ≠ 0). [4 marks]
4. For dy/dx = y/x, describe the tangent field and find the general solution. [3 marks]
5. Show that every curve in the family y = ax² + (1 − a)x passes through two fixed points, and find them. [3 marks]

## Mark scheme

1. a > 0: defined everywhere, through O, horizontal asymptote y = 0, max and min at x = ±√a (2). a = 0: y = 1/x, asymptotes the axes (2). a < 0: vertical asymptotes x = ±√(−a), through O, y = 0 asymptote (2).
2. dx/dt = −2 sin 2t = 0 (1) with dy/dt = 3 cos 3t ≠ 0 (1). t = 0 gives (1, 0); t = π/2 gives (−1, −1) (2).
3. F = x/t + ty − 2; ∂F/∂t = −x/t² + y = 0, so x = yt² (2). Substitute: yt + yt = 2, t = 1/y (1). x = 1/y, so xy = 1 (1).
4. Segments point along lines through the origin (each segment at (x, y) has gradient y/x) (1). y = Cx (2).
5. y − x = a(x² − x) (1). For all a: x² − x = 0 and y = x (1). (0, 0) and (1, 1) (1).
