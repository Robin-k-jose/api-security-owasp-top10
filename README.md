# API Security Project – OWASP API Top 10

## 📌 Overview

This project demonstrates real-world API security vulnerabilities and their remediation based on the OWASP API Security Top 10.

It walks through building a vulnerable API, simulating attacks, and then implementing secure authentication and authorization using industry-standard practices.

The project focuses on both offensive (attack simulation) and defensive (remediation) perspectives.

---

## 🎯 Objectives

- Build a vulnerable REST API
- Identify and exploit OWASP API Top 10 issues
- Implement secure authentication and authorization
- Demonstrate JWT-based session handling
- Apply role-based access control (RBAC)
- Document attack scenarios and remediation steps
- Provide SIEM-style security logs

---

## 🛠 Technology Stack

- Node.js (Express)
- bcrypt (password hashing)
- JWT Authentication (jsonwebtoken)
- curl / Postman
- JSON-based APIs

---

## 📂 Project Structure

api-security-owasp-top10/
├── vulnerable-api/ # Express API implementation
├── attack-scenarios/ # Exploitation examples
├── remediation/ # Security fixes documentation
├── logs/ # Sample SIEM security logs
└── README.md


---

## 🚀 How to Run Locally

```bash
git clone https://github.com/Robin-k-jose/api-security-owasp-top10.git
cd api-security-owasp-top10/vulnerable-api
npm install
node index.js
```

Server starts at:

http://localhost:3000

🚧 Project Status

Core authentication and authorization flows implemented.
Attack scenarios, remediation documentation, and SIEM sample logs completed.

🔐 OWASP API2 – Broken Authentication
Affected Endpoint

POST /login

🔎 Description

The /login endpoint initially implemented insecure authentication using hardcoded credentials and plain-text password comparison. No session or token-based security existed, allowing attackers to directly interact with authentication logic.

❌ Security Issues Identified (Initial Version)

- Hardcoded credentials

- Plain-text password comparison

- No rate limiting or account lockout

- No authentication tokens

- No brute-force protection

- Verbose error handling

🧪 Attack Simulation

```bash
curl -X POST http://localhost:3000/login \
 -H "Content-Type: application/json" \
 -d '{"username":"admin","password":"admin123"}'
```

Attackers can automate this request to brute-force credentials.

✅ Remediation – Secure Authentication

The login implementation was secured using industry-standard controls.

🔐 Security Improvements

- Password hashing using bcrypt

- Removal of hardcoded credentials

- Input validation

- Generic error messages

- JWT authentication

- Token expiration (1 hour)
🔑 Secure Login Flow

1.Client sends username and password to /login

2.Server validates input

3.User record is retrieved

4.Password verified using bcrypt

5.JWT generated with user identity and role

6.Token returned to client

Example:
```bash
curl -X POST http://localhost:3000/login \
 -H "Content-Type: application/json" \
 -d '{"username":"admin","password":"admin123"}'
```
Response:

{
  "message": "Login successful",
  "token": "<JWT_TOKEN>"
}

🔐 OWASP API5 – Broken Function Level Authorization

After authentication was secured, role-based authorization was implemented.

🛡 Implementation Details

- User role embedded inside JWT

- Token validation middleware

- Authorization middleware enforcing role checks

- Admin-only endpoints restricted to role: admin

- Protected endpoint:
```bash
curl http://localhost:3000/admin \
 -H "Authorization: Bearer <JWT_TOKEN>"
 ```
 Only users with the admin role can access this endpoint.

📊 Security Logging

Sample SIEM-style logs are provided in:

logs/sample-security-logs.json

These include:

- Failed login attempts

-  Successful authentication

-  JWT issuance

- Unauthorized admin access

- Authorized admin access

This demonstrates detection-oriented logging aligned with SOC workflows.
📚 Key Learnings

-  Authentication verifies identity

- Authorization controls access

- Passwords must always be hashed

- JWT enables stateless sessions

- Roles must be enforced server-side

- APIs require both prevention and detection controls

🚀 Future Improvements

-  Environment variables for secrets

- Rate limiting and account lockout

- Refresh tokens

- Database-backed users

- Centralized logging integration