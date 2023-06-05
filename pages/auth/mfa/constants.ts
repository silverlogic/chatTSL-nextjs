import { MfaMethodEnum } from "@baseapp-frontend/core"

export const MfaMethodHumanize = {
    [MfaMethodEnum.app]: "TOTP App",
    [MfaMethodEnum.smsTwilio]: "SMS",
    [MfaMethodEnum.email]: "Email",
}