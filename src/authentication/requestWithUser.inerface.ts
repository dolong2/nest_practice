import { User } from "src/entity/user/user.entity";

interface RequestWithUser extends Request {
    user: User;
  }
  export default RequestWithUser;