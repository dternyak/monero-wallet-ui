import { formatMoneyWithSymbol } from '@xmr-core/xmr-money';

const fmt = formatMoneyWithSymbol;
const splitFmt = (str: string) => Number(str.split(' ')[0]);

// don't know unit names from server
export const serverToMonero = serverValue => {
  return splitFmt(fmt(serverValue));
};
