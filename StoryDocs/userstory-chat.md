# Chat User Story & Testing Guide

This guide explains how to log in and verify the messaging flow between two users (Alice and Bob) in the browser.


## 1. Test Accounts

| User  | Phone Number | Password | Role |
| :--- | :--- | :--- | :--- |
| **Alice** | `1111111111` | `1234` | Sender / Receiver |
| **Bob** | `2222222222` | `1234` | Sender / Receiver |

## 2. Testing Steps

### Step 1: Login as Alice
1.  Open your browser (e.g., Chrome).
2.  Navigate to the app (usually `http://localhost:8081`).
3.  Enter Alice's credentials:
    *   **Phone**: `1111111111`
    *   **Password**: `1234`
4.  Click **Login**.
5.  **Verify**: You should be redirected to the **Conversation List**.
    *   *Check*: You should see a conversation named **"NUll"** (need to fix that it should come from contact i.e. contact name ).

### Step 2: Login as Bob (Second Session)
1.  Open a **New Incognito Window** (or a different browser) to verify real-time chat.
2.  Navigate to `http://localhost:8081`.
3.  Enter Bob's credentials:
    *   **Phone**: `2222222222`
    *   **Password**: `1234`
4.  Click **Login**.
5.  **Verify**: You should see the same conversation in the list.

### Step 3: Messaging Flow
1.  **Alice**: Click on the conversation to open the Chat Window.
2.  **Alice**: Type "Hello from Alice" and send.
3.  **Bob**: Check Bob's window. The message "Hello from Alice" should appear.
4.  **Bob**: Reply with "Hi Alice, received!".
5.  **Alice**: Check Alice's window. The reply should appear.

## 3. Expected Behavior
*   **Login**: Successful authentication redirects immediately to `/conversation`.
*   **List**: Displays latest message snippet and time.
*   **Chat**: Histories load correctly; new messages appear at the bottom.
*   **Message Details**:
    *   Sender name/avatar should be correct.
    *   Timestamp should be local time.


