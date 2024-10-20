describe('Reservations', () => {
  let jwt: string;
  beforeAll(async () => {
    const user = {
      email: 'test3@example.com',
      password: 'StrongEmailPassword_12!',
    };
    await fetch('http://auth:3001/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const response = await fetch('http://auth:3001/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    jwt = await response.text();
  });

  test('Create', async () => {
    const reservationBody = {
      startDate: '11/20/2024',
      endDate: '01/31/2025',
      placeId: '12345',
      invoiceId: '782',
      charge: {
        amount: 250,
        card: {
          cvc: '413',
          exp_year: 2027,
          exp_month: 12,
          number: '4242 4242 4242 4242',
        },
      },
    };
    const responseCreate = await fetch(
      'http://reservations:3000/reservations',
      {
        method: 'POST',
        body: JSON.stringify(reservationBody),
        headers: {
          'Content-Type': 'application/json',
          Authentication: jwt,
        },
      },
    );
    expect(responseCreate.ok).toBeTruthy();

    const createdReservation = await responseCreate.json();
    const responseGet = await fetch(
      `http://reservations:3000/reservations${createdReservation._id}`,
      {
        headers: {
          Authentication: jwt,
        },
      },
    );
    const reservation = await responseGet.json();
    expect(createdReservation).toEqual(reservation);
  });
});
