const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");

const PORT = 5050;

const prisma = new PrismaClient();

app.use(express.json());

// 新規グループ登録API
app.post("api/auth/register", async (req, res) => {
	const { name } = req.body;

	const group = await prisma.group.create({
		data: {
			name
		}
	});

	return res.json({group});
})


app.listen(PORT, () => console.log(`server is running on Port ${PORT}`));