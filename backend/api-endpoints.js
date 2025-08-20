// API Endpoints Documentation for EduNimbus Backend
// Express.js + PostgreSQL implementation

/*
=== AUTHENTICATION ENDPOINTS ===

POST /api/auth/login
Body: { email, password }
Response: { user, token, role }

POST /api/auth/register  
Body: { email, password, full_name, phone, role }
Response: { user, token }

POST /api/auth/logout
Headers: Authorization: Bearer <token>
Response: { message }

GET /api/auth/me
Headers: Authorization: Bearer <token>
Response: { user }

=== USER MANAGEMENT ===

GET /api/users
Query: ?role=teacher&center_id=uuid
Headers: Authorization: Bearer <token>
Response: { users: [] }

POST /api/users
Body: { email, password, full_name, phone, role, center_id }
Headers: Authorization: Bearer <token>
Response: { user }

PUT /api/users/:id
Body: { full_name, phone, is_active }
Headers: Authorization: Bearer <token>
Response: { user }

DELETE /api/users/:id
Headers: Authorization: Bearer <token>
Response: { message }

=== EDUCATION CENTERS ===

GET /api/centers
Headers: Authorization: Bearer <token>
Response: { centers: [] }

POST /api/centers
Body: { name, description, address, phone, email }
Headers: Authorization: Bearer <token>
Response: { center }

PUT /api/centers/:id
Body: { name, description, address, phone, email }
Headers: Authorization: Bearer <token>
Response: { center }

GET /api/centers/:id/members
Headers: Authorization: Bearer <token>
Response: { members: [] }

POST /api/centers/:id/members
Body: { user_id, role }
Headers: Authorization: Bearer <token>
Response: { member }

=== GROUPS MANAGEMENT ===

GET /api/groups
Query: ?center_id=uuid&teacher_id=uuid
Headers: Authorization: Bearer <token>
Response: { groups: [] }

POST /api/groups
Body: { center_id, subject_id, name, description, teacher_id, max_students, schedule, monthly_fee }
Headers: Authorization: Bearer <token>
Response: { group }

PUT /api/groups/:id
Body: { name, description, teacher_id, max_students, schedule, monthly_fee }
Headers: Authorization: Bearer <token>
Response: { group }

GET /api/groups/:id/students
Headers: Authorization: Bearer <token>
Response: { students: [] }

POST /api/groups/:id/enroll
Body: { student_id }
Headers: Authorization: Bearer <token>
Response: { enrollment }

=== LESSONS MANAGEMENT ===

GET /api/lessons
Query: ?group_id=uuid&date=YYYY-MM-DD
Headers: Authorization: Bearer <token>
Response: { lessons: [] }

POST /api/lessons
Body: { group_id, title, description, lesson_type, lesson_date, duration_minutes, video_url, meeting_link }
Headers: Authorization: Bearer <token>
Response: { lesson }

PUT /api/lessons/:id
Body: { title, description, lesson_date, duration_minutes, is_completed }
Headers: Authorization: Bearer <token>
Response: { lesson }

=== ATTENDANCE ===

GET /api/attendance/:lesson_id
Headers: Authorization: Bearer <token>
Response: { attendance: [] }

POST /api/attendance
Body: { lesson_id, student_id, status }
Headers: Authorization: Bearer <token>
Response: { attendance }

PUT /api/attendance/:id
Body: { status }
Headers: Authorization: Bearer <token>
Response: { attendance }

=== TESTS MANAGEMENT ===

GET /api/tests
Query: ?group_id=uuid&teacher_id=uuid
Headers: Authorization: Bearer <token>
Response: { tests: [] }

POST /api/tests
Body: { group_id, title, description, test_type, duration_minutes, start_time, end_time, questions: [] }
Headers: Authorization: Bearer <token>
Response: { test }

GET /api/tests/:id
Headers: Authorization: Bearer <token>
Response: { test, questions: [] }

POST /api/tests/:id/submit
Body: { answers: {} }
Headers: Authorization: Bearer <token>
Response: { submission, score }

GET /api/tests/:id/results
Headers: Authorization: Bearer <token>
Response: { submissions: [] }

=== ASSIGNMENTS ===

GET /api/assignments
Query: ?group_id=uuid&student_id=uuid
Headers: Authorization: Bearer <token>
Response: { assignments: [] }

POST /api/assignments
Body: { group_id, title, description, due_date, max_score }
Headers: Authorization: Bearer <token>
Response: { assignment }

POST /api/assignments/:id/submit
Body: { submission_text, file_url }
Headers: Authorization: Bearer <token>
Response: { submission }

PUT /api/assignments/submissions/:id/grade
Body: { score, feedback }
Headers: Authorization: Bearer <token>
Response: { submission }

=== PAYMENTS ===

GET /api/payments
Query: ?student_id=uuid&center_id=uuid&status=pending
Headers: Authorization: Bearer <token>
Response: { payments: [] }

POST /api/payments
Body: { student_id, group_id, amount, payment_month, due_date }
Headers: Authorization: Bearer <token>
Response: { payment }

PUT /api/payments/:id
Body: { status, payment_date, payment_method, notes }
Headers: Authorization: Bearer <token>
Response: { payment }

=== ANALYTICS ===

GET /api/analytics/center/:id
Query: ?start_date=YYYY-MM-DD&end_date=YYYY-MM-DD
Headers: Authorization: Bearer <token>
Response: { 
  total_students, 
  total_teachers, 
  total_revenue, 
  attendance_rate,
  test_average_score,
  monthly_stats: []
}

GET /api/analytics/teacher/:id
Headers: Authorization: Bearer <token>
Response: {
  total_students,
  total_lessons,
  average_attendance,
  test_stats: []
}

GET /api/analytics/student/:id
Headers: Authorization: Bearer <token>
Response: {
  enrolled_groups: [],
  attendance_rate,
  test_scores: [],
  assignment_scores: []
}

=== TELEGRAM INTEGRATION ===

POST /api/telegram/setup
Body: { center_id, bot_token }
Headers: Authorization: Bearer <token>
Response: { bot_config }

POST /api/telegram/send-notification
Body: { user_ids: [], message, type }
Headers: Authorization: Bearer <token>
Response: { sent_count }

=== NOTIFICATIONS ===

GET /api/notifications
Query: ?user_id=uuid&is_read=false
Headers: Authorization: Bearer <token>
Response: { notifications: [] }

POST /api/notifications
Body: { user_id, title, message, type }
Headers: Authorization: Bearer <token>
Response: { notification }

PUT /api/notifications/:id/read
Headers: Authorization: Bearer <token>
Response: { notification }

=== FILE UPLOAD ===

POST /api/upload
Body: FormData with file
Headers: Authorization: Bearer <token>
Response: { file_url }

=== MIDDLEWARE ===
- Authentication middleware: verify JWT token
- Role-based access control: check user role and permissions
- Rate limiting: prevent API abuse
- Input validation: validate request data
- Error handling: standardized error responses

=== RESPONSE FORMAT ===
Success: { success: true, data: {...}, message: "Success" }
Error: { success: false, error: "Error message", code: "ERROR_CODE" }

=== PAGINATION ===
Query parameters: ?page=1&limit=20&sort_by=created_at&sort_order=desc
Response: { 
  data: [],
  pagination: {
    page: 1,
    limit: 20,
    total: 100,
    total_pages: 5
  }
}
*/