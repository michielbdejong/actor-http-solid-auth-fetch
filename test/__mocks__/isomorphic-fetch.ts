(<any> global).fetch = (input: any, init: any) => {
  if (input.url === 'https://www.google.comz/') {
    throw new Error('FetchError: request to https://google.comz/ failed, reason: getaddrinfo ENOTFOUND google.comz');
  }
  return Promise.resolve({ status: input.url === 'https://www.google.com/' ? 200 : 404 });
};
