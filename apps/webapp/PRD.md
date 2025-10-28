# Product Requirements Document (PRD): ApxDenta Dental Clinic Webapp

## 1. Purpose & Target Users

ApxDenta is a modern, cloud-based dental clinic management webapp designed for dental clinics, staff, and administrators. It streamlines patient care, staff management, treatment planning, inventory, and financial operations in a secure, user-friendly interface.

**Target Users:**
- Dentists & Specialists
- Dental Assistants & Hygienists
- Clinic Administrators & Owners
- Receptionists
- Patients (limited portal access)

---

## 2. Core Features

### 2.1 Authentication & User Management
- **Login, Registration, Password Reset, Email Verification:** Secure onboarding for staff and patients.
- **Role-based Access:** Staff, admin, and patient roles with tailored permissions.
- **Staff Invitation & Confirmation:** Admins can invite staff; staff confirm via email (with organization branding).

### 2.2 Dashboard
- **Overview:** Key metrics (appointments, revenue, inventory alerts, staff status).
- **Quick Actions:** Schedule appointment, add patient, view today's treatments.

### 2.3 Staff Management
- **Staff List & Profiles:** View, filter, and manage staff (doctors, assistants, hygienists).
- **Archive/Deactivate Staff:** Dialogs for archiving single/multiple staff accounts.
- **Specialist Records:** Track specialties (e.g., orthodontics, periodontics).
- **Employment Status & Work Schedules:** Filter by status (active, on leave, archived) and workdays.

### 2.4 Patient Management (Hypothesized)
- **Patient List & Profiles:** Add, edit, and view patient records.
- **Medical History & Treatment Plans:** Attach medical history, allergies, and ongoing treatment plans.
- **Appointment Scheduling:** Book, reschedule, and cancel appointments.

### 2.5 Treatments & Services
- **Treatment Catalog:** Manage available dental treatments (e.g., cleaning, fillings, implants).
- **Assign Treatments to Staff:** Link treatments to qualified staff.
- **Treatment Records:** Track completed and scheduled treatments per patient.

### 2.6 Reservations & Scheduling
- **Appointment Calendar:** View and manage reservations for staff and patients.
- **Workday & Availability Management:** Staff can set and update their available days.

### 2.7 Inventory & Physical Assets
- **Stocks & Peripherals:** Track dental supplies, equipment, and consumables.
- **Low Stock Alerts:** Notify admins when inventory is low.
- **Asset Assignment:** Assign equipment to rooms or staff.

### 2.8 Financial Management
- **Sales & Purchases:** Record and track clinic sales (treatments, products) and purchases (supplies).
- **Payment Methods:** Manage accepted payment types (cash, card, insurance).
- **Accounts:** Track clinic accounts, balances, and transactions.

### 2.9 Security & Compliance
- **Audit Logging (Hypothesized):** Track key actions for compliance.
- **Data Privacy:** Ensure patient and staff data is protected per local regulations.

### 2.10 UI/UX & Accessibility
- **Modern, Responsive Design:** Uses shadcn UI, Tailwind CSS, and Skeleton loaders for smooth experience.
- **Toasts & Feedback:** Sonner-powered notifications for actions and errors.
- **Dialog Modals:** Consistent dialogs for confirmation, filtering, and archiving.

---

## 3. User Journeys

### Staff Onboarding
1. Admin invites staff via email (includes organization name/logo).
2. Staff receives branded invitation, registers, and verifies email.
3. Staff sets up profile, specialties, and work schedule.

### Patient Appointment
1. Receptionist adds new patient or selects existing.
2. Schedules appointment, assigns treatment and staff.
3. Patient receives confirmation and reminders.

### Treatment & Billing
1. Dentist completes treatment, updates patient record.
2. Receptionist records payment, updates financials.

### Inventory Management
1. Admin reviews stock levels, receives low stock alerts.
2. Orders supplies, updates inventory.

---

## 4. Technical & UX Requirements

- **Tech Stack:** React, TanStack Router, TanStack Query, shadcn UI, Tailwind CSS, bun, Vitest.
- **API Integration:** TRPC for backend communication.
- **State Management:** TanStack Query for data, TanStack Store for local state.
- **Accessibility:** All components must be keyboard accessible and screen-reader friendly.
- **Branding:** Organization logo and name shown in staff invitations and key screens.

---

## 5. Hypothesized/Planned Features

- **Patient Portal:** Patients can view appointments, treatment history, and pay bills online.
- **Reporting & Analytics:** Exportable reports for treatments, finances, and staff performance.
- **Insurance Integration:** Manage insurance claims and patient coverage.
- **Notifications:** SMS/email reminders for appointments and follow-ups.
- **Multi-location Support:** For clinics with multiple branches.

---

## 6. Integration Points

- **Email Templates:** Branded staff invitations, appointment reminders.
- **External APIs:** Payment gateways, insurance providers (future).
- **Data Import/Export:** CSV/Excel for patient and financial data.

---

## 7. Acceptance Criteria

- All user flows are accessible via the dashboard and protected routes.
- Staff and patient data is secure and only accessible by authorized roles.
- UI is consistent, modern, and responsive across devices.
- All dialogs and loaders use shadcn components for visual consistency.
- Organization branding is present in all staff-facing communications.

---

## 8. Open Questions

- What patient-facing features are required (portal, messaging)?
- What compliance standards must be met (HIPAA, GDPR)?
- Is multi-location/branch support needed now or in future?

---

**Summary:**  
ApxDenta is a comprehensive dental clinic management webapp, supporting staff, patient, treatment, inventory, and financial workflows. It is designed for modern dental clinics, with a focus on usability, security, and extensibility. Future features will further streamline operations and improve patient care.