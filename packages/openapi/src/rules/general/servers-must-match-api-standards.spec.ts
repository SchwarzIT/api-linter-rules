import { Spectral } from '@stoplight/spectral-core';
import { beforeAll, describe, expect, it } from 'vitest';
import { serversMustMatchApiStandards } from './servers-must-match-api-standards';

describe('servers-must-match-api-standards', () => {
  let spectral: Spectral;

  beforeAll(async () => {
    spectral = new Spectral();
    spectral.setRuleset({
      rules: {
        'servers-must-match-api-standards': serversMustMatchApiStandards,
      },
    });
  });

  it('has no errors', async () => {
    const result = await spectral.run(
      getTestSpec(['https://live.api.schwarz/digital-twin/api/v1/products'])
    );
    expect(result).toHaveLength(0);
  });

  it.each([
    [['test']],
    [['www.google.com']],
    [['https://www.google.com']],
    [
      [
        'https://live.api.schwarz/digital-twin/api/v1/products',
        'error.schwarz',
      ],
    ],
  ])(
    'fails if any of the server urls does not match the expected pattern',
    async (urls) => {
      const result = await spectral.run(getTestSpec(urls));
      expect(result.length).toBeGreaterThanOrEqual(1);
      expect(result[0]?.code).toEqual('servers-must-match-api-standards');
    }
  );

  const getTestSpec = (urls: string[]) => {
    return {
      servers: urls.map((url) => ({ url })),
    };
  };
});
