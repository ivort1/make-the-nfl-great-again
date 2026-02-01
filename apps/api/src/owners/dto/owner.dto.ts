import { IsBoolean, IsDateString, isDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';
// Response DTO
export class OwnerResponseDto {
    id: string;
    sleeperId: string;
    displayName: string;
    avatarUrl: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Request DTO
export class CreateOwnerDto {
    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    sleeperId: string;

    @IsString()
    displayName: string;

    @IsString()
    avatarUrl: string;

    @IsBoolean()
    isActive: boolean;

    @IsDateString()
    createdAt: string;

    @IsDateString()
    updatedAt: string;
}