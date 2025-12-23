const REGEXP_PATTERN = /\{(?<params>.*?)\}/g;

export const parameterValidation = (input: any) => {
  for (const [key, value] of Object.entries(input)) {
    // try to get all parameters which are defined inside the event key
    for (const _match of key.matchAll(REGEXP_PATTERN)) {
      // verify that the event has a parameters block if we match parameters inside the event
      if (!('parameters' in (value as any))) {
        return [
          {
            message: `event ${key} has parameters set but does not define those parameters.`,
          },
        ];
      }
    }
  }
};
