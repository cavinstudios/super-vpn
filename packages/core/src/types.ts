/**
 * Shared domain types for the Super VPN client.
 *
 * Nothing in this package opens a tunnel by itself: it produces the key
 * material and configuration that a platform backend (wg-quick, WireGuardKit,
 * GoBackend, wireguard-nt) consumes, and models the client-side state around
 * that backend.
 */

/** A base64-encoded 32-byte Curve25519 key, as WireGuard writes them. */
export type WireGuardKey = string;

export interface KeyPair {
  /** Base64 private key. Never leaves the device it was generated on. */
  privateKey: WireGuardKey;
  /** Base64 public key, derived from the private key. Safe to publish. */
  publicKey: WireGuardKey;
}

/** Geographic/administrative description of an endpoint the client may use. */
export interface ServerLocation {
  /** Stable slug, e.g. `us-nyc-01`. */
  id: string;
  city: string;
  country: string;
  /** ISO 3166-1 alpha-2, uppercase. */
  countryCode: string;
  region: Region;
  /** Hostname or IP literal of the WireGuard endpoint. */
  hostname: string;
  /** UDP port the endpoint listens on. */
  port: number;
  /** Base64 public key of the server peer. */
  publicKey: WireGuardKey;
  /** Advertised capacity hint, 0..1 where 1 is saturated. Optional. */
  load?: number;
  /** Endpoint supports forwarding peer-to-peer/port-forwarded traffic. */
  portForwarding?: boolean;
  /** URL used for latency and reachability probes (HTTPS). */
  probeUrl?: string;
}

export type Region =
  | "north-america"
  | "south-america"
  | "europe"
  | "africa"
  | "asia-pacific"
  | "middle-east";

export const REGIONS: readonly Region[] = [
  "north-america",
  "south-america",
  "europe",
  "africa",
  "asia-pacific",
  "middle-east",
] as const;

/** A server with locally measured telemetry attached. */
export interface MeasuredServer extends ServerLocation {
  /** Round-trip latency in milliseconds, or null when unreachable/unmeasured. */
  latencyMs: number | null;
}

/** Everything needed to build a working WireGuard interface. */
export interface TunnelProfile {
  /** Human label shown in UI and used as the tunnel/interface name. */
  name: string;
  /** This device's key pair. */
  keys: KeyPair;
  /** Addresses assigned to the interface, CIDR notation. */
  addresses: string[];
  /** DNS resolvers pushed to the system while the tunnel is up. */
  dns: string[];
  /** Server to connect to. */
  server: ServerLocation;
  /** Optional symmetric pre-shared key for post-quantum hardening. */
  presharedKey?: WireGuardKey;
  /** Routes captured by the tunnel. Defaults to full-tunnel. */
  allowedIps?: string[];
  /** Seconds between keepalives; needed behind NAT. */
  persistentKeepalive?: number;
  /** Interface MTU. */
  mtu?: number;
  /** Apps/CIDRs deliberately routed outside the tunnel. */
  splitTunnel?: SplitTunnelRule[];
}

export interface SplitTunnelRule {
  kind: "cidr" | "app";
  /** CIDR for `kind: "cidr"`, bundle id / executable name for `kind: "app"`. */
  value: string;
}

export type ConnectionStatus =
  | "disconnected"
  | "connecting"
  | "connected"
  | "reconnecting"
  | "disconnecting"
  | "error";

export interface ConnectionSnapshot {
  status: ConnectionStatus;
  /** Server currently selected, whether or not the tunnel is up. */
  server: ServerLocation | null;
  /** Epoch ms when the tunnel reached `connected`, else null. */
  connectedSince: number | null;
  /** Bytes counters reported by the platform backend. */
  rx: number;
  tx: number;
  /** Epoch ms of the most recent handshake reported by the backend. */
  lastHandshake: number | null;
  /** Populated when `status === "error"`. */
  error: string | null;
  /** Consecutive failed connect attempts in the current session. */
  attempt: number;
}

/**
 * The platform-specific half of the client. Each target (desktop helper, CLI,
 * Android VpnService, iOS NetworkExtension) implements this one interface.
 */
export interface TunnelBackend {
  /** Human-readable backend id, e.g. `wg-quick`, `wireguard-nt`. */
  readonly id: string;
  /** Resolves true when this backend can run on the current host. */
  isAvailable(): Promise<boolean>;
  up(profile: TunnelProfile): Promise<void>;
  down(): Promise<void>;
  /** Live counters from the running interface, or null when down. */
  stats(): Promise<TunnelStats | null>;
}

export interface TunnelStats {
  rx: number;
  tx: number;
  /** Epoch ms, or null when no handshake has completed. */
  lastHandshake: number | null;
}
