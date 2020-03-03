import { Catch } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import { CustomWsException } from "./customException";

@Catch()
export class CustomWsExceptionFilter extends BaseExceptionFilter {
    /**
     * 异常捕捉
     * @param exception 
     * @param host 
     */
    catch(exception: CustomWsException, host) {
        const client = host.switchToWs().getClient();
        this.handleError(client, exception);
    }
    /**
     * 异常处理
     * @param client 
     * @param exception 
     */
    handleError(client, exception: CustomWsException) {
        const exceptionName: string = exception.getExceptionName();
        const result: string | object = exception.getError();
        const status = "error";
        let message: object;
        if(Object.prototype.toString.call(result).slice(-7,-1) === 'Object') {
            message = (result as object);
        }
        else {
            message = {
                status,
                message: (result as string)
            }
        }
        client.emit(exceptionName, message);
    }
}