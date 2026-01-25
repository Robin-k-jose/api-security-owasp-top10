# API Security Project – OWASP API Top 10

## 📌 Overview
This project demonstrates real-world API security vulnerabilities and their remediation
based on the OWASP API Top 10.

The project focuses on how insecure APIs can be exploited and how proper security
controls prevent those attacks.

## 🎯 Objectives
- Build a vulnerable REST API
- Identify and exploit OWASP API Top 10 issues
- Implement authentication & authorization controls
- Add security logging aligned with SIEM use cases
- Document attack scenarios and remediation steps

## 🛠 Technology Stack
- Node.js (Express)
- JWT Authentication
- Postman / curl
- Security logging (JSON format)

## 📂 Project Structure (Planned)
vulnerable-api/
attack-scenarios/
remediation/
logs/
screenshots/

## 🚧 Project Status
🚧 Initial setup in progress

## 🔐 OWASP API2 – Broken Authentication

**Affected Endpoint:** `POST /login`

This project intentionally demonstrates **Broken Authentication** as defined by the
:contentReference[oaicite:0]{index=0} API Security Top 10.

---

### 🔎 Description
The `/login` endpoint implements an insecure authentication mechanism. The API validates
credentials using hardcoded values and does not enforce standard authentication protections.
This allows attackers to directly interact with the authentication logic.

---

### ❌ Security Issues Identified
- Hardcoded credentials in source code
- Plain-text password comparison
- No rate limiting or account lockout
- No authentication token (JWT or session)
- No brute-force protection
- Verbose error handling that may expose internal details

---

### 🧪 Attack Simulation
An attacker can directly abuse the login endpoint using tools like `curl`, without any
frontend interaction:

```bash
curl -X POST http://localhost:3000/login \
 -H "Content-Type: application/json" \
 -d '{"username":"admin","password":"admin123"}'



 ---

## ✅ Remediation – Secure Authentication (Fix for OWASP API2)

After demonstrating Broken Authentication, the login implementation was secured using industry-standard practices.

### 🔐 Security Improvements Implemented

- Passwords are hashed using **bcrypt**
- Credentials are no longer hardcoded
- Input validation prevents malformed requests
- Generic error messages prevent user enumeration
- JWT (JSON Web Token) is issued after successful authentication
- Tokens have expiration (`1h`) to reduce replay risk
- Internal errors no longer expose stack traces

### 🔑 Secure Login Flow

1. Client sends username and password to `/login`
2. Server validates input
3. Server looks up user record
4. Password is verified using bcrypt
5. JWT is generated with user identity and role
6. Token is returned to client

Example:

```bash
curl -X POST http://localhost:3000/login \
 -H "Content-Type: application/json" \
 -d '{"username":"admin","password":"admin123"}'
