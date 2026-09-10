import { db } from "./index"
import { users } from "./schema"

async function main() {
    console.log("🌱 Начинаю наполнение базы...");
    try {
        const [newUser] = await db.insert(users).values([
            {
                email: "admin@test.com",
                password: "password123"
            }
        ]).returning({ id: users.id });
        console.log(`✅ Пользователь добавлен с ID: ${newUser.id}`);
    } catch (err) {
        console.error("❌ Ошибка при сидинге:", err);
    } finally {
        process.exit(0);
    }

}
main();