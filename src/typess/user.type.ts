import { WalletNS } from "./wallet.type";

export namespace UserNS {
  export interface Role {
    roleName: string;
  }
  export interface User {
    carID: string;
    email: string;
    owner: string;
    connection: any;
    role: Role;
    wallet: WalletNS.Wallet;
  }
}
