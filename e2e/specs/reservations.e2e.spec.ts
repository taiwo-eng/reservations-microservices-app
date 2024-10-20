describe('Reservations', () => {
  beforeAll(async () => {
    const user = {
      email: 'test3@example.com',
      password: 'StrongEmailPassword_12!',
    };
    await fetch('http://auth:3001', {
      method: 'POST',
      body: JSON.stringify(user),
    });
  });
});
