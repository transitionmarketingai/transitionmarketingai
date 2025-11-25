#!/bin/bash

# Test script for Inquiry API Routes
# Usage: ./test-inquiry-routes.sh

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get admin API key from environment or use default test key
ADMIN_KEY="${ADMIN_API_KEY:-test-admin-key-123}"
BASE_URL="${BASE_URL:-http://localhost:3000}"

echo "=========================================="
echo "Testing Inquiry API Routes"
echo "=========================================="
echo ""
echo "Base URL: $BASE_URL"
echo "Admin Key: ${ADMIN_KEY:0:10}..."
echo ""

# Test 1: CREATE Inquiry
echo -e "${YELLOW}TEST 1: CREATE Inquiry${NC}"
echo "----------------------------------------"

CREATE_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/inquiries/create" \
  -H "x-admin-key: $ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "+919999999999",
    "email": "test@example.com",
    "industry": "Real Estate",
    "requirement": "2 BHK in Mumbai",
    "budget": "60–80L",
    "timeline": "Next 3 months",
    "source": "manual-test",
    "utm": {
      "source": "google",
      "medium": "cpc"
    }
  }')

HTTP_CODE=$(echo "$CREATE_RESPONSE" | tail -1)
BODY=$(echo "$CREATE_RESPONSE" | sed '$d')

if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "201" ]; then
  echo -e "${GREEN}✓ CREATE test passed (HTTP $HTTP_CODE)${NC}"
  echo "Response: $BODY"
  # Extract ID if present (for next tests)
  INQUIRY_ID=$(echo "$BODY" | grep -o '"id":"[^"]*"' | cut -d'"' -f4 || echo "")
  if [ -n "$INQUIRY_ID" ]; then
    echo "Inquiry ID: $INQUIRY_ID"
  fi
else
  echo -e "${RED}✗ CREATE test failed (HTTP $HTTP_CODE)${NC}"
  echo "Response: $BODY"
fi

echo ""
echo ""

# Test 2: Test unauthorized access (should fail)
echo -e "${YELLOW}TEST 2: Unauthorized Access (should fail)${NC}"
echo "----------------------------------------"

UNAUTH_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/inquiries/create" \
  -H "Content-Type: application/json" \
  -d '{"name": "Test"}')

UNAUTH_HTTP_CODE=$(echo "$UNAUTH_RESPONSE" | tail -1)
UNAUTH_BODY=$(echo "$UNAUTH_RESPONSE" | sed '$d')

if [ "$UNAUTH_HTTP_CODE" = "401" ]; then
  echo -e "${GREEN}✓ Unauthorized test passed (HTTP 401)${NC}"
  echo "Response: $UNAUTH_BODY"
else
  echo -e "${RED}✗ Unauthorized test failed (expected 401, got $UNAUTH_HTTP_CODE)${NC}"
  echo "Response: $UNAUTH_BODY"
fi

echo ""
echo ""

# Test 3: VERIFY Inquiry (if we have an ID)
if [ -n "$INQUIRY_ID" ]; then
  echo -e "${YELLOW}TEST 3: VERIFY Inquiry${NC}"
  echo "----------------------------------------"
  echo "Using Inquiry ID: $INQUIRY_ID"
  
  VERIFY_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/inquiries/verify" \
    -H "x-admin-key: $ADMIN_KEY" \
    -H "Content-Type: application/json" \
    -d "{
      \"id\": \"$INQUIRY_ID\",
      \"verification_status\": \"verified\"
    }")
  
  VERIFY_HTTP_CODE=$(echo "$VERIFY_RESPONSE" | tail -1)
  VERIFY_BODY=$(echo "$VERIFY_RESPONSE" | sed '$d')
  
  if [ "$VERIFY_HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✓ VERIFY test passed (HTTP $VERIFY_HTTP_CODE)${NC}"
    echo "Response: $VERIFY_BODY"
  else
    echo -e "${RED}✗ VERIFY test failed (HTTP $VERIFY_HTTP_CODE)${NC}"
    echo "Response: $VERIFY_BODY"
  fi
  
  echo ""
  echo ""
  
  # Test 4: DELIVER Inquiry
  echo -e "${YELLOW}TEST 4: DELIVER Inquiry${NC}"
  echo "----------------------------------------"
  echo "Using Inquiry ID: $INQUIRY_ID"
  
  DELIVER_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/inquiries/deliver" \
    -H "x-admin-key: $ADMIN_KEY" \
    -H "Content-Type: application/json" \
    -d "{
      \"id\": \"$INQUIRY_ID\"
    }")
  
  DELIVER_HTTP_CODE=$(echo "$DELIVER_RESPONSE" | tail -1)
  DELIVER_BODY=$(echo "$DELIVER_RESPONSE" | sed '$d')
  
  if [ "$DELIVER_HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✓ DELIVER test passed (HTTP $DELIVER_HTTP_CODE)${NC}"
    echo "Response: $DELIVER_BODY"
  else
    echo -e "${RED}✗ DELIVER test failed (HTTP $DELIVER_HTTP_CODE)${NC}"
    echo "Response: $DELIVER_BODY"
  fi
else
  echo -e "${YELLOW}⚠ Skipping VERIFY and DELIVER tests (no inquiry ID from CREATE)${NC}"
  echo "You can manually test these with an inquiry ID from Supabase"
fi

echo ""
echo "=========================================="
echo "Testing Complete"
echo "=========================================="

