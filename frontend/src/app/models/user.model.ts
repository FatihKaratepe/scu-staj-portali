export interface User {
    token: string;
    firstName: string;
    lastName: string;
    role: "Ogrenci" | "Fakulte" | "Firma";
    email: string;
    phoneNumber: string;
    number?: string;
    class?: string;
}