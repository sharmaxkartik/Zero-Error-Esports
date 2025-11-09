# ZE Club End-to-End Testing Checklist

## Prerequisites
- [ ] Development server is running (`pnpm dev`)
- [ ] MongoDB connection is established
- [ ] AWS S3 credentials are configured
- [ ] At least one mission is seeded in the database
- [ ] At least one reward is available
- [ ] At least one user has admin role

## Test User Journey

### 1. User Registration/Login ✓
**Steps:**
- [ ] Navigate to `/signup` or `/login`
- [ ] Complete registration/login with Discord OAuth or credentials
- [ ] Verify successful redirect to home page
- [ ] Check that user session is active

**Expected Results:**
- User is authenticated
- Session persists across page refreshes
- User data is stored in MongoDB

---

### 2. Access ZE Club Dashboard ✓
**Steps:**
- [ ] Navigate to `/ze-club`
- [ ] Verify redirect if not authenticated
- [ ] Check dashboard loads successfully

**Expected Results:**
- Dashboard displays:
  - Total ZE Points (initial: 0)
  - Current Rank (initial: Rookie)
  - Badge
  - Progress bar to next rank
- All stats are animated on load
- Responsive layout on mobile devices

---

### 3. View Leaderboard ✓
**Steps:**
- [ ] Click "Leaderboard" in ZE Club sidebar
- [ ] Navigate to `/ze-club/leaderboard`
- [ ] Check user rankings display

**Expected Results:**
- Table shows ranked users with:
  - Rank number
  - User name
  - Points total
- List is sorted by points (highest first)
- Current user is highlighted (if applicable)
- Responsive table with horizontal scroll on mobile

---

### 4. Browse Available Missions ✓
**Steps:**
- [ ] Click "Missions" in ZE Club sidebar
- [ ] Navigate to `/ze-club/missions`
- [ ] View available missions in dropdown

**Expected Results:**
- Mission select dropdown populates
- Missions show title
- Upload form is visible
- "My Submissions" section displays

---

### 5. Upload Mission Proof ✓
**Steps:**
- [ ] Select a mission from dropdown
- [ ] Choose a valid file (JPG, PNG, or MP4 under 50MB)
- [ ] Click "Submit Mission"
- [ ] Wait for upload confirmation

**Expected Results:**
- File uploads to AWS S3
- Success message appears
- Submission appears in "My Submissions" with "pending" status
- Proof link is viewable

**Test Invalid Cases:**
- [ ] Try uploading file > 50MB (should fail)
- [ ] Try uploading invalid file type (should fail)
- [ ] Try submitting without selecting mission (should fail)

---

### 6. Admin Mission Verification ✓
**Steps:**
- [ ] Login with admin account
- [ ] Navigate to `/admin/ze-club`
- [ ] View pending submissions
- [ ] Click "View Proof" to verify submission
- [ ] Click "Approve" or "Reject"
- [ ] Confirm status update

**Expected Results:**
- Submissions table shows:
  - User name and email
  - Mission name
  - Proof link (opens in new tab)
  - Status badge
  - Action buttons
- On approval:
  - Submission status changes to "approved"
  - User points increase by mission value
  - User rank updates if threshold reached
- On rejection:
  - Submission status changes to "rejected"
  - No points awarded

**Test Cases:**
- [ ] Approve a valid submission
- [ ] Reject an invalid submission
- [ ] Verify points update correctly
- [ ] Verify rank progression

---

### 7. Points and Rank Update ✓
**Steps:**
- [ ] Return to user dashboard (`/ze-club`)
- [ ] Verify updated points
- [ ] Check if rank changed
- [ ] Verify progress bar updates

**Expected Results:**
- Total points reflect approved missions
- Rank updates based on thresholds:
  - Rookie: 0-499
  - Bronze: 500-999
  - Silver: 1000-4999
  - Gold: 5000-9999
  - Platinum: 10000-19999
  - Diamond: 20000+
- Progress bar shows % to next rank
- Counter animates from old to new value

---

### 8. View Updated Leaderboard ✓
**Steps:**
- [ ] Navigate to `/ze-club/leaderboard`
- [ ] Find your position
- [ ] Verify points match dashboard

**Expected Results:**
- User position reflects current points
- Ranking is correct
- Real-time or page-refreshed data

---

### 9. Browse Rewards Catalog ✓
**Steps:**
- [ ] Click "Rewards" in ZE Club sidebar
- [ ] Navigate to `/ze-club/rewards`
- [ ] View available rewards

**Expected Results:**
- Rewards display in card grid
- Each card shows:
  - Reward name
  - Description
  - Point cost
  - Stock remaining
- Cards are responsive (1 col mobile, 2 tablet, 3 desktop)
- Redeem button is enabled if user has enough points

---

### 10. Redeem Reward ✓
**Steps:**
- [ ] Select a reward you can afford
- [ ] Click "Redeem" button
- [ ] Confirm redemption
- [ ] Check for success message

**Expected Results:**
- Toast notification confirms redemption
- Points deducted from user total
- Reward stock decreases by 1
- Reward disappears if stock = 0
- Dashboard updates with new point total

**Test Cases:**
- [ ] Redeem with sufficient points
- [ ] Try to redeem with insufficient points (should fail)
- [ ] Try to redeem out-of-stock item (button disabled)

---

### 11. Access Support Page ✓
**Steps:**
- [ ] Click "Support" in ZE Club sidebar
- [ ] Navigate to `/ze-club/support`
- [ ] Expand FAQ items
- [ ] Fill out contact form

**Expected Results:**
- FAQ accordion works smoothly
- All 8 FAQ items are present
- Contact form validates required fields
- Form submission shows success toast
- Form resets after submission

---

### 12. Test Responsive Design ✓
**Steps:**
- [ ] Open browser DevTools
- [ ] Test on mobile viewport (< 768px)
- [ ] Test on tablet viewport (768-1024px)
- [ ] Test on desktop viewport (> 1024px)

**Expected Results:**
- **Mobile:**
  - Hamburger menu for ZE Club nav
  - Sidebar slides in/out
  - Cards stack vertically
  - Tables scroll horizontally
  - Touch-optimized buttons
- **Tablet:**
  - 2-column card layouts
  - Sidebar remains visible
- **Desktop:**
  - 3-column card layouts
  - Full sidebar always visible

---

### 13. Test Animations ✓
**Steps:**
- [ ] Navigate between ZE Club pages
- [ ] Observe page transitions
- [ ] Check element loading animations
- [ ] Hover over interactive elements

**Expected Results:**
- Smooth page transitions with framer-motion
- Dashboard counter animates from 0 to value
- Cards fade in with stagger effect
- Hover effects on cards (scale, lift)
- Progress bar animates smoothly

---

### 14. Logout ✓
**Steps:**
- [ ] Click logout button (if available in navbar)
- [ ] Verify session is cleared
- [ ] Try to access `/ze-club` after logout

**Expected Results:**
- User is logged out
- Redirect to login page when accessing protected routes
- Session cookie is cleared

---

## Performance Checks

### Load Times
- [ ] Dashboard loads in < 2 seconds
- [ ] Leaderboard loads in < 3 seconds
- [ ] Missions page loads in < 2 seconds
- [ ] File upload completes in < 5 seconds (for 10MB file)

### Error Handling
- [ ] API errors show user-friendly messages
- [ ] Network failures are gracefully handled
- [ ] Loading states prevent duplicate submissions
- [ ] Form validation works on all inputs

---

## Security Checks

### Authentication
- [ ] Protected routes redirect unauthenticated users
- [ ] Admin routes verify admin role
- [ ] Session tokens are secure
- [ ] API endpoints validate authentication

### File Upload
- [ ] File size validation (max 50MB)
- [ ] File type validation (JPG, PNG, MP4 only)
- [ ] S3 URLs are secure
- [ ] No directory traversal vulnerabilities

### Data Validation
- [ ] Points cannot be manually modified by users
- [ ] Rank calculation is server-side only
- [ ] Mission IDs are validated
- [ ] Reward stock is properly decremented

---

## Browser Compatibility
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Known Issues / Notes
- Add any issues discovered during testing here
- Note any features that need improvement
- Document any edge cases found

---

## Sign-off
- **Tester Name:** _______________
- **Date:** _______________
- **Environment:** Development / Staging / Production
- **Overall Status:** Pass / Fail / Partial
- **Notes:** _______________________________________________
