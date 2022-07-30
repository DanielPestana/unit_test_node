import { User } from "../../entities/User";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { AppError } from '../../../../shared/errors/AppError';
import { ICreateUserDTO } from "../createUser/ICreateUserDTO";

let inMemoryUsersRepository: InMemoryUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let user: User;

describe("Authenticate User", () => {
    beforeEach(async () => {
        inMemoryUsersRepository = new InMemoryUsersRepository();
        authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository);
        createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    });

    it("should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            name: "Daniel Pestana",
            email: "daniel.pestana@email.com",
            password: "123123",
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("Should be not be able to authenticate a non-existent user", async () => {
        const userLogin = {
            email: "Daniel Pestana",
            password: "123123",
        };

        expect(async () => {
            await authenticateUserUseCase.execute(userLogin);
        }).rejects.toBeInstanceOf(AppError);
    });


    it("Should not be able to authenticate a user with wrong password", async () => {
        const user = {
            name: "Daniel Pestana",
            email: "daniel.pestana@email.com",
            password: "123123",
        };

        await createUserUseCase.execute(user);

        expect(async () => {
            await authenticateUserUseCase.execute({
                email: user.email,
                password: "WrongPassoword",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});