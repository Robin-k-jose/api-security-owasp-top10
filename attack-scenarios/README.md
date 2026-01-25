# Attack Scenarios

This section documents how the vulnerable API endpoints can be abused before remediation.

---

## OWASP API2 – Broken Authentication

### 🎯 Target Endpoint
POST /login

---

### ❌ Vulnerable Behavior

- Hardcoded credentials
- No rate limiting
- No lockout
- Plain-text password comparison

This allows attackers to brute-force credentials directly against the API.

---

### 🧪 Attack Using curl

```bash
curl -X POST http://localhost:3000/login \-H "Content-Type: application/json" \-d '{"username":"admin","password":"admin123"}'
```

Attackers can automate this request to test multiple passwords.

💥 Impact

Account takeover

Privilege escalation

Unauthorized access to protected APIs

OWASP API5 – Broken Function Level Authorization
🎯 Target Endpoint

GET /admin

❌ Vulnerable Behavior (Before Fix)

Any authenticated user could access admin functionality.

💥 Impact

Exposure of sensitive admin operations

Unauthorized privilege escalation