(<any> global).fetch = (input: any, init: any) => {
  return Promise.resolve({ status: input.url === 'https://www.google.com/' ? 200 : 404 });
};
