// pages/api/[...all].ts
// @ts-ignore
import { createProxyMiddleware } from 'http-proxy-middleware';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
};

const proxy = createProxyMiddleware({
    target: 'http://localhost:3000', // NestJSサーバーのアドレス
    changeOrigin: true,
    pathRewrite: {
        '^/api': '', // /apiを削除
    },
});

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'OPTIONS') {
        res.end();
        return;
    }
    return proxy(req, res);
};
