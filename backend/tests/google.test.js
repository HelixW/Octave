// this file tests the functionf of bin/google
const google = require('./../bin/google/google');
google.seed();

const request = require('request');

describe('Testing ./bin/google/google', () => {
  // check generated url
  it('checking generated url', () => {
    const internalUrl = google.generateUrl('internal');
    const externalUrl = google.generateUrl('external');

    expect(internalUrl).toBe(
      `https://accounts.google.com/o/oauth2/auth?response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile+https://www.googleapis.com/auth/userinfo.email&&client_id=${process.env.GOOGLE_CLIENT_ID}&state=internal&redirect_uri=${process.env.GOOGLE_CALLBACK}&access_type=offline&prompt=consent`,
    );
    expect(externalUrl).toBe(
      `https://accounts.google.com/o/oauth2/auth?response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile+https://www.googleapis.com/auth/userinfo.email&&client_id=${process.env.GOOGLE_CLIENT_ID}&state=external&redirect_uri=${process.env.GOOGLE_CALLBACK}&access_type=offline&prompt=consent`,
    );
  });

  // check if VIT Emails are identified correctly
  it('checking VIT email', () => {
    expect(
      google.checkIfVitEmail('yashkumar.verma2019@vitstudent.ac.in'),
    ).toBe(true);

    expect(google.checkIfVitEmail('yk.verma2000@gmail.com')).toBe(
      false,
    );

    expect(
      google.checkIfVitEmail('someone.example@vitstudent.ac.in'),
    ).toBe(false);
  });

  //   tests ending
});
