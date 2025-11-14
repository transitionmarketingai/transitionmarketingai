# Support Ticket System Setup Guide

This guide explains how to set up the support ticket system for Transition Marketing AI.

## Overview

The support ticket system allows:
- **Clients** to raise tickets from their dashboard
- **Admins** to manage and respond to tickets
- **Two-way communication** via message threads
- **Email/WhatsApp notifications** for new tickets and replies
- **Analytics tracking** for SLA metrics

## Environment Variables

Add these to `.env.local` or Vercel:

```bash
# Airtable Configuration
AIRTABLE_API_KEY=pat_xxxxxxxxxxxxx
AIRTABLE_BASE_ID=app_xxxxxxxxxxxxx
AIRTABLE_SUPPORT_TABLE_NAME=SupportTickets

# Admin Configuration
ADMIN_EMAIL=hello@transitionmarketingai.com
ADMIN_WHATSAPP_NUMBER=919876543210

# WhatsApp (Optional)
INTERAKT_API_TOKEN=your_interakt_token

# Base URL
NEXT_PUBLIC_BASE_URL=https://transitionmarketingai.com
```

## Airtable Schema

### SupportTickets Table

Required fields:
- `Ticket ID` (Single line text) - Auto-generated format: TKT-XXXXXX
- `Client ID` (Link to Clients table) - Links ticket to client
- `Client Name` (Single line text) - For quick reference
- `Client Email` (Email) - For notifications
- `Client Phone` (Phone number) - Optional, for WhatsApp
- `Subject` (Single line text) - Ticket subject
- `Description` (Long text) - Initial ticket description
- `Status` (Single select) - "Open" / "In Progress" / "Resolved" / "Closed"
- `Priority` (Single select) - "Low" / "Medium" / "High" / "Urgent"
- `Assigned To` (Single line text) - Admin/team member name
- `Created` (Created time) - Auto-generated
- `Updated` (Last modified time) - Auto-updated
- `Messages` (Long text) - JSON array of message objects

### Messages JSON Format

The `Messages` field stores a JSON array:

```json
[
  {
    "from": "Client",
    "message": "Initial ticket description",
    "timestamp": "2025-11-13T09:42:00.000Z"
  },
  {
    "from": "Admin",
    "message": "We've fixed it. Please refresh your dashboard.",
    "timestamp": "2025-11-13T09:55:00.000Z"
  }
]
```

## Client Portal Integration

### Raise Ticket Flow

1. Client goes to `/client/dashboard` → Support tab
2. Clicks "Raise a Ticket" button
3. Fills form:
   - Subject (required)
   - Description (required)
   - Priority (dropdown: Low/Medium/High/Urgent)
4. On submit → POST `/api/support/create`
5. Ticket created in Airtable
6. Admin receives email + optional WhatsApp notification
7. Client sees success toast and ticket appears in list

### View Tickets

- Clients see only their own tickets
- Tickets displayed in card list with:
  - Ticket ID
  - Subject
  - Status badge (color-coded)
  - Priority badge
  - Last updated date
  - "View / Reply" button

### Ticket Thread View

- Click "View / Reply" opens dialog
- Shows conversation thread (messages)
- Client can reply directly
- Real-time updates when admin responds

## Admin Dashboard

### Access

- Route: `/admin/support`
- Requires admin authentication
- Shows all tickets (not filtered by client)

### Features

1. **Filters**
   - Status (Open/In Progress/Resolved/Closed)
   - Priority (Low/Medium/High/Urgent)
   - Search by ticket ID, subject, or client name

2. **Ticket Management**
   - Change status (dropdown)
   - Change priority (dropdown)
   - Assign to team member (text input)
   - View full conversation thread
   - Reply to client

3. **Kanban View** (Future Enhancement)
   - Columns by status
   - Drag-and-drop to change status
   - Color-coded by priority

## API Endpoints

### `/api/support/create` (POST)
- **Auth**: Client required
- **Body**: `{ subject, description, priority }`
- **Returns**: `{ ticket: { id, ticketId, ... } }`

### `/api/support/list` (GET)
- **Auth**: Client or Admin
- **Query Params**:
  - `admin=true` (for admin view)
  - `status=Open` (filter by status)
  - `priority=High` (filter by priority)
  - `assignedTo=Name` (filter by assignee)
- **Returns**: `{ tickets: [...] }`

### `/api/support/message` (POST)
- **Auth**: Client or Admin
- **Body**: `{ ticketId, message, from }`
- **Returns**: `{ newMessage: {...} }`
- **Side Effects**: Sends email/WhatsApp notification

### `/api/support/update` (PATCH)
- **Auth**: Admin only
- **Body**: `{ ticketId, status?, priority?, assignedTo? }`
- **Returns**: `{ message: "Ticket updated" }`

## Notifications

### Email Notifications

1. **New Ticket Created**
   - Sent to: Admin email
   - Subject: "New Support Ticket Created"
   - Includes: Ticket ID, client name, subject, priority, description
   - Link to admin dashboard

2. **Admin Reply**
   - Sent to: Client email
   - Subject: "New Reply on Your Support Ticket"
   - Includes: Ticket ID, subject, admin message
   - Link to client dashboard

3. **Client Reply**
   - Sent to: Admin email
   - Subject: "New Message on Support Ticket"
   - Includes: Ticket ID, client name, subject, message
   - Link to admin dashboard

### WhatsApp Notifications (Optional)

If `INTERAKT_API_TOKEN` is configured:

1. **New Ticket** → Admin WhatsApp
2. **Admin Reply** → Client WhatsApp
3. **Client Reply** → Admin WhatsApp (optional)

## Analytics Events

The system fires these GA4 events:

- `ticket_created` - When client creates ticket
  - Properties: `client_id`, `ticket_id`, `priority`

- `ticket_reply_sent` - When message is added
  - Properties: `ticket_id`, `from` (admin/client)

- `ticket_resolved` - When status changes to Resolved/Closed
  - Properties: `ticket_id`, `status`

## SLA Metrics (Future)

Track these metrics in `/admin/analytics`:

- **Avg Time to First Response**: Time from ticket creation to first admin reply
- **Avg Resolution Time**: Time from ticket creation to resolution
- **Client Satisfaction**: Survey scores (future feature)

## Design Guidelines

### Status Colors

- **Open**: Blue (`bg-blue-100 text-blue-800`)
- **In Progress**: Yellow (`bg-yellow-100 text-yellow-800`)
- **Resolved**: Green (`bg-green-100 text-green-800`)
- **Closed**: Gray (`bg-gray-100 text-gray-800`)

### Priority Colors

- **Urgent**: Red (`bg-red-100 text-red-800`)
- **High**: Orange (`bg-orange-100 text-orange-800`)
- **Medium**: Yellow (`bg-yellow-100 text-yellow-800`)
- **Low**: Green (`bg-green-100 text-green-800`)

## Testing

1. **Create Test Ticket**
   - Login as client
   - Go to Support tab
   - Raise a ticket
   - Verify it appears in admin dashboard

2. **Admin Reply**
   - Login as admin
   - Go to `/admin/support`
   - Open ticket
   - Send reply
   - Verify client receives email/WhatsApp

3. **Status Updates**
   - Change ticket status
   - Verify it updates in both dashboards
   - Check analytics events fire

## Troubleshooting

### Tickets not showing for client
- Verify `Client ID` field in ticket matches client record ID
- Check client authentication token is valid

### Messages not saving
- Verify `Messages` field is Long text type (not JSON)
- Check JSON format is valid

### Notifications not sending
- Verify email service is configured (Resend/SMTP)
- Check WhatsApp token if using Interakt
- Review server logs for errors

## Future Enhancements

- Kanban board view for admin
- File attachments in tickets
- Ticket templates
- Automated responses
- SLA tracking dashboard
- Client satisfaction surveys
- Ticket analytics charts
- Bulk actions (assign multiple tickets)

