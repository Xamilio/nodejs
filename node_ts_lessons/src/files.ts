
import * as fs from "node:fs/promises"
import path from 'node:path'
import { stdout as output, stdin as input } from "node:process"
import readline from "node:readline/promises"

async function getContent():Promise<string>
{
    const rl = readline.createInterface({input,output})
    try
    {
        const content:string = await rl.question("enter your content: ")
        return content
    }
    catch(error)
        {
            console.log("Не работает")
            return ''
        }
    finally{
        rl.close();
    }
    
}
async function writeToFile(filePath: string, content: string): Promise<void> {
    try {
        await fs.appendFile(filePath, content + '\n', 'utf-8')
        output.write("файл сохранен")
    } catch {
        console.log("Ошибка")
    }

}
export{getContent,writeToFile};