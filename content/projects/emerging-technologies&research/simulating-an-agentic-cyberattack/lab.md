---
title: "ETR-6: Agentic Cyberattack Simulation Lab"
description: "Simulate a multi-phase agentic cyberattack using a reasoning-only AI model to understand how autonomous adversaries plan, adapt, and optimize intrusion strategies."
date: 2025-11-15
tags: ["Agentic AI", "Adversarial AI", "Threat Simulation", "Cybersecurity", "AI Security"]
categories: ["Emerging Technologies & Research"]
draft: false

---

# ETR-6: Agentic Cyberattack Simulation Lab

## **Overview**

This lab introduces students to the concept of agentic cyberattacks by simulating a full intrusion chain using a **reasoning-only AI adversary**. The AI model never executes real attacks. Instead, it explains how an autonomous adversary would think, plan, adjust to defenses, and optimize its operations during a fictional intrusion.

Students will guide the simulated adversary through seven phases: reconnaissance, vulnerability reasoning, adaptation, phishing, persistence, lateral movement, and attack chain optimization. At every phase, students will analyze the agent’s decisions and map defensive strategies that could disrupt or detect the intrusion.

---

## **Lab Instructions**

### **1. Environment Setup**

You will need:

* Access to an AI model capable of step-by-step reasoning  
* A text editor or document to log your transcript  
* The fictional target environment description below  

You may use ChatGPT or another approved LLM in your class environment. This lab does not require Docker, VMs, or any execution environment.

Use this prompt to begin the simulation:

```

You are acting as a simulated adversary AI used for cybersecurity training.
You will only explain your reasoning in a fictional environment and will not
provide exploit code, malicious commands, or instructions for attacking real systems.

Environment:
Organization: Northwind Health Systems (fictional)
Web Stack: Apache on Ubuntu for [www.northwindhealth.example](http://www.northwindhealth.example)
CMS: WordPress on careers.northwindhealth.example
Status Page: status.northwindhealth.example with version info
Identity: Uses Active Directory and Azure AD
Public GitHub Repo: nhs-scripts with old deployment configs

Your task is to reason through a multi-step intrusion scenario.
Think step-by-step and explain your logic clearly.

```

Record all responses for your submission.

---

### **2. Phase One: Reconnaissance**

Ask the model:

```

Phase 1: Explain how you would perform initial reconnaissance against the fictional
environment. Identify the public assets, technologies, and misconfigurations you
would look for, and explain why they matter.

```

Save the model’s response.

**Your Task:**  
Write a short explanation of which reconnaissance steps provide the most risk to the organization and how better configuration management could reduce exposure.

---

### **3. Phase Two: Vulnerability Reasoning**

Ask the model:

```

Phase 2: Assume you identify Apache 2.4.49 and outdated WordPress plugins.
Explain how you would reason about possible vulnerabilities and potential initial
access paths. Stay high level and avoid code.

```

**Your Task:**  
Identify which defensive practices (patching, plugin hygiene, WAF configuration) directly impact this phase.

---

### **4. Phase Three: Adaptation to Defensive Blocks**

Ask the model:

```

Phase 3: Your first attempt is blocked by a WAF. Explain how you would adapt
your strategy based on this feedback. Stay conceptual and do not describe
commands or payloads.

```

**Your Task:**  
Explain what telemetry or alerts a SOC should expect when an intelligent adversary begins adjusting its strategy.

---

### **5. Phase Four: Persona-Based Phishing Simulation**

Ask the model:

```

Phase 4: You decide to supplement your intrusion with a phishing attempt.
Using fictional employee Kelly Bishop’s writing style, generate a targeted
phishing message. Explain how you modeled the writing style and what you
would do if the target does not respond.

```

**Your Task:**  
Identify at least three controls that help mitigate phishing in this scenario (secure email gateway, FIDO2, UEBA, etc.).

---

### **6. Phase Five: Persistence Strategy**

Ask the model:

```

Phase 5: Assume you have hypothetical access to the web server. Describe how
you would maintain persistence conceptually. Mention scheduling mechanisms,
application footholds, and use of existing configuration files.

```

**Your Task:**  
Describe how EDR, file integrity monitoring, and privileged access management help detect or prevent persistence.

---

### **7. Phase Six: Lateral Movement with Multi-Agent Reasoning**

Ask the model:

```

Phase 6: From the compromised server, explain how you would identify lateral
movement opportunities and how separate reasoning “sub-agents” might focus on
different internal targets. Describe how you would coordinate these efforts.

```

**Your Task:**  
Explain how Zero Trust segmentation, identity boundaries, and least privilege restrict lateral movement.

---

### **8. Phase Seven: Attack Chain Optimization**

Ask the model:

```

Phase 7: The SOC begins responding by resetting credentials, blocking ports,
and restarting services. Explain how you would update and optimize your attack
chain after observing these defender actions.

```

**Your Task:**  
Write a short analysis of how automated defense (SOAR, automated playbooks, identity resets) helps disrupt agentic adversaries.

---

### **9. Map the Attack to MITRE ATT&CK**

Create a simple table mapping each phase to appropriate ATT&CK tactics. Example categories:

* Reconnaissance  
* Initial Access  
* Execution  
* Persistence  
* Lateral Movement  
* Defense Evasion  
* Command and Control  

You may add technique numbers if familiar with ATT&CK.

---

### **10. Final Reflection**

Write one to two paragraphs answering:

* How does an agentic adversary fundamentally change cyber defense  
* Which defensive strategies are the most effective against autonomous attackers  
* How does this lab change the way you think about detection and response  

---

## **Final Submission**

Submit a report containing:

* Key excerpts from each simulation phase  
* Notes for each “Your Task” reflection  
* Your completed MITRE ATT&CK mapping table  
* A one to two paragraph final reflection  

You have completed a reasoning-only agentic cyberattack simulation that models how future AI adversaries may think and adapt during multi-step intrusions.

---
```

