#!/bin/bash
# IVYAR Medical Program API - cURL Examples
# Usage: Set TOKEN environment variable before running

BASE_URL="${BASE_URL:-https://api.medical.ivyar.gov.ua/v1}"

# ============================================================================
# PATIENTS
# ============================================================================

# Register new patient
register_patient() {
  curl -X POST "$BASE_URL/patients" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "personal_id": "1234567890",
      "military_id": "MIL-12345",
      "first_name": "Ivan",
      "last_name": "Petrenko",
      "patronymic": "Oleksandrovych",
      "date_of_birth": "1985-03-15",
      "gender": "male",
      "phone": "+380501234567",
      "email": "ivan.petrenko@example.com",
      "address": {
        "country": "Ukraine",
        "region": "Kyiv Oblast",
        "city": "Kyiv",
        "street": "Khreshchatyk",
        "building": "1",
        "apartment": "10",
        "postal_code": "01001"
      },
      "service_status": "veteran",
      "combat_veteran": true,
      "service_start_date": "2010-01-15",
      "service_end_date": "2022-06-30",
      "emergency_contact": {
        "name": "Maria Petrenko",
        "relationship": "spouse",
        "phone": "+380507654321"
      }
    }'
}

# Get patient
get_patient() {
  curl -X GET "$BASE_URL/patients/$1" \
    -H "Authorization: Bearer $TOKEN"
}

# Check eligibility
check_eligibility() {
  curl -X GET "$BASE_URL/patients/$1/eligibility" \
    -H "Authorization: Bearer $TOKEN"
}

# Get benefits
get_benefits() {
  curl -X GET "$BASE_URL/patients/$1/benefits" \
    -H "Authorization: Bearer $TOKEN"
}

# ============================================================================
# APPOINTMENTS
# ============================================================================

# Get available slots
get_available_slots() {
  curl -X GET "$BASE_URL/appointments/available-slots?service_type=cardiology&date_from=2025-01-10&date_to=2025-01-20" \
    -H "Authorization: Bearer $TOKEN"
}

# Schedule appointment
schedule_appointment() {
  curl -X POST "$BASE_URL/appointments" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "patient_id": "PAT-001",
      "provider_id": "PROV-001",
      "service_type": "cardiology",
      "appointment_type": "in_person",
      "scheduled_date": "2025-01-15",
      "scheduled_time": "10:00",
      "reason_for_visit": "Follow-up for hypertension management"
    }'
}

# Confirm appointment
confirm_appointment() {
  curl -X POST "$BASE_URL/appointments/$1/confirm" \
    -H "Authorization: Bearer $TOKEN"
}

# Check in
check_in() {
  curl -X POST "$BASE_URL/appointments/$1/check-in" \
    -H "Authorization: Bearer $TOKEN"
}

# Reschedule
reschedule_appointment() {
  curl -X POST "$BASE_URL/appointments/$1/reschedule" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "new_date": "2025-01-20",
      "new_time": "14:00",
      "reason": "Schedule conflict"
    }'
}

# Cancel appointment
cancel_appointment() {
  curl -X DELETE "$BASE_URL/appointments/$1?reason=Personal%20emergency" \
    -H "Authorization: Bearer $TOKEN"
}

# ============================================================================
# MEDICAL RECORDS
# ============================================================================

# Get health summary
get_health_summary() {
  curl -X GET "$BASE_URL/patients/$1/health-summary" \
    -H "Authorization: Bearer $TOKEN"
}

# Get lab results
get_lab_results() {
  curl -X GET "$BASE_URL/patients/$1/lab-results?status=final" \
    -H "Authorization: Bearer $TOKEN"
}

# Download record as PDF
download_record() {
  curl -X GET "$BASE_URL/records/$1/download" \
    -H "Authorization: Bearer $TOKEN" \
    -o "medical_record_$1.pdf"
}

# ============================================================================
# PRESCRIPTIONS
# ============================================================================

# List active prescriptions
list_prescriptions() {
  curl -X GET "$BASE_URL/prescriptions?patient_id=$1&status=active" \
    -H "Authorization: Bearer $TOKEN"
}

# Request refill
request_refill() {
  curl -X POST "$BASE_URL/prescriptions/$1/refill" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "pharmacy_id": "PHARM-001",
      "delivery_method": "pickup"
    }'
}

# Check drug interactions
check_interactions() {
  curl -X POST "$BASE_URL/prescriptions/check-interactions" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "patient_id": "PAT-001",
      "medication_id": "MED-123"
    }'
}

# Search formulary
search_formulary() {
  curl -X GET "$BASE_URL/formulary?query=metformin" \
    -H "Authorization: Bearer $TOKEN"
}

# Find nearby pharmacies
find_pharmacies() {
  curl -X GET "$BASE_URL/pharmacies?lat=50.4501&lng=30.5234&radius_km=5&type=network" \
    -H "Authorization: Bearer $TOKEN"
}

# ============================================================================
# PROGRAMS
# ============================================================================

# List programs
list_programs() {
  curl -X GET "$BASE_URL/programs?type=ptsd&virtual_available=true" \
    -H "Authorization: Bearer $TOKEN"
}

# Enroll in program
enroll_program() {
  curl -X POST "$BASE_URL/programs/$1/enroll" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "patient_id": "PAT-001",
      "preferred_start_date": "2025-02-01",
      "notes": "Referred by primary care provider"
    }'
}

# ============================================================================
# DISABILITY
# ============================================================================

# Schedule assessment
schedule_assessment() {
  curl -X POST "$BASE_URL/disability/assessments" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "patient_id": "PAT-001",
      "assessment_type": "initial",
      "preferred_date": "2025-02-15",
      "notes": "Combat-related injuries from service"
    }'
}

# Upload document
upload_document() {
  curl -X POST "$BASE_URL/disability/assessments/$1/documents" \
    -H "Authorization: Bearer $TOKEN" \
    -F "file=@/path/to/document.pdf" \
    -F "document_type=medical_record" \
    -F "description=Hospital discharge summary"
}

# Get disability status
get_disability_status() {
  curl -X GET "$BASE_URL/patients/$1/disability-status" \
    -H "Authorization: Bearer $TOKEN"
}

# ============================================================================
# CLAIMS
# ============================================================================

# Submit claim
submit_claim() {
  curl -X POST "$BASE_URL/claims" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "patient_id": "PAT-001",
      "provider_id": "PROV-001",
      "service_date": "2025-01-05",
      "service_type": "specialty_care",
      "billed_amount": 5000,
      "procedure_codes": ["99214"],
      "diagnosis_codes": ["I10"]
    }'
}

# Appeal claim
appeal_claim() {
  curl -X POST "$BASE_URL/claims/$1/appeal" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "reason": "Service was medically necessary for condition management"
    }'
}

# Get cost sharing summary
get_cost_sharing() {
  curl -X GET "$BASE_URL/patients/$1/cost-sharing?year=2025" \
    -H "Authorization: Bearer $TOKEN"
}

# ============================================================================
# AUTHORIZATIONS
# ============================================================================

# Request authorization
request_authorization() {
  curl -X POST "$BASE_URL/authorizations" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "patient_id": "PAT-001",
      "provider_id": "PROV-001",
      "service_type": "specialty_care",
      "service_description": "MRI of lumbar spine",
      "procedure_codes": ["72148"],
      "diagnosis_codes": ["M54.5"],
      "clinical_notes": "Patient has chronic lower back pain not responding to conservative treatment",
      "urgency": "standard"
    }'
}

# Check if authorization required
check_auth_required() {
  curl -X POST "$BASE_URL/authorizations/check-required" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "service_type": "specialty_care",
      "procedure_code": "72148",
      "diagnosis_codes": ["M54.5"]
    }'
}

# ============================================================================
# PROVIDERS
# ============================================================================

# Search providers
search_providers() {
  curl -X GET "$BASE_URL/providers?specialty=cardiology&accepting_patients=true&telemedicine_available=true" \
    -H "Authorization: Bearer $TOKEN"
}

# Find facilities
find_facilities() {
  curl -X GET "$BASE_URL/facilities?type=military&lat=50.4501&lng=30.5234&radius_km=25" \
    -H "Authorization: Bearer $TOKEN"
}

# ============================================================================
# INTEGRATION
# ============================================================================

# Sync with pension
sync_pension() {
  curl -X POST "$BASE_URL/integration/pension/sync" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "patient_id": "PAT-001"
    }'
}

# Get pension-based benefits
get_pension_benefits() {
  curl -X GET "$BASE_URL/integration/pension/benefits?patient_id=PAT-001" \
    -H "Authorization: Bearer $TOKEN"
}

# Coordinate benefits
coordinate_benefits() {
  curl -X POST "$BASE_URL/integration/insurance/coordinate-benefits" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
      "patient_id": "PAT-001",
      "claim_amount": 10000,
      "service_type": "specialty_care"
    }'
}

# Get combined statement
get_combined_statement() {
  curl -X GET "$BASE_URL/integration/combined-statement?patient_id=PAT-001&month=1&year=2025" \
    -H "Authorization: Bearer $TOKEN"
}

# ============================================================================
# USAGE
# ============================================================================

echo "IVYAR Medical Program API Examples"
echo "==================================="
echo ""
echo "Set your token: export TOKEN=your_token_here"
echo ""
echo "Available functions:"
echo "  Patients:       register_patient, get_patient, check_eligibility, get_benefits"
echo "  Appointments:   get_available_slots, schedule_appointment, confirm_appointment, check_in"
echo "  Records:        get_health_summary, get_lab_results, download_record"
echo "  Prescriptions:  list_prescriptions, request_refill, check_interactions, search_formulary"
echo "  Programs:       list_programs, enroll_program"
echo "  Disability:     schedule_assessment, upload_document, get_disability_status"
echo "  Claims:         submit_claim, appeal_claim, get_cost_sharing"
echo "  Authorizations: request_authorization, check_auth_required"
echo "  Providers:      search_providers, find_facilities"
echo "  Integration:    sync_pension, get_pension_benefits, coordinate_benefits, get_combined_statement"
