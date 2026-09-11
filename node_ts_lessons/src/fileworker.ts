import * as fs from "node:fs/promises"
import * as readline from "node:readline/promises"
import {stdout as output, stdin as input } from "node:process"
 
export default class FileWorker
{
    private static path_to_file:string;
    public static set path(path:string){
        FileWorker.path_to_file = path;
    }
    public static async getContent():Promise<string>{
    const rl = readline.createInterface({input,output})
    try{
        const content:string =  await rl.question("Enter your content: ")
        return content
 
    }catch(error){
        console.log(`no data ${error}`)
        return ''
    }
    finally{
        rl.close()
    }
}
 
public static async writeToFile(filePath:string, content:string):Promise<void>{
    try{
        await fs.appendFile(filePath, content+'\n', 'utf-8')
        //await fs.writeFile(filePath, content+'\n', 'utf-8')
        console.log("Файл успішно збережено")
    }
    catch(error){
        console.log("Файл не збережено")
    }
}



public static async readFile(filePath:string):Promise<string|undefined>
{
    try{
         const data:string = await fs.readFile(filePath, 'utf-8');
    console.log(data);
    return data
    }
    catch(error){
        console.error(`My error ${error}`)

    }
   
}



}
