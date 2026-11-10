---
level: A-level
subject: Computer Science
topic: "Types of software systems and their uses: safety-related systems, industrial, technical and scientific uses, control systems and automation, expert systems, and internet and intranet applications"
as_content: "Eduqas content. Eduqas does not separate AS content within its A-level specification."
boards:
  - board: Eduqas
    code: "A500QS"
    spec_refs: ["C2.7: Safety related systems", "C2.7: Industrial, technical and scientific", "C2.7: Control systems", "C2.7: Expert systems", "C2.7: Internet and Intranet"]
refs_checked: false
spec_urls:
  Eduqas: https://www.eduqas.co.uk/qualifications/computer-science-as-a-level/
pmt_url: https://www.physicsandmathstutor.com/computer-science-revision/
---

# Software systems and applications

This file covers the Eduqas content on why different kinds of software systems are needed: safety-related and safety-critical systems, computers in weather forecasting, computer-aided design, robotics and computer graphics and animation, control systems and automation, expert systems, and the internet and intranets (search engines, contemporary applications and their effects). Types of software (open source, bespoke, off-the-shelf) are in [21-software-languages-and-translators.md](21-software-languages-and-translators.md); search engine indexing in [35-web-technologies.md](35-web-technologies.md); wider ethical issues in [26-consequences-ethics-and-law.md](26-consequences-ethics-and-law.md).

### Board differences

Only Eduqas A500QS names this content. AQA and OCR touch on some of it through ethics (file 26), AI and automated decisions (OCR 1.5.2), and real-time and embedded systems (OCR 1.2.1(e), file 34).

## Safety-related systems

*Refs: Eduqas C2.7: Safety related systems.*

### What you need to know

- A safety-related (safety-critical) system is one whose failure could cause death, injury, serious damage to property or the environment. Examples: aircraft flight control (fly-by-wire), railway signalling, nuclear power station control, medical devices (pacemakers, radiotherapy machines, infusion pumps), car braking and airbag systems, air traffic control.
- They need a very high level of dependability: reliability (works correctly for long periods), availability (works when needed), safety (fails in a safe way), and security (cannot be tampered with).
- Developing them is a highly specialised field:
  - rigorous, documented development methods, often waterfall-based, following industry standards and regulators' approval;
  - formal methods: mathematical specification and proof that the software meets its specification;
  - very extensive testing, including simulation of failures, and independent checking;
  - redundancy: duplicated (often triplicated) hardware and software, sometimes written by separate teams, with voting between them so one failure does not cause disaster;
  - fail-safe design: if a fault is detected, the system goes to a safe state (trains stop, reactor shuts down);
  - restricted, carefully chosen languages and coding standards; careful change control.
- So they take longer and cost far more to build than ordinary software.

## Industrial, technical and scientific uses

*Refs: Eduqas C2.7: Industrial, technical and scientific.*

### What you need to know

- Weather forecasting: data is collected continuously from weather stations, satellites, balloons, ships and aircraft (temperature, pressure, humidity, wind). Supercomputers run numerical models: the atmosphere is divided into a 3D grid, and the equations of physics are applied to each cell to predict how conditions change over small time steps. Running many slightly different models (ensembles) gives probabilities. Needs huge processing power and parallel processing; results are visualised as maps. Accuracy falls the further ahead the forecast, because small errors grow.
- Computer-aided design (CAD): software for designing products, buildings and circuits in 2D and 3D. Benefits: precise drawings that are quick to change; designs viewed from any angle and in 3D; simulation and testing of designs (stress, airflow) before anything is built; parts libraries; designs shared electronically; links to computer-aided manufacture (CAM) where the design directly drives machines (CNC machines, 3D printers). Drawbacks: expensive software and training; powerful hardware needed.
- Robotics: robots are programmable machines with sensors, processors and actuators (motors, grippers). Uses: manufacturing (car assembly, welding, painting), warehouses, surgery, bomb disposal, space and deep-sea exploration, cleaning and delivery. Advantages: work continuously and consistently, precise, can work in dangerous places. Disadvantages: expensive to buy and program, less flexible for unexpected situations, job losses.
- Computer-generated graphics and animation: used in films, games, advertising, architecture visualisation, training simulators (flight simulators), medical imaging and scientific visualisation. Techniques include 3D modelling, rendering (lighting, shading, textures), motion capture, and physics simulation. Rendering is very processor-intensive and uses GPUs and render farms (file 23).

## Control systems and automation

*Refs: Eduqas C2.7: Control systems.*

### What you need to know

- Computer control: a computer uses sensors to measure the physical world, processes the readings against set values (with programmed rules), and uses actuators (motors, valves, heaters, pumps) to change it.
- Feedback (closed loop): the output affects the next inputs. For example, a greenhouse system reads the temperature; if it is below the set point, it switches on the heater; when the temperature rises, the sensor detects this and the heater is switched off. The loop repeats continuously.
- Analogue sensor readings pass through an ADC; signals to analogue actuators go through a DAC (file 19).
- Scope: domestic (central heating, washing machines), transport (traffic lights, engine management, cruise control, autopilots), industry (chemical plants, production lines), buildings (lifts, lighting, security), agriculture, and medicine.
- Benefits of automation: runs 24 hours a day; responds faster and more accurately and consistently than people; works in dangerous environments; reduces labour costs; can lower energy use and waste.
- Implications: initial cost; job losses and need for retraining; reliance on technology (failure can stop production or be dangerous, so needs monitoring and manual override); security risks if networked; fewer people with the skill to do the task by hand.

```python
# a simple feedback control loop (simulated)
set_point = 22.0
def control_step(temp, heater_on):
    if temp < set_point - 0.5:
        heater_on = True
    elif temp > set_point + 0.5:
        heater_on = False          # small band stops rapid on/off switching
    return heater_on
```

## Expert systems

*Refs: Eduqas C2.7: Expert systems.*

### What you need to know

- An expert system is software that gives advice or makes decisions in a specialised area at the level of a human expert. Uses: medical diagnosis, fault-finding in cars or machinery, financial and credit decisions, legal advice, mineral prospecting, plant and animal identification, chess.
- Parts:
  - knowledge base: facts and rules (often IF … THEN rules) gathered from human experts by a knowledge engineer;
  - inference engine: applies the rules to the facts and the user's answers to reach conclusions (by forward or backward chaining);
  - user interface: asks the user questions and shows the conclusions, often with an explanation of the reasoning and a confidence level.
- Purpose and significance: makes expert knowledge available widely, anywhere and at any time, consistently, and preserves knowledge when experts retire; can handle more facts than a person; cheaper than consulting an expert each time.
- Effects on professional groups and the wider community:
  - professionals (doctors, lawyers, engineers) may be supported in their work, with faster and more consistent decisions, but some routine work is taken over, so roles change and some jobs may be lost; risk of deskilling and of over-reliance;
  - the public gains access to advice they could not otherwise get or afford (remote areas, developing countries);
  - concerns: the system is only as good as its rules; it has no common sense or empathy; it cannot handle situations outside its rules; who is responsible if its advice is wrong (legal liability)?

### Worked example

Fragment of a fault-finding knowledge base for a car that will not start:

```
IF engine does not turn over AND lights are dim THEN battery is flat (90%)
IF engine turns over AND fuel gauge reads empty THEN out of fuel (95%)
IF engine turns over AND fuel present AND smell of petrol THEN engine flooded (70%)
```

The inference engine asks "Does the engine turn over?"; if the user answers no, it asks about the lights and concludes "battery flat", explaining which rule it used.

## Internet and intranet

*Refs: Eduqas C2.7: Internet and Intranet.*

### What you need to know

- The internet is the global public network of networks (file 28). An intranet is a private network inside an organisation that uses the same technologies (web pages, email, TCP/IP) but can only be accessed by its members (staff, students), for internal news, documents, forms and systems. An extranet gives selected outsiders (suppliers, partners) controlled access.
- Use of search engines: see [35-web-technologies.md](35-web-technologies.md) for how they work and how to search effectively.
- Common contemporary applications: the web and online shopping, email and instant messaging, social media, video and music streaming, online banking, cloud storage and software, video calls and remote working, e-learning, online government services, telemedicine, the Internet of Things (smart home devices), and online news.
- Effects on professional groups: easier collaboration and remote work; instant access to research and information; new services and markets; but changing roles (travel agents, bank tellers, journalists and retail staff are affected by online services), pressure to be always available, and new skills needed.
- Effects on the wider community: easy access to information, education and services; communication across the world; new jobs and businesses; but a digital divide between those with and without access or skills; misinformation; cyber crime; privacy concerns; effects on high streets; online harassment; addiction and wellbeing concerns.

## Common mistakes

- Defining an intranet as "a small internet". It is a private network using internet technologies, restricted to an organisation.
- Saying an expert system "thinks like a human". It applies stored rules through an inference engine.
- Describing a control system without the feedback step.

## Check questions

1. Explain what is meant by a safety-critical system and give two examples. [3 marks]
2. Describe three techniques used when developing safety-critical systems. [3 marks]
3. Explain how computers are used to produce weather forecasts and why forecasts become less accurate further ahead. [4 marks]
4. Give three advantages of CAD over drawing by hand. [3 marks]
5. Describe how a computer controls the temperature in a greenhouse. [4 marks]
6. Discuss the benefits and implications of automating a car factory. [4 marks]
7. Describe the three main parts of an expert system. [3 marks]
8. Discuss the possible effects of medical expert systems on doctors and on patients. [4 marks]
9. Explain the difference between the internet and an intranet. [2 marks]
10. Discuss two effects of the internet on a professional group of your choice. [2 marks]

## Mark scheme

1. A system whose failure could cause death, injury or serious damage (1); two examples such as aircraft flight control, railway signalling, pacemaker, nuclear plant control (2).
2. Any three: formal methods/mathematical proof (1); extensive independent testing and simulation (1); redundancy with voting (1); fail-safe design (1); following strict standards and documentation (1).
3. Data collected from many sources such as satellites and weather stations (1); supercomputers run models dividing the atmosphere into a grid and applying physics equations over time steps (1); outputs visualised (1); small errors in starting data grow over time, so accuracy falls (1).
4. Any three: easy to edit and change (1); precise measurements (1); 3D views from any angle (1); simulation/testing before building (1); links to CAM (1); easy to share (1).
5. Temperature sensor measures the air temperature (1); ADC converts the reading for the computer (1); computer compares with the set value (1); switches heater/vents on or off through actuators, and the loop repeats (feedback) (1).
6. Benefits: continuous working, consistent quality, precision, safety in dangerous tasks, lower long-term costs (2). Implications: high cost, job losses/retraining, reliance on technology and maintenance, less flexibility (2).
7. Knowledge base of facts and rules (1); inference engine that applies the rules to reach conclusions (1); user interface that asks questions and gives conclusions/explanations (1).
8. Doctors: support for diagnosis, faster and more consistent; but deskilling/over-reliance and changing roles (2). Patients: access to advice in remote areas, quicker diagnosis; but lack of empathy, errors and unclear responsibility if the advice is wrong (2).
9. Internet: global public network of networks (1); intranet: private network within an organisation using internet technologies, accessible only to its members (1).
10. Any two relevant effects for the chosen group, e.g. for journalists: news published instantly online; falling print sales and jobs (2).
