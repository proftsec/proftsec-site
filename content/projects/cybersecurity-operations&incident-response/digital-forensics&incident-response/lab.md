---
title: "Digital Forensics & Incident Response Lab"
description: "Perform forensic investigations, extract system artifacts, and analyze digital evidence."
date: 2025-03-08
tags: ["Digital Forensics", "Incident Response", "DFIR", "Memory Analysis", "Cyber Investigations"]
categories: ["Cybersecurity Operations & Incident Response"]
draft: false
---

# **Digital Forensics & Incident Response Lab**

## **Overview**
In this hands-on lab, you will learn how to analyze **digital evidence**, extract forensic artifacts, and reconstruct cyber incidents. You will work with **disk and memory forensics**, system logs, and forensic timelines to investigate potential security breaches.

---

## **Lab Instructions**

### **1. Setting Up Your Environment**
You will need:
- A **Debian-based forensic workstation** (Kali Linux, SIFT Workstation, or REMnux)
- Tools: `Autopsy`, `Sleuth Kit`, `Volatility`, `Plaso`, `log2timeline`

#### **Install Required Tools**
```bash
sudo apt update && sudo apt install autopsy sleuthkit volatility plaso
```

---

### **2. Disk Forensics with Autopsy & Sleuth Kit**

#### **Step 1: Acquire an Image**
Download a sample forensic image (e.g., `evidence.dd`):
```bash
wget https://example.com/sample-disk-image.dd -O evidence.dd
```

#### **Step 2: Load the Image into Autopsy**
1. Open Autopsy: `autopsy &`
2. Create a new case and add `evidence.dd` as a **disk image**.
3. Navigate through file system artifacts to locate deleted or suspicious files.

📝 **Proof of Completion**: Take a screenshot of your findings in Autopsy.

---

### **3. Memory Forensics with Volatility**

#### **Step 1: Identify Memory Image Profile**
```bash
volatility -f memory.img imageinfo
```

#### **Step 2: Extract Running Processes**
```bash
volatility -f memory.img --profile=<PROFILE> pslist
```

#### **Step 3: Detect Malicious Network Connections**
```bash
volatility -f memory.img --profile=<PROFILE> netscan
```

📝 **Proof of Completion**: Document and analyze any suspicious processes or network connections.

---

### **4. Timeline Analysis with Plaso & log2timeline**

#### **Step 1: Generate a Timeline from Logs**
```bash
log2timeline.py plaso.dump /var/log/syslog
```

#### **Step 2: Analyze the Timeline**
```bash
psort.py -o l2tcsv plaso.dump "date > '2025-03-07'"
```

📝 **Proof of Completion**: Generate a report summarizing suspicious activity based on forensic timelines.

---

## **Final Submission**
- Submit a **Google Doc** with:
  - Screenshots of **forensic analysis results, Autopsy findings, and memory analysis**.
  - A **summary report** reconstructing a cyber incident timeline.
- Ensure all steps are documented and properly labeled.

🚀 **Congratulations! You've completed the Digital Forensics & Incident Response Lab!** 🚀
