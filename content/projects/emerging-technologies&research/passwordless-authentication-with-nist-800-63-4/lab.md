---

title: "ETR-5: Passwordless Authentication with NIST 800-63-4 Lab"
description: "Configure passwordless authentication using Keycloak, WebAuthn, and FIDO2, and map your implementation to NIST 800-63-4 assurance levels."
date: 2025-11-10
tags: ["Passwordless", "FIDO2", "WebAuthn", "Keycloak", "NIST 800-63-4"]
categories: ["Emerging Technologies & Research"]
draft: false
------------

# ETR-5: Passwordless Authentication with NIST 800-63-4 Lab

## **Overview**

This lab introduces students to passwordless authentication by configuring Keycloak to use WebAuthn and FIDO2 authenticators. You will create a passwordless login flow, register platform or hardware security keys, and determine whether your implementation aligns with NIST AAL2 or AAL3. This demonstrates how passwordless authentication strengthens Zero Trust identity practices.

---

## **Lab Instructions**

### **1. Setting Up Your Environment**

You will need:

* A Windows, macOS, or Linux machine with a modern browser
* Docker or a Debian/Ubuntu VM
* A WebAuthn-capable authenticator such as Windows Hello, Touch ID, or a YubiKey

Start Keycloak using Docker:

```bash
docker run -d --name keycloak -p 8080:8080 \
  -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=Password123 \
  quay.io/keycloak/keycloak:25.0 start-dev
```

Open the Keycloak interface in your browser:

```
http://localhost:8080
```

---

### **2. Create a Realm and User**

Log in to the Keycloak Admin Console
Create a realm named **Passwordless-Lab**
Add a user named **testuser**
Assign a temporary password

---

### **3. Enable WebAuthn for Passwordless Login**

Navigate to **Authentication → Flows**

Duplicate the **Browser** flow
Rename the copy **Passwordless-Flow**
Remove the **Username/Password Form** step
Add **Username Form** and **WebAuthn Authenticator**

Your flow should look like:

```
Username Form -> WebAuthn Authenticator -> Success
```

Set **Passwordless-Flow** as the default Browser Flow.

---

### **4. Register a WebAuthn Credential**

Open the account management portal:

```
http://localhost:8080/realms/Passwordless-Lab/account
```

Log in as **testuser** using the temporary password
Go to **Security → Signing In → WebAuthn**
Register a WebAuthn or FIDO2 authenticator (Windows Hello, Touch ID, YubiKey)

Take a screenshot of the registered credential.

---

### **5. Test Passwordless Login**

Log out and attempt to log in again.
You should be prompted to authenticate using WebAuthn instead of entering a password.

Take a screenshot of the WebAuthn login prompt.

---

### **6. Determine NIST Assurance Level**

| Requirement         | AAL2       | AAL3                            |
| ------------------- | ---------- | ------------------------------- |
| Multi-factor        | Yes        | Yes                             |
| Hardware-backed key | Optional   | Required                        |
| Phishing resistance | Moderate   | Strong                          |
| WebAuthn/FIDO2      | Meets AAL2 | Meets AAL3 when hardware-backed |

Examples:

* Windows Hello generally meets **AAL2**
* YubiKey or other hardware-backed FIDO2 keys meet **AAL3**

Write a short explanation of the assurance level your configuration satisfies.

---

### **7. Optional Enhancements**

* Require both WebAuthn and OTP
* Remove password authentication entirely
* Put Keycloak behind Nginx or Traefik to simulate enterprise deployment

---

### **8. Zero Trust Identity Reflection**

Write a brief explanation of how passwordless authentication improves identity security through reduced credential theft, phishing resistance, and device assurance.

---

## **Final Submission**

Submit a report containing:

* Screenshot of WebAuthn credential registration
* Screenshot of passwordless login
* Explanation of whether your setup meets AAL2 or AAL3
* Notes on optional enhancements completed

You have implemented passwordless authentication aligned with NIST 800-63-4! 🚀

---
