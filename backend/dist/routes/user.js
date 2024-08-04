import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { sign } from 'hono/jwt';
import { signupInput, signinInput } from '@athul-kesav/medium-commons';
const userRouter = new Hono();
userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const parsedBody = signupInput.safeParse(body);
    if (!parsedBody.success) {
        c.status(411);
        return c.json({
            message: "Invalid Input(s)",
        });
    }
    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name
            },
        });
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt });
    }
    catch (e) {
        c.status(403);
        return c.json({ error: "error while signing up" });
    }
});
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    const parsedBody = signinInput.safeParse(body);
    if (!parsedBody.success) {
        c.status(411);
        return c.json({
            message: "Invalid Input(s)",
        });
    }
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
        msg: "Login parsedBodyful",
        jwt: `Bearer ${jwt}`,
    });
});
export default userRouter;