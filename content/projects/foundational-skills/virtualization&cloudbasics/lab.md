---
title: "Virtualization & Cloud Basics Lab"
description: "Hands-on exercises for setting up and managing virtual machines and cloud environments."
date: 2025-02-09
tags: ["Virtualization", "Cloud Computing", "VMs", "Containers"]
categories: ["Projects"]
draft: false
---

# Virtualization & Cloud Basics Lab

## Setting Up Your Virtual Environment
Follow these steps to set up your virtualization platform:

### **1. Choosing Your Virtualization Platform**
Select one of the following options to create a virtual machine:
- **VirtualBox** (Recommended for most users)
- **Hyper-V** (For Windows Pro/Enterprise users)
- **VMware Workstation Player**
- **Cloud Instances** (AWS, Azure, GCP)

### **2. Installing a Virtual Machine**
1. Download **Ubuntu or Debian ISO** from the official site.
2. Create a new virtual machine in your chosen platform.
3. Allocate **2+ CPU cores, 4GB RAM, and 20GB storage**.
4. Boot the VM and install the operating system.

## Working with Virtual Machines
### **3. Managing VM Snapshots**
- Take a **snapshot** before making system changes.
- Restore a previous snapshot if something breaks.
- Export VM configurations for backup.

### **4. Remote Access with SSH**
1. Enable SSH on your virtual machine:
   ```bash
   sudo apt update && sudo apt install openssh-server
   sudo systemctl enable ssh
   sudo systemctl start ssh
   ```
2. Find your VM’s IP address:
   ```bash
   ip a
   ```
3. Connect from your host machine:
   ```bash
   ssh user@<vm-ip-address>
   ```

## Introduction to Containers
### **5. Setting Up Docker (Optional but Recommended)**
1. Install Docker:
   ```bash
   sudo apt update && sudo apt install docker.io -y
   sudo systemctl enable docker
   sudo systemctl start docker
   ```
2. Run a simple container:
   ```bash
   docker run hello-world
   ```
3. List running containers:
   ```bash
   docker ps
   ```

## Self-Check: Virtualization & Cloud Mastery
Try answering these questions:
1. What is the difference between a VM snapshot and a backup?
2. How can you access a cloud instance remotely?
3. Why are containers more lightweight than traditional VMs?

## Submitting Your Work
- Include screenshots and documentation of completed steps.
- Submit your work through the course website or designated repository.

---

