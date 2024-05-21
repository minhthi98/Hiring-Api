

export class updateUserDto {
    id: string;
    name?: string;
    address?: string;
    gender?: string;
    dob?: Date; // Thêm trường dob vào CreateUserDto
}