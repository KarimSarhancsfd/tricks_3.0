import { SetMetadata } from "@nestjs/common";
import {UserType} from "../../utils/enum"



//roles Method Decoratore
export const Roles = (...roles: UserType[]) => SetMetadata('roles', roles)