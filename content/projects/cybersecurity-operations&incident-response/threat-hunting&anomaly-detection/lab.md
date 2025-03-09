---
title: "Threat Hunting & Anomaly Detection Lab"
description: "Develop proactive threat hunting techniques to identify security anomalies and potential cyber threats."
date: 2025-03-08
tags: ["Threat Hunting", "Anomaly Detection", "Cyber Threats", "Security Monitoring"]
categories: ["Cybersecurity Operations & Incident Response"]
draft: false
---

# Threat Hunting & Anomaly Detection Lab

## **Overview**
Threat hunting is a proactive cybersecurity approach that involves identifying potential security threats before they cause harm. This lab introduces students to **threat hunting techniques, anomaly detection strategies, and behavioral analysis methods** to detect advanced threats that evade traditional security tools.

---

## **Lab Instructions**

### **1. Setting Up Your Environment**
You will need:
- A **SIEM platform** (Splunk, Wazuh, or ELK Stack)
- Access to **MITRE ATT&CK, VirusTotal, and AlienVault OTX**
- A dataset containing logs from a simulated network breach (provided by instructor)

#### **Install required tools (if using Wazuh on Debian-based OS)**
```bash
sudo apt update && sudo apt install wazuh-agent
```

---

### **2. Collecting Security Data for Threat Hunting**
Threat hunters use logs from multiple sources, including:
- **System event logs** (Windows Event Viewer, Syslog)
- **Network traffic logs** (Zeek, Suricata, Wireshark captures)
- **Endpoint logs** (EDR, antivirus, PowerShell command history)

#### **Step 1: Load logs into your SIEM**
1. Upload the provided log dataset into Splunk or Wazuh.
2. Run initial queries to filter logs by time range, event type, and severity.

#### **Step 2: Identify Suspicious IPs and Domains**
1. Open [AlienVault OTX](https://otx.alienvault.com) and check for recent malicious indicators.
2. Compare the dataset's IP addresses with threat intelligence feeds.
3. Flag any suspicious domains or repeated unauthorized login attempts.

📝 **Proof of Completion:** Take a screenshot of the flagged threats in your SIEM.

---

### **3. Detecting Anomalies & Unusual Behavior**
Cyber adversaries often try to remain undetected by avoiding known attack patterns. Threat hunters must look for **deviations from normal behavior**.

#### **Step 1: Create Baseline Behavior Profiles**
1. Identify normal user activity in the logs (e.g., working hours, access patterns).
2. Look for outliers, such as login attempts from unusual locations or at odd hours.
3. Identify anomalies like unauthorized privilege escalation or excessive failed login attempts.

#### **Step 2: Investigate Suspicious Processes & Scripts**
1. Query logs for unusual PowerShell executions.
2. Search for unauthorized software installations or script execution.
3. Flag any attempts to disable security monitoring.

📝 **Proof of Completion:** Document one **unusual behavior** you identified and explain why it could be a threat.

---

### **4. Implementing Threat Hunting Queries**
Threat hunters use structured queries to detect anomalies in security logs.

#### **Step 1: Run a Query to Detect Repeated Failed Logins in Splunk**
```splunk
index=security_logs sourcetype=windows_security_log
| where EventCode=4625
| stats count by User, SourceIP
| sort -count
```

#### **Step 2: Detect Suspicious PowerShell Activity in Wazuh**
```json
{
  "query": "data.win.system.eventID: 4104 AND data.win.system.providerName: 'PowerShell' AND data.win.event_data.ScriptBlockText: '*Invoke-Mimikatz*'"
}
```

📝 **Proof of Completion:** Take a screenshot of query results showing potential threats.

---

## **Final Submission**
- Submit a **Google Doc** with:
  - Screenshots of **threat intelligence lookups, anomaly detection results, and query outputs**.
  - A **short write-up** explaining the most significant threat you identified.
- Ensure all steps are documented and properly labeled.

🚀 **Congratulations! You've completed the Threat Hunting & Anomaly Detection Lab!** 🚀

