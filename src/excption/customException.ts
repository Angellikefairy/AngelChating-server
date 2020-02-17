import { WsException } from "@nestjs/websockets";

/**
 * 导出自定义WebSocket异常类（可以自定义异常名）
 */
export class CustomWsException extends WsException {
    exceptionName: string;
    constructor(exceptionName,error) {
        super(error);
        this.exceptionName = exceptionName;
    }
    getExceptionName(): string {
        return this.exceptionName;
    }
}