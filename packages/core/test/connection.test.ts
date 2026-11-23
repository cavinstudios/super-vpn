import { describe, expect, it } from "vitest";
import { transitionConnection, type ConnectionState } from "../src/index.js";

describe("transitionConnection", () => {
  it("moves through a successful connection and disconnect", () => {
    const connecting = transitionConnection(
      { status: "disconnected" },
      { type: "connect", serverId: "new-york" },
    );
    expect(connecting).toEqual({ status: "connecting", serverId: "new-york" });

    const connected = transitionConnection(connecting, {
      type: "connected",
      connectedAt: 123,
    });
    expect(connected).toEqual({
      status: "connected",
      serverId: "new-york",
      connectedAt: 123,
    });
    expect(transitionConnection(connected, { type: "disconnect" })).toEqual({
      status: "disconnected",
    });
  });

  it("requires a server ID and rejects invalid state transitions", () => {
    const disconnected: ConnectionState = { status: "disconnected" };
    expect(() =>
      transitionConnection(disconnected, { type: "connect", serverId: " " }),
    ).toThrow("A server ID is required to connect.");
    expect(() =>
      transitionConnection(disconnected, { type: "connected", connectedAt: 123 }),
    ).toThrow("Cannot complete connection while disconnected.");
  });

  it("returns to disconnected after a connection error", () => {
    const connecting = transitionConnection(
      { status: "disconnected" },
      { type: "connect", serverId: "amsterdam" },
    );
    const failed = transitionConnection(connecting, {
      type: "failed",
      message: "Unavailable",
    });
    expect(transitionConnection(failed, { type: "disconnect" })).toEqual({
      status: "disconnected",
    });
  });
});
