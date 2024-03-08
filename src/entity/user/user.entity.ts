import { CreateUserRequestDto } from "src/controller/users/dto/request-users.dto";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    name: string;

    @Column()
    password: string;    

    static async saveEntity(createUserDto: CreateUserRequestDto) {
        const {name, email, password} = createUserDto;
        this.save({
            email,
            name,
            password
        })
    }
    
    static async findByEmail(email: string): Promise<User> {
        return await this.findOne({
            where: {
                email: email
            }
        })
    }

    static async findById(id: number): Promise<User> {
        return await this.findById(id)
    }
    
}