import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
}>();

app.use("/api/v1/blog/*", async (c, next) => {
  const auth = c.req.header("Authorization") || "";
  if (!auth) {
    c.status(401);
    return c.json({ error: "Unauthorized" });
  }

  const token = auth.split(" ")[1];
  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    await next()
  } catch (e) {
    c.status(403);
    return c.json({ error: "Unauthorized" });
  }
})

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password
      },
    });
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (e) {
    c.status(403);
    return c.json({ error: "error while signing up" });
  }
})


app.post('/api/v1/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password
    }
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "user not found" });
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({
    msg: "Login Successful",
    jwt: `Bearer ${jwt}`,
  });
})


app.post('/api/v1/blog', (c) => {
  return c.json({ message: 'Your posts' })
})

app.put('/api/v1/blog/add', (c) => {
  return c.json({ message: 'Signup success' })
})

app.get('/api/v1/blog:id', (c) => {
  return c.json({ message: 'Signup success' })
})



export default app