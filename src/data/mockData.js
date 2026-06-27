export const ROLES = ['Admin', 'Staff', 'Doctor', 'Viewer']

export const ENQUIRY_STATUSES = ['New', 'In Progress', 'Contacted', 'Converted', 'Closed']
export const APPOINTMENT_STATUSES = ['Pending', 'Approved', 'Rescheduled', 'Completed', 'Cancelled']

export const mockUsers = [
  { id: 1, name: 'Dr. Priya Sharma', email: 'priya@soothra.com', role: 'Admin', status: 'Active', lastLogin: '2026-06-27 09:15' },
  { id: 2, name: 'Rahul Mehta', email: 'rahul@soothra.com', role: 'Staff', status: 'Active', lastLogin: '2026-06-27 08:42' },
  { id: 3, name: 'Dr. Ananya Rao', email: 'ananya@soothra.com', role: 'Doctor', status: 'Active', lastLogin: '2026-06-26 17:30' },
  { id: 4, name: 'Sneha Kapoor', email: 'sneha@soothra.com', role: 'Staff', status: 'Inactive', lastLogin: '2026-06-20 11:00' },
  { id: 5, name: 'Vikram Singh', email: 'vikram@soothra.com', role: 'Viewer', status: 'Active', lastLogin: '2026-06-25 14:22' },
]

export const mockEnquiries = [
  { id: 'ENQ-1042', name: 'Aarav Patel', email: 'aarav.p@gmail.com', phone: '+91 98765 43210', source: 'Website', condition: 'Chronic Pain', status: 'New', date: '2026-06-27', remarks: '' },
  { id: 'ENQ-1041', name: 'Meera Joshi', email: 'meera.j@outlook.com', phone: '+91 87654 32109', source: 'WhatsApp', condition: 'Anxiety', status: 'In Progress', date: '2026-06-26', remarks: 'Follow-up call scheduled' },
  { id: 'ENQ-1040', name: 'Karan Desai', email: 'karan.d@gmail.com', phone: '+91 76543 21098', source: 'Referral', condition: 'Insomnia', status: 'Contacted', date: '2026-06-26', remarks: 'Sent product brochure' },
  { id: 'ENQ-1039', name: 'Divya Nair', email: 'divya.n@gmail.com', phone: '+91 65432 10987', source: 'Website', condition: 'Arthritis', status: 'Converted', date: '2026-06-25', remarks: 'Booked consultation' },
  { id: 'ENQ-1038', name: 'Rohan Gupta', email: 'rohan.g@yahoo.com', phone: '+91 54321 09876', source: 'Instagram', condition: 'Stress', status: 'Closed', date: '2026-06-24', remarks: 'Not interested' },
  { id: 'ENQ-1037', name: 'Pooja Reddy', email: 'pooja.r@gmail.com', phone: '+91 43210 98765', source: 'Website', condition: 'Migraine', status: 'New', date: '2026-06-24', remarks: '' },
  { id: 'ENQ-1036', name: 'Arjun Malhotra', email: 'arjun.m@gmail.com', phone: '+91 32109 87654', source: 'Doctor Referral', condition: 'Neuropathy', status: 'In Progress', date: '2026-06-23', remarks: 'Awaiting medical records' },
]

export const mockAppointments = [
  { id: 'APT-501', patient: 'Divya Nair', doctor: 'Dr. Priya Sharma', date: '2026-06-28', time: '10:00', type: 'Video Consult', status: 'Approved', notes: 'First consultation' },
  { id: 'APT-502', patient: 'Aarav Patel', doctor: 'Dr. Ananya Rao', date: '2026-06-28', time: '11:30', type: 'In-Person', status: 'Pending', notes: '' },
  { id: 'APT-503', patient: 'Meera Joshi', doctor: 'Dr. Priya Sharma', date: '2026-06-29', time: '09:00', type: 'Video Consult', status: 'Pending', notes: 'Anxiety management' },
  { id: 'APT-504', patient: 'Karan Desai', doctor: 'Dr. Ananya Rao', date: '2026-06-29', time: '14:00', type: 'Video Consult', status: 'Rescheduled', notes: 'Rescheduled from 27th' },
  { id: 'APT-505', patient: 'Rohan Gupta', doctor: 'Dr. Priya Sharma', date: '2026-06-25', time: '16:00', type: 'In-Person', status: 'Completed', notes: 'Prescribed wellness plan' },
  { id: 'APT-506', patient: 'Pooja Reddy', doctor: 'Dr. Ananya Rao', date: '2026-06-30', time: '10:30', type: 'Video Consult', status: 'Approved', notes: '' },
  { id: 'APT-507', patient: 'Arjun Malhotra', doctor: 'Dr. Priya Sharma', date: '2026-06-27', time: '15:00', type: 'In-Person', status: 'Cancelled', notes: 'Patient cancelled' },
]

export const mockNotifications = [
  { id: 1, title: 'Appointment Reminder', type: 'Email', trigger: '24h before appointment', status: 'Active', lastSent: '2026-06-27 08:00' },
  { id: 2, title: 'Enquiry Acknowledgement', type: 'Email', trigger: 'On new enquiry', status: 'Active', lastSent: '2026-06-27 09:30' },
  { id: 3, title: 'Consultation Confirmed', type: 'SMS', trigger: 'On appointment approval', status: 'Active', lastSent: '2026-06-26 16:45' },
  { id: 4, title: 'Follow-up Reminder', type: 'Email', trigger: '7 days after consultation', status: 'Inactive', lastSent: '2026-06-20 10:00' },
  { id: 5, title: 'Staff Daily Digest', type: 'Email', trigger: 'Daily at 8 AM', status: 'Active', lastSent: '2026-06-27 08:00' },
]

export const mockActivityLogs = [
  { id: 1, user: 'Dr. Priya Sharma', action: 'Approved appointment APT-501', module: 'Appointments', timestamp: '2026-06-27 09:45', ip: '192.168.1.10' },
  { id: 2, user: 'Rahul Mehta', action: 'Updated enquiry ENQ-1041 status to In Progress', module: 'Enquiries', timestamp: '2026-06-27 09:30', ip: '192.168.1.15' },
  { id: 3, user: 'Dr. Priya Sharma', action: 'Logged in', module: 'Auth', timestamp: '2026-06-27 09:15', ip: '192.168.1.10' },
  { id: 4, user: 'Rahul Mehta', action: 'Exported enquiry data (7 records)', module: 'Enquiries', timestamp: '2026-06-27 08:50', ip: '192.168.1.15' },
  { id: 5, user: 'Sneha Kapoor', action: 'Deactivated notification: Follow-up Reminder', module: 'Notifications', timestamp: '2026-06-26 17:00', ip: '192.168.1.20' },
  { id: 6, user: 'Dr. Ananya Rao', action: 'Added notes to appointment APT-504', module: 'Appointments', timestamp: '2026-06-26 16:30', ip: '192.168.1.12' },
  { id: 7, user: 'Dr. Priya Sharma', action: 'Created user: Vikram Singh', module: 'Users', timestamp: '2026-06-25 14:00', ip: '192.168.1.10' },
  { id: 8, user: 'Rahul Mehta', action: 'Cancelled appointment APT-507', module: 'Appointments', timestamp: '2026-06-27 10:00', ip: '192.168.1.15' },
]

export const dashboardStats = {
  totalEnquiries: 142,
  newEnquiries: 18,
  pendingAppointments: 12,
  completedToday: 5,
  conversionRate: 34,
  activeUsers: 4,
}

export const monthlyEnquiries = [
  { month: 'Jan', count: 28 },
  { month: 'Feb', count: 35 },
  { month: 'Mar', count: 42 },
  { month: 'Apr', count: 38 },
  { month: 'May', count: 51 },
  { month: 'Jun', count: 48 },
]

export const appointmentBreakdown = [
  { status: 'Pending', count: 12, color: '#f59e0b' },
  { status: 'Approved', count: 28, color: '#054439' },
  { status: 'Completed', count: 45, color: '#10b981' },
  { status: 'Cancelled', count: 8, color: '#ef4444' },
]

export const DEMO_CREDENTIALS = { email: 'admin@soothra.com', password: 'admin123' }
