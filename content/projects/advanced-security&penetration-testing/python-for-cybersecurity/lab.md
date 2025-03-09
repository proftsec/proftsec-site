---
title: "Python for Cybersecurity"
description: "Learn how to use Python for cybersecurity, including scripting, reconnaissance, and encoding techniques."
date: 2025-02-22
tags: ["Python", "Cybersecurity", "Automation", "Scripting"]
categories: ["Advanced Security & Penetration Testing"]
draft: false
---

# Python for Cybersecurity

## Overview
Python is a powerful programming language widely used in cybersecurity. From automation to vulnerability scanning, Python enables security professionals to streamline tasks and develop custom security tools. This lab introduces fundamental Python scripting techniques applicable to cybersecurity.

## What You Will Learn
- Automating security tasks with Python  
- Basic scripting for reconnaissance and information gathering  
- Encoding and decoding techniques for data manipulation  
- Using Python for network scanning  

---

## Lab Instructions

### **1. Setting Up Your Environment**
You will need:
- A **Debian Linux VM** (GCP, VirtualBox, or WSL)
- Python3 installed (`sudo apt update && sudo apt install python3`)
- A text editor (`nano`, `vim`, or `VS Code`)

---

### **2. Writing Your First Python Script**
Create a Python script to display text output.

#### **Step 1: Create a new file**
```bash
nano hello.py
```

#### **Step 2: Write the following code**
```python
hello = "Greetings, Cybersecurity Enthusiast!"
print(hello)

print("Start: ", hello[0:4])
print("Middle: ", hello[4:10])
print("End: ", hello[-5:])

a = hello.find(",")
b = hello.find("!")

print("Print portion before comma:", hello[:a])
print("This comes before the exclamation:", hello[:b])
```

#### **Step 3: Save and run your script**
```bash
python3 hello.py
```

📝 **Proof of Completion**: Create a new script `name.py` that prints your first and last name using slicing.

---

### **3. Python for Reconnaissance**
Python can automate **information gathering** and **network reconnaissance**.

#### **Step 1: Create a new file**
```bash
nano recon.py
```

#### **Step 2: Write a basic Python script for WHOIS lookups**
```python
import whois

domain = input("Enter a domain: ")
info = whois.whois(domain)

print("\nDomain Name:", info.domain_name)
print("Registrar:", info.registrar)
print("Creation Date:", info.creation_date)
print("Expiration Date:", info.expiration_date)
```

#### **Step 3: Save and run your script**
```bash
python3 recon.py
```

📝 **Proof of Completion**: Run a WHOIS query on a real website and take a screenshot of the output.

---

### **4. Encoding & Decoding with Python**
Python is used for encoding and decoding **Base64, hex, and UTF-8** data.

#### **Step 1: Create a new file**
```bash
nano encoding.py
```

#### **Step 2: Write a Python script for encoding**
```python
import base64

text = "Cybersecurity"
encoded = base64.b64encode(text.encode())

print("Encoded:", encoded.decode())

decoded = base64.b64decode(encoded)
print("Decoded:", decoded.decode())
```

#### **Step 3: Save and run your script**
```bash
python3 encoding.py
```

📝 **Proof of Completion**: Modify the script to encode and decode a custom string.

---

### **5. Network Scanning with Python**
Python can be used to scan open ports on a target system.

#### **Step 1: Install required library**
```bash
pip3 install python-nmap
```

#### **Step 2: Create a new file**
```bash
nano portscanner.py
```

#### **Step 3: Write a Python script for basic port scanning**
```python
import nmap

scanner = nmap.PortScanner()

target = input("Enter target IP: ")
ports = "22,80,443"

scanner.scan(target, ports)

for port in scanner[target]['tcp']:
    state = scanner[target]['tcp'][port]['state']
    print(f"Port {port}: {state}")
```

#### **Step 4: Save and run your script**
```bash
python3 portscanner.py
```

📝 **Proof of Completion**: Run the script against a **test system** and capture the results.

---

## **Final Submission**
- Submit a **Google Doc** with screenshots of your completed tasks.
- Ensure each screenshot has a **caption** explaining what was accomplished.
- Follow submission guidelines as provided by your instructor.

🚀 **Congratulations! You've completed Python for Cybersecurity!** 🚀
