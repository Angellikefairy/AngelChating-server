import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { Dialog } from "../entities/dialog.entity";

type DialogKeys = keyof Dialog;

@Injectable()
export class DialogService {
    constructor(
        @Inject("DIALOG_REPOSITORY")
        private readonly dialogRepository: Repository<Dialog>
    ) {}

    /**
     * 创建对话
     * @param dialogMes 
     */
    async createDialog<T extends Dialog>(...dialogMes: Array<T>) {
        await this.dialogRepository.insert(dialogMes);
    }
    
    /**
     * 根据指定条件获取所有相关dialog信息
     * @param option 
     */
    async getDialogs<T>(option: T): Promise<Array<Dialog>> {
        const dialogs: Array<Dialog> = await this.dialogRepository.find(option); 
        return dialogs;
    }

    /**
     * 根据指定条件检查相关dialog是否存在
     * @param option 
     */
    async checkDialog<T>(option: T): Promise<boolean> {
        const count = await this.dialogRepository.count(option);
        return count === 0 ? false : true;
    }
    
    /**
     * 更新dialog
     * @param option 
     * @param updateContent 
     */
    async updateDialog<T,N>(option:T,updateContent: N) {
        await this.dialogRepository.update(option,updateContent);
    }
}