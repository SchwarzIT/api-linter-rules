import { Spectral } from '@stoplight/spectral-core';
import { beforeAll, describe, expect, it } from 'vitest';
import { mustHavePath } from './must-have-path';

describe('must-have-path', () => {
  let spectral: Spectral;

  beforeAll(async () => {
    spectral = new Spectral();
    spectral.setRuleset({
      rules: { 'must-have-path': mustHavePath },
    });
  });

  it('has no errors', async () => {
    const result = await spectral.run(getTestSpec({ path: 42 }));
    expect(result).toHaveLength(0);
  });

  it('fails if no paths are provided', async () => {
    const result = await spectral.run(getTestSpec({}));
    expect(result).toHaveLength(1);
    expect(result[0]?.code).toEqual('must-have-path');
    expect(result[0]?.message).toContain('`paths` is empty');
  });

  const getTestSpec = (paths: Record<string, unknown>) => {
    return {
      paths,
    };
  };
});
