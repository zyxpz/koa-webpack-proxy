const Koa = require('koa');

const app = new Koa();

app.use(async (ctx, next) => {
	ctx.body = 'hellow world';
});

app.listen('8001');