export const SocketEvents = {
  JAMBOARD: {
    STATE: 'jambaord:state',
    COMMENTS$: 'jamboard:comments',
    ELEMENT$: 'jamboard:element',
    ELEMENT: {
      SIZE: 'jamboard:element:size',
      POSITION: 'jamboard:element:position',
      APPEARENCE: 'jamboard:element:appearence',
      DATA: 'jamboard:element:data',
      INFO: 'jamboard:element:info',
    },
    CURSOR: {
      MOVE: 'jamboard:cursor:move',
    },
    USERS$: 'jamboard:users',
    USERS: {
      LOGIN: 'jamboard:users:login',
      LOGOUT: 'jamboard:users:logout',
      UPDATE: 'jamboard:users:update',
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
