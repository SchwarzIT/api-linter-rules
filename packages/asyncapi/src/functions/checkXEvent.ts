export const checkXEvent = (input: any) => {
  let uniqueEvents: any[] = [];
  for (const [, value] of Object.entries(input['channels'] as any)) {
    if (uniqueEvents.includes((value as any)['x-event-name'])) {
      return [
        {
          message: `channels.x-event-name:${
            (value as any)['x-event-name']
          } must be unique`,
        },
      ];
    }
    uniqueEvents.push((value as any)['x-event-name']);
  }
};
