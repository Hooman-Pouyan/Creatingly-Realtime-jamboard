export const SocketEvents = {
  JAMBOARD: {
    STATE: 'jambaord:state',
    ELEMENT: {
      STATE: 'jamboard:element',
      SIZE: 'jamboard:element:size',
      POSITION: 'jamboard:element:position',
      APPEARENCE: 'jamboard:element:appearence',
      DATA: 'jamboard:element:data',
      INFO: 'jamboard:element:info',
    },
    CURSOR: {
      MOVE: 'jamboard:cursor:move',
    },
    USERS: {
      STATE: 'jamboard:users',
      ACTIVE: 'jamboard:users:active',
    },
  },
  PLANNING: {
    state: 'plannnig:state',
    TASK: {
      DATA: 'planning:task:data',
    },
    CURSOR: {
      MOVE: 'planning:cursor:move',
    },
    USERS: {
      ACTIVE: 'planning:users:active',
    },
  },
};
