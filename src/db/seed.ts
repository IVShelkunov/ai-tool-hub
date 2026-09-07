import { db } from "./index"
import { aiTools } from "./schema"

async function main() {
    console.log("🌱 Начинаю наполнение базы...");
    try {
        await db.insert(aiTools).values([
            { name: 'Claude', description: 'AI by Anthropic', url: 'https://claude.ai', category: 'text' },
            { name: 'DALL-E', description: 'Image generator', url: 'https://openai.com', category: 'image' },
            { name: 'ChatGPT', description: "The best chatbot for everything.", url: "https://chatgpt.com", category: 'image' }
        ]);
        console.log("✅ База успешно наполнена!");
    } catch (err) {
        console.error("❌ Ошибка при сидинге:", err);
    } finally {
        process.exit(0);
    }

}
main();