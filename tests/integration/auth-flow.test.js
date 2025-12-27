// Integration Test: Auth Flow

describe('Auth Flow Integration', () => {
  test('Login -> Session -> Protected Route', async () => {
    // Step 1: Login
    // TODO: POST /auth/login

    // Step 2: Store session
    // TODO: Save token

    // Step 3: Access protected route
    // TODO: GET /catalog with token

    // Step 4: Verify access granted
    // TODO: Check response 200
  });

  test('Logout invalidates session', async () => {
    // TODO: Login
    // TODO: Logout
    // TODO: Verify token invalid
  });
});
