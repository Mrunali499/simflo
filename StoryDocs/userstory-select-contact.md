# User Story: Select Contact and Start Message

This document outlines the workflow for starting a new conversation by selecting a contact from the address book.

## 1. Objective
To verify that a user can successfully initiate a chat with a saved contact and that the system correctly resolves the user's name from the contact list.

## 2. Workflow Tables

### Scenario: Select Contact & Send First Message

| Step | Actor | Action | Expected System Response |
| :--- | :--- | :--- | :--- |
| 1 | **Alice** | Logs in and navigates to the **Conversation List** screen. | Displays list of existing conversations. |
| 2 | **Alice** | Clicks the **"+"** (New Chat) button or goes to **"Contacts"** tab. | Displays list of contacts (e.g., Bob). |
| 3 | **Alice** | Selects **Bob** from the list. | Opens a generic **Chat Window** for Bob. Header should display "Bob" (Contact Name). |
| 4 | **Alice** | Types "Hi Bob" and clicks **Send**. | Message is sent. Conversation is persisted. |
| 5 | **Alice** | Returns to Conversation List. | **New Conversation** appears. **Name** should be "Bob". |

### Scenario: Receiving the Message

| Step | Actor | Action | Expected System Response |
| :--- | :--- | :--- | :--- |
| 1 | **Bob** | Logs in (Alice has already sent message). | **Conversation List** loads. |
| 2 | **Bob** | Checks list items. | Sees conversation with **Alice**. (Name resolved from Bob's contacts: "Alice"). |
| 3 | **Bob** | Opens conversation. | Message "Hi Bob" is visible. |

## 3. Name Resolution Logic (Requirement)

*   **Display Logic**: When listing 1-on-1 conversations (DMs):
    1.  Check if the other participant's Phone Number matches an entry in the user's **Contact List**.
    2.  If **Match Found**: Display the **Contact Name** (e.g., "Bobby" if saved as such).
    3.  If **No Match**: Display the user's public **Display Name**.
    4.  **Fallback**: Display the Phone Number.
    *   *Constraint*: Should NEVER display "NULL".

## 4. Troubleshooting Fix

If the name appears as "NULL":
*   **Cause**: The backend `list` query is taking the raw conversation name (which might be null for new DMs) and failing to resolve against the contact list.
*   **Verification**: Ensure the `conversation.server.ts` list handler implements the "Find other member -> Match Contact -> Return Name" logic correctly.

## 5. Technical Data References

This section maps the UI requirements to the underlying database tables and relationships.

### Database Tables involved
*   **Conversations**: `core_conversation`
    *   `id`: unique ID
    *   `type`: 'dm' (or 'individual') vs 'group'
    *   `name`: Often `NULL` or static for DMs at creation.
*   **Members**: `core_conversation_member`
    *   `conversation_id`: Links to conversation
    *   `user_id`: Links to `core_user`
*   **Contacts**: `core_contact`
    *   `user_id`: The **Owner** of the address book (CurrentUser).
    *   `phone`: The phone number of the contact.
    *   `name`: The name the Owner assigned (e.g., "My Bestie").
*   **Users**: `core_user`
    *   `id`: Registered User ID.
    *   `phone_number`: Unique identifier to match against contacts.
    *   `display_name`: Public profile name.
