import { createParamDecorator , ExecutionContext} from "@nestjs/common";
import { JWTPayloadType } from "src/utils/types";
import { CURRENT_USER_KEY } from '../../utils/constants';



// CurrentUser Parameter Decorator 
export  const CurrentUser = createParamDecorator (
    (data, context:ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        const payload: JWTPayloadType = request[CURRENT_USER_KEY];
        return payload;

        //we have changed user to payload which indicate to user 
    }
)