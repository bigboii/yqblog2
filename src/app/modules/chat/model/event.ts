// Socket.io events
export enum Event {
    CONNECT = "connect",
    JOINED = "JOINED",
    LEFT = "LEFT",
    RENAME = "RENAME",
    MESSAGE = "MESSAGE",
    CURRENT_USERS = "CURRENT_USERS",
    TYPING = "TYPING",
    NOT_TYPING = "NOT_TYPING",
    DISCONNECTED = "disconnect",
    SYSTEM = "SYSTEM"           //System events
}