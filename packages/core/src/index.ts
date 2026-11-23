export type ConnectionState =
  | { status: "disconnected" }
  | { status: "connecting"; serverId: string }
  | { status: "connected"; serverId: string; connectedAt: number }
  | { status: "error"; message: string };

export type ConnectionEvent =
  | { type: "connect"; serverId: string }
  | { type: "connected"; connectedAt: number }
  | { type: "failed"; message: string }
  | { type: "disconnect" };

export function transitionConnection(
  state: ConnectionState,
  event: ConnectionEvent,
): ConnectionState {
  switch (event.type) {
    case "connect":
      if (state.status !== "disconnected" && state.status !== "error") {
        throw new Error(`Cannot connect while ${state.status}.`);
      }
      if (!event.serverId.trim()) {
        throw new Error("A server ID is required to connect.");
      }
      return { status: "connecting", serverId: event.serverId };

    case "connected":
      if (state.status !== "connecting") {
        throw new Error(`Cannot complete connection while ${state.status}.`);
      }
      return {
        status: "connected",
        serverId: state.serverId,
        connectedAt: event.connectedAt,
      };

    case "failed":
      if (state.status !== "connecting") {
        throw new Error(`Cannot fail connection while ${state.status}.`);
      }
      return { status: "error", message: event.message };

    case "disconnect":
      if (state.status !== "connected" && state.status !== "error") {
        throw new Error(`Cannot disconnect while ${state.status}.`);
      }
      return { status: "disconnected" };
  }
}
