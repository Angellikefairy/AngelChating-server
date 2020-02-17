import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";

import { Expression } from "../entities/expression.entity";



@Injectable()
export class ExpressionService {
    constructor(
        @Inject('EXPRESSION_REPOSITORY')
        private readonly expressionRepository: Repository<Expression>
    ){}
    /**
     * 获取所有expression
     */
    async findAll(): Promise<Expression[]> {
        return this.expressionRepository.find();
    }
}



