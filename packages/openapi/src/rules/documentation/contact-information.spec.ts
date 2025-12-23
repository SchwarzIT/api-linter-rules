import { Spectral } from '@stoplight/spectral-core';
import { beforeAll, describe, expect, it } from 'vitest';
import { contactInformation } from './contact-information';

describe('contact-information', () => {
  let spectral: Spectral;

  beforeAll(async () => {
    spectral = new Spectral();
    spectral.setRuleset({
      rules: { 'contact-information': contactInformation },
    });
  });

  it('has no errors', async () => {
    const result = await spectral.run({
      info: {
        contact: { name: 'name', email: 'email', url: 'url' },
      },
    });
    expect(result).toHaveLength(0);
  });

  it('is missing the required property name', async () => {
    const result = await spectral.run({
      info: {
        contact: { email: 'email', url: 'url' },
      },
    });
    expect(result).toHaveLength(1);
    expect(result[0]?.code).toEqual('contact-information');
    expect(result[0]?.message).toContain('name is missing');
  });

  it('is missing the required property email', async () => {
    const result = await spectral.run({
      info: {
        contact: { name: 'name', url: 'url' },
      },
    });
    expect(result).toHaveLength(1);
    expect(result[0]?.code).toEqual('contact-information');
    expect(result[0]?.message).toContain('email is missing');
  });

  it('is missing the required property url', async () => {
    const result = await spectral.run({
      info: {
        contact: { name: 'name', email: 'email' },
      },
    });
    expect(result).toHaveLength(1);
    expect(result[0]?.code).toEqual('contact-information');
    expect(result[0]?.message).toContain('url is missing');
  });
});
