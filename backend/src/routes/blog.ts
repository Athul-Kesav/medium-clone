import { Hono } from 'hono';
import { verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import {createBlogInput, updateBlogInput} from '@athul-kesav/medium-commons';

const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string,
    },
    Variables: {
        userId: string
    },
}>();

//Middleware to check if the user is authenticated
blogRouter.use("/*", async (c, next) => {
    const auth = c.req.header("Authorization") || "";

    if (!auth) {
        c.status(401);
        return c.json({ error: "Unauthorized" });
    }

    const token = auth.split(" ")[1];

    try {
        const user = await verify(token, c.env.JWT_SECRET);
        c.set("userId", user.id as string);
        await next()
    } catch (e) {
        c.status(403);
        return c.json({ error: "Unauthorized" });
    }
})

//Create a new post
blogRouter.post('/add', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const parsedBody = createBlogInput.safeParse(body);
    if(!parsedBody.success){
      c.status(411);
      return c.json({
        message: "Invalid Input(s)",
      })
    }

    const authorId = c.get("userId");

    try {
        const blog = prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId
            }
        });

        return c.json({
            message: 'Post created parsedBodyfully',
            id: (await blog).id
        })
    } catch (e) {
        c.status(403);
        return c.json({ error: "error while creating post" });
    }

})

//Update a post
blogRouter.put('/update', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const parsedBody = updateBlogInput.safeParse(body);
    if(!parsedBody.success){
      c.status(411);
      return c.json({
        message: "Invalid Input(s)",
      })
    }

    try {
        const blog = prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content,
                published: body.published
            }
        });

        return c.json({
            message: 'Post updated parsedBodyfully',
            id: (await blog).id
        })
    } catch (e) {
        c.status(403);
        return c.json({ error: "error while updating post" });
    }

})

//Get all posts // Add pagination
blogRouter.post('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const blogs = await prisma.post.findMany();
        return c.json(blogs)

    } catch (e) {
        c.status(403);
        return c.json({ error: "error while fetching blogs" });
    }

})

//Get a particular post
blogRouter.get('/:id', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");
    try {
        const blog = prisma.post.findFirst({
            where: {
                id: id
            },
        });

        return c.json({
            message: 'Particular Post fetched parsedBodyfully',
            blog: await blog
        })
    } catch (e) {
        c.status(403);
        return c.json({ error: "error while fetching blog" });
    }

})


export default blogRouter;