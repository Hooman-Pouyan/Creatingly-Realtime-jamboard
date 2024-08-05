export const SocketEvents = {
  JAMBOARD: {
    STATE: 'jambaord:state',
    ELEMENT_: 'jamboard:element',
    ELEMENT: {
      SIZE: 'jamboard:element:size',
      POSITION: 'jamboard:element:position',
      APPEARANCE: 'jamboard:element:appearence',
      DATA: 'jamboard:element:data',
      INFO: 'jamboard:element:info',
    },
    CURSOR: {
      MOVE: 'jamboard:cursor:move',
    },
    USERS: {
      LOGIN: 'jamboard:users:login',
      LOGOUT: 'jamboard:user:logout',
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
