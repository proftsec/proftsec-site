---
title: "API Fundamentals & Security – Lab Instructions"
description: "Hands-on exercises for interacting with APIs, testing authentication, and identifying common security issues."
date: 2025-11-01
draft: false
---

# API Fundamentals & Security Lab

## Part 1: What Is an API?
An **API (Application Programming Interface)** allows one system or application to communicate with another.  
You use APIs every day—when checking the weather, streaming media, or signing in with Google.

**Examples:**  
- Google Maps API (location data)  
- OpenWeather API (weather data)  
- Wazuh API (security events and alerts)

**Activity:**  
Visit [https://api.github.com](https://api.github.com) in your browser.  
Observe the JSON output and identify three key-value pairs that describe the API service.

---

## Part 2: Making API Calls
APIs use **HTTP requests** to exchange data.  
Common methods include `GET`, `POST`, `PUT`, and `DELETE`.

**Example using `curl`:**
```bash
curl "https://api.openweathermap.org/data/2.5/weather?q=Boone&appid=YOUR_API_KEY"
```

## Steps

1. Go to [https://openweathermap.org/api](https://openweathermap.org/api) and register for a free API key.  
2. Use the command above, replacing `YOUR_API_KEY` with your real key.  
3. Review the JSON response and locate the following fields:
   - **temp** – temperature  
   - **humidity** – relative humidity  
   - **wind.speed** – wind speed  

---

## Activity 2

Use **Postman** to repeat the request.

- Create a new **GET** request.  
- Paste the full URL.  
- Click **Send** and confirm a `200 OK` response.  
- Change the `q=` parameter to query a different city.

---

## Part 3: Authentication & Authorization

APIs often require credentials to control who can access data.

### Common Authentication Methods

| Method | Description | Example Use |
|--------|--------------|-------------|
| **API Key** | Static key tied to an account | Public data or testing |
| **Bearer Token** | Short-lived access token in headers | Cloud APIs |
| **OAuth 2.0** | Delegated access via identity provider | “Sign in with Google” |
| **JWT (JSON Web Token)** | Encoded token containing claims | Modern web/mobile apps |

A **JWT** consists of:
- **Header** – algorithm and token type  
- **Payload** – user claims (ID, role, expiration)  
- **Signature** – verifies authenticity  

---

### Activity 3

1. Visit [https://jwt.io](https://jwt.io).  
2. Paste the following sample JWT:  
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikpv
aG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
3. Decode it and identify the algorithm and user name.  
4. Explain why publishing this token online would be risky.  

**Optional:**  
If you have **Keycloak** running, generate a live access token and inspect its expiration (`exp`) claim to see real authentication in action.

---

## Part 4: API Security Essentials

Unsecured APIs can expose sensitive data.  
The **OWASP API Security Top 10 (2023)** highlights the most common issues:

1. **Broken Object Level Authorization (BOLA)**  
2. **Broken Authentication**  
3. **Broken Object Property Level Authorization (BOPLA)**  
4. **Unrestricted Resource Consumption**  
5. **Broken Function Level Authorization**  
6. **Server-Side Request Forgery (SSRF)**  
7. **Security Misconfiguration**  
8. **Lack of Protection from Automated Threats**  
9. **Improper Inventory Management**  
10. **Unsafe Consumption of APIs**

---

### Activity 4

1. Launch **OWASP Juice Shop** or another test API.  
2. Send a request such as:  
```bash
curl -X GET "http://localhost:3000/rest/products/1"
```

### Activity 4 (continued)

Change the endpoint (`/2`, `/3`, etc.) to test for **Broken Object Level Authorization**.  
Record what happens and propose a fix using proper access controls.

---

### Discussion

Which OWASP vulnerability would have the highest risk in a finance or healthcare API?

---

## Part 5: Governance, Risk, and Compliance (GRC)

Technical fixes aren’t enough—secure APIs require governance and oversight.

### Core Concepts

- **Governance** – policies defining who can design, deploy, and use APIs  
- **Risk** – potential for data leaks, misuse, or downtime  
- **Compliance** – alignment with NIST CSF, ISO 27001, GDPR, or CCPA standards  

### Best Practices

1. **Logging & Monitoring** – record all requests with timestamps and user info.  
2. **Rate Limiting** – restrict traffic to prevent brute-force attacks.  
3. **Data Classification** – label and protect sensitive or PII data.  
4. **API Gateways & WAFs** – enforce authentication, throttling, and inspection.  

---

### Activity 5

Write a short reflection (200–300 words) addressing:

- How would logs or a SIEM detect API misuse?  
- What privacy issues arise when APIs process customer data?  
- How can governance policies balance usability and security?

---

## Deliverables

- **Screenshots** showing:  
  - Successful API requests and JSON output  
  - Decoded JWT results  
  - Example of an API security test (e.g., BOLA exploit)  

- **Reflection (200–300 words)** summarizing:  
  - How APIs communicate data  
  - Authentication and authorization mechanisms  
  - Security weaknesses and mitigations  
  - GRC implications for API exposure  

---

## Key Takeaways

- APIs connect nearly every digital service—and each connection introduces risk.  
- Strong authentication, least privilege, and input validation are fundamental defenses.  
- Logging, monitoring, and compliance controls ensure accountability.  
- Understanding API design and security bridges business and technical domains of cybersecurity.
