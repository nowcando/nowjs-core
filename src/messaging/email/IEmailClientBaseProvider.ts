import * as net from "net";

import { IProvider } from "../../core/index";
import { ITLSOptions } from "../../net/index";
import { IEmailMessage, IEmailMessageStatus } from "../index";

export interface IEmailClientTransportOptions {
      Service?: string;
      Host: string;
      Port: number;
      Username?: string;
      Password?: string;
      IsSecured?: boolean;
      RequireTLS?: boolean;
      IgnoreTLS?: boolean;
      AuthType?: string;
      AuthToken?: string;
      ConnectionTimeout?: number;
      GreetingTimeout?: number;
      SocketTimeout?: number;
      ConnectionPool?: boolean;
      ConnectionMax?: number;
      ConnectionMaxMessage?: number;
      ConnectionProxy?: string;
      TLS?: ITLSOptions;
}

export interface IEmailClientOptions {
      ProviderName?: string;
      Transport?: IEmailClientTransportOptions;
}

export interface IEmailClientBaseProvider<TMessage extends IEmailMessage,
 TMessageStatus  extends IEmailMessageStatus> extends IProvider {
      send(message: TMessage, options?: IEmailClientOptions): Promise<TMessageStatus>;
}
