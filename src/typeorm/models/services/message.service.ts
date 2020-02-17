import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { Message } from "../entities/message.entity";

@Injectable()
export class MessageService {
    constructor(
        @Inject("MESSAGE_REPOSITORY")
        private readonly messageRepository: Repository<Message>
    ) {}

    /**
     * 添加消息
     * @param messageMes 
     */
    async createMessage<T extends Message>(messageMes: T): Promise<T["message_id"]> {
        let v = await this.messageRepository.insert(messageMes);
        return v.identifiers[0].message_id;
    }

    /**
     * 查找消息
     * @param option 
     */
    async findMessageByOption<T>(option: T): Promise<Array<Message>> {
        return await this.messageRepository.find(option);
    }
}