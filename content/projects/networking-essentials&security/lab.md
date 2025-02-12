---
title: "Networking Essentials & Security Lab"
description: "Hands-on exercises for analyzing network traffic with Wireshark and configuring a secure WireGuard VPN."
date: 2025-02-11
tags: ["Networking", "Wireshark", "VPN", "Security"]
categories: ["Projects"]
draft: false
---

# Networking Essentials & Security Lab

## **1️⃣ Capturing and Analyzing Network Traffic with Wireshark**
### **Step 1: Install Wireshark**
- Download and install Wireshark from [Wireshark.org](https://www.wireshark.org/).
- Ensure you have the necessary permissions to capture network traffic.

### **Step 2: Capture Network Traffic**
- Open Wireshark and select your network interface.
- Click **Start Capture** and browse websites to generate traffic.
- Stop the capture after 2 minutes.

### **Step 3: Filter and Analyze Packets**
- Use **tcp**, **udp**, or **http** as display filters.
- Locate and inspect HTTP packets to identify unencrypted traffic.
- Use **Follow TCP Stream** to view communication between clients and servers.

### **Step 4: Identifying Security Risks**
- Locate an **HTTP login request** and extract credentials.
- Compare it to an **HTTPS** request to observe encryption.

---

## **2️⃣ Configuring a Secure VPN with WireGuard**
### **Step 1: Install WireGuard**
On **Debian Linux:**
```bash
sudo apt update && sudo apt install wireguard -y
```
On **Windows:**
- Download and install WireGuard from [WireGuard.com](https://www.wireguard.com/install/).

### **Step 2: Generate Key Pairs**
On **Debian:**
```bash
wg genkey | tee privatekey | wg pubkey > publickey
```
On **Windows:**
- Open WireGuard and generate a new tunnel.

### **Step 3: Configure the WireGuard Server**
Edit the configuration file on **Debian:**
```bash
sudo nano /etc/wireguard/wg0.conf
```
Add the following:
```ini
[Interface]
Address = 192.168.50.1/24
ListenPort = 51820
PrivateKey = <Your-Private-Key>
SaveConfig = true

[Peer]
PublicKey = <Client-Public-Key>
AllowedIPs = 192.168.50.2/32
```
Enable the VPN:
```bash
sudo systemctl enable wg-quick@wg0
sudo systemctl start wg-quick@wg0
```

### **Step 4: Configure the WireGuard Client**
Add the following to the client tunnel:
```ini
[Interface]
Address = 192.168.50.2/24
PrivateKey = <Your-Private-Key>

[Peer]
PublicKey = <Server-Public-Key>
Endpoint = <Server-IP>:51820
AllowedIPs = 192.168.50.0/24
PersistentKeepalive = 20
```
Start the VPN on the client and verify the connection.

### **Step 5: Verify Connectivity**
On the client:
```bash
ping 192.168.50.1
```
On the server:
```bash
wg show
```

---

## **3️⃣ Firewall Configuration and Network Security**
### **Step 1: Configure Firewall Rules**
```bash
sudo ufw allow 51820/udp
```
Ensure traffic is routed correctly:
```bash
sudo iptables -A FORWARD -i wg0 -o eth0 -j ACCEPT
```

### **Step 2: Monitor and Troubleshoot Network Traffic**
- Use **journalctl -u wg-quick@wg0** to check VPN logs.
- Inspect **Wireshark captures** to confirm encrypted traffic.

---

## **Self-Check: Networking & Security Mastery**
1. How do you filter for HTTP traffic in Wireshark?
2. What command shows active VPN connections in WireGuard?
3. Why is using HTTPS preferred over HTTP for authentication?

## **Submitting Your Work**
- Document your steps using screenshots.
- Submit via GitHub, LMS, or your course portal.

---

