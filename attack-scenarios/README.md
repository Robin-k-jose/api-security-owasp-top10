# Attack Scenarios

This section documents how vulnerable API endpoints can be abused before remediation and how attacks are mitigated after security controls are applied.

---

## OWASP API2 – Broken Authentication

### 🎯 Target Endpoint
POST /login

---

### ❌ Vulnerable Behavior

- Hardcoded credentials
- No rate limiting or lockout
- Plain-text password comparison
- No authentication tokens

This allows attackers to brute-force credentials directly against the API.

---

### 🧪 Attack Using curl (Vulnerable Version)

```bash
curl -X POST http://localhost:3000/login \
 -H "Content-Type: application/json" \
 -d '{"username":"admin","password":"admin123"}'
```
📄 Example Response (Vulnerable)

{
  "message": "Login successful"
}

No token or session control is enforced.

💥 Impact

- Account takeover

- Privilege escalation

- Unauthorized access to protected APIs

🧪 Brute Force Simulation

Attackers may repeatedly send incorrect passwords:

```bash
curl -X POST http://localhost:3000/login \
 -H "Content-Type: application/json" \
 -d '{"username":"admin","password":"wrongpass"}'
```
Expected vulnerable behavior:

{
  "message": "Invalid credentials"
}

No lockout or rate limiting is triggered.

✅ After Remediation

After implementing bcrypt and JWT:

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

Passwords are hashed and authentication tokens are now required for protected endpoints.

OWASP API5 – Broken Function Level Authorization
🎯 Target Endpoint

GET /admin

❌ Vulnerable Behavior (Before Fix)

Any authenticated user could access admin functionality.

🧪 Unauthorized Access Attempt

```bash
curl http://localhost:3000/admin
```
Vulnerable behavior allowed access without proper role checks.

💥 Impact

- Exposure of sensitive admin operations

- Unauthorized privilege escalation

✅ After Remediation

Admin endpoint now requires both:

- Valid JWT

- Admin role

```bash
curl http://localhost:3000/admin \
-H "Authorization: Bearer <JWT_TOKEN>"
```
Only users with role: admin can access this endpoint.

🔎 OWASP Mapping

- OWASP API2 – Broken Authentication

- OWASP API5 – Broken Function Level Authorization

These issues were mitigated using bcrypt password hashing, JWT authentication, and role-based authorization middleware.