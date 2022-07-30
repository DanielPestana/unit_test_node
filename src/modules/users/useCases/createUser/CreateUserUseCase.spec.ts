
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { AppError } from '../../../../shared/errors/AppError';


let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;


describe("Create User", () => {
    beforeEach(() =>{
        inMemoryUsersRepository = new InMemoryUsersRepository();
        createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    });

    it("Should be able to create an user", async () => {
        const user = await createUserUseCase.execute({
            name: "Daniel Pestana",
            email: "daniel.pestana@email.com",
            password: "123123",
        });
        expect(user).toHaveProperty("id");
    });

    it("Should not be able to register two users with same e-mail", () => {
        expect(async () => {
           await createUserUseCase.execute({
                name: "Daniel Pestana",
                email: "daniel.pestana@email.com",
                password: "123123",
            });

            await createUserUseCase.execute({
                name: "Daniel Pestana",
                email: "daniel.pestana@email.com",
                password: "123123",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

});