
# Inventory Management System (MERN)

**Features, Qualities, and Source Mapping**

---

## 1. System Architecture Overview

**Type:** Full-stack MERN application (Client–Server Monorepo)
**Purpose:** Bin-level, transactional inventory management with auditability and role-based governance.

### Architecture & Bootstrapping

* Express server with ordered middleware, routing, error handling
* Environment-based configuration
* Graceful startup and shutdown
* Background service lifecycle management

**Primary files:**

* `server/server.js`
* `server/config/db.js`
* `server/.env`
* `client/src/index.js`
* `client/src/App.jsx`

---

## 2. Authentication & Authorization

### Implemented Capabilities

* JWT-based authentication
* Role-based access (Admin / User)
* Account approval workflow (pending → approved → rejected)
* Dual-layer enforcement (frontend + backend)
* Automatic session invalidation on unauthorized access

### Backend Enforcement

* Token verification
* User existence and approval checks
* Admin-only middleware

**Backend files:**

* `server/middleware/auth.js`
* `server/controllers/userController.js`
* `server/controllers/adminController.js`
* `server/routes/auth.js`
* `server/routes/admin.js`

### Frontend Enforcement

* Route-level access protection
* Approval-state gating with dedicated UX
* Admin-only route restriction

**Frontend files:**

* `client/src/components/PrivateRoute.jsx`
* `client/src/context/AuthContext.jsx`
* `client/src/pages/LoginPage.jsx`
* `client/src/pages/RegisterPage.jsx`

---

## 3. Inventory Management (Core Domain)

### Inventory Model & Behavior

* Inventory tracked by **SKU + Bin**
* Stock stored only for positive quantities
* Inventory queried in bin-aware format
* Inventory adjustments logged and validated

**Files:**

* `server/models/Inventory.js`
* `server/controllers/inventoryController.js`
* `server/routes/inventory.js`

### Inventory Features

* Inventory listing with bin grouping
* SKU-level inventory view across bins
* Inventory statistics:

  * Total records
  * Total quantity
  * Low stock
  * Out-of-stock
  * Multi-bin vs single-bin SKUs
* Inventory search and filtering

**Files:**

* `server/controllers/inventoryController.js`
* `client/src/pages/InventoryPage.jsx`
* `client/src/components/InventoryTable.jsx`
* `client/src/components/TableFilter.jsx`
* `client/src/hooks/useTableFilter.js`

---

## 4. Inbound Stock (Insets)

### Functional Capabilities

* Single inbound entry
* Batch inbound processing
* Excel-based bulk inbound import
* Strict bin validation (no auto-bin creation)
* Partial batch success handling
* Transactional integrity
* Inventory update and reversal logic

### Backend Implementation

* MongoDB transactions (`startSession`)
* Bulk inventory updates
* Detailed validation and error reporting
* HTTP 207 Multi-Status for partial success

**Backend files:**

* `server/controllers/insetController.js`
* `server/models/Inset.js`
* `server/models/Bin.js`
* `server/utils/InboundExcelImportService.js`
* `server/routes/insets.js`

### Frontend Integration

* Inbound cart UI
* Mobile-optimized inbound wizard
* Excel import interface

**Frontend files:**

* `client/src/pages/InsetPage.jsx`
* `client/src/components/InboundCart.jsx`
* `client/src/components/MobileInboundWizard.jsx`
* `client/src/components/ExcelImport.jsx`
* `client/src/hooks/useInboundCart.js`

---

## 5. Outbound Stock (Outsets)

### Functional Capabilities

* Single outbound entry
* Batch outbound processing
* Customer and invoice tracking
* Bin-level stock validation
* Inventory decrement and restoration
* Batch summaries

### Backend Implementation

* Transactional batch processing
* Bulk inventory updates
* Async audit logging
* Inventory restoration on delete

**Backend files:**

* `server/controllers/outsetController.js`
* `server/models/Outset.js`
* `server/models/Inventory.js`
* `server/routes/outset.js`

### Frontend Integration

* Outbound cart UI
* Outbound history table

**Frontend files:**

* `client/src/pages/OutsetPage.jsx`
* `client/src/components/OutboundCart.jsx`
* `client/src/components/OutboundHistoryTable.jsx`
* `client/src/hooks/useOutboundCart.js`

---

## 6. Audit Logging & Traceability

### Capabilities

* Centralized audit trail for all stock mutations
* Tracks before/after state
* Includes user identity and context
* Supports batch-level traceability

**Files:**

* `server/models/AuditLog.js`
* `server/controllers/inventoryController.js`
* `server/controllers/insetController.js`
* `server/controllers/outsetController.js`

---

## 7. Admin & User Management

### Admin Capabilities

* View pending, approved, and all users
* Approve / reject users
* Toggle admin role
* Toggle user status
* Delete users with safeguards
* Cleanup service control

**Backend files:**

* `server/controllers/adminController.js`
* `server/routes/admin.js`
* `server/models/User.js`

### Frontend Capabilities

* Admin dashboard UI
* User management interface

**Frontend files:**

* `client/src/pages/AdminDashboard.jsx`
* `client/src/components/DeleteConfirmationModal.jsx`

---

## 8. Cleanup & Maintenance Services

### Capabilities

* Background cleanup service
* Automatic startup on server boot
* Graceful shutdown handling
* Admin-triggered manual cleanup
* Cleanup history and statistics

**Files:**

* `server/utils/cleanupService.js`
* `server/models/CleanupLog.js`
* `server/controllers/adminController.js`
* `server/server.js`

---

## 9. Frontend Networking & Environment Handling

### Capabilities

* Centralized API configuration
* Environment-aware base URL resolution
* Automatic token injection
* Global error handling
* Timeout handling
* Auto logout on authentication failure

**Files:**

* `client/src/utils/axiosInstance.js`
* `client/.env`
* `client/.env.development`
* `client/.env.production`

---

## 10. UI Architecture & Reusability

### Design Characteristics

* Component-driven architecture
* Configuration-based filters
* Metadata-driven dropdowns
* Reusable UI patterns
* Mobile-aware components

**Files:**

* `client/src/components/TableFilter.jsx`
* `client/src/components/ProductSelector.jsx`
* `client/src/components/Layout.jsx`
* `client/src/components/Navigation.jsx`

---

## 11. Data Model & Metadata Management

### Characteristics

* Document-based MongoDB schema
* Separate collections for inventory, transactions, users, metadata
* Flexible schema evolution

**Files:**

* `server/models/Bin.js`
* `server/models/ProductCategory.js`
* `server/models/ProductSize.js`
* `server/models/Color.js`
* `server/models/Pack.js`
* `server/controllers/metadataController.js`
* `server/routes/metadata.js`

---

## 12. Non-Functional Qualities (Derived)

### Data Integrity

* Transactions for batch operations
* Explicit inventory reversal
* Strict validation

**Derived from:**

* `insetController.js`
* `outsetController.js`
* `inventoryController.js`

### Performance

* Bulk DB operations
* Lean queries
* Async logging
* Pagination and limits

**Derived from:**

* `inventoryController.js`
* `insetController.js`
* `outsetController.js`

### Security

* JWT authentication
* Role and approval enforcement
* CORS control

**Derived from:**

* `auth.js`
* `server.js`
* `PrivateRoute.jsx`

---

## 13. Documentation & Operational Readiness

### Documentation

* Setup instructions
* Deployment notes
* Feature explanation

**Files:**

* `README.md`
* `RunProject_README.md`
* `Collaboration.md`

### Operational Scripts

* Admin bootstrapping
* Database diagnostics
* Inventory reset utilities

**Files:**

* `server/utils/adminbootstrap.js`
* `server/seedAdmin.js`
* `server/diagnose-database.js`
* `server/reset-inventory-data.js`

---

## 14. Final Classification

This project demonstrates:

* Transaction-safe backend engineering
* Audit-grade inventory control
* Performance-aware data handling
* Secure, role-governed access
* Production-ready frontend–backend integration

**Classification:**
**Transactional Inventory Management System with Enterprise-Grade Design Characteristics**


