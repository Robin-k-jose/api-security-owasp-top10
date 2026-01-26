# Remediation

This section documents how the identified OWASP API vulnerabilities were mitigated using secure authentication and authorization mechanisms.

The goal of remediation is to prevent unauthorized access, protect user credentials, and enforce proper access control.

---

## ✅ OWASP API2 – Broken Authentication

### 🔴 Problem

The initial implementation used hardcoded credentials and plain-text password comparison.  
No authentication tokens or session controls were present, allowing attackers to brute-force credentials directly against the API.

---

### 🛠 Fix Implemented

The following security controls were added:

- Password hashing using **bcrypt**
- Removal of hardcoded credentials
- Input validation for login requests
- Generic error messages to prevent user enumeration
- JWT-based authentication
- Token expiration (`1h`) to reduce replay risk

---

### 🔐 Secure Authentication Flow

1. Client sends username and password to `/login`
2. Server validates request body
3. User record is retrieved
4. Password is verified using bcrypt
5. JWT token is generated containing user identity and role
6. Token is returned to client

Passwords are never stored or compared in plain text.

---

### ✅ Security Outcome

- Prevents credential exposure
- Mitigates brute-force risk
- Enables stateless authentication
- Protects session integrity

---

## ✅ OWASP API5 – Broken Function Level Authorization

### 🔴 Problem

Initially, protected endpoints such as `/admin` could be accessed by any authenticated user, resulting in privilege escalation.

---

### 🛠 Fix Implemented

Role-based authorization was introduced:

- User role embedded inside JWT payload
- Token verification middleware validates authenticity
- Authorization middleware checks role before granting access
- Admin endpoints restricted to `role: admin`

---

### 🔐 Authorization Flow

1. Client sends JWT in Authorization header
2. Server validates token signature and expiration
3. User role extracted from token
4. Access granted only if role matches required permission

---

### ✅ Security Outcome

- Prevents unauthorized access to sensitive APIs
- Enforces least-privilege access
- Eliminates broken function-level authorization

---

## 🧠 Summary

Authentication ensures user identity.

Authorization controls what actions the user can perform.

By combining bcrypt password hashing, JWT authentication, and role-based access control, this project mitigates:

- OWASP API2 – Broken Authentication
- OWASP API5 – Broken Function Level Authorization

This layered approach significantly improves API security posture.
