export interface AccountServiceInterface {
    deleteByEmail(email: string): Promise<any>;
}