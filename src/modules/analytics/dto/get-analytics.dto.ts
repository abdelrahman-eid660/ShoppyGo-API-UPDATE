import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsIn, IsNumber, IsOptional, IsPositive } from 'class-validator';

@ArgsType()
export class GetAnalyticsDTO {
  @Field(() => Int , {nullable : true})
  @IsIn([1,-1])
  @IsOptional()
  sortType?: 1 | -1;
  @Field(() => Int , {nullable : true})
  @IsNumber()
  @IsOptional()
  @IsPositive()
  limit?: number;
}

@ArgsType()
export class GetZeroAnalyticsDTO {
  @Field(() => Int , {nullable : true})
  @IsNumber()
  @IsOptional()
  @IsPositive()
  limit?: number;
}
