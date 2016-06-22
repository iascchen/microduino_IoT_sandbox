/**
 * Created by chenhao on 16/6/4.
 */
import { DDP } from 'meteor/ddp';

export const Constants = {
    SHARE_PRIVATE: 'O', SHARE_PUBLIC: 'P', SHARE_WITH_TOKEN: 'T',

    STATUS_NORMAL: 'N'
};

const remoteUrl = 'ws://localhost:3000/';
export const RemoteConnection = DDP.connect(remoteUrl);