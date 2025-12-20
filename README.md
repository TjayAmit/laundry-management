# Multi-Branch Laundry Management System
**Backend Architecture & Data Design (Laravel 11/12)**

## Overview

This repository documents the **backend architecture and database design** for a **Multi-Branch Laundry Management System**, intended to migrate operations from a paper-based workflow to a **digital-first, scalable platform**.

The system is designed so that:
- Each **branch operates independently** (data silo per branch)
- Management has **central visibility** for monitoring, analytics, and congestion control
- Operational delays (“stuck tickets”) are **measurable and actionable**
- Payments, notifications, and tracking are **fully auditable**

---

## Technical Stack

- **Backend Framework:** Laravel 11 / 12
- **Database:** MySQL or PostgreSQL
- **Architecture Style:** Branch-scoped, event-driven, audit-first
- **Naming Conventions:**
- Tables & columns: `snake_case`
- Models: `PascalCase`

---

## Core Business Objectives

- Digitize order intake, tracking, and invoicing
- Support **multiple branches** without data collision
- Track laundry lifecycle stages in real time
- Detect processing bottlenecks and branch congestion
- Enable both **cash and online payments**
- Automate customer notifications

---

## High-Level System Design

### Branch Isolation Model

- All transactional tables reference `branch_id`
- Users, customers, services, and orders are **branch-scoped**
- Admin users can view cross-branch data (logical, not physical)

---

## Database Schema Overview

### Essential Tables

#### `branches`
Stores branch-level configuration and capacity limits.
- Used for congestion monitoring and SLA enforcement.

Key fields:
- `capacity_limit`
- `warning_threshold`

---

#### `users`
Branch-based system users (staff, cashier, admin).

Key fields:
- `branch_id`
- `role` (admin, branch_staff, cashier)

---

#### `customers`
Customers are **local to a branch** to simplify operations and reporting.

Key fields:
- `branch_id`
- `phone` (indexed)

---

#### `services`
Defines laundry services per branch (wash, dry, fold, etc.).

Key fields:
- `branch_id`
- `price`
- `is_active`

---

#### `orders`
Represents a laundry ticket.

Key fields:
- `branch_id`
- `customer_id`
- `status`
- `qr_code_payload`
- Operational timestamps (`received_at`, `ready_at`, `claimed_at`)

Statuses:
received -> washing -> drying -> folding -> ready -> claimed


---

#### `order_items`
Line items attached to an order.

Key fields:
- `order_id`
- `service_id`
- `quantity`
- `subtotal`

---

#### `order_logs` (Critical Table)

This table is the **core of monitoring and analytics**.

Purpose:
- Records every status change with timestamps
- Enables duration-based analysis per stage
- Prevents loss of historical state transitions

Key fields:
- `order_id`
- `status`
- `changed_by`
- `created_at`

> This table is the **single source of truth** for detecting stuck tickets and SLA violations.

---

#### `transactions`
Payment records for both cash and online methods.

Key fields:
- `order_id`
- `payment_method`
- `reference_no`
- `status`

---

#### `notifications`
Stores outbound notifications (SMS, Email, Push).

Key fields:
- `notifiable` (polymorphic)
- `type`
- `data`
- `sent_at`

---

## Data Flow Diagrams (DFD)

### Level 0 – Context Diagram

**External Entities**
- Customer
- Branch Staff
- Admin

**System**
- Laundry Management System (LMS)

**Interactions**
- Customer submits laundry → LMS
- Branch staff updates order status → LMS
- LMS sends notifications → Customer
- Admin monitors branch performance → LMS

---

### Level 1 – Process Flow

1. **Order Intake**
    - Customer data captured
    - Order created
    - QR invoice generated
    - Status logged as `received`

2. **Laundry Processing**
    - Staff updates order stages
    - Each transition logged in `order_logs`

3. **Monitoring Engine**
    - Calculates active orders vs branch capacity
    - Detects delayed orders per processing stage

4. **Notification Dispatch**
    - Triggered on status changes
    - Stored and sent asynchronously

5. **Payment & Release**
    - Cash or online payment recorded
    - Order marked `claimed`

---

## Congestion Monitoring Logic

### Active Orders Definition

Orders with status:
received -> washing -> drying -> folding

congestion_percentage =
(active_orders / capacity_limit) * 100

### Congestion States

| State     | Condition |
|----------|-----------|
| Normal   | < 70% |
| Warning  | ≥ warning_threshold |
| Critical | ≥ 100% |

### Possible Actions

- Admin alerts
- Branch performance warnings
- Temporary intake restriction (optional)

---

## Stuck Ticket Detection Logic

### Definition

An order is considered **stuck** if it remains in the same processing stage longer than an acceptable threshold.

### Example SLA Thresholds

| Status   | Max Duration |
|--------|--------------|
| washing | 2 hours |
| drying | 1.5 hours |
| folding| 1 hour |

### Detection Strategy

- Get the **latest `order_logs` entry per order**
- Calculate time difference from `created_at`
- Compare against stage threshold
- Flag as stuck if exceeded

This logic requires **no mutation** of data and works entirely on immutable logs.

---

## Architectural Strengths

- Immutable audit trail (`order_logs`)
- Branch-level data isolation
- Time-based analytics without cron mutations
- Scales horizontally across branches
- Decoupled payment and notification layers
- Suitable for dashboards, SLA reporting, and automation

---

## Next Steps

This README documents the **foundation architecture**.

Possible extensions:
- Laravel migration files (ready-to-run)
- Event & listener design for notifications
- Admin dashboards (congestion, stuck tickets, SLA)
- Integration with payment gateways (GCash, Maya)
- Queue-based monitoring and alerting

---

**Author Role:** Senior Backend Architect (Laravel & Database Design)  
**Purpose:** Production-grade foundation for a scalable laundry management platform


