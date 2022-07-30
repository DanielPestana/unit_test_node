import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let showUserProfileUseCase: ShowUserProfileUseCase;
let createUserUseCase: CreateUserUseCase;


describe("Show User Profile", () => {

    beforeEach(async () => {
        inMemoryUsersRepository = new InMemoryUsersRepository();
        showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUsersRepository);
        createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    });

    it("shoulb be able to show a user profile", async () => {
        const user = await createUserUseCase.execute({
            name: "Daniel Pestana",
            email: "daniel.pestana@email.com",
            password: "123123",
        });

        if(user.id) {
            const response = await showUserProfileUseCase.execute(user.id);

            expect(response).toHaveProperty("id");
        }
    });
});


