import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class RequestCallDTO {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsNotEmpty()
  nameSurname: string;

  @ApiProperty({ type: 'string', format: 'phone' })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;
}
