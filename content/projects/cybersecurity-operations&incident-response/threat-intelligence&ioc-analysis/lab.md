---
title: "Threat Intelligence & IOC Analysis"
description: "Learn how to gather and analyze threat intelligence, identify Indicators of Compromise (IOCs), and apply them to cybersecurity defense strategies."
date: 2025-03-08
tags: ["Threat Intelligence", "IOC Analysis", "Cyber Threats", "Security Monitoring"]
categories: ["Cybersecurity Operations & Incident Response"]
draft: false
---

# Threat Intelligence & IOC Analysis

## Overview
Cyber threat intelligence enables security professionals to **identify**, **analyze**, and **respond** to cyber threats effectively. This lab will teach you how to collect, analyze, and apply **Indicators of Compromise (IOCs)** to security monitoring.

---

## Lab Instructions

### **1. Setting Up Your Environment**
You will need:
- A **Linux or Windows VM**
- Access to **AlienVault OTX**, **VirusTotal**, and **MITRE ATT&CK**
- A SIEM tool (Wazuh, Splunk) installed for IOC analysis  

---

### **2. Collecting Threat Intelligence Data**
Threat intelligence comes from many sources, including **open-source feeds, security vendors, and malware analysis platforms**.

#### **Step 1: Search for IOCs using AlienVault OTX**
1. Go to [AlienVault OTX](https://otx.alienvault.com).
2. Create an account and log in.
3. Search for a recent threat (e.g., "Emotet malware").
4. Identify IPs, domains, and file hashes associated with the attack.
5. Copy the IOCs for later analysis.

📝 **Proof of Completion**: Take a screenshot of the **threat report page**.

---

### **3. Analyzing Malicious IOCs**
Once you have threat intelligence data, the next step is to analyze it.

#### **Step 1: Check IP and Domain Reputation**
1. Open [VirusTotal](https://www.virustotal.com).
2. Paste an IP address or domain from your OTX results.
3. Review detection results from different security vendors.
4. Determine if the IOC is **malicious, suspicious, or clean**.

#### **Step 2: Investigate File Hashes**
1. Copy a malware file hash (SHA256) from OTX.
2. Search for it on VirusTotal and Hybrid Analysis.
3. Review the **behavioral analysis** of the file.

📝 **Proof of Completion**: Submit a report summarizing whether the IOCs are malicious or false positives.

---

### **4. Applying IOCs to a SIEM**
To detect threats in a live environment, security analysts **apply IOCs** to SIEM tools.

#### **Step 1: Configure Wazuh to Detect IOCs**
1. Open Wazuh’s **Kibana dashboard**.
2. Navigate to **Threat Intelligence > Custom Rules**.
3. Add a rule for a **malicious IP or domain** from your OTX findings.
4. Enable logging to trigger alerts if the IOC appears in logs.

#### **Step 2: Check Security Logs for IOC Matches**
1. Upload a sample log file containing **malicious IPs**.
2. Use **regex searches** to find known IOCs.
3. If a match is found, **generate an alert** in the SIEM.

📝 **Proof of Completion**: Take a screenshot of your **custom IOC rule** and **alerts in Wazuh**.

---

## **Final Submission**
- Submit a **Google Doc** with:
  - Screenshots of **threat intelligence reports, IOC analysis, and SIEM alerts**.
  - A **short write-up** summarizing your findings.
- Ensure all steps are documented and properly labeled.

🚀 **Congratulations! You've completed Threat Intelligence & IOC Analysis!** 🚀
