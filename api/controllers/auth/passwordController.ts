import { Request, Response } from "express";
import { ResponseError } from "../../errors";
import { User } from "../../models";

export const update = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;

  if (req.user.password === oldPassword) {
    if (
      await User.query()
        .findById(req.user.id)
        .patch({ password: newPassword })
    ) {
    } else {
      res.send("something went wrong");
    }
  } else throw new ResponseError("Password is Incorrect", 422);
};

export const forgot = () => {};

export const reset = () => {};
