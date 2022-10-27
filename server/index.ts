import { Application, Router, Context } from 'https://deno.land/x/oak/mod.ts';

const app = new Application();
const router = new Router();

router.get('/', (ctx: Context): void => {
	ctx.response.body = 'Hello World!';
});

router.get('/saludo', (ctx: Context): void => {
	ctx.response.status = 200;
	ctx.response.body = `
  <!DOCTYPE html>
  <html>
    <head><title>Hello Luka</title><head>
    <body>
      <h1 style="color: red;">Hola estas? Esto es un desafio!</h1>
    </body>
  </html>
  `;
});

app.use(router.routes());

app.listen({ port: 8080 });

console.log('Server listening on: http://127.0.0.1:8080');
