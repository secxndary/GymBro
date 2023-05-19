// import { OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
// import { Socket, Server } from 'socket.io';

// @WebSocketGateway({
//     cors: {
//         origin: "*"
//     }
// })
// export class NotifyGateway implements OnGatewayInit {
    
//     @WebSocketServer() server: Server;
    
//     afterInit(server: any) {
//         console.log('websocket initialized')
//     }

//     @SubscribeMessage('notify')
//     async handleNotify(socket: Socket, msg: string) {
//         if(!msg)
//             return;

//         socket.broadcast.emit('msg');
//     }
// }
