import { Spectral } from '@stoplight/spectral-core';
import { beforeAll, describe, expect, it } from 'vitest';
import { pathMustSpecifyTags } from './path-must-specify-tags';

describe('path-must-specify-tags', () => {
  let spectral: Spectral;

  beforeAll(async () => {
    spectral = new Spectral();
    spectral.setRuleset({
      rules: { 'path-must-specify-tags': pathMustSpecifyTags },
    });
  });

  it('has no errors if tags are provided', async () => {
    const result = await spectral.run(getTestSpec(['tag']));
    expect(result).toHaveLength(0);
  });

  it('fails if no tags were provided', async () => {
    const result = await spectral.run(getTestSpec());
    expect(result).toHaveLength(1);
    expect(result[0]?.code).toEqual('path-must-specify-tags');
  });

  it('fails if the number of tag is less than 1', async () => {
    const result = await spectral.run(getTestSpec([]));
    expect(result).toHaveLength(1);
    expect(result[0]?.code).toEqual('path-must-specify-tags');
  });

  it('do not fail if the keywords for http methods are used in components', async () => {
    const result = await spectral.run(getComponentTestSpec());
    expect(result).toHaveLength(0);
  });

  it('ignores paths under the well-known route', async () => {
    const result = await spectral.run(
      getTestSpec(undefined, '/well-known/health')
    );
    expect(result).toHaveLength(0);
  });

  it('ignores non http verb fields', async () => {
    const result = await spectral.run(
      JSON.stringify({
        openapi: '3.0',
        paths: {
          '/test/{param}': {
            summary: '',
            description: '',
            servers: [],
            parameters: [
              {
                name: 'param',
                in: 'path',
                schema: { type: 'string' },
              },
            ],
          },
        },
      })
    );
    expect(result).toHaveLength(0);
  });

  const getTestSpec = (tags?: string[], path = '/api/some/path') => {
    return {
      openapi: '3.0.0',
      paths: {
        [path]: {
          post: {
            tags,
          },
        },
      },
    };
  };

  const getComponentTestSpec = () => {
    return {
      openapi: '3.0.2',
      tags: [
        {
          name: 'SomeTag',
          description: 'some description',
        },
      ],
      paths: {
        '/twin/api/v1/somethings': {
          get: {
            operationId: 'GetSomething',
            description: 'hi test',
            tags: ['SomeTag'],
          },
        },
      },
      components: {
        schemas: {
          ShowMe: {
            type: 'object',
            properties: {
              input: {
                type: 'object',
                properties: {
                  get: {
                    type: 'string',
                  },
                  delete: {
                    type: 'boolean',
                  },
                  options: {
                    type: 'string',
                    nullable: true,
                  },
                },
              },
            },
          },
        },
      },
    };
  };
});
