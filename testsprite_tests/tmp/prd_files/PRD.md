# Product Requirements Document (PRD)

## Chugli - Real-Time Chat Web Application

**Document Version:** 1.0  
**Last Updated:** January 19, 2026  
**Document Owner:** Product Management  
**Status:** Approved for Implementation

---

## Executive Summary

Chugli is a production-grade, real-time chat web application that combines the core messaging capabilities of WhatsApp, Telegram, and Instagram with a unique anonymous random chat feature inspired by Omegle. The platform enables users to engage in both persistent conversations with known contacts and ephemeral one-to-one anonymous chats with randomly matched strangers.

**Key Differentiators:**

- Seamless integration of persistent and ephemeral messaging
- Privacy-first anonymous chat with temporary identities
- Modern, performant web architecture leveraging Next.js and Supabase
- Enterprise-grade scalability and reliability
- For the Backend Supabase [pofayi's Project] is used and I have already connected it by using the MCP Server, you can call it any time by using the MCP Server, and remeber we will set up the Backend [databace, storage, auth, functions, api, real-time, notifications, security, performance, etc] first then we will go for the frontend.

---

## Step 1: Product Overview

### 1.1 Problem Statement

**Primary Problem:**  
Users today navigate multiple messaging platforms for different communication needs - WhatsApp for personal contacts, Telegram for communities, Instagram for social connections, and separate platforms like Omegle for anonymous interactions. This fragmentation creates friction, reduces engagement, and limits the potential for serendipitous connections.

**User Pain Points:**

- Context switching between multiple chat applications reduces productivity
- Existing anonymous chat platforms often lack moderation, leading to abuse
- No single platform offers both persistent relationship-building and ephemeral anonymous connections
- Privacy concerns around identity exposure in random chat scenarios
- Limited trust in existing platforms regarding data security and user safety

**Business Opportunity:**  
Create a unified, trustworthy platform that serves both the need for persistent communication with known contacts and the desire for spontaneous, anonymous social interactions, capturing market share from fragmented solutions.

### 1.2 Target Users and Personas

#### Persona 1: "The Social Connector" (Primary)

- **Demographics:** 18-35 years old, digitally native, urban/suburban
- **Behavior:** Active on multiple social platforms, values privacy, seeks authentic connections
- **Goals:** Maintain close relationships while exploring new social interactions
- **Pain Points:** Tired of algorithmic feeds, desires genuine human connection
- **Usage Pattern:** Daily active user, 3-5 chat sessions per day, mix of known contacts and random chats

#### Persona 2: "The Privacy-Conscious Communicator" (Secondary)

- **Demographics:** 25-45 years old, tech-aware, security-minded
- **Behavior:** Selective about data sharing, prefers encrypted communications
- **Goals:** Communicate securely without compromising personal information
- **Pain Points:** Distrust of big tech platforms, concerns about data harvesting
- **Usage Pattern:** Regular user, primarily uses persistent chats with occasional anonymous exploration

#### Persona 3: "The Curious Explorer" (Tertiary)

- **Demographics:** 16-28 years old, open to new experiences
- **Behavior:** Enjoys meeting new people, values spontaneity
- **Goals:** Break social bubbles, experience diverse perspectives
- **Pain Points:** Boredom with existing social circles, fear of judgment
- **Usage Pattern:** Frequent random chat user, shorter session durations, high engagement with new matches

### 1.3 Business Goals and Success Metrics (KPIs)

#### Business Objectives

1. **User Acquisition:** Achieve 100,000 registered users within 6 months of launch
2. **User Engagement:** Maintain 40%+ DAU/MAU ratio
3. **Revenue Preparation:** Build foundation for future monetization (premium features, ads)
4. **Market Position:** Establish Chugli as the leading privacy-first multi-modal chat platform
5. **User Trust:** Achieve industry-leading safety and moderation standards

#### Key Performance Indicators (KPIs)

**Acquisition Metrics:**

- Monthly Active Users (MAU)
- Daily Active Users (DAU)
- New user registrations per day/week/month
- User acquisition cost (CAC) - for future paid campaigns
- Viral coefficient (K-factor) - organic growth rate

**Engagement Metrics:**

- DAU/MAU ratio (target: >40%)
- Average session duration (target: >10 minutes)
- Messages sent per user per day (target: >15)
- Random chat initiation rate (target: >30% of DAU)
- Random chat completion rate (target: >60% of initiated chats)
- Return user rate after first random chat (target: >50%)

**Retention Metrics:**

- Day 1, Day 7, Day 30 retention rates
- Churn rate (monthly)
- Average user lifetime (days)
- Feature adoption rates (persistent chat vs random chat)

**Quality Metrics:**

- Average chat duration (persistent vs random)
- Report rate per 1,000 chats (target: <5)
- Block rate per 1,000 chats (target: <10)
- Successful match rate for random chat (target: >90%)
- Message delivery success rate (target: >99.9%)

**Technical Metrics:**

- Platform uptime (target: 99.9%)
- Average message latency (target: <500ms)
- Real-time connection success rate (target: >99%)
- Error rate (target: <0.1%)
- Page load time (target: <2 seconds)

**Safety Metrics:**

- Time to first moderation action on reports (target: <30 minutes)
- Abuse report resolution rate (target: >95%)
- Repeat offender block rate
- False positive report rate (target: <5%)

---

## Step 2: Scope Definition

### 2.1 In-Scope Features

#### Phase 1: Core Foundation (Launch - Months 1-3)

**Authentication & User Management:**

- Email/password registration and login
- Email verification
- Password reset flow
- User profile creation (username, display name, profile picture, bio)
- Profile editing
- Account deletion

**Persistent Chat Features:**

- One-to-one text messaging
- Real-time message delivery and read receipts
- Typing indicators
- Message history (stored persistently)
- Contact list management (add/remove contacts)
- User search by username
- Online/offline status indicators
- Last seen timestamp
- Message deletion (delete for self)
- Conversation muting/unmuting
- Block/unblock users
- Push notifications (browser notifications)

**Random Chat Features:**

- One-to-one random matching system
- Temporary username generation
- Text-only communication
- Session-based chat (no history after disconnect)
- "Next" button to match with new random user
- "Leave" button to exit random chat
- Report abuse functionality
- Block user in random chat
- Random chat queue management
- Prevention of repeat matching with same user
- Anonymous identity protection (no email/personal details visible)
- Automatic chat history deletion on session end

**Media Sharing:**

- Image upload and sharing (persistent chats only)
- File upload and sharing (persistent chats only)
- Image preview and download
- File download

**User Interface:**

- Responsive web design (desktop, tablet, mobile)
- Chat list view (all conversations)
- Individual chat view
- Random chat interface
- User profile view
- Settings panel
- Dark mode/light mode toggle
- Search functionality (messages, contacts)
- Notification settings
- Privacy settings

**Moderation & Safety:**

- User reporting system
- Content flagging
- User blocking
- Automated profanity filter
- Manual moderation queue (admin panel)
- User suspension/ban system

**Analytics:**

- Google Analytics integration
- Event tracking (registration, messages, random chats)
- User behavior tracking
- Conversion funnel tracking

#### Phase 2: Enhanced Features (Months 4-6)

**Advanced Messaging:**

- Message editing
- Message reactions (emoji)
- Message forwarding
- Reply to specific messages
- Voice message recording and playback (persistent chats)
- Link previews

**Group Features:**

- Group chat creation (persistent chats only)
- Group member management (add/remove)
- Group admin roles
- Group settings (name, picture, description)

**Enhanced Random Chat:**

- Interest-based matching (optional tags)
- Geographic region preferences
- Age range filtering
- Gender preference filtering (optional)
- Random chat cooldown periods for abuse prevention

**Advanced Safety:**

- Machine learning-based abuse detection
- Image content moderation
- Spam detection
- Rate limiting per user

### 2.2 Out-of-Scope Features

**Explicitly Excluded from Initial Release:**

- Voice calling (VoIP)
- Video calling
- Screen sharing
- End-to-end encryption (may be added in future phases)
- Multi-device sync
- Desktop/mobile native apps (web-only initially)
- Stories/status updates (Instagram-style)
- Channels or broadcast lists
- Bots and automation
- Payments or in-app purchases
- Stickers or custom emoji
- Message scheduling
- Disappearing messages (outside random chat)
- Location sharing
- Contact integration (address book sync)
- Username marketplace
- Verified accounts/badges
- Audio/video in random chat
- Group random chat

**Future Consideration (Post-Launch):**

- Progressive Web App (PWA) installation
- Native mobile applications
- End-to-end encryption for sensitive chats
- Premium subscription tiers
- Advanced moderation AI
- Community guidelines education
- Reputation scoring system

### 2.3 Assumptions and Constraints

#### Assumptions

**User Behavior:**

- Users have stable internet connections (minimum 3G/4G or broadband)
- Users are comfortable with web-based chat applications
- Target demographic has email addresses for registration
- Users understand basic chat application conventions
- Random chat feature will attract and retain users despite anonymity

**Technical:**

- Supabase can handle expected user load and concurrent connections
- Vercel deployment will provide adequate performance and scalability
- MCP Server integration with Supabase will function reliably in production
- Browser support for modern web APIs (WebSockets, notifications)
- Google Analytics provides sufficient analytics capabilities

**Business:**

- No immediate monetization required (focus on user growth)
- Marketing and user acquisition will be handled separately
- Legal and compliance frameworks are in place for user-generated content
- Customer support infrastructure will be established
- Moderation team will be available for manual reviews

**Regulatory:**

- Users are 16+ years old (minimum age restriction)
- Application complies with GDPR, CCPA, and relevant data protection laws
- Terms of Service and Privacy Policy are legally reviewed and approved
- User consent mechanisms are compliant with regional regulations

#### Constraints

**Technical Constraints:**

- Frontend must be built with Next.js 14+ (App Router)
- Backend must use Supabase exclusively (PostgreSQL database)
- All Supabase interactions must go through MCP Server
- Hosting limited to Vercel platform
- No self-hosted infrastructure components
- Must support modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Mobile web experience must be functional (no native apps initially)

**Resource Constraints:**

- Development timeline: 3-6 months for Phase 1
- Engineering team: Assumed 2-4 full-stack developers
- Design team: Assumed 1-2 UI/UX designers
- QA resources: Assumed 1-2 QA engineers
- Budget constraints: Leverage free/low-cost tiers initially

**Operational Constraints:**

- Manual moderation capacity initially limited
- Customer support response time: 24-48 hours
- No 24/7 real-time monitoring initially
- Reliance on Supabase and Vercel SLA commitments

**Legal Constraints:**

- Must comply with DMCA for user-generated content
- Must implement age verification/restrictions
- Must provide user data export (GDPR compliance)
- Must honor user deletion requests within 30 days
- Must maintain audit logs for reported content

**Scalability Constraints:**

- Supabase free tier limitations (may require upgrade)
- Vercel bandwidth and function execution limits
- Database connection pooling limits
- Storage limits for media files
- Real-time connection limits (WebSocket connections)

---

## Step 3: User Experience & Workflows

### 3.1 High-Level User Journeys

#### Journey 1: New User Onboarding

**Goal:** User creates account and sends first message

1. User visits Chugli website
2. User clicks "Sign Up" button
3. User enters email, username, password
4. User receives verification email
5. User clicks verification link
6. User lands on main chat interface
7. User sees onboarding tour (optional skip)
8. User searches for a contact or enters random chat
9. User sends first message
10. User receives response and continues conversation

**Success Criteria:** User sends at least one message within first session

#### Journey 2: Persistent Chat Conversation

**Goal:** User communicates with known contact

1. User logs into Chugli
2. User sees chat list with existing conversations
3. User clicks on specific contact or searches for new contact
4. User enters chat interface
5. User composes and sends message
6. User sees delivery and read receipts
7. User receives response in real-time
8. User continues conversation with text/media
9. User exits chat (conversation persists)

**Success Criteria:** Successful message exchange with <500ms latency

#### Journey 3: Random Chat Experience

**Goal:** User connects with random stranger anonymously

1. User clicks "Random Chat" button from main interface
2. User enters random chat queue
3. System generates temporary username for user
4. System matches user with available stranger
5. User sees match confirmation with stranger's temporary username
6. User exchanges messages anonymously
7. User can report/block if abuse occurs OR continue chatting
8. User clicks "Next" to find new match OR "Leave" to exit
9. Chat history is automatically deleted
10. User returns to main interface

**Success Criteria:** Successful match within 10 seconds, no data leakage

#### Journey 4: Media Sharing

**Goal:** User shares image in persistent chat

1. User is in active persistent chat conversation
2. User clicks attachment/media icon
3. User selects image from device
4. System validates file size and type
5. User sees upload progress indicator
6. Image uploads to Supabase Storage
7. Image preview appears in chat
8. Contact receives image notification
9. Contact views/downloads image
10. Image persists in chat history

**Success Criteria:** Image uploads and displays within 5 seconds

#### Journey 5: Report & Block Abusive User

**Goal:** User reports inappropriate behavior

1. User encounters abusive content/behavior
2. User clicks report/block button
3. User selects reason from predefined list
4. User optionally adds description
5. System captures context (last N messages, user IDs)
6. Report is submitted to moderation queue
7. User immediately blocks offending user
8. User receives confirmation
9. User can continue using platform safely
10. Moderation team reviews report within SLA

**Success Criteria:** Report submitted <10 seconds, immediate block effect

### 3.2 Detailed User Flows

#### Flow 1: User Registration (Happy Path)

**Trigger:** User clicks "Sign Up" on landing page

**Steps:**

1. System displays registration form
   - Email field (required, validated)
   - Username field (required, 3-20 chars, alphanumeric + underscore)
   - Display name field (optional, 1-50 chars)
   - Password field (required, min 8 chars, complexity rules)
   - Confirm password field (required, must match)
   - Age confirmation checkbox (16+ years)
   - Terms of Service acceptance checkbox (required)

2. User fills form and clicks "Create Account"

3. System validates input:
   - Email format validation
   - Email uniqueness check (Supabase query)
   - Username uniqueness check
   - Password strength validation
   - All required fields present

4. System creates user record in Supabase Auth
   - Generates unique user ID
   - Hashes password
   - Sets email_confirmed = false
   - Creates timestamp

5. System creates user profile in database
   - Links to auth user ID
   - Stores username, display name
   - Sets default privacy settings
   - Creates empty contact list

6. System sends verification email via Supabase
   - Contains unique verification link with token
   - Token expires in 24 hours

7. System displays success message
   - "Verification email sent to [email]"
   - Option to resend email
   - Redirects to login page

8. User checks email and clicks verification link

9. System validates token:
   - Token exists and not expired
   - Marks email_confirmed = true
   - Updates user status to active

10. System redirects to login page with success message

11. User logs in with credentials

12. System authenticates user:
    - Validates email + password via Supabase Auth
    - Creates session token
    - Sets session cookie (httpOnly, secure)

13. System redirects to main chat interface

14. System displays onboarding overlay (first login only):
    - Brief feature tour
    - Random chat explanation
    - Privacy and safety tips
    - Option to skip tour

15. User lands on empty chat list with quick action buttons

**Edge Cases:**

- **Email already registered:**
  - Display error: "Email already registered. Please login or reset password."
  - Provide link to login page
  - Provide link to password reset

- **Username already taken:**
  - Display error: "Username taken. Please choose another."
  - Suggest alternative usernames (username123, username_123)
  - Allow user to retry without re-entering other fields

- **Weak password:**
  - Display error: "Password must be at least 8 characters with uppercase, lowercase, and number"
  - Show password strength indicator in real-time
  - Provide examples of strong passwords

- **Email verification not completed:**
  - User tries to login before verifying
  - System displays: "Please verify your email first"
  - Provide "Resend verification email" button
  - Log this event for analytics

- **Verification link expired:**
  - Display: "Verification link expired. Please request a new one."
  - Provide button to resend verification
  - Extend expiration to 24 hours from resend time

- **Network error during registration:**
  - Display user-friendly error message
  - Preserve form data (except password fields)
  - Provide "Try Again" button
  - Log error to monitoring system

#### Flow 2: Sending Message in Persistent Chat (Happy Path)

**Trigger:** User opens existing conversation or starts new chat

**Steps:**

1. User navigates to chat interface
   - From chat list: clicks on existing conversation
   - From search: finds user and clicks to start chat

2. System loads chat history:
   - Query last 50 messages from database via MCP Server
   - Display messages in chronological order
   - Show sender, timestamp, read status
   - Scroll to bottom (most recent)

3. System establishes real-time connection:
   - Create WebSocket connection via Supabase Realtime
   - Subscribe to chat channel for this conversation
   - Display online status of contact

4. User sees chat interface:
   - Message history above
   - Typing indicator area
   - Message input field at bottom
   - Send button (enabled when text present)
   - Attachment button
   - Contact info in header

5. User types message in input field
   - System detects typing
   - System broadcasts typing indicator to contact via Realtime
   - Contact sees "[Username] is typing..."

6. User clicks "Send" button or presses Enter

7. System validates message:
   - Message not empty (after trimming whitespace)
   - Message length ≤ 5,000 characters
   - User not blocked by recipient
   - User not in cooldown period (rate limiting)

8. System creates optimistic UI update:
   - Displays message immediately in chat
   - Shows "Sending..." status with clock icon
   - Maintains scroll position at bottom

9. System sends message to Supabase via MCP Server:
   - Generate unique message ID
   - Create message record:
     - conversation_id
     - sender_id (current user)
     - recipient_id (contact)
     - message_text
     - timestamp (server time)
     - status = 'sent'
     - message_type = 'text'

10. Supabase confirms write:
    - Returns message ID and timestamp
    - Triggers Realtime broadcast to subscribed clients

11. System updates UI:
    - Change status from "Sending..." to "Sent" (single checkmark)
    - Display server timestamp

12. Contact's client receives real-time update:
    - Message appears in their chat interface
    - Notification sound plays (if enabled)
    - Browser notification shows (if permitted and app not focused)
    - Unread count increments in chat list

13. System sends delivery receipt:
    - Contact's client sends delivery confirmation via Realtime
    - Message status updates to "Delivered" (double checkmark)
    - Sender sees status update in real-time

14. Contact views message:
    - Message enters viewport of contact's screen
    - System sends read receipt via Realtime
    - Message status updates to "Read" (blue double checkmark)
    - Sender sees status update

15. Message input field clears, ready for next message

**Edge Cases:**

- **Recipient is offline:**
  - Message still saved to database
  - Status remains "Sent" (single checkmark)
  - When recipient comes online, message delivered
  - Delivery receipt sent when app opens
  - Read receipt sent when message viewed

- **Network interruption during send:**
  - Optimistic UI shows "Sending..."
  - Request times out after 10 seconds
  - System retries send 3 times with exponential backoff
  - If all retries fail, show "Failed to send" with retry button
  - Message stored locally (browser storage) for manual retry
  - User can click retry or delete failed message

- **User is blocked by recipient:**
  - System validates block status before send
  - Display error: "Unable to send message"
  - Do NOT reveal that user is blocked (privacy)
  - Log event for analytics
  - Message not saved to database

- **Message exceeds character limit:**
  - Display character counter as user types
  - When approaching limit (4,900 chars), show warning
  - At 5,000 chars, disable send button
  - Display error: "Message too long (max 5,000 characters)"
  - Suggest splitting into multiple messages

- **Rapid message sending (rate limiting):**
  - User sends >10 messages in 30 seconds
  - System enforces cooldown: 3-second delay between messages
  - Display toast: "Please slow down"
  - Send button disabled during cooldown
  - Show countdown timer "Send available in 3... 2... 1..."

- **Profanity filter triggered:**
  - System scans message for banned words/phrases
  - If detected, display warning: "Message may contain inappropriate content"
  - Offer to edit message or send anyway
  - If user confirms send, message flagged for review
  - Repeated violations trigger account warning/suspension

- **Database write failure:**
  - System receives error from Supabase
  - Display error: "Message failed to send. Try again."
  - Provide retry button
  - Log error with context for debugging
  - If persistent, escalate to error monitoring

- **Real-time connection dropped:**
  - Detect WebSocket disconnection
  - Display warning banner: "Connection lost. Reconnecting..."
  - Attempt reconnection with exponential backoff
  - Queue outgoing messages locally
  - When reconnected, sync queued messages
  - Display success: "Reconnected" banner for 3 seconds

#### Flow 3: Random Chat Matching (Happy Path)

**Trigger:** User clicks "Start Random Chat" button

**Steps:**

1. User clicks "Start Random Chat" from main interface
   - Button prominently displayed in navigation or dashboard
   - First-time users see brief explanation tooltip

2. System validates user eligibility:
   - User is authenticated
   - User not currently in another random chat session
   - User account in good standing (not banned/suspended)
   - User not in cooldown period from previous abuse reports

3. System displays random chat loading screen:
   - "Finding a stranger to chat with..."
   - Animated loading indicator
   - "Cancel" button to abort matching

4. System generates temporary identity for user:
   - Create temporary username: "Stranger\_" + random 6-digit alphanumeric
   - Generate unique session ID (UUID)
   - Store temporary identity mapping in database:
     - session_id
     - actual_user_id (hashed/encrypted)
     - temporary_username
     - created_at (timestamp)
     - status = 'matching'

5. System adds user to random chat queue:
   - Insert into random_chat_queue table via MCP Server
   - Record preferences (if any, e.g., language - future feature)
   - Record timestamp of queue entry

6. System initiates matching algorithm:
   - Query queue for available users (status = 'matching')
   - Exclude previously matched users (check match_history table)
   - Filter out blocked users (bidirectional block check)
   - Apply FIFO or intelligent matching logic

7. System finds suitable match:
   - Two users selected from queue
   - Create conversation record:
     - conversation_id (unique)
     - user_1_session_id
     - user_2_session_id
     - conversation_type = 'random_chat'
     - started_at (timestamp)
     - status = 'active'

8. System updates both users' session status:
   - Change status from 'matching' to 'matched'
   - Link to conversation_id
   - Remove from queue

9. System establishes real-time chat channel:
   - Create Supabase Realtime channel for conversation_id
   - Subscribe both users to channel

10. System notifies both users of successful match:
    - Replace loading screen with chat interface
    - Display: "Connected to [Stranger_ABC123]"
    - Show temporary username for each user
    - Display quick safety tips in header
    - Enable message input field

11. Users can now exchange messages:
    - Message flow similar to persistent chat
    - Messages stored temporarily in random_chat_messages table
    - Session_id used instead of user_id in messages
    - Real-time message delivery via Realtime channel

12. Chat interface includes special controls:
    - "Next" button: Skip to new random user
    - "Leave" button: Exit random chat entirely
    - "Report" button: Flag inappropriate behavior
    - "Block" button: Block this user from future matches

13. Users engage in conversation:
    - Exchange text messages
    - See typing indicators
    - Messages limited to 2,000 characters (shorter than persistent chat)

14. User decides to end chat (two scenarios):

    **Scenario A: User clicks "Next"**
    - System displays confirmation: "Skip to next stranger?"
    - User confirms
    - System disconnects current chat
    - System adds current match to match_history (prevent repeat)
    - System deletes all messages from current session
    - System returns user to matching queue (go to step 5)

    **Scenario B: User clicks "Leave"**
    - System displays confirmation: "Exit random chat?"
    - User confirms
    - System disconnects chat
    - System notifies other user: "[Stranger] has left"
    - System deletes all messages from session
    - System updates session status = 'ended'
    - System removes user from random chat
    - User returns to main chat interface

15. System cleans up session data:
    - Delete all messages from random_chat_messages table
    - Update conversation status = 'ended'
    - Record session metadata for analytics only:
      - Session duration
      - Message count
      - End reason (next, leave, disconnect)
      - No message content stored
    - Remove temporary username mapping after 24 hours

**Edge Cases:**

- **No available users in queue:**
  - User enters queue as first/only user
  - Display: "Searching for someone to chat with..."
  - Wait up to 60 seconds
  - If no match found, display: "No one available right now. Try again later."
  - Provide "Keep Waiting" and "Cancel" buttons
  - If user keeps waiting, extend timeout to 5 minutes
  - Send notification when match found

- **Match disconnects immediately:**
  - Other user leaves within 5 seconds of match
  - Display: "Stranger disconnected. Finding new match..."
  - Automatically return user to queue
  - Do not count as completed match in analytics

- **User has been blocked by potential match:**
  - Matching algorithm excludes blocked users
  - User A blocked by User B
  - System skips User B when matching User A
  - No indication given to User A (privacy)
  - Match continues to next available user

- **User already matched this stranger before:**
  - System checks match_history table
  - If match exists, exclude from potential matches
  - Ensures users matched only once
  - Match history persists for user lifetime (or configurable period)

- **User tries to start multiple random chats:**
  - User opens app in two tabs/windows
  - Clicks "Start Random Chat" in both
  - System detects existing active session
  - Display error: "You're already in a random chat"
  - Provide button to "Go to Active Chat"

- **Connection drops during random chat:**
  - Detect WebSocket disconnection
  - Display: "Connection lost. Reconnecting..."
  - Attempt reconnection for 30 seconds
  - If reconnected, resume chat
  - If fails, notify other user: "Stranger disconnected"
  - End session and clean up data

- **Abusive content detected mid-chat:**
  - Message contains flagged content
  - System blocks message from sending
  - Display warning to sender: "Message blocked for violating guidelines"
  - Log incident to user's record
  - If repeated (3+ times in single session), auto-disconnect chat
  - User placed in 24-hour cooldown from random chat
  - Moderation team notified for review

- **User reports match during chat:**
  - User clicks "Report" button
  - System displays report form
  - User selects reason and submits
  - Chat continues but is flagged for review
  - System captures last 20 messages for moderation
  - If severe (e.g., threats, explicit content), auto-disconnect both users
  - Reported user investigated by moderation team

- **Queue timeout (no match found):**
  - User waits 5 minutes in queue
  - System displays: "No matches found. Try again later."
  - Remove user from queue
  - Return to main interface
  - Log timeout for analytics (identify low-traffic periods)

- **Temporary username collision (rare):**
  - Two users generate same temporary username
  - System detects collision during creation
  - Regenerate username for second user
  - Ensure uniqueness before proceeding
  - Maximum 5 retry attempts
  - If all fail, log error and assign deterministic unique name

### 3.3 Accessibility and Usability Considerations

#### Accessibility (WCAG 2.1 AA Compliance)

**Keyboard Navigation:**

- All interactive elements accessible via keyboard
- Logical tab order throughout application
- Visible focus indicators (2px solid outline)
- Shortcuts for common actions:
  - `Ctrl/Cmd + K`: Search contacts
  - `Esc`: Close modals/dialogs
  - `Enter`: Send message (with `Shift + Enter` for new line)
  - `Alt + N`: Start random chat
  - `Alt + L`: Leave current chat

**Screen Reader Support:**

- Semantic HTML structure (nav, main, aside, article)
- ARIA labels for icon-only buttons
- ARIA live regions for:
  - Incoming messages
  - Typing indicators
  - Connection status changes
  - Error messages
- Alt text for all images (user avatars, shared media)
- Descriptive link text (no "click here")

**Visual Accessibility:**

- Color contrast ratio ≥ 4.5:1 for normal text
- Color contrast ratio ≥ 3:1 for large text (18pt+)
- Never rely on color alone to convey information
- Text resizable up to 200% without loss of functionality
- Dark mode and light mode both meet contrast requirements
- Focus indicators clearly visible in both modes

**Motor Accessibility:**

- Touch targets minimum 44x44 pixels (mobile)
- Click targets minimum 24x24 pixels (desktop)
- Adequate spacing between interactive elements
- No time-based actions requiring rapid response
- Sticky headers/footers to minimize scrolling

**Cognitive Accessibility:**

- Clear, simple language in UI text
- Consistent navigation structure
- Visual hierarchy with headings and spacing
- Error messages that explain how to fix the issue
- Confirmation dialogs for destructive actions
- Progress indicators for long operations
- Option to disable animations (respects prefers-reduced-motion)

**Language Support:**

- UTF-8 encoding for international characters
- RTL (right-to-left) support for applicable languages
- Initial launch: English only
- Architecture supports future localization

#### Usability Best Practices

**Responsive Design:**

- Mobile-first approach
- Breakpoints:
  - Mobile: 320px - 767px
  - Tablet: 768px - 1023px
  - Desktop: 1024px+
- Adaptive layouts for each breakpoint
- Touch-friendly controls on mobile
- Optimized font sizes per device type

**Performance Perception:**

- Optimistic UI updates (instant feedback)
- Skeleton screens during loading
- Progressive loading of chat history
- Image lazy loading
- Infinite scroll for long chat lists
- Loading indicators for operations >1 second

**Error Handling:**

- Clear, actionable error messages
- Avoid technical jargon in user-facing errors
- Suggest solutions or next steps
- Persistent errors display "Contact Support" option
- Retry mechanisms for transient failures
- Graceful degradation when features unavailable

**Onboarding:**

- Optional interactive tour for first-time users
- Contextual tooltips for new features
- Empty states with call-to-action guidance
- Sample conversation to demonstrate features

Progressive disclosure (advanced features hidden initially)

**Feedback & Confirmation:**

- Visual feedback for all user actions
- Loading states for asynchronous operations
- Success confirmations for important actions
- Confirmation dialogs for destructive actions (delete, block)
- Toast notifications for background events
- Sound effects (optional, user-configurable)

**Search & Discovery:**

- Real-time search results (debounced)
- Search suggestions/autocomplete
- Recent searches saved
- Clear search history option
- Empty states for no results with suggestions

**Notifications:**

- Browser notification permission request (after first interaction)
- In-app notification center
- Notification preferences per conversation
- Do Not Disturb mode
- Desktop notifications with message preview (configurable)
- Badge counts for unread messages

**Privacy Indicators:**

- Clear indication when in random chat mode
- Warning when sharing media in random chat (if feature added)
- Visibility indicators (who can see profile, status)
- Data usage transparency
- Easy access to privacy settings

---

## Step 4: Functional Requirements

### 4.1 Authentication & User Management

#### FR-AUTH-001: User Registration

**Description:** Users must be able to create a new account.

**User Actions:**

- Navigate to registration page
- Enter email address
- Create unique username (3-20 characters, alphanumeric + underscore)
- Enter display name (optional, 1-50 characters)
- Create password (min 8 characters)
- Confirm password
- Confirm age (16+ checkbox)
- Accept Terms of Service
- Submit registration form

**System Behavior:**

- Validate email format (RFC 5322 standard)
- Check email uniqueness in Supabase Auth
- Validate username uniqueness (case-insensitive)
- Validate username format (regex: `^[a-zA-Z0-9_]{3,20}$`)
- Validate password strength:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - Special characters allowed but not required
- Verify password confirmation matches
- Create user in Supabase Auth
- Create user profile in database (via MCP Server):
  - `user_id` (UUID, primary key, references auth.users)
  - `username` (unique, indexed)
  - `display_name`
  - `email` (from auth)
  - `created_at` (timestamp)
  - `updated_at` (timestamp)
  - `is_active` (boolean, default true)
  - `email_confirmed` (boolean, default false)
- Generate email verification token
- Send verification email via Supabase Auth
- Display success message with instruction to check email
- Redirect to login page

**Validations:**

- Email format valid
- Email not already registered
- Username available and valid format
- Password meets complexity requirements
- Passwords match
- Age confirmation checked
- Terms accepted

**Error Handling:**

- Duplicate email: "This email is already registered. Please log in or reset your password."
- Duplicate username: "Username taken. Please choose another."
- Weak password: Display specific requirements not met
- Network error: "Unable to complete registration. Please try again."
- Database error: Log error, display generic message, notify engineering team

**Acceptance Criteria:**

- User can successfully register with valid inputs
- Duplicate detection prevents multiple accounts with same email/username
- Verification email delivered within 60 seconds
- User profile created in database linked to auth user
- Registration analytics event fired

---

#### FR-AUTH-002: Email Verification

**Description:** Users must verify their email address before accessing the platform.

**User Actions:**

- Check email inbox for verification message
- Click verification link in email
- Optionally resend verification email if not received

**System Behavior:**

- Generate unique verification token (UUID)
- Store token with expiration (24 hours)
- Send email with verification link: `https://chugli.app/verify-email?token={token}`
- When link clicked:
  - Validate token exists and not expired
  - Mark email as verified (`email_confirmed = true`)
  - Update user status to active
  - Invalidate token
  - Redirect to login page with success message
- Provide "Resend verification email" option:
  - Throttle to 1 resend per 5 minutes
  - Generate new token (invalidate old)
  - Send new email

**Validations:**

- Token exists in database
- Token not expired (24 hours)
- Token not already used
- User account exists

**Error Handling:**

- Expired token: "Verification link expired. Please request a new one."
- Invalid token: "Invalid verification link. Please try again."
- Already verified: "Email already verified. Please log in."
- Resend rate limit: "Please wait 5 minutes before requesting a new verification email."

**Acceptance Criteria:**

- Verification link successfully verifies email
- Expired links cannot be used
- Users can resend verification email
- Rate limiting prevents abuse
- Verified users can log in

---

#### FR-AUTH-003: User Login

**Description:** Users must be able to log into their account.

**User Actions:**

- Navigate to login page
- Enter email address
- Enter password
- Click "Login" button
- Optionally select "Remember me" checkbox

**System Behavior:**

- Authenticate via Supabase Auth
- Validate email and password
- Check if email is verified
- Create session token (JWT)
- Set secure, httpOnly session cookie
- If "Remember me" selected, extend session duration to 30 days (default: 7 days)
- Fetch user profile from database
- Redirect to main chat interface
- Initialize real-time connections

**Validations:**

- Email format valid
- Password not empty
- Credentials match database record
- Email is verified

**Error Handling:**

- Invalid credentials: "Invalid email or password"
- Unverified email: "Please verify your email address first. [Resend verification]"
- Account suspended: "Your account has been suspended. Contact support."
- Too many attempts: Rate limit after 5 failed attempts in 15 minutes, lock for 30 minutes
- Network error: "Unable to log in. Please try again."

**Acceptance Criteria:**

- Valid users can log in successfully
- Session persists across page refreshes
- Unverified users cannot log in
- Rate limiting prevents brute force attacks
- Login analytics event fired

---

#### FR-AUTH-004: Password Reset

**Description:** Users must be able to reset forgotten passwords.

**User Actions:**

- Click "Forgot Password" link on login page
- Enter email address
- Submit request
- Check email for reset link
- Click reset link
- Enter new password
- Confirm new password
- Submit new password

**System Behavior:**

- Validate email exists in system
- Generate password reset token (UUID)
- Store token with 1-hour expiration
- Send reset email with link: `https://chugli.app/reset-password?token={token}`
- When reset link clicked:
  - Validate token exists and not expired
  - Display password reset form
  - Accept new password
  - Validate password strength
  - Hash new password
  - Update password in Supabase Auth
  - Invalidate reset token
  - Invalidate all existing sessions (force re-login)
  - Redirect to login with success message

**Validations:**

- Email exists (do not reveal if email not found for security)
- Token valid and not expired
- New password meets complexity requirements
- Passwords match

**Error Handling:**

- Token expired: "Reset link expired. Please request a new one."
- Invalid token: "Invalid reset link. Please try again."
- Weak password: Display specific requirements
- Rate limiting: Max 3 reset requests per hour per email

**Acceptance Criteria:**

- Reset emails sent within 60 seconds
- Valid tokens allow password change
- Old password no longer works after reset
- All sessions invalidated after reset
- Reset analytics event fired

---

#### FR-AUTH-005: User Logout

**Description:** Users must be able to securely log out.

**User Actions:**

- Click "Logout" button in settings or header
- Confirm logout (if desired)

**System Behavior:**

- Invalidate session token
- Clear session cookie
- Close all real-time connections (WebSocket)
- Clear sensitive data from local state
- Redirect to landing/login page

**Validations:**

- User is currently authenticated

**Error Handling:**

- Network error during logout: Still clear local session and redirect

**Acceptance Criteria:**

- User successfully logged out
- Session invalid after logout
- Real-time connections closed
- User redirected to public page
- Cannot access protected routes without re-authentication

---

### 4.2 User Profile Management

#### FR-PROFILE-001: View Own Profile

**Description:** Users can view and edit their own profile.

**User Actions:**

- Click profile icon/avatar in header
- Navigate to "Profile" or "Settings" page

**System Behavior:**

- Display current profile information:
  - Profile picture
  - Display name
  - Username (not editable)
  - Email (not editable, shows if verified)
  - Bio (optional, max 200 characters)
  - Account creation date
  - Privacy settings
- Provide "Edit Profile" button

**Validations:**

- User is authenticated

**Error Handling:**

- Profile load failure: Display cached data if available, or generic error

**Acceptance Criteria:**

- Profile displays current user data
- All fields render correctly
- Profile accessible from multiple entry points

---

#### FR-PROFILE-002: Edit Profile

**Description:** Users can update their profile information.

**User Actions:**

- Click "Edit Profile" button
- Update editable fields:
  - Display name
  - Bio
  - Profile picture (upload new image)
- Click "Save Changes"

**System Behavior:**

- Validate inputs:
  - Display name: 1-50 characters
  - Bio: 0-200 characters
  - Profile picture: Image file, max 5MB, formats: JPG, PNG, GIF, WebP
- If profile picture changed:
  - Upload to Supabase Storage (bucket: `profile-pictures`)
  - Generate thumbnail (200x200px)
  - Update profile record with image URL
  - Delete old profile picture (if exists)
- Update profile record in database via MCP Server
- Display success message
- Refresh profile display

**Validations:**

- Display name not empty (if provided)
- Bio within character limit
- Image file type and size valid

**Error Handling:**

- Invalid image format: "Please upload JPG, PNG, GIF, or WebP image"
- Image too large: "Image must be under 5MB"
- Upload failure: "Failed to upload image. Please try again."
- Database update failure: "Failed to save changes. Please try again."

**Acceptance Criteria:**

- Profile updates save successfully
- Changes reflect immediately in UI
- Profile picture uploads and displays
- Old images cleaned up from storage

---

#### FR-PROFILE-003: View Other User Profile

**Description:** Users can view public profiles of other users.

**User Actions:**

- Click on another user's avatar or username
- View profile page

**System Behavior:**

- Fetch user profile from database
- Display public information:
  - Profile picture
  - Display name
  - Username
  - Bio (if set)
  - Online/offline status
  - Option to "Start Chat" button
  - Option to "Block User" button
- Hide private information (email, settings, etc.)

**Validations:**

- Requested user exists
- Viewer is authenticated

**Error Handling:**

- User not found: "User not found"
- Blocked user: Display limited profile or "User not available"

**Acceptance Criteria:**

- Public profiles accessible to all authenticated users
- Private data not exposed
- Action buttons functional (start chat, block)

---

#### FR-PROFILE-004: Delete Account

**Description:** Users can permanently delete their account and all associated data.

**User Actions:**

- Navigate to Settings > Account
- Click "Delete Account" button
- Confirm deletion (type username to confirm)
- Optionally provide reason for deletion
- Submit deletion request

**System Behavior:**

- Display strong warning about data loss
- Require username confirmation match
- Require password re-entry
- Upon confirmation:
  - Mark account as `deleted` (soft delete initially)
  - Anonymize user data:
    - Replace username with "deleted*user*{id}"
    - Clear display name, bio
    - Remove profile picture
  - Delete all user's persistent chat messages (30-day delay)
  - Remove from all contacts lists
  - Invalidate all sessions
  - Delete uploaded media files from storage
  - Remove from random chat queue if present
  - Schedule permanent hard delete after 30 days (recovery period)
- Send confirmation email
- Log user out immediately
- Display goodbye message

**Validations:**

- Username confirmation matches exactly
- Password correct
- User confirms understanding of data loss

**Error Handling:**

- Incorrect password: "Incorrect password. Please try again."
- Confirmation mismatch: "Username confirmation does not match"
- Database error: "Unable to delete account. Please contact support."

**Acceptance Criteria:**

- Account deletion completes successfully
- User data anonymized immediately
- 30-day recovery window enforced
- User logged out and cannot log back in
- Deletion analytics event fired (anonymized)

---

### 4.3 Persistent Chat Features

#### FR-CHAT-001: Send Text Message

**Description:** Users can send text messages to other users in persistent chats.

**User Actions:**

- Open chat with specific contact
- Type message in input field
- Press Enter or click Send button

**System Behavior:**

- Validate message:
  - Not empty (after trimming whitespace)
  - Length ≤ 5,000 characters
  - User not blocked by recipient
- Create message record via MCP Server:
  - `message_id` (UUID)
  - `conversation_id`
  - `sender_id`
  - `recipient_id`
  - `message_text`
  - `timestamp` (server time)
  - `message_type` = 'text'
  - `status` = 'sent'
- Optimistically display message in UI
- Broadcast message via Supabase Realtime to conversation channel
- Update conversation's `last_message_at` timestamp
- If recipient online: Deliver in real-time
- If recipient offline: Store for delivery when online
- Send push notification to recipient (if enabled)

**Validations:**

- Message not empty
- Message within character limit
- Sender not blocked by recipient
- Rate limiting: Max 10 messages per 30 seconds

**Error Handling:**

- Empty message: Disable send button
- Message too long: Display character count, disable send at 5,000
- Blocked by recipient: "Unable to send message" (don't reveal block)
- Rate limit: "Slow down. Wait {N} seconds."
- Network error: Show "Failed to send", provide retry button
- Profanity detected: Warn user, allow send or cancel

**Acceptance Criteria:**

- Messages send successfully with <500ms latency
- Recipient receives message in real-time if online
- Offline messages delivered when recipient comes online
- UI updates optimistically for smooth UX
- Message analytics event fired

---

#### FR-CHAT-002: Receive Text Message

**Description:** Users receive text messages from other users in real-time.

**User Actions:**

- Be online with application open
- Receive message notification

**System Behavior:**

- Supabase Realtime broadcasts new message to conversation channel
- Client receives message payload
- Display message in chat interface:
  - Sender name/avatar
  - Message text
  - Timestamp
  - Read status
- If chat is open and visible:
  - Scroll to new message
  - Mark as read immediately
  - Send read receipt to sender
- If chat is open but not visible (background tab):
  - Increment unread badge
  - Play notification sound (if enabled)
  - Show browser notification (if permitted)
- If user offline:
  - Store message in database
  - Deliver when user comes online

**Validations:**

- Message intended for current user
- Message not duplicate

**Error Handling:**

- Duplicate message: Deduplicate by message_id
- Malformed message: Log error, skip display
- Real-time connection lost: Queue messages, deliver when reconnected

**Acceptance Criteria:**

- Messages received in real-time (<500ms latency)
- Notifications work correctly based on user settings
- No duplicate messages displayed
- Offline messages delivered on next login

---

#### FR-CHAT-003: Message Read Receipts

**Description:** Senders can see when their messages have been delivered and read.

**User Actions:**

- Send message
- Observe status indicators

**System Behavior:**

- Message states:
  - **Sending:** Clock icon, message being sent
  - **Sent:** Single checkmark, saved to database
  - **Delivered:** Double checkmark, delivered to recipient's device
  - **Read:** Blue double checkmark, recipient viewed message
- When message delivered:
  - Recipient's client sends delivery receipt via Realtime
  - Update message status to 'delivered'
  - Update UI with double checkmark
- When message read:
  - Recipient's client sends read receipt when message enters viewport
  - Update message status to 'read'
  - Update UI with blue checkmark
  - Update `read_at` timestamp

**Validations:**

- User has enabled read receipts (default: on)
- Message belongs to current conversation

**Error Handling:**

- Receipt not received: Status remains at last known state
- Conflicting receipts: Use most recent status

**Acceptance Criteria:**

- Accurate status indicators displayed
- Read receipts sent when message viewed
- Status updates in real-time
- Users can disable read receipts in settings

---

#### FR-CHAT-004: Typing Indicators

**Description:** Users see when the other person is typing.

**User Actions:**

- Type in message input field
- Observe typing indicator when contact types

**System Behavior:**

- Detect typing in input field (debounced, 500ms)
- Broadcast "typing" event via Realtime to conversation channel
- Recipient sees "{Display Name} is typing..." indicator
- Stop broadcasting when:
  - User stops typing for >3 seconds
  - User sends message
  - User leaves chat
- Auto-hide typing indicator after 5 seconds if no update received

**Validations:**

- Only broadcast for active chat
- Throttle broadcasts (max 1 per second)

**Error Handling:**

- Real-time connection lost: No typing indicators shown
- Stale indicator: Auto-hide after timeout

**Acceptance Criteria:**

- Typing indicators appear within 500ms
- Indicators disappear when typing stops
- No performance impact from rapid typing
- Typing analytics event fired (aggregate)

---

#### FR-CHAT-005: Contact Search

**Description:** Users can search for other users to start conversations.

**User Actions:**

- Click "New Chat" or search icon
- Enter username or display name in search field
- View search results
- Click on user to start chat

**System Behavior:**

- Debounce search input (300ms)
- Query database for users matching search term:
  - Match against username (case-insensitive)
  - Match against display name (case-insensitive)
  - Exclude current user from results
  - Exclude blocked users (bidirectional)
  - Limit to 20 results
- Display results with:
  - Profile picture
  - Display name
  - Username
  - Online status
- Clicking result:
  - Check if conversation exists
  - If exists, open existing conversation
  - If not, create new conversation
  - Navigate to chat interface

**Validations:**

- Search term minimum 2 characters
- User authenticated

**Error Handling:**

- No results: "No users found matching '{term}'"
- Network error: "Search unavailable. Please try again."
- Database error: Log and display generic error

**Acceptance Criteria:**

- Search returns relevant results
- Results display within 1 second
- Can initiate chat from search results
- Search analytics event fired

---

#### FR-CHAT-006: Chat List View

**Description:** Users see a list of all their active conversations.

**User Actions:**

- Navigate to main chat interface
- View list of conversations

**System Behavior:**

- Query conversations from database:
  - Where user is participant
  - Order by `last_message_at` DESC (most recent first)
  - Include last message preview
  - Include unread count
  - Include contact info (name, avatar, status)
- Display each conversation:
  - Contact profile picture
  - Contact display name
  - Last message snippet (50 characters)
  - Timestamp of last message (relative: "5m ago", "Yesterday", "Dec 15")
  - Unread badge if unread messages exist
  - Online status indicator
- Real-time updates:
  - New messages update list order and last message
  - Unread counts update in real-time
  - Online status updates

**Validations:**

- User authenticated

**Error Handling:**

- No conversations: Display "No chats yet" with prompt to start new chat
- Load failure: Display cached conversations if available

**Acceptance Criteria:**

- Conversations sorted by recency
- Real-time updates work smoothly
- Unread counts accurate
- List performance acceptable with 100+ conversations

---

#### FR-CHAT-007: Message History

**Description:** Users can view full history of persistent conversations.

**User Actions:**

- Open conversation
- Scroll up to load older messages

**System Behavior:**

- Initially load last 50 messages
- Display in chronological order (oldest first)
- Scroll to bottom (most recent)
- Implement infinite scroll:
  - When user scrolls to top (within 200px)
  - Load next 50 older messages
  - Prepend to message list
  - Maintain scroll position
- Group messages by date with headers
- Display timestamp for each message (or grouped by time range)

**Validations:**

- User is participant in conversation

**Error Handling:**

- No more messages: Stop loading
- Load failure: Display "Failed to load messages. Retry."

**Acceptance Criteria:**

- Message history loads quickly (<1 second for 50 messages)
- Infinite scroll works smoothly
- No janky scroll behavior
- Messages display in correct order

---

#### FR-CHAT-008: Send Image

**Description:** Users can send images in persistent chats.

**User Actions:**

- Click attachment/image icon in chat
- Select image file from device
- Preview image before sending
- Optionally add caption
- Send image

**System Behavior:**

- Validate file:
  - File type: JPG, PNG, GIF, WebP
  - File size: Max 10MB
- Display preview modal with:
  - Image preview
  - Caption input (optional, max 200 characters)
  - Send and Cancel buttons
- On send:
  - Generate unique filename (UUID + extension)
  - Upload to Supabase Storage (bucket: `chat-media`)
  - Create message record:
    - `message_type` = 'image'
    - `media_url` = Storage URL
    - `media_caption` = Caption text
  - Display uploading progress indicator
  - Optimistically show image in chat with progress bar
  - Broadcast message via Realtime when upload complete
- Generate thumbnail (300x300px) for chat list preview
- Recipient can view full image (click to expand)
- Recipient can download image

**Validations:**

- File type allowed
- File size within limit
- User not blocked by recipient

**Error Handling:**

- Invalid file type: "Only images (JPG, PNG, GIF, WebP) allowed"
- File too large: "Image must be under 10MB. Please compress."
- Upload failure: Show "Upload failed", provide retry
- Network interruption: Pause and resume upload

**Acceptance Criteria:**

- Images upload successfully
- Progress indicator accurate
- Images display correctly in chat
- Thumbnails generated for performance
- Image analytics event fired

---

#### FR-CHAT-009: Send File

**Description:** Users can send files (documents, PDFs, etc.) in persistent chats.

**User Actions:**

- Click attachment icon in chat
- Select file from device
- Preview file info (name, size, type)
- Send file

**System Behavior:**

- Validate file:
  - Allowed types: PDF, DOC, DOCX, XLS, XLSX, TXT, ZIP
  - File size: Max 25MB
- Display file info before sending
- On send:
  - Upload to Supabase Storage (bucket: `chat-files`)
  - Create message record:
    - `message_type` = 'file'
    - `media_url` = Storage URL
    - `file_name` = Original filename
    - `file_size` = Size in bytes
    - `file_type` = MIME type
  - Display upload progress
  - Optimistically show file in chat
- Recipient sees file with:
  - File icon (based on type)
  - Filename
  - File size
  - Download button

**Validations:**

- File type allowed
- File size within limit
- User not blocked

**Error Handling:**

- Invalid file type: "File type not supported"
- File too large: "File must be under 25MB"
- Upload failure: Retry mechanism
- Virus scan fails (if implemented): Block file, notify user

**Acceptance Criteria:**

- Files upload successfully
- Download links work correctly
- File metadata displayed accurately
- Storage quota managed appropriately

---

#### FR-CHAT-010: Delete Message (Delete for Me)

**Description:** Users can delete messages from their own view.

**User Actions:**

- Long-press or right-click message
- Select "Delete for Me" option
- Confirm deletion

**System Behavior:**

- Add user_id to message's `deleted_for` array in database
- Remove message from user's view immediately
- Message still visible to other participants
- Do not send real-time update to other users
- Deleted messages not included in user's message history queries

**Validations:**

- User is participant in conversation
- Message exists

**Error Handling:**

- Database update failure: "Failed to delete message. Try again."

**Acceptance Criteria:**

- Message removed from user's view
- Other participants still see message
- Deletion persists across sessions
- Can delete any message in conversation

---

#### FR-CHAT-011: Mute Conversation

**Description:** Users can mute notifications for specific conversations.

**User Actions:**

- Open conversation settings (three-dot menu)
- Toggle "Mute Notifications"
- Select duration (1 hour, 8 hours, 1 week, Forever)

**System Behavior:**

- Update conversation settings in database:
  - `muted` = true
  - `muted_until` = timestamp (or null for forever)
- Suppress notifications for this conversation:
  - No browser notifications
  - No notification sounds
  - No badge count increment (optional)
- Visual indicator in chat list (muted icon)
- Auto-unmute when `muted_until` timestamp reached

**Validations:**

- User is participant in conversation

**Error Handling:**

- Settings update failure: Display error, retry

**Acceptance Criteria:**

- Notifications correctly suppressed
- Mute status persists across sessions
- Auto-unmute works at scheduled time
- Mute indicator visible

---

#### FR-CHAT-012: Block User

**Description:** Users can block other users to prevent communication.

**User Actions:**

- Open user profile or conversation settings
- Click "Block User"
- Confirm blocking

**System Behavior:**

- Create block record in database:
  - `blocker_id` (current user)
  - `blocked_id` (target user)
  - `created_at`
- Effects of blocking:
  - Blocked user cannot send messages to blocker
  - Blocker cannot send messages to blocked user (optional: allow one-way)
  - Blocked user excluded from blocker's search results
  - Blocker excluded from blocked user's search results
  - Cannot be matched in random chat
  - Existing conversation hidden from blocker's chat list
- Blocked user not notified of blocking (privacy)

**Validations:**

- Users not already blocked
- Cannot block self

**Error Handling:**

- Already blocked: "User already blocked"
- Block failure: "Unable to block user. Try again."

**Acceptance Criteria:**

- Block takes effect immediately
- Blocked user cannot contact blocker
- No notification sent to blocked user
- Block persists across sessions
- Can unblock user later

---

#### FR-CHAT-013: Unblock User

**Description:** Users can unblock previously blocked users.

**User Actions:**

- Navigate to Settings > Blocked Users
- View list of blocked users
- Click "Unblock" next to specific user
- Confirm unblocking

**System Behavior:**

- Delete block record from database
- Restore normal user interactions:
  - Can send/receive messages
  - Appear in search results
  - Can be matched in random chat
- Previous conversation becomes accessible again (if it still exists)

**Validations:**

- User is currently blocked

**Error Handling:**

- Unblock failure: "Unable to unblock user. Try again."

**Acceptance Criteria:**

- Unblock takes effect immediately
- Can resume communication
- Previously hidden conversation visible again

---

### 4.4 Random Chat Features

#### FR-RANDOM-001: Start Random Chat

**Description:** Users can enter random chat mode to be matched with a stranger.

**User Actions:**

- Click "Random Chat" button from main interface
- Wait for matching

**System Behavior:**

- Validate user eligibility:
  - Account in good standing (not banned)
  - Not currently in another random chat
  - Not in cooldown period (if recent abuse)
- Generate temporary identity:
  - Temporary username: "Stranger\_" + 6-digit alphanumeric
  - Session ID (UUID)
- Store temporary mapping in database (encrypted):
  - `session_id`
  - `user_id` (encrypted)
  - `temporary_username`
  - `status` = 'matching'
  - `created_at`
- Add user to matching queue
- Display "Finding someone to chat with..." loading screen
- Initiate matching algorithm (see FR-RANDOM-002)

**Validations:**

- User authenticated
- Not already in random chat
- Not in cooldown

**Error Handling:**

- Already in chat: Redirect to active chat
- Cooldown active: "Random chat available in {N} minutes"
- Queue join failure: "Unable to start random chat. Try again."

**Acceptance Criteria:**

- User enters queue successfully
- Temporary identity generated correctly
- Loading state displayed
- Random chat start analytics event fired

---

#### FR-RANDOM-002: Random Chat Matching

**Description:** System matches users in random chat queue.

**System Behavior:**

- Matching algorithm runs every 2 seconds
- Query queue for users with status = 'matching'
- Apply filters:
  - Exclude previously matched pairs (check match_history)
  - Exclude mutually blocked users
  - Prefer FIFO (first in, first matched)
- Select pair of users
- Create conversation record:
  - `conversation_id` (UUID)
  - `conversation_type` = 'random'
  - `session_1_id` (first user's session)
  - `session_2_id` (second user's session)
  - `started_at` (timestamp)
  - `status` = 'active'
- Update both sessions:
  - `status` = 'matched'
  - `conversation_id` = conversation ID
- Create Supabase Realtime channel for conversation
- Notify both users of successful match
- Display chat interface with temporary usernames

**Validations:**

- At least 2 users in queue
- Users meet matching criteria

**Error Handling:**

- No available match: Keep user in queue, timeout after 60 seconds
- Matching algorithm failure: Log error, retry

**Acceptance Criteria:**

- Users matched within 10 seconds (if match available)
- Matching fair (FIFO or random)
- Previous matches excluded
- Blocked users excluded
- Match analytics event fired

---

#### FR-RANDOM-003: Random Chat Messaging

**Description:** Users exchange messages in random chat sessions.

**User Actions:**

- Type and send messages in random chat

**System Behavior:**

- Similar to persistent chat messaging with differences:
  - Messages use session_id instead of user_id
  - Message length limit: 2,000 characters (shorter)
  - Messages stored in separate table: `random_chat_messages`
  - No read receipts (optional)
  - No media sharing (text only)
- Real-time delivery via Supabase Realtime
- Typing indicators (using temporary usernames)
- Message timestamps

**Validations:**

- Session active
- Message not empty
- Message within character limit

**Error Handling:**

- Session ended: "Chat has ended. Start a new random chat."
- Send failure: Retry mechanism

**Acceptance Criteria:**

- Messages delivered in real-time
- Temporary usernames displayed correctly
- No personal information leaked

---

#### FR-RANDOM-004: Skip to Next Random User

**Description:** Users can skip current match and find a new stranger.

**User Actions:**

- Click "Next" button during active random chat
- Confirm skip (optional)

**System Behavior:**

- Display confirmation: "Skip to next stranger?"
- On confirmation:
  - End current session
  - Notify other user: "{Temporary username} has left"
  - Delete all messages from current session
  - Add to match_history to prevent repeat match
  - Update session status = 'ended'
  - Return user to matching queue (re-run FR-RANDOM-001)
  - Generate new temporary username
  - Initiate new matching

**Validations:**

- Session active
- User not rate-limited (max 5 skips per 10 minutes)

**Error Handling:**

- Skip rate limit: "Too many skips. Please wait {N} seconds."
- Matching failure: Handle as in FR-RANDOM-002

**Acceptance Criteria:**

- Current chat ends immediately
- Messages deleted successfully
- New match found
- Skip analytics event fired

---

#### FR-RANDOM-005: Leave Random Chat

**Description:** Users can exit random chat mode entirely.

**User Actions:**

- Click "Leave" button
- Confirm exit

**System Behavior:**

- Display confirmation: "Exit random chat?"
- On confirmation:
  - End current session
  - Notify other user: "{Temporary username} has left"
  - Delete all messages from session
  - Update session status = 'ended'
  - Remove user from queue (if in queue)
  - Delete temporary identity mapping (after 24 hours for abuse investigation)
  - Return user to main chat interface

**Validations:**

- User in random chat or queue

**Error Handling:**

- Already exited: Redirect to main interface

**Acceptance Criteria:**

- User exits successfully
- Messages deleted
- Returns to main interface
- Leave analytics event fired

---

#### FR-RANDOM-006: Report User in Random Chat

**Description:** Users can report abusive behavior in random chat.

**User Actions:**

- Click "Report" button during random chat
- Select reason from list:
  - Harassment
  - Hate speech
  - Spam
  - Sexual content
  - Violence/threats
  - Other
- Optionally add description (max 500 characters)
- Submit report

**System Behavior:**

- Capture report context:
  - Reporter session ID
  - Reported session ID
  - Conversation ID
  - Last 20 messages (stored separately, flagged)
  - Timestamp
  - Reason and description
- Create report record via MCP Server
- Add to moderation queue
- Continue chat OR disconnect (user choice)
- If severe (hate speech, threats):
  - Auto-disconnect chat
  - Place reported user in 24-hour cooldown
- Send to moderation team for review
- Thank reporter: "Thank you for your report. We'll review this shortly."

**Validations:**

- Reason selected
- Description within limit (if provided)

**Error Handling:**

- Report submission failure: "Unable to submit report. Try again."
- Already reported: "You've already reported this user."

**Acceptance Criteria:**

- Report submitted successfully
- Context captured for moderation
- User can continue or leave chat
- Severe cases auto-disconnect
- Report analytics event fired

---

#### FR-RANDOM-007: Block User in Random Chat

**Description:** Users can block specific random chat matches.

**User Actions:**

- Click "Block" button during random chat
- Confirm blocking

**System Behavior:**

- Create block record:
  - Blocker's actual user ID (from encrypted session mapping)
  - Blocked user's actual user ID
- Immediately disconnect current chat
- Notify other user: "Stranger has left"
- Delete all messages
- Add to match_history (prevent future matching)
- Return blocker to main interface or new match (user choice)

**Validations:**

- Session active
- Not already blocked

**Error Handling:**

- Block failure: Still disconnect chat, retry block in background

**Acceptance Criteria:**

- Block takes effect immediately
- Users never matched again
- Chat disconnected
- Messages deleted
- Block analytics event fired

---

#### FR-RANDOM-008: Auto-Delete Random Chat History

**Description:** System automatically deletes random chat messages.

**System Behavior:**

- When random chat session ends (any reason):
  - Delete all messages from `random_chat_messages` table
  - Delete message media (if any, though not allowed currently)
  - Preserve session metadata only:
    - Session duration
    - Message count
    - End reason
    - No message content
  - Update conversation status = 'ended'
  - Update session records status = 'ended'
- Run cleanup job every hour:
  - Find ended sessions >1 hour old
  - Delete associated messages if not already deleted
  - Delete temporary username mappings >24 hours old (keep for abuse investigation window)
- Ensure no message content persists beyond session

**Validations:**

- Session has ended
- Messages not already deleted

**Error Handling:**

- Deletion failure: Retry on next cleanup run, alert engineers

**Acceptance Criteria:**

- Messages deleted immediately on session end
- No message content retrievable after session
- Cleanup job runs reliably
- Session metadata preserved for analytics only

---

#### FR-RANDOM-009: Prevent Repeat Matching

**Description:** Users are matched with each stranger only once.

**System Behavior:**

- When match created, insert into match_history:
  - `user_1_id` (actual user ID)
  - `user_2_id` (actual user ID)
  - `matched_at` (timestamp)
- Matching algorithm checks match_history:
  - For each potential pair, query if match exists
  - If exists, skip this pair
  - Continue to next potential match
- Match history persists indefinitely (or configurable period)

**Validations:**

- Match history query successful

**Error Handling:**

- Query failure: Log error, allow match (prefer UX over strict enforcement)

**Acceptance Criteria:**

- Users matched only once
- Match history query performant (<100ms)
- No duplicate matches

---

### 4.5 Moderation & Safety

#### FR-MOD-001: Content Moderation System

**Description:** System moderates user-generated content for safety.

**System Behavior:**

- **Automated Profanity Filter:**
  - Maintain list of banned words/phrases
  - Scan all messages before sending
  - If detected:
    - Block message
    - Display warning to sender
    - Log incident to user record
    - After 3 violations in 24 hours: 24-hour chat restriction
- **Manual Moderation Queue:**
  - Admin panel for moderators
  - Display reported content with context
  - Moderator actions:
    - Dismiss report (false positive)
    - Warn user
    - Temporary ban (1 day, 7 days, 30 days)
    - Permanent ban
    - Delete content
  - Track moderator actions for audit

**Validations:**

- Moderator authenticated with appropriate role

**Error Handling:**

- Profanity filter failure: Allow message, log error
- Moderation queue load failure: Retry, alert team

**Acceptance Criteria:**

- Profanity filter blocks obvious violations
- Moderation queue accessible to authorized users
- Moderator actions take effect immediately
- Audit trail maintained

---

#### FR-MOD-002: User Reporting

**Description:** Users can report inappropriate content/behavior.

**User Actions:**

- Click "Report" on message, user, or in random chat
- Select reason
- Provide description
- Submit report

**System Behavior:**

- Create report record:
  - Reporter ID
  - Reported user/message ID
  - Content context
  - Reason
  - Description
  - Timestamp
- Add to moderation queue
- Acknowledge receipt: "Thank you for your report"
- Moderate based on severity (see FR-RANDOM-006)

**Validations:**

- Reason selected
- Cannot report same content multiple times

**Error Handling:**

- Submission failure: Retry mechanism

**Acceptance Criteria:**

- Reports submitted successfully
- Appear in moderation queue
- Context captured adequately

---

#### FR-MOD-003: User Banning

**Description:** System can ban users for violations.

**System Behavior:**

- Moderator or automated system can ban users
- Ban types:
  - Temporary (duration specified)
  - Permanent
- When banned:
  - Update user status = 'banned'
  - Set `banned_until` (for temporary)
  - Set `ban_reason`
  - Invalidate all sessions (force logout)
  - Prevent login attempts
  - Display ban message on login attempt
- Banned users:
  - Cannot log in
  - Cannot send messages
  - Removed from random chat queue
  - Existing messages visible to recipients (or deleted based on policy)

**Validations:**

- Moderator has ban permission
- Ban reason provided

**Error Handling:**

- Ban application failure: Retry, alert team

**Acceptance Criteria:**

- Bans enforced immediately
- Temporary bans expire automatically
- Banned users cannot access platform
- Ban reason communicated to user

---

### 4.6 Notifications

#### FR-NOTIF-001: Browser Push Notifications

**Description:** Users receive browser notifications for new messages.

**User Actions:**

- Grant notification permission when prompted
- Configure notification preferences in settings

**System Behavior:**

- Request notification permission after first message sent/received
- When new message received and user not on app:
  - Trigger browser notification via Web Push API
  - Notification content:
    - Title: Sender's display name
    - Body: Message preview (first 50 characters)
    - Icon: Sender's profile picture
    - Click action: Open app to conversation
- Respect notification settings:
  - Muted conversations: No notifications
  - Do Not Disturb mode: No notifications
  - Message preview setting: Show/hide content
- Badge count on browser tab title

**Validations:**

- User granted notification permission
- Conversation not muted
- Do Not Disturb not active

**Error Handling:**

- Permission denied: Gracefully disable, allow re-request
- Notification send failure: Log error, continue

**Acceptance Criteria:**

- Notifications display correctly
- Clickable and navigate to conversation
- Respect user preferences
- Badge counts accurate

---

#### FR-NOTIF-002: In-App Notifications

**Description:** Users receive in-app notification toasts.

**System Behavior:**

- When new message received and app is open but conversation not visible:
  - Display toast notification
  - Show sender name and message preview
  - Auto-dismiss after 5 seconds
  - Click to navigate to conversation
- Notification sound plays (if enabled)
- Multiple notifications queue (don't stack indefinitely)

**Validations:**

- App is open
- Conversation not currently visible
- Notifications not suppressed

**Error Handling:**

- Sound play failure: Silent notification

**Acceptance Criteria:**

- Toasts appear and dismiss correctly
- Queue managed appropriately
- Sound plays when enabled

---

### 4.7 Settings & Preferences

#### FR-SETTINGS-001: Privacy Settings

**Description:** Users can control privacy and visibility.

**User Actions:**

- Navigate to Settings > Privacy
- Configure settings

**Settings Available:**

- **Profile Visibility:**
  - Everyone (default)
  - Contacts only
- **Online Status:**
  - Show to everyone (default)
  - Show to contacts only
  - Hide from everyone
- **Last Seen:**
  - Everyone
  - Contacts only
  - Nobody
- **Read Receipts:**
  - Send and receive (default)
  - Don't send (but still receive)
- **Random Chat:**
  - Allow (default)
  - Disable (opt-out of random chat)

**System Behavior:**

- Save settings to user profile
- Apply settings immediately
- Respect settings across all features

**Validations:**

- User authenticated

**Error Handling:**

- Save failure: Retry, display error

**Acceptance Criteria:**

- Settings save correctly
- Applied across application
- Persist across sessions

---

#### FR-SETTINGS-002: Notification Settings

**Description:** Users can customize notification behavior.

**Settings Available:**

- **Message Notifications:**
  - Enabled/disabled
  - Sound enabled/disabled
  - Show message preview (on/off)
- **Browser Notifications:**
  - Enabled/disabled
  - Request permission button
- **Do Not Disturb:**
  - Toggle on/off
  - Schedule (e.g., 10 PM - 8 AM)

**System Behavior:**

- Save settings to user profile
- Apply notification logic based on settings

**Validations:**

- User authenticated

**Error Handling:**

- Save failure: Retry

**Acceptance Criteria:**

- Settings applied correctly
- Notifications respect preferences

---

#### FR-SETTINGS-003: Appearance Settings

**Description:** Users can customize app appearance.

**Settings Available:**

- **Theme:**
  - Light mode
  - Dark mode
  - System default
- **Language:**
  - English (initial launch)
  - Expandable to others

**System Behavior:**

- Save preference to browser local storage and user profile
- Apply theme immediately
- Persist across sessions

**Validations:**

- Valid theme/language selected

**Error Handling:**

- Invalid selection: Revert to default

**Acceptance Criteria:**

- Theme switches smoothly
- Preference persists

---

## Step 5: Non-Functional Requirements

### 5.1 Performance

#### NFR-PERF-001: Page Load Time

**Target:** Initial page load <2 seconds on 4G connection

**Implementation:**

- Code splitting with Next.js dynamic imports
- Optimize bundle size (target <200KB initial JS bundle)
- Image optimization (WebP format, lazy loading)
- CDN delivery via Vercel Edge Network
- Server-side rendering for critical content
- Aggressive caching strategy

**Measurement:**

- Google Lighthouse performance score >90
- Core Web Vitals:
  - LCP (Largest Contentful Paint) <2.5s
  - FID (First Input Delay) <100ms
  - CLS (Cumulative Layout Shift) <0.1

---

#### NFR-PERF-002: Message Latency

**Target:** Message delivery <500ms for online users

**Implementation:**

- WebSocket connections via Supabase Realtime
- Optimistic UI updates (instant feedback)
- Message queueing for offline users
- Database query optimization (indexes on conversation_id, timestamp)
- Connection pooling

**Measurement:**

- P95 latency for message send-to-receive <500ms
- P99 latency <1 second
- Monitor via custom analytics events

---

#### NFR-PERF-003: Real-Time Connection Reliability

**Target:** >99% connection success rate

**Implementation:**

- Automatic reconnection with exponential backoff
- Heartbeat mechanism to detect stale connections
- Graceful degradation to polling if WebSocket unavailable
- Connection state monitoring

**Measurement:**

- Connection success rate tracked per user session
- Reconnection attempts logged
- Alert if success rate <95%

---

#### NFR-PERF-004: Database Query Performance

**Target:** P95 query latency <100ms

**Implementation:**

- Proper indexing strategy:
  - Index on user_id, conversation_id, timestamp
  - Composite indexes for common query patterns
- Query pagination (limit results)
- Database connection pooling via Supabase
- Read replicas for heavy read operations (if available)

**Measurement:**

- Supabase Performance Insights
- Custom query timing logs
- Alert if P95 >200ms

---

#### NFR-PERF-005: Concurrent User Support

**Target:** Support 10,000 concurrent users without degradation

**Implementation:**

- Horizontal scaling via Vercel serverless functions
- Database connection limits managed
- Rate limiting per user to prevent abuse
- Load testing before launch

**Measurement:**

- Load testing with tools like k6 or Artillery
- Monitor during beta launch
- Scale Supabase tier as needed

---

### 5.2 Scalability

#### NFR-SCALE-001: User Growth

**Requirement:** Architecture must support 1M+ registered users within 12 months

**Implementation:**

- Microservices architecture via Vercel functions
- Database sharding strategy (if needed, via Supabase)
- CDN for static assets
- Efficient data model (normalized)
- Monitoring and capacity planning

**Measurement:**

- Regular capacity reviews
- Database size monitoring
- Function invocation limits

---

#### NFR-SCALE-002: Message Volume

**Requirement:** Handle 100M+ messages per month

**Implementation:**

- Efficient message storage (indexed properly)
- Message archival strategy (move old messages to cold storage)
- Database optimization
- Supabase storage tiers adjusted as needed

**Measurement:**

- Monthly message count tracked
- Storage growth monitored
- Query performance remains acceptable

---

#### NFR-SCALE-003: Media Storage

**Requirement:** Support 1TB+ media files

**Implementation:**

- Supabase Storage for all media
- Image compression and optimization
- Thumbnail generation for images
- CDN delivery for media files
- Storage quota monitoring

**Measurement:**

- Storage usage tracked daily
- Alert at 80% capacity
- Upgrade storage tier proactively

---

### 5.3 Security

#### NFR-SEC-001: Authentication Security

**Requirements:**

- Secure password storage (bcrypt hashing)
- Session token encryption (JWT)
- HttpOnly, Secure cookies
- CSRF protection
- Rate limiting on authentication endpoints

**Implementation:**

- Leverage Supabase Auth (industry-standard)
- Enforce strong password policy
- Multi-device session management
- Session expiration (7 days default, 30 days with "Remember me")

**Measurement:**

- Security audits
- Penetration testing before launch
- Monitor failed login attempts

---

#### NFR-SEC-002: Data Encryption

**Requirements:**

- Data in transit: TLS 1.3
- Data at rest: AES-256 encryption (Supabase default)
- Sensitive data (user IDs in random chat) encrypted

**Implementation:**

- Force HTTPS on all connections
- Supabase provides encryption at rest
- Encrypt session mapping for random chat

**Measurement:**

- SSL Labs rating A+
- Regular security scans

---

#### NFR-SEC-003: API Security

**Requirements:**

- Authentication required for all protected endpoints
- Rate limiting to prevent abuse
- Input validation and sanitization
- SQL injection prevention (parameterized queries)
- XSS protection

**Implementation:**

- Supabase RLS (Row Level Security) policies
- Next.js API routes with auth middleware
- Helmet.js for security headers
- Input validation via Zod or similar
- Rate limiting via Vercel or custom middleware

**Measurement:**

- Vulnerability scanning (OWASP ZAP, Snyk)
- Code reviews focused on security

---

#### NFR-SEC-004: Privacy & Compliance

**Requirements:**

- GDPR compliance (EU users)
- CCPA compliance (California users)
- Data minimization
- User data export
- Right to deletion

**Implementation:**

- Clear privacy policy
- Consent management
- Data export feature (download all user data)
- Account deletion with 30-day retention
- Audit logs for data access

**Measurement:**

- Privacy policy legal review
- Data processing agreements
- Regular compliance audits

---

### 5.4 Reliability & Availability

#### NFR-REL-001: Uptime

**Target:** 99.9% uptime (max 43 minutes downtime per month)

**Implementation:**

- Leverage Vercel's SLA (99.99%)
- Leverage Supabase's SLA (99.9%)
- Health check endpoints
- Automated failover (Vercel handles)
- Graceful degradation for non-critical features

**Measurement:**

- Uptime monitoring (UptimeRobot, Pingdom)
- Status page for transparency
- Incident response procedures

---

#### NFR-REL-002: Data Durability

**Target:** Zero data loss for user messages

**Implementation:**

- Supabase automated backups (point-in-time recovery)
- Database replication (Supabase handles)
- Message delivery confirmation (acknowledgments)
- Retry mechanisms for failed writes

**Measurement:**

- Backup verification (monthly restore tests)
- Monitor failed message sends
- Alert on database errors

---

#### NFR-REL-003: Error Recovery

**Requirements:**

- Graceful error handling (no white screens)
- Automatic retry for transient failures
- User-friendly error messages

**Implementation:**

- Error boundaries in React components
- Retry logic with exponential backoff
- Fallback UI for errors
- Error logging to monitoring system

**Measurement:**

- Error rate monitored (target <0.1%)
- User-reported errors tracked
- Mean time to recovery (MTTR) <30 minutes

---

### 5.5 Observability

#### NFR-OBS-001: Logging

**Requirements:**

- Structured logging for all critical operations
- Log retention: 30 days minimum
- Log levels: DEBUG, INFO, WARN, ERROR

**Implementation:**

- Vercel logging for function executions
- Supabase logging for database operations
- Custom application logs via Winston or Pino
- Log aggregation (optional: Logtail, Datadog)

**Measurement:**

- Logs searchable and analyzable
- Critical errors escalated immediately

---

#### NFR-OBS-002: Metrics & Monitoring

**Requirements:**

- Real-time metrics dashboard
- Alerting for critical issues
- Performance metrics tracked

**Metrics to Track:**

- Request rate (requests/sec)
- Error rate (errors/sec, %)
- Latency (P50, P95, P99)
- Database query performance
- Active WebSocket connections
- Message throughput
- User registration rate
- Active users (DAU, MAU)

**Implementation:**

- Vercel Analytics for web vitals
- Supabase Metrics for database
- Google Analytics for user behavior
- Custom metrics via Vercel Edge Config or external service
- Alerting via email/Slack for critical metrics

---

#### NFR-OBS-003: Error Tracking

**Requirements:**

- Real-time error tracking
- Error grouping and prioritization
- Source maps for debugging

**Implementation:**

- Sentry or similar error tracking service (optional)
- Error boundaries capture client-side errors
- Server-side error logging
- Source maps uploaded to error tracker

**Measurement:**

- Errors triaged daily
- Critical errors resolved within 24 hours
- Error trends analyzed weekly

---

## Step 6: Technical Considerations

### 6.1 High-Level System Architecture

#### Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        User Browser                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            Next.js Frontend (React)                   │  │
│  │  - NuxtUI Components                                  │  │
│  │  - TailwindCSS Styling                                │  │
│  │  - Framer Motion Animations                           │  │
│  │  - Next.js App Router                                 │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ HTTPS / WebSocket
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                    Vercel Edge Network                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │         Next.js API Routes (Serverless)              │  │
│  │  - Authentication middleware                          │  │
│  │  - Rate limiting                                      │  │
│  │  - Input validation                                   │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ MCP Server Protocol
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                    MCP Server Layer                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │    Model Context Protocol Server                      │  │
│  │  - Supabase client initialization                     │  │
│  │  - Connection pooling                                 │  │
│  │  - Query optimization                                 │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ PostgreSQL Protocol / REST API
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                   Supabase Backend                           │
│  ┌─────────────────┐  ┌────────────────┐  ┌─────────────┐ │
│  │   PostgreSQL    │  │  Realtime       │  │   Storage   │ │
│  │    Database     │  │  (WebSocket)    │  │   (Media)   │ │
│  │                 │  │                 │  │             │ │
│  │  - User data    │  │  - Live msgs    │  │  - Images   │ │
│  │  - Messages     │  │  - Typing       │  │  - Files    │ │
│  │  - Conversations│  │  - Status       │  │  - Avatars  │ │
│  └─────────────────┘  └────────────────┘  └─────────────┘ │
│  ┌─────────────────┐                                        │
│  │   Supabase Auth │                                        │
│  │  - User sessions│                                        │
│  │  - JWT tokens   │                                        │
│  └─────────────────┘                                        │
└─────────────────────────────────────────────────────────────┘
```

#### Component Responsibilities

**Frontend (Next.js + React):**

- User interface rendering
- Client-side routing (Next.js App Router)
- State management (React Context / Zustand)
- Real-time WebSocket connections
- Optimistic UI updates
- Form validation
- Media preview and upload

**API Layer (Next.js API Routes):**

- Authentication verification
- Request validation
- Rate limiting enforcement
- Business logic coordination
- MCP Server communication
- Error handling and logging

**MCP Server Layer:**

- Supabase connection management
- Database query execution
- Connection pooling
- Query optimization
- Data transformation

**Supabase Backend:**

- **PostgreSQL Database:**
  - Data persistence
  - Row Level Security (RLS)
  - Triggers and functions
  - Full-text search
- **Realtime:**
  - WebSocket connections
  - Message broadcasting
  - Presence tracking
  - Typing indicators
- **Storage:**
  - File upload/download
  - Image transformation
  - CDN delivery
- **Auth:**
  - User registration
  - Password hashing
  - Session management
  - Email verification

**Vercel Platform:**

- Serverless function execution
- Edge network CDN
- Automatic scaling
- SSL/TLS termination
- DDoS protection

---

### 6.2 Data Models

#### Database Schema (Supabase PostgreSQL)

**Table: users**

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(20) UNIQUE NOT NULL,
  display_name VARCHAR(50),
  email VARCHAR(255) UNIQUE NOT NULL,
  bio VARCHAR(200),
  profile_picture_url TEXT,
  is_active BOOLEAN DEFAULT true,
  email_confirmed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_seen_at TIMESTAMP,
  online_status VARCHAR(20) DEFAULT 'offline', -- online, offline, away
  banned BOOLEAN DEFAULT false,
  banned_until TIMESTAMP,
  ban_reason TEXT
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_online_status ON users(online_status);
```

**Table: conversations**

```sql
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_type VARCHAR(20) NOT NULL, -- persistent, random
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_message_at TIMESTAMP,
  status VARCHAR(20) DEFAULT 'active' -- active, ended, archived
);

CREATE INDEX idx_conversations_type ON conversations(conversation_type);
CREATE INDEX idx_conversations_last_message ON conversations(last_message_at DESC);
```

**Table: conversation_participants**

```sql
CREATE TABLE conversation_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  joined_at TIMESTAMP DEFAULT NOW(),
  left_at TIMESTAMP,
  muted BOOLEAN DEFAULT false,
  muted_until TIMESTAMP,
  unread_count INTEGER DEFAULT 0,
  UNIQUE(conversation_id, user_id)
);

CREATE INDEX idx_participants_conversation ON conversation_participants(conversation_id);
CREATE INDEX idx_participants_user ON conversation_participants(user_id);
CREATE INDEX idx_participants_user_conversation ON conversation_participants(user_id, conversation_id);
```

**Table: messages**

```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id) ON DELETE SET NULL,
  recipient_id UUID REFERENCES users(id) ON DELETE SET NULL,
  message_text TEXT,
  message_type VARCHAR(20) DEFAULT 'text', -- text, image, file, system
  media_url TEXT,
  media_caption TEXT,
  file_name VARCHAR(255),
  file_size BIGINT,
  file_type VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP,
  status VARCHAR(20) DEFAULT 'sent', -- sent, delivered, read
  delivered_at TIMESTAMP,
  read_at TIMESTAMP,
  deleted_for UUID[], -- array of user IDs who deleted message
  is_edited BOOLEAN DEFAULT false
);

CREATE INDEX idx_messages_conversation ON messages(conversation_id, created_at DESC);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_status ON messages(status);
```

**Table: random_chat_sessions**

```sql
CREATE TABLE random_chat_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_id UUID UNIQUE NOT NULL,
  temporary_username VARCHAR(50) NOT NULL,
  conversation_id UUID REFERENCES conversations(id) ON DELETE SET NULL,
  status VARCHAR(20) DEFAULT 'matching', -- matching, matched, ended
  created_at TIMESTAMP DEFAULT NOW(),
  ended_at TIMESTAMP,
  end_reason VARCHAR(50) -- next, leave, disconnect, block, report
);

CREATE INDEX idx_random_sessions_user ON random_chat_sessions(user_id);
CREATE INDEX idx_random_sessions_session ON random_chat_sessions(session_id);
CREATE INDEX idx_random_sessions_status ON random_chat_sessions(status);
```

**Table: random_chat_messages**

```sql
CREATE TABLE random_chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE,
  session_id UUID REFERENCES random_chat_sessions(session_id) ON DELETE CASCADE,
  message_text TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_random_messages_conversation ON random_chat_messages(conversation_id, created_at DESC);
CREATE INDEX idx_random_messages_session ON random_chat_messages(session_id);
```

**Table: match_history**

```sql
CREATE TABLE match_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_1_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user_2_id UUID REFERENCES users(id) ON DELETE CASCADE,
  matched_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_1_id, user_2_id)
);

CREATE INDEX idx_match_history_user1 ON match_history(user_1_id);
CREATE INDEX idx_match_history_user2 ON match_history(user_2_id);
```

**Table: blocks**

```sql
CREATE TABLE blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blocker_id UUID REFERENCES users(id) ON DELETE CASCADE,
  blocked_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(blocker_id, blocked_id)
);

CREATE INDEX idx_blocks_blocker ON blocks(blocker_id);
CREATE INDEX idx_blocks_blocked ON blocks(blocked_id);
```

**Table: reports**

```sql
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID REFERENCES users(id) ON DELETE SET NULL,
  reported_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  reported_message_id UUID REFERENCES messages(id) ON DELETE SET NULL,
  conversation_id UUID REFERENCES conversations(id) ON DELETE SET NULL,
  reason VARCHAR(50) NOT NULL,
  description TEXT,
  context_messages JSONB, -- last N messages for context
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_reports_reporter ON reports(reporter_id);
CREATE INDEX idx_reports_reported_user ON reports(reported_user_id);
CREATE INDEX idx_reports_reported_message ON reports(reported_message_id);
CREATE INDEX idx_reports_conversation ON reports(conversation_id);
CREATE INDEX idx_reports_reason ON reports(reason);

```
