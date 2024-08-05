import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { Hono } from 'hono';
import { sign, verify } from 'hono/jwt';
import { signupInput, signinInput } from '@athul-kesav/medium-commons';
const userRouter = new Hono();
//All users
userRouter.post('/allusers', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
            },
        });
        return c.json({
            users
        });
    }
    catch (e) {
        console.error(e);
        c.status(500);
        return c.json({
            msg: "Internal Server Error"
        });
    }
});
//Signup Route
userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const body = await c.req.json();
    console.log('Checking for email:', body.email);
    const parsedBody = signupInput.safeParse(body);
    if (!parsedBody.success) {
        c.status(411);
        return c.json({
            message: "Invalid Input(s)",
        });
    }
    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                email: body.email,
            }
        });
        console.log('Existing user:', existingUser);
        if (!existingUser) {
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
        else {
            c.status(409);
            return c.json({
                msg: "user already present"
            });
        }
    }
    catch (e) {
        c.status(403);
        return c.json({ error: "error while signing up" });
    }
});
//Signin Route
userRouter.post('/signin', async (c) => {
    console.log("Sigining you up");
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
//Delete User Route
userRouter.delete('/delete', async (c) => {
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
    const auth = c.req.header("Authorization") || "";
    if (!auth) {
        c.status(401);
        return c.json({ error: "Unauthorized" });
    }
    const token = auth.split(" ")[1];
    try {
        const userVerification = await verify(token, c.env.JWT_SECRET);
        if (userVerification) {
            const user = await prisma.user.delete({
                where: {
                    email: body.email,
                    password: body.password
                }
            });
            console.log("Delete user:", user);
            return c.json({
                DeleteUser: user
            });
        }
    }
    catch (e) {
        c.status(403);
        return c.json({ error: "Unauthorized/User not found" });
    }
});
export default userRouter;
