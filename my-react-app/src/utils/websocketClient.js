import { io } from "socket.io-client";

const ENDPOINT = "ws://localhost:1234";
const socket = io(ENDPOINT, { path: "/socket-connection" });

export default socket;
