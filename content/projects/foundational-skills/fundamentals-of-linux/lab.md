---
title: "FSC-1: Fundamentals of Linux"
description: "Hands-on exercises covering essential Linux commands."
date: 2025-02-09
tags: ["Linux", "CLI", "Networking", "Scripting"]
categories: ["Projects"]
draft: false
---

# FSC-1: Fundamentals of Linux

## Setting Up Your Linux Environment
Follow these steps to set up your Debian system:

1. **Download and Install VirtualBox**
   - Install [VirtualBox](https://www.virtualbox.org/) and create a new VM.
   - Download the [Debian ISO](https://www.debian.org/distrib/) and install it on your VM.

2. **Alternative Setup Options**
   - **Hyper-V** (Windows Server 2019 Option)  
   - **WSL 2** (Windows Subsystem for Linux)  
   - **AWS or Azure Cloud Instances**

3. **Boot into Debian Linux**
   - Power on the VM and log in.
   - Open a terminal window.

## Network Configuration

### Check Your IP Address
```bash
ip address show
```
This command displays network details, including IP addresses and interface names.

### Troubleshooting Missing Network Commands
If `ifconfig` or `ping` isn’t working, install the required packages:
```bash
sudo apt update && sudo apt install net-tools iputils-ping
```

## Basic Linux Commands

### Navigating the File System
```bash
pwd                # Shows current directory  
ls -alh            # Lists all files with details  
cd /home           # Changes to the home directory  
cd ..              # Moves up one directory  
lsblk              # Lists block storage devices
```

### Creating and Managing Files
```bash
touch myfile.txt                # Creates an empty file  
echo "Hello, Linux!" > myfile.txt  # Writes text to a file  
cat myfile.txt                  # Displays file content  
mv myfile.txt newfile.txt      # Renames the file  
cp newfile.txt copyfile.txt    # Copies the file  
rm copyfile.txt                # Deletes the file
```

### Editing Files with Nano
```bash
nano myfile.txt
```
- Modify text and press `Ctrl + X`, then `Y` to save and exit.

### Searching for Strings in Files
```bash
grep -i "search_term" filename.txt        # Case-insensitive search  
grep -r "search_term" /path/to/directory  # Recursive search
```

## User and Process Management
```bash
who                 # Lists currently logged-in users  
pinky -l $LOGNAME   # Displays user details  
ps aux              # Lists active processes  
kill <PID>          # Terminates a process by PID
```

## Networking Tools
```bash
ping -c 4 www.google.com   # Sends ICMP packets to Google  
dig google.com             # Checks DNS resolution  
traceroute google.com      # Shows network path to destination  
sudo route -n              # Displays routing table  
ip route                   # Displays current routes
```

## Bash Scripting

### Writing a Basic Script
Create a script that logs system uptime every 5 seconds:
```bash
nano monitor.sh
```
Add this code:
```bash
#!/bin/bash
while true
do
    uptime >> uptime_log.txt
    sleep 5
done
```
Make it executable and run it:
```bash
chmod +x monitor.sh
./monitor.sh
```

## File Permissions
```bash
ls -l                      # View file permissions  
chmod +x script.sh         # Grant execute permission to a script  
chmod 644 myfile.txt       # Set read/write for owner, read for others  
chown user:group myfile.txt  # Change file ownership
```

## Fun Linux Commands
Try these for fun:
```bash
cal 04 1887    # Show the calendar for April 1887  
rev            # Reverse text input  
toilet "Hello" # Print ASCII text in cool fonts (install with apt)  
sl             # Watch a steam locomotive run across your screen  
cmatrix        # See the Matrix rain effect  
fortune        # Get a random Linux fortune message
```

## Submitting Your Work
- Include screenshots or recorded steps to demonstrate completion.  
- Submit documentation via the designated submission platform, such as a course website, GitHub repository, or LMS.

