import common from '../../locales/pt-br/common.json';
import home from '../../locales/pt-br/home.json';
import login from '../../locales/pt-br/login.json';
import register from '../../locales/pt-br/register.json';
import sendMessage from '../../locales/pt-br/send-message.json';

const NAMESPACES: Record<string, any> = {
    common,
    home,
    login,
    register,
    'send-message': sendMessage,
};

function lookup(namespace: string, key: string) {
    const ns = NAMESPACES[namespace] || {};
    const parts = key.split('.');
    let cur: any = ns;
    for (const p of parts) {
        if (cur && typeof cur === 'object' && p in cur) {
            cur = cur[p];
        } else {
            return key;
        }
    }
    return typeof cur === 'string' ? cur : key;
}

export default function useTranslation(namespace: string) {
    return {
        t: (k: string) => lookup(namespace, k),
    };
}
