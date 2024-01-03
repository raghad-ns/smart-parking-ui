import { WalletNS } from "./wallet.type";

export namespace UserNS {
  export interface Role {
    createdAt: Date;
    id: number;
    roleName: string;
    permissions: Array<any>;
  }
  export interface User {
    car_ID: string;
    email: string;
    id: string;
    owner: string;
    status: string;
    role: Role;
    wallet: WalletNS.Wallet;
  }
}
