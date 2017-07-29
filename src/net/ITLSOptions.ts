import * as net from "net";

import { SecureContext } from "tls";

export interface ITLSOptions {
          /**
           * An optional TLS context object from tls.createSecureContext()
           */
          secureContext?: SecureContext;
          /**
           * If true the TLS socket will be instantiated in server-mode.
           * Defaults to false.
           */
          isServer?: boolean;
          /**
           * An optional net.Server instance.
           */
          server?: net.Server;
          /**
           * If true the server will request a certificate from clients that
           * connect and attempt to verify that certificate. Defaults to
           * false.
           */
          requestCert?: boolean;
          /**
           * If true the server will reject any connection which is not
           * authorized with the list of supplied CAs. This option only has an
           * effect if requestCert is true. Defaults to false.
           */
          rejectUnauthorized?: boolean;
          /**
           * An array of strings or a Buffer naming possible NPN protocols.
           * (Protocols should be ordered by their priority.)
           */
          NPNProtocols?: string[] | Buffer;
          /**
           * An array of strings or a Buffer naming possible ALPN protocols.
           * (Protocols should be ordered by their priority.) When the server
           * receives both NPN and ALPN extensions from the client, ALPN takes
           * precedence over NPN and the server does not send an NPN extension
           * to the client.
           */
          ALPNProtocols?: string[] | Buffer;
          /**
           * SNICallback(servername, cb) <Function> A function that will be
           * called if the client supports SNI TLS extension. Two arguments
           * will be passed when called: servername and cb. SNICallback should
           * invoke cb(null, ctx), where ctx is a SecureContext instance.
           * (tls.createSecureContext(...) can be used to get a proper
           * SecureContext.) If SNICallback wasn't provided the default callback
           * with high-level API will be used (see below).
           */
          // tslint:disable-next-line:ban-types
          SNICallback?: Function;
          /**
           * An optional Buffer instance containing a TLS session.
           */
          session?: Buffer;
          /**
           * If true, specifies that the OCSP status request extension will be
           * added to the client hello and an 'OCSPResponse' event will be
           * emitted on the socket before establishing a secure communication
           */
          requestOCSP?: boolean;
        }
