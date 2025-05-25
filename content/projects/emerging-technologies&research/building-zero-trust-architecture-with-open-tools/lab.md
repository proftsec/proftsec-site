---
title: "ETR-3: Zero Trust Architecture Lab"
description: "Implement a simulated Zero Trust environment using pfSense, Docker, and VPN tools to model identity-aware access and traffic segmentation."
date: 2025-03-22
tags: ["Zero Trust", "Network Security", "Segmentation", "Access Control"]
categories: ["Emerging Technologies & Research"]
draft: false
---

# ETR-3: Zero Trust Architecture Lab

## **Overview**
This hands-on lab will help you implement a small-scale Zero Trust Architecture (ZTA) using open-source tools. You’ll simulate secure access control, segmentation, and monitoring between multiple internal services.

---

## **Lab Instructions**

### **1. Lab Setup: Tools and Environment**
You will need:
- pfSense (in a VM or installed on Proxmox/VirtualBox)
- Docker and Docker Compose
- OpenVPN or WireGuard for identity-based remote access
- Optional: Suricata or Snort for traffic monitoring

#### **Network Design:**
- **Segment A:** Trusted Users (e.g., Admin Workstation)
- **Segment B:** Internal Web App (Docker container)
- **Segment C:** Sensitive Service (Database container)
- All traffic flows controlled via pfSense firewall rules

---

### **2. Build the Network Segments in Docker**
Create an isolated Docker network and simulate services:
```yaml
version: '3'
services:
  webapp:
    image: httpd
    networks:
      - segment_b

  db:
    image: mariadb
    environment:
      MYSQL_ROOT_PASSWORD: secret
    networks:
      - segment_c

networks:
  segment_b:
  segment_c:
```

---

### **3. Configure pfSense for Zero Trust Principles**
1. Create VLANs or virtual interfaces for each segment
2. Apply firewall rules:
   - Deny all traffic by default
   - Allow webapp-to-db access only from approved source
   - Require VPN tunnel for administrative access
3. Set up Suricata for East-West traffic inspection

---

### **4. Identity-Based Remote Access with VPN**
1. Install and configure OpenVPN or WireGuard on pfSense
2. Create user accounts with unique certs or keys
3. Test secure access to services from a remote device via VPN

📝 **Checkpoint:** Can the user access only the permitted service? Can lateral movement occur?

---

### **5. Simulate an Insider Threat or Breach Attempt**
1. Attempt to access the database from a container in segment B
2. Verify that pfSense blocks unauthorized East-West traffic
3. Use Suricata or firewall logs to detect and analyze the attempt

---

### **6. Just-in-Time Access & Auditing (Optional Challenge)**
- Set up temporary firewall rules triggered by authenticated sessions
- Log access windows and automate rule expiry
- Capture logs for later analysis and auditing

---

## **Final Submission**
Submit a short report including:
- Network diagram of your Zero Trust layout
- Screenshots of pfSense firewall rules and VPN configuration
- Documentation of traffic flow enforcement and detection
- Reflection: How does Zero Trust differ from traditional perimeter models?

🚀 **Great work! You’ve just built a Zero Trust lab using real tools!** 🚀
