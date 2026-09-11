// //Успадкування, поліморфізм
// abstract class Transport {
//   private model;
//   constructor(model: string) {
//     this.model = model;
//   }
//   abstract move(): void;
// }
// class Bus extends Transport {
//   constructor(model: string) {
//     super(model);
//   }

//   move(): void {
//     console.log("Bus move");
//   }
// }

// class Car extends Transport {
//   constructor(model: string) {
//     super(model);
//   }

//   move(): void {
//     console.log("Car move");
//   }
// }


// function drive(tr:Transport):void {
//     tr.move()
// }

// drive(new Car("mazda"))
// drive(new Bus("my bus")).

// enum Roles {
//   ADMIN=1,
//   MANAGER,
//   USER,
// }

// const role: Roles = Roles.MANAGER;

// console.log(Roles[role]);
//TODO: function
// let a:any = "hello"
// a = 10
// let a2:unknown 

import * as fs from "node:fs/promises"
import path from 'node:path'
import { stdout as output, stdin as input } from "node:process"
import readline from "node:readline/promises"

import {getContent,writeToFile} from "./files.js"

const FILE_TO_PATH = path.join('logs', 'logs.txt')
// async function writeToFile(filePath: string, content: string): Promise<void> {
//     try {
//         await fs.appendFile(filePath, content + '\n', 'utf-8')
//         output.write("файл сохранен")
//     } catch {
//         console.log("Ошибка")
//     }

// }
output.write("Enter content:")
input.on('data', (data: Buffer) => {
    console.log("Байты", data)
    const content: string = data.toString('utf-8')
    console.log("Строка", content)
    writeToFile(FILE_TO_PATH, content).then(_ => {

    })
})

// async function getContent():Promise<string>
// {
//     const rl = readline.createInterface({input,output})
//     try
//     {
//         const content:string = await rl.question("enter your content: ")
//         return content
//     }
//     catch(error)
//         {
//             console.log("Не работает")
//             return ''
//         }
//     finally{
//         rl.close();
//     }
    
// }

getContent().then((data:string) =>{
    writeToFile(FILE_TO_PATH,data);
})

// const FILE_TO_PATH = path.join('logs', 'logs.txt')
// writeToFile(FILE_TO_PATH, "Hello World");
// writeToFile(FILE_TO_PATH, "Burmalda");
// const FILE_TO_PATH = path.join('logs', 'logs.txt')
// fs.writeFileSync(FILE_TO_PATH, "node")



import FileWorker from "./fileworker.js"

FileWorker.path = FILE_TO_PATH;

const content = await FileWorker.getContent()

await FileWorker.writeToFile(FILE_TO_PATH, content)

