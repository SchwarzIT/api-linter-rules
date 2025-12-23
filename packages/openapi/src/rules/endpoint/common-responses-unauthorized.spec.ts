import { Spectral } from '@stoplight/spectral-core';
import { beforeAll, describe, expect, it } from 'vitest';
import { commonResponsesUnauthorized } from './common-responses-unauthorized';

describe('common-responses-unauthorized', () => {
  let spectral: Spectral;

  beforeAll(async () => {
    spectral = new Spectral();
    spectral.setRuleset({
      rules: { 'common-responses-unauthorized': commonResponsesUnauthorized },
    });
  });

  it('has no errors if a 401 response is defined', async () => {
    const result = await spectral.run({
      paths: {
        '/api/some/path': {
          get: {
            responses: {
              401: 42,
            },
          },
        },
      },
    });

    expect(result).toHaveLength(0);
  });

  it.each([
    { 200: '' },
    { 404: '' },
    { 200: '', 201: '' },
    { 400: '', 200: '', 500: '' },
  ])('fails if no 401 response is defined', async (responses) => {
    const result = await spectral.run({
      paths: {
        '/api/some/path': {
          get: {
            responses,
          },
        },
      },
    });

    expect(result).toHaveLength(1);
    expect(result[0]?.code).toEqual('common-responses-unauthorized');
  });
});
