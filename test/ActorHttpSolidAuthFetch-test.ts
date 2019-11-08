import {ActorHttp} from "@comunica/bus-http";
import {Bus} from "@comunica/core";
import {ActorHttpSolidAuthFetch} from "../lib/ActorHttpSolidAuthFetch";

import 'isomorphic-fetch';

jest.mock('isomorphic-fetch');

describe('ActorHttpSolidAuthFetch', () => {
  let bus;

  beforeEach(() => {
    bus = new Bus({ name: 'bus' });
  });

  describe('The ActorHttpSolidAuthFetch module', () => {
    it('should be a function', () => {
      expect(ActorHttpSolidAuthFetch).toBeInstanceOf(Function);
    });

    it('should be a ActorHttpSolidAuthFetch constructor', () => {
      expect(new ActorHttpSolidAuthFetch({ name: 'actor', bus })).toBeInstanceOf(ActorHttpSolidAuthFetch);
      expect(new ActorHttpSolidAuthFetch({ name: 'actor', bus })).toBeInstanceOf(ActorHttp);
    });

    it('should not be able to create new ActorHttpSolidAuthFetch objects without \'new\'', () => {
      expect(() => { (<any> ActorHttpSolidAuthFetch)(); }).toThrow();
    });
  });

  describe('An ActorHttpSolidAuthFetch instance', () => {
    let actor: ActorHttpSolidAuthFetch;

    beforeEach(() => {
      actor = new ActorHttpSolidAuthFetch({ name: 'actor', bus });
    });

    it('should test', () => {
      return expect(actor.test({ input: <Request> { url: 'https://www.google.com/' }})).resolves
        .toEqual({ time: Infinity });
    });

    it('should run on an existing URI', () => {
      return expect(actor.run({ input: <Request> { url: 'https://www.google.com/' }})).resolves
        .toMatchObject({ status: 200 });
    });

    it('should run on an non-existing URI', () => {
      return expect(actor.run({ input: <Request> { url: 'https://www.google.com/notfound' }})).resolves
        .toMatchObject({ status: 404 });
    });

    it('should run on an unresolvable URI', () => {
      return expect(actor.run({ input: <Request> { url: 'https://www.google.comz/' }})).rejects
        .toThrow('FetchError');
    });
  });
});
