import path from "node:path";
import FileWorker from "./FileWorker.js";

async function runDemo() {
    console.log("=== ДЕМОНСТРАЦІЯ 10 МЕТОДІВ МОДУЛЯ node:fs/promises ===\n");

    const demoDir = path.join("demo_folder");
    const initialFile = path.join(demoDir, "test.txt");
    const copiedFile = path.join(demoDir, "test_copy.txt");
    const renamedFile = path.join(demoDir, "test_renamed.txt");

    // 1. fs.mkdir - Створення директорії
    await FileWorker.makeDirectory(demoDir);

    // Створення початкового файлу для тестування
    await FileWorker.writeToFile(initialFile, "Привіт! Це тестовий вміст для модуля fs.");

    // 2. fs.access - Перевірка доступу / наявності файлу
    await FileWorker.checkAccess(initialFile);

    // 3. fs.realpath - Отримання канонічного абсолютного шляху
    await FileWorker.getRealPath(initialFile);

    // 4. fs.stat - Отримання метаданих файлу
    await FileWorker.getFileStats(initialFile);

    // 5. fs.copyFile - Копіювання файлу
    await FileWorker.copyFile(initialFile, copiedFile);

    // 6. fs.rename - Перейменування / переміщення файлу
    await FileWorker.renameFile(copiedFile, renamedFile);

    // 7. fs.truncate - Обрізання файлу до 10 байт
    await FileWorker.truncateFile(renamedFile, 10);

    // 8. fs.readdir - Зчитування вмісту директорії
    await FileWorker.readDirectory(demoDir);

    // 9. fs.unlink - Видалення конкретного файлу
    await FileWorker.deleteFile(renamedFile);
    await FileWorker.deleteFile(initialFile);

    // 10. fs.rm - Рекурсивне видалення директорії
    await FileWorker.removeDirectory(demoDir);

    console.log("\n=== ВШІ 10 МЕТОДІВ УСПІШНО ВИКОНАНІ ===");
}

runDemo().catch(console.error);
