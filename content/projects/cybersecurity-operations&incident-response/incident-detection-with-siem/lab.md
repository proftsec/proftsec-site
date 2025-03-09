---
title: "Project 13: Incident Detection with SIEM"
description: "Learn how to use Security Information and Event Management (SIEM) tools for log analysis, anomaly detection, and security monitoring."
date: 2025-03-08
tags: ["SIEM", "Log Analysis", "Threat Detection", "Security Monitoring"]
categories: ["Cybersecurity Operations & Incident Response"]
draft: false
---

# Incident Detection with SIEM

## Overview
Security Information and Event Management (SIEM) tools allow security teams to collect, analyze, and correlate security events across an organization’s IT infrastructure. This lab provides hands-on experience configuring and using SIEM platforms to detect security incidents and automate response mechanisms.

## What You Will Learn
- Setting up and configuring a SIEM platform (Wazuh, Splunk, or ELK Stack)
- Collecting and analyzing security logs
- Detecting anomalies and security threats using SIEM alerts
- Correlating security events from multiple sources
- Creating custom dashboards for real-time security monitoring

---

## Lab Instructions

### **1. Setting Up Your SIEM Environment**
You will need:
- A **Debian or Ubuntu Linux VM**
- A SIEM platform of choice (**Wazuh**, **Splunk Free**, or **ELK Stack**)
- Administrator/root access to configure log collection

#### **Step 1: Install Wazuh (Example SIEM Setup)**
```bash
curl -sO https://packages.wazuh.com/4.x/wazuh-install.sh
sudo bash wazuh-install.sh
```

🔎 **Alternative:** If using **Splunk**, download Splunk Free from [Splunk Downloads](https://www.splunk.com/download).

#### **Step 2: Verify Installation**
```bash
systemctl status wazuh-manager
```
Ensure the service is running before proceeding.

---

### **2. Configuring Log Collection**

SIEM tools rely on logs from different sources for detection. Configure **syslog** forwarding to send logs to your SIEM.

#### **Step 1: Enable Syslog Forwarding**
```bash
echo '*.* @127.0.0.1:514' | sudo tee -a /etc/rsyslog.conf
sudo systemctl restart rsyslog
```
This forwards system logs to the SIEM for analysis.

#### **Step 2: Verify Log Ingestion**
Search for logs in Wazuh or Splunk’s dashboard to confirm data is being received.

---

### **3. Detecting Security Threats with SIEM Alerts**

Create rules to detect anomalies in logs.

#### **Step 1: Create a Custom Detection Rule (Wazuh Example)**
Edit **/var/ossec/rules/local_rules.xml** and add:
```xml
<group name="custom_rules">
  <rule id="100001" level="7">
    <decoded_as>syslog</decoded_as>
    <description>Unauthorized login attempt detected</description>
    <match>Failed password</match>
  </rule>
</group>
```

Save and restart Wazuh:
```bash
systemctl restart wazuh-manager
```

#### **Step 2: Generate a Test Alert**
Trigger a failed SSH login to test the rule:
```bash
ssh fakeuser@localhost
```
Check Wazuh’s **Alerts** dashboard for a triggered rule.

---

### **4. Creating a Security Monitoring Dashboard**

#### **Step 1: Navigate to Kibana (if using Wazuh/ELK)**
```bash
http://<YOUR_SIEM_IP>:5601
```

#### **Step 2: Build a Custom Dashboard**
- Add visualizations for **failed logins**, **network traffic spikes**, and **privileged access attempts**.
- Use the query:
```kql
failed login attempts AND user=root
```

---

## **Final Submission**
- Submit a **Google Doc** with screenshots of:
  - SIEM installation verification
  - Log ingestion confirmation
  - Alert triggering for failed logins
  - Security monitoring dashboard
- Ensure each screenshot has a **caption** explaining the step completed.

🚀 **Congratulations! You've completed Incident Detection with SIEM!** 🚀

