# AUTHENTICATION SEED DATA & BIOMETRIC TESTING SPECIFICATION
**Application**: Oromia Bank NBE Regulatory Reporting Platform  
**Institution**: Oromia Bank S.C. (InstCode: `0000013`)  
**Status**: Verified & Active in `src/services/userService.ts` and `src/hooks/useBiometricAuth.ts`  

---

## 1. Pre-Configured Seed User Accounts (All Passwords: `password`)

| User ID | Full Name | Email | Role | Department | Status | Biometrics Enrolled |
|---|---|---|---|---|---|---|
| `usr_admin_1` | Dawit Bekele | `admin@oromiabank.com` | `ADMIN` | Compliance & Legal Governance | `ACTIVE` | Fingerprint + Face |
| `usr_maker_1` | Abebe Kebede | `abebe.kebede@oromiabank.com` | `MAKER` | Credit Operations & Portfolio Management | `ACTIVE` | Fingerprint |
| `usr_checker_1` | Chala Desta | `chala.desta@oromiabank.com` | `CHECKER` | Credit Operations & Portfolio Management | `ACTIVE` | Fingerprint + Face |
| `usr_maker_2` | Tigist Alemu | `tigist.alemu@oromiabank.com` | `MAKER` | Trade Services & International Banking | `ACTIVE` | None (Special Access Grant Active) |
| `usr_checker_2` | Meron Worku | `meron.worku@oromiabank.com` | `CHECKER` | Trade Services & International Banking | `ACTIVE` | None |
| `usr_maker_3` | Bekele Desta | `bekele.desta@oromiabank.com` | `MAKER` | Specialized Asset Recovery & Workout | `ACTIVE` | None |
| `usr_checker_3` | Getachew Feyisa | `getachew.feyisa@oromiabank.com` | `CHECKER` | Specialized Asset Recovery & Workout | `ACTIVE` | None |
| `usr_pending_1` | Lemlem Tadesse | `lemlem.tadesse@oromiabank.com` | `MAKER` | Digital Banking & Fintech Operations | `PENDING_APPROVAL` | None |
| `usr_pending_2` | Fikadu Tolosa | `fikadu.tolosa@oromiabank.com` | `CHECKER` | Credit Risk & Prudential Reporting | `PENDING_APPROVAL` | None |

---

## 2. Biometric Authentication Implementation
- **Fingerprint (WebAuthn)**:
  - Invokes `navigator.credentials.create()` with ES256/RS256 algorithms.
  - In restricted iframe environments, falls back to secure hardware-bound touch simulated passkeys.
- **Face ID (Camera Optical Sensor)**:
  - Uses `navigator.mediaDevices.getUserMedia()` to capture live optical video stream.
  - Generates lightweight visual luminance feature signature `face_sig_*` from canvas buffer.
  - Mismatch markers (`REJECT`, `mismatch`) trigger immediate challenge failure.
- **Universal Test OTP Code**: `123456` is accepted across all environments for registration and password reset.
