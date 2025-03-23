---
title: "Post-Quantum Cryptography Lab Instructions"
description: "Implement and analyze post-quantum encryption and signature schemes using Kyber and Dilithium."
date: 2025-03-18
tags: ["Post-Quantum Cryptography", "Quantum Threats", "Kyber", "Dilithium"]
categories: ["Emerging Technologies & Research"]
draft: false
---

# Post-Quantum Cryptography Lab Instructions

## **Overview**
In this lab, you'll implement and analyze post-quantum encryption techniques using **Kyber** and **Dilithium**, two NIST-recommended algorithms for quantum-resistant security. The lab includes working with key exchange, digital signatures, and comparing algorithm performance.

---

## **Lab Instructions**

### **1. Setting Up Your Environment**
You will need:
- Python 3 installed
- Code editor (e.g., VS Code)
- Terminal access
- Docker (for advanced testing with liboqs)

#### **Install the pqcrypto library:**
```bash
pip install pqcrypto
```

#### **(Optional) Build liboqs locally for advanced algorithm support:**
```bash
git clone --recursive https://github.com/open-quantum-safe/liboqs
cd liboqs && mkdir build && cd build
cmake .. && make
```

---

### **2. Classical RSA Key Exchange (Baseline)**
```bash
openssl genrsa -out private.pem 2048
openssl rsa -in private.pem -pubout -out public.pem
```
Encrypt/decrypt a message using Python or OpenSSL to compare with post-quantum algorithms.

---

### **3. Post-Quantum Key Exchange with Kyber1024**
```python
from pqcrypto.kem.kyber1024 import generate_keypair, encrypt, decrypt

pk, sk = generate_keypair()
ciphertext, shared_secret = encrypt(pk)
decrypted_secret = decrypt(sk, ciphertext)

print("Shared Secret Match:", shared_secret == decrypted_secret)
```

📝 **Checkpoint:** Note the size of ciphertext and shared secret. Compare them to RSA.

---

### **4. Post-Quantum Signatures with Dilithium (liboqs or oqs-sig)**
```bash
echo "hello" > msg.txt
oqs-sig gen dilithium2 private.key public.key
oqs-sig sign dilithium2 private.key msg.txt sig.bin
oqs-sig verify dilithium2 public.key msg.txt sig.bin
```
If using `oqs-sig` is not available, explore Python bindings or Docker containers with liboqs tools.

---

### **5. Containerized PQC Testing Lab (Advanced)**
```bash
docker run -it ghcr.io/open-quantum-safe/oqs-demos:latest /bin/bash
```
Explore key exchange and signing within an isolated quantum-safe demo environment.

---

### **6. Performance Comparison & Benchmarking**
Use Python or CLI tools to compare:
- Key size
- Encryption/signing speed
- Ciphertext and signature sizes

Create a table documenting your results between RSA, Kyber1024, and Dilithium2.

---

## **Reflection & Final Submission**

- How do these algorithms compare to classical cryptography in terms of performance and security?
- Which PQC algorithm would you recommend for securing email or VPN traffic?
- Submit a report that includes:
  - Screenshots of key steps and results
  - Comparative table
  - Reflections on quantum-readiness and potential industry use cases

🚀 **Congratulations! You've completed the Post-Quantum Cryptography Lab!** 🚀
