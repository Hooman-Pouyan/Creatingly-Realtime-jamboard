export declare const SocketEvents: {
    JAMBOARD: {
        STATE: string;
        ELEMENT$: string;
        ELEMENT: {
            SIZE: string;
            POSITION: string;
            APPEARANCE: string;
            DATA: string;
            INFO: string;
        };
        CURSOR: {
            MOVE: string;
        };
        USERS$: string;
        USERS: {
            LOGIN: string;
            LOGOUT: string;
            UPDATE: string;
        };
    };
    PLANNING: {
        state: string;
        TASK: {
            DATA: string;
        };
        CURSOR: {
            MOVE: string;
        };
        USERS: {
            ACTIVE: string;
        };
    };
};
