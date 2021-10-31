import { Request } from 'express';
import User from '../../models/User';
import * as jwt from '../../libs/jwt';
import * as bcrypt from 'bcrypt';
import { ResponseError } from '../../errors';

export default async (req: Request) => {
  const { email, password } = req.body;
  let type = req.body.type;
  if (!type) type = 'user';

  if (!email || !password) {
    throw new ResponseError('Enail and password is required', 422);
  }

  const user = await User.query().where('email', email).first();
  if (!user) {
    throw new ResponseError('Invalid credential', 422);
  }

  if (type !== user.type) {
    throw new ResponseError('Access Denied!', 422);
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new ResponseError('Invalid credential', 422);
  }
  const token = jwt.sign({
    iat: new Date().getTime(),
    sub: user.id,
  });
  return {
    user,
    token,
  };
};
