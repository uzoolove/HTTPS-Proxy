import express from 'express';
import proxy from 'http-proxy-middleware';
import greenlock from 'greenlock-express';

const proxyMiddleware = proxy.createProxyMiddleware({
  target: 'http://localhost:3000', // 포워딩할 서버(실제 서버)
  // changeOrigin: true, // Host 헤더를 타겟 도메인으로 수정
  onProxyReq: (proxyReq, req, res) => {
    // 클라이언트의 IP 주소를 프록시 요청 헤더에 추가
    proxyReq.setHeader('x-forwarded-for', req.ip);
  },
  ws: true, // proxy websockets
});

const app = express();

app.use('/', proxyMiddleware);

greenlock.init({
  packageRoot: '.',
  configDir: './greenlock.d',
  maintainerEmail: "uzoolove@gmail.com",
  cluster: false
}).serve(app); // Serves on 80 and 443
