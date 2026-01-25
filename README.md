# API Security Project – OWASP API Top 10

## 📌 Overview
This project demonstrates real-world API security vulnerabilities and their remediation
based on the OWASP API Security Top 10.

The project focuses on how insecure APIs can be exploited and how proper security
controls prevent those attacks. It walks through building a vulnerable API, simulating
attacks, and then implementing secure authentication and authorization.

---

## 🎯 Objectives
- Build a vulnerable REST API
- Identify and exploit OWASP API Top 10 issues
- Implement authentication & authorization controls
- Demonstrate JWT-based session handling
- Apply role-based access control (RBAC)
- Document attack scenarios and remediation steps

---

## 🛠 Technology Stack
- Node.js (Express)
- bcrypt (password hashing)
- JWT Authentication (jsonwebtoken)
- curl / Postman
- JSON-based APIs

---

## 📂 Project Structure (Current / Planned)

vulnerable-api/
attack-scenarios/
remediation/
logs/
screenshots/
---

## 🚧 Project Status
Core authentication and authorization flows implemented.  
Documentation and future hardening in progress.

---

# 🔐 OWASP API2 – Broken Authentication

**Affected Endpoint:** `POST /login`

This project intentionally demonstrates **Broken Authentication** as defined by the OWASP API Security Top 10.

---

## 🔎 Description
The `/login` endpoint initially implemented an insecure authentication mechanism. The API validated
credentials using hardcoded values and did not enforce standard authentication protections.
This allowed attackers to directly interact with authentication logic.

---

## ❌ Security Issues Identified (Initial Version)

- Hardcoded credentials in source code
- Plain-text password comparison
- No rate limiting or account lockout
- No authentication token (JWT or session)
- No brute-force protection
- Verbose error handling that could expose internal details

---

## 🧪 Attack Simulation

An attacker can directly abuse the login endpoint using tools like `curl`, without any frontend interaction:

```bash
curl -X POST http://localhost:3000/login \
 -H "Content-Type: application/json" \
 -d '{"username":"admin","password":"admin123"}'

 ✅ Remediation – Secure Authentication (Fix for OWASP API2)

After demonstrating Broken Authentication, the login implementation was secured using industry-standard practices.

🔐 Security Improvements Implemented

Passwords are hashed using bcrypt

Credentials are no longer hardcoded

Input validation prevents malformed requests

Generic error messages prevent user enumeration

JWT (JSON Web Token) is issued after successful authentication

Tokens have expiration (1h) to reduce replay risk

Internal errors no longer expose stack traces

🔑 Secure Login Flow

Client sends username and password to /login

Server validates input

Server looks up user record

Password is verified using bcrypt

JWT is generated with user identity and role

Token is returned to client

Example:

curl -X POST http://localhost:3000/login \
 -H "Content-Type: application/json" \
 -d '{"username":"admin","password":"admin123"}'

 Response:

 {
  "message": "Login successful",
  "token": "<JWT_TOKEN>"
}

🔐 Role-Based Authorization (OWASP API5 – Broken Function Level Authorization)

After securing authentication, role-based authorization was implemented to restrict access to sensitive endpoints.

🛡 Implementation Details

User role is embedded inside the JWT payload

Middleware validates JWT signature and expiration

Authorization middleware enforces role checks

Admin-only endpoints require role: admin

Protected endpoint example:

curl http://localhost:3000/admin \
 -H "Authorization: Bearer <JWT_TOKEN>"

 Only users with the admin role can access this endpoint.

This mitigates OWASP API5 – Broken Function Level Authorization by ensuring users can only access APIs permitted by their role.