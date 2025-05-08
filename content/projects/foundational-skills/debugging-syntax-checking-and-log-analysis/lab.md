---
title: "FSC-3: Debugging, Syntax Checking, and Log Analysis Lab"
description: "Hands-on exercises to identify and troubleshoot syntax errors using logs and debugging mechanisms."
date: 2025-02-09
tags: ["Debugging", "Syntax Errors", "Log Analysis", "Troubleshooting"]
categories: ["Projects"]
draft: false
---

# FSC-3: Debugging, Syntax Checking, and Log Analysis Lab

## Recognizing Common Syntax Errors
Syntax errors can cause scripts to fail, commands to be misinterpreted, and configurations to break. Below are common errors and ways to troubleshoot them.

### **1️⃣ Bash Scripting Errors & Fixes**
**Example 1: Missing Shebang (`#!/bin/bash`)**
```bash
# Wrong
echo "Hello, World!"
```
**Fix:** Add `#!/bin/bash` at the top.
```bash
#!/bin/bash
echo "Hello, World!"
```
**Debugging Method:** Check if the script runs with the correct interpreter.
```bash
bash script.sh
```

**Example 2: Incorrect If Statement Syntax**
```bash
# Wrong
if [ $USER = "root" ] then
   echo "User is root"
fi
```
**Fix:** Missing `;` or newline before `then`
```bash
if [ "$USER" = "root" ]; then
   echo "User is root"
fi
```
**Debugging Method:**
```bash
bash -n script.sh  # Syntax check without execution
```

### **2️⃣ Python Errors & Fixes**
**Example 1: Indentation Error**
```python
# Wrong
if True:
print("Hello")
```
**Fix:** Proper indentation.
```python
if True:
    print("Hello")
```
**Debugging Method:**
```bash
python3 -m py_compile script.py
```

### **3️⃣ YAML & JSON Errors**
**Example 1: Incorrect YAML Formatting (Bad Indentation)**
```yaml
# Wrong
config:
   key: value
  another_key: value
```
**Fix:**
```yaml
config:
  key: value
  another_key: value
```
**Debugging Method:**
```bash
yamllint config.yaml
```

**Example 2: JSON Formatting Error**
```json
{ "name": "John", "age": 30, }
```
**Fix:** Remove the extra comma.
```json
{ "name": "John", "age": 30 }
```
**Debugging Method:**
```bash
jq . config.json
```

## Analyzing System Logs
### **1️⃣ Checking Authentication Logs**
```bash
sudo cat /var/log/auth.log | grep "Failed password"
```
### **2️⃣ Viewing System Errors**
```bash
sudo dmesg | tail -20
```
### **3️⃣ Checking SSH Login Attempts**
```bash
sudo journalctl -u sshd --since "1 hour ago"
```

## Creating Logging Mechanisms
### **1️⃣ Debugging Bash Scripts with `set -x`**
```bash
#!/bin/bash
set -x  # Enable debugging
echo "Running script..."
wrongCommand  # This will fail
set +x  # Disable debugging
```

### **2️⃣ Logging Errors to a File**
```bash
#!/bin/bash
exec 2> error.log  # Redirect errors to a log file
echo "Running script..."
wrongCommand
```
**Check logs:**
```bash
cat error.log
```

## Self-Check: Debugging Mastery
Try answering these questions:
1. How do you check a Python script for syntax errors?
2. What log file stores SSH login attempts?
3. What does `set -x` do in a Bash script?

## Submitting Your Work
- Include screenshots and documentation of completed steps.
- Submit your work through the course website or designated repository.

---

