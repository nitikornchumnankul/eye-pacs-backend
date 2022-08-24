import { EntityRepository, Repository } from "typeorm";
import { Table15 } from "./table-15.entity";

@EntityRepository(Table15)
export class Table15Reposotory extends Repository<Table15>{}