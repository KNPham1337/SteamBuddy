import e, { response } from "express";

export class Command {
    name: string;
    description: string;
    options: object[] | undefined;

    /**
     * 
     * @param name Command name
     * @param description Command description
     * @param options Optional customizable attributes for commands
     */
    constructor(name: string, description: string, options?: object[]) {
        this.name = name;
        this.description = description;
        this.options = options;
    }

    /**
     * 
     * @param {Object} interaction Interaction object from discord
     * @returns {Promise<Response>} A promise
     */
    async execute(interaction: typeof response): Promise<e.Response> {
        throw new Error(`The execute function for the command ${this.name} has not been implemented yet`);
    }

    /**
     * @returns {Object} The object representing the command to be registered
     */
    register() {
        throw new Error(`The register function for the command ${this.name} has not been implemented yet`);
    }

};